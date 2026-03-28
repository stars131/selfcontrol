from __future__ import annotations

from datetime import datetime, timezone

from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.notification import NotificationEvent
from app.models.record import Record
from app.models.reminder import Reminder


def get_workspace_record_or_404(db: Session, *, workspace_id: str, record_id: str) -> Record:
    record = db.get(Record, record_id)
    if not record or record.workspace_id != workspace_id:
        raise HTTPException(status_code=404, detail="Record not found")
    return record


def get_workspace_reminder_or_404(db: Session, *, workspace_id: str, reminder_id: str) -> Reminder:
    reminder = db.get(Reminder, reminder_id)
    if not reminder or reminder.workspace_id != workspace_id:
        raise HTTPException(status_code=404, detail="Reminder not found")
    return reminder


def get_user_workspace_notification_or_404(
    db: Session,
    *,
    workspace_id: str,
    notification_id: str,
    user_id: str,
) -> NotificationEvent:
    notification = db.get(NotificationEvent, notification_id)
    if not notification or notification.workspace_id != workspace_id or notification.user_id != user_id:
        raise HTTPException(status_code=404, detail="Notification not found")
    return notification


def apply_reminder_update(reminder: Reminder, changes: dict) -> None:
    if "status" in changes and changes["status"] == "cancelled" and "cancelled_at" not in changes:
        changes["cancelled_at"] = datetime.now(timezone.utc)

    for field, value in changes.items():
        setattr(reminder, field, value)


def apply_notification_update(notification: NotificationEvent, changes: dict) -> None:
    if "is_read" in changes:
        notification.is_read = changes["is_read"]
        notification.status = "read" if changes["is_read"] else "unread"
        notification.read_at = datetime.now(timezone.utc) if changes["is_read"] else None
    if "status" in changes:
        notification.status = changes["status"]
