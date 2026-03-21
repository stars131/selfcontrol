#!/usr/bin/env sh
set -eu

ENV_FILE="${1:-.env.production}"

if [ ! -f "$ENV_FILE" ]; then
  echo "Missing env file: $ENV_FILE" >&2
  exit 1
fi

set -a
. "$ENV_FILE"
set +a

if [ -z "${BACKUP_DIR:-}" ]; then
  BACKUP_DIR="./backups"
fi

if [ -z "${RETENTION_DAYS:-}" ]; then
  RETENTION_DAYS="${BACKUP_RETENTION_DAYS:-7}"
fi

mkdir -p "$BACKUP_DIR/db"
STAMP="$(date +%Y%m%d_%H%M%S)"
TARGET_FILE="$BACKUP_DIR/db/selfcontrol_${STAMP}.sql.gz"

docker compose --env-file "$ENV_FILE" -f docker-compose.prod.yml exec -T db \
  pg_dump -U "$POSTGRES_USER" -d "$POSTGRES_DB" | gzip > "$TARGET_FILE"

find "$BACKUP_DIR/db" -type f -name '*.sql.gz' -mtime +"$RETENTION_DAYS" -delete

echo "Database backup created: $TARGET_FILE"
