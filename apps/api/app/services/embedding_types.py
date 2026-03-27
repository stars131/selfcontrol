from __future__ import annotations

from dataclasses import dataclass


class EmbeddingProviderError(Exception):
    pass


@dataclass
class EmbeddingResult:
    vector: list[float]
    provider_code: str
    model_name: str
    dimensions: int
    metadata_json: dict
