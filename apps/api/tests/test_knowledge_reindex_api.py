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
from app.services.knowledge_types import KnowledgeReindexResult, KnowledgeStats


def build_knowledge_reindex_client() -> tuple[TestClient, sessionmaker, dict[str, str], dict[str, str]]:
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
            username="knowledge-reindex-owner",
            email="knowledge-reindex-owner@example.com",
            password_hash="test-hash",
            display_name="Knowledge Reindex Owner",
        )
        editor = User(
            username="knowledge-reindex-editor",
            email="knowledge-reindex-editor@example.com",
            password_hash="test-hash",
            display_name="Knowledge Reindex Editor",
        )
        viewer = User(
            username="knowledge-reindex-viewer",
            email="knowledge-reindex-viewer@example.com",
            password_hash="test-hash",
            display_name="Knowledge Reindex Viewer",
        )
        outsider = User(
            username="knowledge-reindex-outsider",
            email="knowledge-reindex-outsider@example.com",
            password_hash="test-hash",
            display_name="Knowledge Reindex Outsider",
        )
        db.add_all([owner, editor, viewer, outsider])
        db.flush()

        workspace = Workspace(
            name="Knowledge Reindex Workspace",
            slug="knowledge-reindex-workspace",
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
        db.flush()

        record_item = Record(
            workspace_id=workspace.id,
            creator_id=owner.id,
            type_code="memo",
            title="Knowledge reindex record",
            content="Record content",
            source_type="manual",
            status="active",
            extra_data={},
        )
        db.add(record_item)
        db.commit()

        ids = {
            "workspace_id": workspace.id,
            "owner_id": owner.id,
            "editor_id": editor.id,
            "viewer_id": viewer.id,
            "outsider_id": outsider.id,
            "record_id": record_item.id,
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


def test_knowledge_reindex_api_stats_and_workspace_reindex_passthrough_and_audit(monkeypatch) -> None:
    client, _session_local, ids, current_user_key = build_knowledge_reindex_client()
    current_user_key["value"] = "editor_id"
    captured_stats_workspace_ids: list[str] = []
    captured_reindex_workspace_ids: list[str] = []
    audit_calls: list[dict[str, object]] = []

    monkeypatch.setattr(
        knowledge_route,
        "get_knowledge_stats",
        lambda db, workspace_id: captured_stats_workspace_ids.append(workspace_id) or KnowledgeStats(
            chunk_count=9,
            record_count=3,
            media_count=2,
            latest_indexed_at=None,
            embedding_provider="builtin",
            embedding_model="embed-v2",
            embedding_dimensions=768,
        ),
    )
    monkeypatch.setattr(
        knowledge_route,
        "rebuild_workspace_knowledge",
        lambda db, workspace_id: captured_reindex_workspace_ids.append(workspace_id) or KnowledgeReindexResult(
            record_count=3,
            chunk_count=9,
        ),
    )
    monkeypatch.setattr(knowledge_route, "log_audit_event", lambda db, **kwargs: audit_calls.append(kwargs))

    stats_response = client.get(f"/api/v1/workspaces/{ids['workspace_id']}/knowledge/stats")
    assert stats_response.status_code == 200
    assert stats_response.json()["data"]["stats"] == {
        "chunk_count": 9,
        "record_count": 3,
        "media_count": 2,
        "latest_indexed_at": None,
        "embedding_provider": "builtin",
        "embedding_model": "embed-v2",
        "embedding_dimensions": 768,
    }

    reindex_response = client.post(
        f"/api/v1/workspaces/{ids['workspace_id']}/knowledge/reindex",
        json={},
    )
    assert reindex_response.status_code == 200
    payload = reindex_response.json()["data"]
    assert payload["result"] == {"record_count": 3, "chunk_count": 9}
    assert payload["stats"]["chunk_count"] == 9
    assert captured_stats_workspace_ids == [ids["workspace_id"], ids["workspace_id"]]
    assert captured_reindex_workspace_ids == [ids["workspace_id"]]
    assert audit_calls == [
        {
            "workspace_id": ids["workspace_id"],
            "actor_user_id": ids["editor_id"],
            "action_code": "knowledge.reindex",
            "resource_type": "knowledge_index",
            "resource_id": None,
            "message": "Rebuilt knowledge index",
            "metadata_json": {"record_id": None, "chunk_count": 9},
        }
    ]


def test_knowledge_reindex_api_record_scope_allows_viewer_and_logs_record_id(monkeypatch) -> None:
    client, _session_local, ids, current_user_key = build_knowledge_reindex_client()
    current_user_key["value"] = "viewer_id"
    captured_lookup: dict[str, object] = {}
    captured_rebuild_record_ids: list[str] = []
    audit_calls: list[dict[str, object]] = []

    def fake_get_workspace_record_or_404(db, *, workspace_id, record_id):
        captured_lookup.update({"workspace_id": workspace_id, "record_id": record_id})
        return db.get(Record, record_id)

    monkeypatch.setattr(knowledge_route, "get_workspace_record_or_404", fake_get_workspace_record_or_404)
    monkeypatch.setattr(
        knowledge_route,
        "rebuild_record_knowledge",
        lambda db, record_id: captured_rebuild_record_ids.append(record_id) or KnowledgeReindexResult(
            record_count=1,
            chunk_count=2,
        ),
    )
    monkeypatch.setattr(
        knowledge_route,
        "get_knowledge_stats",
        lambda db, workspace_id: KnowledgeStats(
            chunk_count=2,
            record_count=1,
            media_count=0,
            latest_indexed_at=None,
            embedding_provider="builtin",
            embedding_model="embed-v2",
            embedding_dimensions=768,
        ),
    )
    monkeypatch.setattr(knowledge_route, "log_audit_event", lambda db, **kwargs: audit_calls.append(kwargs))

    response = client.post(
        f"/api/v1/workspaces/{ids['workspace_id']}/knowledge/reindex",
        json={"record_id": ids["record_id"]},
    )

    assert response.status_code == 200
    assert captured_lookup == {
        "workspace_id": ids["workspace_id"],
        "record_id": ids["record_id"],
    }
    assert captured_rebuild_record_ids == [ids["record_id"]]
    assert response.json()["data"]["result"] == {"record_count": 1, "chunk_count": 2}
    assert audit_calls == [
        {
            "workspace_id": ids["workspace_id"],
            "actor_user_id": ids["viewer_id"],
            "action_code": "knowledge.reindex",
            "resource_type": "knowledge_index",
            "resource_id": ids["record_id"],
            "message": "Rebuilt knowledge index",
            "metadata_json": {"record_id": ids["record_id"], "chunk_count": 2},
        }
    ]


def test_knowledge_reindex_api_enforces_write_vs_member_access() -> None:
    client, _session_local, ids, current_user_key = build_knowledge_reindex_client()

    current_user_key["value"] = "viewer_id"
    viewer_stats_response = client.get(f"/api/v1/workspaces/{ids['workspace_id']}/knowledge/stats")
    assert viewer_stats_response.status_code == 403
    assert viewer_stats_response.json()["detail"] == "Forbidden"

    viewer_reindex_response = client.post(
        f"/api/v1/workspaces/{ids['workspace_id']}/knowledge/reindex",
        json={},
    )
    assert viewer_reindex_response.status_code != 403

    current_user_key["value"] = "outsider_id"
    outsider_reindex_response = client.post(
        f"/api/v1/workspaces/{ids['workspace_id']}/knowledge/reindex",
        json={},
    )
    assert outsider_reindex_response.status_code == 403
    assert outsider_reindex_response.json()["detail"] == "Forbidden"
