from __future__ import annotations

import app.models.audit_log  # noqa: F401
import app.models.conversation  # noqa: F401
import app.models.knowledge  # noqa: F401
import app.models.media  # noqa: F401
import app.models.notification  # noqa: F401
import app.models.provider_config  # noqa: F401
import app.models.record  # noqa: F401
import app.models.reminder  # noqa: F401
import app.models.search_preset  # noqa: F401
import app.models.share_link  # noqa: F401
import app.models.user  # noqa: F401
import app.models.workspace  # noqa: F401
import app.models.workspace_transfer_job  # noqa: F401

from types import SimpleNamespace

from app.services.knowledge_reindexing import build_knowledge_chunk, summarize_workspace_reindex_results
from app.services.knowledge_types import KnowledgeReindexResult


def test_build_knowledge_chunk_carries_embedding_and_document_metadata() -> None:
    record = SimpleNamespace(id="record-1", workspace_id="workspace-1")
    document = {
        "media_id": "media-1",
        "source_type": "media",
        "source_label": "voice.m4a",
        "metadata_json": {"origin": "media"},
    }
    embedding = SimpleNamespace(
        provider_code="custom",
        model_name="embed-v1",
        dimensions=3,
        vector=[0.1, 0.2, 0.3],
    )

    chunk = build_knowledge_chunk(
        record,
        document,
        chunk_index=2,
        content="best noodle shop",
        embedding=embedding,
    )

    assert chunk.workspace_id == "workspace-1"
    assert chunk.record_id == "record-1"
    assert chunk.media_id == "media-1"
    assert chunk.chunk_index == 2
    assert chunk.embedding_provider == "custom"
    assert chunk.embedding_model == "embed-v1"
    assert chunk.embedding_dimensions == 3
    assert chunk.metadata_json == {"origin": "media"}
    assert chunk.content_hash


def test_summarize_workspace_reindex_results_accumulates_counts() -> None:
    result = summarize_workspace_reindex_results(
        [
            KnowledgeReindexResult(record_count=1, chunk_count=2),
            KnowledgeReindexResult(record_count=3, chunk_count=5),
        ]
    )

    assert result.record_count == 4
    assert result.chunk_count == 7
