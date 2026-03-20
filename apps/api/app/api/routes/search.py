from __future__ import annotations

from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy import or_
from sqlalchemy.orm import Session

from app.api.deps import get_current_user, require_workspace_member
from app.db.session import get_db
from app.models.record import Record
from app.models.user import User
from app.schemas.record import RecordRead


router = APIRouter()


class SearchRequest(BaseModel):
    query: str


@router.post("/{workspace_id}/search")
def search_records(
    workspace_id: str,
    payload: SearchRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> dict:
    require_workspace_member(workspace_id, current_user, db)
    like_value = f"%{payload.query}%"
    records = (
        db.query(Record)
        .filter(
            Record.workspace_id == workspace_id,
            or_(Record.title.ilike(like_value), Record.content.ilike(like_value)),
        )
        .order_by(Record.created_at.desc())
        .limit(10)
        .all()
    )
    return {
        "success": True,
        "data": {
            "items": [RecordRead.model_validate(record).model_dump() for record in records],
            "summary": f"Found {len(records)} record(s) matching '{payload.query}'.",
        },
    }

