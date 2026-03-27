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

$pythonVersionRaw = python -c "import sys; print(f'{sys.version_info.major}.{sys.version_info.minor}')"
if ($LASTEXITCODE -ne 0) {
  throw "Unable to detect Python version"
}

$pythonVersion = [version]$pythonVersionRaw.Trim()
if ($pythonVersion -ge [version]"3.14") {
  throw "Python 3.14+ is not supported by the current API dependency set yet. Use Python 3.12 or 3.13."
}

Invoke-NativeStep "Installing API development dependencies" {
  python -m pip install -r (Join-Path $repoRoot "apps/api/requirements-dev.txt")
}

Push-Location (Join-Path $repoRoot "apps/web")
try {
  Invoke-NativeStep "Installing web dependencies" { npm ci }
}
finally {
  Pop-Location
}

Write-Host "==> Bootstrap complete"
Write-Host "Next:"
Write-Host "  1. Copy .env.example to .env if needed"
Write-Host "  2. Run docker compose up --build"
Write-Host "  3. Run alembic upgrade head in apps/api for first-time database setup"
