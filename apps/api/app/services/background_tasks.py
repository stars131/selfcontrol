from __future__ import annotations

from sqlalchemy.orm import Session

from app.core.config import settings
from app.models.media import MediaAsset
from app.services.media_processing import process_media_asset


def dispatch_media_processing(db: Session, media_id: str) -> tuple[MediaAsset, str]:
    media = db.get(MediaAsset, media_id)
    if not media:
        raise ValueError("Media not found")

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
