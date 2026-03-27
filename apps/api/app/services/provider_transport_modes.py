from __future__ import annotations

from app.services.provider_configs import ProviderFeatureConfig


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
