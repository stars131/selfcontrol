#!/usr/bin/env sh
set -eu

ENV_FILE="${1:-.env.production}"

if [ ! -f "$ENV_FILE" ]; then
  echo "Missing env file: $ENV_FILE" >&2
  exit 1
fi

/bin/sh infra/scripts/render-nginx-config.sh "$ENV_FILE" https

docker compose --env-file "$ENV_FILE" -f docker-compose.prod.yml -f docker-compose.tls.yml run --rm certbot \
  renew --webroot -w /var/www/certbot

docker compose --env-file "$ENV_FILE" -f docker-compose.prod.yml -f docker-compose.tls.yml exec nginx \
  nginx -s reload

echo "Certificate renewal flow completed"
