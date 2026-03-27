from __future__ import annotations

from dataclasses import asdict, dataclass

from sqlalchemy.orm import Session

from app.core.config import settings
from app.models.provider_config import ProviderConfig
from app.services.provider_config_validation import (
    FEATURE_DEFINITIONS,
    build_config_warnings,
    default_secret_env_name,
    get_feature_definition,
    normalize_api_base_url,
    normalize_api_key_env_name,
    normalize_media_storage_options,
    provider_requires_secret,
    read_secret_from_env_name,
    resolve_secret_status,
    validate_feature_specific_provider_config,
)


@dataclass
class ProviderFeatureConfig:
    feature_code: str
    feature_label: str
    feature_description: str
    providers: list[str]
    provider_code: str
    model_name: str | None
    is_enabled: bool
    api_base_url: str | None
    api_key_env_name: str | None
    options_json: dict
    is_default: bool
    updated_at: str | None
    requires_secret: bool
    secret_env_name: str | None
    secret_status: str
    config_warnings: list[str]

    def to_dict(self) -> dict:
        return asdict(self)
def resolve_secret_env_name(config: ProviderFeatureConfig) -> str | None:
    return normalize_api_key_env_name(config.api_key_env_name) or default_secret_env_name(config.provider_code)


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
        requires_secret=provider_requires_secret(provider_code),
        secret_env_name=default_secret_env_name(provider_code),
        secret_status="missing" if provider_requires_secret(provider_code) and default_secret_env_name(provider_code) else "not_required",
        config_warnings=[],
    )


def merge_provider_config(item: ProviderConfig | None, feature_code: str) -> ProviderFeatureConfig:
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


def list_provider_configs(db: Session, workspace_id: str) -> list[ProviderFeatureConfig]:
    saved_items = (
        db.query(ProviderConfig)
        .filter(ProviderConfig.workspace_id == workspace_id)
        .order_by(ProviderConfig.feature_code.asc())
        .all()
    )
    saved_by_feature = {item.feature_code: item for item in saved_items}
    return [merge_provider_config(saved_by_feature.get(feature_code), feature_code) for feature_code in FEATURE_DEFINITIONS]


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
