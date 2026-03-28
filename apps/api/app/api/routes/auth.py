from __future__ import annotations

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.api.deps import get_current_user
from app.api.routes.auth_route_helpers import (
    authenticate_user_for_login,
    build_user_already_exists_error,
    create_user_from_registration,
    find_existing_user_for_registration,
    find_user_for_login,
)
from app.db.session import get_db
from app.models.user import User
from app.schemas.auth import UserCreate, UserLogin, UserRead


router = APIRouter()


@router.post("/register")
def register(payload: UserCreate, db: Session = Depends(get_db)) -> dict:
    existing = find_existing_user_for_registration(db, payload)
    if existing:
        raise build_user_already_exists_error()

    user = create_user_from_registration(payload)
    db.add(user)
    db.commit()
    db.refresh(user)
    return {"success": True, "data": {"user": UserRead.model_validate(user).model_dump()}}


@router.post("/login")
def login(payload: UserLogin, db: Session = Depends(get_db)) -> dict:
    response = authenticate_user_for_login(payload, find_user_for_login(db, payload))
    return {"success": True, "data": response.model_dump()}


@router.get("/me")
def me(current_user: User = Depends(get_current_user)) -> dict:
    return {"success": True, "data": {"user": UserRead.model_validate(current_user).model_dump()}}
