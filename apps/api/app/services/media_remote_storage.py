from __future__ import annotations

from dataclasses import dataclass
import tempfile
from pathlib import Path
from typing import Any

import httpx
from sqlalchemy.orm import Session

from app.core.config import settings
from app.models.media import MediaAsset
from app.services.media_provider import DeferredMediaProcessingError, get_secret_for_provider
from app.services.provider_configs import ProviderFeatureConfig, get_effective_provider_config

WEBHOOK_CONTRACT_VERSION = "selfcontrol-media-storage-v1"
MAX_REMOTE_STORAGE_KEY_LENGTH = 1024
MAX_METADATA_DEPTH = 4
MAX_METADATA_COLLECTION_ITEMS = 64


@dataclass
class RemoteMediaUploadResult:
    storage_provider: str
    storage_key: str
    size_bytes: int
    metadata_json: dict


@dataclass
class RemoteMediaContentResult:
    content: bytes
    media_type: str | None


def _get_media_storage_config(db: Session, workspace_id: str) -> ProviderFeatureConfig:
    return get_effective_provider_config(db, workspace_id, "media_storage")


def _build_custom_headers(
    config: ProviderFeatureConfig,
    *,
    operation: str,
    accept: str,
) -> dict[str, str]:
    headers = {
        "Accept": accept,
        "X-SelfControl-Media-Storage-Contract": WEBHOOK_CONTRACT_VERSION,
        "X-SelfControl-Media-Storage-Operation": operation,
    }
    secret = get_secret_for_provider(config)
    if secret:
        headers["Authorization"] = f"Bearer {secret}"
    return headers


def _coerce_remote_storage_key(value: object) -> str:
    storage_key = str(value or "").strip()
    if not storage_key:
        raise RuntimeError("Remote media upload response is missing storage_key")
    if len(storage_key) > MAX_REMOTE_STORAGE_KEY_LENGTH:
        raise RuntimeError("Remote media upload response storage_key is too long")
    if any(ord(char) < 32 for char in storage_key):
        raise RuntimeError("Remote media upload response storage_key contains control characters")
    return storage_key


def _coerce_remote_size_bytes(value: object, *, fallback: int) -> int:
    if value is None or value == "":
        return fallback
    try:
        size_bytes = int(value)
    except (TypeError, ValueError) as exc:
        raise RuntimeError("Remote media upload response size_bytes must be an integer") from exc
    if size_bytes < 0:
        raise RuntimeError("Remote media upload response size_bytes must be non-negative")
    return size_bytes


def _sanitize_metadata_value(value: Any, *, depth: int = 0) -> Any:
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
            sanitized[normalized_key] = _sanitize_metadata_value(item, depth=depth + 1)
        return sanitized
    if isinstance(value, list):
        return [
            _sanitize_metadata_value(item, depth=depth + 1)
            for item in value[:MAX_METADATA_COLLECTION_ITEMS]
        ]
    return str(value)


def _build_upload_metadata(payload: dict, response: Any) -> dict:
    metadata_json = payload.get("metadata_json")
    sanitized_metadata = _sanitize_metadata_value(metadata_json) if isinstance(metadata_json, dict) else {}
    if not isinstance(sanitized_metadata, dict):
        sanitized_metadata = {}

    provider_asset_id = str(payload.get("provider_asset_id") or "").strip()
    if provider_asset_id:
        sanitized_metadata["provider_asset_id"] = provider_asset_id

    request_id = str(response.headers.get("x-request-id") or response.headers.get("x-amzn-requestid") or "").strip()
    if request_id:
        sanitized_metadata["webhook_request_id"] = request_id

    sanitized_metadata["remote_storage_mode"] = "custom_webhook"
    sanitized_metadata["remote_contract_version"] = WEBHOOK_CONTRACT_VERSION
    return sanitized_metadata


def _raise_transport_error(operation: str, exc: httpx.HTTPError) -> RuntimeError:
    if isinstance(exc, httpx.TimeoutException):
        return RuntimeError(f"Remote media {operation} timed out")
    return RuntimeError(f"Remote media {operation} request failed")


async def _perform_custom_upload(
    config: ProviderFeatureConfig,
    *,
    workspace_id: str,
    record_id: str,
    filename: str,
    mime_type: str,
    content: bytes,
) -> RemoteMediaUploadResult:
    if not config.api_base_url:
        raise DeferredMediaProcessingError("Custom media storage provider requires an API base URL")

    upload_url = f"{config.api_base_url.rstrip('/')}/media/upload"
    try:
        async with httpx.AsyncClient(timeout=settings.provider_request_timeout_seconds) as client:
            response = await client.post(
                upload_url,
                headers=_build_custom_headers(config, operation="upload", accept="application/json"),
                data={
                    "workspace_id": workspace_id,
                    "record_id": record_id,
                    "contract_version": WEBHOOK_CONTRACT_VERSION,
                },
                files={"file": (filename, content, mime_type)},
            )
    except httpx.HTTPError as exc:
        raise _raise_transport_error("upload", exc) from exc
    if response.status_code >= 400:
        raise RuntimeError(f"Remote media upload failed with status {response.status_code}")

    try:
        payload = response.json()
    except ValueError as exc:
        raise RuntimeError("Remote media upload returned invalid JSON") from exc
    if not isinstance(payload, dict):
        raise RuntimeError("Remote media upload returned an invalid JSON object")

    storage_key = _coerce_remote_storage_key(payload.get("storage_key"))
    size_bytes = _coerce_remote_size_bytes(payload.get("size_bytes"), fallback=len(content))
    return RemoteMediaUploadResult(
        storage_provider="custom",
        storage_key=storage_key,
        size_bytes=size_bytes,
        metadata_json=_build_upload_metadata(payload, response),
    )


def _perform_custom_download(config: ProviderFeatureConfig, *, storage_key: str) -> RemoteMediaContentResult:
    if not config.api_base_url:
        raise DeferredMediaProcessingError("Custom media storage provider requires an API base URL")

    content_url = f"{config.api_base_url.rstrip('/')}/media/content"
    try:
        with httpx.Client(timeout=settings.provider_request_timeout_seconds) as client:
            response = client.get(
                content_url,
                headers=_build_custom_headers(config, operation="download", accept="*/*"),
                params={
                    "storage_key": storage_key,
                    "contract_version": WEBHOOK_CONTRACT_VERSION,
                },
            )
    except httpx.HTTPError as exc:
        raise _raise_transport_error("download", exc) from exc
    if response.status_code == 404:
        raise FileNotFoundError("Remote media content was not found")
    if response.status_code >= 400:
        raise RuntimeError(f"Remote media download failed with status {response.status_code}")
    return RemoteMediaContentResult(
        content=response.content,
        media_type=response.headers.get("content-type"),
    )


def _perform_custom_delete(config: ProviderFeatureConfig, *, storage_key: str) -> None:
    if not config.api_base_url:
        raise DeferredMediaProcessingError("Custom media storage provider requires an API base URL")

    delete_url = f"{config.api_base_url.rstrip('/')}/media/delete"
    try:
        with httpx.Client(timeout=settings.provider_request_timeout_seconds) as client:
            response = client.post(
                delete_url,
                headers=_build_custom_headers(config, operation="delete", accept="application/json"),
                json={
                    "storage_key": storage_key,
                    "contract_version": WEBHOOK_CONTRACT_VERSION,
                },
            )
    except httpx.HTTPError as exc:
        raise _raise_transport_error("delete", exc) from exc
    if response.status_code == 404:
        return
    if response.status_code >= 400:
        raise RuntimeError(f"Remote media delete failed with status {response.status_code}")


async def upload_media_via_provider(
    db: Session,
    *,
    workspace_id: str,
    record_id: str,
    filename: str,
    mime_type: str,
    content: bytes,
) -> RemoteMediaUploadResult | None:
    config = _get_media_storage_config(db, workspace_id)
    if not config.is_enabled or config.provider_code in {"", "none", "local"}:
        return None
    if config.provider_code != "custom":
        raise DeferredMediaProcessingError(f"Unsupported media storage provider: {config.provider_code}")
    return await _perform_custom_upload(
        config,
        workspace_id=workspace_id,
        record_id=record_id,
        filename=filename,
        mime_type=mime_type,
        content=content,
    )


def download_remote_media_via_provider(db: Session, media: MediaAsset) -> RemoteMediaContentResult:
    config = _get_media_storage_config(db, media.workspace_id)
    if config.provider_code != media.storage_provider:
        raise DeferredMediaProcessingError("Remote media provider configuration does not match the stored asset")
    if media.storage_provider != "custom":
        raise DeferredMediaProcessingError(f"Unsupported media storage provider: {media.storage_provider}")
    return _perform_custom_download(config, storage_key=media.storage_key)


def download_remote_media_to_temp_file(db: Session, media: MediaAsset) -> Path:
    content_result = download_remote_media_via_provider(db, media)
    tmp_dir = Path(settings.processing_tmp_dir)
    tmp_dir.mkdir(parents=True, exist_ok=True)
    suffix = Path(media.original_filename or "").suffix or ".bin"
    with tempfile.NamedTemporaryFile(
        dir=tmp_dir,
        prefix=f"remote-media-{media.id}-",
        suffix=suffix,
        delete=False,
    ) as temp_file:
        temp_path = Path(temp_file.name)
        temp_file.write(content_result.content)
    return temp_path


def delete_remote_media_via_provider(db: Session, media: MediaAsset) -> None:
    config = _get_media_storage_config(db, media.workspace_id)
    if config.provider_code != media.storage_provider:
        raise DeferredMediaProcessingError("Remote media provider configuration does not match the stored asset")
    if media.storage_provider != "custom":
        raise DeferredMediaProcessingError(f"Unsupported media storage provider: {media.storage_provider}")
    _perform_custom_delete(config, storage_key=media.storage_key)
