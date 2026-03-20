from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.api.deps import get_current_user, require_workspace_member
from app.db.session import get_db
from app.models.record import Record
from app.models.user import User
from app.schemas.record import RecordRead
from app.services.knowledge import (
    get_knowledge_stats,
    rebuild_record_knowledge,
    rebuild_workspace_knowledge,
    search_knowledge,
)


router = APIRouter()


class KnowledgeReindexRequest(BaseModel):
    record_id: str | None = None


class KnowledgeSearchRequest(BaseModel):
    query: str
    limit: int | None = None


@router.get("/{workspace_id}/knowledge/stats")
def get_workspace_knowledge_stats(
    workspace_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> dict:
    require_workspace_member(workspace_id, current_user, db)
    stats = get_knowledge_stats(db, workspace_id)
    return {"success": True, "data": {"stats": stats.to_dict()}}


@router.post("/{workspace_id}/knowledge/reindex")
def reindex_workspace_knowledge(
    workspace_id: str,
    payload: KnowledgeReindexRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> dict:
    require_workspace_member(workspace_id, current_user, db)

    if payload.record_id:
        record = db.get(Record, payload.record_id)
        if not record or record.workspace_id != workspace_id:
            raise HTTPException(status_code=404, detail="Record not found")
        result = rebuild_record_knowledge(db, payload.record_id)
    else:
        result = rebuild_workspace_knowledge(db, workspace_id)

    stats = get_knowledge_stats(db, workspace_id)
    return {
        "success": True,
        "data": {
            "result": result.to_dict(),
            "stats": stats.to_dict(),
        },
    }


@router.post("/{workspace_id}/knowledge/search")
def search_workspace_knowledge(
    workspace_id: str,
    payload: KnowledgeSearchRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> dict:
    require_workspace_member(workspace_id, current_user, db)
    hits = search_knowledge(db, workspace_id, payload.query, payload.limit)
    ordered_record_ids: list[str] = []
    for hit in hits:
        if hit.record_id not in ordered_record_ids:
            ordered_record_ids.append(hit.record_id)

    records = [db.get(Record, record_id) for record_id in ordered_record_ids]
    records = [record for record in records if record is not None]
    return {
        "success": True,
        "data": {
            "items": [hit.to_dict() for hit in hits],
            "records": [RecordRead.model_validate(record).model_dump() for record in records],
            "summary": f"Knowledge search returned {len(hits)} hit(s).",
        },
    }
