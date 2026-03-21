from __future__ import annotations

import json
import re
import tempfile
import zipfile
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

from sqlalchemy.orm import Session

from app.models.media import MediaAsset
from app.models.record import Record
from app.models.workspace import Workspace, WorkspaceMember
from app.services.media_storage import media_uses_local_storage, resolve_storage_path

SENSITIVE_METADATA_TOKENS = {
    "access_token",
    "api_key",
    "authorization",
    "cookie",
    "credential",
    "download_url",
    "headers",
    "password",
    "presigned_url",
    "secret",
    "session",
    "signature",
    "signed_url",
    "token",
    "upload_url",
}


def _isoformat(value: datetime | None) -> str | None:
    if value is None:
        return None
    if value.tzinfo is None:
        value = value.replace(tzinfo=timezone.utc)
    return value.isoformat()


def _safe_filename_part(value: str, fallback: str) -> str:
    cleaned = re.sub(r"[^A-Za-z0-9._-]+", "-", value).strip("-._")
    return cleaned or fallback


def _serialize_member(member: WorkspaceMember) -> dict:
    return {
        "id": member.id,
        "user_id": member.user_id,
        "username": member.user.username,
        "email": member.user.email,
        "display_name": member.user.display_name,
        "role": member.role,
        "created_at": _isoformat(member.created_at),
    }


def _serialize_record(record: Record) -> dict:
    return {
        "id": record.id,
        "creator_id": record.creator_id,
        "type_code": record.type_code,
        "title": record.title,
        "content": record.content,
        "rating": record.rating,
        "is_avoid": record.is_avoid,
        "occurred_at": _isoformat(record.occurred_at),
        "source_type": record.source_type,
        "status": record.status,
        "extra_data": record.extra_data,
        "created_at": _isoformat(record.created_at),
        "updated_at": _isoformat(record.updated_at),
    }


def _normalize_metadata_key(key: str) -> str:
    return re.sub(r"[^a-z0-9]+", "_", key.lower()).strip("_")


def _sanitize_metadata_for_export(value: Any) -> Any:
    if isinstance(value, dict):
        sanitized: dict[str, Any] = {}
        for key, item in value.items():
            normalized_key = _normalize_metadata_key(str(key))
            if any(token in normalized_key for token in SENSITIVE_METADATA_TOKENS):
                continue
            sanitized[str(key)] = _sanitize_metadata_for_export(item)
        return sanitized
    if isinstance(value, list):
        return [_sanitize_metadata_for_export(item) for item in value]
    return value


def build_workspace_export_archive(
    db: Session,
    workspace_id: str,
    *,
    exported_by_user_id: str,
) -> tuple[Path, dict]:
    workspace = db.get(Workspace, workspace_id)
    if not workspace:
        raise ValueError("Workspace not found")

    members = (
        db.query(WorkspaceMember)
        .filter(WorkspaceMember.workspace_id == workspace_id)
        .order_by(WorkspaceMember.created_at.asc())
        .all()
    )
    records = db.query(Record).filter(Record.workspace_id == workspace_id).order_by(Record.created_at.asc()).all()
    media_assets = (
        db.query(MediaAsset)
        .filter(MediaAsset.workspace_id == workspace_id)
        .order_by(MediaAsset.created_at.asc())
        .all()
    )

    media_manifest_items: list[dict] = []
    exported_media_files = 0
    missing_media_files = 0
    reference_only_media_files = 0
    remote_media_files = 0

    temp_file = tempfile.NamedTemporaryFile(prefix=f"workspace-export-{workspace_id}-", suffix=".zip", delete=False)
    archive_path = Path(temp_file.name)
    temp_file.close()

    with zipfile.ZipFile(archive_path, mode="w", compression=zipfile.ZIP_DEFLATED) as archive:
        for media in media_assets:
            uses_local_storage = media_uses_local_storage(media)
            source_path = resolve_storage_path(media) if uses_local_storage else None
            can_export_file = bool(uses_local_storage and source_path and source_path.exists())
            file_missing = bool(uses_local_storage and source_path and not source_path.exists())
            export_skip_reason = None
            if not can_export_file:
                if file_missing:
                    export_skip_reason = "missing_storage_file"
                elif uses_local_storage:
                    export_skip_reason = "storage_file_unavailable"
                else:
                    export_skip_reason = "remote_storage_reference_only"
            suffix = Path(media.original_filename or "").suffix
            media_filename = (
                f"{media.id}_{_safe_filename_part(Path(media.original_filename or '').stem, 'media')}{suffix}"
            )
            archive_member_path = f"media/{media.record_id}/{media_filename}"
            export_mode = "embedded_file" if can_export_file else "reference_only" if not uses_local_storage else "metadata_only"
            media_manifest_items.append(
                {
                    "id": media.id,
                    "record_id": media.record_id,
                    "uploaded_by": media.uploaded_by,
                    "media_type": media.media_type,
                    "storage_provider": media.storage_provider,
                    "storage_key": media.storage_key,
                    "original_filename": media.original_filename,
                    "mime_type": media.mime_type,
                    "size_bytes": media.size_bytes,
                    "metadata_json": _sanitize_metadata_for_export(media.metadata_json if isinstance(media.metadata_json, dict) else {}),
                    "processing_status": media.processing_status,
                    "processing_error": media.processing_error,
                    "extracted_text": media.extracted_text,
                    "processed_at": _isoformat(media.processed_at),
                    "created_at": _isoformat(media.created_at),
                    "updated_at": _isoformat(media.updated_at),
                    "export_mode": export_mode,
                    "archive_path": archive_member_path if can_export_file else None,
                    "export_included": can_export_file,
                    "export_skip_reason": export_skip_reason,
                    "missing_storage_file": file_missing,
                }
            )
            if not can_export_file:
                if file_missing:
                    missing_media_files += 1
                else:
                    reference_only_media_files += 1
                    if not uses_local_storage:
                        remote_media_files += 1
                continue
            archive.write(source_path, archive_member_path)
            exported_media_files += 1

        manifest = {
            "schema_version": "workspace-export-v1",
            "exported_at": _isoformat(datetime.now(timezone.utc)),
            "exported_by_user_id": exported_by_user_id,
            "workspace": {
                "id": workspace.id,
                "name": workspace.name,
                "slug": workspace.slug,
                "owner_id": workspace.owner_id,
                "visibility": workspace.visibility,
                "created_at": _isoformat(workspace.created_at),
                "updated_at": _isoformat(workspace.updated_at),
            },
            "members": [_serialize_member(member) for member in members],
            "records": [_serialize_record(record) for record in records],
            "media_assets": media_manifest_items,
            "counts": {
                "member_count": len(members),
                "record_count": len(records),
                "media_count": len(media_assets),
                "exported_media_file_count": exported_media_files,
                "missing_media_file_count": missing_media_files,
                "reference_only_media_count": reference_only_media_files,
                "remote_media_count": remote_media_files,
            },
            "excluded": [
                "provider secrets",
                "access tokens",
                "share tokens",
            ],
        }
        archive.writestr("manifest.json", json.dumps(manifest, ensure_ascii=False, indent=2))

    return archive_path, manifest["counts"]
