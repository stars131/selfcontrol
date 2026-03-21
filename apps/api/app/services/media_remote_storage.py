from __future__ import annotations

from dataclasses import dataclass

import httpx
from sqlalchemy.orm import Session

from app.core.config import settings
from app.models.media import MediaAsset
from app.services.media_provider import DeferredMediaProcessingError, get_secret_for_provider
from app.services.provider_configs import ProviderFeatureConfig, get_effective_provider_config


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


def _build_custom_headers(config: ProviderFeatureConfig) -> dict[str, str]:
    headers = {"Accept": "application/json"}
    secret = get_secret_for_provider(config)
    if secret:
        headers["Authorization"] = f"Bearer {secret}"
    return headers


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
    async with httpx.AsyncClient(timeout=settings.provider_request_timeout_seconds) as client:
        response = await client.post(
            upload_url,
            headers=_build_custom_headers(config),
            data={"workspace_id": workspace_id, "record_id": record_id},
            files={"file": (filename, content, mime_type)},
        )
    if response.status_code >= 400:
        raise RuntimeError(f"Remote media upload failed with status {response.status_code}")

    try:
        payload = response.json()
    except ValueError as exc:
        raise RuntimeError("Remote media upload returned invalid JSON") from exc

    storage_key = str(payload.get("storage_key") or "").strip()
    if not storage_key:
        raise RuntimeError("Remote media upload response is missing storage_key")

    metadata_json = payload.get("metadata_json") if isinstance(payload.get("metadata_json"), dict) else {}
    return RemoteMediaUploadResult(
        storage_provider="custom",
        storage_key=storage_key,
        size_bytes=int(payload.get("size_bytes") or len(content)),
        metadata_json={
            **metadata_json,
            "remote_storage_mode": "custom_webhook",
        },
    )


def _perform_custom_download(config: ProviderFeatureConfig, *, storage_key: str) -> RemoteMediaContentResult:
    if not config.api_base_url:
        raise DeferredMediaProcessingError("Custom media storage provider requires an API base URL")

    content_url = f"{config.api_base_url.rstrip('/')}/media/content"
    with httpx.Client(timeout=settings.provider_request_timeout_seconds) as client:
        response = client.get(
            content_url,
            headers=_build_custom_headers(config),
            params={"storage_key": storage_key},
        )
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
    with httpx.Client(timeout=settings.provider_request_timeout_seconds) as client:
        response = client.post(
            delete_url,
            headers=_build_custom_headers(config),
            json={"storage_key": storage_key},
        )
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


def delete_remote_media_via_provider(db: Session, media: MediaAsset) -> None:
    config = _get_media_storage_config(db, media.workspace_id)
    if config.provider_code != media.storage_provider:
        raise DeferredMediaProcessingError("Remote media provider configuration does not match the stored asset")
    if media.storage_provider != "custom":
        raise DeferredMediaProcessingError(f"Unsupported media storage provider: {media.storage_provider}")
    _perform_custom_delete(config, storage_key=media.storage_key)
