from __future__ import annotations

from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.conversation import Conversation, Message
from app.models.record import Record
from app.services.audit import log_audit_event
from app.services.knowledge import rebuild_record_knowledge


def get_user_workspace_conversation_or_404(
    db: Session,
    *,
    workspace_id: str,
    conversation_id: str,
    user_id: str,
) -> Conversation:
    conversation = db.get(Conversation, conversation_id)
    if not conversation or conversation.workspace_id != workspace_id or conversation.user_id != user_id:
        raise HTTPException(status_code=404, detail="Conversation not found")
    return conversation


def persist_chat_messages(
    db: Session,
    *,
    conversation_id: str,
    assistant_message: Message,
    user_content: str,
) -> Message:
    user_message = Message(
        conversation_id=conversation_id,
        role="user",
        content=user_content,
        metadata_json={},
    )
    db.add(user_message)
    db.flush()

    assistant_message.conversation_id = conversation_id
    db.add(assistant_message)
    return user_message


def finalize_chat_record_side_effects(
    db: Session,
    *,
    workspace_id: str,
    actor_user_id: str,
    assistant_message: Message,
    records: list[Record],
) -> None:
    for record in records:
        rebuild_record_knowledge(db, record.id)
        if str(assistant_message.metadata_json.get("mode", "")) == "create":
            log_audit_event(
                db,
                workspace_id=workspace_id,
                actor_user_id=actor_user_id,
                action_code="record.create_from_chat",
                resource_type="record",
                resource_id=record.id,
                message=f"Created record from chat: {record.title or record.id}",
                metadata_json={"type_code": record.type_code},
            )
