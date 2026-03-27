from __future__ import annotations

from types import SimpleNamespace

from app.core.config import settings
from app.services.provider_config_merging import merge_provider_config


def test_merge_provider_config_resolves_default_embedding_secret_status(monkeypatch) -> None:
    original_provider = settings.embedding_provider
    original_model = settings.embedding_model
    try:
        settings.embedding_provider = "openai"
        settings.embedding_model = "text-embedding-3-small"
        monkeypatch.setenv("OPENAI_API_KEY", "test-secret")

        config = merge_provider_config(None, "embeddings")

        assert config.is_default is True
        assert config.provider_code == "openai"
        assert config.model_name == "text-embedding-3-small"
        assert config.secret_env_name == "OPENAI_API_KEY"
        assert config.secret_status == "configured"
        assert config.config_warnings == []
    finally:
        settings.embedding_provider = original_provider
        settings.embedding_model = original_model


def test_merge_provider_config_normalizes_saved_media_storage_options(monkeypatch) -> None:
    monkeypatch.setenv("REMOTE_MEDIA_STORAGE_KEY", "remote-secret")
    item = SimpleNamespace(
        workspace_id="workspace-1",
        feature_code="media_storage",
        provider_code="custom",
        model_name=None,
        is_enabled=True,
        api_base_url="https://storage.example.test/api",
        api_key_env_name="remote_media_storage_key",
        updated_at=None,
        options_json={
            "fallback_to_local_on_upload_failure": True,
            "remote_retry_max_attempts": "5",
            "remote_retry_backoff_seconds": "15,60",
        },
    )

    config = merge_provider_config(item, "media_storage")

    assert config.is_default is False
    assert config.provider_code == "custom"
    assert config.requires_secret is True
    assert config.secret_env_name == "REMOTE_MEDIA_STORAGE_KEY"
    assert config.secret_status == "configured"
    assert config.options_json["fallback_to_local_on_upload_failure"] is True
    assert config.options_json["auto_retry_enabled"] is True
    assert config.options_json["remote_retry_max_attempts"] == 5
    assert config.options_json["remote_retry_backoff_seconds"] == [15, 60]
    assert config.config_warnings == []


def test_merge_provider_config_reports_missing_secret_warning_for_saved_provider() -> None:
    item = SimpleNamespace(
        workspace_id="workspace-1",
        feature_code="image_ocr",
        provider_code="openai",
        model_name="gpt-4o-mini",
        is_enabled=True,
        api_base_url="https://api.openai.com/v1",
        api_key_env_name="OPENAI_API_KEY",
        updated_at=None,
        options_json={},
    )

    config = merge_provider_config(item, "image_ocr")

    assert config.is_default is False
    assert config.secret_env_name == "OPENAI_API_KEY"
    assert config.secret_status == "missing"
    assert config.config_warnings == ["Server-side secret is not configured for this provider"]
