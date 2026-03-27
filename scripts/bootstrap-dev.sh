#!/usr/bin/env sh
set -eu

repo_root=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)

if command -v python3 >/dev/null 2>&1; then
  python_bin="python3"
else
  python_bin="python"
fi

python_version=$("$python_bin" -c 'import sys; print(f"{sys.version_info.major}.{sys.version_info.minor}")')
case "$python_version" in
  3.14|3.15|3.16|3.17|3.18|3.19)
    echo "Python 3.14+ is not supported by the current API dependency set yet. Use Python 3.12 or 3.13." >&2
    exit 1
    ;;
esac

echo "==> Installing API development dependencies"
"$python_bin" -m pip install -r "$repo_root/apps/api/requirements-dev.txt"

echo "==> Installing web dependencies"
(
  cd "$repo_root/apps/web"
  npm ci
)

echo "==> Bootstrap complete"
echo "Next:"
echo "  1. Copy .env.example to .env if needed"
echo "  2. Run docker compose up --build"
echo "  3. Run alembic upgrade head in apps/api for first-time database setup"
