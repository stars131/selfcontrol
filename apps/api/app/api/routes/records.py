from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy import or_
from sqlalchemy.orm import Session

from app.api.deps import get_current_user, require_workspace_member
from app.db.session import get_db
from app.models.record import Record
from app.models.user import User
from app.schemas.record import RecordCreate, RecordRead, RecordUpdate
from app.services.audit import log_audit_event
from app.services.knowledge import rebuild_record_knowledge


router = APIRouter()


@router.get("/{workspace_id}/records")
def list_records(
    workspace_id: str,
    q: str | None = Query(default=None),
    type_code: str | None = Query(default=None),
    is_avoid: bool | None = Query(default=None),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> dict:
    require_workspace_member(workspace_id, current_user, db)
    query = db.query(Record).filter(Record.workspace_id == workspace_id)
    if q:
        like_value = f"%{q}%"
        query = query.filter(or_(Record.title.ilike(like_value), Record.content.ilike(like_value)))
    if type_code:
        query = query.filter(Record.type_code == type_code)
    if is_avoid is not None:
        query = query.filter(Record.is_avoid == is_avoid)

    records = query.order_by(Record.created_at.desc()).all()
    return {
        "success": True,
        "data": {"items": [RecordRead.model_validate(record).model_dump() for record in records]},
    }


@router.post("/{workspace_id}/records")
def create_record(
    workspace_id: str,
    payload: RecordCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> dict:
    require_workspace_member(workspace_id, current_user, db)
    record = Record(
        workspace_id=workspace_id,
        creator_id=current_user.id,
        type_code=payload.type_code,
        title=payload.title,
        content=payload.content,
        rating=payload.rating,
        is_avoid=payload.is_avoid,
        occurred_at=payload.occurred_at,
        source_type=payload.source_type,
        extra_data=payload.extra_data,
    )
    db.add(record)
    db.commit()
    db.refresh(record)
    rebuild_record_knowledge(db, record.id)
    db.refresh(record)
    log_audit_event(
        db,
        workspace_id=workspace_id,
        actor_user_id=current_user.id,
        action_code="record.create",
        resource_type="record",
        resource_id=record.id,
        message=f"Created record {record.title or record.id}",
        metadata_json={"type_code": record.type_code, "source_type": record.source_type},
    )
    return {"success": True, "data": {"record": RecordRead.model_validate(record).model_dump()}}


@router.get("/{workspace_id}/records/{record_id}")
def get_record(
    workspace_id: str,
    record_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> dict:
    require_workspace_member(workspace_id, current_user, db)
    record = db.get(Record, record_id)
    if not record or record.workspace_id != workspace_id:
        raise HTTPException(status_code=404, detail="Record not found")
    return {"success": True, "data": {"record": RecordRead.model_validate(record).model_dump()}}


@router.patch("/{workspace_id}/records/{record_id}")
def update_record(
    workspace_id: str,
    record_id: str,
    payload: RecordUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> dict:
    require_workspace_member(workspace_id, current_user, db)
    record = db.get(Record, record_id)
    if not record or record.workspace_id != workspace_id:
        raise HTTPException(status_code=404, detail="Record not found")

    for field, value in payload.model_dump(exclude_unset=True).items():
        setattr(record, field, value)

    db.add(record)
    db.commit()
    db.refresh(record)
    rebuild_record_knowledge(db, record.id)
    db.refresh(record)
    log_audit_event(
        db,
        workspace_id=workspace_id,
        actor_user_id=current_user.id,
        action_code="record.update",
        resource_type="record",
        resource_id=record.id,
        message=f"Updated record {record.title or record.id}",
        metadata_json={"status": record.status, "is_avoid": record.is_avoid},
    )
    return {"success": True, "data": {"record": RecordRead.model_validate(record).model_dump()}}


@router.delete("/{workspace_id}/records/{record_id}")
def delete_record(
    workspace_id: str,
    record_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> dict:
    require_workspace_member(workspace_id, current_user, db)
    record = db.get(Record, record_id)
    if not record or record.workspace_id != workspace_id:
        raise HTTPException(status_code=404, detail="Record not found")

    db.delete(record)
    db.commit()
    log_audit_event(
        db,
        workspace_id=workspace_id,
        actor_user_id=current_user.id,
        action_code="record.delete",
        resource_type="record",
        resource_id=record_id,
        message=f"Deleted record {record.title or record_id}",
        metadata_json={"type_code": record.type_code},
    )
    return {"success": True, "data": {"deleted": True}}
