# Security Policy

## Scope

SelfControl handles:

- personal records and reminders
- uploaded media files
- share links
- workspace membership and permissions
- AI provider configuration
- deployment and storage integration settings

Security-sensitive changes should be treated as production-impacting even when the current primary usage is single-user.

## Reporting A Vulnerability

If you discover a security issue, do not open a public issue with exploit details.

Recommended handling:

1. Prepare a minimal description of the issue, affected area, impact, and reproduction conditions.
2. Collect the current commit hash, deployment mode, and whether the issue affects local-only, shared-workspace, or internet-facing usage.
3. Share the report privately through the maintainer-controlled channel in use for this repository.
4. Delay public disclosure until a fix, mitigation, or documented operator workaround is available.

## Priority Areas

The highest-risk surfaces in this repository are:

- authentication and session handling
- owner/editor/viewer permission enforcement
- share-link generation, acceptance, and disable flows
- provider secret handling
- remote media storage and webhook integrations
- file upload, download, and deletion flows
- export, import, backup, and restore behavior
- production deployment configuration and host / proxy trust settings

## Minimum Response Expectations

For confirmed vulnerabilities:

- identify the affected workflow and permission boundary
- determine whether secrets, uploaded files, or shared records are exposed
- add or update regression coverage when practical
- document any required operator mitigation in `docs/`
- update `PROJECT_PROGRESS.md` if the remediation is a meaningful slice

## Hardening Expectations

When touching security-relevant code:

- prefer fail-closed defaults
- keep audit logging intact for sensitive writes
- avoid storing raw third-party secrets
- preserve workspace isolation boundaries
- document deployment-impacting config changes before considering the work complete
