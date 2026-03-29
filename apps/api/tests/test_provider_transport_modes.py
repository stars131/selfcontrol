from __future__ import annotations

from types import SimpleNamespace

from app.services.provider_transport_modes import infer_provider_transport_mode


def build_config(**overrides):
    payload = {
        "provider_code": "custom",
        "api_base_url": "https://example.test/api",
        "options_json": {},
    }
    payload.update(overrides)
    return SimpleNamespace(**payload)


def test_infer_provider_transport_mode_supports_explicit_custom_and_local_paths() -> None:
    assert infer_provider_transport_mode(
        build_config(options_json={"transport_mode": "openai_compatible"})
    ) == "openai_compatible"
    assert infer_provider_transport_mode(
        build_config(options_json={"transport_mode": "webhook_json"})
    ) == "webhook_json"
    assert infer_provider_transport_mode(build_config(provider_code="openai")) == "openai_compatible"
    assert infer_provider_transport_mode(build_config(api_base_url="https://example.test/v1")) == "openai_compatible"
    assert infer_provider_transport_mode(build_config(api_base_url="https://example.test/webhook")) == "webhook_json"
    assert infer_provider_transport_mode(build_config(provider_code="local"), local_provider_mode="local") == "local"


def test_infer_provider_transport_mode_returns_unsupported_for_unmapped_provider() -> None:
    assert infer_provider_transport_mode(build_config(provider_code="google_maps", api_base_url=None)) == "unsupported"
