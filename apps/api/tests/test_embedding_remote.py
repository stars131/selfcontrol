from __future__ import annotations

from app.services.embedding_remote import (
    DEFAULT_OPENAI_EMBEDDING_MODEL,
    infer_transport_mode,
    request_custom_webhook_embedding,
    request_openai_compatible_embedding,
)
from app.services.provider_config_types import ProviderFeatureConfig


def build_embedding_config(**overrides) -> ProviderFeatureConfig:
    payload = {
        "feature_code": "embeddings",
        "feature_label": "Embeddings",
        "feature_description": "Knowledge chunks and semantic retrieval.",
        "providers": ["local", "openai", "custom"],
        "provider_code": "openai",
        "model_name": None,
        "is_enabled": True,
        "api_base_url": "https://api.openai.com/v1",
        "api_key_env_name": "OPENAI_API_KEY",
        "options_json": {},
        "is_default": False,
        "updated_at": None,
        "requires_secret": True,
        "secret_env_name": "OPENAI_API_KEY",
        "secret_status": "configured",
        "config_warnings": [],
    }
    payload.update(overrides)
    return ProviderFeatureConfig(**payload)


def test_infer_transport_mode_supports_local_and_custom_variants() -> None:
    assert infer_transport_mode(build_embedding_config(provider_code="local")) == "local"
    assert infer_transport_mode(
        build_embedding_config(provider_code="custom", api_base_url="https://gateway.example.test/v1")
    ) == "openai_compatible"
    assert infer_transport_mode(
        build_embedding_config(provider_code="custom", api_base_url="https://gateway.example.test/embed")
    ) == "webhook_json"


def test_request_openai_compatible_embedding_normalizes_remote_vector(monkeypatch) -> None:
    monkeypatch.setenv("OPENAI_API_KEY", "test-secret")
    captured: dict = {}

    class FakeResponse:
        def raise_for_status(self) -> None:
            return None

        @staticmethod
        def json() -> dict:
            return {"data": [{"embedding": [3, 4]}]}

    def fake_post(url, *, headers, json, timeout):
        captured["url"] = url
        captured["headers"] = headers
        captured["json"] = json
        captured["timeout"] = timeout
        return FakeResponse()

    monkeypatch.setattr("app.services.embedding_remote.httpx.post", fake_post)

    result = request_openai_compatible_embedding(build_embedding_config(), "hello")

    assert captured["url"] == "https://api.openai.com/v1/embeddings"
    assert captured["headers"] == {"Authorization": "Bearer test-secret"}
    assert captured["json"] == {
        "model": DEFAULT_OPENAI_EMBEDDING_MODEL,
        "input": "hello",
        "encoding_format": "float",
    }
    assert result.vector == [0.6, 0.8]
    assert result.dimensions == 2
    assert result.metadata_json == {"transport_mode": "openai_compatible"}


def test_request_custom_webhook_embedding_accepts_vector_alias_and_metadata(monkeypatch) -> None:
    monkeypatch.setenv("CUSTOM_EMBEDDING_KEY", "custom-secret")
    captured: dict = {}

    class FakeResponse:
        def raise_for_status(self) -> None:
            return None

        @staticmethod
        def json() -> dict:
            return {"vector": [1, 2, 2], "metadata": {"provider_request_id": "req-1"}}

    def fake_post(url, *, headers, json, timeout):
        captured["url"] = url
        captured["headers"] = headers
        captured["json"] = json
        captured["timeout"] = timeout
        return FakeResponse()

    monkeypatch.setattr("app.services.embedding_remote.httpx.post", fake_post)

    result = request_custom_webhook_embedding(
        build_embedding_config(
            provider_code="custom",
            model_name="embed-v1",
            api_base_url="https://embeddings.example.test/hook",
            api_key_env_name="CUSTOM_EMBEDDING_KEY",
        ),
        "good ramen",
    )

    assert captured["url"] == "https://embeddings.example.test/hook"
    assert captured["headers"] == {"Authorization": "Bearer custom-secret"}
    assert captured["json"]["feature_code"] == "embeddings"
    assert captured["json"]["input"] == "good ramen"
    assert result.vector == [0.333333, 0.666667, 0.666667]
    assert result.dimensions == 3
    assert result.metadata_json == {
        "transport_mode": "webhook_json",
        "provider_request_id": "req-1",
    }
