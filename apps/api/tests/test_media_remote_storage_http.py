from __future__ import annotations

import asyncio
from types import SimpleNamespace

import httpx
import pytest

from app.services.media_remote_storage_http import (
    perform_custom_media_delete,
    perform_custom_media_download,
    perform_custom_media_upload,
)


def build_config(**overrides):
    payload = {
        "provider_code": "custom",
        "api_base_url": "https://storage.example.test/api",
        "options_json": {},
        "api_key_env_name": "REMOTE_MEDIA_STORAGE_KEY",
    }
    payload.update(overrides)
    return SimpleNamespace(**payload)


def test_perform_custom_media_upload_validates_payload(monkeypatch) -> None:
    monkeypatch.setattr(
        "app.services.media_remote_storage_http.build_custom_media_storage_headers",
        lambda config, *, operation, accept: {"Accept": accept},
    )

    class FakeResponse:
        status_code = 200
        headers = {"x-request-id": "req-1"}

        @staticmethod
        def json():
            return {"storage_key": "remote/workspace/a.txt", "size_bytes": "3"}

    class FakeAsyncClient:
        def __init__(self, *args, **kwargs):
            pass

        async def __aenter__(self):
            return self

        async def __aexit__(self, exc_type, exc, tb):
            return False

        async def post(self, *args, **kwargs):
            return FakeResponse()

    monkeypatch.setattr("app.services.media_remote_storage_http.httpx.AsyncClient", FakeAsyncClient)

    result = asyncio.run(
        perform_custom_media_upload(
            build_config(),
            workspace_id="workspace-1",
            record_id="record-1",
            filename="a.txt",
            mime_type="text/plain",
            content=b"abc",
        )
    )

    assert result.storage_key == "remote/workspace/a.txt"
    assert result.size_bytes == 3
    assert result.metadata_json["webhook_request_id"] == "req-1"


def test_perform_custom_media_download_and_delete_handle_expected_statuses(monkeypatch) -> None:
    monkeypatch.setattr(
        "app.services.media_remote_storage_http.build_custom_media_storage_headers",
        lambda config, *, operation, accept: {"Accept": accept},
    )

    class FakeDownloadResponse:
        status_code = 200
        content = b"payload"
        headers = {"content-type": "text/plain"}

    class FakeDeleteResponse:
        status_code = 404

    class FakeClient:
        def __init__(self, *args, **kwargs):
            self._mode = "download"

        def __enter__(self):
            return self

        def __exit__(self, exc_type, exc, tb):
            return False

        def get(self, *args, **kwargs):
            return FakeDownloadResponse()

        def post(self, *args, **kwargs):
            return FakeDeleteResponse()

    monkeypatch.setattr("app.services.media_remote_storage_http.httpx.Client", FakeClient)

    download_result = perform_custom_media_download(
        build_config(), storage_key="remote/workspace/a.txt"
    )
    assert download_result.content == b"payload"
    assert download_result.media_type == "text/plain"

    perform_custom_media_delete(build_config(), storage_key="remote/workspace/a.txt")


def test_perform_custom_media_download_maps_transport_errors(monkeypatch) -> None:
    monkeypatch.setattr(
        "app.services.media_remote_storage_http.build_custom_media_storage_headers",
        lambda config, *, operation, accept: {"Accept": accept},
    )

    class FakeClient:
        def __init__(self, *args, **kwargs):
            pass

        def __enter__(self):
            return self

        def __exit__(self, exc_type, exc, tb):
            return False

        def get(self, *args, **kwargs):
            raise httpx.ReadTimeout("timed out")

    monkeypatch.setattr("app.services.media_remote_storage_http.httpx.Client", FakeClient)

    with pytest.raises(RuntimeError, match="Remote media download timed out"):
        perform_custom_media_download(
            build_config(), storage_key="remote/workspace/a.txt"
        )
