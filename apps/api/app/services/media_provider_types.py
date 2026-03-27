from __future__ import annotations

from dataclasses import dataclass


class DeferredMediaProcessingError(Exception):
    pass


@dataclass
class MediaProviderExtractionResult:
    text: str
    extraction_mode: str
    provider_code: str
    feature_code: str
    model_name: str | None
    metadata_json: dict
