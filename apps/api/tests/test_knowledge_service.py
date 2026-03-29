from __future__ import annotations

from datetime import datetime, timezone
from types import SimpleNamespace

from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker
from sqlalchemy.pool import StaticPool

from app.core.config import settings
from app.db.base import Base
from app.models import audit_log, conversation, knowledge, media, notification, provider_config, record, reminder, search_preset, share_link  # noqa: F401
from app.models.knowledge import KnowledgeChunk
from app.models.record import Record
from app.models.user import User
from app.models.workspace import Workspace, WorkspaceMember
from app.services import knowledge as knowledge_service


def build_knowledge_service_session() -> tuple[sessionmaker, dict[str, str]]:
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
            username="knowledge-service-user",
            email="knowledge-service@example.com",
            password_hash="test-hash",
            display_name="Knowledge Service User",
        )
        db.add(user)
        db.flush()

        primary_workspace = Workspace(
            name="Primary Knowledge Workspace",
            slug="primary-knowledge-workspace",
            owner_id=user.id,
            visibility="private",
        )
        secondary_workspace = Workspace(
            name="Secondary Knowledge Workspace",
            slug="secondary-knowledge-workspace",
            owner_id=user.id,
            visibility="private",
        )
        db.add(primary_workspace)
        db.add(secondary_workspace)
        db.flush()
        db.add(WorkspaceMember(workspace_id=primary_workspace.id, user_id=user.id, role="owner"))
        db.add(WorkspaceMember(workspace_id=secondary_workspace.id, user_id=user.id, role="owner"))
        db.flush()

        primary_record_one = Record(
            workspace_id=primary_workspace.id,
            creator_id=user.id,
            type_code="memo",
            title="Primary record one",
            content="Primary content one",
            source_type="manual",
            extra_data={},
        )
        primary_record_two = Record(
            workspace_id=primary_workspace.id,
            creator_id=user.id,
            type_code="memo",
            title="Primary record two",
            content="Primary content two",
            source_type="manual",
            extra_data={},
        )
        secondary_record = Record(
            workspace_id=secondary_workspace.id,
            creator_id=user.id,
            type_code="memo",
            title="Secondary record",
            content="Secondary content",
            source_type="manual",
            extra_data={},
        )
        db.add_all([primary_record_one, primary_record_two, secondary_record])
        db.commit()
        return session_local, {
            "primary_workspace_id": primary_workspace.id,
            "secondary_workspace_id": secondary_workspace.id,
            "primary_record_one_id": primary_record_one.id,
            "primary_record_two_id": primary_record_two.id,
            "secondary_record_id": secondary_record.id,
        }


def test_get_knowledge_stats_reports_workspace_scoped_counts_and_embedding_config(monkeypatch) -> None:
    session_local, ids = build_knowledge_service_session()
    latest_time = datetime(2026, 3, 29, 14, 30, tzinfo=timezone.utc)

    monkeypatch.setattr(
        knowledge_service,
        "get_effective_provider_config",
        lambda db, workspace_id, feature_code: SimpleNamespace(
            provider_code="openai",
            model_name="text-embedding-3-small",
        ),
    )

    with session_local() as db:
        db.add_all(
            [
                KnowledgeChunk(
                    workspace_id=ids["primary_workspace_id"],
                    record_id=ids["primary_record_one_id"],
                    media_id=None,
                    source_type="record",
                    source_label="record",
                    chunk_index=0,
                    content="alpha",
                    content_hash="hash-alpha",
                    embedding_provider="openai",
                    embedding_model="text-embedding-3-small",
                    embedding_dimensions=512,
                    embedding_vector=[0.1, 0.2],
                    metadata_json={},
                    updated_at=datetime(2026, 3, 29, 13, 0, tzinfo=timezone.utc),
                ),
                KnowledgeChunk(
                    workspace_id=ids["primary_workspace_id"],
                    record_id=ids["primary_record_one_id"],
                    media_id="media-1",
                    source_type="media",
                    source_label="voice",
                    chunk_index=1,
                    content="beta",
                    content_hash="hash-beta",
                    embedding_provider="openai",
                    embedding_model="text-embedding-3-small",
                    embedding_dimensions=768,
                    embedding_vector=[0.3, 0.4],
                    metadata_json={},
                    updated_at=latest_time,
                ),
                KnowledgeChunk(
                    workspace_id=ids["primary_workspace_id"],
                    record_id=ids["primary_record_two_id"],
                    media_id="media-2",
                    source_type="media",
                    source_label="video",
                    chunk_index=0,
                    content="gamma",
                    content_hash="hash-gamma",
                    embedding_provider="openai",
                    embedding_model="text-embedding-3-small",
                    embedding_dimensions=384,
                    embedding_vector=[0.5, 0.6],
                    metadata_json={},
                    updated_at=datetime(2026, 3, 29, 12, 0, tzinfo=timezone.utc),
                ),
                KnowledgeChunk(
                    workspace_id=ids["secondary_workspace_id"],
                    record_id=ids["secondary_record_id"],
                    media_id=None,
                    source_type="record",
                    source_label="record",
                    chunk_index=0,
                    content="delta",
                    content_hash="hash-delta",
                    embedding_provider="local",
                    embedding_model="hash-embedding-v1",
                    embedding_dimensions=256,
                    embedding_vector=[0.7, 0.8],
                    metadata_json={},
                    updated_at=datetime(2026, 3, 29, 11, 0, tzinfo=timezone.utc),
                ),
            ]
        )
        db.commit()

        stats = knowledge_service.get_knowledge_stats(db, ids["primary_workspace_id"])

    assert stats.chunk_count == 3
    assert stats.record_count == 2
    assert stats.media_count == 2
    assert stats.latest_indexed_at == latest_time.replace(tzinfo=None).isoformat()
    assert stats.embedding_provider == "openai"
    assert stats.embedding_model == "text-embedding-3-small"
    assert stats.embedding_dimensions == 768


def test_get_knowledge_stats_falls_back_to_runtime_defaults_when_workspace_is_empty(monkeypatch) -> None:
    session_local, ids = build_knowledge_service_session()
    original_embedding_model = settings.embedding_model
    original_embedding_dimensions = settings.embedding_dimensions
    try:
        settings.embedding_model = "runtime-embedding-model"
        settings.embedding_dimensions = 32
        monkeypatch.setattr(
            knowledge_service,
            "get_effective_provider_config",
            lambda db, workspace_id, feature_code: SimpleNamespace(
                provider_code="local",
                model_name=None,
            ),
        )

        with session_local() as db:
            stats = knowledge_service.get_knowledge_stats(db, ids["primary_workspace_id"])
    finally:
        settings.embedding_model = original_embedding_model
        settings.embedding_dimensions = original_embedding_dimensions

    assert stats.chunk_count == 0
    assert stats.record_count == 0
    assert stats.media_count == 0
    assert stats.latest_indexed_at is None
    assert stats.embedding_provider == "local"
    assert stats.embedding_model == "runtime-embedding-model"
    assert stats.embedding_dimensions == 64
