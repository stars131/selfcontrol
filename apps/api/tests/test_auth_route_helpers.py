from __future__ import annotations

from fastapi import status
from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker
from sqlalchemy.pool import StaticPool

from app.api.routes import auth_route_helpers
from app.api.routes.auth_route_helpers import (
    authenticate_user_for_login,
    build_invalid_credentials_error,
    build_user_already_exists_error,
    create_user_from_registration,
    find_existing_user_for_registration,
    find_user_for_login,
)
from app.db.base import Base
from app.models import audit_log, conversation, knowledge, media, notification, provider_config, record, reminder, search_preset, share_link, workspace, workspace_transfer_job  # noqa: F401
from app.models.user import User
from app.schemas.auth import UserCreate, UserLogin


def build_auth_route_helper_session() -> tuple[sessionmaker, dict[str, str]]:
    engine = create_engine(
        "sqlite://",
        connect_args={"check_same_thread": False},
        poolclass=StaticPool,
        future=True,
    )
    session_local = sessionmaker(bind=engine, autoflush=False, autocommit=False, class_=Session)
    Base.metadata.create_all(bind=engine)

    with session_local() as db:
        user = User(
            username="auth-helper-user",
            email="auth-helper@example.com",
            password_hash="stored-password-hash",
            display_name="Auth Helper User",
        )
        username_only_user = User(
            username="auth-helper-username-only",
            email=None,
            password_hash="stored-password-hash-2",
            display_name="Auth Helper Username Only",
        )
        db.add_all([user, username_only_user])
        db.commit()

        return session_local, {
            "user_id": user.id,
            "username_only_user_id": username_only_user.id,
        }


def test_registration_helpers_cover_existing_user_lookup_creation_and_error_builder(monkeypatch) -> None:
    session_local, _ = build_auth_route_helper_session()

    with session_local() as db:
        assert find_existing_user_for_registration(
            db,
            UserCreate(
                username="auth-helper-user",
                email="another@example.com",
                password="secret",
            ),
        ) is not None

        assert find_existing_user_for_registration(
            db,
            UserCreate(
                username="new-user",
                email="auth-helper@example.com",
                password="secret",
            ),
        ) is not None

        assert find_existing_user_for_registration(
            db,
            UserCreate(
                username="brand-new-user",
                email=None,
                password="secret",
            ),
        ) is None

    monkeypatch.setattr(auth_route_helpers, "hash_password", lambda value: f"hashed::{value}")

    created_user = create_user_from_registration(
        UserCreate(
            username="created-user",
            email="created@example.com",
            password="plain-secret",
            display_name="Created User",
        )
    )

    assert created_user.username == "created-user"
    assert created_user.email == "created@example.com"
    assert created_user.display_name == "Created User"
    assert created_user.password_hash == "hashed::plain-secret"

    error = build_user_already_exists_error()
    assert error.status_code == 400
    assert error.detail == "User already exists"


def test_login_lookup_and_error_builder_cover_username_email_and_not_found() -> None:
    session_local, ids = build_auth_route_helper_session()

    with session_local() as db:
        user_by_username = find_user_for_login(
            db,
            UserLogin(account="auth-helper-user", password="secret"),
        )
        user_by_email = find_user_for_login(
            db,
            UserLogin(account="auth-helper@example.com", password="secret"),
        )
        missing_user = find_user_for_login(
            db,
            UserLogin(account="missing-account", password="secret"),
        )

        assert user_by_username is not None
        assert user_by_username.id == ids["user_id"]
        assert user_by_email is not None
        assert user_by_email.id == ids["user_id"]
        assert missing_user is None

    error = build_invalid_credentials_error()
    assert error.status_code == status.HTTP_401_UNAUTHORIZED
    assert error.detail == "Invalid credentials"


def test_authenticate_user_for_login_covers_success_and_invalid_credentials(monkeypatch) -> None:
    session_local, ids = build_auth_route_helper_session()

    def fake_verify_password(password: str, password_hash: str) -> bool:
        return password == "correct-password" and password_hash == "stored-password-hash"

    monkeypatch.setattr(auth_route_helpers, "verify_password", fake_verify_password)
    monkeypatch.setattr(auth_route_helpers, "create_access_token", lambda user_id: f"token-for::{user_id}")

    with session_local() as db:
        user = db.get(User, ids["user_id"])
        assert user is not None

        response = authenticate_user_for_login(
            UserLogin(account="auth-helper-user", password="correct-password"),
            user,
        )

        assert response.access_token == f"token-for::{ids['user_id']}"
        assert response.token_type == "bearer"
        assert response.user.id == ids["user_id"]
        assert response.user.username == "auth-helper-user"
        assert response.user.email == "auth-helper@example.com"

        for candidate_user in (None, user):
            try:
                authenticate_user_for_login(
                    UserLogin(account="auth-helper-user", password="wrong-password"),
                    candidate_user,
                )
            except Exception as exc:
                assert getattr(exc, "status_code", None) == status.HTTP_401_UNAUTHORIZED
                assert getattr(exc, "detail", None) == "Invalid credentials"
            else:
                raise AssertionError("Expected invalid login credentials to fail")
