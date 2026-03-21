from __future__ import annotations

from dataclasses import dataclass
import tempfile
from pathlib import Path
import time
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


@dataclass
class MediaStorageProviderHealthResult:
    feature_code: str
    provider_code: str
    is_enabled: bool
    status: str
    reachable: bool | None
    checked_at: str
    api_base_url: str | None
    message: str
    contract_version: str
    secret_status: str
    service_status: str | None
    service_name: str | None
    service_version: str | None
    response_time_ms: int | None
    capabilities: dict[str, bool]
    warnings: list[str]

    def to_dict(self) -> dict[str, Any]:
        return {
            "feature_code": self.feature_code,
            "provider_code": self.provider_code,
            "is_enabled": self.is_enabled,
            "status": self.status,
            "reachable": self.reachable,
            "checked_at": self.checked_at,
            "api_base_url": self.api_base_url,
            "message": self.message,
            "contract_version": self.contract_version,
            "secret_status": self.secret_status,
            "service_status": self.service_status,
            "service_name": self.service_name,
            "service_version": self.service_version,
            "response_time_ms": self.response_time_ms,
            "capabilities": self.capabilities,
            "warnings": self.warnings,
        }


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


def _is_enabled_option(value: object) -> bool:
    if isinstance(value, bool):
        return value
    if isinstance(value, (int, float)):
        return bool(value)
    if isinstance(value, str):
        normalized = value.strip().lower()
        return normalized in {"true", "1", "yes", "enabled", "on"}
    return False


def _fallback_to_local_on_upload_failure_enabled(config: ProviderFeatureConfig) -> bool:
    return _is_enabled_option((config.options_json or {}).get("fallback_to_local_on_upload_failure"))


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


def _now_iso() -> str:
    return time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())


def _parse_capability_flag(value: object, *, default: bool) -> bool:
    if value is None:
        return default
    if isinstance(value, bool):
        return value
    if isinstance(value, (int, float)):
        return bool(value)
    if isinstance(value, str):
        normalized = value.strip().lower()
        if normalized in {"true", "1", "yes", "enabled", "ok", "ready"}:
            return True
        if normalized in {"false", "0", "no", "disabled", "off"}:
            return False
    return default


def get_media_storage_provider_health(db: Session, workspace_id: str) -> MediaStorageProviderHealthResult:
    config = _get_media_storage_config(db, workspace_id)
    base_result = MediaStorageProviderHealthResult(
        feature_code="media_storage",
        provider_code=config.provider_code,
        is_enabled=config.is_enabled,
        status="unknown",
        reachable=None,
        checked_at=_now_iso(),
        api_base_url=config.api_base_url,
        message="",
        contract_version=WEBHOOK_CONTRACT_VERSION,
        secret_status=config.secret_status,
        service_status=None,
        service_name=None,
        service_version=None,
        response_time_ms=None,
        capabilities={"upload": False, "download": False, "delete": False},
        warnings=list(config.config_warnings),
    )

    if not config.is_enabled:
        base_result.status = "disabled"
        base_result.message = "Media storage provider is disabled"
        return base_result

    if config.provider_code in {"", "local"}:
        base_result.status = "ready"
        base_result.reachable = True
        base_result.message = "Local disk media storage is active"
        base_result.capabilities = {"upload": True, "download": True, "delete": True}
        base_result.service_status = "ready"
        base_result.service_name = "local-disk"
        return base_result

    if config.provider_code != "custom":
        base_result.status = "unsupported"
        base_result.message = f"Unsupported media storage provider: {config.provider_code}"
        return base_result

    if not config.api_base_url:
        base_result.status = "misconfigured"
        base_result.message = "Custom media storage provider requires an API base URL"
        return base_result

    if config.requires_secret and config.secret_status != "configured":
        base_result.status = "misconfigured"
        base_result.message = "Server-side media storage secret is not configured"
        return base_result

    health_url = f"{config.api_base_url.rstrip('/')}/media/health"
    request_started = time.perf_counter()
    try:
        with httpx.Client(timeout=settings.provider_request_timeout_seconds) as client:
            response = client.get(
                health_url,
                headers=_build_custom_headers(config, operation="health", accept="application/json"),
                params={"contract_version": WEBHOOK_CONTRACT_VERSION},
            )
    except httpx.HTTPError as exc:
        base_result.status = "unreachable"
        base_result.reachable = False
        base_result.message = str(_raise_transport_error("health check", exc))
        return base_result

    base_result.response_time_ms = int((time.perf_counter() - request_started) * 1000)

    if response.status_code == 404:
        base_result.status = "unsupported"
        base_result.reachable = False
        base_result.message = "Remote media health endpoint is not implemented"
        return base_result
    if response.status_code >= 400:
        base_result.status = "unhealthy"
        base_result.reachable = False
        base_result.message = f"Remote media health check failed with status {response.status_code}"
        return base_result

    try:
        payload = response.json()
    except ValueError:
        base_result.status = "unhealthy"
        base_result.reachable = True
        base_result.message = "Remote media health endpoint returned invalid JSON"
        return base_result

    if not isinstance(payload, dict):
        base_result.status = "unhealthy"
        base_result.reachable = True
        base_result.message = "Remote media health endpoint returned an invalid JSON object"
        return base_result

    capabilities = payload.get("capabilities") if isinstance(payload.get("capabilities"), dict) else {}
    base_result.reachable = True
    base_result.service_status = str(payload.get("status") or "ok").strip().lower() or "ok"
    base_result.service_name = str(payload.get("service_name") or "").strip() or None
    base_result.service_version = str(payload.get("service_version") or "").strip() or None
    base_result.capabilities = {
        "upload": _parse_capability_flag(capabilities.get("upload"), default=True),
        "download": _parse_capability_flag(capabilities.get("download"), default=True),
        "delete": _parse_capability_flag(capabilities.get("delete"), default=True),
    }

    returned_contract = str(payload.get("contract_version") or "").strip()
    if returned_contract and returned_contract != WEBHOOK_CONTRACT_VERSION:
        base_result.warnings.append(
            f"Remote media health endpoint returned contract {returned_contract}, expected {WEBHOOK_CONTRACT_VERSION}"
        )

    base_result.status = "ready" if base_result.service_status in {"ok", "ready"} else "degraded"
    base_result.message = str(payload.get("message") or "").strip() or (
        "Remote media storage is reachable"
        if base_result.status == "ready"
        else "Remote media storage reported degraded capability"
    )
    return base_result


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
    config = _get_media_storage_config(db, workspace_id)
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
        if not _fallback_to_local_on_upload_failure_enabled(config):
            raise
        return RemoteMediaUploadAttemptResult(
            remote_upload=None,
            fallback_used=True,
            fallback_reason=str(exc),
            fallback_provider=config.provider_code,
            fallback_at=_now_iso(),
        )
    return RemoteMediaUploadAttemptResult(remote_upload=remote_upload, fallback_used=False)


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
