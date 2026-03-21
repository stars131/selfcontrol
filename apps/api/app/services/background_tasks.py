from __future__ import annotations

from sqlalchemy.orm import Session

from app.core.config import settings
from app.models.media import MediaAsset
from app.services.media_processing import process_media_asset, reset_media_retry_tracking


def queue_media_retry_if_needed(media: MediaAsset) -> str | None:
    if settings.media_processing_mode != "async":
        return None
    if media.storage_provider == "local":
        return None

    metadata = media.metadata_json if isinstance(media.metadata_json, dict) else {}
    if str(metadata.get("processing_retry_state") or "").strip().lower() != "scheduled":
        return None

    try:
        delay_seconds = int(metadata.get("processing_retry_delay_seconds"))
    except (TypeError, ValueError):
        return None
    if delay_seconds <= 0:
        return None

    from app.worker import process_media_asset_task

    process_media_asset_task.apply_async(
        args=[media.id],
        kwargs={"trigger": "auto_retry"},
        countdown=delay_seconds,
    )
    return "async_retry_scheduled"


def dispatch_media_processing(db: Session, media_id: str) -> tuple[MediaAsset, str]:
    media = db.get(MediaAsset, media_id)
    if not media:
        raise ValueError("Media not found")

    if media.storage_provider != "local":
        reset_media_retry_tracking(media, reset_count=True)

    if settings.media_processing_mode == "async":
        media.processing_status = "pending"
        media.processing_error = None
        media.processed_at = None
        db.add(media)
        db.commit()
        db.refresh(media)

        from app.worker import process_media_asset_task

        process_media_asset_task.delay(media_id)
        return media, "async"

    return process_media_asset(db, media_id), "sync"
