from __future__ import annotations

from sqlalchemy.orm import Session

from app.core.config import settings
from app.models.media import MediaAsset
from app.services.knowledge import rebuild_record_knowledge
from app.services.media_processing_execution import (
    apply_media_processing_failure,
    execute_media_processing_for_file,
)
from app.services.media_processing_io import (
    acquire_media_processing_file,
    cleanup_media_processing_file,
)
from app.services.media_processing_outcomes import finalize_media_processing
from app.services.media_processing_state import (
    mark_media_processing_started,
    mark_media_remote_fetch_downloaded,
)
from app.services.media_retry_policy import get_remote_media_retry_policy
from app.services.media_provider import extract_text_via_provider
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

        execute_media_processing_for_file(
            db,
            media,
            file_path,
            retry_policy=retry_policy,
            extract_text_via_provider_fn=extract_text_via_provider,
        )

        return finalize_media_processing(
            db,
            media,
            rebuild_record_knowledge_fn=rebuild_record_knowledge,
        )
    except Exception as exc:  # noqa: BLE001
        apply_media_processing_failure(
            media,
            exc,
            retry_policy=retry_policy,
            file_path=file_handle.file_path if file_handle else None,
        )
        return finalize_media_processing(
            db,
            media,
            rebuild_record_knowledge_fn=rebuild_record_knowledge,
        )
    finally:
        cleanup_media_processing_file(file_handle)
