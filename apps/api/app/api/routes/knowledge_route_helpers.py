from __future__ import annotations

from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.record import Record
from app.services.knowledge_types import KnowledgeSearchHit


def get_workspace_record_or_404(db: Session, *, workspace_id: str, record_id: str) -> Record:
    record = db.get(Record, record_id)
    if not record or record.workspace_id != workspace_id:
        raise HTTPException(status_code=404, detail="Record not found")
    return record


def collect_knowledge_search_records(db: Session, hits: list[KnowledgeSearchHit]) -> list[Record]:
    ordered_record_ids: list[str] = []
    for hit in hits:
        if hit.record_id not in ordered_record_ids:
            ordered_record_ids.append(hit.record_id)

    records = [db.get(Record, record_id) for record_id in ordered_record_ids]
    return [record for record in records if record is not None]
