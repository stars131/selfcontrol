from __future__ import annotations

import asyncio

import httpx
import pytest

from app.models.media import MediaAsset
from app.models.provider_config import ProviderConfig
from app.models.user import User
from app.services import media_remote_storage as media_remote_storage_service
from app.services.media_remote_storage import RemoteMediaContentResult, RemoteMediaUploadResult

from .test_media_preview_api import build_custom_media_storage_config, build_media_client


def test_custom_remote_storage_service_uses_workspace_provider_config(tmp_path, monkeypatch) -> None:
    client, workspace_id, record_id, session_local = build_media_client(tmp_path, monkeypatch)
    del client, record_id

    with session_local() as db:
        db.add(
            ProviderConfig(
                workspace_id=workspace_id,
                feature_code="media_storage",
                provider_code="custom",
                is_enabled=True,
                api_base_url="https://storage.example.test/api",
                api_key_env_name="REMOTE_MEDIA_STORAGE_KEY",
                options_json={},
            )
        )
        db.commit()

    monkeypatch.setenv("REMOTE_MEDIA_STORAGE_KEY", "secret-value")

    async def fake_perform_upload(config, **kwargs):
        assert config.feature_code == "media_storage"
        assert config.provider_code == "custom"
        assert config.api_base_url == "https://storage.example.test/api"
        return RemoteMediaUploadResult(
            storage_provider="custom",
            storage_key="remote/workspace/asset.bin",
            size_bytes=len(kwargs["content"]),
            metadata_json={"checked": True},
        )

    def fake_perform_download(config, *, storage_key: str):
        assert config.provider_code == "custom"
        assert storage_key == "remote/workspace/asset.bin"
        return RemoteMediaContentResult(content=b"fetched", media_type="application/octet-stream")

    def fake_perform_delete(config, *, storage_key: str):
        assert config.provider_code == "custom"
        assert storage_key == "remote/workspace/asset.bin"

    monkeypatch.setattr(media_remote_storage_service, "_perform_custom_upload", fake_perform_upload)
    monkeypatch.setattr(media_remote_storage_service, "_perform_custom_download", fake_perform_download)
    monkeypatch.setattr(media_remote_storage_service, "_perform_custom_delete", fake_perform_delete)

    with session_local() as db:
        upload_result = asyncio.run(
            media_remote_storage_service.upload_media_via_provider(
                db,
                workspace_id=workspace_id,
                record_id="record-1",
                filename="asset.bin",
                mime_type="application/octet-stream",
                content=b"payload",
            )
        )
        assert upload_result is not None
        assert upload_result.storage_key == "remote/workspace/asset.bin"

        media = MediaAsset(
            workspace_id=workspace_id,
            record_id="record-1",
            uploaded_by=db.query(User).first().id,
            media_type="file",
            storage_provider="custom",
            storage_key="remote/workspace/asset.bin",
            original_filename="asset.bin",
            mime_type="application/octet-stream",
            size_bytes=7,
            metadata_json={},
            processing_status="deferred",
        )
        content_result = media_remote_storage_service.download_remote_media_via_provider(db, media)
        assert content_result.content == b"fetched"
        media_remote_storage_service.delete_remote_media_via_provider(db, media)


def test_custom_remote_storage_upload_enforces_webhook_contract(monkeypatch) -> None:
    config = build_custom_media_storage_config()
    monkeypatch.setenv("REMOTE_MEDIA_STORAGE_KEY", "secret-value")

    class FakeResponse:
        status_code = 200
        headers = {"content-type": "application/json", "x-request-id": "req-123"}

        @staticmethod
        def json():
            return {
                "storage_key": "remote/workspace/voice-note.m4a",
                "size_bytes": "11",
                "provider_asset_id": "asset-123",
                "metadata_json": {
                    "bucket": "primary",
                    "flags": ["warm", {"tier": "archive"}],
                },
            }

    class FakeAsyncClient:
        def __init__(self, *args, **kwargs):
            pass

        async def __aenter__(self):
            return self

        async def __aexit__(self, exc_type, exc, tb):
            return False

        async def post(self, url, *, headers, data, files):
            assert url == "https://storage.example.test/api/media/upload"
            assert headers["X-SelfControl-Media-Storage-Contract"] == media_remote_storage_service.WEBHOOK_CONTRACT_VERSION
            assert headers["X-SelfControl-Media-Storage-Operation"] == "upload"
            assert data["contract_version"] == media_remote_storage_service.WEBHOOK_CONTRACT_VERSION
            assert data["workspace_id"] == "workspace-1"
            assert data["record_id"] == "record-1"
            assert files["file"][0] == "voice-note.m4a"
            return FakeResponse()

    monkeypatch.setattr(media_remote_storage_service.httpx, "AsyncClient", FakeAsyncClient)

    result = asyncio.run(
        media_remote_storage_service._perform_custom_upload(
            config,
            workspace_id="workspace-1",
            record_id="record-1",
            filename="voice-note.m4a",
            mime_type="audio/mp4",
            content=b"remote-audio",
        )
    )

    assert result.storage_key == "remote/workspace/voice-note.m4a"
    assert result.size_bytes == 11
    assert result.metadata_json["remote_storage_mode"] == "custom_webhook"
    assert result.metadata_json["remote_contract_version"] == media_remote_storage_service.WEBHOOK_CONTRACT_VERSION
    assert result.metadata_json["provider_asset_id"] == "asset-123"
    assert result.metadata_json["webhook_request_id"] == "req-123"
    assert result.metadata_json["bucket"] == "primary"
    assert result.metadata_json["flags"][1]["tier"] == "archive"


def test_custom_remote_storage_upload_rejects_invalid_storage_key(monkeypatch) -> None:
    config = build_custom_media_storage_config()
    monkeypatch.setenv("REMOTE_MEDIA_STORAGE_KEY", "secret-value")

    class FakeResponse:
        status_code = 200
        headers = {"content-type": "application/json"}

        @staticmethod
        def json():
            return {"storage_key": "remote/workspace/\nvoice-note.m4a"}

    class FakeAsyncClient:
        def __init__(self, *args, **kwargs):
            pass

        async def __aenter__(self):
            return self

        async def __aexit__(self, exc_type, exc, tb):
            return False

        async def post(self, *args, **kwargs):
            return FakeResponse()

    monkeypatch.setattr(media_remote_storage_service.httpx, "AsyncClient", FakeAsyncClient)

    with pytest.raises(RuntimeError, match="storage_key contains control characters"):
        asyncio.run(
            media_remote_storage_service._perform_custom_upload(
                config,
                workspace_id="workspace-1",
                record_id="record-1",
                filename="voice-note.m4a",
                mime_type="audio/mp4",
                content=b"remote-audio",
            )
        )


def test_custom_remote_storage_download_surfaces_timeout(monkeypatch) -> None:
    config = build_custom_media_storage_config()
    monkeypatch.setenv("REMOTE_MEDIA_STORAGE_KEY", "secret-value")

    class FakeClient:
        def __init__(self, *args, **kwargs):
            pass

        def __enter__(self):
            return self

        def __exit__(self, exc_type, exc, tb):
            return False

        def get(self, url, *, headers, params):
            assert url == "https://storage.example.test/api/media/content"
            assert headers["X-SelfControl-Media-Storage-Operation"] == "download"
            assert params["contract_version"] == media_remote_storage_service.WEBHOOK_CONTRACT_VERSION
            raise httpx.ReadTimeout("timed out")

    monkeypatch.setattr(media_remote_storage_service.httpx, "Client", FakeClient)

    with pytest.raises(RuntimeError, match="Remote media download timed out"):
        media_remote_storage_service._perform_custom_download(
            config,
            storage_key="remote/workspace/voice-note.m4a",
        )
