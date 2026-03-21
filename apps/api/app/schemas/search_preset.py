from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


class SearchPresetFilters(BaseModel):
    query: str = ""
    type_code: str = "all"
    is_avoid: str = "all"
    place_query: str = ""
    review_status: str = "all"
    mapped_only: str = "all"


class SearchPresetCreate(BaseModel):
    name: str
    filters: SearchPresetFilters = Field(default_factory=SearchPresetFilters)


class SearchPresetUpdate(BaseModel):
    name: str | None = None
    filters: SearchPresetFilters | None = None


class SearchPresetRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    workspace_id: str
    created_by: str
    name: str
    filters_json: SearchPresetFilters
    created_at: datetime
    updated_at: datetime
