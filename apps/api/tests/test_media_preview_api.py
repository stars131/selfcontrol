from __future__ import annotations

import asyncio
from datetime import datetime, timedelta, timezone

from fastapi import FastAPI
from fastapi.testclient import TestClient
import httpx
import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker
from sqlalchemy.pool import StaticPool

from app.api.deps import get_current_user
from app.api.routes import media as media_route
from app.api.routes import records as records_route
from app.db.base import Base
from app.db.session import get_db
from app.models import audit_log, conversation, knowledge, media, notification, provider_config, record, reminder, search_preset, share_link  # noqa: F401
from app.models.media import MediaAsset
from app.models.provider_config import ProviderConfig
from app.models.record import Record
from app.models.user import User
from app.models.workspace import Workspace, WorkspaceMember
from app.services import background_tasks as background_tasks_service
from app.services import media_remote_storage as media_remote_storage_service
from app.services.media_remote_storage import (
    RemoteMediaContentResult,
    RemoteMediaUploadAttemptResult,
    RemoteMediaUploadResult,
)
from app.services.media_provider import DeferredMediaProcessingError
from app.services.provider_configs import ProviderFeatureConfig


PNG_1X1 = (
    b"\x89PNG\r\n\x1a\n\x00\x00\x00\rIHDR\x00\x00\x00\x01\x00\x00\x00\x01"
    b"\x08\x02\x00\x00\x00\x90wS\xde\x00\x00\x00\x0cIDATx\x9cc\xf8\xcf\xc0\x00\x00\x03\x01"
    b"\x01\x00\xc9\xfe\x92\xef\x00\x00\x00\x00IEND\xaeB`\x82"
)


def build_media_client(tmp_path, monkeypatch) -> tuple[TestClient, str, str, sessionmaker]:
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
            username="media-user",
            email="media@example.com",
            password_hash="test-hash",
            display_name="Media User",
        )
        db.add(user)
        db.flush()

        workspace = Workspace(
            name="Media Workspace",
            slug="media-workspace",
            owner_id=user.id,
            visibility="private",
        )
        db.add(workspace)
        db.flush()

        db.add(WorkspaceMember(workspace_id=workspace.id, user_id=user.id, role="owner"))
        db.add(
            Record(
                workspace_id=workspace.id,
                creator_id=user.id,
                type_code="memo",
                title="Media record",
                content="Has file",
                source_type="manual",
                status="active",
                extra_data={},
            )
        )
        db.commit()

        user_id = user.id
        workspace_id = workspace.id
        record_id = db.query(Record).filter(Record.workspace_id == workspace.id).first().id

    monkeypatch.setattr("app.services.media_processing.settings.storage_dir", str(tmp_path / "uploads"))
    monkeypatch.setattr("app.services.media_processing.settings.processing_tmp_dir", str(tmp_path / "tmp"))
    monkeypatch.setattr("app.services.media_storage.settings.storage_dir", str(tmp_path / "uploads"))
    monkeypatch.setattr("app.services.media_remote_storage.settings.processing_tmp_dir", str(tmp_path / "tmp"))
    monkeypatch.setattr("app.services.media_processing.rebuild_record_knowledge", lambda db, record_id: None)
    monkeypatch.setattr(media_route, "log_audit_event", lambda *args, **kwargs: None)
    monkeypatch.setattr(records_route, "log_audit_event", lambda *args, **kwargs: None)

    app = FastAPI()
    app.include_router(media_route.router, prefix="/api/v1/workspaces")
    app.include_router(records_route.router, prefix="/api/v1/workspaces")

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
    return TestClient(app), workspace_id, record_id, session_local


def build_custom_media_storage_config() -> ProviderFeatureConfig:
    return ProviderFeatureConfig(
        feature_code="media_storage",
        feature_label="Media storage",
        feature_description="Remote media storage",
        providers=["local", "custom"],
        provider_code="custom",
        model_name=None,
        is_enabled=True,
        api_base_url="https://storage.example.test/api",
        api_key_env_name="REMOTE_MEDIA_STORAGE_KEY",
        options_json={},
        is_default=False,
        updated_at=None,
        requires_secret=True,
        secret_env_name="REMOTE_MEDIA_STORAGE_KEY",
        secret_status="configured",
        config_warnings=[],
    )


def test_media_upload_returns_preview_metadata_and_content(tmp_path, monkeypatch) -> None:
    client, workspace_id, record_id, _session_local = build_media_client(tmp_path, monkeypatch)

    response = client.post(
        f"/api/v1/workspaces/{workspace_id}/records/{record_id}/media",
        files={"file": ("pixel.png", PNG_1X1, "image/png")},
    )

    assert response.status_code == 200
    media_payload = response.json()["data"]["media"]
    assert media_payload["processing_status"] in {"completed", "deferred"}
    assert media_payload["metadata_json"]["preview_kind"] == "image"
    assert media_payload["metadata_json"]["width"] == 1
    assert media_payload["metadata_json"]["height"] == 1
    assert media_payload["metadata_json"]["file_extension"] == ".png"
    assert media_payload["metadata_json"]["size_label"].endswith("B")

    content_response = client.get(f"/api/v1/workspaces/{workspace_id}/media/{media_payload['id']}/content")

    assert content_response.status_code == 200
    assert content_response.headers["content-type"] == "image/png"
    assert content_response.content == PNG_1X1


def test_media_delete_cleans_file_and_updates_storage_summary(tmp_path, monkeypatch) -> None:
    client, workspace_id, record_id, _session_local = build_media_client(tmp_path, monkeypatch)

    upload_response = client.post(
        f"/api/v1/workspaces/{workspace_id}/records/{record_id}/media",
        files={"file": ("pixel.png", PNG_1X1, "image/png")},
    )
    assert upload_response.status_code == 200
    media_payload = upload_response.json()["data"]["media"]
    stored_path = tmp_path / media_payload["storage_key"]
    assert stored_path.exists()

    summary_response = client.get(f"/api/v1/workspaces/{workspace_id}/media/storage-summary")
    assert summary_response.status_code == 200
    summary = summary_response.json()["data"]["summary"]
    assert summary["total_count"] == 1
    assert summary["total_size_bytes"] == len(PNG_1X1)
    assert summary["by_media_type"]["image"] == 1

    delete_response = client.delete(f"/api/v1/workspaces/{workspace_id}/media/{media_payload['id']}")
    assert delete_response.status_code == 200
    assert delete_response.json()["data"]["deleted"] is True
    assert not stored_path.exists()

    summary_after_delete = client.get(f"/api/v1/workspaces/{workspace_id}/media/storage-summary")
    assert summary_after_delete.status_code == 200
    assert summary_after_delete.json()["data"]["summary"]["total_count"] == 0


def test_record_delete_cleans_attached_media_files(tmp_path, monkeypatch) -> None:
    client, workspace_id, record_id, _session_local = build_media_client(tmp_path, monkeypatch)

    upload_response = client.post(
        f"/api/v1/workspaces/{workspace_id}/records/{record_id}/media",
        files={"file": ("pixel.png", PNG_1X1, "image/png")},
    )
    assert upload_response.status_code == 200
    media_payload = upload_response.json()["data"]["media"]
    stored_path = tmp_path / media_payload["storage_key"]
    assert stored_path.exists()

    record_delete_response = client.delete(f"/api/v1/workspaces/{workspace_id}/records/{record_id}")
    assert record_delete_response.status_code == 200
    assert record_delete_response.json()["data"]["deleted"] is True
    assert not stored_path.exists()

    list_media_response = client.get(f"/api/v1/workspaces/{workspace_id}/records/{record_id}/media")
    assert list_media_response.status_code == 200
    assert list_media_response.json()["data"]["items"] == []


def test_media_upload_can_be_dispatched_async(tmp_path, monkeypatch) -> None:
    client, workspace_id, record_id, _session_local = build_media_client(tmp_path, monkeypatch)
    queued_media_ids: list[str] = []

    monkeypatch.setattr("app.services.background_tasks.settings.media_processing_mode", "async")

    class FakeTask:
        @staticmethod
        def delay(media_id: str) -> None:
            queued_media_ids.append(media_id)

    monkeypatch.setattr("app.worker.process_media_asset_task", FakeTask())

    upload_response = client.post(
        f"/api/v1/workspaces/{workspace_id}/records/{record_id}/media",
        files={"file": ("pixel.png", PNG_1X1, "image/png")},
    )

    assert upload_response.status_code == 200
    media_payload = upload_response.json()["data"]["media"]
    assert media_payload["processing_status"] == "pending"
    assert media_payload["processed_at"] is None
    assert queued_media_ids == [media_payload["id"]]

    retry_response = client.post(f"/api/v1/workspaces/{workspace_id}/media/{media_payload['id']}/retry")
    assert retry_response.status_code == 200
    retry_payload = retry_response.json()["data"]["media"]
    assert retry_payload["processing_status"] == "pending"
    assert queued_media_ids == [media_payload["id"], media_payload["id"]]


def test_media_processing_overview_reports_recent_remote_issues(tmp_path, monkeypatch) -> None:
    client, workspace_id, record_id, session_local = build_media_client(tmp_path, monkeypatch)

    with session_local() as db:
        user_id = db.query(User).first().id
        db.add_all(
            [
                MediaAsset(
                    workspace_id=workspace_id,
                    record_id=record_id,
                    uploaded_by=user_id,
                    media_type="text",
                    storage_provider="local",
                    storage_key=f"uploads/{workspace_id}/note.txt",
                    original_filename="note.txt",
                    mime_type="text/plain",
                    size_bytes=12,
                    metadata_json={
                        "processing_source": "local_file",
                        "processing_last_attempt_at": "2026-03-21T09:00:00+00:00",
                        "processing_last_success_at": "2026-03-21T09:00:01+00:00",
                    },
                    processing_status="completed",
                    extracted_text="good noodle shop",
                ),
                MediaAsset(
                    workspace_id=workspace_id,
                    record_id=record_id,
                    uploaded_by=user_id,
                    media_type="image",
                    storage_provider="local",
                    storage_key=f"uploads/{workspace_id}/queued.png",
                    original_filename="queued.png",
                    mime_type="image/png",
                    size_bytes=128,
                    metadata_json={},
                    processing_status="pending",
                ),
                MediaAsset(
                    workspace_id=workspace_id,
                    record_id=record_id,
                    uploaded_by=user_id,
                    media_type="audio",
                    storage_provider="custom",
                    storage_key=f"remote/{workspace_id}/voice.m4a",
                    original_filename="voice.m4a",
                    mime_type="audio/mp4",
                    size_bytes=256,
                    metadata_json={
                        "processing_source": "remote_fetch",
                        "extraction_mode": "provider_deferred",
                        "processing_last_attempt_at": "2026-03-21T10:00:00+00:00",
                        "processing_last_failure_at": "2026-03-21T10:00:05+00:00",
                        "remote_fetch_status": "downloaded",
                    },
                    processing_status="deferred",
                    processing_error="provider processing is not ready",
                ),
                MediaAsset(
                    workspace_id=workspace_id,
                    record_id=record_id,
                    uploaded_by=user_id,
                    media_type="video",
                    storage_provider="custom",
                    storage_key=f"remote/{workspace_id}/clip.mp4",
                    original_filename="clip.mp4",
                    mime_type="video/mp4",
                    size_bytes=1024,
                    metadata_json={
                        "processing_source": "remote_fetch",
                        "extraction_mode": "provider_remote",
                        "processing_last_attempt_at": "2026-03-21T11:00:00+00:00",
                        "processing_last_failure_at": "2026-03-21T11:00:06+00:00",
                        "remote_fetch_status": "failed",
                    },
                    processing_status="failed",
                    processing_error="remote fetch timed out",
                ),
            ]
        )
        db.commit()

    response = client.get(f"/api/v1/workspaces/{workspace_id}/media/processing-overview?issue_limit=2")

    assert response.status_code == 200
    overview = response.json()["data"]["overview"]
    assert overview["workspace_id"] == workspace_id
    assert overview["total_count"] == 4
    assert overview["local_item_count"] == 2
    assert overview["remote_item_count"] == 2
    assert overview["completed_count"] == 1
    assert overview["pending_count"] == 1
    assert overview["deferred_count"] == 1
    assert overview["failed_count"] == 1
    assert overview["by_processing_status"]["completed"] == 1
    assert overview["by_processing_status"]["pending"] == 1
    assert overview["by_storage_provider"]["local"] == 2
    assert overview["by_storage_provider"]["custom"] == 2
    assert overview["by_issue_category"]["provider_not_ready"] == 1
    assert overview["by_issue_category"]["transient_remote_failure"] == 1

    recent_issues = overview["recent_issues"]
    assert [item["original_filename"] for item in recent_issues] == ["clip.mp4", "voice.m4a"]
    assert recent_issues[0]["processing_status"] == "failed"
    assert recent_issues[0]["processing_source"] == "remote_fetch"
    assert recent_issues[0]["remote_fetch_status"] == "failed"
    assert recent_issues[0]["extraction_mode"] == "provider_remote"
    assert recent_issues[0]["issue_category"] == "transient_remote_failure"
    assert recent_issues[0]["recommended_action_code"] == "retry_after_remote_check"
    assert recent_issues[0]["recommended_settings_feature_code"] == "media_storage"
    assert recent_issues[0]["can_bulk_retry"] is True
    assert recent_issues[1]["processing_status"] == "deferred"
    assert recent_issues[1]["remote_fetch_status"] == "downloaded"
    assert recent_issues[1]["issue_category"] == "provider_not_ready"
    assert recent_issues[1]["recommended_action_code"] == "retry_when_ready"
    assert recent_issues[1]["recommended_settings_feature_code"] == "audio_asr"


def test_media_dead_letter_overview_lists_remote_manual_recovery_items(tmp_path, monkeypatch) -> None:
    client, workspace_id, record_id, session_local = build_media_client(tmp_path, monkeypatch)

    with session_local() as db:
        user_id = db.query(User).first().id
        db.add_all(
            [
                MediaAsset(
                    workspace_id=workspace_id,
                    record_id=record_id,
                    uploaded_by=user_id,
                    media_type="audio",
                    storage_provider="custom",
                    storage_key=f"remote/{workspace_id}/voice-manual.m4a",
                    original_filename="voice-manual.m4a",
                    mime_type="audio/mp4",
                    size_bytes=256,
                    metadata_json={
                        "processing_last_attempt_at": "2026-03-21T10:00:00+00:00",
                        "processing_last_failure_at": "2026-03-21T10:00:05+00:00",
                        "processing_retry_state": "manual_only",
                        "processing_retry_count": 0,
                    },
                    processing_status="deferred",
                    processing_error="audio_asr provider is not enabled",
                ),
                MediaAsset(
                    workspace_id=workspace_id,
                    record_id=record_id,
                    uploaded_by=user_id,
                    media_type="video",
                    storage_provider="custom",
                    storage_key=f"remote/{workspace_id}/clip-exhausted.mp4",
                    original_filename="clip-exhausted.mp4",
                    mime_type="video/mp4",
                    size_bytes=1024,
                    metadata_json={
                        "processing_last_attempt_at": "2026-03-21T11:00:00+00:00",
                        "processing_last_failure_at": "2026-03-21T11:00:06+00:00",
                        "processing_retry_state": "exhausted",
                        "processing_retry_count": 3,
                    },
                    processing_status="failed",
                    processing_error="remote fetch timed out",
                ),
                MediaAsset(
                    workspace_id=workspace_id,
                    record_id=record_id,
                    uploaded_by=user_id,
                    media_type="image",
                    storage_provider="custom",
                    storage_key=f"remote/{workspace_id}/queued.png",
                    original_filename="queued.png",
                    mime_type="image/png",
                    size_bytes=128,
                    metadata_json={
                        "processing_retry_state": "scheduled",
                        "processing_retry_count": 1,
                    },
                    processing_status="deferred",
                    processing_error="provider processing is not ready",
                ),
                MediaAsset(
                    workspace_id=workspace_id,
                    record_id=record_id,
                    uploaded_by=user_id,
                    media_type="text",
                    storage_provider="local",
                    storage_key=f"uploads/{workspace_id}/local-note.txt",
                    original_filename="local-note.txt",
                    mime_type="text/plain",
                    size_bytes=32,
                    metadata_json={"processing_retry_state": "manual_only"},
                    processing_status="failed",
                    processing_error="local issue",
                ),
            ]
        )
        db.commit()

    response = client.get(f"/api/v1/workspaces/{workspace_id}/media/dead-letter?limit=10")

    assert response.status_code == 200
    overview = response.json()["data"]["overview"]
    assert overview["workspace_id"] == workspace_id
    assert overview["total_count"] == 2
    assert overview["by_retry_state"] == {"exhausted": 1, "manual_only": 1}
    assert overview["by_issue_category"] == {
        "provider_disabled": 1,
        "transient_remote_failure": 1,
    }
    assert [item["original_filename"] for item in overview["items"]] == [
        "clip-exhausted.mp4",
        "voice-manual.m4a",
    ]
    assert overview["items"][0]["issue_category"] == "transient_remote_failure"
    assert overview["items"][0]["recommended_action_code"] == "retry_after_remote_check"
    assert overview["items"][0]["recommended_settings_feature_code"] == "media_storage"
    assert overview["items"][1]["issue_category"] == "provider_disabled"
    assert overview["items"][1]["recommended_action_code"] == "enable_provider"
    assert overview["items"][1]["recommended_settings_feature_code"] == "audio_asr"


def test_media_retention_report_counts_old_missing_and_orphan_files(tmp_path, monkeypatch) -> None:
    client, workspace_id, record_id, session_local = build_media_client(tmp_path, monkeypatch)

    old_upload_response = client.post(
        f"/api/v1/workspaces/{workspace_id}/records/{record_id}/media",
        files={"file": ("old-note.txt", b"old snack note", "text/plain")},
    )
    assert old_upload_response.status_code == 200
    old_media_payload = old_upload_response.json()["data"]["media"]

    large_upload_response = client.post(
        f"/api/v1/workspaces/{workspace_id}/records/{record_id}/media",
        files={"file": ("large-video.txt", b"v" * 4096, "text/plain")},
    )
    assert large_upload_response.status_code == 200
    large_media_payload = large_upload_response.json()["data"]["media"]

    with session_local() as db:
        old_media = db.get(MediaAsset, old_media_payload["id"])
        assert old_media is not None
        old_media.created_at = datetime.now(timezone.utc) - timedelta(days=180)
        db.add(old_media)
        db.commit()

    missing_file_path = tmp_path / large_media_payload["storage_key"]
    assert missing_file_path.exists()
    missing_file_path.unlink()

    orphan_file_path = tmp_path / "uploads" / workspace_id / "orphan.bin"
    orphan_file_path.parent.mkdir(parents=True, exist_ok=True)
    orphan_file_path.write_bytes(b"orphan-file")

    retention_response = client.get(
        f"/api/v1/workspaces/{workspace_id}/media/retention-report?older_than_days=90&limit=5"
    )

    assert retention_response.status_code == 200
    report = retention_response.json()["data"]["report"]
    assert report["workspace_id"] == workspace_id
    assert report["older_than_days"] == 90
    assert report["total_count"] == 2
    assert report["old_item_count"] == 1
    assert report["old_item_size_bytes"] == len(b"old snack note")
    assert report["missing_file_count"] == 1
    assert report["orphan_file_count"] == 1
    assert report["orphan_file_size_bytes"] == len(b"orphan-file")
    assert report["oldest_media_age_days"] >= 179

    assert [item["original_filename"] for item in report["largest_items"]] == [
        "large-video.txt",
        "old-note.txt",
    ]
    assert report["largest_items"][0]["file_missing"] is True

    assert [item["original_filename"] for item in report["retention_candidates"]] == ["old-note.txt"]
    assert report["retention_candidates"][0]["age_days"] >= 179


def test_media_retention_cleanup_supports_dry_run_and_execution(tmp_path, monkeypatch) -> None:
    client, workspace_id, record_id, session_local = build_media_client(tmp_path, monkeypatch)

    old_upload_response = client.post(
        f"/api/v1/workspaces/{workspace_id}/records/{record_id}/media",
        files={"file": ("old-note.txt", b"old snack note", "text/plain")},
    )
    assert old_upload_response.status_code == 200
    old_media_payload = old_upload_response.json()["data"]["media"]

    recent_upload_response = client.post(
        f"/api/v1/workspaces/{workspace_id}/records/{record_id}/media",
        files={"file": ("recent-note.txt", b"recent snack note", "text/plain")},
    )
    assert recent_upload_response.status_code == 200
    recent_media_payload = recent_upload_response.json()["data"]["media"]

    with session_local() as db:
        old_media = db.get(MediaAsset, old_media_payload["id"])
        assert old_media is not None
        old_media.created_at = datetime.now(timezone.utc) - timedelta(days=180)
        db.add(old_media)
        db.commit()

    old_file_path = tmp_path / old_media_payload["storage_key"]
    recent_file_path = tmp_path / recent_media_payload["storage_key"]
    assert old_file_path.exists()
    assert recent_file_path.exists()

    orphan_file_path = tmp_path / "uploads" / workspace_id / "orphan.bin"
    orphan_file_path.parent.mkdir(parents=True, exist_ok=True)
    orphan_file_path.write_bytes(b"orphan-file")

    dry_run_response = client.post(
        f"/api/v1/workspaces/{workspace_id}/media/retention-cleanup",
        json={
            "media_ids": [old_media_payload["id"], recent_media_payload["id"]],
            "older_than_days": 90,
            "purge_orphan_files": True,
            "dry_run": True,
        },
    )

    assert dry_run_response.status_code == 200
    dry_run_result = dry_run_response.json()["data"]["result"]
    assert dry_run_result["dry_run"] is True
    assert dry_run_result["candidate_media_count"] == 1
    assert dry_run_result["candidate_media_size_bytes"] == len(b"old snack note")
    assert dry_run_result["orphan_file_count"] == 1
    assert dry_run_result["skipped_reason_by_media_id"][recent_media_payload["id"]] == "not_old_enough"
    assert old_file_path.exists()
    assert recent_file_path.exists()
    assert orphan_file_path.exists()

    cleanup_response = client.post(
        f"/api/v1/workspaces/{workspace_id}/media/retention-cleanup",
        json={
            "media_ids": [old_media_payload["id"], recent_media_payload["id"]],
            "older_than_days": 90,
            "purge_orphan_files": True,
            "dry_run": False,
        },
    )

    assert cleanup_response.status_code == 200
    cleanup_result = cleanup_response.json()["data"]["result"]
    assert cleanup_result["dry_run"] is False
    assert cleanup_result["candidate_media_count"] == 1
    assert cleanup_result["orphan_file_count"] == 1
    assert cleanup_result["affected_record_ids"] == [record_id]

    assert not old_file_path.exists()
    assert recent_file_path.exists()
    assert not orphan_file_path.exists()

    list_response = client.get(f"/api/v1/workspaces/{workspace_id}/records/{record_id}/media")
    assert list_response.status_code == 200
    assert [item["original_filename"] for item in list_response.json()["data"]["items"]] == ["recent-note.txt"]


def test_media_retention_cleanup_is_owner_only(tmp_path, monkeypatch) -> None:
    client, workspace_id, record_id, session_local = build_media_client(tmp_path, monkeypatch)

    upload_response = client.post(
        f"/api/v1/workspaces/{workspace_id}/records/{record_id}/media",
        files={"file": ("old-note.txt", b"old snack note", "text/plain")},
    )
    assert upload_response.status_code == 200
    media_payload = upload_response.json()["data"]["media"]

    with session_local() as db:
        member = db.query(WorkspaceMember).filter(WorkspaceMember.workspace_id == workspace_id).first()
        assert member is not None
        member.role = "editor"
        old_media = db.get(MediaAsset, media_payload["id"])
        assert old_media is not None
        old_media.created_at = datetime.now(timezone.utc) - timedelta(days=180)
        db.add(member)
        db.add(old_media)
        db.commit()

    cleanup_response = client.post(
        f"/api/v1/workspaces/{workspace_id}/media/retention-cleanup",
        json={
            "media_ids": [media_payload["id"]],
            "older_than_days": 90,
            "purge_orphan_files": False,
            "dry_run": False,
        },
    )

    assert cleanup_response.status_code == 403


def test_media_retention_archive_moves_file_and_updates_report(tmp_path, monkeypatch) -> None:
    client, workspace_id, record_id, session_local = build_media_client(tmp_path, monkeypatch)

    upload_response = client.post(
        f"/api/v1/workspaces/{workspace_id}/records/{record_id}/media",
        files={"file": ("old-note.txt", b"old snack note", "text/plain")},
    )
    assert upload_response.status_code == 200
    media_payload = upload_response.json()["data"]["media"]

    with session_local() as db:
        old_media = db.get(MediaAsset, media_payload["id"])
        assert old_media is not None
        old_media.created_at = datetime.now(timezone.utc) - timedelta(days=180)
        db.add(old_media)
        db.commit()

    original_file_path = tmp_path / media_payload["storage_key"]
    assert original_file_path.exists()

    archive_response = client.post(
        f"/api/v1/workspaces/{workspace_id}/media/retention-archive",
        json={
            "media_ids": [media_payload["id"]],
            "older_than_days": 90,
            "dry_run": False,
        },
    )

    assert archive_response.status_code == 200
    archive_result = archive_response.json()["data"]["result"]
    assert archive_result["candidate_media_count"] == 1
    assert archive_result["affected_record_ids"] == [record_id]
    assert not original_file_path.exists()

    status_response = client.get(f"/api/v1/workspaces/{workspace_id}/media/{media_payload['id']}/status")
    assert status_response.status_code == 200
    archived_media = status_response.json()["data"]["media"]
    assert archived_media["metadata_json"]["storage_tier"] == "archive"
    archived_file_path = tmp_path / archived_media["storage_key"]
    assert archived_file_path.exists()
    assert "\\archive\\" in str(archived_file_path) or "/archive/" in str(archived_file_path)

    content_response = client.get(f"/api/v1/workspaces/{workspace_id}/media/{media_payload['id']}/content")
    assert content_response.status_code == 200
    assert content_response.content == b"old snack note"

    report_response = client.get(f"/api/v1/workspaces/{workspace_id}/media/retention-report?older_than_days=90&limit=5")
    assert report_response.status_code == 200
    report = report_response.json()["data"]["report"]
    assert report["archived_item_count"] == 1
    assert report["archived_item_size_bytes"] == len(b"old snack note")
    assert report["retention_candidates"] == []
    assert report["largest_items"][0]["storage_tier"] == "archive"


def test_media_retention_archive_is_owner_only(tmp_path, monkeypatch) -> None:
    client, workspace_id, record_id, session_local = build_media_client(tmp_path, monkeypatch)

    upload_response = client.post(
        f"/api/v1/workspaces/{workspace_id}/records/{record_id}/media",
        files={"file": ("old-note.txt", b"old snack note", "text/plain")},
    )
    assert upload_response.status_code == 200
    media_payload = upload_response.json()["data"]["media"]

    with session_local() as db:
        member = db.query(WorkspaceMember).filter(WorkspaceMember.workspace_id == workspace_id).first()
        assert member is not None
        member.role = "editor"
        old_media = db.get(MediaAsset, media_payload["id"])
        assert old_media is not None
        old_media.created_at = datetime.now(timezone.utc) - timedelta(days=180)
        db.add(member)
        db.add(old_media)
        db.commit()

    archive_response = client.post(
        f"/api/v1/workspaces/{workspace_id}/media/retention-archive",
        json={
            "media_ids": [media_payload["id"]],
            "older_than_days": 90,
            "dry_run": False,
        },
    )

    assert archive_response.status_code == 403


def test_custom_remote_storage_service_uses_workspace_provider_config(tmp_path, monkeypatch) -> None:
    client, workspace_id, record_id, session_local = build_media_client(tmp_path, monkeypatch)
    del client, record_id

    with session_local() as db:
        db.add(
            ProviderConfig(
                workspace_id=workspace_id,
                feature_code="media_storage",
                provider_code="custom",
                is_enabled=True,
                api_base_url="https://storage.example.test/api",
                api_key_env_name="REMOTE_MEDIA_STORAGE_KEY",
                options_json={},
            )
        )
        db.commit()

    monkeypatch.setenv("REMOTE_MEDIA_STORAGE_KEY", "secret-value")

    async def fake_perform_upload(config, **kwargs):
        assert config.feature_code == "media_storage"
        assert config.provider_code == "custom"
        assert config.api_base_url == "https://storage.example.test/api"
        return RemoteMediaUploadResult(
            storage_provider="custom",
            storage_key="remote/workspace/asset.bin",
            size_bytes=len(kwargs["content"]),
            metadata_json={"checked": True},
        )

    def fake_perform_download(config, *, storage_key: str):
        assert config.provider_code == "custom"
        assert storage_key == "remote/workspace/asset.bin"
        return RemoteMediaContentResult(content=b"fetched", media_type="application/octet-stream")

    def fake_perform_delete(config, *, storage_key: str):
        assert config.provider_code == "custom"
        assert storage_key == "remote/workspace/asset.bin"

    monkeypatch.setattr(media_remote_storage_service, "_perform_custom_upload", fake_perform_upload)
    monkeypatch.setattr(media_remote_storage_service, "_perform_custom_download", fake_perform_download)
    monkeypatch.setattr(media_remote_storage_service, "_perform_custom_delete", fake_perform_delete)

    with session_local() as db:
        upload_result = asyncio.run(
            media_remote_storage_service.upload_media_via_provider(
                db,
                workspace_id=workspace_id,
                record_id="record-1",
                filename="asset.bin",
                mime_type="application/octet-stream",
                content=b"payload",
            )
        )
        assert upload_result is not None
        assert upload_result.storage_key == "remote/workspace/asset.bin"

        media = MediaAsset(
            workspace_id=workspace_id,
            record_id="record-1",
            uploaded_by=db.query(User).first().id,
            media_type="file",
            storage_provider="custom",
            storage_key="remote/workspace/asset.bin",
            original_filename="asset.bin",
            mime_type="application/octet-stream",
            size_bytes=7,
            metadata_json={},
            processing_status="deferred",
        )
        content_result = media_remote_storage_service.download_remote_media_via_provider(db, media)
        assert content_result.content == b"fetched"
        media_remote_storage_service.delete_remote_media_via_provider(db, media)


def test_custom_remote_storage_upload_enforces_webhook_contract(monkeypatch) -> None:
    config = build_custom_media_storage_config()
    monkeypatch.setenv("REMOTE_MEDIA_STORAGE_KEY", "secret-value")

    class FakeResponse:
        status_code = 200
        headers = {"content-type": "application/json", "x-request-id": "req-123"}

        @staticmethod
        def json():
            return {
                "storage_key": "remote/workspace/voice-note.m4a",
                "size_bytes": "11",
                "provider_asset_id": "asset-123",
                "metadata_json": {
                    "bucket": "primary",
                    "flags": ["warm", {"tier": "archive"}],
                },
            }

    class FakeAsyncClient:
        def __init__(self, *args, **kwargs):
            pass

        async def __aenter__(self):
            return self

        async def __aexit__(self, exc_type, exc, tb):
            return False

        async def post(self, url, *, headers, data, files):
            assert url == "https://storage.example.test/api/media/upload"
            assert headers["X-SelfControl-Media-Storage-Contract"] == media_remote_storage_service.WEBHOOK_CONTRACT_VERSION
            assert headers["X-SelfControl-Media-Storage-Operation"] == "upload"
            assert data["contract_version"] == media_remote_storage_service.WEBHOOK_CONTRACT_VERSION
            assert data["workspace_id"] == "workspace-1"
            assert data["record_id"] == "record-1"
            assert files["file"][0] == "voice-note.m4a"
            return FakeResponse()

    monkeypatch.setattr(media_remote_storage_service.httpx, "AsyncClient", FakeAsyncClient)

    result = asyncio.run(
        media_remote_storage_service._perform_custom_upload(
            config,
            workspace_id="workspace-1",
            record_id="record-1",
            filename="voice-note.m4a",
            mime_type="audio/mp4",
            content=b"remote-audio",
        )
    )

    assert result.storage_key == "remote/workspace/voice-note.m4a"
    assert result.size_bytes == 11
    assert result.metadata_json["remote_storage_mode"] == "custom_webhook"
    assert result.metadata_json["remote_contract_version"] == media_remote_storage_service.WEBHOOK_CONTRACT_VERSION
    assert result.metadata_json["provider_asset_id"] == "asset-123"
    assert result.metadata_json["webhook_request_id"] == "req-123"
    assert result.metadata_json["bucket"] == "primary"
    assert result.metadata_json["flags"][1]["tier"] == "archive"


def test_custom_remote_storage_upload_rejects_invalid_storage_key(monkeypatch) -> None:
    config = build_custom_media_storage_config()
    monkeypatch.setenv("REMOTE_MEDIA_STORAGE_KEY", "secret-value")

    class FakeResponse:
        status_code = 200
        headers = {"content-type": "application/json"}

        @staticmethod
        def json():
            return {"storage_key": "remote/workspace/\nvoice-note.m4a"}

    class FakeAsyncClient:
        def __init__(self, *args, **kwargs):
            pass

        async def __aenter__(self):
            return self

        async def __aexit__(self, exc_type, exc, tb):
            return False

        async def post(self, *args, **kwargs):
            return FakeResponse()

    monkeypatch.setattr(media_remote_storage_service.httpx, "AsyncClient", FakeAsyncClient)

    with pytest.raises(RuntimeError, match="storage_key contains control characters"):
        asyncio.run(
            media_remote_storage_service._perform_custom_upload(
                config,
                workspace_id="workspace-1",
                record_id="record-1",
                filename="voice-note.m4a",
                mime_type="audio/mp4",
                content=b"remote-audio",
            )
        )


def test_custom_remote_storage_download_surfaces_timeout(monkeypatch) -> None:
    config = build_custom_media_storage_config()
    monkeypatch.setenv("REMOTE_MEDIA_STORAGE_KEY", "secret-value")

    class FakeClient:
        def __init__(self, *args, **kwargs):
            pass

        def __enter__(self):
            return self

        def __exit__(self, exc_type, exc, tb):
            return False

        def get(self, url, *, headers, params):
            assert url == "https://storage.example.test/api/media/content"
            assert headers["X-SelfControl-Media-Storage-Operation"] == "download"
            assert params["contract_version"] == media_remote_storage_service.WEBHOOK_CONTRACT_VERSION
            raise httpx.ReadTimeout("timed out")

    monkeypatch.setattr(media_remote_storage_service.httpx, "Client", FakeClient)

    with pytest.raises(RuntimeError, match="Remote media download timed out"):
        media_remote_storage_service._perform_custom_download(
            config,
            storage_key="remote/workspace/voice-note.m4a",
        )


def test_remote_media_processing_schedules_background_retry_for_transient_remote_errors(tmp_path, monkeypatch) -> None:
    _client, workspace_id, record_id, session_local = build_media_client(tmp_path, monkeypatch)
    monkeypatch.setattr("app.services.media_processing.settings.media_processing_mode", "async")
    monkeypatch.setattr("app.services.background_tasks.settings.media_processing_mode", "async")
    monkeypatch.setattr("app.services.media_processing.settings.remote_media_retry_max_attempts", 2)
    monkeypatch.setattr("app.services.background_tasks.settings.remote_media_retry_max_attempts", 2)
    monkeypatch.setattr("app.services.media_processing.settings.remote_media_retry_backoff_seconds", [45, 180])
    monkeypatch.setattr("app.services.background_tasks.settings.remote_media_retry_backoff_seconds", [45, 180])

    with session_local() as db:
        remote_media = MediaAsset(
            workspace_id=workspace_id,
            record_id=record_id,
            uploaded_by=db.query(User).first().id,
            media_type="audio",
            storage_provider="custom",
            storage_key=f"remote/{workspace_id}/voice-note.m4a",
            original_filename="voice-note.m4a",
            mime_type="audio/mp4",
            size_bytes=256,
            metadata_json={"remote_storage_mode": "custom_webhook"},
            processing_status="pending",
        )
        db.add(remote_media)
        db.commit()
        remote_media_id = remote_media.id

    temp_remote_file = tmp_path / "tmp" / "voice-note.m4a"
    temp_remote_file.parent.mkdir(parents=True, exist_ok=True)
    temp_remote_file.write_bytes(b"audio bytes")

    monkeypatch.setattr(
        "app.services.media_processing.download_remote_media_to_temp_file",
        lambda db, media: temp_remote_file,
    )
    monkeypatch.setattr(
        "app.services.media_processing.extract_text_via_provider",
        lambda db, media, file_path: (_ for _ in ()).throw(DeferredMediaProcessingError("provider processing is not ready")),
    )

    with session_local() as db:
        media = background_tasks_service.process_media_asset(db, remote_media_id)
        metadata = media.metadata_json
        assert media.processing_status == "deferred"
        assert metadata["processing_retry_state"] == "scheduled"
        assert metadata["processing_retry_count"] == 1
        assert metadata["processing_retry_max_attempts"] == 2
        assert metadata["processing_retry_delay_seconds"] == 45
        assert metadata["processing_retry_next_attempt_at"]

    queued_calls: list[dict] = []

    def fake_apply_async(*, args, kwargs, countdown):
        queued_calls.append({"args": args, "kwargs": kwargs, "countdown": countdown})

    monkeypatch.setattr("app.worker.process_media_asset_task.apply_async", fake_apply_async)

    with session_local() as db:
        media = db.get(MediaAsset, remote_media_id)
        result = background_tasks_service.queue_media_retry_if_needed(media)

    assert result == "async_retry_scheduled"
    assert queued_calls == [
        {
            "args": [remote_media_id],
            "kwargs": {"trigger": "auto_retry"},
            "countdown": 45,
        }
    ]


def test_remote_media_processing_uses_workspace_retry_policy_override(tmp_path, monkeypatch) -> None:
    _client, workspace_id, record_id, session_local = build_media_client(tmp_path, monkeypatch)
    monkeypatch.setattr("app.services.media_processing.settings.media_processing_mode", "async")

    with session_local() as db:
        user_id = db.query(User).first().id
        db.add(
            ProviderConfig(
                workspace_id=workspace_id,
                feature_code="media_storage",
                provider_code="custom",
                is_enabled=True,
                api_base_url="https://storage.example.test/api",
                api_key_env_name="REMOTE_MEDIA_STORAGE_KEY",
                options_json={
                    "auto_retry_enabled": True,
                    "remote_retry_max_attempts": 5,
                    "remote_retry_backoff_seconds": [12, 34, 56],
                },
            )
        )
        remote_media = MediaAsset(
            workspace_id=workspace_id,
            record_id=record_id,
            uploaded_by=user_id,
            media_type="audio",
            storage_provider="custom",
            storage_key=f"remote/{workspace_id}/voice-policy.m4a",
            original_filename="voice-policy.m4a",
            mime_type="audio/mp4",
            size_bytes=256,
            metadata_json={"remote_storage_mode": "custom_webhook"},
            processing_status="pending",
        )
        db.add(remote_media)
        db.commit()
        remote_media_id = remote_media.id

    temp_remote_file = tmp_path / "tmp" / "voice-policy.m4a"
    temp_remote_file.parent.mkdir(parents=True, exist_ok=True)
    temp_remote_file.write_bytes(b"audio bytes")

    monkeypatch.setattr(
        "app.services.media_processing.download_remote_media_to_temp_file",
        lambda db, media: temp_remote_file,
    )
    monkeypatch.setattr(
        "app.services.media_processing.extract_text_via_provider",
        lambda db, media, file_path: (_ for _ in ()).throw(DeferredMediaProcessingError("provider processing is not ready")),
    )

    with session_local() as db:
        media = background_tasks_service.process_media_asset(db, remote_media_id)
        metadata = media.metadata_json
        assert media.processing_status == "deferred"
        assert metadata["processing_retry_state"] == "scheduled"
        assert metadata["processing_retry_count"] == 1
        assert metadata["processing_retry_max_attempts"] == 5
        assert metadata["processing_retry_delay_seconds"] == 12


def test_remote_media_processing_workspace_policy_can_disable_auto_retry(tmp_path, monkeypatch) -> None:
    _client, workspace_id, record_id, session_local = build_media_client(tmp_path, monkeypatch)

    with session_local() as db:
        user_id = db.query(User).first().id
        db.add(
            ProviderConfig(
                workspace_id=workspace_id,
                feature_code="media_storage",
                provider_code="custom",
                is_enabled=True,
                api_base_url="https://storage.example.test/api",
                api_key_env_name="REMOTE_MEDIA_STORAGE_KEY",
                options_json={
                    "auto_retry_enabled": False,
                    "remote_retry_max_attempts": 5,
                    "remote_retry_backoff_seconds": [12, 34, 56],
                },
            )
        )
        remote_media = MediaAsset(
            workspace_id=workspace_id,
            record_id=record_id,
            uploaded_by=user_id,
            media_type="audio",
            storage_provider="custom",
            storage_key=f"remote/{workspace_id}/voice-disabled.m4a",
            original_filename="voice-disabled.m4a",
            mime_type="audio/mp4",
            size_bytes=256,
            metadata_json={"remote_storage_mode": "custom_webhook"},
            processing_status="pending",
        )
        db.add(remote_media)
        db.commit()
        remote_media_id = remote_media.id

    temp_remote_file = tmp_path / "tmp" / "voice-disabled.m4a"
    temp_remote_file.parent.mkdir(parents=True, exist_ok=True)
    temp_remote_file.write_bytes(b"audio bytes")

    monkeypatch.setattr(
        "app.services.media_processing.download_remote_media_to_temp_file",
        lambda db, media: temp_remote_file,
    )
    monkeypatch.setattr(
        "app.services.media_processing.extract_text_via_provider",
        lambda db, media, file_path: (_ for _ in ()).throw(DeferredMediaProcessingError("provider processing is not ready")),
    )

    with session_local() as db:
        media = background_tasks_service.process_media_asset(db, remote_media_id)
        metadata = media.metadata_json
        assert media.processing_status == "deferred"
        assert metadata["processing_retry_state"] == "disabled"
        assert metadata["processing_retry_count"] == 0
        assert metadata["processing_retry_max_attempts"] == 0
        assert metadata["processing_retry_next_attempt_at"] is None


def test_remote_media_processing_uses_manual_recovery_for_non_retriable_errors(tmp_path, monkeypatch) -> None:
    _client, workspace_id, record_id, session_local = build_media_client(tmp_path, monkeypatch)
    monkeypatch.setattr("app.services.media_processing.settings.media_processing_mode", "async")
    monkeypatch.setattr("app.services.background_tasks.settings.media_processing_mode", "async")
    monkeypatch.setattr("app.services.media_processing.settings.remote_media_retry_max_attempts", 3)
    monkeypatch.setattr("app.services.background_tasks.settings.remote_media_retry_max_attempts", 3)

    with session_local() as db:
        remote_media = MediaAsset(
            workspace_id=workspace_id,
            record_id=record_id,
            uploaded_by=db.query(User).first().id,
            media_type="audio",
            storage_provider="custom",
            storage_key=f"remote/{workspace_id}/voice-note.m4a",
            original_filename="voice-note.m4a",
            mime_type="audio/mp4",
            size_bytes=256,
            metadata_json={"remote_storage_mode": "custom_webhook"},
            processing_status="pending",
        )
        db.add(remote_media)
        db.commit()
        remote_media_id = remote_media.id

    temp_remote_file = tmp_path / "tmp" / "voice-note-non-retriable.m4a"
    temp_remote_file.parent.mkdir(parents=True, exist_ok=True)
    temp_remote_file.write_bytes(b"audio bytes")

    monkeypatch.setattr(
        "app.services.media_processing.download_remote_media_to_temp_file",
        lambda db, media: temp_remote_file,
    )
    monkeypatch.setattr(
        "app.services.media_processing.extract_text_via_provider",
        lambda db, media, file_path: (_ for _ in ()).throw(DeferredMediaProcessingError("audio_asr provider is not enabled")),
    )

    with session_local() as db:
        media = background_tasks_service.process_media_asset(db, remote_media_id)
        metadata = media.metadata_json
        assert media.processing_status == "deferred"
        assert metadata["processing_retry_state"] == "manual_only"
        assert metadata["processing_retry_count"] == 0
        assert metadata["processing_retry_next_attempt_at"] is None
        assert background_tasks_service.queue_media_retry_if_needed(media) is None


def test_remote_media_processing_marks_retry_budget_exhausted(tmp_path, monkeypatch) -> None:
    _client, workspace_id, record_id, session_local = build_media_client(tmp_path, monkeypatch)
    monkeypatch.setattr("app.services.media_processing.settings.media_processing_mode", "async")
    monkeypatch.setattr("app.services.background_tasks.settings.media_processing_mode", "async")
    monkeypatch.setattr("app.services.media_processing.settings.remote_media_retry_max_attempts", 2)
    monkeypatch.setattr("app.services.background_tasks.settings.remote_media_retry_max_attempts", 2)

    with session_local() as db:
        remote_media = MediaAsset(
            workspace_id=workspace_id,
            record_id=record_id,
            uploaded_by=db.query(User).first().id,
            media_type="audio",
            storage_provider="custom",
            storage_key=f"remote/{workspace_id}/voice-note-exhausted.m4a",
            original_filename="voice-note-exhausted.m4a",
            mime_type="audio/mp4",
            size_bytes=256,
            metadata_json={
                "remote_storage_mode": "custom_webhook",
                "processing_retry_count": 2,
            },
            processing_status="pending",
        )
        db.add(remote_media)
        db.commit()
        remote_media_id = remote_media.id

    monkeypatch.setattr(
        "app.services.media_processing.download_remote_media_to_temp_file",
        lambda db, media: (_ for _ in ()).throw(RuntimeError("Remote media download timed out")),
    )

    with session_local() as db:
        media = background_tasks_service.process_media_asset(db, remote_media_id)
        metadata = media.metadata_json
        assert media.processing_status == "failed"
        assert metadata["processing_retry_state"] == "exhausted"
        assert metadata["processing_retry_count"] == 2
        assert metadata["processing_retry_next_attempt_at"] is None
        assert background_tasks_service.queue_media_retry_if_needed(media) is None


def test_media_dead_letter_bulk_retry_requeues_selected_items(tmp_path, monkeypatch) -> None:
    client, workspace_id, record_id, session_local = build_media_client(tmp_path, monkeypatch)
    monkeypatch.setattr("app.services.background_tasks.settings.media_processing_mode", "async")

    queued_media_ids: list[str] = []

    class FakeTask:
        @staticmethod
        def delay(media_id: str) -> None:
            queued_media_ids.append(media_id)

    monkeypatch.setattr("app.worker.process_media_asset_task", FakeTask())

    with session_local() as db:
        user_id = db.query(User).first().id
        manual_media = MediaAsset(
            workspace_id=workspace_id,
            record_id=record_id,
            uploaded_by=user_id,
            media_type="audio",
            storage_provider="custom",
            storage_key=f"remote/{workspace_id}/voice-manual.m4a",
            original_filename="voice-manual.m4a",
            mime_type="audio/mp4",
            size_bytes=256,
            metadata_json={
                "processing_retry_state": "manual_only",
                "processing_retry_count": 1,
                "processing_retry_next_attempt_at": "2026-03-21T10:00:00+00:00",
            },
            processing_status="failed",
            processing_error="audio_asr provider is not enabled",
        )
        exhausted_media = MediaAsset(
            workspace_id=workspace_id,
            record_id=record_id,
            uploaded_by=user_id,
            media_type="video",
            storage_provider="custom",
            storage_key=f"remote/{workspace_id}/clip-exhausted.mp4",
            original_filename="clip-exhausted.mp4",
            mime_type="video/mp4",
            size_bytes=1024,
            metadata_json={
                "processing_retry_state": "exhausted",
                "processing_retry_count": 3,
            },
            processing_status="deferred",
            processing_error="remote fetch timed out",
        )
        scheduled_media = MediaAsset(
            workspace_id=workspace_id,
            record_id=record_id,
            uploaded_by=user_id,
            media_type="image",
            storage_provider="custom",
            storage_key=f"remote/{workspace_id}/queued.png",
            original_filename="queued.png",
            mime_type="image/png",
            size_bytes=128,
            metadata_json={"processing_retry_state": "scheduled"},
            processing_status="deferred",
            processing_error="provider processing is not ready",
        )
        db.add_all([manual_media, exhausted_media, scheduled_media])
        db.commit()
        manual_media_id = manual_media.id
        exhausted_media_id = exhausted_media.id
        scheduled_media_id = scheduled_media.id

    response = client.post(
        f"/api/v1/workspaces/{workspace_id}/media/dead-letter/retry",
        json={
            "media_ids": [manual_media_id, exhausted_media_id, scheduled_media_id],
            "retry_states": ["manual_only", "exhausted"],
            "limit": 10,
        },
    )

    assert response.status_code == 200
    result = response.json()["data"]["result"]
    assert result["target_count"] == 3
    assert result["retried_count"] == 1
    assert result["queued_count"] == 1
    assert result["processing_count"] == 0
    assert result["retried_media_ids"] == [exhausted_media_id]
    assert result["skipped_reason_by_media_id"][manual_media_id] == "bulk_retry_not_recommended"
    assert result["skipped_reason_by_media_id"][scheduled_media_id] == "retry_state_not_selected"
    assert queued_media_ids == [exhausted_media_id]

    with session_local() as db:
        manual_media = db.get(MediaAsset, manual_media_id)
        exhausted_media = db.get(MediaAsset, exhausted_media_id)
        scheduled_media = db.get(MediaAsset, scheduled_media_id)

        assert manual_media is not None
        assert exhausted_media is not None
        assert scheduled_media is not None

        assert manual_media.processing_status == "failed"
        assert exhausted_media.processing_status == "pending"
        assert manual_media.processing_error == "audio_asr provider is not enabled"
        assert exhausted_media.processing_error is None
        assert manual_media.metadata_json["processing_retry_state"] == "manual_only"
        assert exhausted_media.metadata_json["processing_retry_state"] == "idle"
        assert manual_media.metadata_json["processing_retry_count"] == 1
        assert exhausted_media.metadata_json["processing_retry_count"] == 0
        assert scheduled_media.processing_status == "deferred"
