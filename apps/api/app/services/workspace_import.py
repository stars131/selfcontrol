from __future__ import annotations

import json
import re
import uuid
import zipfile
from io import BytesIO
from datetime import datetime, timezone
from pathlib import Path

from sqlalchemy.orm import Session

from app.core.config import settings
from app.models.media import MediaAsset
from app.models.record import Record
from app.models.workspace import Workspace, WorkspaceMember
from app.services.knowledge import rebuild_record_knowledge
from app.services.media_storage import is_local_storage_provider


def _slugify(value: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", value.lower().strip()).strip("-")


def _parse_datetime(value: object) -> datetime | None:
    if not isinstance(value, str) or not value.strip():
        return None
    normalized = value.replace("Z", "+00:00")
    try:
        return datetime.fromisoformat(normalized)
    except ValueError:
        return None


def _ensure_unique_workspace_slug(db: Session, slug: str) -> str:
    base_slug = _slugify(slug) or f"workspace-{uuid.uuid4().hex[:8]}"
    candidate = base_slug
    index = 2
    while db.query(Workspace).filter(Workspace.slug == candidate).first():
        candidate = f"{base_slug}-{index}"
        index += 1
    return candidate


def _build_imported_reference_metadata(metadata_json: dict) -> dict:
    return {
        **metadata_json,
        "import_mode": "reference_only",
        "reference_only_imported_at": datetime.now(timezone.utc).isoformat(),
    }


def import_workspace_archive(
    db: Session,
    archive_bytes: bytes,
    *,
    owner_user_id: str,
    workspace_name: str | None = None,
    workspace_slug: str | None = None,
) -> tuple[Workspace, dict]:
    try:
        archive = zipfile.ZipFile(BytesIO(archive_bytes))
    except zipfile.BadZipFile as exc:
        raise ValueError("Invalid ZIP archive") from exc

    if "manifest.json" not in archive.namelist():
        raise ValueError("Archive is missing manifest.json")

    try:
        manifest = json.loads(archive.read("manifest.json").decode("utf-8"))
    except Exception as exc:  # noqa: BLE001
        raise ValueError("Archive manifest is invalid") from exc

    if manifest.get("schema_version") != "workspace-export-v1":
        raise ValueError("Unsupported workspace export schema")

    workspace_payload = manifest.get("workspace")
    records_payload = manifest.get("records")
    media_payload = manifest.get("media_assets")
    if not isinstance(workspace_payload, dict) or not isinstance(records_payload, list) or not isinstance(media_payload, list):
        raise ValueError("Archive manifest is incomplete")

    resolved_name = (workspace_name or workspace_payload.get("name") or "Imported workspace").strip()
    if not resolved_name:
        resolved_name = "Imported workspace"
    resolved_slug = _ensure_unique_workspace_slug(
        db,
        workspace_slug or f"{workspace_payload.get('slug') or 'workspace'}-import",
    )

    workspace = Workspace(
        name=resolved_name,
        slug=resolved_slug,
        owner_id=owner_user_id,
        visibility="private",
    )
    db.add(workspace)
    db.flush()

    db.add(
        WorkspaceMember(
            workspace_id=workspace.id,
            user_id=owner_user_id,
            role="owner",
        )
    )
    db.flush()

    record_id_map: dict[str, str] = {}
    created_records: list[Record] = []
    for item in records_payload:
        if not isinstance(item, dict):
            continue
        record = Record(
            workspace_id=workspace.id,
            creator_id=owner_user_id,
            type_code=item.get("type_code") or "memo",
            title=item.get("title"),
            content=item.get("content"),
            rating=item.get("rating"),
            is_avoid=bool(item.get("is_avoid", False)),
            occurred_at=_parse_datetime(item.get("occurred_at")),
            source_type=item.get("source_type") or "imported",
            status=item.get("status") or "active",
            extra_data=item.get("extra_data") if isinstance(item.get("extra_data"), dict) else {},
        )
        db.add(record)
        db.flush()
        original_record_id = item.get("id")
        if isinstance(original_record_id, str):
            record_id_map[original_record_id] = record.id
        created_records.append(record)

    target_dir = Path(settings.storage_dir) / workspace.id
    target_dir.mkdir(parents=True, exist_ok=True)

    imported_media_count = 0
    imported_reference_media_count = 0
    skipped_media_count = 0
    for item in media_payload:
        if not isinstance(item, dict):
            skipped_media_count += 1
            continue
        original_record_id = item.get("record_id")
        if not isinstance(original_record_id, str) or original_record_id not in record_id_map:
            skipped_media_count += 1
            continue

        original_filename = item.get("original_filename") or "media.bin"
        metadata_json = item.get("metadata_json") if isinstance(item.get("metadata_json"), dict) else {}
        storage_provider = str(item.get("storage_provider") or "local")
        archive_path = item.get("archive_path")
        if isinstance(archive_path, str) and archive_path in archive.namelist():
            target_name = f"{uuid.uuid4().hex}_{Path(str(original_filename)).name}"
            target_path = target_dir / target_name
            target_path.write_bytes(archive.read(archive_path))

            media = MediaAsset(
                workspace_id=workspace.id,
                record_id=record_id_map[original_record_id],
                uploaded_by=owner_user_id,
                media_type=item.get("media_type") or "file",
                storage_provider="local",
                storage_key=str(target_path.relative_to(Path(settings.storage_dir).parent)),
                original_filename=str(original_filename),
                mime_type=item.get("mime_type") or "application/octet-stream",
                size_bytes=int(item.get("size_bytes") or target_path.stat().st_size),
                metadata_json=metadata_json,
                processing_status=item.get("processing_status") or "completed",
                processing_error=item.get("processing_error"),
                extracted_text=item.get("extracted_text"),
                processed_at=_parse_datetime(item.get("processed_at")),
            )
            db.add(media)
            imported_media_count += 1
            continue

        storage_key = item.get("storage_key")
        if not is_local_storage_provider(storage_provider) and isinstance(storage_key, str) and storage_key.strip():
            extracted_text = item.get("extracted_text")
            processing_status = item.get("processing_status") or ("completed" if extracted_text else "deferred")
            processing_error = item.get("processing_error")
            if not extracted_text and processing_status == "completed":
                processing_status = "deferred"
                processing_error = "Reference-only remote media was imported without local file payload"
            processed_at = _parse_datetime(item.get("processed_at")) if processing_status == "completed" else None

            media = MediaAsset(
                workspace_id=workspace.id,
                record_id=record_id_map[original_record_id],
                uploaded_by=owner_user_id,
                media_type=item.get("media_type") or "file",
                storage_provider=storage_provider,
                storage_key=storage_key.strip(),
                original_filename=str(original_filename),
                mime_type=item.get("mime_type") or "application/octet-stream",
                size_bytes=int(item.get("size_bytes") or 0),
                metadata_json=_build_imported_reference_metadata(metadata_json),
                processing_status=processing_status,
                processing_error=processing_error,
                extracted_text=extracted_text if isinstance(extracted_text, str) else None,
                processed_at=processed_at,
            )
            db.add(media)
            imported_media_count += 1
            imported_reference_media_count += 1
            continue

        skipped_media_count += 1

    db.commit()
    db.refresh(workspace)

    for record in created_records:
        rebuild_record_knowledge(db, record.id)

    return workspace, {
        "imported_record_count": len(created_records),
        "imported_media_count": imported_media_count,
        "imported_reference_media_count": imported_reference_media_count,
        "skipped_media_count": skipped_media_count,
    }
