from __future__ import annotations

import asyncio
from pathlib import Path
from types import SimpleNamespace

from app.services.media_provider import DeferredMediaProcessingError
from app.services.media_remote_storage import (
    attempt_media_upload_via_provider,
    delete_remote_media_via_provider,
    download_remote_media_to_temp_file,
    download_remote_media_via_provider,
    upload_media_via_provider,
)
from app.services.media_remote_storage_types import RemoteMediaContentResult, RemoteMediaUploadResult


def build_media_storage_config(**overrides):
    payload = {
        "is_enabled": True,
        "provider_code": "custom",
        "api_base_url": "https://storage.example.test/api",
        "options_json": {},
    }
    payload.update(overrides)
    return SimpleNamespace(**payload)


def test_attempt_media_upload_via_provider_returns_none_when_storage_is_disabled(monkeypatch) -> None:
    monkeypatch.setattr(
        "app.services.media_remote_storage.get_media_storage_provider_config",
        lambda db, workspace_id: build_media_storage_config(is_enabled=False),
    )

    result = asyncio.run(
        attempt_media_upload_via_provider(
            None,
            workspace_id="workspace-1",
            record_id="record-1",
            filename="note.txt",
            mime_type="text/plain",
            content=b"hello",
        )
    )

    assert result.remote_upload is None
    assert result.fallback_used is False


def test_attempt_media_upload_via_provider_uses_fallback_when_enabled(monkeypatch) -> None:
    async def failing_upload(*args, **kwargs):
        raise RuntimeError("gateway unavailable")

    monkeypatch.setattr(
        "app.services.media_remote_storage.get_media_storage_provider_config",
        lambda db, workspace_id: build_media_storage_config(),
    )
    monkeypatch.setattr(
        "app.services.media_remote_storage._perform_custom_upload",
        failing_upload,
    )
    monkeypatch.setattr(
        "app.services.media_remote_storage.fallback_to_local_on_upload_failure_enabled",
        lambda config: True,
    )

    result = asyncio.run(
        attempt_media_upload_via_provider(
            None,
            workspace_id="workspace-1",
            record_id="record-1",
            filename="photo.jpg",
            mime_type="image/jpeg",
            content=b"binary-photo",
        )
    )

    assert result.remote_upload is None
    assert result.fallback_used is True
    assert result.fallback_reason == "gateway unavailable"
    assert result.fallback_provider == "custom"
    assert isinstance(result.fallback_at, str)


def test_attempt_media_upload_via_provider_raises_when_fallback_is_disabled(monkeypatch) -> None:
    async def failing_upload(*args, **kwargs):
        raise RuntimeError("gateway unavailable")

    monkeypatch.setattr(
        "app.services.media_remote_storage.get_media_storage_provider_config",
        lambda db, workspace_id: build_media_storage_config(),
    )
    monkeypatch.setattr(
        "app.services.media_remote_storage._perform_custom_upload",
        failing_upload,
    )
    monkeypatch.setattr(
        "app.services.media_remote_storage.fallback_to_local_on_upload_failure_enabled",
        lambda config: False,
    )

    try:
        asyncio.run(
            attempt_media_upload_via_provider(
                None,
                workspace_id="workspace-1",
                record_id="record-1",
                filename="photo.jpg",
                mime_type="image/jpeg",
                content=b"binary-photo",
            )
        )
    except RuntimeError as exc:
        assert "gateway unavailable" in str(exc)
    else:
        raise AssertionError("Expected upload failure without fallback to raise")


def test_upload_media_via_provider_returns_remote_upload_payload(monkeypatch) -> None:
    expected = RemoteMediaUploadResult(
        storage_provider="custom",
        storage_key="remote/workspace-1/media.bin",
        size_bytes=12,
        metadata_json={"remote": True},
    )

    async def fake_attempt(*args, **kwargs):
        return SimpleNamespace(remote_upload=expected)

    monkeypatch.setattr(
        "app.services.media_remote_storage.attempt_media_upload_via_provider",
        fake_attempt,
    )

    result = asyncio.run(
        upload_media_via_provider(
            None,
            workspace_id="workspace-1",
            record_id="record-1",
            filename="media.bin",
            mime_type="application/octet-stream",
            content=b"hello world!",
        )
    )

    assert result == expected


def test_download_and_delete_remote_media_require_matching_custom_provider(monkeypatch) -> None:
    media = SimpleNamespace(
        id="media-1",
        workspace_id="workspace-1",
        storage_provider="custom",
        storage_key="remote/workspace-1/voice.m4a",
        original_filename="voice.m4a",
    )
    mismatch_media = SimpleNamespace(
        id="media-2",
        workspace_id="workspace-1",
        storage_provider="custom",
        storage_key="remote/workspace-1/voice.m4a",
        original_filename="voice.m4a",
    )

    monkeypatch.setattr(
        "app.services.media_remote_storage.get_media_storage_provider_config",
        lambda db, workspace_id: build_media_storage_config(provider_code="custom"),
    )
    monkeypatch.setattr(
        "app.services.media_remote_storage._perform_custom_download",
        lambda config, *, storage_key: RemoteMediaContentResult(content=b"voice", media_type="audio/mp4"),
    )

    result = download_remote_media_via_provider(None, media)
    assert result == RemoteMediaContentResult(content=b"voice", media_type="audio/mp4")

    monkeypatch.setattr(
        "app.services.media_remote_storage.get_media_storage_provider_config",
        lambda db, workspace_id: build_media_storage_config(provider_code="local"),
    )
    try:
        download_remote_media_via_provider(None, mismatch_media)
    except DeferredMediaProcessingError as exc:
        assert "does not match" in str(exc)
    else:
        raise AssertionError("Expected provider mismatch to raise")

    try:
        delete_remote_media_via_provider(None, mismatch_media)
    except DeferredMediaProcessingError as exc:
        assert "does not match" in str(exc)
    else:
        raise AssertionError("Expected delete provider mismatch to raise")


def test_download_remote_media_to_temp_file_persists_content_in_processing_tmp_dir(
    tmp_path,
    monkeypatch,
) -> None:
    monkeypatch.setattr("app.services.media_remote_storage.settings.processing_tmp_dir", str(tmp_path / "tmp"))
    monkeypatch.setattr(
        "app.services.media_remote_storage.download_remote_media_via_provider",
        lambda db, media: RemoteMediaContentResult(content=b"remote-content", media_type="text/plain"),
    )
    media = SimpleNamespace(
        id="media-1",
        workspace_id="workspace-1",
        storage_provider="custom",
        storage_key="remote/workspace-1/note.txt",
        original_filename="note.txt",
    )

    temp_path = download_remote_media_to_temp_file(None, media)

    assert temp_path.exists() is True
    assert temp_path.parent == Path(tmp_path / "tmp")
    assert temp_path.suffix == ".txt"
    assert temp_path.read_bytes() == b"remote-content"
