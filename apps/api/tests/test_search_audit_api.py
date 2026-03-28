from __future__ import annotations

from datetime import datetime, timezone

from fastapi import FastAPI
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker
from sqlalchemy.pool import StaticPool

from app.api.deps import get_current_user
from app.api.routes import audit_logs as audit_logs_route
from app.api.routes import search as search_route
from app.db.base import Base
from app.db.session import get_db
from app.models import audit_log, conversation, knowledge, media, notification, provider_config, reminder, search_preset, share_link  # noqa: F401
from app.models.audit_log import AuditLog
from app.models.record import Record
from app.models.user import User
from app.models.workspace import Workspace, WorkspaceMember


def build_search_audit_client() -> tuple[TestClient, str, dict[str, str]]:
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
            username="search-audit-user",
            email="search-audit@example.com",
            password_hash="test-hash",
            display_name="Search Audit User",
        )
        db.add(user)
        db.flush()

        workspace = Workspace(
            name="Search Audit Workspace",
            slug="search-audit-workspace",
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
            title="Night market noodles",
            content="Spicy and rich broth",
            source_type="manual",
            status="active",
            extra_data={},
        )
        record_two = Record(
            workspace_id=workspace.id,
            creator_id=user.id,
            type_code="memo",
            title="Cafe revisit",
            content="Remember the quiet corner",
            source_type="manual",
            status="active",
            extra_data={},
        )
        db.add_all([record_one, record_two])
        db.flush()

        db.add_all(
            [
                AuditLog(
                    workspace_id=workspace.id,
                    actor_user_id=user.id,
                    action_code="record.create",
                    resource_type="record",
                    resource_id=record_one.id,
                    message="Created record one",
                    metadata_json={"title": record_one.title},
                    created_at=datetime(2026, 3, 29, 10, 0, tzinfo=timezone.utc),
                ),
                AuditLog(
                    workspace_id=workspace.id,
                    actor_user_id=user.id,
                    action_code="record.update",
                    resource_type="record",
                    resource_id=record_one.id,
                    message="Updated record one",
                    metadata_json={"title": record_one.title},
                    created_at=datetime(2026, 3, 29, 11, 0, tzinfo=timezone.utc),
                ),
                AuditLog(
                    workspace_id=workspace.id,
                    actor_user_id=user.id,
                    action_code="workspace.export",
                    resource_type="workspace",
                    resource_id=workspace.id,
                    message="Exported workspace",
                    metadata_json={"count": 1},
                    created_at=datetime(2026, 3, 29, 12, 0, tzinfo=timezone.utc),
                ),
            ]
        )
        db.commit()
        workspace_id = workspace.id
        record_ids = {"one": record_one.id, "two": record_two.id}
        user_id = user.id

    app = FastAPI()
    app.include_router(search_route.router, prefix="/api/v1/workspaces")
    app.include_router(audit_logs_route.router, prefix="/api/v1/workspaces")

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


def test_search_route_reports_hybrid_and_keyword_modes(monkeypatch) -> None:
    client, workspace_id, record_ids = build_search_audit_client()

    monkeypatch.setattr(
        search_route,
        "search_records_hybrid",
        lambda db, current_workspace_id, query, limit=10: (
            [db.get(Record, record_ids["two"]), db.get(Record, record_ids["one"])],
            [{"chunk_id": "chunk-1"}],
        ),
    )

    hybrid_response = client.post(
        f"/api/v1/workspaces/{workspace_id}/search",
        json={"query": "cafe noodles"},
    )
    assert hybrid_response.status_code == 200
    hybrid_payload = hybrid_response.json()["data"]
    assert [item["id"] for item in hybrid_payload["items"]] == [record_ids["two"], record_ids["one"]]
    assert "via hybrid retrieval." in hybrid_payload["summary"]

    monkeypatch.setattr(
        search_route,
        "search_records_hybrid",
        lambda db, current_workspace_id, query, limit=10: ([db.get(Record, record_ids["one"])], []),
    )

    keyword_response = client.post(
        f"/api/v1/workspaces/{workspace_id}/search",
        json={"query": "noodles"},
    )
    assert keyword_response.status_code == 200
    keyword_payload = keyword_response.json()["data"]
    assert [item["id"] for item in keyword_payload["items"]] == [record_ids["one"]]
    assert "via keyword retrieval." in keyword_payload["summary"]


def test_audit_logs_route_supports_limit_and_action_filter() -> None:
    client, workspace_id, _ = build_search_audit_client()

    filtered_response = client.get(
        f"/api/v1/workspaces/{workspace_id}/audit-logs",
        params={"action_code": "record.update"},
    )
    assert filtered_response.status_code == 200
    filtered_items = filtered_response.json()["data"]["items"]
    assert len(filtered_items) == 1
    assert filtered_items[0]["action_code"] == "record.update"
    assert filtered_items[0]["message"] == "Updated record one"
    assert filtered_items[0]["created_at"] == "2026-03-29T11:00:00"

    limited_response = client.get(
        f"/api/v1/workspaces/{workspace_id}/audit-logs",
        params={"limit": 2},
    )
    assert limited_response.status_code == 200
    limited_items = limited_response.json()["data"]["items"]
    assert len(limited_items) == 2
    assert [item["action_code"] for item in limited_items] == ["workspace.export", "record.update"]
