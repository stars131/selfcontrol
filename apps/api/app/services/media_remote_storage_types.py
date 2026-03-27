from __future__ import annotations

from dataclasses import dataclass


@dataclass
class RemoteMediaUploadResult:
    storage_provider: str
    storage_key: str
    size_bytes: int
    metadata_json: dict


@dataclass
class RemoteMediaUploadAttemptResult:
    remote_upload: RemoteMediaUploadResult | None
    fallback_used: bool
    fallback_reason: str | None = None
    fallback_provider: str | None = None
    fallback_at: str | None = None


@dataclass
class RemoteMediaContentResult:
    content: bytes
    media_type: str | None
