from __future__ import annotations

from fastapi import HTTPException, status
from sqlalchemy import or_
from sqlalchemy.orm import Session

from app.models.user import User
from app.schemas.auth import TokenResponse, UserCreate, UserLogin, UserRead
from app.services.auth import create_access_token, hash_password, verify_password


def find_existing_user_for_registration(db: Session, payload: UserCreate) -> User | None:
    filters = [User.username == payload.username]
    if payload.email:
        filters.append(User.email == payload.email)
    return db.query(User).filter(or_(*filters)).first()


def create_user_from_registration(payload: UserCreate) -> User:
    return User(
        username=payload.username,
        email=payload.email,
        display_name=payload.display_name,
        password_hash=hash_password(payload.password),
    )


def build_user_already_exists_error() -> HTTPException:
    return HTTPException(status_code=400, detail="User already exists")


def find_user_for_login(db: Session, payload: UserLogin) -> User | None:
    return (
        db.query(User)
        .filter(or_(User.username == payload.account, User.email == payload.account))
        .first()
    )


def build_invalid_credentials_error() -> HTTPException:
    return HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")


def authenticate_user_for_login(payload: UserLogin, user: User | None) -> TokenResponse:
    if not user or not verify_password(payload.password, user.password_hash):
        raise build_invalid_credentials_error()

    token = create_access_token(user.id)
    return TokenResponse(access_token=token, user=UserRead.model_validate(user))
