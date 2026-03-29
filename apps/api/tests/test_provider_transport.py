from __future__ import annotations

from types import SimpleNamespace

from app.services.provider_transport import (
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


def test_resolve_provider_secret_returns_none_when_no_env_name_is_required(monkeypatch) -> None:
    monkeypatch.setattr("app.services.provider_transport.resolve_secret_env_name", lambda config: None)
    monkeypatch.setattr(
        "app.services.provider_transport.read_secret_from_env_name",
        lambda env_name: (_ for _ in ()).throw(RuntimeError("should not read env")),
    )

    assert resolve_provider_secret(build_config(api_key_env_name=None), error_type=RuntimeError) is None


def test_resolve_provider_secret_uses_resolved_default_env_name(monkeypatch) -> None:
    observed_env_names: list[str] = []

    monkeypatch.setattr("app.services.provider_transport.resolve_secret_env_name", lambda config: "OPENAI_API_KEY")
    monkeypatch.setattr(
        "app.services.provider_transport.read_secret_from_env_name",
        lambda env_name: observed_env_names.append(env_name) or "resolved-secret",
    )

    secret = resolve_provider_secret(
        build_config(provider_code="openai", api_key_env_name=None),
        error_type=RuntimeError,
    )

    assert secret == "resolved-secret"
    assert observed_env_names == ["OPENAI_API_KEY"]
