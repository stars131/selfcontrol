$ErrorActionPreference = "Stop"

$repoRoot = Split-Path -Parent $PSScriptRoot

Write-Host "==> Running web guardrails"
Push-Location (Join-Path $repoRoot "apps/web")
try {
  npm run verify:ui-guardrails
}
finally {
  Pop-Location
}

Write-Host "==> Running API tests"
python -m pytest (Join-Path $repoRoot "apps/api/tests") -q
