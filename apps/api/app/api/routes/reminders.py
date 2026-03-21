from __future__ import annotations

from datetime import datetime, timezone

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.api.deps import get_current_user, require_workspace_member, require_workspace_write_access
from app.db.session import get_db
from app.models.record import Record
from app.models.reminder import Reminder
from app.models.user import User
from app.schemas.reminder import ReminderCreate, ReminderRead, ReminderUpdate


router = APIRouter()


@router.get("/{workspace_id}/reminders")
def list_reminders(
    workspace_id: str,
    record_id: str | None = Query(default=None),
    status: str | None = Query(default=None),
    due_before: datetime | None = Query(default=None),
    enabled_only: bool = Query(default=False),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> dict:
    require_workspace_write_access(workspace_id, current_user, db)
    query = db.query(Reminder).filter(Reminder.workspace_id == workspace_id)

    if record_id:
        query = query.filter(Reminder.record_id == record_id)
    if status:
        query = query.filter(Reminder.status == status)
    if due_before:
        query = query.filter(Reminder.remind_at <= due_before)
    if enabled_only:
        query = query.filter(Reminder.is_enabled.is_(True))

    items = query.order_by(Reminder.remind_at.asc(), Reminder.created_at.desc()).all()
    return {"success": True, "data": {"items": [ReminderRead.model_validate(item).model_dump() for item in items]}}


@router.post("/{workspace_id}/records/{record_id}/reminders")
def create_reminder(
    workspace_id: str,
    record_id: str,
    payload: ReminderCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> dict:
    require_workspace_write_access(workspace_id, current_user, db)
    record = db.get(Record, record_id)
    if not record or record.workspace_id != workspace_id:
        raise HTTPException(status_code=404, detail="Record not found")

    reminder = Reminder(
        workspace_id=workspace_id,
        record_id=record_id,
        created_by=current_user.id,
        channel_code=payload.channel_code,
        title=payload.title,
        message=payload.message,
        remind_at=payload.remind_at,
        status="pending",
        is_enabled=payload.is_enabled,
        metadata_json=payload.metadata_json,
    )
    db.add(reminder)
    db.commit()
    db.refresh(reminder)
    return {"success": True, "data": {"reminder": ReminderRead.model_validate(reminder).model_dump()}}


@router.patch("/{workspace_id}/reminders/{reminder_id}")
def update_reminder(
    workspace_id: str,
    reminder_id: str,
    payload: ReminderUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> dict:
    require_workspace_write_access(workspace_id, current_user, db)
    reminder = db.get(Reminder, reminder_id)
    if not reminder or reminder.workspace_id != workspace_id:
        raise HTTPException(status_code=404, detail="Reminder not found")

    changes = payload.model_dump(exclude_unset=True)
    if "status" in changes and changes["status"] == "cancelled" and "cancelled_at" not in changes:
        changes["cancelled_at"] = datetime.now(timezone.utc)

    for field, value in changes.items():
        setattr(reminder, field, value)

    db.add(reminder)
    db.commit()
    db.refresh(reminder)
    return {"success": True, "data": {"reminder": ReminderRead.model_validate(reminder).model_dump()}}


@router.delete("/{workspace_id}/reminders/{reminder_id}")
def delete_reminder(
    workspace_id: str,
    reminder_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> dict:
    require_workspace_member(workspace_id, current_user, db)
    reminder = db.get(Reminder, reminder_id)
    if not reminder or reminder.workspace_id != workspace_id:
        raise HTTPException(status_code=404, detail="Reminder not found")

    db.delete(reminder)
    db.commit()
    return {"success": True, "data": {"deleted": True}}
