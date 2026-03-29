from __future__ import annotations

from datetime import datetime, timedelta, timezone

from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker
from sqlalchemy.pool import StaticPool

from app.db.base import Base
from app.models import audit_log, conversation, knowledge, media, notification, provider_config, record, reminder, search_preset, share_link  # noqa: F401
from app.models.notification import NotificationEvent
from app.models.record import Record
from app.models.reminder import Reminder
from app.models.user import User
from app.models.workspace import Workspace, WorkspaceMember
from app.services.reminders import dispatch_due_reminders


def build_reminders_service_session() -> tuple[sessionmaker, dict[str, str]]:
    engine = create_engine(
        "sqlite://",
        connect_args={"check_same_thread": False},
        poolclass=StaticPool,
        future=True,
    )
    session_local = sessionmaker(bind=engine, autoflush=False, autocommit=False, class_=Session)
    Base.metadata.create_all(bind=engine)

    with session_local() as db:
        user = User(
            username="reminders-service-user",
            email="reminders-service@example.com",
            password_hash="test-hash",
            display_name="Reminders Service User",
        )
        db.add(user)
        db.flush()

        primary_workspace = Workspace(
            name="Primary Reminder Workspace",
            slug="primary-reminder-workspace",
            owner_id=user.id,
            visibility="private",
        )
        secondary_workspace = Workspace(
            name="Secondary Reminder Workspace",
            slug="secondary-reminder-workspace",
            owner_id=user.id,
            visibility="private",
        )
        db.add(primary_workspace)
        db.add(secondary_workspace)
        db.flush()

        db.add(WorkspaceMember(workspace_id=primary_workspace.id, user_id=user.id, role="owner"))
        db.add(WorkspaceMember(workspace_id=secondary_workspace.id, user_id=user.id, role="owner"))
        db.flush()

        primary_record = Record(
            workspace_id=primary_workspace.id,
            creator_id=user.id,
            type_code="memo",
            title="Primary record",
            content="Primary record content",
            source_type="manual",
            extra_data={},
        )
        blank_record = Record(
            workspace_id=primary_workspace.id,
            creator_id=user.id,
            type_code="memo",
            title=None,
            content=None,
            source_type="manual",
            extra_data={},
        )
        secondary_record = Record(
            workspace_id=secondary_workspace.id,
            creator_id=user.id,
            type_code="memo",
            title="Secondary record",
            content="Secondary record content",
            source_type="manual",
            extra_data={},
        )
        db.add(primary_record)
        db.add(blank_record)
        db.add(secondary_record)
        db.commit()
        return session_local, {
            "user_id": user.id,
            "primary_workspace_id": primary_workspace.id,
            "secondary_workspace_id": secondary_workspace.id,
            "primary_record_id": primary_record.id,
            "blank_record_id": blank_record.id,
            "secondary_record_id": secondary_record.id,
        }


def test_dispatch_due_reminders_creates_notifications_and_marks_reminders_delivered() -> None:
    session_local, ids = build_reminders_service_session()
    active_now = datetime(2026, 3, 29, 12, 0, tzinfo=timezone.utc)

    with session_local() as db:
        reminder = Reminder(
            workspace_id=ids["primary_workspace_id"],
            record_id=ids["primary_record_id"],
            created_by=ids["user_id"],
            channel_code="in_app",
            title="Lunch reminder",
            message="Remember the noodles shop",
            remind_at=active_now - timedelta(minutes=10),
            status="pending",
            is_enabled=True,
            metadata_json={},
        )
        db.add(reminder)
        db.commit()
        reminder_id = reminder.id

        notifications = dispatch_due_reminders(db, now=active_now)
        db.expire_all()
        stored_reminder = db.get(Reminder, reminder_id)
        stored_notification = db.get(NotificationEvent, notifications[0].id)
        expected_remind_at = stored_reminder.remind_at.isoformat()

    assert len(notifications) == 1
    assert stored_notification.workspace_id == ids["primary_workspace_id"]
    assert stored_notification.user_id == ids["user_id"]
    assert stored_notification.reminder_id == reminder_id
    assert stored_notification.record_id == ids["primary_record_id"]
    assert stored_notification.title == "Lunch reminder"
    assert stored_notification.message == "Remember the noodles shop"
    assert stored_notification.event_type == "reminder_due"
    assert stored_notification.status == "unread"
    assert stored_notification.is_read is False
    assert stored_notification.metadata_json == {
        "channel_code": "in_app",
        "remind_at": expected_remind_at,
    }
    assert stored_reminder.status == "delivered"
    assert stored_reminder.is_enabled is False
    assert stored_reminder.delivered_at.isoformat() == active_now.replace(tzinfo=None).isoformat()


def test_dispatch_due_reminders_falls_back_to_record_text_and_default_title() -> None:
    session_local, ids = build_reminders_service_session()
    active_now = datetime(2026, 3, 29, 12, 0, tzinfo=timezone.utc)

    with session_local() as db:
        reminder_with_record_fallback = Reminder(
            workspace_id=ids["primary_workspace_id"],
            record_id=ids["primary_record_id"],
            created_by=ids["user_id"],
            channel_code="sms",
            title=None,
            message=None,
            remind_at=active_now - timedelta(minutes=15),
            status="pending",
            is_enabled=True,
            metadata_json={},
        )
        reminder_with_default_title = Reminder(
            workspace_id=ids["primary_workspace_id"],
            record_id=ids["blank_record_id"],
            created_by=ids["user_id"],
            channel_code="in_app",
            title=None,
            message=None,
            remind_at=active_now - timedelta(minutes=5),
            status="pending",
            is_enabled=True,
            metadata_json={},
        )
        db.add(reminder_with_record_fallback)
        db.add(reminder_with_default_title)
        db.commit()

        notifications = dispatch_due_reminders(db, now=active_now)

    assert len(notifications) == 2
    assert notifications[0].title == "Primary record"
    assert notifications[0].message == "Primary record content"
    assert notifications[0].metadata_json["channel_code"] == "sms"
    assert notifications[1].title == "Reminder due"
    assert notifications[1].message is None


def test_dispatch_due_reminders_respects_workspace_scope_and_filtering() -> None:
    session_local, ids = build_reminders_service_session()
    active_now = datetime(2026, 3, 29, 12, 0, tzinfo=timezone.utc)

    with session_local() as db:
        due_primary = Reminder(
            workspace_id=ids["primary_workspace_id"],
            record_id=ids["primary_record_id"],
            created_by=ids["user_id"],
            channel_code="in_app",
            title="Primary due",
            message=None,
            remind_at=active_now - timedelta(minutes=30),
            status="pending",
            is_enabled=True,
            metadata_json={},
        )
        due_secondary = Reminder(
            workspace_id=ids["secondary_workspace_id"],
            record_id=ids["secondary_record_id"],
            created_by=ids["user_id"],
            channel_code="in_app",
            title="Secondary due",
            message=None,
            remind_at=active_now - timedelta(minutes=20),
            status="pending",
            is_enabled=True,
            metadata_json={},
        )
        future_primary = Reminder(
            workspace_id=ids["primary_workspace_id"],
            record_id=ids["primary_record_id"],
            created_by=ids["user_id"],
            channel_code="in_app",
            title="Future reminder",
            message=None,
            remind_at=active_now + timedelta(minutes=20),
            status="pending",
            is_enabled=True,
            metadata_json={},
        )
        disabled_primary = Reminder(
            workspace_id=ids["primary_workspace_id"],
            record_id=ids["primary_record_id"],
            created_by=ids["user_id"],
            channel_code="in_app",
            title="Disabled reminder",
            message=None,
            remind_at=active_now - timedelta(minutes=25),
            status="pending",
            is_enabled=False,
            metadata_json={},
        )
        cancelled_primary = Reminder(
            workspace_id=ids["primary_workspace_id"],
            record_id=ids["primary_record_id"],
            created_by=ids["user_id"],
            channel_code="in_app",
            title="Cancelled reminder",
            message=None,
            remind_at=active_now - timedelta(minutes=35),
            status="cancelled",
            is_enabled=True,
            metadata_json={},
        )
        db.add_all(
            [
                due_primary,
                due_secondary,
                future_primary,
                disabled_primary,
                cancelled_primary,
            ]
        )
        db.commit()
        tracked_ids = {
            "due_primary": due_primary.id,
            "due_secondary": due_secondary.id,
            "future_primary": future_primary.id,
            "disabled_primary": disabled_primary.id,
            "cancelled_primary": cancelled_primary.id,
        }

        notifications = dispatch_due_reminders(
            db,
            workspace_id=ids["primary_workspace_id"],
            now=active_now,
        )
        notification_id = notifications[0].id
        db.expire_all()

    assert len(notifications) == 1

    with session_local() as db:
        stored_notification = db.get(NotificationEvent, notification_id)
        assert db.query(NotificationEvent).count() == 1
        assert stored_notification.title == "Primary due"
        assert db.get(Reminder, tracked_ids["due_primary"]).status == "delivered"
        assert db.get(Reminder, tracked_ids["due_secondary"]).status == "pending"
        assert db.get(Reminder, tracked_ids["future_primary"]).status == "pending"
        assert db.get(Reminder, tracked_ids["disabled_primary"]).status == "pending"
        assert db.get(Reminder, tracked_ids["cancelled_primary"]).status == "cancelled"


def test_dispatch_due_reminders_returns_empty_list_when_nothing_is_due() -> None:
    session_local, ids = build_reminders_service_session()
    active_now = datetime(2026, 3, 29, 12, 0, tzinfo=timezone.utc)

    with session_local() as db:
        reminder = Reminder(
            workspace_id=ids["primary_workspace_id"],
            record_id=ids["primary_record_id"],
            created_by=ids["user_id"],
            channel_code="in_app",
            title="Later reminder",
            message=None,
            remind_at=active_now + timedelta(hours=1),
            status="pending",
            is_enabled=True,
            metadata_json={},
        )
        db.add(reminder)
        db.commit()
        reminder_id = reminder.id

        notifications = dispatch_due_reminders(db, now=active_now)
        db.expire_all()

    assert notifications == []

    with session_local() as db:
        stored_reminder = db.get(Reminder, reminder_id)
        assert stored_reminder.status == "pending"
        assert stored_reminder.is_enabled is True
        assert stored_reminder.delivered_at is None
        assert db.query(NotificationEvent).count() == 0
