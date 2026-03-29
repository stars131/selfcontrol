from __future__ import annotations

from datetime import datetime, timedelta, timezone

import jwt
import pytest

from app.core.config import settings
from app.services.auth import create_access_token, decode_access_token, hash_password, verify_password


def test_hash_password_round_trip_verifies_and_rejects_wrong_password() -> None:
    password_hash = hash_password("correct horse battery staple")

    assert password_hash != "correct horse battery staple"
    assert verify_password("correct horse battery staple", password_hash) is True
    assert verify_password("wrong password", password_hash) is False


def test_create_and_decode_access_token_uses_configured_expiry_window() -> None:
    original_secret = settings.secret_key
    original_expiry = settings.access_token_expire_minutes
    try:
        settings.secret_key = "unit-test-secret-key-with-32-bytes"
        settings.access_token_expire_minutes = 7

        created_after = datetime.now(timezone.utc)
        token = create_access_token("user-123")
        payload = decode_access_token(token)
        created_before = datetime.now(timezone.utc)
    finally:
        settings.secret_key = original_secret
        settings.access_token_expire_minutes = original_expiry

    expires_at = datetime.fromtimestamp(payload["exp"], tz=timezone.utc)

    assert payload["sub"] == "user-123"
    assert expires_at >= created_after
    assert expires_at <= created_before + timedelta(minutes=8)
    assert 6 * 60 <= (expires_at - created_after).total_seconds() <= 8 * 60


def test_decode_access_token_rejects_tokens_signed_with_another_secret() -> None:
    original_secret = settings.secret_key
    try:
        settings.secret_key = "issuer-secret-key-with-32-bytes!"
        token = create_access_token("user-456")

        settings.secret_key = "different-secret-key-with-32-bits"
        with pytest.raises(jwt.InvalidTokenError):
            decode_access_token(token)
    finally:
        settings.secret_key = original_secret
