interface AssetFetcher {
  fetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response>
}

interface RateLimitBinding {
  limit(input: { key: string }): Promise<{ success: boolean }>
}

export interface RagWorkerEnv {
  ASSETS: AssetFetcher
  RAG_API_ORIGIN: string
  CF_ACCESS_CLIENT_ID: string
  CF_ACCESS_CLIENT_SECRET: string
  AI_CHAT_ENABLED?: string
  CHAT_RATE_LIMITER?: RateLimitBinding
}

const CHAT_PATH = '/api/v1/chat'
const UPSTREAM_TIMEOUT_MS = 90_000
const MAX_REQUEST_BYTES = 8 * 1024
const MAX_QUESTION_CHARACTERS = 500

function jsonResponse(body: Record<string, unknown>, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
    },
  })
}

async function parseChatBody(request: Request): Promise<{ question: string } | Response> {
  const contentType = request.headers.get('content-type') ?? ''
  if (!contentType.toLowerCase().startsWith('application/json')) {
    return jsonResponse({ error: 'content_type_must_be_json' }, 415)
  }

  const contentLength = Number(request.headers.get('content-length') ?? 0)
  if (Number.isFinite(contentLength) && contentLength > MAX_REQUEST_BYTES) {
    return jsonResponse({ error: 'request_too_large' }, 413)
  }

  const body = await request.arrayBuffer()
  if (body.byteLength > MAX_REQUEST_BYTES) {
    return jsonResponse({ error: 'request_too_large' }, 413)
  }

  let parsed: unknown
  try {
    parsed = JSON.parse(new TextDecoder().decode(body))
  } catch {
    return jsonResponse({ error: 'invalid_json' }, 400)
  }

  if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
    return jsonResponse({ error: 'invalid_request' }, 400)
  }

  const question = (parsed as { question?: unknown }).question
  if (typeof question !== 'string' || question.trim().length === 0) {
    return jsonResponse({ error: 'question_required' }, 400)
  }
  if (question.trim().length > MAX_QUESTION_CHARACTERS) {
    return jsonResponse({ error: 'question_too_long' }, 413)
  }

  return { question: question.trim() }
}

async function proxyChat(request: Request, env: RagWorkerEnv): Promise<Response> {
  if (env.AI_CHAT_ENABLED === 'false') {
    return jsonResponse(
      { error: 'chat_temporarily_unavailable', message: 'AI chat is temporarily unavailable.' },
      503,
    )
  }

  if (request.method !== 'POST') {
    return jsonResponse({ error: 'method_not_allowed' }, 405)
  }

  const parsed = await parseChatBody(request)
  if (parsed instanceof Response) return parsed

  if (env.CHAT_RATE_LIMITER) {
    const clientIp = request.headers.get('cf-connecting-ip') ?? 'unknown'
    const decision = await env.CHAT_RATE_LIMITER.limit({ key: `chat:${clientIp}` })
    if (!decision.success) {
      return jsonResponse(
        { error: 'rate_limited', message: 'Please wait a moment before trying again.' },
        429,
      )
    }
  }

  let upstream: URL
  try {
    upstream = new URL(CHAT_PATH, env.RAG_API_ORIGIN)
  } catch {
    return jsonResponse({ error: 'upstream_configuration_error' }, 500)
  }

  const headers = new Headers({
    'content-type': 'application/json',
    accept: 'application/json',
    'cache-control': 'no-store',
    'CF-Access-Client-Id': env.CF_ACCESS_CLIENT_ID,
    'CF-Access-Client-Secret': env.CF_ACCESS_CLIENT_SECRET,
  })
  const requestId = request.headers.get('x-request-id')
  if (requestId) headers.set('x-request-id', requestId)

  try {
    const response = await fetch(upstream, {
      method: 'POST',
      headers,
      body: JSON.stringify(parsed),
      signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
    })
    const responseHeaders = new Headers({
      'cache-control': 'no-store',
      'content-type': response.headers.get('content-type') ?? 'application/json',
    })
    return new Response(response.body, {
      status: response.status,
      headers: responseHeaders,
    })
  } catch {
    return jsonResponse({ error: 'upstream_unavailable' }, 502)
  }
}

export default {
  async fetch(request: Request, env: RagWorkerEnv): Promise<Response> {
    const url = new URL(request.url)
    if (url.pathname === CHAT_PATH) {
      return proxyChat(request, env)
    }
    return env.ASSETS.fetch(request)
  },
}
