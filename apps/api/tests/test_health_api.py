from __future__ import annotations

from fastapi.testclient import TestClient

from app.main import app


def test_health_exposes_runtime_details(tmp_path, monkeypatch) -> None:
    monkeypatch.setattr("app.main.settings.auto_create_tables", False)
    monkeypatch.setattr("app.main.settings.media_processing_mode", "async")
    monkeypatch.setattr("app.main.settings.storage_dir", str(tmp_path / "uploads"))
    monkeypatch.setattr("app.main.settings.processing_tmp_dir", str(tmp_path / "tmp"))

    (tmp_path / "uploads").mkdir(parents=True, exist_ok=True)
    (tmp_path / "tmp").mkdir(parents=True, exist_ok=True)

    with TestClient(app) as client:
        response = client.get("/health")

    assert response.status_code == 200
    payload = response.json()
    assert payload["status"] == "ok"
    assert payload["media_processing_mode"] == "async"
    assert payload["storage_dir_exists"] is True
    assert payload["processing_tmp_dir_exists"] is True
    assert payload["redis_url_configured"] is True
