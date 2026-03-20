from __future__ import annotations

from datetime import datetime, timezone

from sqlalchemy.orm import Session

from app.models.notification import NotificationEvent
from app.models.record import Record
from app.models.reminder import Reminder


def dispatch_due_reminders(
    db: Session,
    *,
    workspace_id: str | None = None,
    now: datetime | None = None,
) -> list[NotificationEvent]:
    active_now = now or datetime.now(timezone.utc)
    query = db.query(Reminder).filter(
        Reminder.is_enabled.is_(True),
        Reminder.status == "pending",
        Reminder.remind_at <= active_now,
    )
    if workspace_id:
        query = query.filter(Reminder.workspace_id == workspace_id)

    reminders = query.order_by(Reminder.remind_at.asc()).all()
    notifications: list[NotificationEvent] = []

    for reminder in reminders:
        record = db.get(Record, reminder.record_id)
        title = reminder.title or (record.title if record and record.title else "Reminder due")
        message = reminder.message or (record.content if record and record.content else None)

        notification = NotificationEvent(
            workspace_id=reminder.workspace_id,
            user_id=reminder.created_by,
            reminder_id=reminder.id,
            record_id=reminder.record_id,
            title=title,
            message=message,
            event_type="reminder_due",
            status="unread",
            is_read=False,
            metadata_json={
                "channel_code": reminder.channel_code,
                "remind_at": reminder.remind_at.isoformat(),
            },
        )
        db.add(notification)

        reminder.status = "delivered"
        reminder.delivered_at = active_now
        reminder.is_enabled = False
        db.add(reminder)
        notifications.append(notification)

    if notifications:
        db.commit()
        for notification in notifications:
            db.refresh(notification)
    else:
        db.rollback()

    return notifications
