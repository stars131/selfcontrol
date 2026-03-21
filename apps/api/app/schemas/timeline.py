from __future__ import annotations

from pydantic import BaseModel, Field

from app.schemas.record import RecordRead


class TimelineDayRead(BaseModel):
    date: str
    count: int
    avoid_count: int
    top_places: list[str] = Field(default_factory=list)
    items: list[RecordRead] = Field(default_factory=list)
