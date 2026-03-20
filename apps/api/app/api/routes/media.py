from __future__ import annotations

import uuid
from pathlib import Path

from fastapi import APIRouter, Depends, File, HTTPException, UploadFile
from sqlalchemy.orm import Session

from app.api.deps import get_current_user, require_workspace_member
from app.core.config import settings
from app.db.session import get_db
from app.models.media import MediaAsset
from app.models.record import Record
from app.models.user import User
from app.schemas.media import MediaRead


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
        storage_key=str(target_path.relative_to(Path(settings.storage_dir).parent)),
        original_filename=file.filename or target_name,
        mime_type=file.content_type or "application/octet-stream",
        size_bytes=len(content),
        metadata_json={},
    )
    db.add(media)
    db.commit()
    db.refresh(media)
    return {"success": True, "data": {"media": MediaRead.model_validate(media).model_dump()}}
