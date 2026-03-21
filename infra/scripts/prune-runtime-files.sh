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

if [ -z "${TMP_RETENTION_DAYS:-}" ]; then
  TMP_RETENTION_DAYS="3"
fi
if [ -z "${BACKUP_DIR:-}" ]; then
  BACKUP_DIR="./backups"
fi
if [ -z "${BACKUP_RETENTION_DAYS:-}" ]; then
  BACKUP_RETENTION_DAYS="7"
fi

mkdir -p storage/tmp "$BACKUP_DIR/db"

find storage/tmp -type f -mtime +"$TMP_RETENTION_DAYS" -delete
find storage/tmp -type d -empty -delete
find "$BACKUP_DIR/db" -type f -name '*.sql.gz' -mtime +"$BACKUP_RETENTION_DAYS" -delete

echo "Pruned storage/tmp older than $TMP_RETENTION_DAYS day(s)"
echo "Pruned database backups older than $BACKUP_RETENTION_DAYS day(s)"
