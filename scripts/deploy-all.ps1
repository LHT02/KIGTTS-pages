param(
  [string]$BuildDir = "dist",
  [string[]]$PagesRemotes = @(
    "https://github.com/KigScope/KIGTTS-pages.git",
    "https://github.com/LHT02/KIGTTS-pages.git"
  ),
  [string]$RegionId = $env:ALIBABA_CLOUD_REGION_ID,
  [string]$InstanceId = $env:ALIBABA_CLOUD_INSTANCE_ID,
  [string]$PublicIp = $env:ECS_PUBLIC_IP,
  [string]$SitePath = $env:ECS_SITE_PATH,
  [string]$ArtifactUrl = $env:DEPLOY_ARTIFACT_URL,
  [switch]$SkipPages,
  [switch]$SkipEcs
)

$ErrorActionPreference = "Stop"
Set-StrictMode -Version Latest

$localConfig = Join-Path (Split-Path -Parent $PSScriptRoot) ".env.deploy.local.ps1"
if (Test-Path -LiteralPath $localConfig) {
  . $localConfig
}

if ([string]::IsNullOrWhiteSpace($RegionId)) {
  $RegionId = if ($env:ALIBABA_CLOUD_REGION_ID) { $env:ALIBABA_CLOUD_REGION_ID } else { "cn-wulanchabu" }
}
if ([string]::IsNullOrWhiteSpace($InstanceId)) {
  $InstanceId = if ($env:ALIBABA_CLOUD_INSTANCE_ID) { $env:ALIBABA_CLOUD_INSTANCE_ID } else { "i-0jl7ntndy5azlqq8e65m" }
}
if ([string]::IsNullOrWhiteSpace($PublicIp)) {
  $PublicIp = if ($env:ECS_PUBLIC_IP) { $env:ECS_PUBLIC_IP } else { "8.147.65.139" }
}
if ([string]::IsNullOrWhiteSpace($SitePath)) {
  $SitePath = if ($env:ECS_SITE_PATH) { $env:ECS_SITE_PATH } else { "C:\inetpub\wwwroot\KIGTTS" }
}
if ([string]::IsNullOrWhiteSpace($ArtifactUrl)) { $ArtifactUrl = "https://github.com/KigScope/KIGTTS-pages/archive/refs/heads/gh-pages.zip" }

function Invoke-External {
  param(
    [Parameter(Mandatory = $true)][string]$FilePath,
    [string[]]$Arguments = @()
  )

  & $FilePath @Arguments
  if ($LASTEXITCODE -ne 0) {
    throw "$FilePath failed with exit code $LASTEXITCODE"
  }
}

function Get-Executable {
  param([Parameter(Mandatory = $true)][string]$Name)

  if ($env:OS -eq "Windows_NT") {
    return "$Name.cmd"
  }

  return $Name
}

$npm = Get-Executable "npm"
$npx = Get-Executable "npx"

function Get-RequiredSecret {
  param([string[]]$Names)

  foreach ($name in $Names) {
    $value = [Environment]::GetEnvironmentVariable($name)
    if (-not [string]::IsNullOrWhiteSpace($value)) {
      return $value
    }
  }

  throw "Missing required environment variable: $($Names -join ' or ')"
}

Write-Host "Deploying current build only. Source branch version management is not touched."

Write-Host "Building site..."
Invoke-External $npm @("run", "build")

if (-not $SkipPages) {
  foreach ($remote in $PagesRemotes) {
    Write-Host "Publishing GitHub Pages: $remote"
    Invoke-External $npx @("gh-pages", "-d", $BuildDir, "-r", $remote)
  }
}

if ($SkipEcs) {
  Write-Host "Skipped ECS deployment."
  exit 0
}

$accessKeyId = Get-RequiredSecret @(
  "ALIBABA_CLOUD_ACCESS_KEY_ID",
  "ALIYUN_ACCESS_KEY_ID",
  "ALICLOUD_ACCESS_KEY"
)
$accessKeySecret = Get-RequiredSecret @(
  "ALIBABA_CLOUD_ACCESS_KEY_SECRET",
  "ALIYUN_ACCESS_KEY_SECRET",
  "ALICLOUD_SECRET_KEY"
)

Write-Host "Checking Alibaba Cloud Python SDK..."
$sdkCheck = @'
import importlib.util
import sys
missing = [m for m in ("aliyunsdkcore", "aliyunsdkecs") if importlib.util.find_spec(m) is None]
if missing:
    print("missing:" + ",".join(missing))
    sys.exit(1)
'@
$sdkCheck | python -
if ($LASTEXITCODE -ne 0) {
  Write-Host "Installing Alibaba Cloud Python SDK..."
  Invoke-External python @("-m", "pip", "install", "aliyun-python-sdk-core", "aliyun-python-sdk-ecs")
}

$env:DEPLOY_REGION_ID = $RegionId
$env:DEPLOY_INSTANCE_ID = $InstanceId
$env:DEPLOY_PUBLIC_IP = $PublicIp
$env:DEPLOY_SITE_PATH = $SitePath
$env:DEPLOY_ARTIFACT_URL = $ArtifactUrl
$env:ALIBABA_CLOUD_ACCESS_KEY_ID = $accessKeyId
$env:ALIBABA_CLOUD_ACCESS_KEY_SECRET = $accessKeySecret

$pythonScript = @'
import base64
import json
import os
import sys
import time

from aliyunsdkcore.client import AcsClient
from aliyunsdkecs.request.v20140526 import (
    AuthorizeSecurityGroupRequest,
    DescribeInstancesRequest,
    DescribeInvocationResultsRequest,
    DescribeSecurityGroupAttributeRequest,
    RunCommandRequest,
)


def env(name):
    value = os.environ.get(name)
    if not value:
        raise RuntimeError(f"Missing environment variable: {name}")
    return value


ACCESS_KEY_ID = env("ALIBABA_CLOUD_ACCESS_KEY_ID")
ACCESS_KEY_SECRET = env("ALIBABA_CLOUD_ACCESS_KEY_SECRET")
REGION_ID = env("DEPLOY_REGION_ID")
INSTANCE_ID = env("DEPLOY_INSTANCE_ID")
PUBLIC_IP = env("DEPLOY_PUBLIC_IP")
SITE_PATH = env("DEPLOY_SITE_PATH")
ARTIFACT_URL = env("DEPLOY_ARTIFACT_URL")

client = AcsClient(ACCESS_KEY_ID, ACCESS_KEY_SECRET, REGION_ID)


def request_json(request):
    request.set_accept_format("json")
    raw = client.do_action_with_exception(request)
    return json.loads(raw.decode("utf-8"))


def describe_instance():
    request = DescribeInstancesRequest.DescribeInstancesRequest()
    request.set_InstanceIds(json.dumps([INSTANCE_ID]))
    response = request_json(request)
    instances = response.get("Instances", {}).get("Instance", [])
    if not instances:
        raise RuntimeError(f"ECS instance not found: {INSTANCE_ID}")
    instance = instances[0]
    status = instance.get("Status")
    if status != "Running":
        raise RuntimeError(f"ECS instance is not running: {status}")
    print(f"ECS instance OK: {INSTANCE_ID} in {REGION_ID}")
    return instance


def security_group_has_http(security_group_id):
    request = DescribeSecurityGroupAttributeRequest.DescribeSecurityGroupAttributeRequest()
    request.set_SecurityGroupId(security_group_id)
    response = request_json(request)
    permissions = response.get("Permissions", {}).get("Permission", [])
    for permission in permissions:
        if str(permission.get("IpProtocol", "")).lower() != "tcp":
            continue
        if permission.get("PortRange") != "80/80":
            continue
        if str(permission.get("Policy", "")).lower() != "accept":
            continue
        if permission.get("SourceCidrIp") in ("0.0.0.0/0", "::/0", ""):
            return True
    return False


def ensure_http_security_group(instance):
    security_groups = instance.get("SecurityGroupIds", {}).get("SecurityGroupId", [])
    if not security_groups:
        raise RuntimeError("Instance has no security group")

    for security_group_id in security_groups:
        if security_group_has_http(security_group_id):
            print(f"Security group already allows TCP 80: {security_group_id}")
            return

    security_group_id = security_groups[0]
    request = AuthorizeSecurityGroupRequest.AuthorizeSecurityGroupRequest()
    request.set_SecurityGroupId(security_group_id)
    request.set_IpProtocol("tcp")
    request.set_PortRange("80/80")
    request.set_SourceCidrIp("0.0.0.0/0")
    request.set_Policy("accept")
    request.set_Priority("100")
    request.set_Description("KIGTTS HTTP site")
    try:
        request_json(request)
        print(f"Security group TCP 80 rule added: {security_group_id}")
    except Exception as exc:
        if "InvalidPermission.Duplicate" in str(exc):
            print(f"Security group TCP 80 rule already exists: {security_group_id}")
            return
        raise


def ps_string(value):
    return "'" + value.replace("'", "''") + "'"


def run_powershell(script, timeout=900):
    request = RunCommandRequest.RunCommandRequest()
    request.set_Type("RunPowerShellScript")
    request.set_InstanceIds([INSTANCE_ID])
    request.set_CommandContent(script)
    request.set_Timeout(timeout)
    response = request_json(request)
    invoke_id = response["InvokeId"]
    print(f"Cloud Assistant invoke id: {invoke_id}")

    for _ in range(max(1, timeout // 2)):
        time.sleep(2)
        result_request = DescribeInvocationResultsRequest.DescribeInvocationResultsRequest()
        result_request.set_InvokeId(invoke_id)
        result_request.set_InstanceId(INSTANCE_ID)
        result_response = request_json(result_request)
        items = (
            result_response.get("Invocation", {})
            .get("InvocationResults", {})
            .get("InvocationResult", [])
            or result_response.get("InvocationResults", {}).get("InvocationResult", [])
        )
        if not items:
            continue

        item = items[0]
        status = (
            item.get("InvokeRecordStatus")
            or item.get("InvocationStatus")
            or item.get("Status")
        )
        if status not in ("Finished", "Failed", "Timeout", "Cancelled"):
            continue

        output = item.get("Output", "")
        if output:
            try:
                output = base64.b64decode(output).decode("utf-8", errors="replace")
            except Exception:
                pass

        print(output.rstrip())
        exit_code = int(item.get("ExitCode") or 0)
        if status != "Finished" or exit_code != 0:
            raise RuntimeError(f"Remote command {status}, exit code {exit_code}")
        return output

    raise TimeoutError("Timed out waiting for Cloud Assistant command")


def deploy_iis_site():
    remote_script = f"""
$ErrorActionPreference = "Stop"
$ProgressPreference = "SilentlyContinue"
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

$sitePath = [IO.Path]::GetFullPath({ps_string(SITE_PATH)})
$expectedPath = {ps_string(SITE_PATH)}
if ($sitePath -ne $expectedPath) {{ throw "Unexpected site path: $sitePath" }}
New-Item -ItemType Directory -Force -Path $sitePath | Out-Null

Write-Output "Installing IIS static web components..."
$features = @("Web-Server", "Web-Static-Content", "Web-Default-Doc", "Web-Http-Errors", "Web-Http-Logging", "Web-Filtering", "Web-Mgmt-Tools")
$install = Install-WindowsFeature -Name $features -IncludeManagementTools
Write-Output ("IIS install success=" + $install.Success + ", restartNeeded=" + $install.RestartNeeded)

$tmp = Join-Path $env:TEMP ("kigtts-deploy-" + [Guid]::NewGuid().ToString("N"))
$zip = Join-Path $tmp "gh-pages.zip"
$extract = Join-Path $tmp "extract"
New-Item -ItemType Directory -Force -Path $tmp, $extract | Out-Null

$url = {ps_string(ARTIFACT_URL)}
Write-Output "Downloading artifact..."
try {{
  Invoke-WebRequest -Uri $url -OutFile $zip -UseBasicParsing
}} catch {{
  Write-Output ("Invoke-WebRequest failed, fallback to curl.exe: " + $_.Exception.Message)
  & curl.exe -L $url -o $zip
}}
if (!(Test-Path $zip) -or ((Get-Item $zip).Length -lt 1024)) {{ throw "Artifact download failed or too small" }}
Write-Output ("Artifact bytes=" + (Get-Item $zip).Length)

Expand-Archive -Path $zip -DestinationPath $extract -Force
$srcRoot = Get-ChildItem -Path $extract -Directory | Select-Object -First 1
if (!$srcRoot) {{ throw "Extracted archive root not found" }}
if (!(Test-Path (Join-Path $srcRoot.FullName "index.html"))) {{ throw "index.html not found in artifact" }}

Write-Output "Clearing target deployment directory..."
if ((Test-Path $sitePath) -and ([IO.Path]::GetFullPath($sitePath) -eq $expectedPath)) {{
  Get-ChildItem -LiteralPath $sitePath -Force | Remove-Item -Recurse -Force
}}
Copy-Item -Path (Join-Path $srcRoot.FullName "*") -Destination $sitePath -Recurse -Force

Import-Module WebAdministration
if (Test-Path "IIS:\\Sites\\Default Web Site") {{
  Set-ItemProperty "IIS:\\Sites\\Default Web Site" -Name physicalPath -Value $sitePath
  Set-ItemProperty "IIS:\\Sites\\Default Web Site" -Name serverAutoStart -Value $true
  if ((Get-WebBinding -Name "Default Web Site" -Protocol "http" -ErrorAction SilentlyContinue | Where-Object {{ $_.bindingInformation -eq "*:80:" }}).Count -eq 0) {{
    New-WebBinding -Name "Default Web Site" -Protocol http -Port 80 -IPAddress "*"
  }}
  Start-Website -Name "Default Web Site"
}} else {{
  New-Website -Name "KIGTTS" -PhysicalPath $sitePath -Port 80 -IPAddress "*" -Force | Out-Null
  Start-Website -Name "KIGTTS"
}}

try {{
  Enable-NetFirewallRule -DisplayGroup "World Wide Web Services (HTTP Traffic-In)" -ErrorAction SilentlyContinue
}} catch {{}}
if (-not (Get-NetFirewallRule -DisplayName "KIGTTS HTTP 80" -ErrorAction SilentlyContinue)) {{
  New-NetFirewallRule -DisplayName "KIGTTS HTTP 80" -Direction Inbound -Protocol TCP -LocalPort 80 -Action Allow | Out-Null
}}

iisreset /restart | Out-String | Write-Output
Remove-Item -LiteralPath $tmp -Recurse -Force

$fileCount = (Get-ChildItem -LiteralPath $sitePath -Recurse -File | Measure-Object).Count
$hash = (Get-FileHash -Algorithm SHA256 -LiteralPath (Join-Path $sitePath "index.html")).Hash
Write-Output "DEPLOY_OK"
Write-Output "sitePath=$sitePath"
Write-Output "fileCount=$fileCount"
Write-Output "indexSha256=$hash"
$local = Invoke-WebRequest -Uri "http://127.0.0.1/" -UseBasicParsing -TimeoutSec 10
Write-Output ("localStatus=" + $local.StatusCode + ", localLength=" + $local.RawContentLength)
"""
    run_powershell(remote_script, timeout=900)


instance = describe_instance()
ensure_http_security_group(instance)
deploy_iis_site()
print(f"ECS deploy target: http://{PUBLIC_IP}/")
'@

$tmpScript = Join-Path $env:TEMP ("kigtts-ecs-deploy-" + [Guid]::NewGuid().ToString("N") + ".py")
try {
  Set-Content -LiteralPath $tmpScript -Value $pythonScript -Encoding UTF8
  Write-Host "Deploying ECS site through Cloud Assistant..."
  Invoke-External python @($tmpScript)
}
finally {
  Remove-Item -LiteralPath $tmpScript -Force -ErrorAction SilentlyContinue
}

Write-Host "Verifying public HTTP endpoint..."
$response = Invoke-WebRequest -Uri "http://$PublicIp/" -UseBasicParsing -TimeoutSec 30
$title = [regex]::Match($response.Content, "<title>(.*?)</title>", "IgnoreCase").Groups[1].Value
Write-Host "Public endpoint OK: http://$PublicIp/ status=$($response.StatusCode) title=$title"
