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
- `src/features/ai-assistant/` — reserved boundary for a future, optional assistant UI.
- `src/types/aiAssistant.ts` — chat request, response, citation, and configuration interfaces.
- `docs/ai-assistant-contract.md` — proposed independent FastAPI contract.
- `public/` — favicon, robots, sitemap, and web manifest.

The frontend has no backend dependency and does not connect to the E-CARGO Knowledge Agent. The future assistant must use its own service, data store, credentials, and deployment.

## Deployment

Cloudflare Pages settings:

- Framework preset: Vite
- Build command: `npm run build`
- Output directory: `dist`
- Production branch: `main`

For a Git-connected deployment, connect the standalone repository and set the build configuration above. Configure `kegong.dev` and `www.kegong.dev` as custom domains only after confirming DNS access; preserve unrelated MX, SPF, DKIM, DMARC, and service records. Prefer redirecting `www` to `kegong.dev`.

## Environment variables

No environment variables are required for the current static site. `VITE_API_BASE_URL` is reserved for the future assistant and must not contain credentials.

## Privacy and limitations

Only public professional contact links and verified experience are included. No telephone number, residential address, postal code, immigration documents, work permit details, demographic information, private research documents, or credentials are stored in this project.

The assistant is a coming-soon boundary only; it is not functional and does not generate answers today.
