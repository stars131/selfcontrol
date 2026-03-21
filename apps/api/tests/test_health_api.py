from __future__ import annotations

from fastapi.testclient import TestClient

from app.main import app


def test_health_exposes_runtime_details(tmp_path, monkeypatch) -> None:
    monkeypatch.setattr("app.main.settings.auto_create_tables", False)
    monkeypatch.setattr("app.main.settings.media_processing_mode", "async")
    monkeypatch.setattr("app.main.settings.storage_dir", str(tmp_path / "uploads"))
    monkeypatch.setattr("app.main.settings.processing_tmp_dir", str(tmp_path / "tmp"))

    with TestClient(app) as client:
        response = client.get("/health")

    assert response.status_code == 200
    payload = response.json()
    assert payload["status"] == "ok"
    assert payload["ready"] is True
    assert payload["media_processing_mode"] == "async"
    assert payload["redis_url_configured"] is True
    assert payload["checks"]["storage_dir_exists"] is True
    assert payload["checks"]["processing_tmp_dir_exists"] is True
    assert payload["checks"]["redis_config_ok"] is True
    assert payload["checks"]["auto_create_tables_ok"] is True
    assert (tmp_path / "uploads").exists()
    assert (tmp_path / "tmp").exists()
