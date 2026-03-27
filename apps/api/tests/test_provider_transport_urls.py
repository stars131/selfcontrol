from __future__ import annotations

from types import SimpleNamespace

from app.services.provider_transport_urls import resolve_provider_api_base_url


def build_config(**overrides):
    payload = {
        "provider_code": "custom",
        "api_base_url": "https://example.test/api",
    }
    payload.update(overrides)
    return SimpleNamespace(**payload)


def test_resolve_provider_api_base_url_uses_explicit_or_provider_defaults() -> None:
    assert resolve_provider_api_base_url(build_config(), error_type=RuntimeError) == "https://example.test/api"
    assert (
        resolve_provider_api_base_url(
            build_config(provider_code="openai", api_base_url=None),
            error_type=RuntimeError,
        )
        == "https://api.openai.com/v1"
    )
    assert (
        resolve_provider_api_base_url(
            build_config(provider_code="openrouter", api_base_url=None),
            error_type=RuntimeError,
        )
        == "https://openrouter.ai/api/v1"
    )
