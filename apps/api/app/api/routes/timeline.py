from __future__ import annotations

from datetime import date

from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.api.deps import get_current_user, require_workspace_member
from app.api.routes.timeline_route_helpers import build_timeline_days, filter_timeline_records
from app.db.session import get_db
from app.models.record import Record
from app.models.user import User


router = APIRouter()


@router.get("/{workspace_id}/timeline")
def list_timeline(
    workspace_id: str,
    type_code: str | None = Query(default=None),
    is_avoid: bool | None = Query(default=None),
    start_date: date | None = Query(default=None),
    end_date: date | None = Query(default=None),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> dict:
    require_workspace_member(workspace_id, current_user, db)

    query = db.query(Record).filter(Record.workspace_id == workspace_id)
    if type_code:
        query = query.filter(Record.type_code == type_code)
    if is_avoid is not None:
        query = query.filter(Record.is_avoid == is_avoid)

    records = query.all()
    filtered_records = filter_timeline_records(
        records,
        start_date=start_date,
        end_date=end_date,
    )
    items = build_timeline_days(filtered_records)
    return {
        "success": True,
        "data": {
            "items": [item.model_dump() for item in items],
            "total_days": len(items),
            "total_records": len(filtered_records),
        },
    }
