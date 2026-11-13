import type { ChatRequest, ChatResponse } from '../../types/aiAssistant'

export class ChatApiError extends Error {
  readonly kind: 'unavailable' | 'rate_limited' | 'request_failed'

  constructor(message: string, kind: ChatApiError['kind']) {
    super(message)
    this.name = 'ChatApiError'
    this.kind = kind
  }
}

const configuredBaseUrl = import.meta.env.VITE_PERSONAL_RAG_API_BASE_URL?.trim()
const apiBaseUrl = (configuredBaseUrl || '/api/v1').replace(/\/$/, '')

export async function askPersonalAssistant(question: string, signal?: AbortSignal): Promise<ChatResponse> {
  const payload: ChatRequest = { question }
  const timeoutController = new AbortController()
  const timeoutId = window.setTimeout(() => timeoutController.abort(), 90_000)
  const abortFromCaller = () => timeoutController.abort()
  if (signal) {
    if (signal.aborted) timeoutController.abort()
    else signal.addEventListener('abort', abortFromCaller, { once: true })
  }

  let response: Response
  try {
    response = await fetch(`${apiBaseUrl}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
      signal: timeoutController.signal,
    })
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new ChatApiError('Ke\'s AI Assistant is temporarily unavailable. You can still explore his projects and experience on this website.', 'unavailable')
    }
    throw new ChatApiError('Ke\'s AI Assistant is temporarily unavailable. You can still explore his projects and experience on this website.', 'unavailable')
  } finally {
    window.clearTimeout(timeoutId)
    signal?.removeEventListener('abort', abortFromCaller)
  }

  if (response.status === 429) {
    throw new ChatApiError('The assistant is receiving many questions right now. Please wait a moment and try again.', 'rate_limited')
  }

  if (response.status === 502 || response.status === 503 || response.status === 504 || response.status === 530) {
    throw new ChatApiError('Ke\'s AI Assistant is temporarily unavailable. You can still explore his projects and experience on this website.', 'unavailable')
  }

  if (!response.ok) {
    throw new ChatApiError('The assistant could not complete that request.', 'request_failed')
  }

  try {
    return await response.json() as ChatResponse
  } catch {
    throw new ChatApiError('The assistant returned an unreadable response.', 'request_failed')
  }
}
