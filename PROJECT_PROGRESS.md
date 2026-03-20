# SelfControl Project Progress

Last updated: 2026-03-21

## Completed
- Foundation: Next.js + FastAPI + Alembic + Docker Compose
- Auth and workspace: register, login, workspace create/list, membership checks
- Records: CRUD, ratings, avoid flag, occurred time, location fields
- Chat assistant V1: conversations, persisted messages, create/search record flow
- Map V1: AMap panel, search, map click fill, manual adjustment
- Reminder V1: CRUD, due reminder dispatch, in-app notifications, read state
- Media upload V1: local storage, metadata persistence
- Media processing V1: text extraction, processing status, retry, search over extracted text
- RAG foundation V1:
  - knowledge chunk table and rebuild pipeline
  - automatic reindex on record change and media processing
  - hybrid knowledge search for chat and search API
  - knowledge stats and manual workspace reindex action
- Provider Config Center V1:
  - per-feature provider config API
  - safe secret strategy via environment variable names instead of raw key storage
  - frontend provider management panel
  - embeddings feature toggle now controls knowledge indexing and retrieval
- Audit Log Foundation V1:
  - audit log table and query API
  - key mutation events recorded for records, media, provider config, knowledge reindex, and chat-created records
  - frontend security panel for recent audit events

## Next
- OCR / ASR / video transcription provider integration
- Real remote embedding providers and pluggable vendor routing
- Shared spaces and share links
- Timeline view and stronger map review flows
- Media preview and richer metadata extraction
- Security hardening: audit logs, share permission boundaries, secret management

## Delivery Rule
- Every meaningful slice must update this file
- Every meaningful slice must be committed locally
- Every meaningful slice must be pushed to GitHub
