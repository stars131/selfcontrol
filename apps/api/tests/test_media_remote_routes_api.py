from __future__ import annotations

from datetime import datetime, timedelta, timezone

from app.api.routes import media as media_route
from app.api.routes import records as records_route
from app.models.media import MediaAsset
from app.models.provider_config import ProviderConfig
from app.models.record import Record
from app.models.user import User
from app.services import media_remote_storage as media_remote_storage_service
from app.services.media_remote_storage import (
    RemoteMediaContentResult,
    RemoteMediaUploadAttemptResult,
    RemoteMediaUploadResult,
)

from .test_media_preview_api import build_media_client


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

    def fake_processing_download(db, media):
        temp_remote_file = tmp_path / "tmp" / f"{media.id}.m4a"
        temp_remote_file.parent.mkdir(parents=True, exist_ok=True)
        temp_remote_file.write_bytes(b"remote-audio")
        return temp_remote_file

    monkeypatch.setattr(media_route, "attempt_media_upload_via_provider", fake_remote_upload_attempt)
    monkeypatch.setattr(media_route, "download_remote_media_via_provider", fake_remote_download)
    monkeypatch.setattr(media_route, "delete_remote_media_via_provider", fake_remote_delete)
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


def test_record_delete_surfaces_remote_media_delete_failure(tmp_path, monkeypatch) -> None:
    client, workspace_id, record_id, session_local = build_media_client(tmp_path, monkeypatch)

    with session_local() as db:
        remote_media = MediaAsset(
            workspace_id=workspace_id,
            record_id=record_id,
            uploaded_by=db.query(User).first().id,
            media_type="audio",
            storage_provider="custom",
            storage_key=f"remote/{workspace_id}/broken-voice-note.m4a",
            original_filename="broken-voice-note.m4a",
            mime_type="audio/mp4",
            size_bytes=256,
            metadata_json={"remote_storage_mode": "custom_webhook"},
            processing_status="deferred",
        )
        db.add(remote_media)
        db.commit()
        remote_media_id = remote_media.id

    monkeypatch.setattr(
        records_route,
        "delete_remote_media_via_provider",
        lambda db, media: (_ for _ in ()).throw(RuntimeError("remote delete failed")),
    )

    response = client.delete(f"/api/v1/workspaces/{workspace_id}/records/{record_id}")

    assert response.status_code == 502
    assert response.json()["detail"] == "remote delete failed"

    with session_local() as db:
        assert db.get(Record, record_id) is not None
        assert db.get(MediaAsset, remote_media_id) is not None


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
            metadata_json={
                "remote_storage_mode": "custom_webhook",
                "processing_retry_count": 2,
                "processing_retry_state": "scheduled",
                "processing_retry_next_attempt_at": "2026-03-21T10:00:00+00:00",
            },
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
    assert media_payload["metadata_json"]["processing_retry_state"] == "idle"
    assert media_payload["metadata_json"]["processing_retry_count"] == 0
    assert media_payload["metadata_json"]["processing_retry_next_attempt_at"] is None
