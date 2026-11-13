# Personal RAG production preparation

This document prepares, but does not authorize or perform, deployment of the
assistant to `kegong.dev`.

## Current boundary

- Production Worker: `ke-gong-portfolio`
- Production config: `wrangler.jsonc`
- Worker entrypoint: `rag-worker.ts`
- Backend origin variable: `https://rag-api-test.kegong.dev`
- Public route: same-origin `POST /api/v1/chat`
- Rate limit: 5 requests per 60 seconds per visitor IP through the Worker Rate Limiting binding
- Production Worker secrets: not configured by this preparation task
- Production deployment: not performed

The prepared production Worker keeps the origin behind Cloudflare Access. It
does not expose Ollama, PostgreSQL, the FastAPI loopback port, or Access
credentials to the browser. The existing production static portfolio remains
unchanged until a separately authorized deployment.

## Gated deployment checklist

Only after the user explicitly replies `确认正式部署`:

1. Confirm the existing production Worker, `kegong.dev`, and the staging Worker
   are still separate.
2. Confirm the backend tunnel and Access service-auth policy are healthy.
3. Add `CF_ACCESS_CLIENT_ID` and `CF_ACCESS_CLIENT_SECRET` to the production
   Worker through the protected Wrangler secret workflow. Do not print or commit
   either value. Each `secret put` command changes and activates a live Worker
   version, so these commands must be included in the explicit deployment
   approval and run interactively:

   ```powershell
   npm.cmd exec wrangler -- secret put CF_ACCESS_CLIENT_ID --config .\wrangler.jsonc --name ke-gong-portfolio
   npm.cmd exec wrangler -- secret put CF_ACCESS_CLIENT_SECRET --config .\wrangler.jsonc --name ke-gong-portfolio
   ```
4. Build the production frontend with `VITE_PERSONAL_RAG_ENABLED=true` and no
   browser-visible API base URL override:

   ```powershell
   $env:VITE_PERSONAL_RAG_ENABLED = 'true'
   Remove-Item Env:VITE_PERSONAL_RAG_API_BASE_URL -ErrorAction SilentlyContinue
   npm.cmd run build
   ```

5. Run `npm.cmd exec wrangler -- deploy --config .\wrangler.jsonc --dry-run`.
6. Verify the dry-run bindings are `ASSETS`, `RAG_API_ORIGIN`, and
   `CHAT_RATE_LIMITER` only.
7. Deploy the existing `ke-gong-portfolio` Worker using the approved production
   command:

   ```powershell
   npm.cmd exec wrangler -- deploy --config .\wrangler.jsonc --name ke-gong-portfolio
   ```
8. Test the public chat with supported and unsupported questions, then verify
   the existing portfolio routes and production asset response.

Cloudflare's Worker Rate Limiting API is approximate per Cloudflare location;
it is not a strict global quota. The configured binding is a lightweight public
beta safeguard and does not require Redis, Durable Objects, Workers AI, or a
paid storage service.

## Rollback

Before deployment, record the current production deployment/version from:

```powershell
npm.cmd exec wrangler -- deployments list --name ke-gong-portfolio
```

If the deployed version breaks the portfolio or chat, use the documented
Wrangler version rollback workflow for `ke-gong-portfolio` after checking the
version ID. If only the assistant is problematic and the static portfolio is
healthy, redeploy the previous static-only Worker version or rebuild without
`VITE_PERSONAL_RAG_ENABLED=true`. Do not roll back or modify
`personal-rag-preview` while rolling back production.

To hide the assistant while keeping the portfolio deployed, rebuild without the
feature flag and deploy the same Worker:

```powershell
Remove-Item Env:VITE_PERSONAL_RAG_ENABLED -ErrorAction SilentlyContinue
Remove-Item Env:VITE_PERSONAL_RAG_API_BASE_URL -ErrorAction SilentlyContinue
npm.cmd run build
npm.cmd exec wrangler -- deploy --config .\wrangler.jsonc --name ke-gong-portfolio
```

This disables the browser UI; it does not remove the Worker route itself. A
full API shutdown requires rolling back to a static-only Worker version or a
separately authorized server-side route gate.
