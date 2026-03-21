from __future__ import annotations

import math
import re
from dataclasses import dataclass
from hashlib import blake2b

import httpx
from sqlalchemy.orm import Session

from app.core.config import settings
from app.services.provider_configs import (
    ProviderFeatureConfig,
    get_effective_provider_config,
    read_secret_from_env_name,
    resolve_secret_env_name,
)


TOKEN_PATTERN = re.compile(r"[A-Za-z0-9]+|[\u4e00-\u9fff]")
DEFAULT_OPENAI_EMBEDDING_MODEL = "text-embedding-3-small"


class EmbeddingProviderError(Exception):
    pass


@dataclass
class EmbeddingResult:
    vector: list[float]
    provider_code: str
    model_name: str
    dimensions: int
    metadata_json: dict


def tokenize(value: str) -> list[str]:
    return TOKEN_PATTERN.findall((value or "").lower())


def normalize_vector(vector: list[float]) -> list[float]:
    norm = math.sqrt(sum(item * item for item in vector))
    if not norm:
        return vector
    return [round(item / norm, 6) for item in vector]


def local_hash_embedding(value: str, dimensions: int) -> list[float]:
    vector = [0.0] * dimensions
    tokens = tokenize(value)
    if not tokens:
        return vector

    for token in tokens:
        digest = blake2b(token.encode("utf-8"), digest_size=16).digest()
        index = int.from_bytes(digest[:8], "big") % dimensions
        sign = 1.0 if digest[8] % 2 == 0 else -1.0
        weight = 1.0 + min(len(token), 12) / 12
        vector[index] += sign * weight

    return normalize_vector(vector)


def get_secret_for_provider(config: ProviderFeatureConfig) -> str | None:
    env_name = resolve_secret_env_name(config)
    if not env_name:
        return None

    secret = read_secret_from_env_name(env_name)
    if not secret:
        raise EmbeddingProviderError(f"Required secret environment variable is missing: {env_name}")
    return secret


def get_effective_api_base_url(config: ProviderFeatureConfig) -> str:
    if config.api_base_url:
        return config.api_base_url.rstrip("/")
    if config.provider_code == "openai":
        return "https://api.openai.com/v1"
    if config.provider_code == "openrouter":
        return "https://openrouter.ai/api/v1"
    raise EmbeddingProviderError("API base URL is required for this provider")


def infer_transport_mode(config: ProviderFeatureConfig) -> str:
    explicit = str(config.options_json.get("transport_mode", "")).strip().lower()
    if explicit in {"openai_compatible", "webhook_json"}:
        return explicit

    if config.provider_code in {"openai", "openrouter"}:
        return "openai_compatible"
    if config.provider_code == "custom":
        base_url = (config.api_base_url or "").lower()
        if base_url.endswith("/v1") or "/v1/" in base_url:
            return "openai_compatible"
        return "webhook_json"
    if config.provider_code == "local":
        return "local"
    return "unsupported"


def request_openai_compatible_embedding(config: ProviderFeatureConfig, value: str) -> EmbeddingResult:
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


def request_custom_webhook_embedding(config: ProviderFeatureConfig, value: str) -> EmbeddingResult:
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


def embed_text_for_workspace(db: Session, workspace_id: str, value: str) -> EmbeddingResult:
    config = get_effective_provider_config(db, workspace_id, "embeddings")
    if not config.is_enabled:
        raise EmbeddingProviderError("Embeddings provider is disabled")

    transport_mode = infer_transport_mode(config)
    if transport_mode == "local":
        vector = local_hash_embedding(value, max(settings.embedding_dimensions, 64))
        return EmbeddingResult(
            vector=vector,
            provider_code="local",
            model_name=config.model_name or settings.embedding_model,
            dimensions=len(vector),
            metadata_json={"transport_mode": "local"},
        )
    if transport_mode == "openai_compatible":
        return request_openai_compatible_embedding(config, value)
    if transport_mode == "webhook_json":
        return request_custom_webhook_embedding(config, value)
    raise EmbeddingProviderError(f"Embedding provider {config.provider_code} is not supported yet")
