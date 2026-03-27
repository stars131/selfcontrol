#!/usr/bin/env sh
set -eu

repo_root=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
failures=0
warnings=0

add_result() {
  status="$1"
  name="$2"
  detail="$3"

  printf '[%s] %s: %s\n' "$status" "$name" "$detail"

  case "$status" in
    FAIL)
      failures=$((failures + 1))
      ;;
    WARN)
      warnings=$((warnings + 1))
      ;;
  esac
}

find_python() {
  for candidate in python3 python; do
    if command -v "$candidate" >/dev/null 2>&1 && "$candidate" --version >/dev/null 2>&1; then
      printf '%s\n' "$candidate"
      return 0
    fi
  done

  return 1
}

printf 'SelfControl development environment doctor\n'
printf 'Repository: %s\n' "$repo_root"

if command -v node >/dev/null 2>&1; then
  node_version=$(node --version)
  node_major=$(printf '%s' "$node_version" | sed -E 's/^v([0-9]+).*/\1/')
  if [ "$node_major" = "20" ]; then
    add_result "PASS" "Node.js" "Detected $node_version."
  else
    add_result "FAIL" "Node.js" "Detected $node_version; expected Node.js 20.x."
  fi
else
  add_result "FAIL" "Node.js" "node command not found; install Node.js 20."
fi

if command -v npm >/dev/null 2>&1; then
  add_result "PASS" "npm" "Detected $(npm --version)."
else
  add_result "FAIL" "npm" "npm command not found."
fi

python_bin=""
if python_bin=$(find_python); then
  python_version=$("$python_bin" -c 'import sys; print(f"{sys.version_info.major}.{sys.version_info.minor}.{sys.version_info.micro}")')
  case "$python_version" in
    3.12.*|3.13.*)
      add_result "PASS" "Python" "Detected $python_version via $python_bin."
      ;;
    3.14.*|3.15.*|3.16.*|3.17.*|3.18.*|3.19.*)
      add_result "FAIL" "Python" "Detected $python_version via $python_bin; Python 3.14+ is unsupported for the current API dependency set."
      ;;
    *)
      add_result "FAIL" "Python" "Detected $python_version via $python_bin; expected Python 3.12 or 3.13."
      ;;
  esac
else
  add_result "FAIL" "Python" "python command not found; install Python 3.12 or 3.13."
fi

if command -v git >/dev/null 2>&1; then
  add_result "PASS" "Git" "$(git --version)"

  hooks_path=$(cd "$repo_root" && git config --get core.hooksPath 2>/dev/null || true)
  if [ -z "$hooks_path" ]; then
    add_result "WARN" "Git Hooks" "Repository-local hooks are not configured. Run sh ./scripts/install-git-hooks.sh."
  elif [ "$hooks_path" = ".githooks" ]; then
    add_result "PASS" "Git Hooks" "core.hooksPath is set to .githooks."
  else
    add_result "WARN" "Git Hooks" "core.hooksPath is set to '$hooks_path' instead of .githooks."
  fi
else
  add_result "FAIL" "Git" "git command not found."
fi

if command -v docker >/dev/null 2>&1; then
  add_result "PASS" "Docker" "$(docker --version)"

  if compose_version=$(docker compose version 2>/dev/null); then
    add_result "PASS" "Docker Compose" "$compose_version"
  else
    add_result "FAIL" "Docker Compose" "docker compose is unavailable."
  fi

  if docker_server=$(docker info --format '{{.ServerVersion}}' 2>/dev/null); then
    add_result "PASS" "Docker Daemon" "Server version $docker_server."
  else
    add_result "WARN" "Docker Daemon" "Docker is installed but the daemon is not reachable."
  fi
else
  add_result "FAIL" "Docker" "docker command not found."
fi

if [ -f "$repo_root/.env" ]; then
  add_result "PASS" ".env" "Found repository .env file."
else
  add_result "WARN" ".env" "Missing .env file. Copy .env.example to .env before starting the stack."
fi

if [ -d "$repo_root/apps/web/node_modules" ]; then
  add_result "PASS" "Web Dependencies" "apps/web/node_modules is present."
else
  add_result "WARN" "Web Dependencies" "apps/web/node_modules is missing. Run sh ./scripts/bootstrap-dev.sh."
fi

if [ -n "$python_bin" ]; then
  if "$python_bin" -c 'import fastapi, pytest' >/dev/null 2>&1; then
    add_result "PASS" "API Dependencies" "fastapi and pytest imports succeeded."
  else
    add_result "WARN" "API Dependencies" "fastapi/pytest imports failed. Run sh ./scripts/bootstrap-dev.sh."
  fi
fi

printf '\nSummary:\n'
printf '  Failures: %s\n' "$failures"
printf '  Warnings: %s\n' "$warnings"

if [ "$failures" -gt 0 ]; then
  printf '\nDevelopment environment doctor found blocking issues.\n' >&2
  exit 1
fi

printf '\nEnvironment doctor completed without blocking issues.\n'
printf 'Next:\n'
printf '  1. Run sh ./scripts/bootstrap-dev.sh if any dependency warnings remain\n'
printf '  2. Run sh ./scripts/verify-all.sh before pushing\n'
