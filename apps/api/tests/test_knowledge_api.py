from __future__ import annotations

from fastapi import FastAPI
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker
from sqlalchemy.pool import StaticPool

from app.api.deps import get_current_user
from app.api.routes import knowledge as knowledge_route
from app.db.base import Base
from app.db.session import get_db
from app.models import audit_log, conversation, knowledge, media, notification, provider_config, record, reminder, search_preset, share_link  # noqa: F401
from app.models.record import Record
from app.models.user import User
from app.models.workspace import Workspace, WorkspaceMember
from app.services.knowledge_types import KnowledgeReindexResult, KnowledgeSearchHit, KnowledgeStats


def build_knowledge_client(monkeypatch) -> tuple[TestClient, str, dict[str, str]]:
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
            username="knowledge-user",
            email="knowledge-user@example.com",
            password_hash="test-hash",
            display_name="Knowledge User",
        )
        db.add(user)
        db.flush()

        workspace = Workspace(
            name="Knowledge Workspace",
            slug="knowledge-workspace",
            owner_id=user.id,
            visibility="private",
        )
        db.add(workspace)
        db.flush()

        db.add(
            WorkspaceMember(
                workspace_id=workspace.id,
                user_id=user.id,
                role="owner",
            )
        )
        db.flush()

        record_one = Record(
            workspace_id=workspace.id,
            creator_id=user.id,
            type_code="food",
            title="Best noodles",
            content="Soup and noodles",
            source_type="manual",
            status="active",
            extra_data={},
        )
        record_two = Record(
            workspace_id=workspace.id,
            creator_id=user.id,
            type_code="memo",
            title="Travel memo",
            content="Remember the cafe",
            source_type="manual",
            status="active",
            extra_data={},
        )
        db.add_all([record_one, record_two])
        db.commit()
        workspace_id = workspace.id
        record_ids = {"one": record_one.id, "two": record_two.id}
        user_id = user.id

    monkeypatch.setattr(knowledge_route, "log_audit_event", lambda *args, **kwargs: None)

    app = FastAPI()
    app.include_router(knowledge_route.router, prefix="/api/v1/workspaces")

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
    return TestClient(app), workspace_id, record_ids


def test_knowledge_stats_and_reindex_routes(monkeypatch) -> None:
    client, workspace_id, record_ids = build_knowledge_client(monkeypatch)

    monkeypatch.setattr(
        knowledge_route,
        "get_knowledge_stats",
        lambda db, current_workspace_id: KnowledgeStats(
            chunk_count=4,
            record_count=2,
            media_count=1,
            latest_indexed_at=None,
            embedding_provider="builtin",
            embedding_model="embed-v1",
            embedding_dimensions=384,
        ),
    )
    monkeypatch.setattr(
        knowledge_route,
        "rebuild_workspace_knowledge",
        lambda db, current_workspace_id: KnowledgeReindexResult(record_count=2, chunk_count=4),
    )
    monkeypatch.setattr(
        knowledge_route,
        "rebuild_record_knowledge",
        lambda db, record_id: KnowledgeReindexResult(
            record_count=1,
            chunk_count=2 if record_id == record_ids["one"] else 1,
        ),
    )

    stats_response = client.get(f"/api/v1/workspaces/{workspace_id}/knowledge/stats")
    assert stats_response.status_code == 200
    stats = stats_response.json()["data"]["stats"]
    assert stats["chunk_count"] == 4
    assert stats["embedding_dimensions"] == 384

    workspace_reindex_response = client.post(
        f"/api/v1/workspaces/{workspace_id}/knowledge/reindex",
        json={},
    )
    assert workspace_reindex_response.status_code == 200
    workspace_result = workspace_reindex_response.json()["data"]["result"]
    assert workspace_result["record_count"] == 2
    assert workspace_result["chunk_count"] == 4

    record_reindex_response = client.post(
        f"/api/v1/workspaces/{workspace_id}/knowledge/reindex",
        json={"record_id": record_ids["one"]},
    )
    assert record_reindex_response.status_code == 200
    record_result = record_reindex_response.json()["data"]["result"]
    assert record_result["record_count"] == 1
    assert record_result["chunk_count"] == 2

    missing_record_response = client.post(
        f"/api/v1/workspaces/{workspace_id}/knowledge/reindex",
        json={"record_id": "missing-record"},
    )
    assert missing_record_response.status_code == 404


def test_knowledge_search_route_returns_hits_and_records(monkeypatch) -> None:
    client, workspace_id, record_ids = build_knowledge_client(monkeypatch)

    monkeypatch.setattr(
        knowledge_route,
        "search_knowledge",
        lambda db, current_workspace_id, query, limit: [
            KnowledgeSearchHit(
                chunk_id="chunk-2",
                record_id=record_ids["two"],
                record_title="Travel memo",
                record_type_code="memo",
                source_type="record",
                source_label="Travel memo",
                media_id=None,
                score=0.88,
                snippet="Remember the cafe",
            ),
            KnowledgeSearchHit(
                chunk_id="chunk-1",
                record_id=record_ids["one"],
                record_title="Best noodles",
                record_type_code="food",
                source_type="record",
                source_label="Best noodles",
                media_id=None,
                score=0.91,
                snippet="Soup and noodles",
            ),
            KnowledgeSearchHit(
                chunk_id="chunk-3",
                record_id=record_ids["two"],
                record_title="Travel memo",
                record_type_code="memo",
                source_type="media",
                source_label="voice note",
                media_id="media-1",
                score=0.74,
                snippet="Cafe reminder",
            ),
        ],
    )

    response = client.post(
        f"/api/v1/workspaces/{workspace_id}/knowledge/search",
        json={"query": "cafe noodle", "limit": 5},
    )
    assert response.status_code == 200
    payload = response.json()["data"]
    assert len(payload["items"]) == 3
    assert payload["summary"] == "Knowledge search returned 3 hit(s)."
    assert [item["id"] for item in payload["records"]] == [record_ids["two"], record_ids["one"]]
