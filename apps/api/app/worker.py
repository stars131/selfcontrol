from celery import Celery

from app.core.config import settings
from app.db.session import SessionLocal
from app.services.knowledge import rebuild_record_knowledge
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
def process_media_asset_task(media_id: str) -> str:
    db = SessionLocal()
    try:
        media = process_media_asset(db, media_id)
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
