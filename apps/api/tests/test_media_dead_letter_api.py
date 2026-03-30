from __future__ import annotations

from datetime import datetime, timezone

from fastapi import FastAPI
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker
from sqlalchemy.pool import StaticPool

from app.api.deps import get_current_user
from app.api.routes import media as media_route
from app.db.base import Base
from app.db.session import get_db
from app.models import audit_log, conversation, knowledge, media, notification, provider_config, record, reminder, search_preset, share_link, workspace_transfer_job  # noqa: F401
from app.models.user import User
from app.models.workspace import Workspace, WorkspaceMember


def build_media_dead_letter_client() -> tuple[TestClient, sessionmaker, dict[str, str], dict[str, str]]:
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
            username="media-dead-letter-owner",
            email="media-dead-letter-owner@example.com",
            password_hash="test-hash",
            display_name="Media Dead Letter Owner",
        )
        editor = User(
            username="media-dead-letter-editor",
            email="media-dead-letter-editor@example.com",
            password_hash="test-hash",
            display_name="Media Dead Letter Editor",
        )
        viewer = User(
            username="media-dead-letter-viewer",
            email="media-dead-letter-viewer@example.com",
            password_hash="test-hash",
            display_name="Media Dead Letter Viewer",
        )
        db.add_all([owner, editor, viewer])
        db.flush()

        workspace = Workspace(
            name="Media Dead Letter Workspace",
            slug="media-dead-letter-workspace",
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
        db.commit()

        ids = {
            "workspace_id": workspace.id,
            "owner_id": owner.id,
            "editor_id": editor.id,
            "viewer_id": viewer.id,
        }

    current_role = {"value": "owner_id"}

    app = FastAPI()
    app.include_router(media_route.router, prefix="/api/v1/workspaces")

    def override_get_db():
        db = session_local()
        try:
            yield db
        finally:
            db.close()

    def override_get_current_user():
        with session_local() as db:
            user = db.get(User, ids[current_role["value"]])
            assert user is not None
            return user

    app.dependency_overrides[get_db] = override_get_db
    app.dependency_overrides[get_current_user] = override_get_current_user

    return TestClient(app), session_local, ids, current_role


def build_dead_letter_issue(*, media_id: str, updated_at: datetime) -> dict[str, object]:
    return {
        "media_id": media_id,
        "record_id": "record-1",
        "original_filename": f"{media_id}.png",
        "media_type": "image",
        "storage_provider": "custom",
        "processing_status": "failed",
        "processing_error": "remote fetch timed out",
        "extraction_mode": "provider_remote",
        "processing_source": "remote_fetch",
        "processing_last_attempt_at": "2026-03-30T12:00:00Z",
        "processing_last_failure_at": "2026-03-30T12:00:05Z",
        "remote_fetch_status": "failed",
        "processing_retry_state": "manual_only",
        "processing_retry_count": 1,
        "processing_retry_max_attempts": 3,
        "processing_retry_next_attempt_at": None,
        "issue_category": "transient_remote_failure",
        "issue_label": "Remote fetch failed",
        "recommended_action_code": "retry_after_remote_check",
        "recommended_action_label": "Retry later",
        "recommended_action_detail": "Retry after checking storage health",
        "recommended_settings_feature_code": "media_storage",
        "can_bulk_retry": True,
        "updated_at": updated_at,
    }


def test_media_dead_letter_api_lists_overview_with_normalized_retry_states(monkeypatch) -> None:
    client, _session_local, ids, current_role = build_media_dead_letter_client()
    current_role["value"] = "editor_id"
    captured: dict[str, object] = {}
    updated_at = datetime(2026, 3, 30, 12, 0, tzinfo=timezone.utc)

    def fake_build_workspace_media_dead_letter_overview(db, workspace_id, *, limit, retry_states):
        captured.update(
            {
                "workspace_id": workspace_id,
                "limit": limit,
                "retry_states": retry_states,
            }
        )
        return {
            "workspace_id": workspace_id,
            "total_count": 1,
            "by_retry_state": {"manual_only": 1},
            "by_issue_category": {"transient_remote_failure": 1},
            "items": [build_dead_letter_issue(media_id="media-1", updated_at=updated_at)],
        }

    monkeypatch.setattr(
        media_route,
        "build_workspace_media_dead_letter_overview",
        fake_build_workspace_media_dead_letter_overview,
    )

    response = client.get(
        f"/api/v1/workspaces/{ids['workspace_id']}/media/dead-letter",
        params={"limit": 10, "retry_states": [" manual_only ", "exhausted", "manual_only"]},
    )

    assert response.status_code == 200
    assert captured == {
        "workspace_id": ids["workspace_id"],
        "limit": 10,
        "retry_states": {"manual_only", "exhausted"},
    }
    overview = response.json()["data"]["overview"]
    assert overview["total_count"] == 1
    assert overview["items"][0]["media_id"] == "media-1"


def test_media_dead_letter_api_bulk_retry_logs_audit_when_items_are_retried(monkeypatch) -> None:
    client, _session_local, ids, current_role = build_media_dead_letter_client()
    current_role["value"] = "editor_id"
    captured_collect: dict[str, object] = {}
    captured_execute: dict[str, object] = {}
    audit_calls: list[dict[str, object]] = []
    target_items = [object(), object()]

    def fake_collect_dead_letter_target_items(db, *, workspace_id, media_ids, limit, retry_states):
        captured_collect.update(
            {
                "workspace_id": workspace_id,
                "media_ids": media_ids,
                "limit": limit,
                "retry_states": retry_states,
            }
        )
        return target_items

    def fake_execute_dead_letter_bulk_retry(db, *, target_items, retry_states, workspace_id):
        captured_execute.update(
            {
                "target_items": target_items,
                "retry_states": retry_states,
                "workspace_id": workspace_id,
            }
        )
        return {
            "workspace_id": workspace_id,
            "target_count": 2,
            "retried_count": 1,
            "queued_count": 1,
            "processing_count": 0,
            "skipped_media_ids": ["media-2"],
            "skipped_reason_by_media_id": {"media-2": "bulk_retry_not_recommended"},
            "retried_media_ids": ["media-1"],
        }

    monkeypatch.setattr(media_route, "collect_dead_letter_target_items", fake_collect_dead_letter_target_items)
    monkeypatch.setattr(media_route, "execute_dead_letter_bulk_retry", fake_execute_dead_letter_bulk_retry)
    monkeypatch.setattr(media_route, "log_audit_event", lambda db, **kwargs: audit_calls.append(kwargs))

    response = client.post(
        f"/api/v1/workspaces/{ids['workspace_id']}/media/dead-letter/retry",
        json={
            "media_ids": ["media-1", "media-2"],
            "retry_states": ["manual_only", " exhausted "],
            "limit": 5,
        },
    )

    assert response.status_code == 200
    assert captured_collect == {
        "workspace_id": ids["workspace_id"],
        "media_ids": ["media-1", "media-2"],
        "limit": 5,
        "retry_states": {"manual_only", "exhausted"},
    }
    assert captured_execute == {
        "target_items": target_items,
        "retry_states": {"manual_only", "exhausted"},
        "workspace_id": ids["workspace_id"],
    }
    assert response.json()["data"]["result"]["retried_media_ids"] == ["media-1"]
    assert audit_calls == [
        {
            "workspace_id": ids["workspace_id"],
            "actor_user_id": ids["editor_id"],
            "action_code": "media.dead_letter_bulk_retry",
            "resource_type": "workspace",
            "resource_id": ids["workspace_id"],
            "message": "Triggered bulk dead-letter media recovery",
            "metadata_json": {
                "target_count": 2,
                "retried_count": 1,
                "queued_count": 1,
                "processing_count": 0,
                "retry_states": ["exhausted", "manual_only"],
                "retried_media_ids": ["media-1"],
                "skipped_media_ids": ["media-2"],
            },
        }
    ]


def test_media_dead_letter_api_bulk_retry_skips_audit_when_nothing_is_retried(monkeypatch) -> None:
    client, _session_local, ids, _current_role = build_media_dead_letter_client()
    audit_calls: list[dict[str, object]] = []

    monkeypatch.setattr(media_route, "collect_dead_letter_target_items", lambda *args, **kwargs: [])
    monkeypatch.setattr(
        media_route,
        "execute_dead_letter_bulk_retry",
        lambda *args, **kwargs: {
            "workspace_id": ids["workspace_id"],
            "target_count": 0,
            "retried_count": 0,
            "queued_count": 0,
            "processing_count": 0,
            "skipped_media_ids": [],
            "skipped_reason_by_media_id": {},
            "retried_media_ids": [],
        },
    )
    monkeypatch.setattr(media_route, "log_audit_event", lambda db, **kwargs: audit_calls.append(kwargs))

    response = client.post(
        f"/api/v1/workspaces/{ids['workspace_id']}/media/dead-letter/retry",
        json={"media_ids": [], "retry_states": [], "limit": 20},
    )

    assert response.status_code == 200
    assert response.json()["data"]["result"]["retried_media_ids"] == []
    assert audit_calls == []


def test_media_dead_letter_api_requires_write_access() -> None:
    client, _session_local, ids, current_role = build_media_dead_letter_client()
    current_role["value"] = "viewer_id"

    for method, path in (
        ("get", f"/api/v1/workspaces/{ids['workspace_id']}/media/dead-letter"),
        ("post", f"/api/v1/workspaces/{ids['workspace_id']}/media/dead-letter/retry"),
    ):
        if method == "post":
            response = client.post(
                path,
                json={"media_ids": [], "retry_states": [], "limit": 20},
            )
        else:
            response = client.get(path)

        assert response.status_code == 403
        assert response.json()["detail"] == "Forbidden"
