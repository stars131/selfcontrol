from __future__ import annotations

from datetime import datetime, timezone

from fastapi import HTTPException
from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker
from sqlalchemy.pool import StaticPool

from app.api.routes.reminder_route_helpers import (
    apply_notification_update,
    apply_reminder_update,
    get_user_workspace_notification_or_404,
    get_workspace_record_or_404,
    get_workspace_reminder_or_404,
)
from app.db.base import Base
from app.models import audit_log, conversation, knowledge, media, notification, provider_config, record, reminder, search_preset, share_link, workspace_transfer_job  # noqa: F401
from app.models.notification import NotificationEvent
from app.models.record import Record
from app.models.reminder import Reminder
from app.models.user import User
from app.models.workspace import Workspace


def build_reminder_route_helper_session() -> tuple[sessionmaker, dict[str, str]]:
    engine = create_engine(
        "sqlite://",
        connect_args={"check_same_thread": False},
        poolclass=StaticPool,
        future=True,
    )
    session_local = sessionmaker(bind=engine, autoflush=False, autocommit=False, class_=Session)
    Base.metadata.create_all(bind=engine)

    with session_local() as db:
        owner = User(
            username="reminder-helper-owner",
            email="reminder-helper-owner@example.com",
            password_hash="test-hash",
            display_name="Reminder Helper Owner",
        )
        other_user = User(
            username="reminder-helper-other",
            email="reminder-helper-other@example.com",
            password_hash="test-hash",
            display_name="Reminder Helper Other",
        )
        db.add_all([owner, other_user])
        db.flush()

        workspace = Workspace(
            name="Reminder Helper Workspace",
            slug="reminder-helper-workspace",
            owner_id=owner.id,
            visibility="private",
        )
        other_workspace = Workspace(
            name="Reminder Helper Other Workspace",
            slug="reminder-helper-other-workspace",
            owner_id=other_user.id,
            visibility="private",
        )
        db.add_all([workspace, other_workspace])
        db.flush()

        current_record = Record(
            workspace_id=workspace.id,
            creator_id=owner.id,
            type_code="food",
            title="Reminder record",
            content="Remember this food",
            rating=4,
            is_avoid=False,
            source_type="manual",
            status="active",
            extra_data={},
        )
        other_workspace_record = Record(
            workspace_id=other_workspace.id,
            creator_id=other_user.id,
            type_code="travel",
            title="Other workspace record",
            content="Should not resolve",
            rating=5,
            is_avoid=False,
            source_type="manual",
            status="active",
            extra_data={},
        )
        db.add_all([current_record, other_workspace_record])
        db.flush()

        current_reminder = Reminder(
            workspace_id=workspace.id,
            record_id=current_record.id,
            created_by=owner.id,
            channel_code="in_app",
            title="Lunch reminder",
            message="Check this again tomorrow",
            remind_at=datetime.now(timezone.utc),
            status="pending",
            is_enabled=True,
            metadata_json={},
        )
        other_workspace_reminder = Reminder(
            workspace_id=other_workspace.id,
            record_id=other_workspace_record.id,
            created_by=other_user.id,
            channel_code="in_app",
            title="Other reminder",
            message="Should not resolve",
            remind_at=datetime.now(timezone.utc),
            status="pending",
            is_enabled=True,
            metadata_json={},
        )
        db.add_all([current_reminder, other_workspace_reminder])
        db.flush()

        current_notification = NotificationEvent(
            workspace_id=workspace.id,
            user_id=owner.id,
            reminder_id=current_reminder.id,
            record_id=current_record.id,
            title="Reminder due",
            message="Time to review",
            event_type="reminder_due",
            status="unread",
            is_read=False,
            metadata_json={},
        )
        other_user_notification = NotificationEvent(
            workspace_id=workspace.id,
            user_id=other_user.id,
            reminder_id=current_reminder.id,
            record_id=current_record.id,
            title="Other user notification",
            message="Should not resolve for owner",
            event_type="reminder_due",
            status="unread",
            is_read=False,
            metadata_json={},
        )
        db.add_all([current_notification, other_user_notification])
        db.commit()

        return session_local, {
            "workspace_id": workspace.id,
            "other_workspace_id": other_workspace.id,
            "owner_id": owner.id,
            "other_user_id": other_user.id,
            "record_id": current_record.id,
            "other_workspace_record_id": other_workspace_record.id,
            "reminder_id": current_reminder.id,
            "other_workspace_reminder_id": other_workspace_reminder.id,
            "notification_id": current_notification.id,
            "other_user_notification_id": other_user_notification.id,
        }


def test_workspace_lookup_helpers_cover_record_reminder_and_notification_scoping() -> None:
    session_local, ids = build_reminder_route_helper_session()

    with session_local() as db:
        record_item = get_workspace_record_or_404(
            db,
            workspace_id=ids["workspace_id"],
            record_id=ids["record_id"],
        )
        reminder_item = get_workspace_reminder_or_404(
            db,
            workspace_id=ids["workspace_id"],
            reminder_id=ids["reminder_id"],
        )
        notification_item = get_user_workspace_notification_or_404(
            db,
            workspace_id=ids["workspace_id"],
            notification_id=ids["notification_id"],
            user_id=ids["owner_id"],
        )

        assert record_item.id == ids["record_id"]
        assert reminder_item.id == ids["reminder_id"]
        assert notification_item.id == ids["notification_id"]

        for lookup, expected_detail in (
            (
                lambda: get_workspace_record_or_404(
                    db,
                    workspace_id=ids["workspace_id"],
                    record_id=ids["other_workspace_record_id"],
                ),
                "Record not found",
            ),
            (
                lambda: get_workspace_reminder_or_404(
                    db,
                    workspace_id=ids["workspace_id"],
                    reminder_id=ids["other_workspace_reminder_id"],
                ),
                "Reminder not found",
            ),
            (
                lambda: get_user_workspace_notification_or_404(
                    db,
                    workspace_id=ids["workspace_id"],
                    notification_id=ids["other_user_notification_id"],
                    user_id=ids["owner_id"],
                ),
                "Notification not found",
            ),
        ):
            try:
                lookup()
            except HTTPException as exc:
                assert exc.status_code == 404
                assert exc.detail == expected_detail
            else:
                raise AssertionError("Expected scoped lookup to fail")


def test_apply_reminder_update_sets_cancelled_at_when_missing_and_preserves_explicit_value() -> None:
    session_local, ids = build_reminder_route_helper_session()

    explicit_cancelled_at = datetime(2024, 1, 2, tzinfo=timezone.utc)

    with session_local() as db:
        reminder_item = db.get(Reminder, ids["reminder_id"])
        assert reminder_item is not None

        apply_reminder_update(
            reminder_item,
            {
                "status": "cancelled",
                "message": "Cancelled automatically",
            },
        )

        assert reminder_item.status == "cancelled"
        assert reminder_item.message == "Cancelled automatically"
        assert reminder_item.cancelled_at is not None

        apply_reminder_update(
            reminder_item,
            {
                "status": "cancelled",
                "cancelled_at": explicit_cancelled_at,
            },
        )

        assert reminder_item.cancelled_at == explicit_cancelled_at


def test_apply_notification_update_covers_read_state_transitions_and_status_override() -> None:
    session_local, ids = build_reminder_route_helper_session()

    with session_local() as db:
        notification_item = db.get(NotificationEvent, ids["notification_id"])
        assert notification_item is not None

        apply_notification_update(
            notification_item,
            {
                "is_read": True,
            },
        )

        assert notification_item.is_read is True
        assert notification_item.status == "read"
        assert notification_item.read_at is not None

        apply_notification_update(
            notification_item,
            {
                "is_read": False,
            },
        )

        assert notification_item.is_read is False
        assert notification_item.status == "unread"
        assert notification_item.read_at is None

        apply_notification_update(
            notification_item,
            {
                "is_read": True,
                "status": "archived",
            },
        )

        assert notification_item.is_read is True
        assert notification_item.status == "archived"
        assert notification_item.read_at is not None
