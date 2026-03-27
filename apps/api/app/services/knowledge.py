from __future__ import annotations

import math

from sqlalchemy import func
from sqlalchemy.orm import Session

from app.core.config import settings
from app.models.knowledge import KnowledgeChunk
from app.services.knowledge_reindexing import rebuild_record_knowledge, rebuild_workspace_knowledge
from app.services.knowledge_search import search_knowledge, search_records_hybrid
from app.services.knowledge_types import KnowledgeReindexResult, KnowledgeSearchHit, KnowledgeStats
from app.services.provider_configs import get_effective_provider_config


def get_knowledge_stats(db: Session, workspace_id: str) -> KnowledgeStats:
    embedding_config = get_effective_provider_config(db, workspace_id, "embeddings")
    chunk_count, record_count, media_count, latest_indexed_at, embedding_dimensions = (
        db.query(
            func.count(KnowledgeChunk.id),
            func.count(func.distinct(KnowledgeChunk.record_id)),
            func.count(func.distinct(KnowledgeChunk.media_id)),
            func.max(KnowledgeChunk.updated_at),
            func.max(KnowledgeChunk.embedding_dimensions),
        )
        .filter(KnowledgeChunk.workspace_id == workspace_id)
        .one()
    )
    return KnowledgeStats(
        chunk_count=int(chunk_count or 0),
        record_count=int(record_count or 0),
        media_count=int(media_count or 0),
        latest_indexed_at=latest_indexed_at.isoformat() if latest_indexed_at else None,
        embedding_provider=embedding_config.provider_code,
        embedding_model=embedding_config.model_name or settings.embedding_model,
        embedding_dimensions=int(embedding_dimensions or max(settings.embedding_dimensions, 64)),
    )
