from __future__ import annotations

from datetime import datetime, timedelta, timezone

from fastapi import FastAPI
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker
from sqlalchemy.pool import StaticPool

from app.api.deps import get_current_user
from app.api.routes import conversations as conversations_route
from app.db.base import Base
from app.db.session import get_db
from app.models import audit_log, knowledge, media, notification, provider_config, record, reminder, search_preset, share_link, workspace_transfer_job  # noqa: F401
from app.models.conversation import Conversation
from app.models.user import User
from app.models.workspace import Workspace, WorkspaceMember


def build_conversation_threads_client() -> tuple[TestClient, sessionmaker, dict[str, str], dict[str, str]]:
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
            username="conversation-threads-owner",
            email="conversation-threads-owner@example.com",
            password_hash="test-hash",
            display_name="Conversation Threads Owner",
        )
        editor = User(
            username="conversation-threads-editor",
            email="conversation-threads-editor@example.com",
            password_hash="test-hash",
            display_name="Conversation Threads Editor",
        )
        viewer = User(
            username="conversation-threads-viewer",
            email="conversation-threads-viewer@example.com",
            password_hash="test-hash",
            display_name="Conversation Threads Viewer",
        )
        outsider = User(
            username="conversation-threads-outsider",
            email="conversation-threads-outsider@example.com",
            password_hash="test-hash",
            display_name="Conversation Threads Outsider",
        )
        db.add_all([owner, editor, viewer, outsider])
        db.flush()

        workspace = Workspace(
            name="Conversation Threads Workspace",
            slug="conversation-threads-workspace",
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
    app.include_router(conversations_route.router, prefix="/api/v1/workspaces")

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


def test_conversation_threads_api_lists_only_current_user_conversations_in_updated_order() -> None:
    client, session_local, ids, current_user_key = build_conversation_threads_client()
    current_user_key["value"] = "owner_id"
    now = datetime(2026, 4, 1, 18, 0, tzinfo=timezone.utc)

    with session_local() as db:
        db.add_all(
            [
                Conversation(
                    workspace_id=ids["workspace_id"],
                    user_id=ids["owner_id"],
                    title="Older owner chat",
                    created_at=now - timedelta(minutes=10),
                    updated_at=now - timedelta(minutes=5),
                ),
                Conversation(
                    workspace_id=ids["workspace_id"],
                    user_id=ids["owner_id"],
                    title="Newest owner chat",
                    created_at=now - timedelta(minutes=4),
                    updated_at=now,
                ),
                Conversation(
                    workspace_id=ids["workspace_id"],
                    user_id=ids["editor_id"],
                    title="Editor chat",
                    created_at=now - timedelta(minutes=2),
                    updated_at=now + timedelta(minutes=1),
                ),
            ]
        )
        db.commit()

    response = client.get(f"/api/v1/workspaces/{ids['workspace_id']}/conversations")

    assert response.status_code == 200
    items = response.json()["data"]["items"]
    assert [item["title"] for item in items] == ["Newest owner chat", "Older owner chat"]


def test_conversation_threads_api_create_persists_user_workspace_and_default_title() -> None:
    client, session_local, ids, current_user_key = build_conversation_threads_client()
    current_user_key["value"] = "editor_id"

    explicit_response = client.post(
        f"/api/v1/workspaces/{ids['workspace_id']}/conversations",
        json={"title": "Editor thread"},
    )
    assert explicit_response.status_code == 200
    explicit_payload = explicit_response.json()["data"]["conversation"]
    assert explicit_payload["title"] == "Editor thread"
    assert explicit_payload["user_id"] == ids["editor_id"]
    assert explicit_payload["workspace_id"] == ids["workspace_id"]

    default_response = client.post(
        f"/api/v1/workspaces/{ids['workspace_id']}/conversations",
        json={},
    )
    assert default_response.status_code == 200
    default_payload = default_response.json()["data"]["conversation"]
    assert default_payload["title"] == "New conversation"

    with session_local() as db:
        stored_titles = [
            item.title
            for item in db.query(Conversation)
            .filter(
                Conversation.workspace_id == ids["workspace_id"],
                Conversation.user_id == ids["editor_id"],
            )
            .order_by(Conversation.created_at.asc())
            .all()
        ]
        assert stored_titles == ["Editor thread", "New conversation"]


def test_conversation_threads_api_requires_workspace_write_access() -> None:
    client, _session_local, ids, current_user_key = build_conversation_threads_client()

    for actor_key in ("viewer_id", "outsider_id"):
        current_user_key["value"] = actor_key

        list_response = client.get(f"/api/v1/workspaces/{ids['workspace_id']}/conversations")
        assert list_response.status_code == 403
        assert list_response.json()["detail"] == "Forbidden"

        create_response = client.post(
            f"/api/v1/workspaces/{ids['workspace_id']}/conversations",
            json={"title": "Blocked"},
        )
        assert create_response.status_code == 403
        assert create_response.json()["detail"] == "Forbidden"
