# Future Personal AI Assistant Contract

The portfolio currently runs entirely as a static frontend. The future assistant should be an independent service and must not connect to the E-CARGO Knowledge Agent's live database, runtime, or credentials.

## Configuration

The frontend can reserve `VITE_API_BASE_URL` for the future FastAPI service. The feature remains disabled until an explicit enabled flag and backend health check are available.

## Endpoints

- `GET /api/health` — returns service availability and API version.
- `POST /api/chat` — accepts `{ "message": string, "conversationId?: string }` and returns `{ "answer": string, "citations": Citation[], "conversationId?: string }`.

## Citation shape

```ts
interface Citation {
  id: string
  title: string
  sourceUrl?: string
  excerpt?: string
}
```

Only approved public portfolio content and public research documents should be ingested. Private application information, credentials, unpublished confidential material, and existing E-CARGO runtime data are out of scope.
