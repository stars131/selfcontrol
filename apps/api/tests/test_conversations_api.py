from __future__ import annotations

from fastapi import FastAPI
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker
from sqlalchemy.pool import StaticPool

from app.api.deps import get_current_user
from app.api.routes import conversations as conversations_route
from app.db.base import Base
from app.db.session import get_db
from app.models import audit_log, conversation, knowledge, media, notification, provider_config, record, reminder, search_preset, share_link  # noqa: F401
from app.models.conversation import Conversation, Message
from app.models.record import Record
from app.models.user import User
from app.models.workspace import Workspace, WorkspaceMember


def build_conversation_client(monkeypatch) -> tuple[TestClient, sessionmaker, str, str]:
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
            username="conversation-owner",
            email="conversation-owner@example.com",
            password_hash="test-hash",
            display_name="Conversation Owner",
        )
        db.add(user)
        db.flush()

        workspace = Workspace(
            name="Conversation Workspace",
            slug="conversation-workspace",
            owner_id=user.id,
            visibility="private",
        )
        db.add(workspace)
        db.flush()

        db.add(WorkspaceMember(workspace_id=workspace.id, user_id=user.id, role="owner"))
        db.commit()
        user_id = user.id
        workspace_id = workspace.id

    app = FastAPI()
    app.include_router(conversations_route.router, prefix="/api/v1/workspaces")

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
    return TestClient(app), session_local, workspace_id, user_id


def test_conversation_list_and_message_history_are_scoped_to_owner(monkeypatch) -> None:
    client, session_local, workspace_id, user_id = build_conversation_client(monkeypatch)

    with session_local() as db:
        conversation = Conversation(workspace_id=workspace_id, user_id=user_id, title="Chat A")
        db.add(conversation)
        db.flush()
        db.add_all(
            [
                Message(conversation_id=conversation.id, role="user", content="hello", metadata_json={}),
                Message(conversation_id=conversation.id, role="assistant", content="hi", metadata_json={"mode": "search"}),
            ]
        )
        db.commit()
        conversation_id = conversation.id

    list_response = client.get(f"/api/v1/workspaces/{workspace_id}/conversations")
    assert list_response.status_code == 200
    items = list_response.json()["data"]["items"]
    assert len(items) == 1
    assert items[0]["title"] == "Chat A"

    message_response = client.get(f"/api/v1/workspaces/{workspace_id}/conversations/{conversation_id}/messages")
    assert message_response.status_code == 200
    messages = message_response.json()["data"]["items"]
    assert [item["role"] for item in messages] == ["user", "assistant"]


def test_send_message_persists_user_and_assistant_messages_and_rebuilds_records(monkeypatch) -> None:
    client, session_local, workspace_id, user_id = build_conversation_client(monkeypatch)
    captured_rebuild_ids: list[str] = []
    captured_audits: list[dict] = []

    with session_local() as db:
        conversation = Conversation(workspace_id=workspace_id, user_id=user_id, title="Chat B")
        db.add(conversation)
        db.commit()
        conversation_id = conversation.id

    def fake_process_chat_message(db, workspace_id: str, user_id: str, content: str):
        record = Record(
            workspace_id=workspace_id,
            creator_id=user_id,
            type_code="memo",
            title="Created from fake chat",
            content=content,
            source_type="chat",
        )
        db.add(record)
        db.flush()
        assistant_message = Message(
            role="assistant",
            content="saved",
            metadata_json={"mode": "create", "record_ids": [record.id]},
        )
        return assistant_message, [record]

    monkeypatch.setattr(conversations_route, "process_chat_message", fake_process_chat_message)
    monkeypatch.setattr(
        "app.api.routes.conversation_route_helpers.rebuild_record_knowledge",
        lambda db, record_id: captured_rebuild_ids.append(record_id),
    )
    monkeypatch.setattr(
        "app.api.routes.conversation_route_helpers.log_audit_event",
        lambda db, **kwargs: captured_audits.append(kwargs),
    )

    response = client.post(
        f"/api/v1/workspaces/{workspace_id}/conversations/{conversation_id}/messages",
        json={"content": "please remember this"},
    )

    assert response.status_code == 200
    payload = response.json()["data"]
    assert payload["user_message"]["role"] == "user"
    assert payload["assistant_message"]["role"] == "assistant"
    assert len(payload["records"]) == 1
    record_id = payload["records"][0]["id"]
    assert captured_rebuild_ids == [record_id]
    assert len(captured_audits) == 1
    assert captured_audits[0]["action_code"] == "record.create_from_chat"

    with session_local() as db:
        stored_messages = (
            db.query(Message)
            .filter(Message.conversation_id == conversation_id)
            .order_by(Message.created_at.asc())
            .all()
        )
        assert [item.role for item in stored_messages] == ["user", "assistant"]
