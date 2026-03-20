from __future__ import annotations

from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker
from sqlalchemy.pool import StaticPool

from app.core.config import settings
from app.db.base import Base


engine_kwargs: dict = {"echo": False, "future": True}
if settings.database_url.startswith("sqlite"):
    engine_kwargs["connect_args"] = {"check_same_thread": False}
    if settings.database_url.endswith(":memory:"):
        engine_kwargs["poolclass"] = StaticPool

engine = create_engine(settings.database_url, **engine_kwargs)
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False, class_=Session)


def create_db_and_tables() -> None:
    from app.models import conversation, knowledge, media, notification, provider_config, record, reminder, user, workspace  # noqa: F401

    Base.metadata.create_all(bind=engine)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
