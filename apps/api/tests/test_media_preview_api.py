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
from app.services import media_remote_storage as media_remote_storage_service
from app.services.media_remote_storage import (
    RemoteMediaContentResult,
    RemoteMediaUploadAttemptResult,
    RemoteMediaUploadResult,
)
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

    recent_issues = overview["recent_issues"]
    assert [item["original_filename"] for item in recent_issues] == ["clip.mp4", "voice.m4a"]
    assert recent_issues[0]["processing_status"] == "failed"
    assert recent_issues[0]["processing_source"] == "remote_fetch"
    assert recent_issues[0]["remote_fetch_status"] == "failed"
    assert recent_issues[0]["extraction_mode"] == "provider_remote"
    assert recent_issues[1]["processing_status"] == "deferred"
    assert recent_issues[1]["remote_fetch_status"] == "downloaded"


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


def test_remote_media_content_and_retention_actions_are_provider_aware(tmp_path, monkeypatch) -> None:
    client, workspace_id, record_id, session_local = build_media_client(tmp_path, monkeypatch)

    with session_local() as db:
        remote_media = MediaAsset(
            workspace_id=workspace_id,
            record_id=record_id,
            uploaded_by=db.query(User).first().id,
            media_type="video",
            storage_provider="s3",
            storage_key=f"remote/{workspace_id}/clip.mp4",
            original_filename="clip.mp4",
            mime_type="video/mp4",
            size_bytes=1024,
            metadata_json={"remote_reference": {"bucket": "archive-bucket", "object_key": "clip.mp4"}},
            processing_status="completed",
            extracted_text="remote video transcript",
            created_at=datetime.now(timezone.utc) - timedelta(days=180),
        )
        db.add(remote_media)
        db.commit()
        remote_media_id = remote_media.id

    content_response = client.get(f"/api/v1/workspaces/{workspace_id}/media/{remote_media_id}/content")
    assert content_response.status_code == 409

    report_response = client.get(f"/api/v1/workspaces/{workspace_id}/media/retention-report?older_than_days=90&limit=5")
    assert report_response.status_code == 200
    report = report_response.json()["data"]["report"]
    assert report["remote_item_count"] == 1
    assert report["remote_item_size_bytes"] == 1024
    assert report["retention_candidates"] == []
    assert report["largest_items"][0]["storage_provider"] == "s3"

    archive_response = client.post(
        f"/api/v1/workspaces/{workspace_id}/media/retention-archive",
        json={"media_ids": [remote_media_id], "older_than_days": 90, "dry_run": False},
    )
    assert archive_response.status_code == 200
    archive_result = archive_response.json()["data"]["result"]
    assert archive_result["candidate_media_count"] == 0
    assert archive_result["skipped_reason_by_media_id"][remote_media_id] == "storage_provider_archive_not_supported"

    cleanup_response = client.post(
        f"/api/v1/workspaces/{workspace_id}/media/retention-cleanup",
        json={
            "media_ids": [remote_media_id],
            "older_than_days": 90,
            "purge_orphan_files": False,
            "dry_run": False,
        },
    )
    assert cleanup_response.status_code == 200
    cleanup_result = cleanup_response.json()["data"]["result"]
    assert cleanup_result["candidate_media_count"] == 0
    assert cleanup_result["skipped_reason_by_media_id"][remote_media_id] == "storage_provider_cleanup_not_supported"

    status_response = client.get(f"/api/v1/workspaces/{workspace_id}/media/{remote_media_id}/status")
    assert status_response.status_code == 200
    assert status_response.json()["data"]["media"]["storage_provider"] == "s3"


def test_custom_remote_storage_upload_fetch_and_delete_flow(tmp_path, monkeypatch) -> None:
    client, workspace_id, record_id, session_local = build_media_client(tmp_path, monkeypatch)
    upload_calls: list[tuple[str, str, str]] = []
    delete_calls: list[str] = []

    async def fake_remote_upload_attempt(db, *, workspace_id: str, record_id: str, filename: str, mime_type: str, content: bytes):
        upload_calls.append((workspace_id, record_id, filename))
        return RemoteMediaUploadAttemptResult(
            remote_upload=RemoteMediaUploadResult(
                storage_provider="custom",
                storage_key=f"remote/{workspace_id}/{filename}",
                size_bytes=len(content),
                metadata_json={"remote_storage_mode": "custom_webhook"},
            ),
            fallback_used=False,
        )

    def fake_remote_download(db, media: MediaAsset) -> RemoteMediaContentResult:
        return RemoteMediaContentResult(content=b"remote-audio", media_type=media.mime_type)

    def fake_remote_delete(db, media: MediaAsset) -> None:
        delete_calls.append(media.storage_key)

    monkeypatch.setattr(media_route, "attempt_media_upload_via_provider", fake_remote_upload_attempt)
    monkeypatch.setattr(media_route, "download_remote_media_via_provider", fake_remote_download)
    monkeypatch.setattr(media_route, "delete_remote_media_via_provider", fake_remote_delete)
    def fake_processing_download(db, media):
        temp_remote_file = tmp_path / "tmp" / f"{media.id}.m4a"
        temp_remote_file.parent.mkdir(parents=True, exist_ok=True)
        temp_remote_file.write_bytes(b"remote-audio")
        return temp_remote_file

    monkeypatch.setattr("app.services.media_processing.download_remote_media_to_temp_file", fake_processing_download)

    upload_response = client.post(
        f"/api/v1/workspaces/{workspace_id}/records/{record_id}/media",
        files={"file": ("voice-note.m4a", b"remote-audio", "audio/mp4")},
    )

    assert upload_response.status_code == 200
    media_payload = upload_response.json()["data"]["media"]
    assert media_payload["storage_provider"] == "custom"
    assert media_payload["processing_status"] == "deferred"
    assert media_payload["processing_error"] == "audio_asr provider is not enabled"
    assert upload_calls == [(workspace_id, record_id, "voice-note.m4a")]

    content_response = client.get(f"/api/v1/workspaces/{workspace_id}/media/{media_payload['id']}/content")
    assert content_response.status_code == 200
    assert content_response.content == b"remote-audio"
    assert content_response.headers["content-type"] == "audio/mp4"

    retry_response = client.post(f"/api/v1/workspaces/{workspace_id}/media/{media_payload['id']}/retry")
    assert retry_response.status_code == 200
    assert retry_response.json()["data"]["media"]["processing_status"] == "deferred"

    delete_response = client.delete(f"/api/v1/workspaces/{workspace_id}/media/{media_payload['id']}")
    assert delete_response.status_code == 200
    assert delete_calls == [f"remote/{workspace_id}/voice-note.m4a"]

    with session_local() as db:
        assert db.get(MediaAsset, media_payload["id"]) is None


def test_custom_remote_text_upload_is_processed_and_searchable(tmp_path, monkeypatch) -> None:
    client, workspace_id, record_id, _session_local = build_media_client(tmp_path, monkeypatch)

    async def fake_remote_upload_attempt(db, *, workspace_id: str, record_id: str, filename: str, mime_type: str, content: bytes):
        return RemoteMediaUploadAttemptResult(
            remote_upload=RemoteMediaUploadResult(
                storage_provider="custom",
                storage_key=f"remote/{workspace_id}/{filename}",
                size_bytes=len(content),
                metadata_json={"remote_storage_mode": "custom_webhook"},
            ),
            fallback_used=False,
        )

    def fake_remote_download(db, media: MediaAsset) -> RemoteMediaContentResult:
        return RemoteMediaContentResult(content=b"best noodle note", media_type="text/plain")

    monkeypatch.setattr(media_route, "attempt_media_upload_via_provider", fake_remote_upload_attempt)
    monkeypatch.setattr("app.services.media_processing.download_remote_media_to_temp_file", lambda db, media: (tmp_path / "tmp" / "remote.txt"))

    temp_remote_file = tmp_path / "tmp" / "remote.txt"
    temp_remote_file.parent.mkdir(parents=True, exist_ok=True)
    temp_remote_file.write_bytes(b"best noodle note")

    upload_response = client.post(
        f"/api/v1/workspaces/{workspace_id}/records/{record_id}/media",
        files={"file": ("note.txt", b"best noodle note", "text/plain")},
    )

    assert upload_response.status_code == 200
    media_payload = upload_response.json()["data"]["media"]
    assert media_payload["storage_provider"] == "custom"
    assert media_payload["processing_status"] == "completed"
    assert media_payload["extracted_text"] == "best noodle note"
    assert media_payload["metadata_json"]["extraction_mode"] == "text_direct"
    assert media_payload["metadata_json"]["file_extension"] == ".txt"

    monkeypatch.setattr(media_route, "download_remote_media_via_provider", fake_remote_download)
    content_response = client.get(f"/api/v1/workspaces/{workspace_id}/media/{media_payload['id']}/content")
    assert content_response.status_code == 200
    assert content_response.content == b"best noodle note"


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


def test_custom_remote_storage_upload_falls_back_to_local_when_enabled(tmp_path, monkeypatch) -> None:
    client, workspace_id, record_id, session_local = build_media_client(tmp_path, monkeypatch)

    with session_local() as db:
        db.add(
            ProviderConfig(
                workspace_id=workspace_id,
                feature_code="media_storage",
                provider_code="custom",
                is_enabled=True,
                api_base_url="https://storage.example.test/api",
                api_key_env_name="REMOTE_MEDIA_STORAGE_KEY",
                options_json={"fallback_to_local_on_upload_failure": True},
            )
        )
        db.commit()

    monkeypatch.setenv("REMOTE_MEDIA_STORAGE_KEY", "secret-value")

    async def fake_perform_upload(config, **kwargs):
        raise RuntimeError("Remote media upload failed with status 503")

    monkeypatch.setattr(media_remote_storage_service, "_perform_custom_upload", fake_perform_upload)

    upload_response = client.post(
        f"/api/v1/workspaces/{workspace_id}/records/{record_id}/media",
        files={"file": ("fallback-note.txt", b"fallback note", "text/plain")},
    )

    assert upload_response.status_code == 200
    media_payload = upload_response.json()["data"]["media"]
    assert media_payload["storage_provider"] == "local"
    assert media_payload["metadata_json"]["storage_fallback_mode"] == "remote_to_local"
    assert media_payload["metadata_json"]["storage_fallback_provider"] == "custom"
    assert media_payload["metadata_json"]["storage_fallback_reason"] == "Remote media upload failed with status 503"
    assert media_payload["metadata_json"]["storage_fallback_at"]

    stored_path = tmp_path / media_payload["storage_key"]
    assert stored_path.exists()
    assert stored_path.read_bytes() == b"fallback note"


def test_custom_remote_storage_upload_returns_502_when_fallback_disabled(tmp_path, monkeypatch) -> None:
    client, workspace_id, record_id, session_local = build_media_client(tmp_path, monkeypatch)

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
        raise RuntimeError("Remote media upload failed with status 503")

    monkeypatch.setattr(media_remote_storage_service, "_perform_custom_upload", fake_perform_upload)

    upload_response = client.post(
        f"/api/v1/workspaces/{workspace_id}/records/{record_id}/media",
        files={"file": ("no-fallback.txt", b"still remote", "text/plain")},
    )

    assert upload_response.status_code == 502
    assert upload_response.json()["detail"] == "Remote media upload failed with status 503"


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


def test_record_delete_triggers_remote_media_delete(tmp_path, monkeypatch) -> None:
    client, workspace_id, record_id, session_local = build_media_client(tmp_path, monkeypatch)
    deleted_keys: list[str] = []

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
            processing_status="deferred",
        )
        db.add(remote_media)
        db.commit()

    monkeypatch.setattr(records_route, "delete_remote_media_via_provider", lambda db, media: deleted_keys.append(media.storage_key))

    response = client.delete(f"/api/v1/workspaces/{workspace_id}/records/{record_id}")

    assert response.status_code == 200
    assert deleted_keys == [f"remote/{workspace_id}/voice-note.m4a"]


def test_remote_media_retry_can_complete_processing(tmp_path, monkeypatch) -> None:
    client, workspace_id, record_id, session_local = build_media_client(tmp_path, monkeypatch)

    with session_local() as db:
        remote_media = MediaAsset(
            workspace_id=workspace_id,
            record_id=record_id,
            uploaded_by=db.query(User).first().id,
            media_type="text",
            storage_provider="custom",
            storage_key=f"remote/{workspace_id}/retry-note.txt",
            original_filename="retry-note.txt",
            mime_type="text/plain",
            size_bytes=20,
            metadata_json={"remote_storage_mode": "custom_webhook"},
            processing_status="failed",
            processing_error="previous failure",
        )
        db.add(remote_media)
        db.commit()
        remote_media_id = remote_media.id

    monkeypatch.setattr(
        "app.services.media_processing.download_remote_media_to_temp_file",
        lambda db, media: (tmp_path / "tmp" / "retry-note.txt"),
    )

    temp_remote_file = tmp_path / "tmp" / "retry-note.txt"
    temp_remote_file.parent.mkdir(parents=True, exist_ok=True)
    temp_remote_file.write_bytes(b"retry remote text")

    retry_response = client.post(f"/api/v1/workspaces/{workspace_id}/media/{remote_media_id}/retry")

    assert retry_response.status_code == 200
    media_payload = retry_response.json()["data"]["media"]
    assert media_payload["processing_status"] == "completed"
    assert media_payload["extracted_text"] == "retry remote text"
