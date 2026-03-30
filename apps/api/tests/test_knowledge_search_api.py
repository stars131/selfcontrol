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
from app.models import audit_log, conversation, knowledge, media, notification, provider_config, record, reminder, search_preset, share_link, workspace_transfer_job  # noqa: F401
from app.models.record import Record
from app.models.user import User
from app.models.workspace import Workspace, WorkspaceMember
from app.services.knowledge_types import KnowledgeSearchHit


def build_knowledge_search_client() -> tuple[TestClient, sessionmaker, dict[str, str], dict[str, str]]:
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
            username="knowledge-search-owner",
            email="knowledge-search-owner@example.com",
            password_hash="test-hash",
            display_name="Knowledge Search Owner",
        )
        viewer = User(
            username="knowledge-search-viewer",
            email="knowledge-search-viewer@example.com",
            password_hash="test-hash",
            display_name="Knowledge Search Viewer",
        )
        outsider = User(
            username="knowledge-search-outsider",
            email="knowledge-search-outsider@example.com",
            password_hash="test-hash",
            display_name="Knowledge Search Outsider",
        )
        db.add_all([owner, viewer, outsider])
        db.flush()

        workspace = Workspace(
            name="Knowledge Search Workspace",
            slug="knowledge-search-workspace",
            owner_id=owner.id,
            visibility="private",
        )
        db.add(workspace)
        db.flush()

        db.add_all(
            [
                WorkspaceMember(workspace_id=workspace.id, user_id=owner.id, role="owner"),
                WorkspaceMember(workspace_id=workspace.id, user_id=viewer.id, role="viewer"),
            ]
        )
        db.flush()

        record_one = Record(
            workspace_id=workspace.id,
            creator_id=owner.id,
            type_code="food",
            title="Noodle note",
            content="Broth and noodles",
            source_type="manual",
            status="active",
            extra_data={},
        )
        record_two = Record(
            workspace_id=workspace.id,
            creator_id=owner.id,
            type_code="memo",
            title="Cafe reminder",
            content="Remember the cafe",
            source_type="manual",
            status="active",
            extra_data={},
        )
        db.add_all([record_one, record_two])
        db.commit()

        ids = {
            "workspace_id": workspace.id,
            "owner_id": owner.id,
            "viewer_id": viewer.id,
            "outsider_id": outsider.id,
            "record_one_id": record_one.id,
            "record_two_id": record_two.id,
        }

    current_user_key = {"value": "owner_id"}

    app = FastAPI()
    app.include_router(knowledge_route.router, prefix="/api/v1/workspaces")

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


def test_knowledge_search_api_passes_query_limit_and_collected_records(monkeypatch) -> None:
    client, session_local, ids, current_user_key = build_knowledge_search_client()
    current_user_key["value"] = "viewer_id"
    captured_search: dict[str, object] = {}
    captured_collect: dict[str, object] = {}

    hits = [
        KnowledgeSearchHit(
            chunk_id="chunk-2",
            record_id=ids["record_two_id"],
            record_title="Cafe reminder",
            record_type_code="memo",
            source_type="record",
            source_label="Cafe reminder",
            media_id=None,
            score=0.88,
            snippet="Remember the cafe",
        ),
        KnowledgeSearchHit(
            chunk_id="chunk-1",
            record_id=ids["record_one_id"],
            record_title="Noodle note",
            record_type_code="food",
            source_type="record",
            source_label="Noodle note",
            media_id=None,
            score=0.91,
            snippet="Broth and noodles",
        ),
    ]

    def fake_search_knowledge(db, workspace_id, query, limit):
        captured_search.update(
            {
                "workspace_id": workspace_id,
                "query": query,
                "limit": limit,
            }
        )
        return hits

    def fake_collect_knowledge_search_records(db, route_hits):
        captured_collect["hits"] = route_hits
        return [
            db.get(Record, ids["record_two_id"]),
            db.get(Record, ids["record_one_id"]),
        ]

    monkeypatch.setattr(knowledge_route, "search_knowledge", fake_search_knowledge)
    monkeypatch.setattr(knowledge_route, "collect_knowledge_search_records", fake_collect_knowledge_search_records)

    response = client.post(
        f"/api/v1/workspaces/{ids['workspace_id']}/knowledge/search",
        json={"query": "cafe noodle", "limit": 5},
    )

    assert response.status_code == 200
    assert captured_search == {
        "workspace_id": ids["workspace_id"],
        "query": "cafe noodle",
        "limit": 5,
    }
    assert captured_collect == {"hits": hits}
    payload = response.json()["data"]
    assert len(payload["items"]) == 2
    assert payload["summary"] == "Knowledge search returned 2 hit(s)."
    assert [item["id"] for item in payload["records"]] == [ids["record_two_id"], ids["record_one_id"]]


def test_knowledge_search_api_allows_missing_limit_and_returns_empty_results(monkeypatch) -> None:
    client, _session_local, ids, _current_user_key = build_knowledge_search_client()
    captured_search: dict[str, object] = {}

    def fake_search_knowledge(db, workspace_id, query, limit):
        captured_search.update(
            {
                "workspace_id": workspace_id,
                "query": query,
                "limit": limit,
            }
        )
        return []

    monkeypatch.setattr(knowledge_route, "search_knowledge", fake_search_knowledge)
    monkeypatch.setattr(knowledge_route, "collect_knowledge_search_records", lambda db, hits: [])

    response = client.post(
        f"/api/v1/workspaces/{ids['workspace_id']}/knowledge/search",
        json={"query": "nothing"},
    )

    assert response.status_code == 200
    assert captured_search == {
        "workspace_id": ids["workspace_id"],
        "query": "nothing",
        "limit": None,
    }
    payload = response.json()["data"]
    assert payload["items"] == []
    assert payload["records"] == []
    assert payload["summary"] == "Knowledge search returned 0 hit(s)."


def test_knowledge_search_api_requires_workspace_membership() -> None:
    client, _session_local, ids, current_user_key = build_knowledge_search_client()
    current_user_key["value"] = "outsider_id"

    response = client.post(
        f"/api/v1/workspaces/{ids['workspace_id']}/knowledge/search",
        json={"query": "blocked"},
    )

    assert response.status_code == 403
    assert response.json()["detail"] == "Forbidden"
