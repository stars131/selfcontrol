from __future__ import annotations

from types import SimpleNamespace

from app.services.knowledge_helpers import (
    build_record_documents,
    build_snippet,
    chunk_text,
    cosine_similarity,
    keyword_overlap_score,
    normalize_text,
    tokenize,
)


def test_normalize_and_tokenize_support_mixed_text() -> None:
    assert normalize_text("  best   noodle   note  ") == "best noodle note"
    assert tokenize("Noodle 米饭 123") == ["noodle", "米", "饭", "123"]


def test_chunk_text_respects_overlap_and_ignores_empty_values(monkeypatch) -> None:
    monkeypatch.setattr("app.services.knowledge_helpers.settings.rag_chunk_size_chars", 12)
    monkeypatch.setattr("app.services.knowledge_helpers.settings.rag_chunk_overlap_chars", 4)

    chunks = chunk_text("alpha beta gamma delta epsilon")

    assert chunks
    assert chunk_text("   ") == []
    assert chunks[0].startswith("alpha")


def test_snippet_and_scores_cover_match_and_fallback_cases() -> None:
    snippet = build_snippet("A very long noodle memory with a tasty soup base", {"noodle"})
    fallback = build_snippet("short text", {"zz"})

    assert "noodle" in snippet.lower()
    assert fallback == "short text"
    assert cosine_similarity([1.0, 0.0], [1.0, 0.0]) == 1.0
    assert keyword_overlap_score({"noodle", "soup"}, {"soup", "rice"}) == 0.5


def test_build_record_documents_collects_record_and_media_sources() -> None:
    record = SimpleNamespace(
        id="record-1",
        title="Best noodles",
        content="Thick broth and handmade noodles",
        type_code="food",
        media_assets=[
            SimpleNamespace(
                id="media-1",
                original_filename="voice.m4a",
                extracted_text="The soup was rich",
                media_type="audio",
                mime_type="audio/mp4",
            ),
            SimpleNamespace(
                id="media-2",
                original_filename="empty.txt",
                extracted_text="   ",
                media_type="text",
                mime_type="text/plain",
            ),
        ],
    )

    documents = build_record_documents(record)

    assert len(documents) == 2
    assert documents[0]["source_type"] == "record"
    assert documents[1]["source_type"] == "media"
    assert documents[1]["media_id"] == "media-1"
