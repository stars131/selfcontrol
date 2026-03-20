from __future__ import annotations

from sqlalchemy import or_
from sqlalchemy.orm import Session

from app.models.conversation import Message
from app.models.record import Record


def infer_record_type(text: str) -> str:
    if any(keyword in text.lower() for keyword in ["snack", "chips", "cookie"]):
        return "snack"
    if any(keyword in text.lower() for keyword in ["eat", "food", "dinner", "lunch", "sushi", "hotpot"]):
        return "food"
    if any(keyword in text for keyword in ["零食", "薯片", "饼干"]):
        return "snack"
    if any(keyword in text for keyword in ["饭", "吃", "店", "烤鱼", "火锅", "日料"]):
        return "food"
    return "memo"


def infer_is_avoid(text: str) -> bool:
    return any(keyword in text.lower() for keyword in ["avoid", "bad", "do not buy"]) or any(
        keyword in text for keyword in ["避雷", "难吃", "不好吃", "别买", "踩雷"]
    )


def build_title(text: str) -> str:
    normalized = " ".join(text.split())
    return normalized[:28] + "..." if len(normalized) > 28 else normalized


def should_create_record(text: str) -> bool:
    lowered = text.lower()
    return any(keyword in lowered for keyword in ["save", "add", "record", "remember"]) or any(
        keyword in text for keyword in ["记", "记录", "保存"]
    )


def process_chat_message(db: Session, workspace_id: str, user_id: str, content: str) -> tuple[Message, list[Record]]:
    if should_create_record(content):
        record = Record(
            workspace_id=workspace_id,
            creator_id=user_id,
            type_code=infer_record_type(content),
            title=build_title(content),
            content=content,
            is_avoid=infer_is_avoid(content),
            source_type="chat",
        )
        db.add(record)
        db.flush()
        records = [record]
        reply = Message(
            role="assistant",
            content=f"Saved one record: {record.title or 'Untitled'}.",
            metadata_json={"mode": "create", "record_ids": [record.id]},
        )
        return reply, records

    like_value = f"%{content}%"
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
    reply = Message(
        role="assistant",
        content=f"Found {len(records)} record(s) matching your query.",
        metadata_json={"mode": "search", "record_ids": [record.id for record in records]},
    )
    return reply, records
