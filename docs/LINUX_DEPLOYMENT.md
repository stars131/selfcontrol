# Linux Deployment

## Overview

This project now provides a production-oriented Docker Compose stack with:

- `db`: PostgreSQL + pgvector
- `redis`: Celery broker/backend
- `api`: FastAPI backend
- `worker`: background task worker
- `web`: Next.js frontend
- `nginx`: reverse proxy on port `80`

Use `docker-compose.prod.yml` as the production entry point.

## Recommended Host

- Ubuntu 22.04+ or Debian 12+
- Docker Engine + Docker Compose plugin
- At least 2 CPU / 4 GB RAM for basic single-user use
- Extra disk space for `storage/` growth

## First-Time Setup

1. Clone the repository on the Linux server.
2. Copy `.env.production.example` to `.env.production`.
3. Fill in:
   - strong `SECRET_KEY`
   - database password
   - `CORS_ORIGINS`
   - `ALLOWED_HOSTS`
   - `FORWARDED_ALLOW_IPS`
   - `NEXT_PUBLIC_API_BASE_URL`
   - AI provider secrets
   - AMap key if the browser needs map features
4. Create the persistent storage directory:

```bash
mkdir -p storage/uploads storage/tmp
```

## Start Production Stack

```bash
docker compose --env-file .env.production -f docker-compose.prod.yml up -d --build
```

## Verify Runtime

Check containers:

```bash
docker compose --env-file .env.production -f docker-compose.prod.yml ps
```

Check API health:

```bash
curl http://127.0.0.1/health
```

The health response should report:

- `status: ok`
- `ready: true`
- `app_env: production`
- `media_processing_mode: async`

## Database Migrations

The production API container runs `alembic upgrade head` before starting Uvicorn.

If you need to run migrations manually:

```bash
docker compose --env-file .env.production -f docker-compose.prod.yml run --rm api alembic upgrade head
```

## Update Procedure

```bash
git pull
docker compose --env-file .env.production -f docker-compose.prod.yml up -d --build
```

## Backups and Cleanup

- Create a database backup:

```bash
sh infra/scripts/backup-db.sh .env.production
```

- Restore a database backup:

```bash
sh infra/scripts/restore-db.sh .env.production backups/db/selfcontrol_YYYYMMDD_HHMMSS.sql.gz
```

- Prune old runtime temp files and expired backups:

```bash
sh infra/scripts/prune-runtime-files.sh .env.production
```

See [OPERATIONS.md](./OPERATIONS.md) for cron examples and retention details.

## Notes

- Production should use `AUTO_CREATE_TABLES=false`.
- Production should use `MEDIA_PROCESSING_MODE=async`.
- Production should use explicit `ALLOWED_HOSTS` and should not use `*`.
- Do not expose PostgreSQL or Redis directly to the public internet.
- Add TLS at the host or replace the bundled Nginx config with your HTTPS setup.
- The current Nginx config increases `client_max_body_size` to `256m` for media upload support.
- The production compose file now enables Docker log rotation for `api`, `worker`, `web`, and `nginx`.
- `infra/nginx/selfcontrol-ssl.example.conf` provides an HTTPS reverse-proxy starting point for a real domain.
