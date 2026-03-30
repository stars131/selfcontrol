from __future__ import annotations

from datetime import datetime, timedelta, timezone

from fastapi import FastAPI
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker
from sqlalchemy.pool import StaticPool

from app.api.deps import get_current_user
from app.api.routes import conversations as conversations_route
from app.api.routes.conversation_route_helpers import persist_chat_messages as real_persist_chat_messages
from app.db.base import Base
from app.db.session import get_db
from app.models import audit_log, knowledge, media, notification, provider_config, reminder, search_preset, share_link, workspace_transfer_job  # noqa: F401
from app.models.conversation import Conversation, Message
from app.models.record import Record
from app.models.user import User
from app.models.workspace import Workspace, WorkspaceMember


def build_conversation_messages_client() -> tuple[TestClient, sessionmaker, dict[str, str], dict[str, str]]:
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
            username="conversation-messages-owner",
            email="conversation-messages-owner@example.com",
            password_hash="test-hash",
            display_name="Conversation Messages Owner",
        )
        editor = User(
            username="conversation-messages-editor",
            email="conversation-messages-editor@example.com",
            password_hash="test-hash",
            display_name="Conversation Messages Editor",
        )
        outsider = User(
            username="conversation-messages-outsider",
            email="conversation-messages-outsider@example.com",
            password_hash="test-hash",
            display_name="Conversation Messages Outsider",
        )
        db.add_all([owner, editor, outsider])
        db.flush()

        workspace = Workspace(
            name="Conversation Messages Workspace",
            slug="conversation-messages-workspace",
            owner_id=owner.id,
            visibility="private",
        )
        db.add(workspace)
        db.flush()

        db.add_all(
            [
                WorkspaceMember(workspace_id=workspace.id, user_id=owner.id, role="owner"),
                WorkspaceMember(workspace_id=workspace.id, user_id=editor.id, role="editor"),
            ]
        )
        db.commit()

        ids = {
            "workspace_id": workspace.id,
            "owner_id": owner.id,
            "editor_id": editor.id,
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


def create_conversation(
    session_local: sessionmaker,
    *,
    workspace_id: str,
    user_id: str,
    title: str,
) -> str:
    with session_local() as db:
        item = Conversation(
            workspace_id=workspace_id,
            user_id=user_id,
            title=title,
        )
        db.add(item)
        db.commit()
        return item.id


def test_conversation_messages_api_lists_messages_in_order_for_scoped_conversation(monkeypatch) -> None:
    client, session_local, ids, _current_user_key = build_conversation_messages_client()
    conversation_id = create_conversation(
        session_local,
        workspace_id=ids["workspace_id"],
        user_id=ids["owner_id"],
        title="Message History",
    )
    captured_lookup: dict[str, object] = {}
    now = datetime(2026, 4, 1, 12, 0, tzinfo=timezone.utc)

    with session_local() as db:
        db.add_all(
            [
                Message(
                    conversation_id=conversation_id,
                    role="user",
                    content="first",
                    metadata_json={},
                    created_at=now,
                ),
                Message(
                    conversation_id=conversation_id,
                    role="assistant",
                    content="second",
                    metadata_json={"mode": "search"},
                    created_at=now + timedelta(seconds=1),
                ),
            ]
        )
        db.commit()

    def fake_get_user_workspace_conversation_or_404(db, *, workspace_id, conversation_id, user_id):
        captured_lookup.update(
            {
                "workspace_id": workspace_id,
                "conversation_id": conversation_id,
                "user_id": user_id,
            }
        )
        conversation = db.get(Conversation, conversation_id)
        assert conversation is not None
        return conversation

    monkeypatch.setattr(
        conversations_route,
        "get_user_workspace_conversation_or_404",
        fake_get_user_workspace_conversation_or_404,
    )

    response = client.get(f"/api/v1/workspaces/{ids['workspace_id']}/conversations/{conversation_id}/messages")

    assert response.status_code == 200
    assert captured_lookup == {
        "workspace_id": ids["workspace_id"],
        "conversation_id": conversation_id,
        "user_id": ids["owner_id"],
    }
    items = response.json()["data"]["items"]
    assert [item["role"] for item in items] == ["user", "assistant"]


def test_conversation_messages_api_send_message_passes_through_service_and_helpers(monkeypatch) -> None:
    client, session_local, ids, _current_user_key = build_conversation_messages_client()
    conversation_id = create_conversation(
        session_local,
        workspace_id=ids["workspace_id"],
        user_id=ids["owner_id"],
        title="Chat Actions",
    )
    captured_process: dict[str, object] = {}
    captured_persist: dict[str, object] = {}
    captured_finalize: dict[str, object] = {}

    def fake_process_chat_message(db, workspace_id: str, user_id: str, content: str):
        captured_process.update(
            {
                "workspace_id": workspace_id,
                "user_id": user_id,
                "content": content,
            }
        )
        record = Record(
            workspace_id=workspace_id,
            creator_id=user_id,
            type_code="memo",
            title="Created from conversation message",
            content=content,
            source_type="chat",
            status="active",
            extra_data={},
        )
        db.add(record)
        db.flush()
        assistant_message = Message(
            role="assistant",
            content="saved",
            metadata_json={"mode": "create", "record_ids": [record.id]},
        )
        return assistant_message, [record]

    def fake_persist_chat_messages(db, *, conversation_id, assistant_message, user_content):
        captured_persist.update(
            {
                "conversation_id": conversation_id,
                "assistant_content": assistant_message.content,
                "user_content": user_content,
            }
        )
        return real_persist_chat_messages(
            db,
            conversation_id=conversation_id,
            assistant_message=assistant_message,
            user_content=user_content,
        )

    def fake_finalize_chat_record_side_effects(
        db,
        *,
        workspace_id,
        actor_user_id,
        assistant_message,
        records,
    ):
        captured_finalize.update(
            {
                "workspace_id": workspace_id,
                "actor_user_id": actor_user_id,
                "assistant_message_id": assistant_message.id,
                "record_ids": [record.id for record in records],
            }
        )

    monkeypatch.setattr(conversations_route, "process_chat_message", fake_process_chat_message)
    monkeypatch.setattr(conversations_route, "persist_chat_messages", fake_persist_chat_messages)
    monkeypatch.setattr(conversations_route, "finalize_chat_record_side_effects", fake_finalize_chat_record_side_effects)

    response = client.post(
        f"/api/v1/workspaces/{ids['workspace_id']}/conversations/{conversation_id}/messages",
        json={"content": "remember this"},
    )

    assert response.status_code == 200
    payload = response.json()["data"]
    assert captured_process == {
        "workspace_id": ids["workspace_id"],
        "user_id": ids["owner_id"],
        "content": "remember this",
    }
    assert captured_persist == {
        "conversation_id": conversation_id,
        "assistant_content": "saved",
        "user_content": "remember this",
    }
    assert captured_finalize["workspace_id"] == ids["workspace_id"]
    assert captured_finalize["actor_user_id"] == ids["owner_id"]
    assert len(captured_finalize["record_ids"]) == 1
    assert payload["user_message"]["role"] == "user"
    assert payload["assistant_message"]["role"] == "assistant"
    assert len(payload["records"]) == 1

    with session_local() as db:
        stored_messages = (
            db.query(Message)
            .filter(Message.conversation_id == conversation_id)
            .order_by(Message.created_at.asc())
            .all()
        )
        assert [item.role for item in stored_messages] == ["user", "assistant"]


def test_conversation_messages_api_enforces_membership_and_user_scoping() -> None:
    client, session_local, ids, current_user_key = build_conversation_messages_client()
    owner_conversation_id = create_conversation(
        session_local,
        workspace_id=ids["workspace_id"],
        user_id=ids["owner_id"],
        title="Owner Chat",
    )

    current_user_key["value"] = "editor_id"
    editor_read_response = client.get(
        f"/api/v1/workspaces/{ids['workspace_id']}/conversations/{owner_conversation_id}/messages"
    )
    assert editor_read_response.status_code == 404
    assert editor_read_response.json()["detail"] == "Conversation not found"

    editor_send_response = client.post(
        f"/api/v1/workspaces/{ids['workspace_id']}/conversations/{owner_conversation_id}/messages",
        json={"content": "blocked"},
    )
    assert editor_send_response.status_code == 404
    assert editor_send_response.json()["detail"] == "Conversation not found"

    current_user_key["value"] = "outsider_id"
    outsider_read_response = client.get(
        f"/api/v1/workspaces/{ids['workspace_id']}/conversations/{owner_conversation_id}/messages"
    )
    assert outsider_read_response.status_code == 403
    assert outsider_read_response.json()["detail"] == "Forbidden"
