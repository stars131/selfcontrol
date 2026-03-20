from __future__ import annotations

from dataclasses import asdict, dataclass

from sqlalchemy.orm import Session

from app.core.config import settings
from app.models.provider_config import ProviderConfig


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
}


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

    def to_dict(self) -> dict:
        return asdict(self)


def get_feature_definition(feature_code: str) -> dict:
    definition = FEATURE_DEFINITIONS.get(feature_code)
    if not definition:
        raise ValueError("Unsupported feature code")
    return definition


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
    )


def merge_provider_config(item: ProviderConfig | None, feature_code: str) -> ProviderFeatureConfig:
    default_config = build_default_feature_config(feature_code)
    if not item:
        return default_config

    return ProviderFeatureConfig(
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
    )


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
    item.api_base_url = api_base_url
    item.api_key_env_name = api_key_env_name
    item.options_json = options_json or {}
    db.add(item)
    db.commit()
    db.refresh(item)
    return merge_provider_config(item, feature_code)
