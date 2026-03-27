from __future__ import annotations

from collections.abc import Callable
from pathlib import Path

from sqlalchemy.orm import Session

from app.models.media import MediaAsset
from app.services.media_file_analysis import (
    collect_media_metadata,
    decode_best_effort,
    normalize_extracted_text,
)
from app.services.media_provider import MediaProviderExtractionResult


def build_text_direct_processing_payload(media: MediaAsset, file_path: Path) -> tuple[str, dict]:
    content = file_path.read_bytes()
    extracted_text = normalize_extracted_text(media, decode_best_effort(content))
    metadata = collect_media_metadata(media, file_path, extracted_text)
    metadata["extraction_mode"] = "text_direct"
    return extracted_text, metadata


def build_provider_deferred_processing_payload(media: MediaAsset, file_path: Path, reason: str) -> tuple[str, dict]:
    extracted_text = (
        f"Uploaded {media.media_type} file: {media.original_filename}. "
        f"Provider processing is not ready: {reason}"
    )
    metadata = collect_media_metadata(media, file_path, extracted_text)
    metadata["extraction_mode"] = "provider_deferred"
    return extracted_text, metadata


def build_provider_completed_processing_payload(
    media: MediaAsset,
    file_path: Path,
    extraction: MediaProviderExtractionResult,
) -> tuple[str, dict]:
    extracted_text = normalize_extracted_text(media, extraction.text)
    metadata = collect_media_metadata(media, file_path, extracted_text)
    metadata.update(extraction.metadata_json)
    metadata["extraction_mode"] = extraction.extraction_mode
    metadata["provider_code"] = extraction.provider_code
    metadata["feature_code"] = extraction.feature_code
    if extraction.model_name:
        metadata["model_name"] = extraction.model_name
    return extracted_text, metadata


def finalize_media_processing(
    db: Session,
    media: MediaAsset,
    *,
    rebuild_record_knowledge_fn: Callable[[Session, str], object],
) -> MediaAsset:
    db.add(media)
    db.commit()
    db.refresh(media)
    rebuild_record_knowledge_fn(db, media.record_id)
    db.refresh(media)
    return media
