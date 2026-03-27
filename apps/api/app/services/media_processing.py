from __future__ import annotations

from sqlalchemy.orm import Session

from app.core.config import settings
from app.models.media import MediaAsset
from app.services.knowledge import rebuild_record_knowledge
from app.services.media_file_analysis import collect_media_metadata, is_text_like_media
from app.services.media_processing_io import (
    acquire_media_processing_file,
    cleanup_media_processing_file,
)
from app.services.media_processing_outcomes import (
    build_provider_completed_processing_payload,
    build_provider_deferred_processing_payload,
    build_text_direct_processing_payload,
    finalize_media_processing,
)
from app.services.media_processing_state import (
    mark_media_completed,
    mark_media_deferred,
    mark_media_failed,
    mark_media_processing_started,
    mark_media_remote_fetch_downloaded,
)
from app.services.media_retry_policy import get_remote_media_retry_policy
from app.services.media_provider import DeferredMediaProcessingError, extract_text_via_provider
from app.services.media_remote_storage import download_remote_media_to_temp_file
from app.services.media_storage import resolve_storage_path


def process_media_asset(db: Session, media_id: str) -> MediaAsset:
    media = db.get(MediaAsset, media_id)
    if not media:
        raise ValueError("Media asset not found")
    retry_policy = get_remote_media_retry_policy(db, media.workspace_id)

    mark_media_processing_started(media)
    db.add(media)
    db.commit()
    db.refresh(media)

    file_handle = None
    try:
        file_handle = acquire_media_processing_file(
            db,
            media,
            resolve_storage_path_fn=resolve_storage_path,
            download_remote_media_to_temp_file_fn=download_remote_media_to_temp_file,
            mark_media_remote_fetch_downloaded_fn=mark_media_remote_fetch_downloaded,
        )
        file_path = file_handle.file_path

        if is_text_like_media(media):
            media.extracted_text, metadata = build_text_direct_processing_payload(media, file_path)
            mark_media_completed(media, metadata, retry_policy=retry_policy)
        else:
            try:
                extraction = extract_text_via_provider(db, media, file_path)
            except DeferredMediaProcessingError as exc:
                media.extracted_text, metadata = build_provider_deferred_processing_payload(media, file_path, str(exc))
                mark_media_deferred(
                    media,
                    str(exc),
                    metadata_patch=metadata,
                    retry_policy=retry_policy,
                )
            else:
                media.extracted_text, metadata = build_provider_completed_processing_payload(media, file_path, extraction)
                mark_media_completed(media, metadata, retry_policy=retry_policy)

        return finalize_media_processing(
            db,
            media,
            rebuild_record_knowledge_fn=rebuild_record_knowledge,
        )
    except Exception as exc:  # noqa: BLE001
        metadata_patch = None
        if "file_path" in locals() and file_path.exists():
            metadata_patch = collect_media_metadata(media, file_path, media.extracted_text)
        mark_media_failed(
            media,
            str(exc),
            retry_policy=retry_policy,
            metadata_patch=metadata_patch,
        )
        return finalize_media_processing(
            db,
            media,
            rebuild_record_knowledge_fn=rebuild_record_knowledge,
        )
    finally:
        cleanup_media_processing_file(file_handle)
