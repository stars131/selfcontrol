from __future__ import annotations

import app.models.audit_log  # noqa: F401
import app.models.conversation  # noqa: F401
import app.models.knowledge  # noqa: F401
import app.models.media  # noqa: F401
import app.models.notification  # noqa: F401
import app.models.provider_config  # noqa: F401
import app.models.record  # noqa: F401
import app.models.reminder  # noqa: F401
import app.models.search_preset  # noqa: F401
import app.models.share_link  # noqa: F401
import app.models.user  # noqa: F401
import app.models.workspace  # noqa: F401
import app.models.workspace_transfer_job  # noqa: F401

from app.models.media import MediaAsset
from app.services.media_retry_policy import (
    RemoteMediaRetryPolicy,
    build_remote_retry_metadata,
    get_remote_media_retry_policy,
    mark_media_retry_recovered,
    reset_media_retry_tracking,
)


def build_media_asset(**overrides) -> MediaAsset:
    payload = {
        "workspace_id": "workspace-1",
        "record_id": "record-1",
        "uploaded_by": "user-1",
        "media_type": "audio",
        "storage_provider": "custom",
        "storage_key": "remote/workspace-1/voice.m4a",
        "original_filename": "voice.m4a",
        "mime_type": "audio/mp4",
        "size_bytes": 128,
        "metadata_json": {},
        "processing_status": "pending",
    }
    payload.update(overrides)
    return MediaAsset(**payload)


def test_build_remote_retry_metadata_schedules_transient_errors() -> None:
    media = build_media_asset(metadata_json={"processing_retry_count": 1})

    metadata = build_remote_retry_metadata(
        media,
        "Remote media download timed out",
        retry_policy=RemoteMediaRetryPolicy(
            auto_retry_enabled=True,
            max_attempts=3,
            backoff_seconds=[15, 60, 300],
        ),
    )

    assert metadata["processing_retry_state"] == "scheduled"
    assert metadata["processing_retry_count"] == 2
    assert metadata["processing_retry_delay_seconds"] == 60
    assert metadata["processing_retry_next_attempt_at"] is not None


def test_build_remote_retry_metadata_marks_manual_only_for_non_retriable_errors() -> None:
    media = build_media_asset()

    metadata = build_remote_retry_metadata(
        media,
        "audio_asr provider is not enabled",
        retry_policy=RemoteMediaRetryPolicy(
            auto_retry_enabled=True,
            max_attempts=3,
            backoff_seconds=[15, 60, 300],
        ),
    )

    assert metadata["processing_retry_state"] == "manual_only"
    assert metadata["processing_retry_count"] == 0
    assert metadata["processing_retry_next_attempt_at"] is None


def test_reset_and_recover_media_retry_tracking_preserve_expected_state() -> None:
    media = build_media_asset(
        metadata_json={
            "processing_retry_count": 2,
            "processing_retry_last_reason": "Remote media download timed out",
        }
    )

    reset_media_retry_tracking(
        media,
        reset_count=False,
        retry_policy=RemoteMediaRetryPolicy(
            auto_retry_enabled=True,
            max_attempts=4,
            backoff_seconds=[30, 90],
        ),
    )
    assert media.metadata_json["processing_retry_state"] == "idle"
    assert media.metadata_json["processing_retry_count"] == 2
    assert media.metadata_json["processing_retry_max_attempts"] == 4

    mark_media_retry_recovered(
        media,
        recovered_at="2026-03-27T00:00:00+00:00",
        retry_policy=RemoteMediaRetryPolicy(
            auto_retry_enabled=True,
            max_attempts=4,
            backoff_seconds=[30, 90],
        ),
    )
    assert media.metadata_json["processing_retry_state"] == "recovered"
    assert media.metadata_json["processing_retry_last_recovered_at"] == "2026-03-27T00:00:00+00:00"
    assert media.metadata_json["processing_retry_last_reason"] is None


def test_get_remote_media_retry_policy_applies_workspace_overrides(monkeypatch) -> None:
    class DummyConfig:
        options_json = {
            "auto_retry_enabled": True,
            "remote_retry_max_attempts": 5,
            "remote_retry_backoff_seconds": [12, 34, 56],
        }

    monkeypatch.setattr(
        "app.services.media_retry_policy.get_effective_provider_config",
        lambda db, workspace_id, feature_code: DummyConfig(),
    )

    policy = get_remote_media_retry_policy(object(), "workspace-1")

    assert policy.auto_retry_enabled is True
    assert policy.max_attempts == 5
    assert policy.backoff_seconds == [12, 34, 56]
