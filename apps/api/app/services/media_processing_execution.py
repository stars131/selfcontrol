from __future__ import annotations

from collections.abc import Callable
from pathlib import Path

from sqlalchemy.orm import Session

from app.models.media import MediaAsset
from app.services.media_file_analysis import collect_media_metadata, is_text_like_media
from app.services.media_processing_outcomes import (
    build_provider_completed_processing_payload,
    build_provider_deferred_processing_payload,
    build_text_direct_processing_payload,
)
from app.services.media_processing_state import (
    mark_media_completed,
    mark_media_deferred,
    mark_media_failed,
)
from app.services.media_provider import DeferredMediaProcessingError, MediaProviderExtractionResult
from app.services.media_retry_policy import RemoteMediaRetryPolicy


def execute_media_processing_for_file(
    db: Session,
    media: MediaAsset,
    file_path: Path,
    *,
    retry_policy: RemoteMediaRetryPolicy,
    extract_text_via_provider_fn: Callable[[Session, MediaAsset, Path], MediaProviderExtractionResult],
) -> None:
    if is_text_like_media(media):
        media.extracted_text, metadata = build_text_direct_processing_payload(media, file_path)
        mark_media_completed(media, metadata, retry_policy=retry_policy)
        return

    try:
        extraction = extract_text_via_provider_fn(db, media, file_path)
    except DeferredMediaProcessingError as exc:
        media.extracted_text, metadata = build_provider_deferred_processing_payload(media, file_path, str(exc))
        mark_media_deferred(
            media,
            str(exc),
            metadata_patch=metadata,
            retry_policy=retry_policy,
        )
        return

    media.extracted_text, metadata = build_provider_completed_processing_payload(media, file_path, extraction)
    mark_media_completed(media, metadata, retry_policy=retry_policy)


def apply_media_processing_failure(
    media: MediaAsset,
    error: Exception,
    *,
    retry_policy: RemoteMediaRetryPolicy,
    file_path: Path | None = None,
) -> None:
    metadata_patch = None
    if file_path and file_path.exists():
        metadata_patch = collect_media_metadata(media, file_path, media.extracted_text)
    mark_media_failed(
        media,
        str(error),
        retry_policy=retry_policy,
        metadata_patch=metadata_patch,
    )
