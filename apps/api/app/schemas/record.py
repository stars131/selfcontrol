from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


class RecordCreate(BaseModel):
    type_code: str
    title: str | None = None
    content: str | None = None
    rating: int | None = None
    is_avoid: bool = False
    occurred_at: datetime | None = None
    source_type: str = "manual"
    extra_data: dict = Field(default_factory=dict)


class RecordUpdate(BaseModel):
    title: str | None = None
    content: str | None = None
    rating: int | None = None
    is_avoid: bool | None = None
    occurred_at: datetime | None = None
    status: str | None = None
    extra_data: dict | None = None


class RecordRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    workspace_id: str
    creator_id: str
    type_code: str
    title: str | None = None
    content: str | None = None
    rating: int | None = None
    is_avoid: bool
    occurred_at: datetime | None = None
    source_type: str
    status: str
    extra_data: dict
    created_at: datetime
    updated_at: datetime

