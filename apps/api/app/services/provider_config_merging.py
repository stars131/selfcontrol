from __future__ import annotations

from app.models.provider_config import ProviderConfig
from app.services.provider_config_defaults import build_default_feature_config
from app.services.provider_config_types import ProviderFeatureConfig
from app.services.provider_config_validation import (
    build_config_warnings,
    normalize_media_storage_options,
    provider_requires_secret,
    resolve_secret_status,
)


def merge_provider_config(
    item: ProviderConfig | None, feature_code: str
) -> ProviderFeatureConfig:
    default_config = build_default_feature_config(feature_code)
    if not item:
        secret_status, secret_env_name = resolve_secret_status(
            provider_code=default_config.provider_code,
            api_key_env_name=default_config.api_key_env_name,
        )
        default_config.secret_status = secret_status
        default_config.secret_env_name = secret_env_name
        default_config.config_warnings = build_config_warnings(
            provider_code=default_config.provider_code,
            api_base_url=default_config.api_base_url,
            requires_secret=default_config.requires_secret,
            secret_status=secret_status,
        )
        return default_config

    merged_options_json = dict(default_config.options_json)
    merged_options_json.update(item.options_json or {})
    if feature_code == "media_storage":
        merged_options_json = normalize_media_storage_options(merged_options_json)

    merged = ProviderFeatureConfig(
        feature_code=feature_code,
        feature_label=default_config.feature_label,
        feature_description=default_config.feature_description,
        providers=default_config.providers,
        provider_code=item.provider_code,
        model_name=item.model_name,
        is_enabled=item.is_enabled,
        api_base_url=item.api_base_url,
        api_key_env_name=item.api_key_env_name,
        options_json=merged_options_json,
        is_default=False,
        updated_at=item.updated_at.isoformat() if item.updated_at else None,
        requires_secret=provider_requires_secret(item.provider_code),
        secret_env_name=None,
        secret_status="not_required",
        config_warnings=[],
    )
    secret_status, secret_env_name = resolve_secret_status(
        provider_code=merged.provider_code,
        api_key_env_name=merged.api_key_env_name,
    )
    merged.secret_status = secret_status
    merged.secret_env_name = secret_env_name
    merged.config_warnings = build_config_warnings(
        provider_code=merged.provider_code,
        api_base_url=merged.api_base_url,
        requires_secret=merged.requires_secret,
        secret_status=secret_status,
    )
    return merged
