from __future__ import annotations

from types import SimpleNamespace

from app.services.provider_transport import (
    infer_provider_transport_mode,
    resolve_provider_api_base_url,
    resolve_provider_secret,
)


def build_config(**overrides):
    payload = {
        "provider_code": "custom",
        "api_base_url": "https://example.test/api",
        "options_json": {},
        "api_key_env_name": "TEST_SECRET_ENV",
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


def test_resolve_provider_secret_reads_env_and_raises_when_missing(monkeypatch) -> None:
    monkeypatch.setattr("app.services.provider_transport.resolve_secret_env_name", lambda config: "TEST_SECRET_ENV")
    monkeypatch.setattr("app.services.provider_transport.read_secret_from_env_name", lambda env_name: "secret-value")
    assert resolve_provider_secret(build_config(), error_type=RuntimeError) == "secret-value"

    monkeypatch.setattr("app.services.provider_transport.read_secret_from_env_name", lambda env_name: None)
    try:
        resolve_provider_secret(build_config(), error_type=RuntimeError)
    except RuntimeError as exc:
        assert "TEST_SECRET_ENV" in str(exc)
    else:
        raise AssertionError("Expected missing secret error")


def test_infer_provider_transport_mode_supports_custom_and_local_paths() -> None:
    assert infer_provider_transport_mode(build_config(provider_code="openai")) == "openai_compatible"
    assert infer_provider_transport_mode(build_config(api_base_url="https://example.test/v1")) == "openai_compatible"
    assert infer_provider_transport_mode(build_config(api_base_url="https://example.test/webhook")) == "webhook_json"
    assert infer_provider_transport_mode(build_config(provider_code="local"), local_provider_mode="local") == "local"
