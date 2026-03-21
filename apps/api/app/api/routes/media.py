from __future__ import annotations

import uuid
from pathlib import Path

from fastapi import APIRouter, Depends, File, HTTPException, UploadFile
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session

from app.api.deps import get_current_user, require_workspace_member, require_workspace_write_access
from app.core.config import settings
from app.db.session import get_db
from app.models.media import MediaAsset
from app.models.record import Record
from app.models.user import User
from app.schemas.media import MediaRead
from app.services.audit import log_audit_event
from app.services.media_processing import process_media_asset


router = APIRouter()


@router.get("/{workspace_id}/records/{record_id}/media")
def list_media(
    workspace_id: str,
    record_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> dict:
    require_workspace_write_access(workspace_id, current_user, db)
    items = (
        db.query(MediaAsset)
        .filter(MediaAsset.workspace_id == workspace_id, MediaAsset.record_id == record_id)
        .order_by(MediaAsset.created_at.desc())
        .all()
    )
    return {"success": True, "data": {"items": [MediaRead.model_validate(item).model_dump() for item in items]}}


@router.get("/{workspace_id}/media/{media_id}/status")
def get_media_status(
    workspace_id: str,
    media_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> dict:
    require_workspace_write_access(workspace_id, current_user, db)
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

    file_path = Path(settings.storage_dir).parent / media.storage_key
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
    require_workspace_member(workspace_id, current_user, db)
    record = db.get(Record, record_id)
    if not record or record.workspace_id != workspace_id:
        raise HTTPException(status_code=404, detail="Record not found")

    target_dir = Path(settings.storage_dir) / workspace_id
    target_dir.mkdir(parents=True, exist_ok=True)
    target_name = f"{uuid.uuid4().hex}_{file.filename}"
    target_path = target_dir / target_name

    content = await file.read()
    target_path.write_bytes(content)

    media = MediaAsset(
        workspace_id=workspace_id,
        record_id=record_id,
        uploaded_by=current_user.id,
        media_type=(file.content_type or "application/octet-stream").split("/")[0],
        storage_provider="local",
        storage_key=str(target_path.relative_to(Path(settings.storage_dir).parent)),
        original_filename=file.filename or target_name,
        mime_type=file.content_type or "application/octet-stream",
        size_bytes=len(content),
        metadata_json={},
        processing_status="pending",
    )
    db.add(media)
    db.commit()
    db.refresh(media)

    media = process_media_asset(db, media.id)
    log_audit_event(
        db,
        workspace_id=workspace_id,
        actor_user_id=current_user.id,
        action_code="media.upload",
        resource_type="media_asset",
        resource_id=media.id,
        message=f"Uploaded media {media.original_filename}",
        metadata_json={"record_id": record_id, "media_type": media.media_type, "mime_type": media.mime_type},
    )
    return {"success": True, "data": {"media": MediaRead.model_validate(media).model_dump()}}


@router.post("/{workspace_id}/media/{media_id}/retry")
def retry_media_processing(
    workspace_id: str,
    media_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> dict:
    require_workspace_member(workspace_id, current_user, db)
    media = db.get(MediaAsset, media_id)
    if not media or media.workspace_id != workspace_id:
        raise HTTPException(status_code=404, detail="Media not found")

    media = process_media_asset(db, media.id)
    log_audit_event(
        db,
        workspace_id=workspace_id,
        actor_user_id=current_user.id,
        action_code="media.retry_processing",
        resource_type="media_asset",
        resource_id=media.id,
        message=f"Retried media processing for {media.original_filename}",
        metadata_json={"record_id": media.record_id, "processing_status": media.processing_status},
    )
    return {"success": True, "data": {"media": MediaRead.model_validate(media).model_dump()}}
