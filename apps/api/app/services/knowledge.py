from __future__ import annotations

import math
from hashlib import blake2b

from sqlalchemy import func
from sqlalchemy.orm import Session, selectinload

from app.core.config import settings
from app.models.knowledge import KnowledgeChunk
from app.models.record import Record
from app.services.embeddings import EmbeddingProviderError, embed_text_for_workspace
from app.services.knowledge_helpers import (
    build_record_documents,
    chunk_text,
)
from app.services.knowledge_search import search_knowledge, search_records_hybrid
from app.services.knowledge_types import KnowledgeReindexResult, KnowledgeSearchHit, KnowledgeStats
from app.services.provider_configs import get_effective_provider_config


def rebuild_record_knowledge(db: Session, record_id: str) -> KnowledgeReindexResult:
    record = (
        db.query(Record)
        .options(selectinload(Record.media_assets))
        .filter(Record.id == record_id)
        .first()
    )
    if not record:
        return KnowledgeReindexResult(record_count=0, chunk_count=0)

    embedding_config = get_effective_provider_config(db, record.workspace_id, "embeddings")
    db.query(KnowledgeChunk).filter(KnowledgeChunk.record_id == record_id).delete(synchronize_session=False)
    if not embedding_config.is_enabled:
        db.commit()
        return KnowledgeReindexResult(record_count=1, chunk_count=0)

    created_chunks = 0
    documents = build_record_documents(record)
    for document in documents:
        for chunk_index, content in enumerate(chunk_text(document["text"])):
            try:
                embedding = embed_text_for_workspace(db, record.workspace_id, content)
            except EmbeddingProviderError:
                db.commit()
                return KnowledgeReindexResult(record_count=1, chunk_count=created_chunks)
            chunk = KnowledgeChunk(
                workspace_id=record.workspace_id,
                record_id=record.id,
                media_id=document["media_id"],
                source_type=document["source_type"],
                source_label=document["source_label"],
                chunk_index=chunk_index,
                content=content,
                content_hash=blake2b(content.encode("utf-8"), digest_size=20).hexdigest(),
                embedding_provider=embedding.provider_code,
                embedding_model=embedding.model_name,
                embedding_dimensions=embedding.dimensions,
                embedding_vector=embedding.vector,
                metadata_json=document["metadata_json"],
            )
            db.add(chunk)
            created_chunks += 1

    db.commit()
    return KnowledgeReindexResult(record_count=1, chunk_count=created_chunks)


def rebuild_workspace_knowledge(db: Session, workspace_id: str) -> KnowledgeReindexResult:
    record_ids = [item[0] for item in db.query(Record.id).filter(Record.workspace_id == workspace_id).all()]
    total_records = 0
    total_chunks = 0
    for record_id in record_ids:
        result = rebuild_record_knowledge(db, record_id)
        total_records += result.record_count
        total_chunks += result.chunk_count
    return KnowledgeReindexResult(record_count=total_records, chunk_count=total_chunks)


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
