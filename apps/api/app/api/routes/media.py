from __future__ import annotations

import uuid
from pathlib import Path

from fastapi import APIRouter, Depends, File, HTTPException, Query, UploadFile
from fastapi.responses import FileResponse, Response
from sqlalchemy.orm import Session

from app.api.deps import get_current_user, require_workspace_member, require_workspace_role, require_workspace_write_access
from app.core.config import settings
from app.db.session import get_db
from app.models.media import MediaAsset
from app.models.record import Record
from app.models.user import User
from app.schemas.media import (
    MediaRead,
    MediaRetentionArchiveRequest,
    MediaRetentionArchiveResultRead,
    MediaRetentionCleanupRequest,
    MediaRetentionCleanupResultRead,
    MediaRetentionReportRead,
    MediaStorageSummaryRead,
)
from app.services.audit import log_audit_event
from app.services.background_tasks import dispatch_media_processing
from app.services.knowledge import rebuild_record_knowledge
from app.services.media_storage import (
    build_workspace_media_retention_report,
    archive_workspace_media_retention,
    cleanup_workspace_media_retention,
    media_uses_local_storage,
    remove_storage_file,
    resolve_storage_path,
    summarize_workspace_media_storage,
)
from app.services.media_remote_storage import (
    delete_remote_media_via_provider,
    download_remote_media_via_provider,
    upload_media_via_provider,
)
from app.services.media_provider import DeferredMediaProcessingError


router = APIRouter()


@router.get("/{workspace_id}/records/{record_id}/media")
def list_media(
    workspace_id: str,
    record_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> dict:
    require_workspace_member(workspace_id, current_user, db)
    items = (
        db.query(MediaAsset)
        .filter(MediaAsset.workspace_id == workspace_id, MediaAsset.record_id == record_id)
        .order_by(MediaAsset.created_at.desc())
        .all()
    )
    return {"success": True, "data": {"items": [MediaRead.model_validate(item).model_dump() for item in items]}}


@router.get("/{workspace_id}/media/storage-summary")
def get_media_storage_summary(
    workspace_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> dict:
    require_workspace_member(workspace_id, current_user, db)
    summary = summarize_workspace_media_storage(db, workspace_id)
    return {"success": True, "data": {"summary": MediaStorageSummaryRead.model_validate(summary).model_dump()}}


@router.get("/{workspace_id}/media/retention-report")
def get_media_retention_report(
    workspace_id: str,
    older_than_days: int = Query(90, ge=1, le=3650),
    limit: int = Query(5, ge=1, le=20),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> dict:
    require_workspace_write_access(workspace_id, current_user, db)
    report = build_workspace_media_retention_report(
        db,
        workspace_id,
        older_than_days=older_than_days,
        limit=limit,
    )
    return {"success": True, "data": {"report": MediaRetentionReportRead.model_validate(report).model_dump()}}


@router.post("/{workspace_id}/media/retention-cleanup")
def cleanup_media_retention(
    workspace_id: str,
    payload: MediaRetentionCleanupRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> dict:
    require_workspace_role(workspace_id, current_user, db, allowed_roles={"owner"})
    result = cleanup_workspace_media_retention(
        db,
        workspace_id,
        media_ids=payload.media_ids,
        older_than_days=payload.older_than_days,
        purge_orphan_files=payload.purge_orphan_files,
        dry_run=payload.dry_run,
    )
    if not payload.dry_run and (result["candidate_media_count"] or result["orphan_file_count"]):
        log_audit_event(
            db,
            workspace_id=workspace_id,
            actor_user_id=current_user.id,
            action_code="media.retention_cleanup",
            resource_type="workspace",
            resource_id=workspace_id,
            message="Executed media retention cleanup",
            metadata_json={
                "older_than_days": payload.older_than_days,
                "candidate_media_count": result["candidate_media_count"],
                "candidate_media_size_bytes": result["candidate_media_size_bytes"],
                "orphan_file_count": result["orphan_file_count"],
                "orphan_file_size_bytes": result["orphan_file_size_bytes"],
                "skipped_media_ids": result["skipped_media_ids"],
            },
        )
    return {
        "success": True,
        "data": {"result": MediaRetentionCleanupResultRead.model_validate(result).model_dump()},
    }


@router.post("/{workspace_id}/media/retention-archive")
def archive_media_retention(
    workspace_id: str,
    payload: MediaRetentionArchiveRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> dict:
    require_workspace_role(workspace_id, current_user, db, allowed_roles={"owner"})
    result = archive_workspace_media_retention(
        db,
        workspace_id,
        media_ids=payload.media_ids,
        older_than_days=payload.older_than_days,
        dry_run=payload.dry_run,
    )
    if not payload.dry_run and result["candidate_media_count"]:
        log_audit_event(
            db,
            workspace_id=workspace_id,
            actor_user_id=current_user.id,
            action_code="media.retention_archive",
            resource_type="workspace",
            resource_id=workspace_id,
            message="Archived stale media into archive tier",
            metadata_json={
                "older_than_days": payload.older_than_days,
                "candidate_media_count": result["candidate_media_count"],
                "candidate_media_size_bytes": result["candidate_media_size_bytes"],
                "skipped_media_ids": result["skipped_media_ids"],
            },
        )
    return {
        "success": True,
        "data": {"result": MediaRetentionArchiveResultRead.model_validate(result).model_dump()},
    }


@router.get("/{workspace_id}/media/{media_id}/status")
def get_media_status(
    workspace_id: str,
    media_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> dict:
    require_workspace_member(workspace_id, current_user, db)
    media = db.get(MediaAsset, media_id)
    if not media or media.workspace_id != workspace_id:
        raise HTTPException(status_code=404, detail="Media not found")
    return {"success": True, "data": {"media": MediaRead.model_validate(media).model_dump()}}


@router.get("/{workspace_id}/media/{media_id}/content")
def get_media_content(
    workspace_id: str,
    media_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    require_workspace_member(workspace_id, current_user, db)
    media = db.get(MediaAsset, media_id)
    if not media or media.workspace_id != workspace_id:
        raise HTTPException(status_code=404, detail="Media not found")
    if not media_uses_local_storage(media):
        try:
            remote_content = download_remote_media_via_provider(db, media)
        except DeferredMediaProcessingError as exc:
            raise HTTPException(status_code=409, detail=str(exc)) from exc
        except FileNotFoundError as exc:
            raise HTTPException(status_code=404, detail=str(exc)) from exc
        except RuntimeError as exc:
            raise HTTPException(status_code=502, detail=str(exc)) from exc
        return Response(
            content=remote_content.content,
            media_type=remote_content.media_type or media.mime_type or "application/octet-stream",
            headers={"Content-Disposition": f'inline; filename="{media.original_filename}"'},
        )

    file_path = resolve_storage_path(media)
    if not file_path.exists():
        raise HTTPException(status_code=404, detail="Stored file not found")

    return FileResponse(
        path=file_path,
        media_type=media.mime_type or "application/octet-stream",
        filename=media.original_filename,
    )


@router.post("/{workspace_id}/records/{record_id}/media")
async def upload_media(
    workspace_id: str,
    record_id: str,
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> dict:
    require_workspace_write_access(workspace_id, current_user, db)
    record = db.get(Record, record_id)
    if not record or record.workspace_id != workspace_id:
        raise HTTPException(status_code=404, detail="Record not found")

    target_dir = Path(settings.storage_dir) / workspace_id
    content = await file.read()
    original_filename = file.filename or "upload.bin"
    mime_type = file.content_type or "application/octet-stream"
    media_type = mime_type.split("/")[0]
    try:
        remote_upload = await upload_media_via_provider(
            db,
            workspace_id=workspace_id,
            record_id=record_id,
            filename=original_filename,
            mime_type=mime_type,
            content=content,
        )
    except DeferredMediaProcessingError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc
    except RuntimeError as exc:
        raise HTTPException(status_code=502, detail=str(exc)) from exc

    processing_mode = "remote_deferred"
    if remote_upload is not None:
        media = MediaAsset(
            workspace_id=workspace_id,
            record_id=record_id,
            uploaded_by=current_user.id,
            media_type=media_type,
            storage_provider=remote_upload.storage_provider,
            storage_key=remote_upload.storage_key,
            original_filename=original_filename,
            mime_type=mime_type,
            size_bytes=remote_upload.size_bytes,
            metadata_json=remote_upload.metadata_json,
            processing_status="deferred",
            processing_error="Remote media storage is configured without background extraction yet",
        )
    else:
        target_dir.mkdir(parents=True, exist_ok=True)
        target_name = f"{uuid.uuid4().hex}_{original_filename}"
        target_path = target_dir / target_name
        target_path.write_bytes(content)

        media = MediaAsset(
            workspace_id=workspace_id,
            record_id=record_id,
            uploaded_by=current_user.id,
            media_type=media_type,
            storage_provider="local",
            storage_key=str(target_path.relative_to(Path(settings.storage_dir).parent)),
            original_filename=original_filename,
            mime_type=mime_type,
            size_bytes=len(content),
            metadata_json={},
            processing_status="pending",
        )
    db.add(media)
    db.commit()
    db.refresh(media)

    if media_uses_local_storage(media):
        media, processing_mode = dispatch_media_processing(db, media.id)
    log_audit_event(
        db,
        workspace_id=workspace_id,
        actor_user_id=current_user.id,
        action_code="media.upload",
        resource_type="media_asset",
        resource_id=media.id,
        message=f"Uploaded media {media.original_filename}",
        metadata_json={
            "record_id": record_id,
            "media_type": media.media_type,
            "mime_type": media.mime_type,
            "processing_mode": processing_mode,
        },
    )
    return {"success": True, "data": {"media": MediaRead.model_validate(media).model_dump()}}


@router.post("/{workspace_id}/media/{media_id}/retry")
def retry_media_processing(
    workspace_id: str,
    media_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> dict:
    require_workspace_write_access(workspace_id, current_user, db)
    media = db.get(MediaAsset, media_id)
    if not media or media.workspace_id != workspace_id:
        raise HTTPException(status_code=404, detail="Media not found")
    if not media_uses_local_storage(media):
        raise HTTPException(status_code=400, detail="Remote media retry is not available until remote extraction is supported")

    media, processing_mode = dispatch_media_processing(db, media.id)
    log_audit_event(
        db,
        workspace_id=workspace_id,
        actor_user_id=current_user.id,
        action_code="media.retry_processing",
        resource_type="media_asset",
        resource_id=media.id,
        message=f"Retried media processing for {media.original_filename}",
        metadata_json={
            "record_id": media.record_id,
            "processing_status": media.processing_status,
            "processing_mode": processing_mode,
        },
    )
    return {"success": True, "data": {"media": MediaRead.model_validate(media).model_dump()}}


@router.delete("/{workspace_id}/media/{media_id}")
def delete_media(
    workspace_id: str,
    media_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> dict:
    require_workspace_write_access(workspace_id, current_user, db)
    media = db.get(MediaAsset, media_id)
    if not media or media.workspace_id != workspace_id:
        raise HTTPException(status_code=404, detail="Media not found")

    record_id = media.record_id
    original_filename = media.original_filename
    storage_key = media.storage_key
    if media_uses_local_storage(media):
        remove_storage_file(media)
    else:
        try:
            delete_remote_media_via_provider(db, media)
        except DeferredMediaProcessingError as exc:
            raise HTTPException(status_code=409, detail=str(exc)) from exc
        except RuntimeError as exc:
            raise HTTPException(status_code=502, detail=str(exc)) from exc
    db.delete(media)
    db.commit()
    rebuild_record_knowledge(db, record_id)
    log_audit_event(
        db,
        workspace_id=workspace_id,
        actor_user_id=current_user.id,
        action_code="media.delete",
        resource_type="media_asset",
        resource_id=media_id,
        message=f"Deleted media {original_filename}",
        metadata_json={"record_id": record_id, "storage_key": storage_key},
    )
    return {"success": True, "data": {"deleted": True}}
