from datetime import datetime

from pydantic import BaseModel, ConfigDict


class MediaRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    workspace_id: str
    record_id: str
    uploaded_by: str
    media_type: str
    storage_key: str
    original_filename: str
    mime_type: str
    size_bytes: int
    metadata_json: dict
    created_at: datetime
