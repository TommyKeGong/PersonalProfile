# Personal AI Assistant Contract

The portfolio remains a static frontend unless the assistant is explicitly enabled at build time. In local development and the separate staging Worker, the assistant UI calls the independent Personal RAG service through a same-origin `/api/v1/chat` proxy. It must not connect to the E-CARGO Knowledge Agent's live database, runtime, or credentials.

## Configuration

The frontend uses `VITE_PERSONAL_RAG_API_BASE_URL` when configured, defaulting to `/api/v1`. Vite proxies that path to `127.0.0.1:8001` during local development. The feature is enabled in local development or when `VITE_PERSONAL_RAG_ENABLED=true` is explicitly set for an isolated preview. The browser never receives Access credentials; the Worker adds them only on the Worker-to-origin request.

## Endpoints

- `GET /health` — returns service availability.
- `POST /api/v1/chat` — accepts `{ "question": string }` and returns `{ "answer": string | null, "citations": Citation[], "status": string, "provider": string, "retrieved_count": number }`.

## Citation shape

```ts
interface Citation {
  source_id: string
  title: string
  url: string | null
  chunk_id: string
  original_pages?: string | null
  publication_id?: string | null
  publication_status?: string | null
  authors?: string[] | null
}
```

The UI treats `insufficient_evidence` as a deliberate abstention, displays no fabricated answer, and only renders citations returned by the API. A citation URL is optional because an approved source may be stored without a public link.

## Local widget behavior

The local preview exposes the assistant through a floating launcher and a compact responsive panel. Conversation messages are kept in React memory only; they are cleared with **New chat** and are never written to `localStorage` or `sessionStorage`. The current API is single-turn, so each submitted question is sent as `{ "question": string }` without pretending to provide conversation history. Closing the panel preserves an in-flight request and reopening it shows the result; starting a new chat cancels the pending request and clears the visible conversation.

## Boundaries

Only approved public portfolio content and public research documents may be ingested. Private application information, credentials, unpublished confidential material, and existing E-CARGO runtime data are out of scope. The browser never connects directly to PostgreSQL or Ollama.

## Public beta boundary

The Worker proxy accepts only `POST /api/v1/chat`, requires JSON, rejects empty or overlong questions, limits the request body to 8 KiB, and returns safe JSON errors. The staging and prepared production Worker configurations use Cloudflare's Worker Rate Limiting binding at 5 requests per 60 seconds per Cloudflare-provided visitor IP. The limit is approximate per Cloudflare location, so it is lightweight abuse protection rather than a strict global quota. FastAPI's existing concurrency and local rate protection remain in place as a second boundary.

When the backend, tunnel, or Ollama is unavailable, the frontend shows a retryable temporary-unavailability message and keeps the portfolio usable. The chat API remains single-turn and does not add conversation memory.
