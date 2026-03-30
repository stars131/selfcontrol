from __future__ import annotations

from app.models.media import MediaAsset
from app.models.provider_config import ProviderConfig
from app.models.user import User
from app.services import background_tasks as background_tasks_service
from app.services.media_provider import DeferredMediaProcessingError

from .test_media_preview_api import build_media_client


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
