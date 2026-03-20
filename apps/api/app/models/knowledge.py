from __future__ import annotations

import uuid
from datetime import datetime

from sqlalchemy import DateTime, ForeignKey, Index, Integer, JSON, String, Text, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base


class KnowledgeChunk(Base):
    __tablename__ = "knowledge_chunks"
    __table_args__ = (
        Index("ix_knowledge_chunks_workspace_id", "workspace_id"),
        Index("ix_knowledge_chunks_record_id", "record_id"),
        Index("ix_knowledge_chunks_media_id", "media_id"),
    )

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    workspace_id: Mapped[str] = mapped_column(String(36), ForeignKey("workspaces.id"), nullable=False)
    record_id: Mapped[str] = mapped_column(String(36), ForeignKey("records.id"), nullable=False)
    media_id: Mapped[str] = mapped_column(String(36), ForeignKey("media_assets.id"), nullable=True)
    source_type: Mapped[str] = mapped_column(String(32), nullable=False)
    source_label: Mapped[str] = mapped_column(String(255), nullable=False, default="")
    chunk_index: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    content: Mapped[str] = mapped_column(Text, nullable=False)
    content_hash: Mapped[str] = mapped_column(String(64), nullable=False)
    embedding_provider: Mapped[str] = mapped_column(String(64), nullable=False, default="local")
    embedding_model: Mapped[str] = mapped_column(String(128), nullable=False, default="hash-embedding-v1")
    embedding_dimensions: Mapped[int] = mapped_column(Integer, nullable=False, default=256)
    embedding_vector: Mapped[list[float]] = mapped_column(JSON, nullable=False)
    metadata_json: Mapped[dict] = mapped_column(JSON, nullable=False, default=dict)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )

    workspace = relationship("Workspace", back_populates="knowledge_chunks")
    record = relationship("Record", back_populates="knowledge_chunks")
    media_asset = relationship("MediaAsset", back_populates="knowledge_chunks")
