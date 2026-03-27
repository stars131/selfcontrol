from __future__ import annotations

from sqlalchemy.orm import Session

from app.core.config import settings
from app.services.embedding_local import local_hash_embedding, normalize_vector, tokenize
from app.services.embedding_remote import (
    DEFAULT_OPENAI_EMBEDDING_MODEL,
    get_effective_api_base_url,
    get_secret_for_provider,
    infer_transport_mode,
    request_custom_webhook_embedding,
    request_openai_compatible_embedding,
)
from app.services.embedding_types import EmbeddingProviderError, EmbeddingResult
from app.services.provider_configs import (
    ProviderFeatureConfig,
    get_effective_provider_config,
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
