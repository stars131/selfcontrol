from __future__ import annotations

from dataclasses import asdict, dataclass


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
