#!/usr/bin/env python3
from __future__ import annotations

from pathlib import Path
import sys


REQUIRED_DOCS: dict[str, tuple[str, ...]] = {
    "README.md": ("# SelfControl",),
    "PROJECT_SPEC.md": ("# SelfControl",),
    "PROJECT_PROGRESS.md": ("# SelfControl Project Progress",),
    "CONTRIBUTING.md": ("# Contributing",),
    "SECURITY.md": ("# Security Policy",),
    "docs/DEVELOPMENT_SETUP.md": ("# SelfControl",),
    "docs/API_AND_WORKFLOWS.md": ("# SelfControl",),
    "docs/ERD_AND_SCHEMA.md": ("# SelfControl",),
    "docs/LINUX_DEPLOYMENT.md": ("# Linux Deployment",),
    "docs/OPERATIONS.md": ("# Operations",),
    "docs/ENTERPRISE_ENGINEERING_STANDARD.md": ("# Enterprise Engineering Standard",),
}


def verify_repository_docs(
    repo_root: Path,
    *,
    required_docs: dict[str, tuple[str, ...]] | None = None,
) -> list[str]:
    required = required_docs or REQUIRED_DOCS
    errors: list[str] = []

    for relative_path, required_markers in required.items():
        path = repo_root / relative_path
        if not path.exists():
            errors.append(f"Missing required documentation file: {relative_path}")
            continue

        try:
            content = path.read_text(encoding="utf-8")
        except UnicodeDecodeError as exc:
            errors.append(f"Documentation file is not valid UTF-8: {relative_path} ({exc})")
            continue

        if not content.strip():
            errors.append(f"Documentation file is empty: {relative_path}")
            continue

        if "\ufffd" in content:
            errors.append(f"Documentation file contains replacement characters: {relative_path}")

        for marker in required_markers:
            if marker not in content:
                errors.append(f"Documentation file is missing required marker '{marker}': {relative_path}")

    return errors


def main() -> int:
    repo_root = Path(__file__).resolve().parent.parent
    errors = verify_repository_docs(repo_root)

    if errors:
        for error in errors:
            print(error, file=sys.stderr)
        return 1

    print("repository docs verification passed")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
