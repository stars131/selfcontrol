#!/usr/bin/env sh
set -eu

repo_root=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)

cd "$repo_root"
git config core.hooksPath .githooks

echo "Configured repository-local git hooks path: .githooks"
echo "Pre-push verification is now enabled."
echo "Set SELFCONTROL_SKIP_VERIFY=1 only for exceptional cases."
