from __future__ import annotations

from sqlalchemy.orm import Session

from app.models.provider_config import ProviderConfig
from app.services.provider_config_defaults import (
    build_default_feature_config,
    resolve_provider_config_secret_env_name,
)
from app.services.provider_config_merging import merge_provider_config
from app.services.provider_config_types import ProviderFeatureConfig
from app.services.provider_config_validation import (
    FEATURE_DEFINITIONS,
    get_feature_definition,
    normalize_api_base_url,
    normalize_api_key_env_name,
    normalize_media_storage_options,
    read_secret_from_env_name,
    validate_feature_specific_provider_config,
)

resolve_secret_env_name = resolve_provider_config_secret_env_name


def list_provider_configs(db: Session, workspace_id: str) -> list[ProviderFeatureConfig]:
    saved_items = (
        db.query(ProviderConfig)
        .filter(ProviderConfig.workspace_id == workspace_id)
        .order_by(ProviderConfig.feature_code.asc())
        .all()
    )
    saved_by_feature = {item.feature_code: item for item in saved_items}
    return [
        merge_provider_config(saved_by_feature.get(feature_code), feature_code)
        for feature_code in FEATURE_DEFINITIONS
    ]


def get_effective_provider_config(db: Session, workspace_id: str, feature_code: str) -> ProviderFeatureConfig:
    item = (
        db.query(ProviderConfig)
        .filter(ProviderConfig.workspace_id == workspace_id, ProviderConfig.feature_code == feature_code)
        .first()
    )
    return merge_provider_config(item, feature_code)


def upsert_provider_config(
    db: Session,
    workspace_id: str,
    feature_code: str,
    *,
    provider_code: str,
    model_name: str | None,
    is_enabled: bool,
    api_base_url: str | None,
    api_key_env_name: str | None,
    options_json: dict | None,
) -> ProviderFeatureConfig:
    definition = get_feature_definition(feature_code)
    if provider_code not in definition["providers"]:
        raise ValueError("Unsupported provider for this feature")

    normalized_api_base_url = normalize_api_base_url(api_base_url)
    normalized_api_key_env_name = normalize_api_key_env_name(api_key_env_name)
    validate_feature_specific_provider_config(
        feature_code=feature_code,
        provider_code=provider_code,
        is_enabled=is_enabled,
        api_base_url=normalized_api_base_url,
    )

    normalized_options_json = options_json or {}
    if feature_code == "media_storage":
        normalized_options_json = normalize_media_storage_options(normalized_options_json)

    item = (
        db.query(ProviderConfig)
        .filter(ProviderConfig.workspace_id == workspace_id, ProviderConfig.feature_code == feature_code)
        .first()
    )
    if not item:
        item = ProviderConfig(workspace_id=workspace_id, feature_code=feature_code)

    item.provider_code = provider_code
    item.model_name = model_name
    item.is_enabled = is_enabled
    item.api_base_url = normalized_api_base_url
    item.api_key_env_name = normalized_api_key_env_name
    item.options_json = normalized_options_json
    db.add(item)
    db.commit()
    db.refresh(item)
    return merge_provider_config(item, feature_code)
