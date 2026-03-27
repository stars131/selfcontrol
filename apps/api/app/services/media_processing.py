from __future__ import annotations

from datetime import datetime, timezone
from pathlib import Path

from sqlalchemy.orm import Session

from app.core.config import settings
from app.models.media import MediaAsset
from app.services.knowledge import rebuild_record_knowledge
from app.services.media_file_analysis import (
    collect_media_metadata,
    decode_best_effort,
    is_text_like_media,
    normalize_extracted_text,
)
from app.services.media_retry_policy import (
    RemoteMediaRetryPolicy,
    build_remote_retry_metadata,
    default_remote_media_retry_policy,
    get_remote_media_retry_policy,
    mark_media_retry_recovered,
)
from app.services.media_provider import DeferredMediaProcessingError, extract_text_via_provider
from app.services.media_remote_storage import download_remote_media_to_temp_file


def _now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


def merge_media_metadata(media: MediaAsset, patch: dict) -> dict:
    metadata = dict(media.metadata_json or {})
    metadata.update(patch)
    media.metadata_json = metadata
    return metadata


def resolve_storage_path(media: MediaAsset) -> Path:
    return Path(settings.storage_dir).parent / media.storage_key


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
