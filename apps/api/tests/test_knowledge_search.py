from __future__ import annotations

from types import SimpleNamespace

from app.services.knowledge_search import build_scored_knowledge_hits, merge_hybrid_search_records
from app.services.knowledge_types import KnowledgeSearchHit


def test_build_scored_knowledge_hits_ranks_matching_chunks() -> None:
    chunks = [
        SimpleNamespace(
            id="chunk-1",
            record=SimpleNamespace(id="record-1", workspace_id="workspace-1", title="Best noodles", type_code="food"),
            embedding_dimensions=2,
            embedding_vector=[1.0, 0.0],
            content="noodle soup memory",
            source_type="record",
            source_label="Best noodles",
            media_id=None,
        ),
        SimpleNamespace(
            id="chunk-2",
            record=SimpleNamespace(id="record-2", workspace_id="workspace-1", title="Old snack", type_code="snack"),
            embedding_dimensions=2,
            embedding_vector=[0.0, 1.0],
            content="chips note",
            source_type="record",
            source_label="Old snack",
            media_id=None,
        ),
    ]

    hits = build_scored_knowledge_hits(
        chunks,
        workspace_id="workspace-1",
        query_vector=[1.0, 0.0],
        query_tokens={"noodle"},
        search_limit=5,
    )

    assert len(hits) == 1
    assert hits[0].record_id == "record-1"
    assert hits[0].snippet


def test_merge_hybrid_search_records_deduplicates_hits_and_fallbacks() -> None:
    record_one = SimpleNamespace(id="record-1")
    record_two = SimpleNamespace(id="record-2")
    hits = [
        KnowledgeSearchHit(
            chunk_id="chunk-1",
            record_id="record-1",
            record_title="Best noodles",
            record_type_code="food",
            source_type="record",
            source_label="Best noodles",
            media_id=None,
            score=0.9,
            snippet="noodle",
        ),
        KnowledgeSearchHit(
            chunk_id="chunk-2",
            record_id="record-1",
            record_title="Best noodles",
            record_type_code="food",
            source_type="media",
            source_label="voice",
            media_id="media-1",
            score=0.8,
            snippet="soup",
        ),
    ]

    records = merge_hybrid_search_records(
        hits,
        load_record_fn=lambda record_id: record_one if record_id == "record-1" else None,
        fallback_records=[record_one, record_two],
        limit=3,
    )

    assert [record.id for record in records] == ["record-1", "record-2"]
