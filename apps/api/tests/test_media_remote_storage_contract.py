from __future__ import annotations

from types import SimpleNamespace

import httpx

from app.services.media_remote_storage_contract import (
    WEBHOOK_CONTRACT_VERSION,
    build_media_storage_webhook_headers,
    now_utc_iso,
    raise_media_storage_transport_error,
)


def build_config(**overrides):
    payload = {
        "provider_code": "custom",
        "api_base_url": "https://storage.example.test/api",
        "options_json": {},
        "api_key_env_name": "REMOTE_MEDIA_STORAGE_KEY",
    }
    payload.update(overrides)
    return SimpleNamespace(**payload)


def test_build_media_storage_webhook_headers_includes_contract_and_authorization(
    monkeypatch,
) -> None:
    monkeypatch.setattr(
        "app.services.media_remote_storage_contract.resolve_provider_secret",
        lambda config, *, error_type: "secret-value",
    )

    headers = build_media_storage_webhook_headers(
        build_config(),
        operation="upload",
        accept="application/json",
        error_type=RuntimeError,
    )

    assert headers == {
        "Accept": "application/json",
        "X-SelfControl-Media-Storage-Contract": WEBHOOK_CONTRACT_VERSION,
        "X-SelfControl-Media-Storage-Operation": "upload",
        "Authorization": "Bearer secret-value",
    }


def test_raise_media_storage_transport_error_maps_timeout_and_generic_errors() -> None:
    request = httpx.Request("GET", "https://storage.example.test/api")

    timeout_error = raise_media_storage_transport_error(
        "download", httpx.TimeoutException("timed out", request=request)
    )
    generic_error = raise_media_storage_transport_error(
        "upload", httpx.NetworkError("boom", request=request)
    )

    assert str(timeout_error) == "Remote media download timed out"
    assert str(generic_error) == "Remote media upload request failed"


def test_now_utc_iso_returns_utc_timestamp_shape() -> None:
    value = now_utc_iso()

    assert len(value) == 20
    assert value.endswith("Z")
    assert value[4] == "-"
    assert value[7] == "-"
