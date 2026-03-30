from __future__ import annotations

from datetime import datetime, timedelta, timezone

from fastapi import FastAPI
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker
from sqlalchemy.pool import StaticPool

from app.api.deps import get_current_user
from app.api.routes import reminders as reminders_route
from app.db.base import Base
from app.db.session import get_db
from app.models import audit_log, conversation, knowledge, media, notification, provider_config, record, reminder, search_preset, share_link, workspace_transfer_job  # noqa: F401
from app.models.record import Record
from app.models.reminder import Reminder
from app.models.user import User
from app.models.workspace import Workspace, WorkspaceMember


def build_reminders_client() -> tuple[TestClient, sessionmaker, dict[str, str], dict[str, str]]:
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
            username="reminders-api-owner",
            email="reminders-api-owner@example.com",
            password_hash="test-hash",
            display_name="Reminders API Owner",
        )
        editor = User(
            username="reminders-api-editor",
            email="reminders-api-editor@example.com",
            password_hash="test-hash",
            display_name="Reminders API Editor",
        )
        viewer = User(
            username="reminders-api-viewer",
            email="reminders-api-viewer@example.com",
            password_hash="test-hash",
            display_name="Reminders API Viewer",
        )
        db.add_all([owner, editor, viewer])
        db.flush()

        workspace = Workspace(
            name="Reminders API Workspace",
            slug="reminders-api-workspace",
            owner_id=owner.id,
            visibility="private",
        )
        db.add(workspace)
        db.flush()

        db.add_all(
            [
                WorkspaceMember(workspace_id=workspace.id, user_id=owner.id, role="owner"),
                WorkspaceMember(workspace_id=workspace.id, user_id=editor.id, role="editor"),
                WorkspaceMember(workspace_id=workspace.id, user_id=viewer.id, role="viewer"),
            ]
        )
        db.flush()

        primary_record = Record(
            workspace_id=workspace.id,
            creator_id=owner.id,
            type_code="memo",
            title="Primary reminder record",
            content="Track this reminder",
            source_type="manual",
            status="active",
            extra_data={},
        )
        secondary_record = Record(
            workspace_id=workspace.id,
            creator_id=owner.id,
            type_code="memo",
            title="Secondary reminder record",
            content="Separate reminder scope",
            source_type="manual",
            status="active",
            extra_data={},
        )
        db.add_all([primary_record, secondary_record])
        db.commit()

        ids = {
            "workspace_id": workspace.id,
            "owner_id": owner.id,
            "editor_id": editor.id,
            "viewer_id": viewer.id,
            "primary_record_id": primary_record.id,
            "secondary_record_id": secondary_record.id,
        }

    current_role = {"value": "owner_id"}

    app = FastAPI()
    app.include_router(reminders_route.router, prefix="/api/v1/workspaces")

    def override_get_db():
        db = session_local()
        try:
            yield db
        finally:
            db.close()

    def override_get_current_user():
        with session_local() as db:
            user = db.get(User, ids[current_role["value"]])
            assert user is not None
            return user

    app.dependency_overrides[get_db] = override_get_db
    app.dependency_overrides[get_current_user] = override_get_current_user

    return TestClient(app), session_local, ids, current_role


def test_reminders_api_lists_filtered_items_in_due_order() -> None:
    client, session_local, ids, current_role = build_reminders_client()
    current_role["value"] = "editor_id"
    now = datetime(2026, 3, 30, 12, 0, tzinfo=timezone.utc)

    with session_local() as db:
        db.add_all(
            [
                Reminder(
                    workspace_id=ids["workspace_id"],
                    record_id=ids["primary_record_id"],
                    created_by=ids["owner_id"],
                    channel_code="in_app",
                    title="Eligible first",
                    message="Returned first",
                    remind_at=now + timedelta(minutes=30),
                    status="pending",
                    is_enabled=True,
                    metadata_json={},
                    created_at=now,
                    updated_at=now,
                ),
                Reminder(
                    workspace_id=ids["workspace_id"],
                    record_id=ids["primary_record_id"],
                    created_by=ids["owner_id"],
                    channel_code="in_app",
                    title="Too late",
                    message="Filtered by due_before",
                    remind_at=now + timedelta(hours=3),
                    status="pending",
                    is_enabled=True,
                    metadata_json={},
                    created_at=now,
                    updated_at=now,
                ),
                Reminder(
                    workspace_id=ids["workspace_id"],
                    record_id=ids["primary_record_id"],
                    created_by=ids["owner_id"],
                    channel_code="in_app",
                    title="Disabled",
                    message="Filtered by enabled_only",
                    remind_at=now + timedelta(minutes=10),
                    status="pending",
                    is_enabled=False,
                    metadata_json={},
                    created_at=now,
                    updated_at=now,
                ),
                Reminder(
                    workspace_id=ids["workspace_id"],
                    record_id=ids["primary_record_id"],
                    created_by=ids["owner_id"],
                    channel_code="in_app",
                    title="Delivered",
                    message="Filtered by status",
                    remind_at=now + timedelta(minutes=20),
                    status="delivered",
                    is_enabled=True,
                    metadata_json={},
                    created_at=now,
                    updated_at=now,
                ),
                Reminder(
                    workspace_id=ids["workspace_id"],
                    record_id=ids["secondary_record_id"],
                    created_by=ids["owner_id"],
                    channel_code="in_app",
                    title="Other record",
                    message="Filtered by record_id",
                    remind_at=now + timedelta(minutes=15),
                    status="pending",
                    is_enabled=True,
                    metadata_json={},
                    created_at=now,
                    updated_at=now,
                ),
            ]
        )
        db.commit()

    response = client.get(
        f"/api/v1/workspaces/{ids['workspace_id']}/reminders",
        params={
            "record_id": ids["primary_record_id"],
            "status": "pending",
            "due_before": (now + timedelta(hours=1)).isoformat(),
            "enabled_only": "true",
        },
    )

    assert response.status_code == 200
    items = response.json()["data"]["items"]
    assert [item["title"] for item in items] == ["Eligible first"]


def test_reminders_api_create_uses_scoped_record_lookup_and_pending_defaults(monkeypatch) -> None:
    client, session_local, ids, current_role = build_reminders_client()
    current_role["value"] = "editor_id"
    captured_lookup: dict[str, object] = {}
    remind_at = datetime(2026, 3, 30, 16, 0, tzinfo=timezone.utc)

    def fake_get_workspace_record_or_404(db, *, workspace_id, record_id):
        captured_lookup.update({"workspace_id": workspace_id, "record_id": record_id})
        return db.get(Record, record_id)

    monkeypatch.setattr(reminders_route, "get_workspace_record_or_404", fake_get_workspace_record_or_404)

    response = client.post(
        f"/api/v1/workspaces/{ids['workspace_id']}/records/{ids['primary_record_id']}/reminders",
        json={
            "title": "Editor reminder",
            "message": "Created through API",
            "remind_at": remind_at.isoformat(),
            "channel_code": "email",
            "is_enabled": True,
            "metadata_json": {"source": "api-test"},
        },
    )

    assert response.status_code == 200
    assert captured_lookup == {
        "workspace_id": ids["workspace_id"],
        "record_id": ids["primary_record_id"],
    }
    payload = response.json()["data"]["reminder"]
    assert payload["record_id"] == ids["primary_record_id"]
    assert payload["created_by"] == ids["editor_id"]
    assert payload["status"] == "pending"
    assert payload["channel_code"] == "email"
    assert payload["metadata_json"] == {"source": "api-test"}

    with session_local() as db:
        stored = db.get(Reminder, payload["id"])
        assert stored is not None
        assert stored.created_by == ids["editor_id"]


def test_reminders_api_patch_applies_changes_via_helper(monkeypatch) -> None:
    client, session_local, ids, current_role = build_reminders_client()
    current_role["value"] = "editor_id"
    captured_lookup: dict[str, object] = {}
    captured_changes: dict[str, object] = {}
    cancelled_at = datetime(2026, 3, 30, 18, 0, tzinfo=timezone.utc)

    with session_local() as db:
        item = Reminder(
            workspace_id=ids["workspace_id"],
            record_id=ids["primary_record_id"],
            created_by=ids["owner_id"],
            channel_code="in_app",
            title="Update me",
            message="Patch target",
            remind_at=cancelled_at - timedelta(hours=1),
            status="pending",
            is_enabled=True,
            metadata_json={"source": "patch-test"},
        )
        db.add(item)
        db.commit()
        reminder_id = item.id

    def fake_get_workspace_reminder_or_404(db, *, workspace_id, reminder_id):
        captured_lookup.update({"workspace_id": workspace_id, "reminder_id": reminder_id})
        reminder_item = db.get(Reminder, reminder_id)
        assert reminder_item is not None
        return reminder_item

    def fake_apply_reminder_update(reminder, changes):
        captured_changes.update(changes)
        reminder.status = "cancelled"
        reminder.is_enabled = False
        reminder.cancelled_at = cancelled_at

    monkeypatch.setattr(reminders_route, "get_workspace_reminder_or_404", fake_get_workspace_reminder_or_404)
    monkeypatch.setattr(reminders_route, "apply_reminder_update", fake_apply_reminder_update)

    response = client.patch(
        f"/api/v1/workspaces/{ids['workspace_id']}/reminders/{reminder_id}",
        json={"status": "cancelled", "is_enabled": False},
    )

    assert response.status_code == 200
    assert captured_lookup == {
        "workspace_id": ids["workspace_id"],
        "reminder_id": reminder_id,
    }
    assert captured_changes == {
        "status": "cancelled",
        "is_enabled": False,
    }
    payload = response.json()["data"]["reminder"]
    assert payload["id"] == reminder_id
    assert payload["status"] == "cancelled"
    assert payload["is_enabled"] is False
    assert payload["cancelled_at"] is not None


def test_reminders_api_requires_write_access_and_allows_editor_delete() -> None:
    client, session_local, ids, current_role = build_reminders_client()

    with session_local() as db:
        item = Reminder(
            workspace_id=ids["workspace_id"],
            record_id=ids["primary_record_id"],
            created_by=ids["owner_id"],
            channel_code="in_app",
            title="Protected reminder",
            message="Delete permission check",
            remind_at=datetime(2026, 3, 30, 19, 0, tzinfo=timezone.utc),
            status="pending",
            is_enabled=True,
            metadata_json={},
        )
        db.add(item)
        db.commit()
        reminder_id = item.id

    current_role["value"] = "viewer_id"

    for method, path in (
        ("get", f"/api/v1/workspaces/{ids['workspace_id']}/reminders"),
        ("post", f"/api/v1/workspaces/{ids['workspace_id']}/records/{ids['primary_record_id']}/reminders"),
        ("patch", f"/api/v1/workspaces/{ids['workspace_id']}/reminders/{reminder_id}"),
        ("delete", f"/api/v1/workspaces/{ids['workspace_id']}/reminders/{reminder_id}"),
    ):
        if method == "post":
            response = client.post(
                path,
                json={
                    "title": "Blocked reminder",
                    "message": "Viewer cannot create",
                    "remind_at": datetime(2026, 3, 30, 20, 0, tzinfo=timezone.utc).isoformat(),
                    "channel_code": "in_app",
                    "is_enabled": True,
                    "metadata_json": {},
                },
            )
        elif method == "patch":
            response = client.patch(path, json={"status": "cancelled"})
        elif method == "delete":
            response = client.delete(path)
        else:
            response = client.get(path)

        assert response.status_code == 403
        assert response.json()["detail"] == "Forbidden"

    current_role["value"] = "editor_id"
    delete_response = client.delete(f"/api/v1/workspaces/{ids['workspace_id']}/reminders/{reminder_id}")
    assert delete_response.status_code == 200
    assert delete_response.json()["data"]["deleted"] is True

    with session_local() as db:
        assert db.get(Reminder, reminder_id) is None
