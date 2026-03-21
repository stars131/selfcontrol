from datetime import datetime

from pydantic import BaseModel, ConfigDict


class MediaRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    workspace_id: str
    record_id: str
    uploaded_by: str
    media_type: str
    storage_provider: str
    storage_key: str
    original_filename: str
    mime_type: str
    size_bytes: int
    metadata_json: dict
    processing_status: str
    processing_error: str | None = None
    extracted_text: str | None = None
    processed_at: datetime | None = None
    created_at: datetime
    updated_at: datetime


class MediaStorageSummaryRead(BaseModel):
    workspace_id: str
    total_count: int
    total_size_bytes: int
    total_size_label: str
    missing_file_count: int
    by_media_type: dict[str, int]
    by_processing_status: dict[str, int]
    largest_item_name: str | None = None
    largest_item_size_bytes: int | None = None
    largest_item_size_label: str | None = None


class MediaRetentionItemRead(BaseModel):
    media_id: str
    record_id: str
    original_filename: str
    media_type: str
    processing_status: str
    size_bytes: int
    size_label: str
    created_at: datetime
    age_days: int
    file_missing: bool


class MediaRetentionReportRead(BaseModel):
    workspace_id: str
    older_than_days: int
    total_count: int
    total_size_bytes: int
    total_size_label: str
    oldest_media_age_days: int | None = None
    old_item_count: int
    old_item_size_bytes: int
    old_item_size_label: str
    missing_file_count: int
    orphan_file_count: int
    orphan_file_size_bytes: int
    orphan_file_size_label: str
    largest_items: list[MediaRetentionItemRead]
    retention_candidates: list[MediaRetentionItemRead]
