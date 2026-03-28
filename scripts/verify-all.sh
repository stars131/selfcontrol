#!/usr/bin/env sh
set -eu

repo_root=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)

python_bin=""
for candidate in python3 python; do
  if ! command -v "$candidate" >/dev/null 2>&1; then
    continue
  fi

  if "$candidate" -c "import pytest" >/dev/null 2>&1; then
    python_bin=$candidate
    break
  fi
done

if [ -z "$python_bin" ]; then
  echo "Python is required to run API tests. Install Python 3.12+ and retry." >&2
  exit 1
fi

run_step() {
  step_name=$1
  shift

  echo "==> $step_name"
  "$@"
}

run_step "Running web guardrails" sh -c "cd \"$repo_root/apps/web\" && npm run verify:ui-guardrails"
run_step "Running repository docs verification" "$python_bin" "$repo_root/scripts/verify-repository-docs.py"
run_step "Running API tests" "$python_bin" -m pytest "$repo_root/apps/api/tests" -q
