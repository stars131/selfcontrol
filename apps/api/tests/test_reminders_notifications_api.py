from __future__ import annotations

from datetime import datetime, timedelta, timezone

from fastapi import FastAPI
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker
from sqlalchemy.pool import StaticPool

from app.api.deps import get_current_user
from app.api.routes import notifications as notifications_route
from app.api.routes import reminders as reminders_route
from app.db.base import Base
from app.db.session import get_db
from app.models import audit_log, conversation, knowledge, media, notification, provider_config, record, reminder, search_preset, share_link  # noqa: F401
from app.models.notification import NotificationEvent
from app.models.record import Record
from app.models.reminder import Reminder
from app.models.user import User
from app.models.workspace import Workspace, WorkspaceMember


def build_reminder_client() -> tuple[TestClient, sessionmaker, str, str]:
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
            username="reminder-owner",
            email="reminder-owner@example.com",
            password_hash="test-hash",
            display_name="Reminder Owner",
        )
        db.add(user)
        db.flush()

        workspace = Workspace(
            name="Reminder Workspace",
            slug="reminder-workspace",
            owner_id=user.id,
            visibility="private",
        )
        db.add(workspace)
        db.flush()

        db.add(WorkspaceMember(workspace_id=workspace.id, user_id=user.id, role="owner"))
        db.flush()

        record = Record(
            workspace_id=workspace.id,
            creator_id=user.id,
            type_code="memo",
            title="Test record",
            content="Remember this",
            source_type="manual",
            extra_data={},
        )
        db.add(record)
        db.commit()
        workspace_id = workspace.id
        user_id = user.id
        record_id = record.id

    app = FastAPI()
    app.include_router(reminders_route.router, prefix="/api/v1/workspaces")
    app.include_router(notifications_route.router, prefix="/api/v1/workspaces")

    def override_get_db():
        db = session_local()
        try:
            yield db
        finally:
            db.close()

    def override_get_current_user():
        db = session_local()
        try:
            return db.get(User, user_id)
        finally:
            db.close()

    app.dependency_overrides[get_db] = override_get_db
    app.dependency_overrides[get_current_user] = override_get_current_user
    client = TestClient(app)
    client.record_id = record_id  # type: ignore[attr-defined]
    return client, session_local, workspace_id, record_id


def test_reminder_crud_flow_and_filtering() -> None:
    client, _session_local, workspace_id, record_id = build_reminder_client()
    remind_at = (datetime.now(timezone.utc) + timedelta(hours=1)).isoformat()

    create_response = client.post(
        f"/api/v1/workspaces/{workspace_id}/records/{record_id}/reminders",
        json={
            "title": "Buy later",
            "message": "Do not forget",
            "remind_at": remind_at,
            "channel_code": "in_app",
            "is_enabled": True,
            "metadata_json": {"source": "test"},
        },
    )
    assert create_response.status_code == 200
    reminder_payload = create_response.json()["data"]["reminder"]
    reminder_id = reminder_payload["id"]
    assert reminder_payload["status"] == "pending"

    list_response = client.get(f"/api/v1/workspaces/{workspace_id}/reminders?record_id={record_id}&enabled_only=true")
    assert list_response.status_code == 200
    assert len(list_response.json()["data"]["items"]) == 1

    update_response = client.patch(
        f"/api/v1/workspaces/{workspace_id}/reminders/{reminder_id}",
        json={"status": "cancelled"},
    )
    assert update_response.status_code == 200
    updated = update_response.json()["data"]["reminder"]
    assert updated["status"] == "cancelled"
    assert updated["cancelled_at"] is not None

    delete_response = client.delete(f"/api/v1/workspaces/{workspace_id}/reminders/{reminder_id}")
    assert delete_response.status_code == 200
    assert delete_response.json()["data"]["deleted"] is True


def test_notification_sync_list_and_mark_read_flow() -> None:
    client, session_local, workspace_id, record_id = build_reminder_client()

    with session_local() as db:
        current_user = db.query(User).first()
        reminder = Reminder(
            workspace_id=workspace_id,
            record_id=record_id,
            created_by=current_user.id,
            channel_code="in_app",
            title="Due now",
            message="Notification body",
            remind_at=datetime.now(timezone.utc) - timedelta(minutes=5),
            status="pending",
            is_enabled=True,
            metadata_json={},
        )
        db.add(reminder)
        db.commit()
        reminder_id = reminder.id

    sync_response = client.post(f"/api/v1/workspaces/{workspace_id}/notifications/sync")
    assert sync_response.status_code == 200
    sync_payload = sync_response.json()["data"]
    assert sync_payload["created_count"] == 1
    notification_id = sync_payload["items"][0]["id"]

    list_response = client.get(f"/api/v1/workspaces/{workspace_id}/notifications?unread_only=true")
    assert list_response.status_code == 200
    items = list_response.json()["data"]["items"]
    assert len(items) == 1
    assert items[0]["reminder_id"] == reminder_id

    update_response = client.patch(
        f"/api/v1/workspaces/{workspace_id}/notifications/{notification_id}",
        json={"is_read": True},
    )
    assert update_response.status_code == 200
    updated = update_response.json()["data"]["notification"]
    assert updated["is_read"] is True
    assert updated["status"] == "read"
    assert updated["read_at"] is not None

    with session_local() as db:
        reminder = db.get(Reminder, reminder_id)
        notification = db.get(NotificationEvent, notification_id)
        assert reminder.status == "delivered"
        assert reminder.is_enabled is False
        assert notification.is_read is True
