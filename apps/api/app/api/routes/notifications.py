from __future__ import annotations

from datetime import datetime, timezone

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.api.deps import get_current_user, require_workspace_member
from app.db.session import get_db
from app.models.notification import NotificationEvent
from app.models.user import User
from app.schemas.notification import NotificationRead, NotificationUpdate
from app.services.reminders import dispatch_due_reminders


router = APIRouter()


@router.post("/{workspace_id}/notifications/sync")
def sync_due_reminders(
    workspace_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> dict:
    require_workspace_member(workspace_id, current_user, db)
    notifications = dispatch_due_reminders(db, workspace_id=workspace_id)
    return {
        "success": True,
        "data": {
            "created_count": len(notifications),
            "items": [NotificationRead.model_validate(item).model_dump() for item in notifications],
        },
    }


@router.get("/{workspace_id}/notifications")
def list_notifications(
    workspace_id: str,
    unread_only: bool = Query(default=False),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> dict:
    require_workspace_member(workspace_id, current_user, db)
    query = db.query(NotificationEvent).filter(
        NotificationEvent.workspace_id == workspace_id,
        NotificationEvent.user_id == current_user.id,
    )
    if unread_only:
        query = query.filter(NotificationEvent.is_read.is_(False))

    items = query.order_by(NotificationEvent.created_at.desc()).limit(50).all()
    return {"success": True, "data": {"items": [NotificationRead.model_validate(item).model_dump() for item in items]}}


@router.patch("/{workspace_id}/notifications/{notification_id}")
def update_notification(
    workspace_id: str,
    notification_id: str,
    payload: NotificationUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> dict:
    require_workspace_member(workspace_id, current_user, db)
    notification = db.get(NotificationEvent, notification_id)
    if not notification or notification.workspace_id != workspace_id or notification.user_id != current_user.id:
        raise HTTPException(status_code=404, detail="Notification not found")

    changes = payload.model_dump(exclude_unset=True)
    if "is_read" in changes:
        notification.is_read = changes["is_read"]
        notification.status = "read" if changes["is_read"] else "unread"
        notification.read_at = datetime.now(timezone.utc) if changes["is_read"] else None
    if "status" in changes:
        notification.status = changes["status"]

    db.add(notification)
    db.commit()
    db.refresh(notification)
    return {"success": True, "data": {"notification": NotificationRead.model_validate(notification).model_dump()}}
