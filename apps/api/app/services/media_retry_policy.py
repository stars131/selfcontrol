from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime, timedelta, timezone

from sqlalchemy.orm import Session

from app.core.config import settings
from app.models.media import MediaAsset
from app.services.provider_configs import get_effective_provider_config


TRANSIENT_REMOTE_RETRY_MARKERS = (
    "not ready",
    "timed out",
    "timeout",
    "request failed",
    "temporarily",
    "temporary",
    "try again",
    "rate limit",
    "429",
    "502",
    "503",
    "504",
)
NON_RETRIABLE_REMOTE_RETRY_MARKERS = (
    "provider is not enabled",
    "not supported",
    "requires",
    "missing",
    "not found",
    "invalid",
    "forbidden",
    "unauthorized",
    "401",
    "403",
    "404",
)


@dataclass(frozen=True)
class RemoteMediaRetryPolicy:
    auto_retry_enabled: bool
    max_attempts: int
    backoff_seconds: list[int]


def default_remote_media_retry_policy() -> RemoteMediaRetryPolicy:
    return RemoteMediaRetryPolicy(
        auto_retry_enabled=settings.remote_media_retry_max_attempts > 0,
        max_attempts=max(int(settings.remote_media_retry_max_attempts), 0),
        backoff_seconds=list(settings.remote_media_retry_backoff_seconds or [60]),
    )


def _coerce_metadata_int(metadata: dict, key: str, *, default: int = 0) -> int:
    value = metadata.get(key)
    try:
        return int(value)
    except (TypeError, ValueError):
        return default


def get_remote_media_retry_policy(db: Session, workspace_id: str) -> RemoteMediaRetryPolicy:
    config = get_effective_provider_config(db, workspace_id, "media_storage")
    options = config.options_json if isinstance(config.options_json, dict) else {}

    auto_retry_enabled = settings.remote_media_retry_max_attempts > 0
    if "auto_retry_enabled" in options:
        auto_retry_enabled = options["auto_retry_enabled"] is True

    max_attempts = max(int(settings.remote_media_retry_max_attempts), 0)
    if "remote_retry_max_attempts" in options:
        try:
            max_attempts = max(int(options["remote_retry_max_attempts"]), 0)
        except (TypeError, ValueError):
            max_attempts = max(int(settings.remote_media_retry_max_attempts), 0)

    backoff_seconds = list(settings.remote_media_retry_backoff_seconds or [60])
    configured_backoff = options.get("remote_retry_backoff_seconds")
    if isinstance(configured_backoff, list):
        normalized_backoff: list[int] = []
        for item in configured_backoff:
            try:
                parsed = int(item)
            except (TypeError, ValueError):
                continue
            if parsed > 0:
                normalized_backoff.append(parsed)
        if normalized_backoff:
            backoff_seconds = normalized_backoff

    if not auto_retry_enabled:
        max_attempts = 0
    return RemoteMediaRetryPolicy(
        auto_retry_enabled=auto_retry_enabled,
        max_attempts=max_attempts,
        backoff_seconds=backoff_seconds or [60],
    )


def reset_media_retry_tracking(
    media: MediaAsset,
    *,
    reset_count: bool,
    retry_policy: RemoteMediaRetryPolicy | None = None,
) -> dict:
    effective_retry_policy = retry_policy or default_remote_media_retry_policy()
    metadata = dict(media.metadata_json or {})
    if reset_count:
        metadata["processing_retry_count"] = 0
        metadata["processing_retry_last_reason"] = None
        metadata["processing_retry_last_recovered_at"] = None
    metadata["processing_retry_state"] = "idle"
    metadata["processing_retry_next_attempt_at"] = None
    metadata["processing_retry_delay_seconds"] = None
    metadata["processing_retry_last_scheduled_at"] = None
    metadata["processing_retry_max_attempts"] = effective_retry_policy.max_attempts
    media.metadata_json = metadata
    return metadata


def _should_schedule_remote_retry(media: MediaAsset, reason: str) -> bool:
    if media.storage_provider == "local":
        return False
    normalized = reason.strip().lower()
    if not normalized:
        return False
    if any(marker in normalized for marker in NON_RETRIABLE_REMOTE_RETRY_MARKERS):
        return False
    if any(marker in normalized for marker in TRANSIENT_REMOTE_RETRY_MARKERS):
        return True
    return False


def build_remote_retry_metadata(
    media: MediaAsset,
    reason: str,
    *,
    retry_policy: RemoteMediaRetryPolicy,
) -> dict:
    metadata = dict(media.metadata_json or {})
    retry_count = _coerce_metadata_int(metadata, "processing_retry_count", default=0)
    max_attempts = max(int(retry_policy.max_attempts), 0)
    patch: dict[str, str | int | None] = {
        "processing_retry_count": retry_count,
        "processing_retry_max_attempts": max_attempts,
        "processing_retry_last_reason": reason,
        "processing_retry_next_attempt_at": None,
        "processing_retry_delay_seconds": None,
        "processing_retry_last_scheduled_at": None,
    }

    if max_attempts <= 0:
        patch["processing_retry_state"] = "disabled"
        return patch
    if not _should_schedule_remote_retry(media, reason):
        patch["processing_retry_state"] = "manual_only"
        return patch
    if retry_count >= max_attempts:
        patch["processing_retry_state"] = "exhausted"
        return patch

    delays = retry_policy.backoff_seconds or [60]
    next_retry_count = retry_count + 1
    delay_seconds = delays[min(next_retry_count - 1, len(delays) - 1)]
    scheduled_at = datetime.now(timezone.utc)
    patch.update(
        {
            "processing_retry_count": next_retry_count,
            "processing_retry_state": "scheduled",
            "processing_retry_delay_seconds": delay_seconds,
            "processing_retry_last_scheduled_at": scheduled_at.isoformat(),
            "processing_retry_next_attempt_at": (scheduled_at + timedelta(seconds=delay_seconds)).isoformat(),
        }
    )
    return patch


def mark_media_retry_recovered(
    media: MediaAsset,
    *,
    recovered_at: str,
    retry_policy: RemoteMediaRetryPolicy | None = None,
) -> dict:
    effective_retry_policy = retry_policy or default_remote_media_retry_policy()
    metadata = dict(media.metadata_json or {})
    retry_count = _coerce_metadata_int(metadata, "processing_retry_count", default=0)
    metadata["processing_retry_max_attempts"] = effective_retry_policy.max_attempts
    metadata["processing_retry_next_attempt_at"] = None
    metadata["processing_retry_delay_seconds"] = None
    metadata["processing_retry_last_scheduled_at"] = None
    metadata["processing_retry_last_reason"] = None
    metadata["processing_retry_last_recovered_at"] = recovered_at if retry_count > 0 else None
    metadata["processing_retry_state"] = "recovered" if retry_count > 0 else "idle"
    media.metadata_json = metadata
    return metadata
