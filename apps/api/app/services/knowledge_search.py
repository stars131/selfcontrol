from __future__ import annotations

from collections.abc import Callable

from sqlalchemy import or_
from sqlalchemy.orm import Session, joinedload

from app.core.config import settings
from app.models.knowledge import KnowledgeChunk
from app.models.media import MediaAsset
from app.models.record import Record
from app.services.embeddings import EmbeddingProviderError, embed_text_for_workspace
from app.services.knowledge_helpers import (
    build_snippet,
    cosine_similarity,
    keyword_overlap_score,
    normalize_text,
    tokenize,
)
from app.services.knowledge_types import KnowledgeSearchHit
from app.services.provider_configs import get_effective_provider_config


MIN_SIMILARITY_SCORE = 0.08
KEYWORD_BONUS_WEIGHT = 0.2


def build_scored_knowledge_hits(
    chunks: list[KnowledgeChunk],
    *,
    workspace_id: str,
    query_vector: list[float],
    query_tokens: set[str],
    search_limit: int,
) -> list[KnowledgeSearchHit]:
    hits: list[KnowledgeSearchHit] = []
    for chunk in chunks:
        if not chunk.record or chunk.record.workspace_id != workspace_id:
            continue
        if chunk.embedding_dimensions != len(query_vector):
            continue

        score = cosine_similarity(query_vector, chunk.embedding_vector or [])
        score += KEYWORD_BONUS_WEIGHT * keyword_overlap_score(query_tokens, set(tokenize(chunk.content)))
        if score < MIN_SIMILARITY_SCORE:
            continue

        hits.append(
            KnowledgeSearchHit(
                chunk_id=chunk.id,
                record_id=chunk.record.id,
                record_title=chunk.record.title or "Untitled record",
                record_type_code=chunk.record.type_code,
                source_type=chunk.source_type,
                source_label=chunk.source_label,
                media_id=chunk.media_id,
                score=round(score, 4),
                snippet=build_snippet(chunk.content, query_tokens),
            )
        )

    hits.sort(key=lambda item: item.score, reverse=True)
    return hits[:search_limit]


def merge_hybrid_search_records(
    hits: list[KnowledgeSearchHit],
    *,
    load_record_fn: Callable[[str], Record | None],
    fallback_records: list[Record],
    limit: int,
) -> list[Record]:
    records: list[Record] = []
    seen_record_ids: set[str] = set()

    for hit in hits:
        if hit.record_id in seen_record_ids:
            continue
        record = load_record_fn(hit.record_id)
        if not record:
            continue
        records.append(record)
        seen_record_ids.add(record.id)
        if len(records) >= limit:
            return records

    for record in fallback_records:
        if record.id in seen_record_ids:
            continue
        records.append(record)
        seen_record_ids.add(record.id)
        if len(records) >= limit:
            break

    return records


def search_knowledge(
    db: Session,
    workspace_id: str,
    query: str,
    limit: int | None = None,
) -> list[KnowledgeSearchHit]:
    normalized_query = normalize_text(query)
    if not normalized_query:
        return []

    embedding_config = get_effective_provider_config(db, workspace_id, "embeddings")
    if not embedding_config.is_enabled:
        return []

    search_limit = limit or settings.rag_search_limit
    try:
        query_embedding = embed_text_for_workspace(db, workspace_id, normalized_query)
    except EmbeddingProviderError:
        return []
    query_vector = query_embedding.vector
    query_tokens = set(tokenize(normalized_query))
    chunks = (
        db.query(KnowledgeChunk)
        .options(joinedload(KnowledgeChunk.record))
        .filter(KnowledgeChunk.workspace_id == workspace_id)
        .all()
    )
    return build_scored_knowledge_hits(
        chunks,
        workspace_id=workspace_id,
        query_vector=query_vector,
        query_tokens=query_tokens,
        search_limit=search_limit,
    )


def search_records_hybrid(
    db: Session,
    workspace_id: str,
    query: str,
    limit: int = 10,
) -> tuple[list[Record], list[KnowledgeSearchHit]]:
    hits = search_knowledge(db, workspace_id, query, limit=max(limit, settings.rag_search_limit))
    like_value = f"%{query}%"
    fallback_records = (
        db.query(Record)
        .outerjoin(MediaAsset, MediaAsset.record_id == Record.id)
        .filter(
            Record.workspace_id == workspace_id,
            or_(
                Record.title.ilike(like_value),
                Record.content.ilike(like_value),
                MediaAsset.extracted_text.ilike(like_value),
                MediaAsset.original_filename.ilike(like_value),
            ),
        )
        .distinct()
        .order_by(Record.created_at.desc())
        .limit(limit)
        .all()
    )
    records = merge_hybrid_search_records(
        hits,
        load_record_fn=lambda record_id: db.get(Record, record_id),
        fallback_records=fallback_records,
        limit=limit,
    )
    return records, hits
