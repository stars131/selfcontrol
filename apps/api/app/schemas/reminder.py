from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


class ReminderCreate(BaseModel):
    title: str | None = None
    message: str | None = None
    remind_at: datetime
    channel_code: str = "in_app"
    is_enabled: bool = True
    metadata_json: dict = Field(default_factory=dict)


class ReminderUpdate(BaseModel):
    title: str | None = None
    message: str | None = None
    remind_at: datetime | None = None
    channel_code: str | None = None
    status: str | None = None
    is_enabled: bool | None = None
    delivered_at: datetime | None = None
    cancelled_at: datetime | None = None
    metadata_json: dict | None = None


class ReminderRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    workspace_id: str
    record_id: str
    created_by: str
    channel_code: str
    title: str | None = None
    message: str | None = None
    remind_at: datetime
    status: str
    is_enabled: bool
    delivered_at: datetime | None = None
    cancelled_at: datetime | None = None
    metadata_json: dict
    created_at: datetime
    updated_at: datetime
