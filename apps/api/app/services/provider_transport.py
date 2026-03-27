from __future__ import annotations

from app.services.provider_configs import ProviderFeatureConfig, read_secret_from_env_name, resolve_secret_env_name
from app.services.provider_transport_modes import infer_provider_transport_mode
from app.services.provider_transport_urls import resolve_provider_api_base_url


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
