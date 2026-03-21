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

if [ -z "${DOMAIN_NAME:-}" ] || [ -z "${CERTBOT_EMAIL:-}" ]; then
  echo "DOMAIN_NAME and CERTBOT_EMAIL are required" >&2
  exit 1
fi

mkdir -p infra/certbot/www infra/certbot/conf

/bin/sh infra/scripts/render-nginx-config.sh "$ENV_FILE" http
docker compose --env-file "$ENV_FILE" -f docker-compose.prod.yml -f docker-compose.tls.yml up -d nginx

docker compose --env-file "$ENV_FILE" -f docker-compose.prod.yml -f docker-compose.tls.yml run --rm certbot \
  certonly --webroot -w /var/www/certbot -d "$DOMAIN_NAME" --email "$CERTBOT_EMAIL" --agree-tos --no-eff-email

/bin/sh infra/scripts/render-nginx-config.sh "$ENV_FILE" https
docker compose --env-file "$ENV_FILE" -f docker-compose.prod.yml -f docker-compose.tls.yml up -d nginx certbot

echo "Certificate issuance flow completed for $DOMAIN_NAME"
