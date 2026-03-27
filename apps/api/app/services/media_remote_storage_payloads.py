from __future__ import annotations

from typing import Any

from app.services.media_remote_storage_contract import WEBHOOK_CONTRACT_VERSION
from app.services.provider_configs import ProviderFeatureConfig


MAX_REMOTE_STORAGE_KEY_LENGTH = 1024
MAX_METADATA_DEPTH = 4
MAX_METADATA_COLLECTION_ITEMS = 64


def is_enabled_option(value: object) -> bool:
    if isinstance(value, bool):
        return value
    if isinstance(value, (int, float)):
        return bool(value)
    if isinstance(value, str):
        normalized = value.strip().lower()
        return normalized in {"true", "1", "yes", "enabled", "on"}
    return False


def fallback_to_local_on_upload_failure_enabled(
    config: ProviderFeatureConfig,
) -> bool:
    return is_enabled_option(
        (config.options_json or {}).get("fallback_to_local_on_upload_failure")
    )


def coerce_remote_storage_key(value: object) -> str:
    storage_key = str(value or "").strip()
    if not storage_key:
        raise RuntimeError("Remote media upload response is missing storage_key")
    if len(storage_key) > MAX_REMOTE_STORAGE_KEY_LENGTH:
        raise RuntimeError("Remote media upload response storage_key is too long")
    if any(ord(char) < 32 for char in storage_key):
        raise RuntimeError(
            "Remote media upload response storage_key contains control characters"
        )
    return storage_key


def coerce_remote_size_bytes(value: object, *, fallback: int) -> int:
    if value is None or value == "":
        return fallback
    try:
        size_bytes = int(value)
    except (TypeError, ValueError) as exc:
        raise RuntimeError(
            "Remote media upload response size_bytes must be an integer"
        ) from exc
    if size_bytes < 0:
        raise RuntimeError(
            "Remote media upload response size_bytes must be non-negative"
        )
    return size_bytes


def sanitize_remote_metadata_value(value: Any, *, depth: int = 0) -> Any:
    if depth >= MAX_METADATA_DEPTH:
        return str(value)
    if value is None or isinstance(value, (str, int, float, bool)):
        return value
    if isinstance(value, dict):
        sanitized: dict[str, Any] = {}
        for index, (key, item) in enumerate(value.items()):
            if index >= MAX_METADATA_COLLECTION_ITEMS:
                break
            normalized_key = str(key).strip()
            if not normalized_key or any(ord(char) < 32 for char in normalized_key):
                continue
            sanitized[normalized_key] = sanitize_remote_metadata_value(
                item, depth=depth + 1
            )
        return sanitized
    if isinstance(value, list):
        return [
            sanitize_remote_metadata_value(item, depth=depth + 1)
            for item in value[:MAX_METADATA_COLLECTION_ITEMS]
        ]
    return str(value)


def build_remote_upload_metadata(payload: dict, response: Any) -> dict:
    metadata_json = payload.get("metadata_json")
    sanitized_metadata = (
        sanitize_remote_metadata_value(metadata_json)
        if isinstance(metadata_json, dict)
        else {}
    )
    if not isinstance(sanitized_metadata, dict):
        sanitized_metadata = {}

    provider_asset_id = str(payload.get("provider_asset_id") or "").strip()
    if provider_asset_id:
        sanitized_metadata["provider_asset_id"] = provider_asset_id

    request_id = str(
        response.headers.get("x-request-id")
        or response.headers.get("x-amzn-requestid")
        or ""
    ).strip()
    if request_id:
        sanitized_metadata["webhook_request_id"] = request_id

    sanitized_metadata["remote_storage_mode"] = "custom_webhook"
    sanitized_metadata["remote_contract_version"] = WEBHOOK_CONTRACT_VERSION
    return sanitized_metadata
