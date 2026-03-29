from __future__ import annotations

import httpx

from app.services.media_remote_storage_health import get_media_storage_provider_health
from app.services.provider_config_types import ProviderFeatureConfig


def build_media_storage_config(
    *,
    provider_code: str = "local",
    is_enabled: bool = True,
    api_base_url: str | None = None,
    requires_secret: bool = False,
    secret_status: str = "not_required",
    config_warnings: list[str] | None = None,
) -> ProviderFeatureConfig:
    return ProviderFeatureConfig(
        feature_code="media_storage",
        feature_label="Media storage",
        feature_description="Upload and fetch attachment binaries.",
        providers=["local", "custom"],
        provider_code=provider_code,
        model_name=None,
        is_enabled=is_enabled,
        api_base_url=api_base_url,
        api_key_env_name=None,
        options_json={},
        is_default=False,
        updated_at=None,
        requires_secret=requires_secret,
        secret_env_name=None,
        secret_status=secret_status,
        config_warnings=list(config_warnings or []),
    )


def test_media_remote_storage_health_reports_disabled_and_local_modes(monkeypatch) -> None:
    disabled_config = build_media_storage_config(provider_code="custom", is_enabled=False)
    monkeypatch.setattr(
        "app.services.media_remote_storage_health.get_media_storage_provider_config",
        lambda db, workspace_id: disabled_config,
    )
    disabled = get_media_storage_provider_health(None, "workspace-1")
    assert disabled.status == "disabled"
    assert disabled.message == "Media storage provider is disabled"
    assert disabled.reachable is None

    local_config = build_media_storage_config(provider_code="local", is_enabled=True)
    monkeypatch.setattr(
        "app.services.media_remote_storage_health.get_media_storage_provider_config",
        lambda db, workspace_id: local_config,
    )
    local = get_media_storage_provider_health(None, "workspace-1")
    assert local.status == "ready"
    assert local.reachable is True
    assert local.message == "Local disk media storage is active"
    assert local.capabilities == {"upload": True, "download": True, "delete": True}
    assert local.service_name == "local-disk"


def test_media_remote_storage_health_reports_misconfigured_custom_provider(monkeypatch) -> None:
    missing_url_config = build_media_storage_config(provider_code="custom", is_enabled=True)
    monkeypatch.setattr(
        "app.services.media_remote_storage_health.get_media_storage_provider_config",
        lambda db, workspace_id: missing_url_config,
    )
    missing_url = get_media_storage_provider_health(None, "workspace-1")
    assert missing_url.status == "misconfigured"
    assert "API base URL" in missing_url.message

    missing_secret_config = build_media_storage_config(
        provider_code="custom",
        is_enabled=True,
        api_base_url="https://storage.example.test/api",
        requires_secret=True,
        secret_status="missing",
    )
    monkeypatch.setattr(
        "app.services.media_remote_storage_health.get_media_storage_provider_config",
        lambda db, workspace_id: missing_secret_config,
    )
    missing_secret = get_media_storage_provider_health(None, "workspace-1")
    assert missing_secret.status == "misconfigured"
    assert missing_secret.message == "Server-side media storage secret is not configured"


def test_media_remote_storage_health_rejects_unsupported_provider_code(monkeypatch) -> None:
    unsupported_config = build_media_storage_config(
        provider_code="s3",
        is_enabled=True,
        api_base_url="https://storage.example.test/api",
    )
    monkeypatch.setattr(
        "app.services.media_remote_storage_health.get_media_storage_provider_config",
        lambda db, workspace_id: unsupported_config,
    )

    result = get_media_storage_provider_health(None, "workspace-1")

    assert result.status == "unsupported"
    assert result.reachable is None
    assert result.message == "Unsupported media storage provider: s3"


def test_media_remote_storage_health_reports_transport_and_endpoint_failures(monkeypatch) -> None:
    config = build_media_storage_config(
        provider_code="custom",
        is_enabled=True,
        api_base_url="https://storage.example.test/api",
        requires_secret=True,
        secret_status="configured",
    )
    monkeypatch.setattr(
        "app.services.media_remote_storage_health.get_media_storage_provider_config",
        lambda db, workspace_id: config,
    )
    monkeypatch.setattr(
        "app.services.media_remote_storage_health._build_custom_headers",
        lambda config, operation, accept: {"Accept": accept, "X-Test-Operation": operation},
    )

    class TimeoutClient:
        def __init__(self, *args, **kwargs):
            pass

        def __enter__(self):
            return self

        def __exit__(self, exc_type, exc, tb):
            return False

        def get(self, url, *, headers, params):
            raise httpx.TimeoutException("timed out")

    monkeypatch.setattr("app.services.media_remote_storage_health.httpx.Client", TimeoutClient)
    unreachable = get_media_storage_provider_health(None, "workspace-1")
    assert unreachable.status == "unreachable"
    assert unreachable.reachable is False
    assert unreachable.message == "Remote media health check timed out"

    class NotFoundResponse:
        status_code = 404

    class NotFoundClient:
        def __init__(self, *args, **kwargs):
            pass

        def __enter__(self):
            return self

        def __exit__(self, exc_type, exc, tb):
            return False

        def get(self, url, *, headers, params):
            return NotFoundResponse()

    monkeypatch.setattr("app.services.media_remote_storage_health.httpx.Client", NotFoundClient)
    unsupported = get_media_storage_provider_health(None, "workspace-1")
    assert unsupported.status == "unsupported"
    assert unsupported.reachable is False
    assert unsupported.message == "Remote media health endpoint is not implemented"


def test_media_remote_storage_health_reports_invalid_json_and_degraded_contract(monkeypatch) -> None:
    config = build_media_storage_config(
        provider_code="custom",
        is_enabled=True,
        api_base_url="https://storage.example.test/api",
        requires_secret=False,
        secret_status="not_required",
        config_warnings=["Existing warning"],
    )
    monkeypatch.setattr(
        "app.services.media_remote_storage_health.get_media_storage_provider_config",
        lambda db, workspace_id: config,
    )
    monkeypatch.setattr(
        "app.services.media_remote_storage_health._build_custom_headers",
        lambda config, operation, accept: {"Accept": accept, "X-Test-Operation": operation},
    )

    class InvalidJsonResponse:
        status_code = 200

        @staticmethod
        def json():
            raise ValueError("bad json")

    class InvalidJsonClient:
        def __init__(self, *args, **kwargs):
            pass

        def __enter__(self):
            return self

        def __exit__(self, exc_type, exc, tb):
            return False

        def get(self, url, *, headers, params):
            return InvalidJsonResponse()

    monkeypatch.setattr("app.services.media_remote_storage_health.httpx.Client", InvalidJsonClient)
    invalid_json = get_media_storage_provider_health(None, "workspace-1")
    assert invalid_json.status == "unhealthy"
    assert invalid_json.reachable is True
    assert invalid_json.message == "Remote media health endpoint returned invalid JSON"

    class InvalidObjectResponse:
        status_code = 200

        @staticmethod
        def json():
            return ["not", "an", "object"]

    class InvalidObjectClient:
        def __init__(self, *args, **kwargs):
            pass

        def __enter__(self):
            return self

        def __exit__(self, exc_type, exc, tb):
            return False

        def get(self, url, *, headers, params):
            return InvalidObjectResponse()

    monkeypatch.setattr("app.services.media_remote_storage_health.httpx.Client", InvalidObjectClient)
    invalid_object = get_media_storage_provider_health(None, "workspace-1")
    assert invalid_object.status == "unhealthy"
    assert invalid_object.reachable is True
    assert (
        invalid_object.message
        == "Remote media health endpoint returned an invalid JSON object"
    )

    class DegradedResponse:
        status_code = 200

        @staticmethod
        def json():
            return {
                "status": "degraded",
                "message": "",
                "service_name": "remote-storage",
                "service_version": "2.0.0",
                "contract_version": "unexpected-v2",
                "capabilities": {
                    "upload": "enabled",
                    "download": 1,
                    "delete": "off",
                },
            }

    class DegradedClient:
        def __init__(self, *args, **kwargs):
            pass

        def __enter__(self):
            return self

        def __exit__(self, exc_type, exc, tb):
            return False

        def get(self, url, *, headers, params):
            assert url == "https://storage.example.test/api/media/health"
            assert params["contract_version"] == "selfcontrol-media-storage-v1"
            return DegradedResponse()

    monkeypatch.setattr("app.services.media_remote_storage_health.httpx.Client", DegradedClient)
    degraded = get_media_storage_provider_health(None, "workspace-1")
    assert degraded.status == "degraded"
    assert degraded.reachable is True
    assert degraded.service_status == "degraded"
    assert degraded.message == "Remote media storage reported degraded capability"
    assert degraded.capabilities == {"upload": True, "download": True, "delete": False}
    assert degraded.warnings[0] == "Existing warning"
    assert "unexpected-v2" in degraded.warnings[1]


def test_media_remote_storage_health_reports_ready_remote_defaults_and_serializes(
    monkeypatch,
) -> None:
    config = build_media_storage_config(
        provider_code="custom",
        is_enabled=True,
        api_base_url="https://storage.example.test/api",
        requires_secret=False,
        secret_status="not_required",
    )
    monkeypatch.setattr(
        "app.services.media_remote_storage_health.get_media_storage_provider_config",
        lambda db, workspace_id: config,
    )
    monkeypatch.setattr(
        "app.services.media_remote_storage_health._build_custom_headers",
        lambda config, operation, accept: {"Accept": accept, "X-Test-Operation": operation},
    )

    class ReadyResponse:
        status_code = 200

        @staticmethod
        def json():
            return {
                "status": "ready",
                "service_name": "remote-storage",
                "service_version": "2.1.0",
                "capabilities": {},
            }

    class ReadyClient:
        def __init__(self, *args, **kwargs):
            pass

        def __enter__(self):
            return self

        def __exit__(self, exc_type, exc, tb):
            return False

        def get(self, url, *, headers, params):
            return ReadyResponse()

    monkeypatch.setattr("app.services.media_remote_storage_health.httpx.Client", ReadyClient)

    result = get_media_storage_provider_health(None, "workspace-1")
    payload = result.to_dict()

    assert result.status == "ready"
    assert result.reachable is True
    assert result.message == "Remote media storage is reachable"
    assert result.service_status == "ready"
    assert result.service_name == "remote-storage"
    assert result.service_version == "2.1.0"
    assert result.capabilities == {"upload": True, "download": True, "delete": True}
    assert payload["status"] == "ready"
    assert payload["capabilities"] == {"upload": True, "download": True, "delete": True}
