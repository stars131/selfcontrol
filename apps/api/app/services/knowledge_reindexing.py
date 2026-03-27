from __future__ import annotations

from hashlib import blake2b

from sqlalchemy.orm import Session, selectinload

from app.models.knowledge import KnowledgeChunk
from app.models.record import Record
from app.services.embeddings import EmbeddingProviderError, embed_text_for_workspace
from app.services.knowledge_helpers import build_record_documents, chunk_text
from app.services.knowledge_types import KnowledgeReindexResult
from app.services.provider_configs import get_effective_provider_config


def build_knowledge_chunk(
    record: Record,
    document: dict,
    *,
    chunk_index: int,
    content: str,
    embedding,
) -> KnowledgeChunk:
    return KnowledgeChunk(
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


def summarize_workspace_reindex_results(results: list[KnowledgeReindexResult]) -> KnowledgeReindexResult:
    return KnowledgeReindexResult(
        record_count=sum(result.record_count for result in results),
        chunk_count=sum(result.chunk_count for result in results),
    )


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
            db.add(
                build_knowledge_chunk(
                    record,
                    document,
                    chunk_index=chunk_index,
                    content=content,
                    embedding=embedding,
                )
            )
            created_chunks += 1

    db.commit()
    return KnowledgeReindexResult(record_count=1, chunk_count=created_chunks)


def rebuild_workspace_knowledge(db: Session, workspace_id: str) -> KnowledgeReindexResult:
    record_ids = [item[0] for item in db.query(Record.id).filter(Record.workspace_id == workspace_id).all()]
    results = [rebuild_record_knowledge(db, record_id) for record_id in record_ids]
    return summarize_workspace_reindex_results(results)
