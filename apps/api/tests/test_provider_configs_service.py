from __future__ import annotations

import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker
from sqlalchemy.pool import StaticPool

from app.db.base import Base
from app.models import audit_log, conversation, knowledge, media, notification, provider_config, record, reminder, search_preset, share_link  # noqa: F401
from app.models.provider_config import ProviderConfig
from app.models.user import User
from app.models.workspace import Workspace, WorkspaceMember
from app.services.provider_config_validation import FEATURE_DEFINITIONS
from app.services.provider_configs import (
    get_effective_provider_config,
    list_provider_configs,
    upsert_provider_config,
)


def build_provider_configs_service_session() -> tuple[sessionmaker, dict[str, str]]:
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
            username="provider-config-service-user",
            email="provider-config-service@example.com",
            password_hash="test-hash",
            display_name="Provider Config Service User",
        )
        db.add(user)
        db.flush()

        workspace = Workspace(
            name="Provider Config Service Workspace",
            slug="provider-config-service-workspace",
            owner_id=user.id,
            visibility="private",
        )
        db.add(workspace)
        db.flush()
        db.add(WorkspaceMember(workspace_id=workspace.id, user_id=user.id, role="owner"))
        db.commit()
        return session_local, {"workspace_id": workspace.id}


def test_list_provider_configs_returns_saved_and_default_feature_configs(monkeypatch) -> None:
    monkeypatch.setenv("OPENAI_API_KEY", "configured-secret")
    session_local, ids = build_provider_configs_service_session()

    with session_local() as db:
        upsert_provider_config(
            db,
            ids["workspace_id"],
            "image_ocr",
            provider_code="openai",
            model_name="gpt-4o-mini",
            is_enabled=True,
            api_base_url="https://api.openai.com/v1",
            api_key_env_name="OPENAI_API_KEY",
            options_json={"language": "zh-CN"},
        )

        items = list_provider_configs(db, ids["workspace_id"])

    assert [item.feature_code for item in items] == list(FEATURE_DEFINITIONS.keys())

    chat_generation = next(item for item in items if item.feature_code == "chat_generation")
    assert chat_generation.is_default is True
    assert chat_generation.provider_code == "builtin"
    assert chat_generation.model_name == "rules-v1"
    assert chat_generation.secret_status == "not_required"

    image_ocr = next(item for item in items if item.feature_code == "image_ocr")
    assert image_ocr.is_default is False
    assert image_ocr.provider_code == "openai"
    assert image_ocr.model_name == "gpt-4o-mini"
    assert image_ocr.api_base_url == "https://api.openai.com/v1"
    assert image_ocr.api_key_env_name == "OPENAI_API_KEY"
    assert image_ocr.secret_status == "configured"
    assert image_ocr.options_json == {"language": "zh-CN"}


def test_get_effective_provider_config_returns_saved_when_present_and_default_when_absent() -> None:
    session_local, ids = build_provider_configs_service_session()

    with session_local() as db:
        default_config = get_effective_provider_config(db, ids["workspace_id"], "audio_asr")
        assert default_config.is_default is True
        assert default_config.provider_code == "none"
        assert default_config.is_enabled is False

        upsert_provider_config(
            db,
            ids["workspace_id"],
            "audio_asr",
            provider_code="custom",
            model_name="internal-asr-v2",
            is_enabled=True,
            api_base_url="https://speech.example.test/api",
            api_key_env_name=" internal_asr_key ",
            options_json={"language": "zh"},
        )

        saved_config = get_effective_provider_config(db, ids["workspace_id"], "audio_asr")

    assert saved_config.is_default is False
    assert saved_config.provider_code == "custom"
    assert saved_config.model_name == "internal-asr-v2"
    assert saved_config.api_base_url == "https://speech.example.test/api"
    assert saved_config.api_key_env_name == "INTERNAL_ASR_KEY"
    assert saved_config.options_json == {"language": "zh"}


def test_upsert_provider_config_creates_new_row_and_normalizes_fields() -> None:
    session_local, ids = build_provider_configs_service_session()

    with session_local() as db:
        config = upsert_provider_config(
            db,
            ids["workspace_id"],
            "chat_generation",
            provider_code="custom",
            model_name="assistant-v1",
            is_enabled=True,
            api_base_url=" https://llm.example.test/v1/ ",
            api_key_env_name=" custom_llm_key ",
            options_json={"temperature": 0.2},
        )
        stored = (
            db.query(ProviderConfig)
            .filter(
                ProviderConfig.workspace_id == ids["workspace_id"],
                ProviderConfig.feature_code == "chat_generation",
            )
            .one()
        )

    assert stored.provider_code == "custom"
    assert stored.model_name == "assistant-v1"
    assert stored.api_base_url == "https://llm.example.test/v1"
    assert stored.api_key_env_name == "CUSTOM_LLM_KEY"
    assert stored.options_json == {"temperature": 0.2}
    assert config.is_default is False
    assert config.secret_env_name == "CUSTOM_LLM_KEY"
    assert config.secret_status == "missing"


def test_upsert_provider_config_updates_existing_row_in_place() -> None:
    session_local, ids = build_provider_configs_service_session()

    with session_local() as db:
        upsert_provider_config(
            db,
            ids["workspace_id"],
            "image_ocr",
            provider_code="openai",
            model_name="gpt-4o-mini",
            is_enabled=True,
            api_base_url="https://api.openai.com/v1",
            api_key_env_name="OPENAI_API_KEY",
            options_json={},
        )
        original = (
            db.query(ProviderConfig)
            .filter(
                ProviderConfig.workspace_id == ids["workspace_id"],
                ProviderConfig.feature_code == "image_ocr",
            )
            .one()
        )
        original_id = original.id

        updated_config = upsert_provider_config(
            db,
            ids["workspace_id"],
            "image_ocr",
            provider_code="custom",
            model_name="internal-ocr-v2",
            is_enabled=False,
            api_base_url="https://ocr.example.test/api/",
            api_key_env_name=" internal_ocr_key ",
            options_json={"language": "en"},
        )
        rows = (
            db.query(ProviderConfig)
            .filter(
                ProviderConfig.workspace_id == ids["workspace_id"],
                ProviderConfig.feature_code == "image_ocr",
            )
            .all()
        )

    assert len(rows) == 1
    assert rows[0].id == original_id
    assert rows[0].provider_code == "custom"
    assert rows[0].model_name == "internal-ocr-v2"
    assert rows[0].is_enabled is False
    assert rows[0].api_base_url == "https://ocr.example.test/api"
    assert rows[0].api_key_env_name == "INTERNAL_OCR_KEY"
    assert rows[0].options_json == {"language": "en"}
    assert updated_config.provider_code == "custom"
    assert updated_config.model_name == "internal-ocr-v2"


def test_upsert_provider_config_rejects_invalid_provider_for_feature() -> None:
    session_local, ids = build_provider_configs_service_session()

    with session_local() as db:
        with pytest.raises(ValueError, match="Unsupported provider for this feature"):
            upsert_provider_config(
                db,
                ids["workspace_id"],
                "maps_geocoding",
                provider_code="openai",
                model_name="gpt-4o-mini",
                is_enabled=True,
                api_base_url="https://api.openai.com/v1",
                api_key_env_name="OPENAI_API_KEY",
                options_json={},
            )


def test_upsert_provider_config_normalizes_media_storage_options_before_persisting() -> None:
    session_local, ids = build_provider_configs_service_session()

    with session_local() as db:
        config = upsert_provider_config(
            db,
            ids["workspace_id"],
            "media_storage",
            provider_code="custom",
            model_name=None,
            is_enabled=True,
            api_base_url=" https://storage.example.test/api/ ",
            api_key_env_name=" remote_media_storage_key ",
            options_json={
                "fallback_to_local_on_upload_failure": "yes",
                "auto_retry_enabled": "off",
                "remote_retry_max_attempts": "5",
                "remote_retry_backoff_seconds": "15, 60",
            },
        )
        stored = (
            db.query(ProviderConfig)
            .filter(
                ProviderConfig.workspace_id == ids["workspace_id"],
                ProviderConfig.feature_code == "media_storage",
            )
            .one()
        )

    assert stored.api_base_url == "https://storage.example.test/api"
    assert stored.api_key_env_name == "REMOTE_MEDIA_STORAGE_KEY"
    assert stored.options_json == {
        "fallback_to_local_on_upload_failure": True,
        "auto_retry_enabled": False,
        "remote_retry_max_attempts": 5,
        "remote_retry_backoff_seconds": [15, 60],
    }
    assert config.options_json == stored.options_json
