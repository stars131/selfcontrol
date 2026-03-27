from __future__ import annotations

from app.core.config import settings
from app.services.provider_config_defaults import (
    build_default_feature_config,
    resolve_provider_config_secret_env_name,
)
from app.services.provider_config_types import ProviderFeatureConfig


def test_build_default_feature_config_enables_builtin_chat_generation() -> None:
    config = build_default_feature_config("chat_generation")

    assert config.feature_code == "chat_generation"
    assert config.provider_code == "builtin"
    assert config.model_name == "rules-v1"
    assert config.is_enabled is True
    assert config.requires_secret is False
    assert config.secret_status == "not_required"


def test_build_default_feature_config_uses_runtime_media_storage_retry_defaults() -> None:
    original_attempts = settings.remote_media_retry_max_attempts
    original_backoff = list(settings.remote_media_retry_backoff_seconds)
    try:
        settings.remote_media_retry_max_attempts = 4
        settings.remote_media_retry_backoff_seconds = [15, 60, 300]

        config = build_default_feature_config("media_storage")

        assert config.provider_code == "local"
        assert config.model_name == "disk-v1"
        assert config.is_enabled is True
        assert config.options_json == {
            "fallback_to_local_on_upload_failure": False,
            "auto_retry_enabled": True,
            "remote_retry_max_attempts": 4,
            "remote_retry_backoff_seconds": [15, 60, 300],
        }
    finally:
        settings.remote_media_retry_max_attempts = original_attempts
        settings.remote_media_retry_backoff_seconds = original_backoff


def test_resolve_provider_config_secret_env_name_prefers_explicit_env_name() -> None:
    config = ProviderFeatureConfig(
        feature_code="image_ocr",
        feature_label="Image OCR",
        feature_description="Extract text from images.",
        providers=["none", "openai"],
        provider_code="openai",
        model_name="gpt-4o-mini",
        is_enabled=True,
        api_base_url="https://api.openai.com/v1",
        api_key_env_name="custom_openai_key",
        options_json={},
        is_default=False,
        updated_at=None,
        requires_secret=True,
        secret_env_name=None,
        secret_status="missing",
        config_warnings=[],
    )

    assert resolve_provider_config_secret_env_name(config) == "CUSTOM_OPENAI_KEY"
