from __future__ import annotations

import uuid
from pathlib import Path
from typing import Any

from fastapi import HTTPException
from fastapi.responses import FileResponse, Response
from sqlalchemy.orm import Session

from app.core.config import settings
from app.models.media import MediaAsset
from app.models.record import Record
from app.services.background_tasks import dispatch_media_processing
from app.services.media_issue_tracking import (
    DEAD_LETTER_RETRY_STATES,
    build_media_processing_issue,
    build_workspace_media_dead_letter_overview,
)
from app.services.media_provider import DeferredMediaProcessingError
from app.services.media_storage import media_uses_local_storage, resolve_storage_path


def normalize_dead_letter_retry_states(values: list[str] | None) -> set[str]:
    normalized = {str(value).strip().lower() for value in (values or []) if str(value).strip()}
    invalid = normalized.difference(DEAD_LETTER_RETRY_STATES)
    if invalid:
        raise HTTPException(
            status_code=400,
            detail=f"Unsupported dead-letter retry states: {', '.join(sorted(invalid))}",
        )
    return normalized or set(DEAD_LETTER_RETRY_STATES)


def get_workspace_media_or_404(db: Session, workspace_id: str, media_id: str) -> MediaAsset:
    media = db.get(MediaAsset, media_id)
    if not media or media.workspace_id != workspace_id:
        raise HTTPException(status_code=404, detail="Media not found")
    return media


def get_workspace_record_or_404(db: Session, workspace_id: str, record_id: str) -> Record:
    record = db.get(Record, record_id)
    if not record or record.workspace_id != workspace_id:
        raise HTTPException(status_code=404, detail="Record not found")
    return record


def collect_dead_letter_target_items(
    db: Session,
    *,
    workspace_id: str,
    media_ids: list[str],
    limit: int,
    retry_states: set[str],
) -> list[MediaAsset]:
    if media_ids:
        target_items: list[MediaAsset] = []
        seen_media_ids: set[str] = set()
        for media_id in media_ids:
            if media_id in seen_media_ids:
                continue
            seen_media_ids.add(media_id)
            media = db.get(MediaAsset, media_id)
            if media and media.workspace_id == workspace_id:
                target_items.append(media)
        return target_items

    overview = build_workspace_media_dead_letter_overview(
        db,
        workspace_id,
        limit=limit,
        retry_states=retry_states,
    )
    target_items = []
    for item in overview["items"]:
        media = db.get(MediaAsset, item["media_id"])
        if media is not None:
            target_items.append(media)
    return target_items


def execute_dead_letter_bulk_retry(
    db: Session,
    *,
    target_items: list[MediaAsset],
    retry_states: set[str],
    workspace_id: str,
) -> dict[str, Any]:
    retried_media_ids: list[str] = []
    skipped_media_ids: list[str] = []
    skipped_reason_by_media_id: dict[str, str] = {}
    queued_count = 0
    processing_count = 0

    for media in target_items:
        retry_state = str((media.metadata_json or {}).get("processing_retry_state") or "").strip().lower()
        if retry_state not in retry_states:
            skipped_media_ids.append(media.id)
            skipped_reason_by_media_id[media.id] = "retry_state_not_selected"
            continue
        issue = build_media_processing_issue(media)
        if issue.get("can_bulk_retry") is not True:
            skipped_media_ids.append(media.id)
            skipped_reason_by_media_id[media.id] = "bulk_retry_not_recommended"
            continue
        if media.storage_provider == "local":
            skipped_media_ids.append(media.id)
            skipped_reason_by_media_id[media.id] = "local_storage_not_supported"
            continue
        if media.processing_status == "completed":
            skipped_media_ids.append(media.id)
            skipped_reason_by_media_id[media.id] = "already_completed"
            continue
        _, processing_mode = dispatch_media_processing(db, media.id)
        retried_media_ids.append(media.id)
        if processing_mode == "async":
            queued_count += 1
        else:
            processing_count += 1

    return {
        "workspace_id": workspace_id,
        "target_count": len(target_items),
        "retried_count": len(retried_media_ids),
        "queued_count": queued_count,
        "processing_count": processing_count,
        "skipped_media_ids": skipped_media_ids,
        "skipped_reason_by_media_id": skipped_reason_by_media_id,
        "retried_media_ids": retried_media_ids,
    }


def build_media_content_response(db: Session, media: MediaAsset, *, download_remote_media):
    if not media_uses_local_storage(media):
        try:
            remote_content = download_remote_media(db, media)
        except DeferredMediaProcessingError as exc:
            raise HTTPException(status_code=409, detail=str(exc)) from exc
        except FileNotFoundError as exc:
            raise HTTPException(status_code=404, detail=str(exc)) from exc
        except RuntimeError as exc:
            raise HTTPException(status_code=502, detail=str(exc)) from exc
        return Response(
            content=remote_content.content,
            media_type=remote_content.media_type or media.mime_type or "application/octet-stream",
            headers={"Content-Disposition": f'inline; filename="{media.original_filename}"'},
        )

    file_path = resolve_storage_path(media)
    if not file_path.exists():
        raise HTTPException(status_code=404, detail="Stored file not found")

    return FileResponse(
        path=file_path,
        media_type=media.mime_type or "application/octet-stream",
        filename=media.original_filename,
    )


def build_uploaded_media_asset(
    *,
    upload_attempt,
    workspace_id: str,
    record_id: str,
    uploaded_by: str,
    original_filename: str,
    mime_type: str,
    media_type: str,
    content: bytes,
) -> MediaAsset:
    remote_upload = upload_attempt.remote_upload
    if remote_upload is not None:
        return MediaAsset(
            workspace_id=workspace_id,
            record_id=record_id,
            uploaded_by=uploaded_by,
            media_type=media_type,
            storage_provider=remote_upload.storage_provider,
            storage_key=remote_upload.storage_key,
            original_filename=original_filename,
            mime_type=mime_type,
            size_bytes=remote_upload.size_bytes,
            metadata_json=remote_upload.metadata_json,
            processing_status="pending",
            processing_error=None,
        )

    target_dir = Path(settings.storage_dir) / workspace_id
    target_dir.mkdir(parents=True, exist_ok=True)
    target_name = f"{uuid.uuid4().hex}_{original_filename}"
    target_path = target_dir / target_name
    target_path.write_bytes(content)
    fallback_metadata: dict[str, str] = {}
    if upload_attempt.fallback_used:
        fallback_metadata = {
            "storage_fallback_mode": "remote_to_local",
            "storage_fallback_reason": upload_attempt.fallback_reason or "Remote media upload failed",
            "storage_fallback_provider": upload_attempt.fallback_provider or "custom",
        }
        if upload_attempt.fallback_at:
            fallback_metadata["storage_fallback_at"] = upload_attempt.fallback_at

    return MediaAsset(
        workspace_id=workspace_id,
        record_id=record_id,
        uploaded_by=uploaded_by,
        media_type=media_type,
        storage_provider="local",
        storage_key=str(target_path.relative_to(Path(settings.storage_dir).parent)),
        original_filename=original_filename,
        mime_type=mime_type,
        size_bytes=len(content),
        metadata_json=fallback_metadata,
        processing_status="pending",
    )
