from __future__ import annotations

import time

import httpx
from sqlalchemy.orm import Session

from app.services.provider_configs import ProviderFeatureConfig, get_effective_provider_config
from app.services.provider_transport import resolve_provider_secret


WEBHOOK_CONTRACT_VERSION = "selfcontrol-media-storage-v1"


def get_media_storage_provider_config(
    db: Session, workspace_id: str
) -> ProviderFeatureConfig:
    return get_effective_provider_config(db, workspace_id, "media_storage")


def build_media_storage_webhook_headers(
    config: ProviderFeatureConfig,
    *,
    operation: str,
    accept: str,
    error_type: type[Exception],
) -> dict[str, str]:
    headers = {
        "Accept": accept,
        "X-SelfControl-Media-Storage-Contract": WEBHOOK_CONTRACT_VERSION,
        "X-SelfControl-Media-Storage-Operation": operation,
    }
    secret = resolve_provider_secret(config, error_type=error_type)
    if secret:
        headers["Authorization"] = f"Bearer {secret}"
    return headers


def raise_media_storage_transport_error(
    operation: str, exc: httpx.HTTPError
) -> RuntimeError:
    if isinstance(exc, httpx.TimeoutException):
        return RuntimeError(f"Remote media {operation} timed out")
    return RuntimeError(f"Remote media {operation} request failed")


def now_utc_iso() -> str:
    return time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
