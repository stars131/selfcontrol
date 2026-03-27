# Development Environment Doctor

## Purpose

`doctor-dev` provides a fast readiness check for local Windows development, Linux VM development, and future server-side maintenance work.

It verifies the repository's current baseline before you spend time debugging avoidable setup drift.

## What It Checks

- Node.js major version matches the repository baseline (`20.x`)
- npm is installed
- Python is available and within the currently supported range (`3.12` or `3.13`)
- Git is installed
- repository-local hooks are configured through `.githooks`
- Docker and `docker compose` are installed
- Docker daemon reachability
- `.env` presence
- web dependency installation state
- API test dependency import availability

## Commands

Windows PowerShell:

```powershell
./scripts/doctor-dev.ps1
```

Linux / macOS / VM:

```bash
sh ./scripts/doctor-dev.sh
```

## Result Model

- `PASS`: the check is aligned with the current repository baseline
- `WARN`: the repository may still work, but operator action is recommended
- `FAIL`: a blocking setup problem was found and the script exits non-zero

## Expected Follow-Up

- If dependency warnings appear, run the appropriate bootstrap script:
  - Windows: `./scripts/bootstrap-dev.ps1`
  - Linux / macOS / VM: `sh ./scripts/bootstrap-dev.sh`
- If hook warnings appear, install repository hooks:
  - Windows: `./scripts/install-git-hooks.ps1`
  - Linux / macOS / VM: `sh ./scripts/install-git-hooks.sh`
- Before pushing, run project verification:
  - Windows: `./scripts/verify-all.ps1`
  - Linux / macOS / VM: `sh ./scripts/verify-all.sh`

## Notes

- Docker daemon reachability is a warning instead of a hard failure because some edit-only tasks do not need containers immediately.
- Python `3.14+` is intentionally treated as unsupported until the API dependency set is upgraded.
- The doctor is a quick readiness signal, not a replacement for the full verification flow.
