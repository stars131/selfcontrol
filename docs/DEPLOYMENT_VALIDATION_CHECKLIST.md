# Deployment Validation Checklist

## Purpose

Use this checklist before and after runtime-impacting changes on a Linux server, VM environment, or future staging environment.

It is intended to reduce configuration drift, unsafe rollouts, and incomplete rollback planning.

## Before Deployment

- Confirm the target commit is already pushed and reviewable.
- Confirm `PROJECT_PROGRESS.md` and any affected operator docs are updated.
- Confirm the required environment variables exist on the target host.
- Confirm backups are current before schema, storage, or import/export affecting changes.
- Confirm the current deployment can be rolled back to the previous known-good revision.
- Run the local verification contract:
  - Windows: `./scripts/verify-all.ps1`
  - Linux / macOS / VM: `sh ./scripts/verify-all.sh`
- Review changes that affect:
  - permissions
  - provider secrets
  - media storage
  - background jobs
  - database migrations
  - reverse proxy or TLS

## During Deployment

- Record the deploy start time and target commit hash.
- Apply database migrations explicitly when required.
- Confirm the expected services are up:
  - `api`
  - `worker`
  - `redis`
  - `web`
  - `nginx` when applicable
- Watch startup logs for configuration, host validation, storage, and provider errors.
- Confirm no unexpected container restart loops begin during rollout.

## After Deployment

- Verify `/health` from the deployed environment.
- Verify login and workspace entry still work.
- Verify at least one record query and one chat request path.
- Verify provider-dependent features touched by the change.
- Verify media upload, preview, or retry paths if media behavior changed.
- Verify reminders, transfer jobs, or background processing if async behavior changed.
- Verify audit logs for sensitive write paths touched by the change.
- Confirm expected storage directories and temp directories are healthy.

## Rollback Readiness

- Keep the previous compose/runtime configuration available until validation completes.
- Keep the previous image tag or revision reference available until validation completes.
- Confirm rollback commands are written down before rollout starts.
- If rollback is needed, verify health and key user flows again after rollback.

## Change Log Capture

- Record the deployed commit hash.
- Record the migration state if schema changes were involved.
- Record any warnings accepted during rollout.
- Record any follow-up fixes or cleanup items as issues.
