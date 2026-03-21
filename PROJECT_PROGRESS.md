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
- OCR / ASR / Video Provider Integration V1:
  - provider-driven media extraction pipeline for image, audio, and video
  - image OCR via vision-capable provider adapters
  - audio transcription via provider transcription adapters
  - video transcription via custom webhook providers, or ffmpeg plus audio transcription for openai-compatible providers
  - extracted provider text is indexed into the knowledge base automatically
- Shared Spaces / Share Links V1:
  - secure share link model with token hash storage
  - share preview, accept, disable, max-use support
  - control-center join flow and workspace-side share management
  - share creation and acceptance are covered by audit logs
- Remote Embeddings Provider Routing V1:
  - pluggable embeddings service for local, openai-compatible, and custom webhook providers
  - knowledge indexing and semantic search now use the configured embeddings provider
  - actual remote embedding dimensions are tracked in knowledge stats
  - verified openai-compatible `/embeddings` flow with provider-based retrieval
- Timeline View V1:
  - dedicated workspace timeline API grouped by effective day from `occurred_at` or `created_at`
  - timeline supports `type_code`, `is_avoid`, `start_date`, and `end_date` filters for future expansion
  - right-side structured panel now supports timeline and flat-list view switching
  - chat search results also project into grouped timeline cards instead of only a flat list
  - backend timeline API behavior is covered by dedicated tests
- Map Review and Location History V1:
  - record saves now normalize location payloads and preserve other `extra_data` keys
  - location changes automatically create a bounded history trail inside the record metadata
  - review state supports `pending`, `confirmed`, and `needs_review` with confirmation timestamps
  - record editor now exposes location review controls and recent correction history
  - map panel shows mapped / confirmed / needs-review counts for faster workspace triage
- Media Preview and Metadata V1:
  - authenticated media content endpoint for secure browser preview and download
  - image, audio, and video attachments now render inline previews in the record panel
  - media processing now records base file metadata including size labels, extension, checksum, and image dimensions
  - text extraction metadata now includes character and line counts for quick review
  - media preview API behavior is covered by dedicated tests
- Entry Localization and Settings Page V1:
  - landing page now supports language switching with persisted locale preference
  - login, register, workspace entry, and workspace settings pages follow the selected locale
  - dedicated workspace settings page added for AI provider and API-related configuration
  - provider configuration editor is now reusable across chat and settings surfaces
  - workspaces list and workspace chat now expose direct links into settings
- Location Filtering and Map Drill-Down V1:
  - records API now supports filtering by place query, review status, and mapped/unmapped state
  - map panel now exposes location filter controls and one-click mapped-only mode
  - filtered record sets stay consistent across record cards and timeline grouping
  - map view now zooms to the selected mapped record for faster drill-down
  - map panel shows a clickable mapped-record list for direct place-based navigation

## Next
- Security hardening: audit logs, share permission boundaries, secret management
- Deeper media metadata extraction and storage lifecycle controls
- Workspace-wide advanced search presets and saved filters

## Delivery Rule
- Every meaningful slice must update this file
- Every meaningful slice must be committed locally
- Every meaningful slice must be pushed to GitHub
