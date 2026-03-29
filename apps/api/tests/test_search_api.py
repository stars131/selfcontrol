from __future__ import annotations

from datetime import datetime, timezone

from fastapi import FastAPI
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker
from sqlalchemy.pool import StaticPool

from app.api.deps import get_current_user
from app.api.routes import search as search_route
from app.db.base import Base
from app.db.session import get_db
from app.models import audit_log, conversation, knowledge, media, notification, provider_config, reminder, search_preset, share_link, workspace_transfer_job  # noqa: F401
from app.models.record import Record
from app.models.user import User
from app.models.workspace import Workspace, WorkspaceMember


def build_search_client() -> tuple[TestClient, sessionmaker, dict[str, str]]:
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
            username="search-api-owner",
            email="search-api-owner@example.com",
            password_hash="test-hash",
            display_name="Search API Owner",
        )
        outsider = User(
            username="search-api-outsider",
            email="search-api-outsider@example.com",
            password_hash="test-hash",
            display_name="Search API Outsider",
        )
        db.add_all([owner, outsider])
        db.flush()

        workspace = Workspace(
            name="Search API Workspace",
            slug="search-api-workspace",
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
        db.flush()

        record_one = Record(
            workspace_id=workspace.id,
            creator_id=owner.id,
            type_code="food",
            title="Spicy noodles",
            content="good",
            rating=5,
            is_avoid=False,
            occurred_at=datetime(2026, 3, 29, 12, 0, tzinfo=timezone.utc),
            source_type="manual",
            status="active",
            extra_data={},
        )
        record_two = Record(
            workspace_id=workspace.id,
            creator_id=owner.id,
            type_code="snack",
            title="Seaweed chips",
            content="ok",
            rating=3,
            is_avoid=False,
            occurred_at=datetime(2026, 3, 28, 12, 0, tzinfo=timezone.utc),
            source_type="manual",
            status="active",
            extra_data={},
        )
        db.add_all([record_one, record_two])
        db.commit()

        owner_id = owner.id
        outsider_id = outsider.id
        workspace_id = workspace.id
        record_one_id = record_one.id
        record_two_id = record_two.id

    app = FastAPI()
    app.include_router(search_route.router, prefix="/api/v1/workspaces")

    def override_get_db():
        db = session_local()
        try:
            yield db
        finally:
            db.close()

    def override_get_current_user():
        db = session_local()
        try:
            user = db.get(User, owner_id)
            assert user is not None
            return user
        finally:
            db.close()

    app.dependency_overrides[get_db] = override_get_db
    app.dependency_overrides[get_current_user] = override_get_current_user

    return TestClient(app), session_local, {
        "workspace_id": workspace_id,
        "owner_id": owner_id,
        "outsider_id": outsider_id,
        "record_one_id": record_one_id,
        "record_two_id": record_two_id,
    }


def test_search_api_returns_hybrid_summary_and_serialized_records(monkeypatch) -> None:
    client, _session_local, ids = build_search_client()
    captured: dict[str, object] = {}

    def fake_search_records_hybrid(db, workspace_id, query, *, limit):
        captured.update(
            {
                "workspace_id": workspace_id,
                "query": query,
                "limit": limit,
            }
        )
        with _session_local() as session:
            return [
                session.get(Record, ids["record_one_id"]),
                session.get(Record, ids["record_two_id"]),
            ], [{"chunk_id": "hit-1"}]

    monkeypatch.setattr(search_route, "search_records_hybrid", fake_search_records_hybrid)

    response = client.post(
        f"/api/v1/workspaces/{ids['workspace_id']}/search",
        json={"query": "noodles"},
    )

    assert response.status_code == 200
    payload = response.json()["data"]
    assert captured == {
        "workspace_id": ids["workspace_id"],
        "query": "noodles",
        "limit": 10,
    }
    assert [item["id"] for item in payload["items"]] == [ids["record_one_id"], ids["record_two_id"]]
    assert payload["summary"] == "Found 2 record(s) matching 'noodles' via hybrid retrieval."


def test_search_api_uses_keyword_summary_when_hits_are_empty(monkeypatch) -> None:
    client, _session_local, ids = build_search_client()

    def fake_search_records_hybrid(db, workspace_id, query, *, limit):
        with _session_local() as session:
            return [session.get(Record, ids["record_two_id"])], []

    monkeypatch.setattr(search_route, "search_records_hybrid", fake_search_records_hybrid)

    response = client.post(
        f"/api/v1/workspaces/{ids['workspace_id']}/search",
        json={"query": "chips"},
    )

    assert response.status_code == 200
    payload = response.json()["data"]
    assert [item["id"] for item in payload["items"]] == [ids["record_two_id"]]
    assert payload["summary"] == "Found 1 record(s) matching 'chips' via keyword retrieval."


def test_search_api_requires_workspace_membership() -> None:
    client, session_local, ids = build_search_client()

    def override_get_current_user():
        db = session_local()
        try:
            user = db.get(User, ids["outsider_id"])
            assert user is not None
            return user
        finally:
            db.close()

    client.app.dependency_overrides[get_current_user] = override_get_current_user

    response = client.post(
        f"/api/v1/workspaces/{ids['workspace_id']}/search",
        json={"query": "blocked"},
    )

    assert response.status_code == 403
    assert response.json()["detail"] == "Forbidden"
