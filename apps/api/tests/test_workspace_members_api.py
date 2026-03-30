from __future__ import annotations

from datetime import datetime, timedelta, timezone

from fastapi import FastAPI
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker
from sqlalchemy.pool import StaticPool

from app.api.deps import get_current_user
from app.api.routes import workspaces as workspaces_route
from app.db.base import Base
from app.db.session import get_db
from app.models import audit_log, conversation, knowledge, media, notification, provider_config, record, reminder, search_preset, share_link, workspace_transfer_job  # noqa: F401
from app.models.user import User
from app.models.workspace import Workspace, WorkspaceMember


def build_workspace_members_client() -> tuple[TestClient, sessionmaker, dict[str, str], dict[str, str]]:
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
            username="workspace-members-owner",
            email="workspace-members-owner@example.com",
            password_hash="test-hash",
            display_name="Workspace Members Owner",
        )
        editor = User(
            username="workspace-members-editor",
            email="workspace-members-editor@example.com",
            password_hash="test-hash",
            display_name="Workspace Members Editor",
        )
        viewer = User(
            username="workspace-members-viewer",
            email="workspace-members-viewer@example.com",
            password_hash="test-hash",
            display_name="Workspace Members Viewer",
        )
        guest = User(
            username="workspace-members-guest",
            email="workspace-members-guest@example.com",
            password_hash="test-hash",
            display_name="Workspace Members Guest",
        )
        db.add_all([owner, editor, viewer, guest])
        db.flush()

        workspace = Workspace(
            name="Workspace Members API Workspace",
            slug="workspace-members-api-workspace",
            owner_id=owner.id,
            visibility="private",
        )
        db.add(workspace)
        db.flush()

        base_time = datetime(2026, 3, 31, 12, 0, tzinfo=timezone.utc)
        owner_member = WorkspaceMember(
            workspace_id=workspace.id,
            user_id=owner.id,
            role="owner",
            created_at=base_time,
        )
        editor_member = WorkspaceMember(
            workspace_id=workspace.id,
            user_id=editor.id,
            role="editor",
            created_at=base_time + timedelta(minutes=1),
        )
        viewer_member = WorkspaceMember(
            workspace_id=workspace.id,
            user_id=viewer.id,
            role="viewer",
            created_at=base_time + timedelta(minutes=2),
        )
        db.add_all([owner_member, editor_member, viewer_member])
        db.commit()

        ids = {
            "workspace_id": workspace.id,
            "owner_id": owner.id,
            "editor_id": editor.id,
            "viewer_id": viewer.id,
            "guest_id": guest.id,
            "owner_member_id": owner_member.id,
            "editor_member_id": editor_member.id,
            "viewer_member_id": viewer_member.id,
        }

    current_user_key = {"value": "owner_id"}

    app = FastAPI()
    app.include_router(workspaces_route.router, prefix="/api/v1/workspaces")

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


def test_workspace_members_api_lists_members_for_owner_and_editor() -> None:
    client, _session_local, ids, current_user_key = build_workspace_members_client()

    owner_response = client.get(f"/api/v1/workspaces/{ids['workspace_id']}/members")
    assert owner_response.status_code == 200
    owner_items = owner_response.json()["data"]["items"]
    assert [item["username"] for item in owner_items] == [
        "workspace-members-owner",
        "workspace-members-editor",
        "workspace-members-viewer",
    ]
    assert [item["role"] for item in owner_items] == ["owner", "editor", "viewer"]

    current_user_key["value"] = "editor_id"
    editor_response = client.get(f"/api/v1/workspaces/{ids['workspace_id']}/members")
    assert editor_response.status_code == 200
    editor_items = editor_response.json()["data"]["items"]
    assert [item["id"] for item in editor_items] == [item["id"] for item in owner_items]


def test_workspace_members_api_update_changes_role_and_logs_audit(monkeypatch) -> None:
    client, session_local, ids, _current_user_key = build_workspace_members_client()
    audit_calls: list[dict[str, object]] = []

    monkeypatch.setattr(workspaces_route, "log_audit_event", lambda db, **kwargs: audit_calls.append(kwargs))

    response = client.patch(
        f"/api/v1/workspaces/{ids['workspace_id']}/members/{ids['viewer_member_id']}",
        json={"role": "editor"},
    )

    assert response.status_code == 200
    payload = response.json()["data"]["member"]
    assert payload["id"] == ids["viewer_member_id"]
    assert payload["role"] == "editor"
    assert audit_calls == [
        {
            "workspace_id": ids["workspace_id"],
            "actor_user_id": ids["owner_id"],
            "action_code": "workspace_member.update_role",
            "resource_type": "workspace_member",
            "resource_id": ids["viewer_member_id"],
            "message": "Updated workspace member workspace-members-viewer",
            "metadata_json": {
                "previous_role": "viewer",
                "role": "editor",
                "user_id": ids["viewer_id"],
            },
        }
    ]

    with session_local() as db:
        stored = db.get(WorkspaceMember, ids["viewer_member_id"])
        assert stored is not None
        assert stored.role == "editor"


def test_workspace_members_api_delete_removes_member_and_logs_audit(monkeypatch) -> None:
    client, session_local, ids, _current_user_key = build_workspace_members_client()
    audit_calls: list[dict[str, object]] = []

    monkeypatch.setattr(workspaces_route, "log_audit_event", lambda db, **kwargs: audit_calls.append(kwargs))

    response = client.delete(f"/api/v1/workspaces/{ids['workspace_id']}/members/{ids['editor_member_id']}")

    assert response.status_code == 200
    assert response.json()["data"]["deleted"] is True
    assert audit_calls == [
        {
            "workspace_id": ids["workspace_id"],
            "actor_user_id": ids["owner_id"],
            "action_code": "workspace_member.remove",
            "resource_type": "workspace_member",
            "resource_id": ids["editor_member_id"],
            "message": "Removed workspace member workspace-members-editor",
            "metadata_json": {
                "user_id": ids["editor_id"],
                "role": "editor",
            },
        }
    ]

    with session_local() as db:
        assert db.get(WorkspaceMember, ids["editor_member_id"]) is None


def test_workspace_members_api_surfaces_validation_and_not_found_errors() -> None:
    client, _session_local, ids, _current_user_key = build_workspace_members_client()

    invalid_role_response = client.patch(
        f"/api/v1/workspaces/{ids['workspace_id']}/members/{ids['viewer_member_id']}",
        json={"role": "admin"},
    )
    assert invalid_role_response.status_code == 400
    assert invalid_role_response.json()["detail"] == "Invalid workspace role"

    missing_response = client.patch(
        f"/api/v1/workspaces/{ids['workspace_id']}/members/missing-member-id",
        json={"role": "editor"},
    )
    assert missing_response.status_code == 404
    assert missing_response.json()["detail"] == "Workspace member not found"

    owner_protected_response = client.delete(
        f"/api/v1/workspaces/{ids['workspace_id']}/members/{ids['owner_member_id']}"
    )
    assert owner_protected_response.status_code == 400
    assert owner_protected_response.json()["detail"] == "Owner membership cannot be removed"


def test_workspace_members_api_enforces_owner_editor_and_viewer_permissions() -> None:
    client, _session_local, ids, current_user_key = build_workspace_members_client()

    current_user_key["value"] = "viewer_id"
    viewer_list_response = client.get(f"/api/v1/workspaces/{ids['workspace_id']}/members")
    assert viewer_list_response.status_code == 403
    assert viewer_list_response.json()["detail"] == "Forbidden"

    current_user_key["value"] = "editor_id"
    editor_update_response = client.patch(
        f"/api/v1/workspaces/{ids['workspace_id']}/members/{ids['viewer_member_id']}",
        json={"role": "editor"},
    )
    assert editor_update_response.status_code == 403
    assert editor_update_response.json()["detail"] == "Forbidden"

    editor_delete_response = client.delete(
        f"/api/v1/workspaces/{ids['workspace_id']}/members/{ids['viewer_member_id']}"
    )
    assert editor_delete_response.status_code == 403
    assert editor_delete_response.json()["detail"] == "Forbidden"

    current_user_key["value"] = "guest_id"
    outsider_list_response = client.get(f"/api/v1/workspaces/{ids['workspace_id']}/members")
    assert outsider_list_response.status_code == 403
    assert outsider_list_response.json()["detail"] == "Forbidden"
