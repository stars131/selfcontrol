from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import or_
from sqlalchemy.orm import Session

from app.api.deps import get_current_user
from app.db.session import get_db
from app.models.user import User
from app.schemas.auth import TokenResponse, UserCreate, UserLogin, UserRead
from app.services.auth import create_access_token, hash_password, verify_password


router = APIRouter()


@router.post("/register")
def register(payload: UserCreate, db: Session = Depends(get_db)) -> dict:
    filters = [User.username == payload.username]
    if payload.email:
        filters.append(User.email == payload.email)

    existing = db.query(User).filter(or_(*filters)).first()
    if existing:
        raise HTTPException(status_code=400, detail="User already exists")

    user = User(
        username=payload.username,
        email=payload.email,
        display_name=payload.display_name,
        password_hash=hash_password(payload.password),
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return {"success": True, "data": {"user": UserRead.model_validate(user).model_dump()}}


@router.post("/login")
def login(payload: UserLogin, db: Session = Depends(get_db)) -> dict:
    user = (
        db.query(User)
        .filter(or_(User.username == payload.account, User.email == payload.account))
        .first()
    )
    if not user or not verify_password(payload.password, user.password_hash):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")

    token = create_access_token(user.id)
    response = TokenResponse(access_token=token, user=UserRead.model_validate(user))
    return {"success": True, "data": response.model_dump()}


@router.get("/me")
def me(current_user: User = Depends(get_current_user)) -> dict:
    return {"success": True, "data": {"user": UserRead.model_validate(current_user).model_dump()}}

