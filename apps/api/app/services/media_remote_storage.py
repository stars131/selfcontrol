from __future__ import annotations

from dataclasses import dataclass
import tempfile
from pathlib import Path
import time

import httpx
from sqlalchemy.orm import Session

from app.core.config import settings
from app.models.media import MediaAsset
from app.services.media_provider import DeferredMediaProcessingError
from app.services.media_remote_storage_contract import (
    WEBHOOK_CONTRACT_VERSION,
    build_media_storage_webhook_headers,
    get_media_storage_provider_config,
    raise_media_storage_transport_error,
)
from app.services.media_remote_storage_payloads import (
    build_remote_upload_metadata,
    coerce_remote_size_bytes,
    coerce_remote_storage_key,
    fallback_to_local_on_upload_failure_enabled,
)
from app.services.provider_configs import ProviderFeatureConfig

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


def _build_custom_headers(
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
        raise raise_media_storage_transport_error("download", exc) from exc
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
        raise raise_media_storage_transport_error("delete", exc) from exc
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
    attempt = await attempt_media_upload_via_provider(
        db,
        workspace_id=workspace_id,
        record_id=record_id,
        filename=filename,
        mime_type=mime_type,
        content=content,
    )
    return attempt.remote_upload


async def attempt_media_upload_via_provider(
    db: Session,
    *,
    workspace_id: str,
    record_id: str,
    filename: str,
    mime_type: str,
    content: bytes,
) -> RemoteMediaUploadAttemptResult:
    config = get_media_storage_provider_config(db, workspace_id)
    if not config.is_enabled or config.provider_code in {"", "none", "local"}:
        return RemoteMediaUploadAttemptResult(remote_upload=None, fallback_used=False)
    if config.provider_code != "custom":
        raise DeferredMediaProcessingError(f"Unsupported media storage provider: {config.provider_code}")
    try:
        remote_upload = await _perform_custom_upload(
            config,
            workspace_id=workspace_id,
            record_id=record_id,
            filename=filename,
            mime_type=mime_type,
            content=content,
        )
    except RuntimeError as exc:
        if not fallback_to_local_on_upload_failure_enabled(config):
            raise
        return RemoteMediaUploadAttemptResult(
            remote_upload=None,
            fallback_used=True,
            fallback_reason=str(exc),
            fallback_provider=config.provider_code,
            fallback_at=time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
        )
    return RemoteMediaUploadAttemptResult(remote_upload=remote_upload, fallback_used=False)


def download_remote_media_via_provider(db: Session, media: MediaAsset) -> RemoteMediaContentResult:
    config = get_media_storage_provider_config(db, media.workspace_id)
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
    config = get_media_storage_provider_config(db, media.workspace_id)
    if config.provider_code != media.storage_provider:
        raise DeferredMediaProcessingError("Remote media provider configuration does not match the stored asset")
    if media.storage_provider != "custom":
        raise DeferredMediaProcessingError(f"Unsupported media storage provider: {media.storage_provider}")
    _perform_custom_delete(config, storage_key=media.storage_key)
