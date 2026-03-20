from __future__ import annotations

from sqlalchemy.orm import Session

from app.models.conversation import Message
from app.models.record import Record
from app.services.knowledge import search_records_hybrid


CREATE_KEYWORDS = {"save", "add", "record", "remember", "note"}
CREATE_KEYWORDS_ZH = {
    "\u8bb0\u4e00\u4e0b",
    "\u8bb0\u5f55",
    "\u4fdd\u5b58",
    "\u5907\u5fd8",
    "\u5907\u6ce8",
}
AVOID_KEYWORDS = {"avoid", "bad", "do not buy", "not good", "dislike"}
AVOID_KEYWORDS_ZH = {
    "\u907f\u96f7",
    "\u96be\u5403",
    "\u4e0d\u597d\u5403",
    "\u522b\u4e70",
    "\u4e0d\u63a8\u8350",
}
SNACK_KEYWORDS = {"snack", "chips", "cookie", "dessert", "candy"}
SNACK_KEYWORDS_ZH = {
    "\u96f6\u98df",
    "\u85af\u7247",
    "\u997c\u5e72",
    "\u7cd6\u679c",
    "\u751c\u54c1",
}
FOOD_KEYWORDS = {"eat", "food", "dinner", "lunch", "sushi", "hotpot", "restaurant"}
FOOD_KEYWORDS_ZH = {
    "\u996d",
    "\u83dc",
    "\u9910\u5385",
    "\u70e4\u9c7c",
    "\u706b\u9505",
    "\u65e5\u6599",
    "\u597d\u5403",
    "\u96be\u5403",
}


def contains_any_keyword(text: str, keywords: set[str]) -> bool:
    lowered = text.lower()
    return any(keyword in lowered for keyword in keywords)


def contains_any_phrase(text: str, phrases: set[str]) -> bool:
    return any(phrase in text for phrase in phrases)


def infer_record_type(text: str) -> str:
    if contains_any_keyword(text, SNACK_KEYWORDS) or contains_any_phrase(text, SNACK_KEYWORDS_ZH):
        return "snack"
    if contains_any_keyword(text, FOOD_KEYWORDS) or contains_any_phrase(text, FOOD_KEYWORDS_ZH):
        return "food"
    return "memo"


def infer_is_avoid(text: str) -> bool:
    return contains_any_keyword(text, AVOID_KEYWORDS) or contains_any_phrase(text, AVOID_KEYWORDS_ZH)


def build_title(text: str) -> str:
    normalized = " ".join(text.split())
    return normalized[:28] + "..." if len(normalized) > 28 else normalized


def should_create_record(text: str) -> bool:
    return contains_any_keyword(text, CREATE_KEYWORDS) or contains_any_phrase(text, CREATE_KEYWORDS_ZH)


def build_search_reply(records: list[Record], hits: list, query: str) -> tuple[str, dict]:
    if not records:
        return (
            f"No matching memory found for '{query}'.",
            {"mode": "search", "record_ids": [], "retrieval_mode": "hybrid", "sources": []},
        )

    source_items = []
    lines = [f"Found {len(records)} related record(s) for '{query}'."]
    for index, record in enumerate(records[:3], start=1):
        matching_hit = next((item for item in hits if item.record_id == record.id), None)
        label = record.title or "Untitled record"
        if matching_hit:
            lines.append(f"{index}. {label} [{record.type_code}] {matching_hit.snippet}")
            source_items.append(matching_hit.to_dict())
        else:
            preview = (record.content or "")[:120].strip()
            suffix = "..." if record.content and len(record.content) > 120 else ""
            lines.append(f"{index}. {label} [{record.type_code}] {preview}{suffix}")

    retrieval_mode = "rag" if hits else "keyword"
    return (
        "\n".join(lines),
        {
            "mode": "search",
            "record_ids": [record.id for record in records],
            "retrieval_mode": retrieval_mode,
            "sources": source_items,
        },
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
            content=f"Saved one record: {record.title or 'Untitled record'}.",
            metadata_json={"mode": "create", "record_ids": [record.id]},
        )
        return reply, records

    records, hits = search_records_hybrid(db, workspace_id, content, limit=10)
    reply_content, metadata = build_search_reply(records, hits, content)
    reply = Message(
        role="assistant",
        content=reply_content,
        metadata_json=metadata,
    )
    return reply, records
