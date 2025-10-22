$repo = "n0-computer/dumbpipe"
$release_url = "https://api.github.com/repos/$repo/releases/latest"

$target = "windows-x86_64"
$zipFile = "dumbpipe.zip"
$extractPath = ".\dumbpipe"

Write-Host "Fetching latest release for $target..."
$releaseJson = Invoke-RestMethod -Uri $release_url
$releaseUrl = ($releaseJson.assets | Where-Object { $_.browser_download_url -match $target }).browser_download_url

if (-not $releaseUrl) {
    Write-Host "Error: No release found for $target" -ForegroundColor Red
    exit 1
}

Write-Host "Downloading from $releaseUrl..."
Invoke-WebRequest -Uri $releaseUrl -OutFile $zipFile

Write-Host "Extracting..."
Expand-Archive -Path $zipFile -DestinationPath $extractPath -Force

Write-Host "Cleaning up..."
Remove-Item -Force $zipFile

Write-Host "Installation complete!"

# Add the 'dumbpipe' folder to PATH
$dumbpipePath = (Resolve-Path $extractPath).Path

# Add the folder to the PATH permanently (user level)
$env:Path += ";$dumbpipePath"
[System.Environment]::SetEnvironmentVariable("Path", $env:Path, [System.EnvironmentVariableTarget]::User)

Write-Host "'$dumbpipePath' has been permanently added to user PATH." -ForegroundColor Green