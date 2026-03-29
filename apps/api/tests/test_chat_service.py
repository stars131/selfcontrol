from __future__ import annotations

from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker
from sqlalchemy.pool import StaticPool

from app.db.base import Base
from app.models import audit_log, conversation, knowledge, media, notification, provider_config, record, reminder, search_preset, share_link  # noqa: F401
from app.models.record import Record
from app.models.user import User
from app.models.workspace import Workspace, WorkspaceMember
from app.services.chat import (
    build_search_reply,
    build_title,
    infer_is_avoid,
    infer_record_type,
    process_chat_message,
    should_create_record,
)
from app.services.knowledge_types import KnowledgeSearchHit


def build_chat_service_session() -> tuple[sessionmaker, dict[str, str]]:
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
            username="chat-service-user",
            email="chat-service@example.com",
            password_hash="test-hash",
            display_name="Chat Service User",
        )
        db.add(user)
        db.flush()

        workspace = Workspace(
            name="Chat Service Workspace",
            slug="chat-service-workspace",
            owner_id=user.id,
            visibility="private",
        )
        db.add(workspace)
        db.flush()
        db.add(WorkspaceMember(workspace_id=workspace.id, user_id=user.id, role="owner"))
        db.commit()
        return session_local, {"workspace_id": workspace.id, "user_id": user.id}


def test_chat_keyword_inference_supports_english_and_chinese_inputs() -> None:
    assert infer_record_type("买了新的 chips 零食很好吃") == "snack"
    assert infer_record_type("今天去吃火锅，真的好吃") == "food"
    assert infer_record_type("plain neutral thought") == "memo"
    assert infer_is_avoid("这个零食难吃，下次别买") is True
    assert infer_is_avoid("This restaurant was great") is False
    assert should_create_record("帮我记录一下这个店") is True
    assert should_create_record("search for that cafe") is False


def test_build_title_normalizes_whitespace_and_truncates_long_text() -> None:
    title = build_title("  this   is   a very long title that should be trimmed for storage  ")

    assert title == "this is a very long title th..."


def test_build_search_reply_returns_empty_result_contract_when_no_records_match() -> None:
    reply, metadata = build_search_reply([], [], "不存在的记录")

    assert reply == "No matching memory found for '不存在的记录'."
    assert metadata == {
        "mode": "search",
        "record_ids": [],
        "retrieval_mode": "hybrid",
        "sources": [],
    }


def test_build_search_reply_prefers_hit_snippets_and_rag_metadata() -> None:
    records = [
        Record(id="record-1", workspace_id="workspace-1", creator_id="user-1", type_code="food", title="Best noodles", content="noodles", source_type="manual", extra_data={}),
        Record(id="record-2", workspace_id="workspace-1", creator_id="user-1", type_code="memo", title="Cafe note", content="cafe", source_type="manual", extra_data={}),
    ]
    hits = [
        KnowledgeSearchHit(
            chunk_id="chunk-1",
            record_id="record-1",
            record_title="Best noodles",
            record_type_code="food",
            source_type="record",
            source_label="Best noodles",
            media_id=None,
            score=0.91,
            snippet="Soup and noodles",
        )
    ]

    reply, metadata = build_search_reply(records, hits, "noodles")

    assert reply.splitlines() == [
        "Found 2 related record(s) for 'noodles'.",
        "1. Best noodles [food] Soup and noodles",
        "2. Cafe note [memo] cafe",
    ]
    assert metadata["mode"] == "search"
    assert metadata["record_ids"] == ["record-1", "record-2"]
    assert metadata["retrieval_mode"] == "rag"
    assert len(metadata["sources"]) == 1
    assert metadata["sources"][0]["chunk_id"] == "chunk-1"


def test_process_chat_message_creates_record_for_capture_intents() -> None:
    session_local, ids = build_chat_service_session()
    content = "帮我记录一下这个零食很难吃，下次别买"

    with session_local() as db:
        assistant_message, records = process_chat_message(
            db,
            ids["workspace_id"],
            ids["user_id"],
            content,
        )
        stored_records = db.query(Record).filter(Record.workspace_id == ids["workspace_id"]).all()

    assert len(records) == 1
    assert len(stored_records) == 1
    created = stored_records[0]
    assert created.id == records[0].id
    assert created.type_code == "snack"
    assert created.is_avoid is True
    assert created.source_type == "chat"
    assert created.content == content
    assert created.title == "帮我记录一下这个零食很难吃，下次别买"
    assert assistant_message.role == "assistant"
    assert assistant_message.content == f"Saved one record: {created.title}."
    assert assistant_message.metadata_json == {"mode": "create", "record_ids": [created.id]}


def test_process_chat_message_returns_search_reply_for_non_capture_queries(monkeypatch) -> None:
    session_local, ids = build_chat_service_session()
    existing_record = Record(
        id="record-search-1",
        workspace_id=ids["workspace_id"],
        creator_id=ids["user_id"],
        type_code="food",
        title="寿司店",
        content="上周吃到的寿司店",
        source_type="manual",
        extra_data={},
    )
    hit = KnowledgeSearchHit(
        chunk_id="chunk-search-1",
        record_id=existing_record.id,
        record_title="寿司店",
        record_type_code="food",
        source_type="record",
        source_label="寿司店",
        media_id=None,
        score=0.88,
        snippet="上周吃到的寿司店",
    )

    monkeypatch.setattr(
        "app.services.chat.search_records_hybrid",
        lambda db, workspace_id, query, limit: ([existing_record], [hit]),
    )

    with session_local() as db:
        assistant_message, records = process_chat_message(
            db,
            ids["workspace_id"],
            ids["user_id"],
            "帮我找一下寿司店",
        )
        stored_count = db.query(Record).count()

    assert stored_count == 0
    assert records == [existing_record]
    assert assistant_message.role == "assistant"
    assert assistant_message.metadata_json["mode"] == "search"
    assert assistant_message.metadata_json["retrieval_mode"] == "rag"
    assert assistant_message.metadata_json["record_ids"] == [existing_record.id]
    assert assistant_message.content.splitlines() == [
        "Found 1 related record(s) for '帮我找一下寿司店'.",
        "1. 寿司店 [food] 上周吃到的寿司店",
    ]
