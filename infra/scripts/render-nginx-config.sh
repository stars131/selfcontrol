#!/usr/bin/env sh
set -eu

ENV_FILE="${1:-.env.production}"
MODE="${2:-https}"

if [ ! -f "$ENV_FILE" ]; then
  echo "Missing env file: $ENV_FILE" >&2
  exit 1
fi

set -a
. "$ENV_FILE"
set +a

if [ -z "${DOMAIN_NAME:-}" ]; then
  echo "DOMAIN_NAME is required" >&2
  exit 1
fi

mkdir -p infra/nginx

case "$MODE" in
  http)
    TEMPLATE="infra/nginx/selfcontrol-acme.template.conf"
    ;;
  https)
    TEMPLATE="infra/nginx/selfcontrol-ssl.template.conf"
    ;;
  *)
    echo "Mode must be either 'http' or 'https'" >&2
    exit 1
    ;;
esac

sed "s/__DOMAIN_NAME__/${DOMAIN_NAME}/g" "$TEMPLATE" > infra/nginx/selfcontrol.generated.conf

echo "Rendered infra/nginx/selfcontrol.generated.conf using mode=$MODE"
