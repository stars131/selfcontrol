$ErrorActionPreference = "Stop"

$repoRoot = Split-Path -Parent $PSScriptRoot

function Invoke-NativeStep {
  param(
    [string]$Name,
    [scriptblock]$Command
  )

  Write-Host "==> $Name"
  & $Command
  if ($LASTEXITCODE -ne 0) {
    throw "$Name failed with exit code $LASTEXITCODE"
  }
}

Push-Location (Join-Path $repoRoot "apps/web")
try {
  Invoke-NativeStep "Running web guardrails" { npm run verify:ui-guardrails }
}
finally {
  Pop-Location
}

Invoke-NativeStep "Running repository docs verification" { python (Join-Path $repoRoot "scripts/verify-repository-docs.py") }
Invoke-NativeStep "Running API tests" { python -m pytest (Join-Path $repoRoot "apps/api/tests") -q }
