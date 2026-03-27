from __future__ import annotations

from app.services.provider_configs import ProviderFeatureConfig


def resolve_provider_api_base_url(
    config: ProviderFeatureConfig,
    *,
    error_type: type[Exception],
) -> str:
    if config.api_base_url:
        return config.api_base_url.rstrip("/")
    if config.provider_code == "openai":
        return "https://api.openai.com/v1"
    if config.provider_code == "openrouter":
        return "https://openrouter.ai/api/v1"
    raise error_type("API base URL is required for this provider")
