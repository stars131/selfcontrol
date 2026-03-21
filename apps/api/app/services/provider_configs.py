from __future__ import annotations

import os
import re
from dataclasses import asdict, dataclass
from urllib.parse import urlparse

from sqlalchemy.orm import Session

from app.core.config import settings
from app.models.provider_config import ProviderConfig

ENV_NAME_PATTERN = re.compile(r"^[A-Z][A-Z0-9_]{1,127}$")
SECRETLESS_PROVIDERS = {"builtin", "local", "none", "amap"}


FEATURE_DEFINITIONS: dict[str, dict] = {
    "chat_generation": {
        "label": "Chat generation",
        "description": "Future LLM response generation for the assistant.",
        "providers": ["builtin", "openai", "openrouter", "anthropic", "google", "custom"],
    },
    "embeddings": {
        "label": "Embeddings",
        "description": "Knowledge chunks and semantic retrieval.",
        "providers": ["local", "openai", "openrouter", "google", "custom"],
    },
    "image_ocr": {
        "label": "Image OCR",
        "description": "Extract text from uploaded images.",
        "providers": ["none", "openai", "google", "ocrspace", "custom"],
    },
    "audio_asr": {
        "label": "Audio ASR",
        "description": "Transcribe uploaded voice and audio files.",
        "providers": ["none", "openai", "google", "custom"],
    },
    "video_transcription": {
        "label": "Video transcription",
        "description": "Process uploaded videos into searchable text.",
        "providers": ["none", "openai", "google", "custom"],
    },
    "maps_geocoding": {
        "label": "Maps and geocoding",
        "description": "Map lookup, reverse geocoding, and place resolution.",
        "providers": ["amap", "google_maps", "mapbox", "custom"],
    },
    "media_storage": {
        "label": "Media storage",
        "description": "Upload and fetch attachment binaries from local disk or a remote storage webhook.",
        "providers": ["local", "custom"],
    },
}
MEDIA_STORAGE_ENDPOINT_SUFFIXES = (
    "/media/upload",
    "/media/content",
    "/media/delete",
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


def provider_requires_secret(provider_code: str) -> bool:
    return provider_code not in SECRETLESS_PROVIDERS


def default_secret_env_name(provider_code: str) -> str | None:
    if provider_code == "openai":
        return "OPENAI_API_KEY"
    if provider_code == "openrouter":
        return "OPENROUTER_API_KEY"
    if provider_code == "google":
        return "GOOGLE_API_KEY"
    if provider_code == "anthropic":
        return "ANTHROPIC_API_KEY"
    return None


def normalize_api_key_env_name(value: str | None) -> str | None:
    normalized = (value or "").strip().upper()
    if not normalized:
        return None
    if normalized.startswith("NEXT_PUBLIC_"):
        raise ValueError("Client-exposed NEXT_PUBLIC_ variables cannot be used for server-side provider secrets")
    if not ENV_NAME_PATTERN.match(normalized):
        raise ValueError("API key env name must use uppercase letters, numbers, and underscores only")
    return normalized


def normalize_api_base_url(value: str | None) -> str | None:
    normalized = (value or "").strip()
    if not normalized:
        return None

    parsed = urlparse(normalized)
    if parsed.scheme not in {"http", "https"}:
        raise ValueError("API base URL must start with http:// or https://")
    if not parsed.netloc or not parsed.hostname:
        raise ValueError("API base URL must include a valid host")
    if parsed.username or parsed.password:
        raise ValueError("API base URL must not embed credentials")
    if parsed.query or parsed.fragment:
        raise ValueError("API base URL must not include query strings or fragments")
    return normalized.rstrip("/")


def resolve_secret_env_name(config: ProviderFeatureConfig) -> str | None:
    return normalize_api_key_env_name(config.api_key_env_name) or default_secret_env_name(config.provider_code)


def read_secret_from_env_name(env_name: str | None) -> str | None:
    if not env_name:
        return None
    secret = os.getenv(env_name, "").strip()
    return secret or None


def resolve_secret_status(config: ProviderFeatureConfig) -> tuple[str, str | None]:
    env_name = resolve_secret_env_name(config)
    if not provider_requires_secret(config.provider_code):
        return "not_required", env_name
    if not env_name:
        return "missing", None
    if read_secret_from_env_name(env_name):
        return "configured", env_name
    return "missing", env_name


def build_config_warnings(
    *,
    provider_code: str,
    api_base_url: str | None,
    requires_secret: bool,
    secret_status: str,
) -> list[str]:
    warnings: list[str] = []
    if provider_code == "custom" and not api_base_url:
        warnings.append("Custom providers require a server-side API base URL")
    if requires_secret and secret_status != "configured":
        warnings.append("Server-side secret is not configured for this provider")
    if settings.app_env == "production" and api_base_url and api_base_url.startswith("http://"):
        warnings.append("Production providers should prefer HTTPS API endpoints")
    return warnings


def get_feature_definition(feature_code: str) -> dict:
    definition = FEATURE_DEFINITIONS.get(feature_code)
    if not definition:
        raise ValueError("Unsupported feature code")
    return definition


def validate_feature_specific_provider_config(
    *,
    feature_code: str,
    provider_code: str,
    is_enabled: bool,
    api_base_url: str | None,
) -> None:
    if feature_code != "media_storage" or provider_code != "custom":
        return
    if is_enabled and not api_base_url:
        raise ValueError("Custom media storage provider requires an API base URL when enabled")
    if not api_base_url:
        return

    normalized_url = api_base_url.rstrip("/").lower()
    if normalized_url.endswith(MEDIA_STORAGE_ENDPOINT_SUFFIXES):
        raise ValueError("Media storage API base URL must point to the service root, not a /media/upload|content|delete endpoint")


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
        options_json={},
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
        secret_status, secret_env_name = resolve_secret_status(default_config)
        default_config.secret_status = secret_status
        default_config.secret_env_name = secret_env_name
        default_config.config_warnings = build_config_warnings(
            provider_code=default_config.provider_code,
            api_base_url=default_config.api_base_url,
            requires_secret=default_config.requires_secret,
            secret_status=secret_status,
        )
        return default_config

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
        options_json=item.options_json or {},
        is_default=False,
        updated_at=item.updated_at.isoformat() if item.updated_at else None,
        requires_secret=provider_requires_secret(item.provider_code),
        secret_env_name=None,
        secret_status="not_required",
        config_warnings=[],
    )
    secret_status, secret_env_name = resolve_secret_status(merged)
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
    item.options_json = options_json or {}
    db.add(item)
    db.commit()
    db.refresh(item)
    return merge_provider_config(item, feature_code)
