from __future__ import annotations

import uuid
from datetime import datetime

from sqlalchemy import Boolean, DateTime, ForeignKey, JSON, String, Text, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base


class Reminder(Base):
    __tablename__ = "reminders"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    workspace_id: Mapped[str] = mapped_column(String(36), ForeignKey("workspaces.id"), nullable=False)
    record_id: Mapped[str] = mapped_column(String(36), ForeignKey("records.id"), nullable=False)
    created_by: Mapped[str] = mapped_column(String(36), ForeignKey("users.id"), nullable=False)
    channel_code: Mapped[str] = mapped_column(String(32), nullable=False, default="in_app")
    title: Mapped[str] = mapped_column(String(255), nullable=True)
    message: Mapped[str] = mapped_column(Text, nullable=True)
    remind_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)
    status: Mapped[str] = mapped_column(String(32), nullable=False, default="pending")
    is_enabled: Mapped[bool] = mapped_column(Boolean, nullable=False, default=True)
    delivered_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=True)
    cancelled_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=True)
    metadata_json: Mapped[dict] = mapped_column(JSON, nullable=False, default=dict)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )

    workspace = relationship("Workspace", back_populates="reminders")
    record = relationship("Record", back_populates="reminders")
    notification_events = relationship("NotificationEvent", back_populates="reminder")
