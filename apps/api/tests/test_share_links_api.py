from __future__ import annotations

from fastapi import FastAPI
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker
from sqlalchemy.pool import StaticPool

from app.api.deps import get_current_user
from app.api.routes import public_shares as public_shares_route
from app.api.routes import share_links as share_links_route
from app.db.base import Base
from app.db.session import get_db
from app.models import audit_log, conversation, knowledge, media, notification, provider_config, record, reminder, search_preset, share_link  # noqa: F401
from app.models.user import User
from app.models.workspace import Workspace, WorkspaceMember


def build_share_links_client(monkeypatch) -> tuple[TestClient, str]:
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
            username="share-owner",
            email="share-owner@example.com",
            password_hash="test-hash",
            display_name="Share Owner",
        )
        guest = User(
            username="share-guest",
            email="share-guest@example.com",
            password_hash="test-hash",
            display_name="Share Guest",
        )
        db.add_all([owner, guest])
        db.flush()

        workspace = Workspace(
            name="Share Workspace",
            slug="share-workspace",
            owner_id=owner.id,
            visibility="private",
        )
        db.add(workspace)
        db.flush()

        db.add(
            WorkspaceMember(
                workspace_id=workspace.id,
                user_id=owner.id,
                role="owner",
            )
        )
        db.commit()
        workspace_id = workspace.id
        user_ids = {"owner": owner.id, "guest": guest.id}

    monkeypatch.setattr(share_links_route, "log_audit_event", lambda *args, **kwargs: None)
    monkeypatch.setattr(public_shares_route, "log_audit_event", lambda *args, **kwargs: None)

    current_user_key = {"value": "owner"}

    app = FastAPI()
    app.include_router(share_links_route.router, prefix="/api/v1/workspaces")
    app.include_router(public_shares_route.router, prefix="/api/v1/shares")

    def override_get_db():
        db = session_local()
        try:
            yield db
        finally:
            db.close()

    def override_get_current_user():
        db = session_local()
        try:
            return db.get(User, user_ids[current_user_key["value"]])
        finally:
            db.close()

    app.dependency_overrides[get_db] = override_get_db
    app.dependency_overrides[get_current_user] = override_get_current_user

    client = TestClient(app)
    client.current_user_key = current_user_key  # type: ignore[attr-defined]
    return client, workspace_id


def test_share_link_management_flow(monkeypatch) -> None:
    client, workspace_id = build_share_links_client(monkeypatch)

    invalid_response = client.post(
        f"/api/v1/workspaces/{workspace_id}/share-links",
        json={
            "name": "Broken Link",
            "permission_code": "owner",
        },
    )
    assert invalid_response.status_code == 400

    create_response = client.post(
        f"/api/v1/workspaces/{workspace_id}/share-links",
        json={
            "name": "Tasting Notes",
            "permission_code": "viewer",
            "max_uses": 3,
        },
    )
    assert create_response.status_code == 200
    create_payload = create_response.json()["data"]
    share_link = create_payload["share_link"]
    assert create_payload["access_token"]
    assert create_payload["share_path"].startswith("/share/")
    assert share_link["name"] == "Tasting Notes"
    assert share_link["permission_code"] == "viewer"

    list_response = client.get(f"/api/v1/workspaces/{workspace_id}/share-links")
    assert list_response.status_code == 200
    items = list_response.json()["data"]["items"]
    assert len(items) == 1
    assert items[0]["id"] == share_link["id"]

    update_response = client.patch(
        f"/api/v1/workspaces/{workspace_id}/share-links/{share_link['id']}",
        json={
            "name": "Edited Tasting Notes",
            "is_enabled": False,
            "max_uses": 5,
        },
    )
    assert update_response.status_code == 200
    updated = update_response.json()["data"]["share_link"]
    assert updated["name"] == "Edited Tasting Notes"
    assert updated["is_enabled"] is False
    assert updated["max_uses"] == 5


def test_share_link_create_defaults_name_and_missing_update_returns_404(monkeypatch) -> None:
    client, workspace_id = build_share_links_client(monkeypatch)

    create_response = client.post(
        f"/api/v1/workspaces/{workspace_id}/share-links",
        json={
            "name": None,
            "permission_code": "viewer",
            "max_uses": None,
        },
    )
    assert create_response.status_code == 200
    payload = create_response.json()["data"]
    assert payload["share_link"]["name"] == "Workspace share"
    assert payload["share_path"].startswith("/share/")

    update_response = client.patch(
        f"/api/v1/workspaces/{workspace_id}/share-links/missing-link-id",
        json={"is_enabled": False},
    )
    assert update_response.status_code == 404
    assert update_response.json()["detail"] == "Share link not found"


def test_public_share_preview_and_accept_flow(monkeypatch) -> None:
    client, workspace_id = build_share_links_client(monkeypatch)

    create_response = client.post(
        f"/api/v1/workspaces/{workspace_id}/share-links",
        json={
            "name": "Guest Access",
            "permission_code": "editor",
            "max_uses": 2,
        },
    )
    assert create_response.status_code == 200
    payload = create_response.json()["data"]
    access_token = payload["access_token"]

    preview_response = client.get(f"/api/v1/shares/{access_token}")
    assert preview_response.status_code == 200
    preview = preview_response.json()["data"]["preview"]
    assert preview["workspace_id"] == workspace_id
    assert preview["permission_code"] == "editor"
    assert preview["use_count"] == 0

    client.current_user_key["value"] = "guest"  # type: ignore[attr-defined]
    accept_response = client.post(f"/api/v1/shares/{access_token}/accept")
    assert accept_response.status_code == 200
    workspace = accept_response.json()["data"]["workspace"]
    assert workspace["id"] == workspace_id
    assert workspace["role"] == "editor"

    owner_list_response = client.get(f"/api/v1/workspaces/{workspace_id}/share-links")
    assert owner_list_response.status_code == 403

    client.current_user_key["value"] = "owner"  # type: ignore[attr-defined]
    list_response = client.get(f"/api/v1/workspaces/{workspace_id}/share-links")
    assert list_response.status_code == 200
    item = list_response.json()["data"]["items"][0]
    assert item["use_count"] == 1
    assert item["last_used_at"] is not None


def test_public_share_preview_rejects_disabled_and_exhausted_links(monkeypatch) -> None:
    client, workspace_id = build_share_links_client(monkeypatch)

    disabled_response = client.post(
        f"/api/v1/workspaces/{workspace_id}/share-links",
        json={
            "name": "Disabled Link",
            "permission_code": "viewer",
            "max_uses": 3,
        },
    )
    assert disabled_response.status_code == 200
    disabled_payload = disabled_response.json()["data"]
    disabled_link_id = disabled_payload["share_link"]["id"]
    disabled_token = disabled_payload["access_token"]

    patch_response = client.patch(
        f"/api/v1/workspaces/{workspace_id}/share-links/{disabled_link_id}",
        json={"is_enabled": False},
    )
    assert patch_response.status_code == 200

    disabled_preview_response = client.get(f"/api/v1/shares/{disabled_token}")
    assert disabled_preview_response.status_code == 404
    assert disabled_preview_response.json()["detail"] == "Share link not found"

    exhausted_response = client.post(
        f"/api/v1/workspaces/{workspace_id}/share-links",
        json={
            "name": "Single Use Link",
            "permission_code": "viewer",
            "max_uses": 1,
        },
    )
    assert exhausted_response.status_code == 200
    exhausted_token = exhausted_response.json()["data"]["access_token"]

    client.current_user_key["value"] = "guest"  # type: ignore[attr-defined]
    accept_response = client.post(f"/api/v1/shares/{exhausted_token}/accept")
    assert accept_response.status_code == 200

    exhausted_preview_response = client.get(f"/api/v1/shares/{exhausted_token}")
    assert exhausted_preview_response.status_code == 404
    assert exhausted_preview_response.json()["detail"] == "Share link not found"
