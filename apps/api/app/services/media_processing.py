from __future__ import annotations

import json
from datetime import datetime, timezone
from pathlib import Path

from sqlalchemy.orm import Session

from app.core.config import settings
from app.models.media import MediaAsset


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
            media.extracted_text = (
                f"Uploaded {media.media_type} file: {media.original_filename}. "
                "Advanced OCR/ASR/video understanding provider is not configured yet."
            )
            media.processing_status = "deferred"
            media.processing_error = "Provider configuration required for this media type"
            media.processed_at = None
            metadata = dict(media.metadata_json or {})
            metadata["extraction_mode"] = "provider_required"
            media.metadata_json = metadata

        db.add(media)
        db.commit()
        db.refresh(media)
        return media
    except Exception as exc:  # noqa: BLE001
        media.processing_status = "failed"
        media.processing_error = str(exc)
        media.processed_at = None
        db.add(media)
        db.commit()
        db.refresh(media)
        return media
