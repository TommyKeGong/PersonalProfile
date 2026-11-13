# Ke Gong — Personal Portfolio

Standalone React + TypeScript portfolio for [kegong.dev](https://kegong.dev). The site presents verified software engineering, AI/ML, data engineering, and computational research experience.

## Local development

```bash
npm install
npm run dev
```

Production checks:

```bash
npm run typecheck
npm run lint
npm run build
npm run preview
```

## Architecture

- `src/data/portfolio.ts` — verified portfolio content and structured data.
- `src/features/ai-assistant/` — isolated assistant preview UI and API adapter.
- `src/types/aiAssistant.ts` — Personal RAG request, response, citation, and configuration interfaces.
- `docs/ai-assistant-contract.md` — independent FastAPI contract and privacy boundary.
- `public/` — logo, robots, sitemap, and web manifest.

The public production build keeps the assistant disabled unless it is explicitly built with `VITE_PERSONAL_RAG_ENABLED=true` and deployed with the server-side Worker secrets configured. Local development enables the isolated Personal RAG preview and proxies `/api` to `127.0.0.1:8001`; staging uses the separate `personal-rag-preview` Worker. The frontend never connects to the E-CARGO Knowledge Agent.

## Deployment

The site is deployed as a Cloudflare Worker with static assets and an optional same-origin chat proxy through Wrangler:

```bash
npm run build
npm exec wrangler -- deploy --name ke-gong-portfolio --assets dist --domains kegong.dev --domains www.kegong.dev
```

The deployment configuration is in [wrangler.jsonc](./wrangler.jsonc). Configure custom domains only after confirming DNS access; preserve unrelated MX, SPF, DKIM, DMARC, and service records. Production deployment is intentionally not performed by the public-beta preparation workflow. See [docs/personal-rag-production.md](./docs/personal-rag-production.md) for the gated checklist and rollback steps.

## Environment variables

Optional preview variables are `VITE_PERSONAL_RAG_ENABLED=true` and `VITE_PERSONAL_RAG_API_BASE_URL=<independent FastAPI base ending in /api/v1>`. Never put credentials in Vite variables: they are shipped to the browser.

## Privacy and limitations

Only public professional contact links and verified experience are included. No telephone number, residential address, postal code, immigration documents, work permit details, demographic information, private research documents, or credentials are stored in this project.

The local assistant preview sends bounded questions to the independent Personal RAG service, renders verified citations, preserves deliberate abstentions, and shows a retryable error when the provider is unavailable. A protected remote staging origin is still required before enabling it outside local development.
