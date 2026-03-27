from __future__ import annotations

from app.core.config import settings
from app.services.provider_config_types import ProviderFeatureConfig
from app.services.provider_config_validation import (
    default_secret_env_name,
    get_feature_definition,
    normalize_api_key_env_name,
    normalize_media_storage_options,
    provider_requires_secret,
)


def resolve_provider_config_secret_env_name(config: ProviderFeatureConfig) -> str | None:
    return normalize_api_key_env_name(config.api_key_env_name) or default_secret_env_name(
        config.provider_code
    )


def build_default_feature_config(feature_code: str) -> ProviderFeatureConfig:
    definition = get_feature_definition(feature_code)
    provider_code = "none"
    model_name: str | None = None
    is_enabled = False

    if feature_code == "chat_generation":
        provider_code = "builtin"
        model_name = "rules-v1"
        is_enabled = True
    elif feature_code == "embeddings":
        provider_code = settings.embedding_provider
        model_name = settings.embedding_model
        is_enabled = True
    elif feature_code == "maps_geocoding":
        provider_code = "amap"
        model_name = "web-js"
        is_enabled = True
    elif feature_code == "media_storage":
        provider_code = "local"
        model_name = "disk-v1"
        is_enabled = True

    options_json: dict = {}
    if feature_code == "media_storage":
        options_json = normalize_media_storage_options(
            {
                "fallback_to_local_on_upload_failure": False,
                "auto_retry_enabled": settings.remote_media_retry_max_attempts > 0,
                "remote_retry_max_attempts": settings.remote_media_retry_max_attempts,
                "remote_retry_backoff_seconds": settings.remote_media_retry_backoff_seconds,
            }
        )

    default_secret_name = default_secret_env_name(provider_code)
    requires_secret = provider_requires_secret(provider_code)
    secret_status = "missing" if requires_secret and default_secret_name else "not_required"
    return ProviderFeatureConfig(
        feature_code=feature_code,
        feature_label=definition["label"],
        feature_description=definition["description"],
        providers=definition["providers"],
        provider_code=provider_code,
        model_name=model_name,
        is_enabled=is_enabled,
        api_base_url=None,
        api_key_env_name=None,
        options_json=options_json,
        is_default=True,
        updated_at=None,
        requires_secret=requires_secret,
        secret_env_name=default_secret_name,
        secret_status=secret_status,
        config_warnings=[],
    )
