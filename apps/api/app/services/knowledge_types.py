from __future__ import annotations

from dataclasses import asdict, dataclass


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
