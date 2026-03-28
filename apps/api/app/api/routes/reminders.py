from __future__ import annotations

from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.api.deps import get_current_user, require_workspace_member, require_workspace_write_access
from app.api.routes.reminder_route_helpers import (
    apply_reminder_update,
    get_workspace_record_or_404,
    get_workspace_reminder_or_404,
)
from app.db.session import get_db
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
    get_workspace_record_or_404(db, workspace_id=workspace_id, record_id=record_id)

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
    reminder = get_workspace_reminder_or_404(db, workspace_id=workspace_id, reminder_id=reminder_id)

    changes = payload.model_dump(exclude_unset=True)
    apply_reminder_update(reminder, changes)

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
    reminder = get_workspace_reminder_or_404(db, workspace_id=workspace_id, reminder_id=reminder_id)

    db.delete(reminder)
    db.commit()
    return {"success": True, "data": {"deleted": True}}
