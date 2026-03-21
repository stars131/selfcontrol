from __future__ import annotations

import json
from hashlib import sha256
from dataclasses import dataclass
from datetime import datetime, timedelta, timezone
from pathlib import Path

from sqlalchemy.orm import Session

from app.core.config import settings
from app.models.media import MediaAsset
from app.services.knowledge import rebuild_record_knowledge
from app.services.media_provider import DeferredMediaProcessingError, extract_text_via_provider
from app.services.media_remote_storage import download_remote_media_to_temp_file
from app.services.provider_configs import get_effective_provider_config


TEXT_MIME_PREFIXES = ("text/",)
TEXT_MIME_TYPES = {
    "application/json",
    "application/ld+json",
    "application/xml",
    "application/javascript",
    "application/x-javascript",
    "application/csv",
    "application/x-yaml",
}
TEXT_FILE_EXTENSIONS = {
    ".txt",
    ".md",
    ".markdown",
    ".csv",
    ".json",
    ".jsonl",
    ".yaml",
    ".yml",
    ".xml",
    ".log",
    ".rtf",
}
MAX_EXTRACTED_TEXT_LENGTH = 12_000
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


def _now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


def merge_media_metadata(media: MediaAsset, patch: dict) -> dict:
    metadata = dict(media.metadata_json or {})
    metadata.update(patch)
    media.metadata_json = metadata
    return metadata


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
    effective_retry_policy = retry_policy or RemoteMediaRetryPolicy(
        auto_retry_enabled=settings.remote_media_retry_max_attempts > 0,
        max_attempts=max(int(settings.remote_media_retry_max_attempts), 0),
        backoff_seconds=list(settings.remote_media_retry_backoff_seconds or [60]),
    )
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
    effective_retry_policy = retry_policy or RemoteMediaRetryPolicy(
        auto_retry_enabled=settings.remote_media_retry_max_attempts > 0,
        max_attempts=max(int(settings.remote_media_retry_max_attempts), 0),
        backoff_seconds=list(settings.remote_media_retry_backoff_seconds or [60]),
    )
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


def resolve_storage_path(media: MediaAsset) -> Path:
    return Path(settings.storage_dir).parent / media.storage_key


def is_text_like_media(media: MediaAsset) -> bool:
    suffix = Path(media.original_filename or "").suffix.lower()
    if media.mime_type.startswith(TEXT_MIME_PREFIXES):
        return True
    if media.mime_type in TEXT_MIME_TYPES:
        return True
    return suffix in TEXT_FILE_EXTENSIONS


def decode_best_effort(content: bytes) -> str:
    for encoding in ("utf-8", "utf-8-sig", "gb18030", "gbk", "big5", "latin-1"):
        try:
            return content.decode(encoding)
        except UnicodeDecodeError:
            continue
    return content.decode("utf-8", errors="replace")


def format_size_label(size_bytes: int) -> str:
    units = ["B", "KB", "MB", "GB", "TB"]
    value = float(size_bytes)
    for unit in units:
        if value < 1024 or unit == units[-1]:
            if unit == "B":
                return f"{int(value)} {unit}"
            return f"{value:.1f} {unit}"
        value /= 1024
    return f"{size_bytes} B"


def read_png_dimensions(content: bytes) -> tuple[int, int] | None:
    if len(content) < 24 or content[:8] != b"\x89PNG\r\n\x1a\n":
        return None
    width = int.from_bytes(content[16:20], "big")
    height = int.from_bytes(content[20:24], "big")
    return width, height


def read_gif_dimensions(content: bytes) -> tuple[int, int] | None:
    if len(content) < 10 or content[:6] not in {b"GIF87a", b"GIF89a"}:
        return None
    width = int.from_bytes(content[6:8], "little")
    height = int.from_bytes(content[8:10], "little")
    return width, height


def read_jpeg_dimensions(content: bytes) -> tuple[int, int] | None:
    if len(content) < 4 or content[:2] != b"\xff\xd8":
        return None

    offset = 2
    while offset + 9 < len(content):
        if content[offset] != 0xFF:
            offset += 1
            continue

        marker = content[offset + 1]
        offset += 2
        if marker in {0xD8, 0xD9}:
            continue

        if offset + 2 > len(content):
            return None
        segment_length = int.from_bytes(content[offset : offset + 2], "big")
        if segment_length < 2 or offset + segment_length > len(content):
            return None

        if marker in {0xC0, 0xC1, 0xC2, 0xC3, 0xC5, 0xC6, 0xC7, 0xC9, 0xCA, 0xCB, 0xCD, 0xCE, 0xCF}:
            if offset + 7 > len(content):
                return None
            height = int.from_bytes(content[offset + 3 : offset + 5], "big")
            width = int.from_bytes(content[offset + 5 : offset + 7], "big")
            return width, height

        offset += segment_length
    return None


def read_image_dimensions(media: MediaAsset, file_path: Path) -> tuple[int, int] | None:
    if media.media_type != "image":
        return None
    content = file_path.read_bytes()
    for reader in (read_png_dimensions, read_gif_dimensions, read_jpeg_dimensions):
        dimensions = reader(content)
        if dimensions:
            return dimensions
    return None


def collect_media_metadata(media: MediaAsset, file_path: Path, extracted_text: str | None = None) -> dict:
    metadata = dict(media.metadata_json or {})
    file_suffix = file_path.suffix.lower()
    metadata["file_extension"] = file_suffix
    metadata["preview_kind"] = media.media_type if media.media_type in {"image", "audio", "video"} else "none"
    metadata["size_label"] = format_size_label(media.size_bytes)
    metadata["sha256"] = sha256(file_path.read_bytes()).hexdigest()

    dimensions = read_image_dimensions(media, file_path)
    if dimensions:
      width, height = dimensions
      metadata["width"] = width
      metadata["height"] = height

    if extracted_text:
        metadata["text_char_count"] = len(extracted_text)
        metadata["text_line_count"] = extracted_text.count("\n") + 1

    return metadata


def normalize_extracted_text(media: MediaAsset, raw_text: str) -> str:
    suffix = Path(media.original_filename or "").suffix.lower()
    text = raw_text.strip()
    if suffix in {".json", ".jsonl"} or media.mime_type in {"application/json", "application/ld+json"}:
        try:
            parsed = json.loads(text)
            text = json.dumps(parsed, ensure_ascii=False, indent=2)
        except json.JSONDecodeError:
            pass
    return text[:MAX_EXTRACTED_TEXT_LENGTH]


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
        build_remote_retry_metadata(media, reason, retry_policy=retry_policy or RemoteMediaRetryPolicy(
            auto_retry_enabled=settings.remote_media_retry_max_attempts > 0,
            max_attempts=max(int(settings.remote_media_retry_max_attempts), 0),
            backoff_seconds=list(settings.remote_media_retry_backoff_seconds or [60]),
        ))
        if media.storage_provider != "local"
        else {}
    )
    merge_media_metadata(
        media,
        {
            "processing_last_outcome": "deferred",
            "processing_last_failure_at": _now_iso(),
            "processing_error_message": reason,
            **retry_patch,
            **(metadata_patch or {}),
        },
    )


def process_media_asset(db: Session, media_id: str) -> MediaAsset:
    media = db.get(MediaAsset, media_id)
    if not media:
        raise ValueError("Media asset not found")
    retry_policy = get_remote_media_retry_policy(db, media.workspace_id)

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
    merge_media_metadata(media, start_metadata_patch)
    db.add(media)
    db.commit()
    db.refresh(media)

    try:
        cleanup_temp_file = False
        if media.storage_provider == "local":
            file_path = resolve_storage_path(media)
        else:
            file_path = download_remote_media_to_temp_file(db, media)
            cleanup_temp_file = True
            merge_media_metadata(
                media,
                {
                    "remote_fetch_status": "downloaded",
                    "remote_fetch_last_at": _now_iso(),
                    "remote_fetch_error": None,
                },
            )
        if not file_path.exists():
            raise FileNotFoundError(f"Stored file not found: {file_path}")

        if is_text_like_media(media):
            content = file_path.read_bytes()
            media.extracted_text = normalize_extracted_text(media, decode_best_effort(content))
            media.processing_status = "completed"
            media.processing_error = None
            media.processed_at = datetime.now(timezone.utc)
            metadata = collect_media_metadata(media, file_path, media.extracted_text)
            metadata["extraction_mode"] = "text_direct"
            metadata["processing_last_outcome"] = "completed"
            metadata["processing_last_success_at"] = media.processed_at.isoformat()
            media.metadata_json = metadata
            if media.storage_provider != "local":
                mark_media_retry_recovered(
                    media,
                    recovered_at=media.processed_at.isoformat(),
                    retry_policy=retry_policy,
                )
        else:
            try:
                extraction = extract_text_via_provider(db, media, file_path)
            except DeferredMediaProcessingError as exc:
                media.extracted_text = (
                    f"Uploaded {media.media_type} file: {media.original_filename}. "
                    f"Provider processing is not ready: {exc}"
                )
                mark_media_deferred(
                    media,
                    str(exc),
                    metadata_patch={"extraction_mode": "provider_deferred"},
                    retry_policy=retry_policy,
                )
                media.metadata_json = collect_media_metadata(media, file_path, media.extracted_text)
                media.metadata_json["extraction_mode"] = "provider_deferred"
            else:
                media.extracted_text = normalize_extracted_text(media, extraction.text)
                media.processing_status = "completed"
                media.processing_error = None
                media.processed_at = datetime.now(timezone.utc)
                metadata = collect_media_metadata(media, file_path, media.extracted_text)
                metadata.update(extraction.metadata_json)
                metadata["extraction_mode"] = extraction.extraction_mode
                metadata["provider_code"] = extraction.provider_code
                metadata["feature_code"] = extraction.feature_code
                metadata["processing_last_outcome"] = "completed"
                metadata["processing_last_success_at"] = media.processed_at.isoformat()
                if extraction.model_name:
                    metadata["model_name"] = extraction.model_name
                media.metadata_json = metadata
                if media.storage_provider != "local":
                    mark_media_retry_recovered(
                        media,
                        recovered_at=media.processed_at.isoformat(),
                        retry_policy=retry_policy,
                    )

        db.add(media)
        db.commit()
        db.refresh(media)
        rebuild_record_knowledge(db, media.record_id)
        db.refresh(media)
        return media
    except Exception as exc:  # noqa: BLE001
        media.processing_status = "failed"
        media.processing_error = str(exc)
        media.processed_at = None
        metadata_patch = {
            "processing_last_outcome": "failed",
            "processing_last_failure_at": _now_iso(),
            "processing_error_message": str(exc),
        }
        if media.storage_provider != "local":
            metadata_patch["remote_fetch_status"] = "failed"
            metadata_patch["remote_fetch_error"] = str(exc)
            metadata_patch.update(build_remote_retry_metadata(media, str(exc), retry_policy=retry_policy))
        if "file_path" in locals() and file_path.exists():
            media.metadata_json = collect_media_metadata(media, file_path, media.extracted_text)
            merge_media_metadata(media, metadata_patch)
        else:
            merge_media_metadata(media, metadata_patch)
        db.add(media)
        db.commit()
        db.refresh(media)
        rebuild_record_knowledge(db, media.record_id)
        db.refresh(media)
        return media
    finally:
        if "cleanup_temp_file" in locals() and cleanup_temp_file and "file_path" in locals():
            try:
                file_path.unlink(missing_ok=True)
            except OSError:
                pass
