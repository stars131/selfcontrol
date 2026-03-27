$ErrorActionPreference = "Stop"
$PSNativeCommandUseErrorActionPreference = $false

$repoRoot = Split-Path -Parent $PSScriptRoot
$failures = New-Object System.Collections.Generic.List[string]
$warnings = New-Object System.Collections.Generic.List[string]

function Add-CheckResult {
  param(
    [string]$Status,
    [string]$Name,
    [string]$Detail
  )

  Write-Host ("[{0}] {1}: {2}" -f $Status, $Name, $Detail)

  if ($Status -eq "FAIL") {
    $failures.Add("$Name - $Detail")
  }
  elseif ($Status -eq "WARN") {
    $warnings.Add("$Name - $Detail")
  }
}

function Find-PythonCommand {
  foreach ($candidate in @("python", "python3")) {
    $command = Get-Command $candidate -ErrorAction SilentlyContinue
    if ($null -ne $command) {
      return $candidate
    }
  }

  return $null
}

Write-Host "SelfControl development environment doctor"
Write-Host "Repository: $repoRoot"

$nodeCommand = Get-Command node -ErrorAction SilentlyContinue
if ($null -eq $nodeCommand) {
  Add-CheckResult "FAIL" "Node.js" "node command not found; install Node.js 20."
}
else {
  $nodeVersionRaw = ((& node --version) | Out-String).Trim()
  $nodeVersionText = $nodeVersionRaw.TrimStart("v")
  $nodeVersion = $null
  if ([version]::TryParse($nodeVersionText, [ref]$nodeVersion)) {
    if ($nodeVersion.Major -eq 20) {
      Add-CheckResult "PASS" "Node.js" "Detected $nodeVersionRaw."
    }
    else {
      Add-CheckResult "FAIL" "Node.js" "Detected $nodeVersionRaw; expected Node.js 20.x."
    }
  }
  else {
    Add-CheckResult "FAIL" "Node.js" "Unable to parse version output: $nodeVersionRaw"
  }
}

$npmCommand = Get-Command npm -ErrorAction SilentlyContinue
if ($null -eq $npmCommand) {
  Add-CheckResult "FAIL" "npm" "npm command not found."
}
else {
  $npmVersion = ((& npm --version) | Out-String).Trim()
  Add-CheckResult "PASS" "npm" "Detected $npmVersion."
}

$pythonCommand = Find-PythonCommand
if ($null -eq $pythonCommand) {
  Add-CheckResult "FAIL" "Python" "python command not found; install Python 3.12 or 3.13."
}
else {
  $pythonVersionRaw = ((& $pythonCommand -c "import sys; print(f'{sys.version_info.major}.{sys.version_info.minor}.{sys.version_info.micro}')") | Out-String).Trim()
  $pythonVersion = $null
  if ([version]::TryParse($pythonVersionRaw, [ref]$pythonVersion)) {
    if ($pythonVersion.Major -eq 3 -and ($pythonVersion.Minor -eq 12 -or $pythonVersion.Minor -eq 13)) {
      Add-CheckResult "PASS" "Python" "Detected $pythonVersionRaw via $pythonCommand."
    }
    elseif ($pythonVersion -ge [version]"3.14.0") {
      Add-CheckResult "FAIL" "Python" "Detected $pythonVersionRaw via $pythonCommand; Python 3.14+ is unsupported for the current API dependency set."
    }
    else {
      Add-CheckResult "FAIL" "Python" "Detected $pythonVersionRaw via $pythonCommand; expected Python 3.12 or 3.13."
    }
  }
  else {
    Add-CheckResult "FAIL" "Python" "Unable to parse version output: $pythonVersionRaw"
  }
}

$gitCommand = Get-Command git -ErrorAction SilentlyContinue
if ($null -eq $gitCommand) {
  Add-CheckResult "FAIL" "Git" "git command not found."
}
else {
  $gitVersion = ((& git --version) | Out-String).Trim()
  Add-CheckResult "PASS" "Git" $gitVersion

  Push-Location $repoRoot
  try {
    $hooksPath = ((& git config --get core.hooksPath 2>$null) | Out-String).Trim()
    if ($LASTEXITCODE -ne 0 -or [string]::IsNullOrWhiteSpace($hooksPath)) {
      Add-CheckResult "WARN" "Git Hooks" "Repository-local hooks are not configured. Run ./scripts/install-git-hooks.ps1."
    }
    elseif ($hooksPath -eq ".githooks") {
      Add-CheckResult "PASS" "Git Hooks" "core.hooksPath is set to .githooks."
    }
    else {
      Add-CheckResult "WARN" "Git Hooks" "core.hooksPath is set to '$hooksPath' instead of .githooks."
    }
  }
  finally {
    Pop-Location
  }
}

$dockerCommand = Get-Command docker -ErrorAction SilentlyContinue
if ($null -eq $dockerCommand) {
  Add-CheckResult "FAIL" "Docker" "docker command not found."
}
else {
  $dockerVersion = ((& docker --version) | Out-String).Trim()
  Add-CheckResult "PASS" "Docker" $dockerVersion

  $composeVersion = ((cmd /c "docker compose version 2>nul") | Out-String).Trim()
  if ($LASTEXITCODE -ne 0 -or [string]::IsNullOrWhiteSpace($composeVersion)) {
    Add-CheckResult "FAIL" "Docker Compose" "docker compose is unavailable."
  }
  else {
    Add-CheckResult "PASS" "Docker Compose" $composeVersion
  }

  $dockerInfo = ((cmd /c "docker info --format {{.ServerVersion}} 2>nul") | Out-String).Trim()
  if ($LASTEXITCODE -ne 0 -or [string]::IsNullOrWhiteSpace($dockerInfo)) {
    Add-CheckResult "WARN" "Docker Daemon" "Docker is installed but the daemon is not reachable."
  }
  else {
    Add-CheckResult "PASS" "Docker Daemon" "Server version $dockerInfo."
  }
}

$envPath = Join-Path $repoRoot ".env"
if (Test-Path $envPath) {
  Add-CheckResult "PASS" ".env" "Found repository .env file."
}
else {
  Add-CheckResult "WARN" ".env" "Missing .env file. Copy .env.example to .env before starting the stack."
}

$webNodeModulesPath = Join-Path $repoRoot "apps/web/node_modules"
if (Test-Path $webNodeModulesPath) {
  Add-CheckResult "PASS" "Web Dependencies" "apps/web/node_modules is present."
}
else {
  Add-CheckResult "WARN" "Web Dependencies" "apps/web/node_modules is missing. Run ./scripts/bootstrap-dev.ps1."
}

if ($null -ne $pythonCommand) {
  & $pythonCommand -c "import fastapi, pytest" 2>$null
  if ($LASTEXITCODE -eq 0) {
    Add-CheckResult "PASS" "API Dependencies" "fastapi and pytest imports succeeded."
  }
  else {
    Add-CheckResult "WARN" "API Dependencies" "fastapi/pytest imports failed. Run ./scripts/bootstrap-dev.ps1."
  }
}

Write-Host ""
Write-Host "Summary:"
Write-Host ("  Failures: {0}" -f $failures.Count)
Write-Host ("  Warnings: {0}" -f $warnings.Count)

if ($warnings.Count -gt 0) {
  Write-Host ""
  Write-Host "Warnings:"
  foreach ($warning in $warnings) {
    Write-Host "  - $warning"
  }
}

if ($failures.Count -gt 0) {
  Write-Host ""
  Write-Host "Failures:"
  foreach ($failure in $failures) {
    Write-Host "  - $failure"
  }

  throw "Development environment doctor found blocking issues."
}

Write-Host ""
Write-Host "Environment doctor completed without blocking issues."
Write-Host "Next:"
Write-Host "  1. Run ./scripts/bootstrap-dev.ps1 if any dependency warnings remain"
Write-Host "  2. Run ./scripts/verify-all.ps1 before pushing"
