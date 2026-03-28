from __future__ import annotations

import importlib.util
from pathlib import Path


def load_verify_repository_docs_module():
    repo_root = Path(__file__).resolve().parents[3]
    module_path = repo_root / "scripts/verify-repository-docs.py"
    spec = importlib.util.spec_from_file_location("verify_repository_docs_script", module_path)
    if spec is None or spec.loader is None:
        raise AssertionError("Failed to load verify-repository-docs.py")
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


def write_required_docs(repo_root: Path, required_docs: dict[str, tuple[str, ...]]) -> None:
    for relative_path, markers in required_docs.items():
        path = repo_root / relative_path
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text("\n".join([*markers, "", "body"]) + "\n", encoding="utf-8")


def test_verify_repository_docs_passes_for_complete_utf8_docs(tmp_path) -> None:
    module = load_verify_repository_docs_module()
    write_required_docs(tmp_path, module.REQUIRED_DOCS)

    errors = module.verify_repository_docs(tmp_path)

    assert errors == []


def test_verify_repository_docs_reports_missing_file(tmp_path) -> None:
    module = load_verify_repository_docs_module()
    write_required_docs(tmp_path, module.REQUIRED_DOCS)
    (tmp_path / "docs/OPERATIONS.md").unlink()

    errors = module.verify_repository_docs(tmp_path)

    assert "Missing required documentation file: docs/OPERATIONS.md" in errors


def test_verify_repository_docs_reports_invalid_utf8_and_replacement_characters(tmp_path) -> None:
    module = load_verify_repository_docs_module()
    write_required_docs(tmp_path, module.REQUIRED_DOCS)

    invalid_utf8_path = tmp_path / "docs/API_AND_WORKFLOWS.md"
    invalid_utf8_path.write_bytes(b"\xff\xfe\x00\x00")

    replacement_char_path = tmp_path / "README.md"
    replacement_char_path.write_text("# SelfControl\ncontains \ufffd replacement\n", encoding="utf-8")

    errors = module.verify_repository_docs(tmp_path)

    assert any(error.startswith("Documentation file is not valid UTF-8: docs/API_AND_WORKFLOWS.md") for error in errors)
    assert "Documentation file contains replacement characters: README.md" in errors
