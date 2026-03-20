from celery import Celery

from app.core.config import settings
from app.db.session import SessionLocal
from app.services.media_processing import process_media_asset
from app.services.reminders import dispatch_due_reminders


celery_app = Celery("selfcontrol", broker=settings.redis_url, backend=settings.redis_url)


@celery_app.task
def ping() -> str:
    return "pong"


@celery_app.task
def dispatch_due_reminders_task() -> int:
    db = SessionLocal()
    try:
        return len(dispatch_due_reminders(db))
    finally:
        db.close()


@celery_app.task
def process_media_asset_task(media_id: str) -> str:
    db = SessionLocal()
    try:
        media = process_media_asset(db, media_id)
        return media.processing_status
    finally:
        db.close()
