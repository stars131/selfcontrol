from __future__ import annotations

from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.api.deps import get_current_user, require_workspace_member, require_workspace_write_access
from app.api.routes.knowledge_route_helpers import collect_knowledge_search_records, get_workspace_record_or_404
from app.db.session import get_db
from app.models.user import User
from app.schemas.record import RecordRead
from app.services.audit import log_audit_event
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
    require_workspace_write_access(workspace_id, current_user, db)
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
        get_workspace_record_or_404(db, workspace_id=workspace_id, record_id=payload.record_id)
        result = rebuild_record_knowledge(db, payload.record_id)
    else:
        result = rebuild_workspace_knowledge(db, workspace_id)

    stats = get_knowledge_stats(db, workspace_id)
    log_audit_event(
        db,
        workspace_id=workspace_id,
        actor_user_id=current_user.id,
        action_code="knowledge.reindex",
        resource_type="knowledge_index",
        resource_id=payload.record_id,
        message="Rebuilt knowledge index",
        metadata_json={"record_id": payload.record_id, "chunk_count": result.chunk_count},
    )
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
    records = collect_knowledge_search_records(db, hits)
    return {
        "success": True,
        "data": {
            "items": [hit.to_dict() for hit in hits],
            "records": [RecordRead.model_validate(record).model_dump() for record in records],
            "summary": f"Knowledge search returned {len(hits)} hit(s).",
        },
    }
