from datetime import datetime

from pydantic import BaseModel, ConfigDict


class ShareLinkCreate(BaseModel):
    name: str | None = None
    permission_code: str = "viewer"
    expires_at: datetime | None = None
    max_uses: int | None = None


class ShareLinkUpdate(BaseModel):
    name: str | None = None
    is_enabled: bool | None = None
    expires_at: datetime | None = None
    max_uses: int | None = None


class ShareLinkRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    workspace_id: str
    created_by: str
    name: str
    token_hint: str
    permission_code: str
    is_enabled: bool
    expires_at: datetime | None = None
    max_uses: int | None = None
    use_count: int
    last_used_at: datetime | None = None
    created_at: datetime
    updated_at: datetime


class ShareLinkCreateResult(BaseModel):
    share_link: ShareLinkRead
    access_token: str
    share_path: str


class SharePreviewRead(BaseModel):
    name: str
    workspace_id: str
    workspace_name: str
    workspace_slug: str
    permission_code: str
    is_enabled: bool
    expires_at: datetime | None = None
    max_uses: int | None = None
    use_count: int
