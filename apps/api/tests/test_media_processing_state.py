from __future__ import annotations

from types import SimpleNamespace

from app.services.media_processing_state import (
    mark_media_completed,
    mark_media_deferred,
    mark_media_failed,
    mark_media_processing_started,
    mark_media_remote_fetch_downloaded,
)
from app.services.media_retry_policy import RemoteMediaRetryPolicy


def build_media_stub(**overrides):
    payload = {
        "storage_provider": "custom",
        "metadata_json": {"seed": "value"},
        "processing_status": "pending",
        "processing_error": None,
        "processed_at": None,
    }
    payload.update(overrides)
    return SimpleNamespace(**payload)


def test_mark_media_processing_started_and_remote_fetch_downloaded_update_metadata() -> None:
    media = build_media_stub()

    mark_media_processing_started(media)
    mark_media_remote_fetch_downloaded(media)

    assert media.processing_status == "processing"
    assert media.processing_error is None
    assert media.metadata_json["processing_last_outcome"] == "processing"
    assert media.metadata_json["processing_source"] == "remote_fetch"
    assert media.metadata_json["remote_fetch_status"] == "downloaded"
    assert media.metadata_json["remote_fetch_error"] is None


def test_mark_media_deferred_sets_retry_metadata_and_reason() -> None:
    media = build_media_stub()

    mark_media_deferred(
        media,
        "provider processing is not ready",
        metadata_patch={"extraction_mode": "provider_deferred"},
        retry_policy=RemoteMediaRetryPolicy(
            auto_retry_enabled=True,
            max_attempts=2,
            backoff_seconds=[45, 180],
        ),
    )

    assert media.processing_status == "deferred"
    assert media.processing_error == "provider processing is not ready"
    assert media.metadata_json["extraction_mode"] == "provider_deferred"
    assert media.metadata_json["processing_retry_state"] == "scheduled"
    assert media.metadata_json["processing_retry_count"] == 1


def test_mark_media_completed_marks_success_and_recovery_state() -> None:
    media = build_media_stub(metadata_json={"processing_retry_count": 1})

    mark_media_completed(
        media,
        {"processing_retry_count": 1, "extraction_mode": "text_direct"},
        retry_policy=RemoteMediaRetryPolicy(
            auto_retry_enabled=True,
            max_attempts=3,
            backoff_seconds=[30, 90],
        ),
    )

    assert media.processing_status == "completed"
    assert media.processing_error is None
    assert media.processed_at is not None
    assert media.metadata_json["processing_last_outcome"] == "completed"
    assert media.metadata_json["processing_retry_state"] == "recovered"
    assert media.metadata_json["processing_retry_last_recovered_at"] is not None


def test_mark_media_failed_merges_metadata_and_remote_failure_state() -> None:
    media = build_media_stub(metadata_json={"processing_retry_count": 1})

    mark_media_failed(
        media,
        "Remote media download timed out",
        retry_policy=RemoteMediaRetryPolicy(
            auto_retry_enabled=True,
            max_attempts=3,
            backoff_seconds=[15, 60],
        ),
        metadata_patch={"sha256": "abc123"},
    )

    assert media.processing_status == "failed"
    assert media.processing_error == "Remote media download timed out"
    assert media.metadata_json["sha256"] == "abc123"
    assert media.metadata_json["remote_fetch_status"] == "failed"
    assert media.metadata_json["processing_retry_state"] == "scheduled"
