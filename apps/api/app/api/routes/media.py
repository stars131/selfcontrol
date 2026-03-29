from __future__ import annotations

from fastapi import APIRouter, Depends, File, HTTPException, Query, UploadFile
from sqlalchemy.orm import Session

from app.api.deps import get_current_user, require_workspace_member, require_workspace_role, require_workspace_write_access
from app.api.routes.media_route_helpers import (
    build_media_content_response,
    build_uploaded_media_asset,
    collect_dead_letter_target_items,
    execute_dead_letter_bulk_retry,
    get_workspace_media_or_404,
    get_workspace_record_or_404,
    normalize_dead_letter_retry_states,
)
from app.db.session import get_db
from app.models.media import MediaAsset
from app.models.user import User
from app.schemas.media import (
    MediaDeadLetterBulkRetryRequest,
    MediaDeadLetterBulkRetryResultRead,
    MediaDeadLetterOverviewRead,
    MediaProcessingOverviewRead,
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
from app.services.media_issue_tracking import (
    build_workspace_media_dead_letter_overview,
    build_workspace_media_processing_overview,
)
from app.services.media_retention import (
    archive_workspace_media_retention,
    build_workspace_media_retention_report,
    cleanup_workspace_media_retention,
)
from app.services.media_storage import (
    media_uses_local_storage,
    remove_storage_file,
    summarize_workspace_media_storage,
)
from app.services.media_remote_storage import (
    attempt_media_upload_via_provider,
    delete_remote_media_via_provider,
    download_remote_media_via_provider,
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


@router.get("/{workspace_id}/media/processing-overview")
def get_media_processing_overview(
    workspace_id: str,
    issue_limit: int = Query(5, ge=1, le=20),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> dict:
    require_workspace_member(workspace_id, current_user, db)
    overview = build_workspace_media_processing_overview(db, workspace_id, issue_limit=issue_limit)
    return {"success": True, "data": {"overview": MediaProcessingOverviewRead.model_validate(overview).model_dump()}}


@router.get("/{workspace_id}/media/dead-letter")
def get_media_dead_letter_overview(
    workspace_id: str,
    limit: int = Query(20, ge=1, le=200),
    retry_states: list[str] | None = Query(default=None),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> dict:
    require_workspace_write_access(workspace_id, current_user, db)
    overview = build_workspace_media_dead_letter_overview(
        db,
        workspace_id,
        limit=limit,
        retry_states=normalize_dead_letter_retry_states(retry_states),
    )
    return {"success": True, "data": {"overview": MediaDeadLetterOverviewRead.model_validate(overview).model_dump()}}


@router.post("/{workspace_id}/media/dead-letter/retry")
def bulk_retry_media_dead_letter(
    workspace_id: str,
    payload: MediaDeadLetterBulkRetryRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> dict:
    require_workspace_write_access(workspace_id, current_user, db)
    retry_states = normalize_dead_letter_retry_states(payload.retry_states)
    target_items = collect_dead_letter_target_items(
        db,
        workspace_id=workspace_id,
        media_ids=payload.media_ids,
        limit=payload.limit,
        retry_states=retry_states,
    )
    result = execute_dead_letter_bulk_retry(
        db,
        target_items=target_items,
        retry_states=retry_states,
        workspace_id=workspace_id,
    )
    if result["retried_media_ids"]:
        log_audit_event(
            db,
            workspace_id=workspace_id,
            actor_user_id=current_user.id,
            action_code="media.dead_letter_bulk_retry",
            resource_type="workspace",
            resource_id=workspace_id,
            message="Triggered bulk dead-letter media recovery",
            metadata_json={
                "target_count": result["target_count"],
                "retried_count": result["retried_count"],
                "queued_count": result["queued_count"],
                "processing_count": result["processing_count"],
                "retry_states": sorted(retry_states),
                "retried_media_ids": result["retried_media_ids"][:50],
                "skipped_media_ids": result["skipped_media_ids"][:50],
            },
        )
    return {"success": True, "data": {"result": MediaDeadLetterBulkRetryResultRead.model_validate(result).model_dump()}}


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
    media = get_workspace_media_or_404(db, workspace_id, media_id)
    return {"success": True, "data": {"media": MediaRead.model_validate(media).model_dump()}}


@router.get("/{workspace_id}/media/{media_id}/content")
def get_media_content(
    workspace_id: str,
    media_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    require_workspace_member(workspace_id, current_user, db)
    media = get_workspace_media_or_404(db, workspace_id, media_id)
    return build_media_content_response(
        db,
        media,
        download_remote_media=download_remote_media_via_provider,
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
    get_workspace_record_or_404(db, workspace_id, record_id)

    try:
        content = await file.read()
    finally:
        await file.close()
    original_filename = file.filename or "upload.bin"
    mime_type = file.content_type or "application/octet-stream"
    media_type = mime_type.split("/")[0]
    try:
        upload_attempt = await attempt_media_upload_via_provider(
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

    media = build_uploaded_media_asset(
        upload_attempt=upload_attempt,
        workspace_id=workspace_id,
        record_id=record_id,
        uploaded_by=current_user.id,
        original_filename=original_filename,
        mime_type=mime_type,
        media_type=media_type,
        content=content,
    )
    db.add(media)
    db.commit()
    db.refresh(media)

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
            "storage_provider": media.storage_provider,
            "processing_mode": processing_mode,
            "storage_fallback_used": upload_attempt.fallback_used,
            "storage_fallback_reason": upload_attempt.fallback_reason,
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
    media = get_workspace_media_or_404(db, workspace_id, media_id)

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
    media = get_workspace_media_or_404(db, workspace_id, media_id)

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
