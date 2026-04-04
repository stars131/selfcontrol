from __future__ import annotations

from datetime import datetime, timezone

from fastapi import FastAPI
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker
from sqlalchemy.pool import StaticPool

from app.api.deps import get_current_user
from app.api.routes import records as records_route
from app.db.base import Base
from app.db.session import get_db
from app.models import audit_log, conversation, knowledge, media, notification, provider_config, reminder, search_preset, share_link, workspace_transfer_job  # noqa: F401
from app.models.record import Record
from app.models.user import User
from app.models.workspace import Workspace, WorkspaceMember


def build_records_management_client() -> tuple[TestClient, sessionmaker, dict[str, str], dict[str, str]]:
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
            username="records-management-owner",
            email="records-management-owner@example.com",
            password_hash="test-hash",
            display_name="Records Management Owner",
        )
        editor = User(
            username="records-management-editor",
            email="records-management-editor@example.com",
            password_hash="test-hash",
            display_name="Records Management Editor",
        )
        viewer = User(
            username="records-management-viewer",
            email="records-management-viewer@example.com",
            password_hash="test-hash",
            display_name="Records Management Viewer",
        )
        outsider = User(
            username="records-management-outsider",
            email="records-management-outsider@example.com",
            password_hash="test-hash",
            display_name="Records Management Outsider",
        )
        db.add_all([owner, editor, viewer, outsider])
        db.flush()

        workspace = Workspace(
            name="Records Management Workspace",
            slug="records-management-workspace",
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
        db.commit()

        ids = {
            "workspace_id": workspace.id,
            "owner_id": owner.id,
            "editor_id": editor.id,
            "viewer_id": viewer.id,
            "outsider_id": outsider.id,
        }

    current_user_key = {"value": "owner_id"}

    app = FastAPI()
    app.include_router(records_route.router, prefix="/api/v1/workspaces")

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


def create_record_item(
    session_local: sessionmaker,
    *,
    workspace_id: str,
    creator_id: str,
    title: str,
    extra_data: dict,
) -> str:
    with session_local() as db:
        item = Record(
            workspace_id=workspace_id,
            creator_id=creator_id,
            type_code="memo",
            title=title,
            content="seed content",
            source_type="manual",
            status="active",
            extra_data=extra_data,
            created_at=datetime(2026, 4, 4, 10, 0, tzinfo=timezone.utc),
            updated_at=datetime(2026, 4, 4, 10, 0, tzinfo=timezone.utc),
        )
        db.add(item)
        db.commit()
        return item.id


def test_records_management_api_create_uses_location_prepare_rebuild_and_audit(monkeypatch) -> None:
    client, _session_local, ids, current_user_key = build_records_management_client()
    current_user_key["value"] = "editor_id"
    captured_prepare: dict[str, object] = {}
    rebuilt_ids: list[str] = []
    audit_calls: list[dict[str, object]] = []

    def fake_prepare_record_extra_data(*, existing_extra_data, incoming_extra_data, actor_user_id):
        captured_prepare.update(
            {
                "existing_extra_data": existing_extra_data,
                "incoming_extra_data": incoming_extra_data,
                "actor_user_id": actor_user_id,
            }
        )
        return {"normalized": True, "location": {"place_name": "Soup House"}}, True, False

    monkeypatch.setattr(records_route, "prepare_record_extra_data", fake_prepare_record_extra_data)
    monkeypatch.setattr(records_route, "rebuild_record_knowledge", lambda db, record_id: rebuilt_ids.append(record_id))
    monkeypatch.setattr(records_route, "log_audit_event", lambda db, **kwargs: audit_calls.append(kwargs))

    response = client.post(
        f"/api/v1/workspaces/{ids['workspace_id']}/records",
        json={
            "type_code": "food",
            "title": "Soup lunch",
            "content": "Rich broth",
            "source_type": "manual",
            "extra_data": {"raw": True},
        },
    )

    assert response.status_code == 200
    payload = response.json()["data"]["record"]
    assert captured_prepare == {
        "existing_extra_data": None,
        "incoming_extra_data": {"raw": True},
        "actor_user_id": ids["editor_id"],
    }
    assert payload["extra_data"] == {
        "normalized": True,
        "location": {"place_name": "Soup House"},
    }
    assert rebuilt_ids == [payload["id"]]
    assert audit_calls == [
        {
            "workspace_id": ids["workspace_id"],
            "actor_user_id": ids["editor_id"],
            "action_code": "record.create",
            "resource_type": "record",
            "resource_id": payload["id"],
            "message": "Created record Soup lunch",
            "metadata_json": {
                "type_code": "food",
                "source_type": "manual",
                "has_location": True,
                "location_changed": True,
                "location_review_changed": False,
            },
        }
    ]


def test_records_management_api_update_uses_prepare_apply_rebuild_and_audit(monkeypatch) -> None:
    client, session_local, ids, current_user_key = build_records_management_client()
    current_user_key["value"] = "editor_id"
    record_id = create_record_item(
        session_local,
        workspace_id=ids["workspace_id"],
        creator_id=ids["owner_id"],
        title="Original title",
        extra_data={"existing": True},
    )
    captured_prepare: dict[str, object] = {}
    captured_apply: dict[str, object] = {}
    rebuilt_ids: list[str] = []
    audit_calls: list[dict[str, object]] = []

    def fake_prepare_record_extra_data(*, existing_extra_data, incoming_extra_data, actor_user_id):
        captured_prepare.update(
            {
                "existing_extra_data": existing_extra_data,
                "incoming_extra_data": incoming_extra_data,
                "actor_user_id": actor_user_id,
            }
        )
        return {"normalized": True}, False, True

    def fake_apply_record_updates(record, changes):
        captured_apply.update(changes)
        for field, value in changes.items():
            setattr(record, field, value)

    monkeypatch.setattr(records_route, "prepare_record_extra_data", fake_prepare_record_extra_data)
    monkeypatch.setattr(records_route, "apply_record_updates", fake_apply_record_updates)
    monkeypatch.setattr(records_route, "rebuild_record_knowledge", lambda db, record_id: rebuilt_ids.append(record_id))
    monkeypatch.setattr(records_route, "log_audit_event", lambda db, **kwargs: audit_calls.append(kwargs))

    response = client.patch(
        f"/api/v1/workspaces/{ids['workspace_id']}/records/{record_id}",
        json={
            "title": "Updated title",
            "status": "archived",
            "is_avoid": True,
            "extra_data": {"incoming": True},
        },
    )

    assert response.status_code == 200
    assert captured_prepare == {
        "existing_extra_data": {"existing": True},
        "incoming_extra_data": {"incoming": True},
        "actor_user_id": ids["editor_id"],
    }
    assert captured_apply == {
        "title": "Updated title",
        "status": "archived",
        "is_avoid": True,
        "extra_data": {"normalized": True},
    }
    payload = response.json()["data"]["record"]
    assert payload["title"] == "Updated title"
    assert payload["status"] == "archived"
    assert payload["is_avoid"] is True
    assert rebuilt_ids == [record_id]
    assert audit_calls == [
        {
            "workspace_id": ids["workspace_id"],
            "actor_user_id": ids["editor_id"],
            "action_code": "record.update",
            "resource_type": "record",
            "resource_id": record_id,
            "message": "Updated record Updated title",
            "metadata_json": {
                "status": "archived",
                "is_avoid": True,
                "location_changed": False,
                "location_review_changed": True,
            },
        }
    ]


def test_records_management_api_delete_logs_removed_media_count(monkeypatch) -> None:
    client, session_local, ids, current_user_key = build_records_management_client()
    current_user_key["value"] = "editor_id"
    record_id = create_record_item(
        session_local,
        workspace_id=ids["workspace_id"],
        creator_id=ids["owner_id"],
        title="Delete me",
        extra_data={},
    )
    removed_local_counts: list[int] = []
    audit_calls: list[dict[str, object]] = []

    def fake_preflight_remote_record_media_assets(db, media_assets, *, delete_remote_media_fn):
        assert len(media_assets) == 0
        return 2

    def fake_cleanup_local_record_media_assets(media_assets):
        removed_local_counts.append(len(media_assets))
        return 0

    monkeypatch.setattr(
        records_route,
        "preflight_remote_record_media_assets",
        fake_preflight_remote_record_media_assets,
    )
    monkeypatch.setattr(
        records_route,
        "cleanup_local_record_media_assets",
        fake_cleanup_local_record_media_assets,
    )
    monkeypatch.setattr(records_route, "log_audit_event", lambda db, **kwargs: audit_calls.append(kwargs))

    response = client.delete(f"/api/v1/workspaces/{ids['workspace_id']}/records/{record_id}")

    assert response.status_code == 200
    assert response.json()["data"]["deleted"] is True
    assert removed_local_counts == [0]
    assert audit_calls == [
        {
            "workspace_id": ids["workspace_id"],
            "actor_user_id": ids["editor_id"],
            "action_code": "record.delete",
            "resource_type": "record",
            "resource_id": record_id,
            "message": "Deleted record Delete me",
            "metadata_json": {
                "type_code": "memo",
                "removed_media_count": 2,
            },
        }
    ]

    with session_local() as db:
        assert db.get(Record, record_id) is None


def test_records_management_api_enforces_member_vs_write_access() -> None:
    client, session_local, ids, current_user_key = build_records_management_client()
    record_id = create_record_item(
        session_local,
        workspace_id=ids["workspace_id"],
        creator_id=ids["owner_id"],
        title="Protected record",
        extra_data={},
    )

    current_user_key["value"] = "viewer_id"
    detail_response = client.get(f"/api/v1/workspaces/{ids['workspace_id']}/records/{record_id}")
    assert detail_response.status_code == 200

    for method, path in (
        ("post", f"/api/v1/workspaces/{ids['workspace_id']}/records"),
        ("patch", f"/api/v1/workspaces/{ids['workspace_id']}/records/{record_id}"),
        ("delete", f"/api/v1/workspaces/{ids['workspace_id']}/records/{record_id}"),
    ):
        if method == "post":
            response = client.post(
                path,
                json={
                    "type_code": "memo",
                    "title": "Blocked",
                    "content": "viewer cannot create",
                    "source_type": "manual",
                    "extra_data": {},
                },
            )
        elif method == "patch":
            response = client.patch(path, json={"title": "Blocked"})
        else:
            response = client.delete(path)

        assert response.status_code == 403
        assert response.json()["detail"] == "Forbidden"

    current_user_key["value"] = "outsider_id"
    outsider_detail_response = client.get(f"/api/v1/workspaces/{ids['workspace_id']}/records/{record_id}")
    assert outsider_detail_response.status_code == 403
    assert outsider_detail_response.json()["detail"] == "Forbidden"
