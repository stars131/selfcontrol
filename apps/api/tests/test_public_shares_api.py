from __future__ import annotations

from fastapi import FastAPI
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker
from sqlalchemy.pool import StaticPool

from app.api.deps import get_current_user
from app.api.routes import public_shares as public_shares_route
from app.db.base import Base
from app.db.session import get_db
from app.models import audit_log, conversation, knowledge, media, notification, provider_config, record, reminder, search_preset, share_link, workspace_transfer_job  # noqa: F401
from app.models.user import User
from app.models.workspace import Workspace, WorkspaceMember


def build_public_shares_client() -> tuple[TestClient, sessionmaker, dict[str, str]]:
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
            username="public-shares-api-owner",
            email="public-shares-api-owner@example.com",
            password_hash="test-hash",
            display_name="Public Shares API Owner",
        )
        guest = User(
            username="public-shares-api-guest",
            email="public-shares-api-guest@example.com",
            password_hash="test-hash",
            display_name="Public Shares API Guest",
        )
        db.add_all([owner, guest])
        db.flush()

        workspace = Workspace(
            name="Public Shares API Workspace",
            slug="public-shares-api-workspace",
            owner_id=owner.id,
            visibility="private",
        )
        db.add(workspace)
        db.flush()

        db.add(WorkspaceMember(workspace_id=workspace.id, user_id=owner.id, role="owner"))
        db.commit()

        guest_id = guest.id
        workspace_id = workspace.id

    app = FastAPI()
    app.include_router(public_shares_route.router, prefix="/api/v1/shares")

    def override_get_db():
        db = session_local()
        try:
            yield db
        finally:
            db.close()

    def override_get_current_user():
        with session_local() as db:
            user = db.get(User, guest_id)
            assert user is not None
            return user

    app.dependency_overrides[get_db] = override_get_db
    app.dependency_overrides[get_current_user] = override_get_current_user

    return TestClient(app), session_local, {
        "guest_id": guest_id,
        "workspace_id": workspace_id,
    }


def test_public_shares_api_preview_serializes_helper_result(monkeypatch) -> None:
    client, _session_local, ids = build_public_shares_client()
    captured: dict[str, object] = {}
    fake_item = object()
    fake_workspace = object()

    def fake_get_active_share_link_and_workspace_or_404(db, *, token):
        captured["token"] = token
        return fake_item, fake_workspace

    def fake_serialize_share_link_preview(item, workspace):
        captured["item"] = item
        captured["workspace"] = workspace
        return {
            "workspace_id": ids["workspace_id"],
            "workspace_name": "Public Shares API Workspace",
            "permission_code": "viewer",
            "use_count": 0,
        }

    monkeypatch.setattr(
        public_shares_route,
        "get_active_share_link_and_workspace_or_404",
        fake_get_active_share_link_and_workspace_or_404,
    )
    monkeypatch.setattr(public_shares_route, "serialize_share_link_preview", fake_serialize_share_link_preview)

    response = client.get("/api/v1/shares/public-preview-token")

    assert response.status_code == 200
    assert captured == {
        "token": "public-preview-token",
        "item": fake_item,
        "workspace": fake_workspace,
    }
    assert response.json()["data"]["preview"] == {
        "workspace_id": ids["workspace_id"],
        "workspace_name": "Public Shares API Workspace",
        "permission_code": "viewer",
        "use_count": 0,
    }


def test_public_shares_api_accept_logs_audit_and_serializes_workspace(monkeypatch) -> None:
    client, session_local, ids = build_public_shares_client()
    captured_accept: dict[str, object] = {}
    captured_serialize: dict[str, object] = {}
    audit_calls: list[dict[str, object]] = []

    with session_local() as db:
        workspace = db.get(Workspace, ids["workspace_id"])
        assert workspace is not None

    def fake_accept_share_link(db, *, token, user_id):
        captured_accept.update({"token": token, "user_id": user_id})
        return workspace

    def fake_serialize_workspace_for_member(db, *, workspace, user_id):
        captured_serialize.update({"workspace_id": workspace.id, "user_id": user_id})
        assert workspace.created_at is not None
        return {
            "id": workspace.id,
            "name": workspace.name,
            "slug": workspace.slug,
            "owner_id": workspace.owner_id,
            "visibility": workspace.visibility,
            "role": "viewer",
            "created_at": workspace.created_at,
        }

    monkeypatch.setattr(public_shares_route, "accept_share_link", fake_accept_share_link)
    monkeypatch.setattr(
        public_shares_route,
        "serialize_workspace_for_member",
        fake_serialize_workspace_for_member,
    )
    monkeypatch.setattr(public_shares_route, "log_audit_event", lambda db, **kwargs: audit_calls.append(kwargs))

    response = client.post("/api/v1/shares/public-accept-token/accept")

    assert response.status_code == 200
    payload = response.json()["data"]["workspace"]
    assert captured_accept == {
        "token": "public-accept-token",
        "user_id": ids["guest_id"],
    }
    assert captured_serialize == {
        "workspace_id": ids["workspace_id"],
        "user_id": ids["guest_id"],
    }
    assert payload["id"] == ids["workspace_id"]
    assert payload["role"] == "viewer"
    assert payload["name"] == "Public Shares API Workspace"
    assert audit_calls == [
        {
            "workspace_id": ids["workspace_id"],
            "actor_user_id": ids["guest_id"],
            "action_code": "share_link.accept",
            "resource_type": "workspace_member",
            "resource_id": ids["guest_id"],
            "message": "Accepted share link into workspace Public Shares API Workspace",
            "metadata_json": {"workspace_id": ids["workspace_id"]},
        }
    ]


def test_public_shares_api_accept_translates_service_errors(monkeypatch) -> None:
    client, _session_local, _ids = build_public_shares_client()

    def fake_accept_share_link(db, *, token, user_id):
        raise ValueError("Share link is exhausted")

    monkeypatch.setattr(public_shares_route, "accept_share_link", fake_accept_share_link)

    response = client.post("/api/v1/shares/exhausted-token/accept")

    assert response.status_code == 400
    assert response.json()["detail"] == "Share link is exhausted"
