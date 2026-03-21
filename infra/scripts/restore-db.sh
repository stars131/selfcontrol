#!/usr/bin/env sh
set -eu

ENV_FILE="${1:-.env.production}"
BACKUP_FILE="${2:-}"

if [ ! -f "$ENV_FILE" ]; then
  echo "Missing env file: $ENV_FILE" >&2
  exit 1
fi

if [ -z "$BACKUP_FILE" ] || [ ! -f "$BACKUP_FILE" ]; then
  echo "Usage: restore-db.sh <env-file> <backup-file.sql.gz>" >&2
  exit 1
fi

set -a
. "$ENV_FILE"
set +a

gunzip -c "$BACKUP_FILE" | docker compose --env-file "$ENV_FILE" -f docker-compose.prod.yml exec -T db \
  psql -U "$POSTGRES_USER" -d "$POSTGRES_DB"

echo "Database restore completed from: $BACKUP_FILE"
