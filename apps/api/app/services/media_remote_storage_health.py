from __future__ import annotations

from dataclasses import dataclass
import time
from typing import Any

import httpx
from sqlalchemy.orm import Session

from app.core.config import settings
from app.services.media_remote_storage_contract import (
    WEBHOOK_CONTRACT_VERSION,
    build_media_storage_webhook_headers,
    get_media_storage_provider_config,
    now_utc_iso,
    raise_media_storage_transport_error,
)
from app.services.provider_configs import ProviderFeatureConfig


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
        error_type=RuntimeError,
    )


def _now_iso() -> str:
    return now_utc_iso()


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
    config = get_media_storage_provider_config(db, workspace_id)
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
        base_result.message = str(
            raise_media_storage_transport_error("health check", exc)
        )
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
