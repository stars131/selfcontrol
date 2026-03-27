from __future__ import annotations

import tempfile
from pathlib import Path
import time

from sqlalchemy.orm import Session

from app.core.config import settings
from app.models.media import MediaAsset
from app.services.media_provider import DeferredMediaProcessingError
import app.services.media_remote_storage_http as media_remote_storage_http
from app.services.media_remote_storage_contract import (
    WEBHOOK_CONTRACT_VERSION,
    get_media_storage_provider_config,
)
from app.services.media_remote_storage_http import (
    perform_custom_media_delete as _perform_custom_delete,
    perform_custom_media_download as _perform_custom_download,
    perform_custom_media_upload as _perform_custom_upload,
)
from app.services.media_remote_storage_payloads import (
    fallback_to_local_on_upload_failure_enabled,
)
from app.services.media_remote_storage_types import (
    RemoteMediaContentResult,
    RemoteMediaUploadAttemptResult,
    RemoteMediaUploadResult,
)

httpx = media_remote_storage_http.httpx


async def upload_media_via_provider(
    db: Session,
    *,
    workspace_id: str,
    record_id: str,
    filename: str,
    mime_type: str,
    content: bytes,
) -> RemoteMediaUploadResult | None:
    attempt = await attempt_media_upload_via_provider(
        db,
        workspace_id=workspace_id,
        record_id=record_id,
        filename=filename,
        mime_type=mime_type,
        content=content,
    )
    return attempt.remote_upload


async def attempt_media_upload_via_provider(
    db: Session,
    *,
    workspace_id: str,
    record_id: str,
    filename: str,
    mime_type: str,
    content: bytes,
) -> RemoteMediaUploadAttemptResult:
    config = get_media_storage_provider_config(db, workspace_id)
    if not config.is_enabled or config.provider_code in {"", "none", "local"}:
        return RemoteMediaUploadAttemptResult(remote_upload=None, fallback_used=False)
    if config.provider_code != "custom":
        raise DeferredMediaProcessingError(f"Unsupported media storage provider: {config.provider_code}")
    try:
        remote_upload = await _perform_custom_upload(
            config,
            workspace_id=workspace_id,
            record_id=record_id,
            filename=filename,
            mime_type=mime_type,
            content=content,
        )
    except RuntimeError as exc:
        if not fallback_to_local_on_upload_failure_enabled(config):
            raise
        return RemoteMediaUploadAttemptResult(
            remote_upload=None,
            fallback_used=True,
            fallback_reason=str(exc),
            fallback_provider=config.provider_code,
            fallback_at=time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
        )
    return RemoteMediaUploadAttemptResult(remote_upload=remote_upload, fallback_used=False)


def download_remote_media_via_provider(db: Session, media: MediaAsset) -> RemoteMediaContentResult:
    config = get_media_storage_provider_config(db, media.workspace_id)
    if config.provider_code != media.storage_provider:
        raise DeferredMediaProcessingError("Remote media provider configuration does not match the stored asset")
    if media.storage_provider != "custom":
        raise DeferredMediaProcessingError(f"Unsupported media storage provider: {media.storage_provider}")
    return _perform_custom_download(config, storage_key=media.storage_key)


def download_remote_media_to_temp_file(db: Session, media: MediaAsset) -> Path:
    content_result = download_remote_media_via_provider(db, media)
    tmp_dir = Path(settings.processing_tmp_dir)
    tmp_dir.mkdir(parents=True, exist_ok=True)
    suffix = Path(media.original_filename or "").suffix or ".bin"
    with tempfile.NamedTemporaryFile(
        dir=tmp_dir,
        prefix=f"remote-media-{media.id}-",
        suffix=suffix,
        delete=False,
    ) as temp_file:
        temp_path = Path(temp_file.name)
        temp_file.write(content_result.content)
    return temp_path


def delete_remote_media_via_provider(db: Session, media: MediaAsset) -> None:
    config = get_media_storage_provider_config(db, media.workspace_id)
    if config.provider_code != media.storage_provider:
        raise DeferredMediaProcessingError("Remote media provider configuration does not match the stored asset")
    if media.storage_provider != "custom":
        raise DeferredMediaProcessingError(f"Unsupported media storage provider: {media.storage_provider}")
    _perform_custom_delete(config, storage_key=media.storage_key)
