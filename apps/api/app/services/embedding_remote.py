from __future__ import annotations

import httpx

from app.core.config import settings
from app.services.embedding_local import normalize_vector
from app.services.embedding_types import EmbeddingProviderError, EmbeddingResult
from app.services.provider_configs import ProviderFeatureConfig
from app.services.provider_transport import (
    infer_provider_transport_mode,
    resolve_provider_api_base_url,
    resolve_provider_secret,
)


DEFAULT_OPENAI_EMBEDDING_MODEL = "text-embedding-3-small"


def get_secret_for_provider(config: ProviderFeatureConfig) -> str | None:
    return resolve_provider_secret(config, error_type=EmbeddingProviderError)


def get_effective_api_base_url(config: ProviderFeatureConfig) -> str:
    return resolve_provider_api_base_url(config, error_type=EmbeddingProviderError)


def infer_transport_mode(config: ProviderFeatureConfig) -> str:
    return infer_provider_transport_mode(config, local_provider_mode="local")


def request_openai_compatible_embedding(
    config: ProviderFeatureConfig, value: str
) -> EmbeddingResult:
    secret = get_secret_for_provider(config)
    model_name = config.model_name or DEFAULT_OPENAI_EMBEDDING_MODEL
    payload = {
        "model": model_name,
        "input": value,
        "encoding_format": "float",
    }
    headers = {"Authorization": f"Bearer {secret}"} if secret else {}
    response = httpx.post(
        f"{get_effective_api_base_url(config)}/embeddings",
        headers=headers,
        json=payload,
        timeout=settings.provider_request_timeout_seconds,
    )
    response.raise_for_status()
    body = response.json()
    data = body.get("data") or []
    if not data or not isinstance(data[0], dict):
        raise ValueError("Embedding provider returned invalid payload")
    vector = data[0].get("embedding") or []
    if not vector:
        raise ValueError("Embedding provider returned empty vector")
    normalized = normalize_vector([float(item) for item in vector])
    return EmbeddingResult(
        vector=normalized,
        provider_code=config.provider_code,
        model_name=model_name,
        dimensions=len(normalized),
        metadata_json={"transport_mode": "openai_compatible"},
    )


def request_custom_webhook_embedding(
    config: ProviderFeatureConfig, value: str
) -> EmbeddingResult:
    if not config.api_base_url:
        raise EmbeddingProviderError("Custom embedding provider requires api_base_url")

    secret = get_secret_for_provider(config)
    headers = {"Authorization": f"Bearer {secret}"} if secret else {}
    response = httpx.post(
        config.api_base_url,
        headers=headers,
        json={
            "feature_code": "embeddings",
            "provider_code": config.provider_code,
            "model_name": config.model_name or "",
            "input": value,
            "options_json": config.options_json or {},
        },
        timeout=settings.provider_request_timeout_seconds,
    )
    response.raise_for_status()
    body = response.json()
    vector = body.get("embedding") or body.get("vector") or []
    if not vector:
        raise ValueError("Custom embedding provider returned empty vector")
    normalized = normalize_vector([float(item) for item in vector])
    return EmbeddingResult(
        vector=normalized,
        provider_code=config.provider_code,
        model_name=config.model_name or "custom-embedding",
        dimensions=len(normalized),
        metadata_json={"transport_mode": "webhook_json", **(body.get("metadata") or {})},
    )
