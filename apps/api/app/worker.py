from celery import Celery

from app.core.config import settings
from app.db.session import SessionLocal
from app.models.media import MediaAsset
from app.services.knowledge import rebuild_record_knowledge
from app.services.background_tasks import queue_media_retry_if_needed
from app.services.media_processing import process_media_asset
from app.services.reminders import dispatch_due_reminders
from app.services.workspace_transfer_jobs import process_workspace_transfer_job


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
def process_media_asset_task(media_id: str, trigger: str = "manual") -> str:
    db = SessionLocal()
    try:
        if trigger == "auto_retry":
            existing = db.get(MediaAsset, media_id)
            if not existing:
                return "missing"
            metadata = existing.metadata_json if isinstance(existing.metadata_json, dict) else {}
            if existing.processing_status == "completed":
                return existing.processing_status
            if str(metadata.get("processing_retry_state") or "").strip().lower() != "scheduled":
                return existing.processing_status
        media = process_media_asset(db, media_id)
        queue_media_retry_if_needed(media)
        return media.processing_status
    finally:
        db.close()


@celery_app.task
def rebuild_record_knowledge_task(record_id: str) -> int:
    db = SessionLocal()
    try:
        result = rebuild_record_knowledge(db, record_id)
        return result.chunk_count
    finally:
        db.close()


@celery_app.task
def process_workspace_transfer_job_task(job_id: str) -> str:
    db = SessionLocal()
    try:
        job = process_workspace_transfer_job(db, job_id)
        return job.status
    finally:
        db.close()
