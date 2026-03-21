#!/usr/bin/env sh
set -eu

ENV_FILE="${1:-.env.production}"

if [ ! -f "$ENV_FILE" ]; then
  echo "Missing env file: $ENV_FILE" >&2
  exit 1
fi

docker compose --env-file "$ENV_FILE" -f docker-compose.prod.yml up -d --build
docker compose --env-file "$ENV_FILE" -f docker-compose.prod.yml ps
