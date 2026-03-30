from __future__ import annotations

from datetime import datetime, timedelta, timezone

from fastapi import FastAPI
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker
from sqlalchemy.pool import StaticPool

from app.api.deps import get_current_user
from app.api.routes import notifications as notifications_route
from app.db.base import Base
from app.db.session import get_db
from app.models import audit_log, conversation, knowledge, media, notification, provider_config, record, reminder, search_preset, share_link, workspace_transfer_job  # noqa: F401
from app.models.notification import NotificationEvent
from app.models.user import User
from app.models.workspace import Workspace, WorkspaceMember


def build_notifications_client() -> tuple[TestClient, sessionmaker, dict[str, str], dict[str, str]]:
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
            username="notifications-api-owner",
            email="notifications-api-owner@example.com",
            password_hash="test-hash",
            display_name="Notifications API Owner",
        )
        teammate = User(
            username="notifications-api-teammate",
            email="notifications-api-teammate@example.com",
            password_hash="test-hash",
            display_name="Notifications API Teammate",
        )
        outsider = User(
            username="notifications-api-outsider",
            email="notifications-api-outsider@example.com",
            password_hash="test-hash",
            display_name="Notifications API Outsider",
        )
        db.add_all([owner, teammate, outsider])
        db.flush()

        workspace = Workspace(
            name="Notifications API Workspace",
            slug="notifications-api-workspace",
            owner_id=owner.id,
            visibility="private",
        )
        db.add(workspace)
        db.flush()

        db.add_all(
            [
                WorkspaceMember(workspace_id=workspace.id, user_id=owner.id, role="owner"),
                WorkspaceMember(workspace_id=workspace.id, user_id=teammate.id, role="viewer"),
            ]
        )
        db.commit()

        ids = {
            "workspace_id": workspace.id,
            "owner_id": owner.id,
            "teammate_id": teammate.id,
            "outsider_id": outsider.id,
        }

    current_user_key = {"value": "owner_id"}

    app = FastAPI()
    app.include_router(notifications_route.router, prefix="/api/v1/workspaces")

    def override_get_db():
        db = session_local()
        try:
            yield db
        finally:
            db.close()

    def override_get_current_user():
        with session_local() as db:
            user = db.get(User, ids[current_user_key["value"]])
            assert user is not None
            return user

    app.dependency_overrides[get_db] = override_get_db
    app.dependency_overrides[get_current_user] = override_get_current_user

    return TestClient(app), session_local, ids, current_user_key


def test_notifications_api_sync_dispatches_due_reminders(monkeypatch) -> None:
    client, _session_local, ids, _current_user_key = build_notifications_client()
    captured: dict[str, object] = {}
    now = datetime(2026, 3, 30, 12, 0, tzinfo=timezone.utc)

    def fake_dispatch_due_reminders(db, *, workspace_id):
        captured["workspace_id"] = workspace_id
        return [
            NotificationEvent(
                id="sync-notification-1",
                workspace_id=workspace_id,
                user_id=ids["owner_id"],
                reminder_id=None,
                record_id=None,
                title="Due now",
                message="First reminder",
                event_type="reminder_due",
                status="unread",
                is_read=False,
                read_at=None,
                metadata_json={"channel_code": "in_app"},
                created_at=now,
                updated_at=now,
            ),
            NotificationEvent(
                id="sync-notification-2",
                workspace_id=workspace_id,
                user_id=ids["owner_id"],
                reminder_id=None,
                record_id=None,
                title="Due later",
                message="Second reminder",
                event_type="reminder_due",
                status="unread",
                is_read=False,
                read_at=None,
                metadata_json={"channel_code": "email"},
                created_at=now,
                updated_at=now,
            ),
        ]

    monkeypatch.setattr(notifications_route, "dispatch_due_reminders", fake_dispatch_due_reminders)

    response = client.post(f"/api/v1/workspaces/{ids['workspace_id']}/notifications/sync")

    assert response.status_code == 200
    payload = response.json()["data"]
    assert captured == {"workspace_id": ids["workspace_id"]}
    assert payload["created_count"] == 2
    assert [item["id"] for item in payload["items"]] == ["sync-notification-1", "sync-notification-2"]
    assert payload["items"][0]["title"] == "Due now"


def test_notifications_api_lists_current_user_notifications_with_unread_filter() -> None:
    client, session_local, ids, _current_user_key = build_notifications_client()
    now = datetime(2026, 3, 30, 12, 0, tzinfo=timezone.utc)

    with session_local() as db:
        db.add_all(
            [
                NotificationEvent(
                    workspace_id=ids["workspace_id"],
                    user_id=ids["owner_id"],
                    title="Owner unread latest",
                    message="Latest owner unread item",
                    event_type="reminder_due",
                    status="unread",
                    is_read=False,
                    metadata_json={"source": "owner-latest"},
                    created_at=now,
                    updated_at=now,
                ),
                NotificationEvent(
                    workspace_id=ids["workspace_id"],
                    user_id=ids["owner_id"],
                    title="Owner read older",
                    message="Older owner item",
                    event_type="reminder_due",
                    status="read",
                    is_read=True,
                    read_at=now - timedelta(minutes=2),
                    metadata_json={"source": "owner-older"},
                    created_at=now - timedelta(minutes=5),
                    updated_at=now - timedelta(minutes=2),
                ),
                NotificationEvent(
                    workspace_id=ids["workspace_id"],
                    user_id=ids["teammate_id"],
                    title="Teammate unread newest",
                    message="Should not be visible",
                    event_type="reminder_due",
                    status="unread",
                    is_read=False,
                    metadata_json={"source": "teammate"},
                    created_at=now + timedelta(minutes=1),
                    updated_at=now + timedelta(minutes=1),
                ),
            ]
        )
        db.commit()

    unread_response = client.get(f"/api/v1/workspaces/{ids['workspace_id']}/notifications?unread_only=true")
    assert unread_response.status_code == 200
    unread_items = unread_response.json()["data"]["items"]
    assert [item["title"] for item in unread_items] == ["Owner unread latest"]

    list_response = client.get(f"/api/v1/workspaces/{ids['workspace_id']}/notifications")
    assert list_response.status_code == 200
    items = list_response.json()["data"]["items"]
    assert [item["title"] for item in items] == ["Owner unread latest", "Owner read older"]
    assert all(item["user_id"] == ids["owner_id"] for item in items)


def test_notifications_api_patch_applies_changes_to_scoped_notification(monkeypatch) -> None:
    client, session_local, ids, _current_user_key = build_notifications_client()
    captured_lookup: dict[str, object] = {}
    captured_changes: dict[str, object] = {}
    notification_id = ""
    read_at = datetime(2026, 3, 30, 13, 0, tzinfo=timezone.utc)

    with session_local() as db:
        item = NotificationEvent(
            workspace_id=ids["workspace_id"],
            user_id=ids["owner_id"],
            title="Unread item",
            message="Needs update",
            event_type="reminder_due",
            status="unread",
            is_read=False,
            metadata_json={"source": "patch-test"},
            created_at=read_at - timedelta(minutes=10),
            updated_at=read_at - timedelta(minutes=10),
        )
        db.add(item)
        db.commit()
        notification_id = item.id

    def fake_get_user_workspace_notification_or_404(db, *, workspace_id, notification_id, user_id):
        captured_lookup.update(
            {
                "workspace_id": workspace_id,
                "notification_id": notification_id,
                "user_id": user_id,
            }
        )
        notification_item = db.get(NotificationEvent, notification_id)
        assert notification_item is not None
        return notification_item

    def fake_apply_notification_update(notification, changes):
        captured_changes.update(changes)
        notification.is_read = True
        notification.status = "read"
        notification.read_at = read_at

    monkeypatch.setattr(
        notifications_route,
        "get_user_workspace_notification_or_404",
        fake_get_user_workspace_notification_or_404,
    )
    monkeypatch.setattr(notifications_route, "apply_notification_update", fake_apply_notification_update)

    response = client.patch(
        f"/api/v1/workspaces/{ids['workspace_id']}/notifications/{notification_id}",
        json={"is_read": True},
    )

    assert response.status_code == 200
    assert captured_lookup == {
        "workspace_id": ids["workspace_id"],
        "notification_id": notification_id,
        "user_id": ids["owner_id"],
    }
    assert captured_changes == {"is_read": True}
    payload = response.json()["data"]["notification"]
    assert payload["id"] == notification_id
    assert payload["is_read"] is True
    assert payload["status"] == "read"
    assert payload["read_at"] is not None

    with session_local() as db:
        stored = db.get(NotificationEvent, notification_id)
        assert stored is not None
        assert stored.is_read is True
        assert stored.status == "read"


def test_notifications_api_requires_workspace_membership() -> None:
    client, session_local, ids, current_user_key = build_notifications_client()

    with session_local() as db:
        item = NotificationEvent(
            workspace_id=ids["workspace_id"],
            user_id=ids["owner_id"],
            title="Protected item",
            message="Should remain inaccessible",
            event_type="reminder_due",
            status="unread",
            is_read=False,
            metadata_json={},
        )
        db.add(item)
        db.commit()
        notification_id = item.id

    current_user_key["value"] = "outsider_id"

    for method, path in (
        ("post", f"/api/v1/workspaces/{ids['workspace_id']}/notifications/sync"),
        ("get", f"/api/v1/workspaces/{ids['workspace_id']}/notifications"),
        ("patch", f"/api/v1/workspaces/{ids['workspace_id']}/notifications/{notification_id}"),
    ):
        if method == "patch":
            response = client.patch(path, json={"is_read": True})
        elif method == "post":
            response = client.post(path)
        else:
            response = client.get(path)

        assert response.status_code == 403
        assert response.json()["detail"] == "Forbidden"
