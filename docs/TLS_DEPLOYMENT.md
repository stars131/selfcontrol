# TLS Deployment

## Required Variables

Set these in `.env.production`:

- `DOMAIN_NAME`
- `CERTBOT_EMAIL`
- `ALLOWED_HOSTS`
- `NEXT_PUBLIC_API_BASE_URL`

Typical values:

```env
DOMAIN_NAME=your-domain.example
CERTBOT_EMAIL=admin@your-domain.example
ALLOWED_HOSTS=your-domain.example
NEXT_PUBLIC_API_BASE_URL=https://your-domain.example/api/v1
```

## First Certificate Issue

1. Render the temporary HTTP config and start nginx:

```bash
sh infra/scripts/issue-certificate.sh .env.production
```

This script will:

- render an ACME-capable HTTP nginx config
- start nginx with the TLS override stack
- request the certificate through Certbot webroot validation
- render the HTTPS nginx config
- restart nginx and the background certbot renewer

## Renewal

Manual renewal:

```bash
sh infra/scripts/renew-certificates.sh .env.production
```

The TLS override stack also runs a background `certbot renew` loop.

## Compose Stack

Run production with TLS automation:

```bash
docker compose --env-file .env.production -f docker-compose.prod.yml -f docker-compose.tls.yml up -d --build
```

## Files

- ACME template: `infra/nginx/selfcontrol-acme.template.conf`
- HTTPS template: `infra/nginx/selfcontrol-ssl.template.conf`
- Render target: `infra/nginx/selfcontrol.generated.conf`
- Certbot config volume: `infra/certbot/conf`
- ACME webroot volume: `infra/certbot/www`

## Notes

- Open ports `80` and `443` on the server firewall.
- DNS for `DOMAIN_NAME` must already point to the server.
- Keep `ALLOWED_HOSTS` aligned with the same public domain.
- After changing domains, rerun certificate issuance instead of only renewal.
