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


def build_media_retention_client() -> tuple[TestClient, sessionmaker, dict[str, str], dict[str, str]]:
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
            username="media-retention-owner",
            email="media-retention-owner@example.com",
            password_hash="test-hash",
            display_name="Media Retention Owner",
        )
        editor = User(
            username="media-retention-editor",
            email="media-retention-editor@example.com",
            password_hash="test-hash",
            display_name="Media Retention Editor",
        )
        viewer = User(
            username="media-retention-viewer",
            email="media-retention-viewer@example.com",
            password_hash="test-hash",
            display_name="Media Retention Viewer",
        )
        db.add_all([owner, editor, viewer])
        db.flush()

        workspace = Workspace(
            name="Media Retention Workspace",
            slug="media-retention-workspace",
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


def build_retention_item(*, media_id: str, created_at: datetime, age_days: int) -> dict[str, object]:
    return {
        "media_id": media_id,
        "record_id": "record-1",
        "original_filename": f"{media_id}.png",
        "media_type": "image",
        "storage_provider": "custom",
        "storage_tier": "hot",
        "processing_status": "completed",
        "size_bytes": 128,
        "size_label": "128 B",
        "created_at": created_at,
        "age_days": age_days,
        "file_missing": False,
    }


def test_media_retention_api_report_passes_filters_and_serializes_payload(monkeypatch) -> None:
    client, _session_local, ids, current_role = build_media_retention_client()
    current_role["value"] = "editor_id"
    captured: dict[str, object] = {}
    created_at = datetime(2025, 10, 1, tzinfo=timezone.utc)

    def fake_build_workspace_media_retention_report(db, workspace_id, *, older_than_days, limit):
        captured.update(
            {
                "workspace_id": workspace_id,
                "older_than_days": older_than_days,
                "limit": limit,
            }
        )
        return {
            "workspace_id": workspace_id,
            "older_than_days": older_than_days,
            "total_count": 3,
            "total_size_bytes": 512,
            "total_size_label": "512 B",
            "oldest_media_age_days": 180,
            "old_item_count": 1,
            "old_item_size_bytes": 128,
            "old_item_size_label": "128 B",
            "archived_item_count": 1,
            "archived_item_size_bytes": 256,
            "archived_item_size_label": "256 B",
            "remote_item_count": 2,
            "remote_item_size_bytes": 384,
            "remote_item_size_label": "384 B",
            "missing_file_count": 0,
            "orphan_file_count": 1,
            "orphan_file_size_bytes": 64,
            "orphan_file_size_label": "64 B",
            "largest_items": [build_retention_item(media_id="media-largest", created_at=created_at, age_days=180)],
            "retention_candidates": [build_retention_item(media_id="media-old", created_at=created_at, age_days=180)],
        }

    monkeypatch.setattr(media_route, "build_workspace_media_retention_report", fake_build_workspace_media_retention_report)

    response = client.get(
        f"/api/v1/workspaces/{ids['workspace_id']}/media/retention-report",
        params={"older_than_days": 45, "limit": 7},
    )

    assert response.status_code == 200
    assert captured == {
        "workspace_id": ids["workspace_id"],
        "older_than_days": 45,
        "limit": 7,
    }
    report = response.json()["data"]["report"]
    assert report["older_than_days"] == 45
    assert report["largest_items"][0]["media_id"] == "media-largest"
    assert report["retention_candidates"][0]["media_id"] == "media-old"


def test_media_retention_cleanup_logs_audit_when_effective(monkeypatch) -> None:
    client, _session_local, ids, _current_role = build_media_retention_client()
    captured: dict[str, object] = {}
    audit_calls: list[dict[str, object]] = []

    def fake_cleanup_workspace_media_retention(
        db,
        workspace_id,
        *,
        media_ids,
        older_than_days,
        purge_orphan_files,
        dry_run,
    ):
        captured.update(
            {
                "workspace_id": workspace_id,
                "media_ids": media_ids,
                "older_than_days": older_than_days,
                "purge_orphan_files": purge_orphan_files,
                "dry_run": dry_run,
            }
        )
        return {
            "workspace_id": workspace_id,
            "older_than_days": older_than_days,
            "dry_run": dry_run,
            "candidate_media_count": 2,
            "candidate_media_size_bytes": 384,
            "candidate_media_size_label": "384 B",
            "orphan_file_count": 1,
            "orphan_file_size_bytes": 64,
            "orphan_file_size_label": "64 B",
            "affected_record_ids": ["record-1"],
            "skipped_media_ids": ["media-skip"],
            "skipped_reason_by_media_id": {"media-skip": "already_archived"},
        }

    monkeypatch.setattr(media_route, "cleanup_workspace_media_retention", fake_cleanup_workspace_media_retention)
    monkeypatch.setattr(media_route, "log_audit_event", lambda db, **kwargs: audit_calls.append(kwargs))

    response = client.post(
        f"/api/v1/workspaces/{ids['workspace_id']}/media/retention-cleanup",
        json={
            "media_ids": ["media-1", "media-2"],
            "older_than_days": 120,
            "purge_orphan_files": True,
            "dry_run": False,
        },
    )

    assert response.status_code == 200
    assert captured == {
        "workspace_id": ids["workspace_id"],
        "media_ids": ["media-1", "media-2"],
        "older_than_days": 120,
        "purge_orphan_files": True,
        "dry_run": False,
    }
    result = response.json()["data"]["result"]
    assert result["candidate_media_count"] == 2
    assert result["orphan_file_count"] == 1
    assert audit_calls == [
        {
            "workspace_id": ids["workspace_id"],
            "actor_user_id": ids["owner_id"],
            "action_code": "media.retention_cleanup",
            "resource_type": "workspace",
            "resource_id": ids["workspace_id"],
            "message": "Executed media retention cleanup",
            "metadata_json": {
                "older_than_days": 120,
                "candidate_media_count": 2,
                "candidate_media_size_bytes": 384,
                "orphan_file_count": 1,
                "orphan_file_size_bytes": 64,
                "skipped_media_ids": ["media-skip"],
            },
        }
    ]


def test_media_retention_cleanup_skips_audit_on_dry_run(monkeypatch) -> None:
    client, _session_local, ids, _current_role = build_media_retention_client()
    audit_calls: list[dict[str, object]] = []

    monkeypatch.setattr(
        media_route,
        "cleanup_workspace_media_retention",
        lambda *args, **kwargs: {
            "workspace_id": ids["workspace_id"],
            "older_than_days": 90,
            "dry_run": True,
            "candidate_media_count": 5,
            "candidate_media_size_bytes": 1024,
            "candidate_media_size_label": "1 KB",
            "orphan_file_count": 2,
            "orphan_file_size_bytes": 128,
            "orphan_file_size_label": "128 B",
            "affected_record_ids": [],
            "skipped_media_ids": [],
            "skipped_reason_by_media_id": {},
        },
    )
    monkeypatch.setattr(media_route, "log_audit_event", lambda db, **kwargs: audit_calls.append(kwargs))

    response = client.post(
        f"/api/v1/workspaces/{ids['workspace_id']}/media/retention-cleanup",
        json={
            "media_ids": [],
            "older_than_days": 90,
            "purge_orphan_files": False,
            "dry_run": True,
        },
    )

    assert response.status_code == 200
    assert response.json()["data"]["result"]["dry_run"] is True
    assert audit_calls == []


def test_media_retention_archive_logs_only_for_non_dry_effective_runs(monkeypatch) -> None:
    client, _session_local, ids, _current_role = build_media_retention_client()
    captured_calls: list[dict[str, object]] = []
    audit_calls: list[dict[str, object]] = []

    def fake_archive_workspace_media_retention(
        db,
        workspace_id,
        *,
        media_ids,
        older_than_days,
        dry_run,
    ):
        captured_calls.append(
            {
                "workspace_id": workspace_id,
                "media_ids": media_ids,
                "older_than_days": older_than_days,
                "dry_run": dry_run,
            }
        )
        if dry_run:
            return {
                "workspace_id": workspace_id,
                "older_than_days": older_than_days,
                "dry_run": True,
                "candidate_media_count": 3,
                "candidate_media_size_bytes": 768,
                "candidate_media_size_label": "768 B",
                "affected_record_ids": [],
                "skipped_media_ids": [],
                "skipped_reason_by_media_id": {},
            }
        return {
            "workspace_id": workspace_id,
            "older_than_days": older_than_days,
            "dry_run": False,
            "candidate_media_count": 2,
            "candidate_media_size_bytes": 512,
            "candidate_media_size_label": "512 B",
            "affected_record_ids": ["record-1"],
            "skipped_media_ids": ["media-skip"],
            "skipped_reason_by_media_id": {"media-skip": "already_archived"},
        }

    monkeypatch.setattr(media_route, "archive_workspace_media_retention", fake_archive_workspace_media_retention)
    monkeypatch.setattr(media_route, "log_audit_event", lambda db, **kwargs: audit_calls.append(kwargs))

    dry_run_response = client.post(
        f"/api/v1/workspaces/{ids['workspace_id']}/media/retention-archive",
        json={
            "media_ids": ["media-dry"],
            "older_than_days": 180,
            "dry_run": True,
        },
    )
    assert dry_run_response.status_code == 200

    live_response = client.post(
        f"/api/v1/workspaces/{ids['workspace_id']}/media/retention-archive",
        json={
            "media_ids": ["media-live"],
            "older_than_days": 180,
            "dry_run": False,
        },
    )

    assert live_response.status_code == 200
    assert captured_calls == [
        {
            "workspace_id": ids["workspace_id"],
            "media_ids": ["media-dry"],
            "older_than_days": 180,
            "dry_run": True,
        },
        {
            "workspace_id": ids["workspace_id"],
            "media_ids": ["media-live"],
            "older_than_days": 180,
            "dry_run": False,
        },
    ]
    assert audit_calls == [
        {
            "workspace_id": ids["workspace_id"],
            "actor_user_id": ids["owner_id"],
            "action_code": "media.retention_archive",
            "resource_type": "workspace",
            "resource_id": ids["workspace_id"],
            "message": "Archived stale media into archive tier",
            "metadata_json": {
                "older_than_days": 180,
                "candidate_media_count": 2,
                "candidate_media_size_bytes": 512,
                "skipped_media_ids": ["media-skip"],
            },
        }
    ]


def test_media_retention_api_enforces_write_and_owner_permissions() -> None:
    client, _session_local, ids, current_role = build_media_retention_client()

    current_role["value"] = "viewer_id"
    report_response = client.get(f"/api/v1/workspaces/{ids['workspace_id']}/media/retention-report")
    assert report_response.status_code == 403
    assert report_response.json()["detail"] == "Forbidden"

    current_role["value"] = "editor_id"
    for path in (
        f"/api/v1/workspaces/{ids['workspace_id']}/media/retention-cleanup",
        f"/api/v1/workspaces/{ids['workspace_id']}/media/retention-archive",
    ):
        response = client.post(
            path,
            json={"media_ids": [], "older_than_days": 90, "dry_run": True},
        )
        assert response.status_code == 403
        assert response.json()["detail"] == "Forbidden"
