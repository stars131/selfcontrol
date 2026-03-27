from __future__ import annotations

import re

from app.core.config import settings
from app.models.record import Record


TOKEN_PATTERN = re.compile(r"[A-Za-z0-9]+|[\u4e00-\u9fff]")
SNIPPET_LENGTH = 180


def normalize_text(value: str | None) -> str:
    return " ".join((value or "").split()).strip()


def tokenize(value: str) -> list[str]:
    return TOKEN_PATTERN.findall((value or "").lower())


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
