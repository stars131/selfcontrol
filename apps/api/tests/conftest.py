from __future__ import annotations

import shutil
from pathlib import Path
from uuid import uuid4

import pytest


TEST_TMP_ROOT = Path(__file__).resolve().parents[3] / "test-runtime-tmp"


@pytest.fixture
def tmp_path() -> Path:
    TEST_TMP_ROOT.mkdir(parents=True, exist_ok=True)
    path = TEST_TMP_ROOT / f"case-{uuid4().hex}"
    path.mkdir(parents=True, exist_ok=False)
    try:
        yield path
    finally:
        shutil.rmtree(path, ignore_errors=True)
