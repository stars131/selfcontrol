from __future__ import annotations

from app.core.config import settings
from app.services.provider_config_validation import (
    MAX_MEDIA_STORAGE_BACKOFF_ITEMS,
    build_config_warnings,
    normalize_api_base_url,
    normalize_api_key_env_name,
    normalize_media_storage_options,
    resolve_secret_status,
    validate_feature_specific_provider_config,
)


def test_normalize_api_key_env_name_rejects_public_prefix_and_normalizes_case() -> None:
    assert normalize_api_key_env_name(" openai_api_key ") == "OPENAI_API_KEY"

    try:
        normalize_api_key_env_name("NEXT_PUBLIC_OPENAI_KEY")
    except ValueError as exc:
        assert "NEXT_PUBLIC_" in str(exc)
    else:
        raise AssertionError("Expected NEXT_PUBLIC_ env name to be rejected")


def test_normalize_api_base_url_rejects_credentials_and_query_fragments() -> None:
    assert normalize_api_base_url(" https://api.openai.com/v1/ ") == "https://api.openai.com/v1"

    for value, message in [
        ("https://user:pass@example.com/hook", "must not embed credentials"),
        ("https://example.com/hook?debug=1", "must not include query strings or fragments"),
        ("ftp://example.com/hook", "must start with http:// or https://"),
    ]:
        try:
            normalize_api_base_url(value)
        except ValueError as exc:
            assert message in str(exc)
        else:
            raise AssertionError(f"Expected URL to be rejected: {value}")


def test_normalize_media_storage_options_coerces_retry_flags_and_lists() -> None:
    normalized = normalize_media_storage_options(
        {
            "fallback_to_local_on_upload_failure": "enabled",
            "auto_retry_enabled": "off",
            "remote_retry_max_attempts": "5",
            "remote_retry_backoff_seconds": "15, 60,300",
        }
    )

    assert normalized["fallback_to_local_on_upload_failure"] is True
    assert normalized["auto_retry_enabled"] is False
    assert normalized["remote_retry_max_attempts"] == 5
    assert normalized["remote_retry_backoff_seconds"] == [15, 60, 300]

    try:
        normalize_media_storage_options(
            {"remote_retry_backoff_seconds": list(range(MAX_MEDIA_STORAGE_BACKOFF_ITEMS + 1))}
        )
    except ValueError as exc:
        assert "at most" in str(exc)
    else:
        raise AssertionError("Expected oversized backoff list to be rejected")


def test_resolve_secret_status_and_build_config_warnings_reflect_runtime_configuration(
    monkeypatch,
) -> None:
    monkeypatch.setenv("GOOGLE_API_KEY", "configured-secret")
    assert resolve_secret_status(provider_code="google", api_key_env_name=None) == (
        "configured",
        "GOOGLE_API_KEY",
    )
    assert resolve_secret_status(provider_code="amap", api_key_env_name=None) == (
        "not_required",
        None,
    )

    original_env = settings.app_env
    try:
        settings.app_env = "production"
        warnings = build_config_warnings(
            provider_code="custom",
            api_base_url="http://internal.example.test/api",
            requires_secret=True,
            secret_status="missing",
        )
    finally:
        settings.app_env = original_env

    assert warnings == [
        "Server-side secret is not configured for this provider",
        "Production providers should prefer HTTPS API endpoints",
    ]


def test_validate_feature_specific_provider_config_enforces_media_storage_service_root() -> None:
    validate_feature_specific_provider_config(
        feature_code="media_storage",
        provider_code="custom",
        is_enabled=False,
        api_base_url=None,
    )

    try:
        validate_feature_specific_provider_config(
            feature_code="media_storage",
            provider_code="custom",
            is_enabled=True,
            api_base_url="https://storage.example.test/api/media/upload",
        )
    except ValueError as exc:
        assert "service root" in str(exc)
    else:
        raise AssertionError("Expected endpoint suffix URL to be rejected")
