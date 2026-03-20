from datetime import datetime

from pydantic import BaseModel, ConfigDict

from app.schemas.record import RecordRead


class ConversationCreate(BaseModel):
    title: str = "New conversation"


class ConversationRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    workspace_id: str
    user_id: str
    title: str
    created_at: datetime
    updated_at: datetime


class MessageRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    conversation_id: str
    role: str
    content: str
    metadata_json: dict
    created_at: datetime


class MessageCreate(BaseModel):
    content: str


class MessageActionResult(BaseModel):
    assistant_message: MessageRead
    records: list[RecordRead]
