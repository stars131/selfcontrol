from __future__ import annotations

import uuid
from datetime import datetime

from sqlalchemy import Boolean, DateTime, ForeignKey, JSON, String, Text, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base


class NotificationEvent(Base):
    __tablename__ = "notification_events"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    workspace_id: Mapped[str] = mapped_column(String(36), ForeignKey("workspaces.id"), nullable=False)
    user_id: Mapped[str] = mapped_column(String(36), ForeignKey("users.id"), nullable=False)
    reminder_id: Mapped[str] = mapped_column(String(36), ForeignKey("reminders.id"), nullable=True)
    record_id: Mapped[str] = mapped_column(String(36), ForeignKey("records.id"), nullable=True)
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    message: Mapped[str] = mapped_column(Text, nullable=True)
    event_type: Mapped[str] = mapped_column(String(32), nullable=False, default="reminder_due")
    status: Mapped[str] = mapped_column(String(32), nullable=False, default="unread")
    is_read: Mapped[bool] = mapped_column(Boolean, nullable=False, default=False)
    read_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=True)
    metadata_json: Mapped[dict] = mapped_column(JSON, nullable=False, default=dict)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )

    workspace = relationship("Workspace", back_populates="notification_events")
    reminder = relationship("Reminder", back_populates="notification_events")
