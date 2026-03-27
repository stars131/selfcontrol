from __future__ import annotations

from collections.abc import Callable
from dataclasses import dataclass
from pathlib import Path

from sqlalchemy.orm import Session

from app.models.media import MediaAsset


@dataclass(frozen=True)
class MediaProcessingFileHandle:
    file_path: Path
    cleanup_temp_file: bool


def acquire_media_processing_file(
    db: Session,
    media: MediaAsset,
    *,
    resolve_storage_path_fn: Callable[[MediaAsset], Path],
    download_remote_media_to_temp_file_fn: Callable[[Session, MediaAsset], Path],
    mark_media_remote_fetch_downloaded_fn: Callable[[MediaAsset], object],
) -> MediaProcessingFileHandle:
    if media.storage_provider == "local":
        file_path = resolve_storage_path_fn(media)
        cleanup_temp_file = False
    else:
        file_path = download_remote_media_to_temp_file_fn(db, media)
        cleanup_temp_file = True
        mark_media_remote_fetch_downloaded_fn(media)

    if not file_path.exists():
        raise FileNotFoundError(f"Stored file not found: {file_path}")
    return MediaProcessingFileHandle(
        file_path=file_path,
        cleanup_temp_file=cleanup_temp_file,
    )


def cleanup_media_processing_file(handle: MediaProcessingFileHandle | None) -> None:
    if not handle or not handle.cleanup_temp_file:
        return
    try:
        handle.file_path.unlink(missing_ok=True)
    except OSError:
        pass
