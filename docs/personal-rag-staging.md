# Personal RAG staging deployment

This staging configuration is independent from the production `ke-gong-portfolio`
Worker and from `kegong.dev`. It serves the existing Vite build through the
`personal-rag-preview` Worker and proxies only `POST /api/v1/chat` to the
Access-protected backend hostname.

## Prerequisites

- Cloudflare Access Apps and Policies write permission.
- DNS read/write permission for `kegong.dev` if the custom domain needs a DNS
  record created or inspected.
- The Personal RAG Docker services running locally on port `8001`.
- Ollama running locally with the existing `qwen3:4b` model.

The Wrangler OAuth token is intentionally used only for Worker deployment and
secret storage. Access applications, policies, and the custom-domain DNS
records were configured in the authenticated Cloudflare dashboard.

This setup uses Cloudflare's Free plan only. It does not enable Workers AI,
paid Workers, paid storage, or any other billable service.

## One-time Cloudflare setup

1. Create the isolated tunnel `personal-rag-staging`.
2. Publish only `rag-api-test.kegong.dev` to `http://127.0.0.1:8001`.
3. Create a self-hosted Access application for `rag-api-test.kegong.dev` with a
   Service Auth policy for a staging service token.
4. Create a separate user-login Access application for
   `rag-preview.kegong.dev`, using the minimum authorized identity policy.
5. Store the backend service-token values as Worker secrets. Never put them in
   Vite variables or source files:

```powershell
npx wrangler secret put CF_ACCESS_CLIENT_ID --config .\wrangler.staging.jsonc
npx wrangler secret put CF_ACCESS_CLIENT_SECRET --config .\wrangler.staging.jsonc
```

The configured staging resources are:

- Worker: `personal-rag-preview`
- Preview hostname: `rag-preview.kegong.dev` (user-login Access policy)
- API hostname: `rag-api-test.kegong.dev` (service-auth Access policy)
- Tunnel: `personal-rag-staging`
- Tunnel ID: `f6179ae6-3cd3-45ef-87e5-3f7bf8d33555`

The production `ke-gong-portfolio` Worker and `kegong.dev` production
hostname were not changed.

## Start and stop locally

Start the existing Personal RAG services from its own project:

```powershell
Set-Location C:\Users\kegon\Projects\personal-rag-agent
docker compose up -d db api
```

Start the named tunnel as a foreground, user-managed process:

```powershell
npx wrangler tunnel run personal-rag-staging
```

Stop it with `Ctrl+C`. This does not install a Windows service. Stop the local
backend with `docker compose stop api db` when it is no longer needed.

## Build and deploy the isolated Worker

From the portfolio project:

```powershell
$env:VITE_PERSONAL_RAG_ENABLED = 'true'
Remove-Item Env:VITE_PERSONAL_RAG_API_BASE_URL -ErrorAction SilentlyContinue
npm.cmd run build
npx wrangler deploy --config .\wrangler.staging.jsonc
```

The Worker keeps browser requests same-origin. `staging-worker.ts` uses a fixed
backend origin from Wrangler configuration and sends Access service-token
headers only from the Worker to the backend. It does not accept a
user-controlled proxy destination. The Worker validates JSON requests, accepts
only questions from 1 to 500 characters, limits the body to 8 KiB, and applies
the `CHAT_RATE_LIMITER` binding at 5 requests per 60 seconds per visitor IP.
The limit is approximate per Cloudflare location; it is intentionally a small
personal-portfolio abuse-control layer, not an enterprise quota system.

## Verification and rollback

Verify the Access login page before testing chat. Then submit the approved
Skills, Climind, Research, and unsupported questions sequentially. Confirm the
browser sees valid citations for supported answers and an abstention for
unsupported claims.

Deployment verification on 2026-11-12:

- Local API: `http://127.0.0.1:8001/health` returned `200` and
  `{"status":"healthy"}`.
- API hostname without service credentials: `rag-api-test.kegong.dev` returned
  `403`, confirming the backend Access policy is not anonymous.
- Preview hostname without a user session: `rag-preview.kegong.dev` returned
  `302` to the Cloudflare Access login flow.
- The Worker deployment and dry run succeeded. Browser chat verification remains
  pending until the authorized email completes the Access one-time-PIN login.
- The tunnel is a foreground process. Keep it running while testing, or restart
  it with the command above after a reboot.

The current staging Worker has the Access service-token secrets listed remotely
without exposing their values. Local `wrangler dev` does not receive those
remote secrets automatically, so a local valid chat request may receive Access
401 even though the deployed Worker can authenticate to the origin.

Use `npx wrangler deployments list --name personal-rag-preview` to inspect
versions. Do not roll back the production `ke-gong-portfolio` Worker. A staging
rollback should target only the `personal-rag-preview` deployment after
checking the version list.
