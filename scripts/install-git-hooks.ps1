$ErrorActionPreference = "Stop"

$repoRoot = Split-Path -Parent $PSScriptRoot
Push-Location $repoRoot
try {
  git config core.hooksPath .githooks
  if ($LASTEXITCODE -ne 0) {
    throw "Failed to configure core.hooksPath"
  }
}
finally {
  Pop-Location
}

Write-Host "Configured repository-local git hooks path: .githooks"
Write-Host "Pre-push verification is now enabled."
Write-Host "Set SELFCONTROL_SKIP_VERIFY=1 only for exceptional cases."
