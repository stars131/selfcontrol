from datetime import datetime

from pydantic import BaseModel, ConfigDict


class NotificationRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    workspace_id: str
    user_id: str
    reminder_id: str | None = None
    record_id: str | None = None
    title: str
    message: str | None = None
    event_type: str
    status: str
    is_read: bool
    read_at: datetime | None = None
    metadata_json: dict
    created_at: datetime
    updated_at: datetime


class NotificationUpdate(BaseModel):
    is_read: bool | None = None
    status: str | None = None
