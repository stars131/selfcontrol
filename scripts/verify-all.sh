#!/usr/bin/env sh
set -eu

repo_root=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)

echo "==> Running web guardrails"
(
  cd "$repo_root/apps/web"
  npm run verify:ui-guardrails
)

echo "==> Running API tests"
python -m pytest "$repo_root/apps/api/tests" -q
