from __future__ import annotations

import json
from datetime import datetime, timezone
from pathlib import Path

from sqlalchemy.orm import Session

from app.core.config import settings
from app.models.media import MediaAsset
from app.services.knowledge import rebuild_record_knowledge
from app.services.media_provider import DeferredMediaProcessingError, extract_text_via_provider


TEXT_MIME_PREFIXES = ("text/",)
TEXT_MIME_TYPES = {
    "application/json",
    "application/ld+json",
    "application/xml",
    "application/javascript",
    "application/x-javascript",
    "application/csv",
    "application/x-yaml",
}
TEXT_FILE_EXTENSIONS = {
    ".txt",
    ".md",
    ".markdown",
    ".csv",
    ".json",
    ".jsonl",
    ".yaml",
    ".yml",
    ".xml",
    ".log",
    ".rtf",
}
MAX_EXTRACTED_TEXT_LENGTH = 12_000


def resolve_storage_path(media: MediaAsset) -> Path:
    return Path(settings.storage_dir).parent / media.storage_key


def is_text_like_media(media: MediaAsset) -> bool:
    suffix = Path(media.original_filename or "").suffix.lower()
    if media.mime_type.startswith(TEXT_MIME_PREFIXES):
        return True
    if media.mime_type in TEXT_MIME_TYPES:
        return True
    return suffix in TEXT_FILE_EXTENSIONS


def decode_best_effort(content: bytes) -> str:
    for encoding in ("utf-8", "utf-8-sig", "gb18030", "gbk", "big5", "latin-1"):
        try:
            return content.decode(encoding)
        except UnicodeDecodeError:
            continue
    return content.decode("utf-8", errors="replace")


def normalize_extracted_text(media: MediaAsset, raw_text: str) -> str:
    suffix = Path(media.original_filename or "").suffix.lower()
    text = raw_text.strip()
    if suffix in {".json", ".jsonl"} or media.mime_type in {"application/json", "application/ld+json"}:
        try:
            parsed = json.loads(text)
            text = json.dumps(parsed, ensure_ascii=False, indent=2)
        except json.JSONDecodeError:
            pass
    return text[:MAX_EXTRACTED_TEXT_LENGTH]


def mark_media_deferred(media: MediaAsset, reason: str, metadata_patch: dict | None = None) -> None:
    media.processing_status = "deferred"
    media.processing_error = reason
    media.processed_at = None
    metadata = dict(media.metadata_json or {})
    metadata.update(metadata_patch or {})
    media.metadata_json = metadata


def process_media_asset(db: Session, media_id: str) -> MediaAsset:
    media = db.get(MediaAsset, media_id)
    if not media:
        raise ValueError("Media asset not found")

    media.processing_status = "processing"
    media.processing_error = None
    db.add(media)
    db.commit()
    db.refresh(media)

    try:
        file_path = resolve_storage_path(media)
        if not file_path.exists():
            raise FileNotFoundError(f"Stored file not found: {file_path}")

        if is_text_like_media(media):
            content = file_path.read_bytes()
            media.extracted_text = normalize_extracted_text(media, decode_best_effort(content))
            media.processing_status = "completed"
            media.processing_error = None
            media.processed_at = datetime.now(timezone.utc)
            metadata = dict(media.metadata_json or {})
            metadata["extraction_mode"] = "text_direct"
            media.metadata_json = metadata
        else:
            try:
                extraction = extract_text_via_provider(db, media, file_path)
            except DeferredMediaProcessingError as exc:
                media.extracted_text = (
                    f"Uploaded {media.media_type} file: {media.original_filename}. "
                    f"Provider processing is not ready: {exc}"
                )
                mark_media_deferred(
                    media,
                    str(exc),
                    metadata_patch={"extraction_mode": "provider_deferred"},
                )
            else:
                media.extracted_text = normalize_extracted_text(media, extraction.text)
                media.processing_status = "completed"
                media.processing_error = None
                media.processed_at = datetime.now(timezone.utc)
                metadata = dict(media.metadata_json or {})
                metadata.update(extraction.metadata_json)
                metadata["extraction_mode"] = extraction.extraction_mode
                metadata["provider_code"] = extraction.provider_code
                metadata["feature_code"] = extraction.feature_code
                if extraction.model_name:
                    metadata["model_name"] = extraction.model_name
                media.metadata_json = metadata

        db.add(media)
        db.commit()
        db.refresh(media)
        rebuild_record_knowledge(db, media.record_id)
        db.refresh(media)
        return media
    except Exception as exc:  # noqa: BLE001
        media.processing_status = "failed"
        media.processing_error = str(exc)
        media.processed_at = None
        db.add(media)
        db.commit()
        db.refresh(media)
        rebuild_record_knowledge(db, media.record_id)
        db.refresh(media)
        return media
