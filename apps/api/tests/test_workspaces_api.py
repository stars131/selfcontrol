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


def build_workspaces_client() -> tuple[TestClient, sessionmaker, dict[str, str], dict[str, str]]:
    engine = create_engine(
        "sqlite://",
        connect_args={"check_same_thread": False},
        poolclass=StaticPool,
        future=True,
    )
    session_local = sessionmaker(bind=engine, autoflush=False, autocommit=False, class_=Session)
    Base.metadata.create_all(bind=engine)

    with session_local() as db:
        current_user = User(
            username="workspaces-api-current",
            email="workspaces-api-current@example.com",
            password_hash="test-hash",
            display_name="Workspaces API Current",
        )
        owner = User(
            username="workspaces-api-owner",
            email="workspaces-api-owner@example.com",
            password_hash="test-hash",
            display_name="Workspaces API Owner",
        )
        outsider = User(
            username="workspaces-api-outsider",
            email="workspaces-api-outsider@example.com",
            password_hash="test-hash",
            display_name="Workspaces API Outsider",
        )
        db.add_all([current_user, owner, outsider])
        db.flush()

        now = datetime(2026, 3, 30, 12, 0, tzinfo=timezone.utc)
        owned_workspace = Workspace(
            name="Owned Workspace",
            slug="owned-workspace",
            owner_id=current_user.id,
            visibility="private",
            created_at=now - timedelta(hours=1),
        )
        shared_workspace = Workspace(
            name="Shared Workspace",
            slug="shared-workspace",
            owner_id=owner.id,
            visibility="private",
            created_at=now,
        )
        outsider_workspace = Workspace(
            name="Outsider Workspace",
            slug="outsider-workspace",
            owner_id=outsider.id,
            visibility="private",
            created_at=now + timedelta(hours=1),
        )
        db.add_all([owned_workspace, shared_workspace, outsider_workspace])
        db.flush()

        db.add_all(
            [
                WorkspaceMember(workspace_id=owned_workspace.id, user_id=current_user.id, role="owner"),
                WorkspaceMember(workspace_id=shared_workspace.id, user_id=owner.id, role="owner"),
                WorkspaceMember(workspace_id=shared_workspace.id, user_id=current_user.id, role="editor"),
                WorkspaceMember(workspace_id=outsider_workspace.id, user_id=outsider.id, role="owner"),
            ]
        )
        db.commit()

        ids = {
            "current_user_id": current_user.id,
            "owner_id": owner.id,
            "outsider_id": outsider.id,
            "owned_workspace_id": owned_workspace.id,
            "shared_workspace_id": shared_workspace.id,
            "outsider_workspace_id": outsider_workspace.id,
        }

    current_user_key = {"value": "current_user_id"}

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


def test_workspaces_api_lists_only_member_workspaces_with_resolved_roles() -> None:
    client, _session_local, ids, _current_user_key = build_workspaces_client()

    response = client.get("/api/v1/workspaces")

    assert response.status_code == 200
    items = response.json()["data"]["items"]
    assert [item["id"] for item in items] == [ids["shared_workspace_id"], ids["owned_workspace_id"]]
    assert [item["role"] for item in items] == ["editor", "owner"]
    assert all(item["id"] != ids["outsider_workspace_id"] for item in items)


def test_workspaces_api_create_persists_owner_membership_and_rejects_duplicate_slug() -> None:
    client, session_local, ids, _current_user_key = build_workspaces_client()

    create_response = client.post(
        "/api/v1/workspaces",
        json={
            "name": "Created Workspace",
            "slug": "created-workspace",
            "visibility": "private",
        },
    )
    assert create_response.status_code == 200
    payload = create_response.json()["data"]["workspace"]
    assert payload["name"] == "Created Workspace"
    assert payload["slug"] == "created-workspace"
    assert payload["owner_id"] == ids["current_user_id"]
    assert payload["role"] == "owner"

    with session_local() as db:
        created_workspace = db.query(Workspace).filter(Workspace.slug == "created-workspace").first()
        assert created_workspace is not None
        created_membership = (
            db.query(WorkspaceMember)
            .filter(
                WorkspaceMember.workspace_id == created_workspace.id,
                WorkspaceMember.user_id == ids["current_user_id"],
            )
            .first()
        )
        assert created_membership is not None
        assert created_membership.role == "owner"

    duplicate_response = client.post(
        "/api/v1/workspaces",
        json={
            "name": "Duplicate Workspace",
            "slug": "owned-workspace",
            "visibility": "private",
        },
    )
    assert duplicate_response.status_code == 400
    assert duplicate_response.json()["detail"] == "Workspace slug already exists"


def test_workspaces_api_detail_requires_membership_and_returns_member_role() -> None:
    client, _session_local, ids, current_user_key = build_workspaces_client()

    member_response = client.get(f"/api/v1/workspaces/{ids['shared_workspace_id']}")
    assert member_response.status_code == 200
    workspace = member_response.json()["data"]["workspace"]
    assert workspace["id"] == ids["shared_workspace_id"]
    assert workspace["role"] == "editor"

    current_user_key["value"] = "outsider_id"
    forbidden_response = client.get(f"/api/v1/workspaces/{ids['shared_workspace_id']}")
    assert forbidden_response.status_code == 403
    assert forbidden_response.json()["detail"] == "Forbidden"
