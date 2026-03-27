from __future__ import annotations

from pathlib import Path
from types import SimpleNamespace

from app.services.media_processing_io import (
    MediaProcessingFileHandle,
    acquire_media_processing_file,
    cleanup_media_processing_file,
)


def build_media_stub(**overrides):
    payload = {
        "storage_provider": "local",
    }
    payload.update(overrides)
    return SimpleNamespace(**payload)


def test_acquire_media_processing_file_uses_local_path_without_cleanup(tmp_path) -> None:
    media = build_media_stub(storage_provider="local")
    local_path = tmp_path / "local.txt"
    local_path.write_text("hello", encoding="utf-8")

    handle = acquire_media_processing_file(
        object(),
        media,
        resolve_storage_path_fn=lambda item: local_path,
        download_remote_media_to_temp_file_fn=lambda db, item: (_ for _ in ()).throw(RuntimeError("should not download")),
        mark_media_remote_fetch_downloaded_fn=lambda item: (_ for _ in ()).throw(RuntimeError("should not mark")),
    )

    assert handle == MediaProcessingFileHandle(file_path=local_path, cleanup_temp_file=False)


def test_acquire_media_processing_file_downloads_remote_and_marks_fetch(tmp_path) -> None:
    media = build_media_stub(storage_provider="custom")
    remote_path = tmp_path / "remote.txt"
    remote_path.write_text("hello", encoding="utf-8")
    marked: list[str] = []

    handle = acquire_media_processing_file(
        object(),
        media,
        resolve_storage_path_fn=lambda item: Path("unused"),
        download_remote_media_to_temp_file_fn=lambda db, item: remote_path,
        mark_media_remote_fetch_downloaded_fn=lambda item: marked.append("downloaded"),
    )

    assert handle == MediaProcessingFileHandle(file_path=remote_path, cleanup_temp_file=True)
    assert marked == ["downloaded"]


def test_acquire_media_processing_file_rejects_missing_files(tmp_path) -> None:
    media = build_media_stub(storage_provider="local")
    missing_path = tmp_path / "missing.txt"

    try:
        acquire_media_processing_file(
            object(),
            media,
            resolve_storage_path_fn=lambda item: missing_path,
            download_remote_media_to_temp_file_fn=lambda db, item: missing_path,
            mark_media_remote_fetch_downloaded_fn=lambda item: None,
        )
    except FileNotFoundError as exc:
        assert str(missing_path) in str(exc)
    else:
        raise AssertionError("Expected FileNotFoundError")


def test_cleanup_media_processing_file_removes_remote_temp_file(tmp_path) -> None:
    remote_path = tmp_path / "remote.txt"
    remote_path.write_text("hello", encoding="utf-8")

    cleanup_media_processing_file(
        MediaProcessingFileHandle(
            file_path=remote_path,
            cleanup_temp_file=True,
        )
    )

    assert remote_path.exists() is False
