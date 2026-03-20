from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.api.deps import get_current_user, require_workspace_member
from app.db.session import get_db
from app.models.conversation import Conversation, Message
from app.models.user import User
from app.schemas.conversation import (
    ConversationCreate,
    ConversationRead,
    MessageCreate,
    MessageRead,
)
from app.schemas.record import RecordRead
from app.services.chat import process_chat_message


router = APIRouter()


@router.get("/{workspace_id}/conversations")
def list_conversations(
    workspace_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> dict:
    require_workspace_member(workspace_id, current_user, db)
    items = (
        db.query(Conversation)
        .filter(Conversation.workspace_id == workspace_id, Conversation.user_id == current_user.id)
        .order_by(Conversation.updated_at.desc())
        .all()
    )
    return {
        "success": True,
        "data": {"items": [ConversationRead.model_validate(item).model_dump() for item in items]},
    }


@router.post("/{workspace_id}/conversations")
def create_conversation(
    workspace_id: str,
    payload: ConversationCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> dict:
    require_workspace_member(workspace_id, current_user, db)
    item = Conversation(workspace_id=workspace_id, user_id=current_user.id, title=payload.title)
    db.add(item)
    db.commit()
    db.refresh(item)
    return {"success": True, "data": {"conversation": ConversationRead.model_validate(item).model_dump()}}


@router.get("/{workspace_id}/conversations/{conversation_id}/messages")
def list_messages(
    workspace_id: str,
    conversation_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> dict:
    require_workspace_member(workspace_id, current_user, db)
    conversation = db.get(Conversation, conversation_id)
    if not conversation or conversation.workspace_id != workspace_id or conversation.user_id != current_user.id:
        raise HTTPException(status_code=404, detail="Conversation not found")

    items = (
        db.query(Message)
        .filter(Message.conversation_id == conversation_id)
        .order_by(Message.created_at.asc())
        .all()
    )
    return {"success": True, "data": {"items": [MessageRead.model_validate(item).model_dump() for item in items]}}


@router.post("/{workspace_id}/conversations/{conversation_id}/messages")
def send_message(
    workspace_id: str,
    conversation_id: str,
    payload: MessageCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> dict:
    require_workspace_member(workspace_id, current_user, db)
    conversation = db.get(Conversation, conversation_id)
    if not conversation or conversation.workspace_id != workspace_id or conversation.user_id != current_user.id:
        raise HTTPException(status_code=404, detail="Conversation not found")

    user_message = Message(
        conversation_id=conversation_id,
        role="user",
        content=payload.content,
        metadata_json={},
    )
    db.add(user_message)
    db.flush()

    assistant_message, records = process_chat_message(db, workspace_id, current_user.id, payload.content)
    assistant_message.conversation_id = conversation_id
    db.add(assistant_message)
    db.add(conversation)
    db.commit()
    db.refresh(assistant_message)

    return {
        "success": True,
        "data": {
            "user_message": MessageRead.model_validate(user_message).model_dump(),
            "assistant_message": MessageRead.model_validate(assistant_message).model_dump(),
            "records": [RecordRead.model_validate(record).model_dump() for record in records],
        },
    }
