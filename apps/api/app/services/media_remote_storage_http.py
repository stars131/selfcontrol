from __future__ import annotations

import httpx

from app.core.config import settings
from app.services.media_provider import DeferredMediaProcessingError
from app.services.media_remote_storage_contract import (
    WEBHOOK_CONTRACT_VERSION,
    build_media_storage_webhook_headers,
    raise_media_storage_transport_error,
)
from app.services.media_remote_storage_payloads import (
    build_remote_upload_metadata,
    coerce_remote_size_bytes,
    coerce_remote_storage_key,
)
from app.services.media_remote_storage_types import (
    RemoteMediaContentResult,
    RemoteMediaUploadResult,
)
from app.services.provider_configs import ProviderFeatureConfig


def build_custom_media_storage_headers(
    config: ProviderFeatureConfig,
    *,
    operation: str,
    accept: str,
) -> dict[str, str]:
    return build_media_storage_webhook_headers(
        config,
        operation=operation,
        accept=accept,
        error_type=DeferredMediaProcessingError,
    )


async def perform_custom_media_upload(
    config: ProviderFeatureConfig,
    *,
    workspace_id: str,
    record_id: str,
    filename: str,
    mime_type: str,
    content: bytes,
) -> RemoteMediaUploadResult:
    if not config.api_base_url:
        raise DeferredMediaProcessingError(
            "Custom media storage provider requires an API base URL"
        )

    upload_url = f"{config.api_base_url.rstrip('/')}/media/upload"
    try:
        async with httpx.AsyncClient(
            timeout=settings.provider_request_timeout_seconds
        ) as client:
            response = await client.post(
                upload_url,
                headers=build_custom_media_storage_headers(
                    config, operation="upload", accept="application/json"
                ),
                data={
                    "workspace_id": workspace_id,
                    "record_id": record_id,
                    "contract_version": WEBHOOK_CONTRACT_VERSION,
                },
                files={"file": (filename, content, mime_type)},
            )
    except httpx.HTTPError as exc:
        raise raise_media_storage_transport_error("upload", exc) from exc
    if response.status_code >= 400:
        raise RuntimeError(f"Remote media upload failed with status {response.status_code}")

    try:
        payload = response.json()
    except ValueError as exc:
        raise RuntimeError("Remote media upload returned invalid JSON") from exc
    if not isinstance(payload, dict):
        raise RuntimeError("Remote media upload returned an invalid JSON object")

    storage_key = coerce_remote_storage_key(payload.get("storage_key"))
    size_bytes = coerce_remote_size_bytes(payload.get("size_bytes"), fallback=len(content))
    return RemoteMediaUploadResult(
        storage_provider="custom",
        storage_key=storage_key,
        size_bytes=size_bytes,
        metadata_json=build_remote_upload_metadata(payload, response),
    )


def perform_custom_media_download(
    config: ProviderFeatureConfig, *, storage_key: str
) -> RemoteMediaContentResult:
    if not config.api_base_url:
        raise DeferredMediaProcessingError(
            "Custom media storage provider requires an API base URL"
        )

    content_url = f"{config.api_base_url.rstrip('/')}/media/content"
    try:
        with httpx.Client(timeout=settings.provider_request_timeout_seconds) as client:
            response = client.get(
                content_url,
                headers=build_custom_media_storage_headers(
                    config, operation="download", accept="*/*"
                ),
                params={
                    "storage_key": storage_key,
                    "contract_version": WEBHOOK_CONTRACT_VERSION,
                },
            )
    except httpx.HTTPError as exc:
        raise raise_media_storage_transport_error("download", exc) from exc
    if response.status_code == 404:
        raise FileNotFoundError("Remote media content was not found")
    if response.status_code >= 400:
        raise RuntimeError(f"Remote media download failed with status {response.status_code}")
    return RemoteMediaContentResult(
        content=response.content,
        media_type=response.headers.get("content-type"),
    )


def perform_custom_media_delete(
    config: ProviderFeatureConfig, *, storage_key: str
) -> None:
    if not config.api_base_url:
        raise DeferredMediaProcessingError(
            "Custom media storage provider requires an API base URL"
        )

    delete_url = f"{config.api_base_url.rstrip('/')}/media/delete"
    try:
        with httpx.Client(timeout=settings.provider_request_timeout_seconds) as client:
            response = client.post(
                delete_url,
                headers=build_custom_media_storage_headers(
                    config, operation="delete", accept="application/json"
                ),
                json={
                    "storage_key": storage_key,
                    "contract_version": WEBHOOK_CONTRACT_VERSION,
                },
            )
    except httpx.HTTPError as exc:
        raise raise_media_storage_transport_error("delete", exc) from exc
    if response.status_code == 404:
        return
    if response.status_code >= 400:
        raise RuntimeError(f"Remote media delete failed with status {response.status_code}")
