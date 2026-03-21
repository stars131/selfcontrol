# Enterprise Engineering Standard V1

## Purpose

This document defines the minimum engineering bar for all future work in SelfControl.
The project is intended for long-term use, future multi-user expansion, Linux server deployment, and AI-provider extensibility. Every meaningful slice must meet this standard, even when the current user base is small.

## Core Delivery Principles

- Build for long-term maintainability, not only for the next demo.
- Prefer explicit boundaries over convenience coupling.
- Keep user data, secrets, and auditability as first-class concerns.
- Make failure modes observable and recoverable.
- Keep deployment, rollback, and upgrades operationally safe.
- Preserve room for future multi-tenant, multi-region, and multi-provider growth.

## Architecture And Module Boundaries

- Frontend, API, background worker, storage integration, and provider adapters must remain separately evolvable.
- New features should be added behind existing domain boundaries whenever possible instead of expanding oversized components or service files.
- Shared UI copy, formatting rules, provider contracts, and domain-specific helpers should live in dedicated modules, not inline inside large screens.
- External-provider integrations must be isolated behind stable adapter interfaces so providers can be added, replaced, or disabled per feature.
- New persistence fields must be additive-first where practical and should avoid breaking existing records or exports.

## Security Baseline

- Never store raw third-party API secrets in the database.
- Secrets must come from environment variables or an external secret manager boundary.
- Owner, editor, and viewer permissions must be enforced server-side, not only in the UI.
- All write operations that change security-sensitive or data-sensitive state should emit audit events.
- Production defaults must fail closed: weak secrets, unsafe host rules, and unsafe startup shortcuts should be rejected.
- File handling must validate size, type expectations, storage destination, and cleanup behavior.

## Configuration And Provider Management

- Feature-level provider selection must remain independently configurable.
- Unsupported, disabled, or unhealthy providers must degrade safely with operator-visible diagnostics.
- Provider contracts must be versioned when requests or response shapes can evolve.
- Workspace-level provider options must merge with safe defaults instead of assuming complete operator input.

## Data, API, And Migration Discipline

- Database schema changes must be introduced through explicit migrations.
- Public API behavior should remain backward compatible within a release line unless a documented breaking change is approved.
- Export, import, backup, and restore paths must keep working after new fields are introduced.
- Long-running or heavy operations should support asynchronous execution when synchronous behavior would degrade reliability.

## Observability And Operations

- Health endpoints should report operational readiness, not only process liveness.
- Background processing must surface queue, retry, dead-letter, and failure signals clearly.
- Operator-facing diagnostics should explain likely causes and next actions, not only raw errors.
- Retention, cleanup, backup, restore, and storage reporting must remain part of the supported operational surface.

## Testing And Verification Gate

- Every slice must include verification proportional to the risk of the change.
- Backend changes should add or update automated tests for permissions, data integrity, and failure paths.
- Frontend refactors should at minimum preserve type safety and any targeted validation scripts.
- Large refactors should reduce blast radius by extracting modules first, then removing legacy logic in follow-up slices.
- A slice is not complete until the relevant checks have been run and their result is known.

## Deployment, Rollback, And Upgrade Safety

- Development and production deployment paths must stay explicitly separated.
- Production changes must consider rollback, partial failure, and configuration drift.
- New infrastructure requirements must be documented before the feature is treated as complete.
- Runtime changes that can impact availability should expose clear health or readiness indicators.

## Documentation And Change Management

- New operator workflows, provider contracts, deployment steps, or recovery procedures must be documented in `docs/`.
- `PROJECT_PROGRESS.md` must be updated for every meaningful slice.
- Progress entries should record real user-facing or operator-facing outcomes, not vague implementation notes.
- The next-step list should keep pointing at the highest-value unfinished structural work.

## Maintainability And Updateability Rules

- Favor smaller modules, helper libraries, and clear contracts over expanding already-large files.
- Keep locale resources, display labels, and formatting helpers centralized.
- Avoid hidden coupling between UI state, transport types, and provider-specific behavior.
- Prefer additive refactors that preserve current behavior while shrinking future review scope.
- If a file is already oversized or fragile, the next slice touching it should reduce complexity, not increase it.

## Definition Of Done For Future Slices

A meaningful slice is only done when all of the following are true:

- The implementation is scoped and isolated enough for review.
- Security and permission boundaries remain correct.
- Relevant tests or verification checks pass, or any blocker is documented explicitly.
- Documentation and `PROJECT_PROGRESS.md` are updated.
- The slice is committed locally and pushed to the GitHub remote.
