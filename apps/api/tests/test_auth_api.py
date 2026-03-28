from __future__ import annotations

from fastapi import FastAPI
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker
from sqlalchemy.pool import StaticPool

from app.api.routes import auth as auth_route
from app.core.config import settings
from app.db.base import Base
from app.db.session import get_db
from app.models import audit_log, conversation, knowledge, media, notification, provider_config, record, reminder, search_preset, share_link, user  # noqa: F401


def build_auth_client() -> tuple[TestClient, sessionmaker]:
    settings.secret_key = "test-secret-key-with-sufficient-length"
    engine = create_engine(
        "sqlite://",
        connect_args={"check_same_thread": False},
        poolclass=StaticPool,
        future=True,
    )
    session_local = sessionmaker(bind=engine, autoflush=False, autocommit=False, class_=Session)
    Base.metadata.create_all(bind=engine)

    app = FastAPI()
    app.include_router(auth_route.router, prefix="/api/v1/auth")

    def override_get_db():
        db = session_local()
        try:
            yield db
        finally:
            db.close()

    app.dependency_overrides[get_db] = override_get_db
    return TestClient(app), session_local


def test_register_login_and_me_flow() -> None:
    client, _session_local = build_auth_client()

    register_response = client.post(
        "/api/v1/auth/register",
        json={
            "username": "auth-user",
            "email": "auth-user@example.com",
            "password": "password123",
            "display_name": "Auth User",
        },
    )
    assert register_response.status_code == 200
    user_payload = register_response.json()["data"]["user"]
    assert user_payload["username"] == "auth-user"
    assert user_payload["email"] == "auth-user@example.com"

    login_response = client.post(
        "/api/v1/auth/login",
        json={"account": "auth-user", "password": "password123"},
    )
    assert login_response.status_code == 200
    login_payload = login_response.json()["data"]
    assert login_payload["token_type"] == "bearer"
    assert login_payload["user"]["username"] == "auth-user"

    me_response = client.get(
        "/api/v1/auth/me",
        headers={"Authorization": f"Bearer {login_payload['access_token']}"},
    )
    assert me_response.status_code == 200
    assert me_response.json()["data"]["user"]["username"] == "auth-user"


def test_register_rejects_duplicate_user_and_login_rejects_invalid_password() -> None:
    client, _session_local = build_auth_client()

    first_register = client.post(
        "/api/v1/auth/register",
        json={
            "username": "duplicate-user",
            "email": "duplicate@example.com",
            "password": "password123",
            "display_name": "Duplicate User",
        },
    )
    assert first_register.status_code == 200

    duplicate_register = client.post(
        "/api/v1/auth/register",
        json={
            "username": "duplicate-user",
            "email": "another@example.com",
            "password": "password123",
            "display_name": "Duplicate User",
        },
    )
    assert duplicate_register.status_code == 400
    assert duplicate_register.json()["detail"] == "User already exists"

    duplicate_email_register = client.post(
        "/api/v1/auth/register",
        json={
            "username": "another-user",
            "email": "duplicate@example.com",
            "password": "password123",
            "display_name": "Another User",
        },
    )
    assert duplicate_email_register.status_code == 400

    invalid_login = client.post(
        "/api/v1/auth/login",
        json={"account": "duplicate-user", "password": "wrong-password"},
    )
    assert invalid_login.status_code == 401
    assert invalid_login.json()["detail"] == "Invalid credentials"
