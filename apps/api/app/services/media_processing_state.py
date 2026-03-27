from __future__ import annotations

from datetime import datetime, timezone

from app.models.media import MediaAsset
from app.services.media_retry_policy import (
    RemoteMediaRetryPolicy,
    build_remote_retry_metadata,
    default_remote_media_retry_policy,
    mark_media_retry_recovered,
)


def _now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


def merge_media_metadata(media: MediaAsset, patch: dict) -> dict:
    metadata = dict(media.metadata_json or {})
    metadata.update(patch)
    media.metadata_json = metadata
    return metadata


def mark_media_processing_started(media: MediaAsset) -> dict:
    media.processing_status = "processing"
    media.processing_error = None
    start_metadata_patch = {
        "processing_last_attempt_at": _now_iso(),
        "processing_last_outcome": "processing",
        "processing_source": "local_file" if media.storage_provider == "local" else "remote_fetch",
    }
    if media.storage_provider != "local":
        start_metadata_patch["processing_retry_state"] = "processing"
        start_metadata_patch["processing_retry_next_attempt_at"] = None
        start_metadata_patch["processing_retry_delay_seconds"] = None
    return merge_media_metadata(media, start_metadata_patch)


def mark_media_remote_fetch_downloaded(media: MediaAsset) -> dict:
    return merge_media_metadata(
        media,
        {
            "remote_fetch_status": "downloaded",
            "remote_fetch_last_at": _now_iso(),
            "remote_fetch_error": None,
        },
    )


def mark_media_deferred(
    media: MediaAsset,
    reason: str,
    metadata_patch: dict | None = None,
    *,
    retry_policy: RemoteMediaRetryPolicy | None = None,
) -> None:
    media.processing_status = "deferred"
    media.processing_error = reason
    media.processed_at = None
    retry_patch = (
        build_remote_retry_metadata(
            media,
            reason,
            retry_policy=retry_policy or default_remote_media_retry_policy(),
        )
        if media.storage_provider != "local"
        else {}
    )
    merge_media_metadata(
        media,
        {
            **(metadata_patch or {}),
            "processing_last_outcome": "deferred",
            "processing_last_failure_at": _now_iso(),
            "processing_error_message": reason,
            **retry_patch,
        },
    )


def mark_media_completed(
    media: MediaAsset,
    metadata: dict,
    *,
    retry_policy: RemoteMediaRetryPolicy | None = None,
) -> None:
    processed_at = datetime.now(timezone.utc)
    media.processing_status = "completed"
    media.processing_error = None
    media.processed_at = processed_at
    metadata["processing_last_outcome"] = "completed"
    metadata["processing_last_success_at"] = processed_at.isoformat()
    media.metadata_json = metadata
    if media.storage_provider != "local":
        mark_media_retry_recovered(
            media,
            recovered_at=processed_at.isoformat(),
            retry_policy=retry_policy,
        )


def mark_media_failed(
    media: MediaAsset,
    reason: str,
    *,
    retry_policy: RemoteMediaRetryPolicy | None = None,
    metadata_patch: dict | None = None,
) -> None:
    media.processing_status = "failed"
    media.processing_error = reason
    media.processed_at = None
    failure_patch = {
        "processing_last_outcome": "failed",
        "processing_last_failure_at": _now_iso(),
        "processing_error_message": reason,
    }
    if media.storage_provider != "local":
        failure_patch["remote_fetch_status"] = "failed"
        failure_patch["remote_fetch_error"] = reason
        failure_patch.update(
            build_remote_retry_metadata(
                media,
                reason,
                retry_policy=retry_policy or default_remote_media_retry_policy(),
            )
        )
    merge_media_metadata(media, {**(metadata_patch or {}), **failure_patch})
