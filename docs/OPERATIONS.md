# Operations

## Runtime Backups

Create a database backup:

```bash
sh infra/scripts/backup-db.sh .env.production
```

Restore a backup:

```bash
sh infra/scripts/restore-db.sh .env.production backups/db/selfcontrol_YYYYMMDD_HHMMSS.sql.gz
```

## Retention and Cleanup

Prune temporary files and expired database backups:

```bash
sh infra/scripts/prune-runtime-files.sh .env.production
```

Environment variables:

- `BACKUP_DIR`
- `BACKUP_RETENTION_DAYS`
- `TMP_RETENTION_DAYS`

## Suggested Cron Entries

Nightly database backup at 03:15:

```cron
15 3 * * * cd /srv/selfcontrol && /bin/sh infra/scripts/backup-db.sh .env.production >> /var/log/selfcontrol-backup.log 2>&1
```

Daily cleanup at 04:00:

```cron
0 4 * * * cd /srv/selfcontrol && /bin/sh infra/scripts/prune-runtime-files.sh .env.production >> /var/log/selfcontrol-prune.log 2>&1
```

Weekly certificate renewal check at 04:30:

```cron
30 4 * * 1 cd /srv/selfcontrol && /bin/sh infra/scripts/renew-certificates.sh .env.production >> /var/log/selfcontrol-certbot.log 2>&1
```

## Log Rotation

`docker-compose.prod.yml` now configures `json-file` log rotation with:

- `max-size=10m`
- `max-file=5`

This applies to `api`, `worker`, `web`, and `nginx`.

## Notes

- The current backup script performs logical PostgreSQL dumps.
- Media uploads under `storage/uploads` are not deleted by retention scripts.
- If you need full disaster recovery, back up both the database dumps and the `storage/` directory.
- Keep `ALLOWED_HOSTS` aligned with your real public domain and proxy hostnames.
