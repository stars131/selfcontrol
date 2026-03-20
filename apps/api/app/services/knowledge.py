from __future__ import annotations

import math
import re
from dataclasses import asdict, dataclass
from hashlib import blake2b

from sqlalchemy import func, or_
from sqlalchemy.orm import Session, joinedload, selectinload

from app.core.config import settings
from app.models.knowledge import KnowledgeChunk
from app.models.media import MediaAsset
from app.models.record import Record
from app.services.provider_configs import get_effective_provider_config


TOKEN_PATTERN = re.compile(r"[A-Za-z0-9]+|[\u4e00-\u9fff]")
MIN_SIMILARITY_SCORE = 0.08
KEYWORD_BONUS_WEIGHT = 0.2
SNIPPET_LENGTH = 180


@dataclass
class KnowledgeSearchHit:
    chunk_id: str
    record_id: str
    record_title: str
    record_type_code: str
    source_type: str
    source_label: str
    media_id: str | None
    score: float
    snippet: str

    def to_dict(self) -> dict:
        return asdict(self)


@dataclass
class KnowledgeStats:
    chunk_count: int
    record_count: int
    media_count: int
    latest_indexed_at: str | None
    embedding_provider: str
    embedding_model: str
    embedding_dimensions: int

    def to_dict(self) -> dict:
        return asdict(self)


@dataclass
class KnowledgeReindexResult:
    record_count: int
    chunk_count: int

    def to_dict(self) -> dict:
        return asdict(self)


def normalize_text(value: str | None) -> str:
    return " ".join((value or "").split()).strip()


def tokenize(value: str) -> list[str]:
    return TOKEN_PATTERN.findall((value or "").lower())


def embed_text(value: str) -> list[float]:
    dimensions = max(settings.embedding_dimensions, 64)
    vector = [0.0] * dimensions
    tokens = tokenize(value)
    if not tokens:
        return vector

    for token in tokens:
        digest = blake2b(token.encode("utf-8"), digest_size=16).digest()
        index = int.from_bytes(digest[:8], "big") % dimensions
        sign = 1.0 if digest[8] % 2 == 0 else -1.0
        weight = 1.0 + min(len(token), 12) / 12
        vector[index] += sign * weight

    norm = math.sqrt(sum(item * item for item in vector))
    if not norm:
        return vector
    return [round(item / norm, 6) for item in vector]


def cosine_similarity(left: list[float], right: list[float]) -> float:
    if not left or not right or len(left) != len(right):
        return 0.0
    return float(sum(a * b for a, b in zip(left, right, strict=False)))


def keyword_overlap_score(query_tokens: set[str], content_tokens: set[str]) -> float:
    if not query_tokens or not content_tokens:
        return 0.0
    return len(query_tokens & content_tokens) / len(query_tokens)


def chunk_text(value: str) -> list[str]:
    normalized = normalize_text(value)
    if not normalized:
        return []

    chunk_size = max(settings.rag_chunk_size_chars, 200)
    overlap = max(min(settings.rag_chunk_overlap_chars, chunk_size // 2), 0)
    chunks: list[str] = []
    start = 0
    length = len(normalized)

    while start < length:
        end = min(length, start + chunk_size)
        if end < length:
            boundary = normalized.rfind(" ", start, end)
            if boundary > start + (chunk_size // 2):
                end = boundary

        piece = normalized[start:end].strip()
        if piece:
            chunks.append(piece)

        if end >= length:
            break

        start = max(end - overlap, start + 1)

    return chunks


def build_snippet(value: str, query_tokens: set[str]) -> str:
    text = normalize_text(value)
    if not text:
        return ""

    lowered = text.lower()
    match_index = -1
    for token in query_tokens:
        if len(token) < 2:
            continue
        found = lowered.find(token)
        if found >= 0 and (match_index < 0 or found < match_index):
            match_index = found

    if match_index < 0:
        snippet = text[:SNIPPET_LENGTH]
        return f"{snippet}..." if len(text) > SNIPPET_LENGTH else snippet

    start = max(match_index - (SNIPPET_LENGTH // 3), 0)
    end = min(start + SNIPPET_LENGTH, len(text))
    snippet = text[start:end].strip()
    if start > 0:
        snippet = f"...{snippet}"
    if end < len(text):
        snippet = f"{snippet}..."
    return snippet


def build_record_documents(record: Record) -> list[dict]:
    documents: list[dict] = []

    record_text = "\n\n".join(part for part in [record.title, record.content] if normalize_text(part))
    if normalize_text(record_text):
        documents.append(
            {
                "source_type": "record",
                "source_label": record.title or record.type_code,
                "media_id": None,
                "text": record_text,
                "metadata_json": {
                    "record_id": record.id,
                    "record_type_code": record.type_code,
                    "origin": "record",
                },
            }
        )

    for media in record.media_assets:
        if not normalize_text(media.extracted_text):
            continue
        documents.append(
            {
                "source_type": "media",
                "source_label": media.original_filename,
                "media_id": media.id,
                "text": media.extracted_text or "",
                "metadata_json": {
                    "record_id": record.id,
                    "record_type_code": record.type_code,
                    "media_type": media.media_type,
                    "mime_type": media.mime_type,
                    "origin": "media",
                },
            }
        )

    return documents


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
            chunk = KnowledgeChunk(
                workspace_id=record.workspace_id,
                record_id=record.id,
                media_id=document["media_id"],
                source_type=document["source_type"],
                source_label=document["source_label"],
                chunk_index=chunk_index,
                content=content,
                content_hash=blake2b(content.encode("utf-8"), digest_size=20).hexdigest(),
                embedding_provider=embedding_config.provider_code,
                embedding_model=embedding_config.model_name or settings.embedding_model,
                embedding_dimensions=max(settings.embedding_dimensions, 64),
                embedding_vector=embed_text(content),
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
    chunk_count, record_count, media_count, latest_indexed_at = (
        db.query(
            func.count(KnowledgeChunk.id),
            func.count(func.distinct(KnowledgeChunk.record_id)),
            func.count(func.distinct(KnowledgeChunk.media_id)),
            func.max(KnowledgeChunk.updated_at),
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
        embedding_dimensions=max(settings.embedding_dimensions, 64),
    )


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
    query_vector = embed_text(normalized_query)
    query_tokens = set(tokenize(normalized_query))
    chunks = (
        db.query(KnowledgeChunk)
        .options(joinedload(KnowledgeChunk.record))
        .filter(KnowledgeChunk.workspace_id == workspace_id)
        .all()
    )

    hits: list[KnowledgeSearchHit] = []
    for chunk in chunks:
        if not chunk.record or chunk.record.workspace_id != workspace_id:
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


def search_records_hybrid(
    db: Session,
    workspace_id: str,
    query: str,
    limit: int = 10,
) -> tuple[list[Record], list[KnowledgeSearchHit]]:
    hits = search_knowledge(db, workspace_id, query, limit=max(limit, settings.rag_search_limit))
    records: list[Record] = []
    seen_record_ids: set[str] = set()

    for hit in hits:
        if hit.record_id in seen_record_ids:
            continue
        record = db.get(Record, hit.record_id)
        if not record:
            continue
        records.append(record)
        seen_record_ids.add(record.id)
        if len(records) >= limit:
            return records, hits

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
    for record in fallback_records:
        if record.id in seen_record_ids:
            continue
        records.append(record)
        seen_record_ids.add(record.id)
        if len(records) >= limit:
            break

    return records, hits
