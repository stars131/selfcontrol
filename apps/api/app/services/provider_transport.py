from __future__ import annotations

from collections.abc import Callable

from app.services.provider_configs import ProviderFeatureConfig, read_secret_from_env_name, resolve_secret_env_name


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


def resolve_provider_secret(
    config: ProviderFeatureConfig,
    *,
    error_type: type[Exception],
) -> str | None:
    env_name = resolve_secret_env_name(config)
    if not env_name:
        return None

    secret = read_secret_from_env_name(env_name)
    if not secret:
        raise error_type(f"Required secret environment variable is missing: {env_name}")
    return secret


def infer_provider_transport_mode(
    config: ProviderFeatureConfig,
    *,
    local_provider_mode: str | None = None,
) -> str:
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
    if config.provider_code == "local" and local_provider_mode:
        return local_provider_mode
    return "unsupported"
