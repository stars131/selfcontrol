from __future__ import annotations

from types import SimpleNamespace

from app.core.config import settings
from app.services.embedding_types import EmbeddingProviderError, EmbeddingResult
from app.services.embeddings import embed_text_for_workspace
from app.services.provider_config_types import ProviderFeatureConfig


def build_embedding_config(**overrides) -> ProviderFeatureConfig:
    payload = {
        "feature_code": "embeddings",
        "feature_label": "Embeddings",
        "feature_description": "Knowledge chunks and semantic retrieval.",
        "providers": ["local", "openai", "custom"],
        "provider_code": "local",
        "model_name": "hash-embedding-v1",
        "is_enabled": True,
        "api_base_url": None,
        "api_key_env_name": None,
        "options_json": {},
        "is_default": False,
        "updated_at": None,
        "requires_secret": False,
        "secret_env_name": None,
        "secret_status": "not_required",
        "config_warnings": [],
    }
    payload.update(overrides)
    return ProviderFeatureConfig(**payload)


def test_embed_text_for_workspace_uses_local_embedding_mode(monkeypatch) -> None:
    original_dimensions = settings.embedding_dimensions
    try:
        settings.embedding_dimensions = 32
        monkeypatch.setattr(
            "app.services.embeddings.get_effective_provider_config",
            lambda db, workspace_id, feature_code: build_embedding_config(),
        )

        result = embed_text_for_workspace(SimpleNamespace(), "workspace-1", "hello world")

        assert result.provider_code == "local"
        assert result.model_name == "hash-embedding-v1"
        assert result.dimensions == 64
        assert result.metadata_json == {"transport_mode": "local"}
    finally:
        settings.embedding_dimensions = original_dimensions


def test_embed_text_for_workspace_routes_remote_transport(monkeypatch) -> None:
    monkeypatch.setattr(
        "app.services.embeddings.get_effective_provider_config",
        lambda db, workspace_id, feature_code: build_embedding_config(
            provider_code="openai",
            model_name="text-embedding-3-small",
            api_base_url="https://api.openai.com/v1",
            api_key_env_name="OPENAI_API_KEY",
            requires_secret=True,
            secret_env_name="OPENAI_API_KEY",
            secret_status="configured",
        ),
    )
    monkeypatch.setattr(
        "app.services.embeddings.request_openai_compatible_embedding",
        lambda config, value: EmbeddingResult(
            vector=[1.0],
            provider_code=config.provider_code,
            model_name=config.model_name or "fallback",
            dimensions=1,
            metadata_json={"transport_mode": "openai_compatible"},
        ),
    )

    result = embed_text_for_workspace(SimpleNamespace(), "workspace-1", "hello world")

    assert result.provider_code == "openai"
    assert result.metadata_json == {"transport_mode": "openai_compatible"}


def test_embed_text_for_workspace_rejects_disabled_or_unsupported_provider(monkeypatch) -> None:
    disabled_config = build_embedding_config(is_enabled=False)
    monkeypatch.setattr(
        "app.services.embeddings.get_effective_provider_config",
        lambda db, workspace_id, feature_code: disabled_config,
    )

    try:
        embed_text_for_workspace(SimpleNamespace(), "workspace-1", "hello world")
    except EmbeddingProviderError as exc:
        assert "disabled" in str(exc)
    else:
        raise AssertionError("Expected disabled embeddings provider to fail")

    unsupported_config = build_embedding_config(provider_code="google_maps")
    monkeypatch.setattr(
        "app.services.embeddings.get_effective_provider_config",
        lambda db, workspace_id, feature_code: unsupported_config,
    )

    try:
        embed_text_for_workspace(SimpleNamespace(), "workspace-1", "hello world")
    except EmbeddingProviderError as exc:
        assert "not supported yet" in str(exc)
    else:
        raise AssertionError("Expected unsupported embeddings provider to fail")
