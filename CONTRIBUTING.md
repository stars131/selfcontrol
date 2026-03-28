# Contributing

## Workflow Baseline

This repository is currently developed primarily by a single maintainer, but all changes should follow a future multi-contributor standard.

Every meaningful slice should:

1. stay scoped and reviewable
2. update `PROJECT_PROGRESS.md`
3. run relevant verification
4. update docs when workflow, deployment, or operator behavior changes
5. be committed and pushed as an isolated change

## Environment Setup

Recommended local baseline:

- Node.js `20`
- Python `3.12`

Repository helpers:

- install dev dependencies:
  - Windows: `./scripts/bootstrap-dev.ps1`
  - Linux / macOS / VM: `sh ./scripts/bootstrap-dev.sh`
- run environment doctor:
  - Windows: `./scripts/doctor-dev.ps1`
  - Linux / macOS / VM: `sh ./scripts/doctor-dev.sh`
- install pre-push hooks:
  - Windows: `./scripts/install-git-hooks.ps1`
  - Linux / macOS / VM: `sh ./scripts/install-git-hooks.sh`

## Verification

Preferred project-level verification:

- Windows: `./scripts/verify-all.ps1`
- Linux / macOS / VM: `sh ./scripts/verify-all.sh`

The repository-level verification entrypoints also validate that key root and `docs/` documentation files still exist, remain UTF-8 readable, and keep their baseline headers.

Direct commands:

- frontend: `cd apps/web && npm run verify:ui-guardrails`
- backend:
  - Windows: `python -m pytest apps/api/tests -q`
  - Linux / macOS / VM: `python3 -m pytest apps/api/tests -q`

## Change Expectations

- Preserve server-side permission enforcement.
- Keep secrets out of the database.
- Prefer additive changes over breaking rewrites.
- Shrink fragile files when touching them instead of expanding them.
- Keep shared copy and formatting logic centralized.

## Documentation Requirements

Update documentation when you change:

- setup steps
- deployment steps
- operator workflows
- provider contracts
- recovery or security behavior

At minimum, meaningful slices must update:

- `PROJECT_PROGRESS.md`

And when applicable:

- `README.md`
- files under `docs/`
- `SECURITY.md`

## Pull Requests

Use the repository PR template and complete:

- verification checklist
- documentation checklist
- security / operations checklist

## Emergency Bypass

If pre-push verification must be skipped temporarily:

- set `SELFCONTROL_SKIP_VERIFY=1`

This should only be used in exceptional cases and should be followed by a normal verified push as soon as possible.
