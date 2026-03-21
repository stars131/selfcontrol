from datetime import datetime

from pydantic import BaseModel, ConfigDict


class WorkspaceCreate(BaseModel):
    name: str
    slug: str
    visibility: str = "private"


class WorkspaceRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    name: str
    slug: str
    owner_id: str
    visibility: str
    role: str
    created_at: datetime


class WorkspaceMemberRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    workspace_id: str
    user_id: str
    role: str
    username: str
    email: str | None = None
    display_name: str | None = None
    created_at: datetime


class WorkspaceMemberUpdate(BaseModel):
    role: str


class WorkspaceImportResultRead(BaseModel):
    workspace: WorkspaceRead
    imported_record_count: int
    imported_media_count: int
    imported_reference_media_count: int = 0
    skipped_media_count: int


class WorkspaceTransferJobRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    workspace_id: str | None = None
    created_by: str
    job_type: str
    status: str
    payload_json: dict
    result_json: dict
    artifact_filename: str | None = None
    error_message: str | None = None
    created_at: datetime
    updated_at: datetime
    completed_at: datetime | None = None
