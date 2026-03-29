from __future__ import annotations

from fastapi import HTTPException
from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker
from sqlalchemy.pool import StaticPool

from app.api.routes import conversation_route_helpers
from app.api.routes.conversation_route_helpers import (
    finalize_chat_record_side_effects,
    get_user_workspace_conversation_or_404,
    persist_chat_messages,
)
from app.db.base import Base
from app.models import audit_log, knowledge, media, notification, provider_config, record, reminder, search_preset, share_link, workspace_transfer_job  # noqa: F401
from app.models.conversation import Conversation, Message
from app.models.record import Record
from app.models.user import User
from app.models.workspace import Workspace


def build_conversation_route_helper_session() -> tuple[sessionmaker, dict[str, str]]:
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
            username="conversation-helper-owner",
            email="conversation-helper-owner@example.com",
            password_hash="test-hash",
            display_name="Conversation Helper Owner",
        )
        other_user = User(
            username="conversation-helper-other",
            email="conversation-helper-other@example.com",
            password_hash="test-hash",
            display_name="Conversation Helper Other",
        )
        db.add_all([owner, other_user])
        db.flush()

        workspace = Workspace(
            name="Conversation Helper Workspace",
            slug="conversation-helper-workspace",
            owner_id=owner.id,
            visibility="private",
        )
        other_workspace = Workspace(
            name="Conversation Helper Other Workspace",
            slug="conversation-helper-other-workspace",
            owner_id=other_user.id,
            visibility="private",
        )
        db.add_all([workspace, other_workspace])
        db.flush()

        conversation = Conversation(
            workspace_id=workspace.id,
            user_id=owner.id,
            title="Helper conversation",
        )
        other_user_conversation = Conversation(
            workspace_id=workspace.id,
            user_id=other_user.id,
            title="Other user conversation",
        )
        other_workspace_conversation = Conversation(
            workspace_id=other_workspace.id,
            user_id=owner.id,
            title="Other workspace conversation",
        )
        db.add_all([conversation, other_user_conversation, other_workspace_conversation])
        db.flush()

        record_one = Record(
            workspace_id=workspace.id,
            creator_id=owner.id,
            type_code="food",
            title="Created from chat one",
            content="first",
            rating=5,
            is_avoid=False,
            source_type="manual",
            status="active",
            extra_data={},
        )
        record_two = Record(
            workspace_id=workspace.id,
            creator_id=owner.id,
            type_code="snack",
            title=None,
            content="second",
            rating=3,
            is_avoid=False,
            source_type="manual",
            status="active",
            extra_data={},
        )
        db.add_all([record_one, record_two])
        db.commit()

        return session_local, {
            "workspace_id": workspace.id,
            "other_workspace_id": other_workspace.id,
            "owner_id": owner.id,
            "other_user_id": other_user.id,
            "conversation_id": conversation.id,
            "other_user_conversation_id": other_user_conversation.id,
            "other_workspace_conversation_id": other_workspace_conversation.id,
            "record_one_id": record_one.id,
            "record_two_id": record_two.id,
        }


def test_conversation_lookup_helper_covers_workspace_and_user_scoping() -> None:
    session_local, ids = build_conversation_route_helper_session()

    with session_local() as db:
        conversation = get_user_workspace_conversation_or_404(
            db,
            workspace_id=ids["workspace_id"],
            conversation_id=ids["conversation_id"],
            user_id=ids["owner_id"],
        )

        assert conversation.id == ids["conversation_id"]

        for conversation_id in (
            ids["other_user_conversation_id"],
            ids["other_workspace_conversation_id"],
        ):
            try:
                get_user_workspace_conversation_or_404(
                    db,
                    workspace_id=ids["workspace_id"],
                    conversation_id=conversation_id,
                    user_id=ids["owner_id"],
                )
            except HTTPException as exc:
                assert exc.status_code == 404
                assert exc.detail == "Conversation not found"
            else:
                raise AssertionError("Expected scoped conversation lookup to fail")


def test_persist_chat_messages_adds_user_message_and_assigns_assistant_conversation() -> None:
    session_local, ids = build_conversation_route_helper_session()

    assistant_message = Message(
        role="assistant",
        content="Assistant reply",
        metadata_json={"mode": "search"},
    )

    with session_local() as db:
        user_message = persist_chat_messages(
            db,
            conversation_id=ids["conversation_id"],
            assistant_message=assistant_message,
            user_content="User request",
        )
        db.commit()

        stored_messages = (
            db.query(Message)
            .filter(Message.conversation_id == ids["conversation_id"])
            .order_by(Message.created_at.asc(), Message.id.asc())
            .all()
        )

        assert user_message.conversation_id == ids["conversation_id"]
        assert user_message.role == "user"
        assert user_message.content == "User request"
        assert user_message.metadata_json == {}
        assert assistant_message.conversation_id == ids["conversation_id"]
        assert len(stored_messages) == 2
        assert {(item.role, item.content) for item in stored_messages} == {
            ("user", "User request"),
            ("assistant", "Assistant reply"),
        }


def test_finalize_chat_record_side_effects_covers_create_and_non_create_modes(monkeypatch) -> None:
    session_local, ids = build_conversation_route_helper_session()

    rebuilt_record_ids: list[str] = []
    audit_calls: list[dict[str, str]] = []

    monkeypatch.setattr(
        conversation_route_helpers,
        "rebuild_record_knowledge",
        lambda _db, record_id: rebuilt_record_ids.append(record_id),
    )
    monkeypatch.setattr(
        conversation_route_helpers,
        "log_audit_event",
        lambda _db, **kwargs: audit_calls.append(kwargs),
    )

    with session_local() as db:
        record_one = db.get(Record, ids["record_one_id"])
        record_two = db.get(Record, ids["record_two_id"])
        assert record_one is not None
        assert record_two is not None

        finalize_chat_record_side_effects(
            db,
            workspace_id=ids["workspace_id"],
            actor_user_id=ids["owner_id"],
            assistant_message=Message(
                role="assistant",
                content="Created records",
                metadata_json={"mode": "create"},
            ),
            records=[record_one, record_two],
        )

        assert rebuilt_record_ids == [ids["record_one_id"], ids["record_two_id"]]
        assert len(audit_calls) == 2
        assert audit_calls[0]["resource_id"] == ids["record_one_id"]
        assert audit_calls[0]["message"] == "Created record from chat: Created from chat one"
        assert audit_calls[0]["metadata_json"] == {"type_code": "food"}
        assert audit_calls[1]["resource_id"] == ids["record_two_id"]
        assert audit_calls[1]["message"] == f"Created record from chat: {ids['record_two_id']}"
        assert audit_calls[1]["metadata_json"] == {"type_code": "snack"}

        rebuilt_record_ids.clear()
        audit_calls.clear()

        finalize_chat_record_side_effects(
            db,
            workspace_id=ids["workspace_id"],
            actor_user_id=ids["owner_id"],
            assistant_message=Message(
                role="assistant",
                content="Search results",
                metadata_json={"mode": "search"},
            ),
            records=[record_one],
        )

        assert rebuilt_record_ids == [ids["record_one_id"]]
        assert audit_calls == []
