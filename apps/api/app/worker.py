from celery import Celery

from app.core.config import settings
from app.db.session import SessionLocal
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
