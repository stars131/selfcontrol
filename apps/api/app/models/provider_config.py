from __future__ import annotations

import uuid
from datetime import datetime

from sqlalchemy import Boolean, DateTime, ForeignKey, JSON, String, UniqueConstraint, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base


class ProviderConfig(Base):
    __tablename__ = "provider_configs"
    __table_args__ = (UniqueConstraint("workspace_id", "feature_code", name="uq_provider_configs_workspace_feature"),)

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    workspace_id: Mapped[str] = mapped_column(String(36), ForeignKey("workspaces.id"), nullable=False, index=True)
    feature_code: Mapped[str] = mapped_column(String(64), nullable=False)
    provider_code: Mapped[str] = mapped_column(String(64), nullable=False, default="none")
    model_name: Mapped[str] = mapped_column(String(128), nullable=True)
    is_enabled: Mapped[bool] = mapped_column(Boolean, nullable=False, default=False)
    api_base_url: Mapped[str] = mapped_column(String(255), nullable=True)
    api_key_env_name: Mapped[str] = mapped_column(String(128), nullable=True)
    options_json: Mapped[dict] = mapped_column(JSON, nullable=False, default=dict)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )

    workspace = relationship("Workspace", back_populates="provider_configs")
