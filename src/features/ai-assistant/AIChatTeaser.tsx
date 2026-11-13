import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Bot, ChevronDown, ExternalLink, LoaderCircle, LockKeyhole, Plus, RotateCcw, Send, Sparkles, X } from 'lucide-react'
import { askPersonalAssistant, ChatApiError } from './assistantApi'
import type { ChatCitation, ChatResponse } from '../../types/aiAssistant'

type ChatMessage =
  | { role: 'user'; content: string }
  | { role: 'assistant'; content: string; response: ChatResponse; question: string }

const starterQuestions = [
  'What is Ke\'s technical background?',
  'What projects has Ke worked on?',
  'What are Ke\'s research interests?',
  'What programming languages does Ke use?',
]

const assistantEnabled = import.meta.env.DEV || import.meta.env.VITE_PERSONAL_RAG_ENABLED === 'true'

function CitationList({ citations }: { citations: ChatCitation[] }) {
  if (citations.length === 0) return null

  return (
    <details className="ai-citations">
      <summary className="ai-citations-toggle">
        <span>Sources ({citations.length})</span>
        <ChevronDown size={14} aria-hidden="true" />
      </summary>
      <div className="ai-citations-list" aria-label="Sources used for this answer">
        {citations.map((citation) => (
          citation.url ? (
            <a href={citation.url} target="_blank" rel="noreferrer" key={`${citation.source_id}-${citation.chunk_id}`}>
              <span>{citation.title}</span>
              {citation.original_pages && <small>{citation.original_pages}</small>}
              <ExternalLink size={13} aria-hidden="true" />
            </a>
          ) : (
            <span className="ai-citation-unlinked" key={`${citation.source_id}-${citation.chunk_id}`}>
              <span>{citation.title}</span>
              {citation.original_pages && <small>{citation.original_pages}</small>}
            </span>
          )
        ))}
      </div>
    </details>
  )
}

function AssistantReply({ response, onRetry }: { response: ChatResponse; onRetry: () => void }) {
  const isInsufficient = response.status === 'insufficient_evidence'
  const isProviderError = response.status === 'provider_error'
  const content = response.answer ?? (isInsufficient
    ? 'I could not find enough verified public information to answer that.'
    : 'I\'m having trouble generating a response right now. Please try again.')

  return (
    <div className="ai-message ai-message-assistant">
      <p>{content}</p>
      {isInsufficient && <span className="ai-message-note">No unsupported claim was added.</span>}
      {isProviderError && <button className="ai-inline-retry" type="button" onClick={onRetry}><RotateCcw size={13} /> Retry</button>}
      <CitationList citations={response.citations} />
    </div>
  )
}

function ChatPanel({
  messages,
  question,
  isLoading,
  error,
  inputRef,
  messageListRef,
  onQuestionChange,
  onSubmit,
  onAsk,
  onRetry,
  onNewChat,
  onClose,
}: {
  messages: ChatMessage[]
  question: string
  isLoading: boolean
  error: string | null
  inputRef: React.RefObject<HTMLTextAreaElement | null>
  messageListRef: React.RefObject<HTMLDivElement | null>
  onQuestionChange: (value: string) => void
  onSubmit: () => void
  onAsk: (question: string) => void
  onRetry: (question: string) => void
  onNewChat: () => void
  onClose: () => void
}) {
  return (
    <section id="ai-widget-panel" className="ai-widget-panel" role="dialog" aria-modal="false" aria-labelledby="ai-widget-title" aria-describedby="ai-widget-subtitle">
      <header className="ai-widget-header">
        <div className="ai-widget-heading">
          <span className="ai-widget-icon" aria-hidden="true"><Sparkles size={15} /></span>
          <div>
            <h2 id="ai-widget-title">Ask Ke&apos;s AI</h2>
            <p id="ai-widget-subtitle">Explore my experience, projects &amp; research</p>
          </div>
        </div>
        <div className="ai-widget-controls">
          <button type="button" onClick={onNewChat} aria-label="Start a new chat" title="New chat"><Plus size={16} /></button>
          <button type="button" onClick={onClose} aria-label="Minimize chat" title="Minimize"><X size={17} /></button>
        </div>
      </header>

      <div className="ai-widget-body">
        {messages.length === 0 ? (
          <div className="ai-welcome">
            <div className="ai-welcome-mark" aria-hidden="true"><Bot size={18} /></div>
            <p>Hi! I&apos;m Ke&apos;s AI assistant. Ask me about his technical skills, professional experience, projects, or research.</p>
            <div className="ai-starters">
              <span>Try a question</span>
              {starterQuestions.map((starter) => <button type="button" key={starter} onClick={() => onAsk(starter)} disabled={isLoading}>{starter}</button>)}
            </div>
          </div>
        ) : (
          <div className="ai-message-list" ref={messageListRef} aria-live="polite" aria-busy={isLoading}>
            {messages.map((message, index) => message.role === 'user' ? (
              <div className="ai-message ai-message-user" key={`${message.content}-${index}`}><p>{message.content}</p></div>
            ) : (
              <AssistantReply key={`${message.question}-${index}`} response={message.response} onRetry={() => onRetry(message.question)} />
            ))}
            {isLoading && <div className="ai-loading"><LoaderCircle size={16} className="ai-spin" /> <span>Generating a grounded answer…</span></div>}
          </div>
        )}
        {messages.length === 0 && isLoading && <div className="ai-loading"><LoaderCircle size={16} className="ai-spin" /> <span>Generating a grounded answer…</span></div>}
        {error && <div className="ai-error" role="alert"><span>{error}</span><button type="button" onClick={() => onRetry(question)}><RotateCcw size={13} /> Retry</button></div>}
      </div>

      <form className="ai-composer" onSubmit={(event) => { event.preventDefault(); onSubmit() }}>
        <textarea
          ref={inputRef}
          value={question}
          onChange={(event) => onQuestionChange(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter' && !event.shiftKey) {
              event.preventDefault()
              onSubmit()
            }
          }}
          placeholder="Ask a verified question…"
          rows={2}
          maxLength={500}
          aria-label="Ask the personal assistant"
          disabled={isLoading}
        />
        <button type="submit" disabled={!question.trim() || isLoading} aria-label="Send question"><Send size={16} /></button>
      </form>
      <p className="ai-chat-note">Approved public information only</p>
    </section>
  )
}

export function AIChatTeaser() {
  const [isOpen, setIsOpen] = useState(false)
  const [question, setQuestion] = useState('')
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [retryQuestion, setRetryQuestion] = useState<string | null>(null)
  const launcherRef = useRef<HTMLButtonElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const messageListRef = useRef<HTMLDivElement>(null)
  const requestIdRef = useRef(0)
  const abortControllerRef = useRef<AbortController | null>(null)

  useEffect(() => () => {
    abortControllerRef.current?.abort()
  }, [])

  useEffect(() => {
    if (!isOpen) return
    messageListRef.current?.scrollTo({ top: messageListRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, isLoading, isOpen])

  useEffect(() => {
    if (!isOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
        launcherRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isOpen])

  useEffect(() => {
    if (!isOpen || !window.matchMedia('(max-width: 639px)').matches) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.body.classList.add('ai-chat-open')
    return () => {
      document.body.style.overflow = previousOverflow
      document.body.classList.remove('ai-chat-open')
    }
  }, [isOpen])

  const closeChat = () => {
    setIsOpen(false)
    launcherRef.current?.focus()
  }

  const startNewChat = () => {
    requestIdRef.current += 1
    abortControllerRef.current?.abort()
    abortControllerRef.current = null
    setMessages([])
    setQuestion('')
    setError(null)
    setRetryQuestion(null)
    setIsLoading(false)
  }

  const sendQuestion = async (value: string) => {
    const trimmed = value.trim()
    if (!trimmed || isLoading) return

    setError(null)
    setRetryQuestion(null)
    setQuestion('')
    setMessages((current) => [...current, { role: 'user', content: trimmed }])
    setIsLoading(true)
    const requestId = ++requestIdRef.current
    const abortController = new AbortController()
    abortControllerRef.current = abortController

    try {
      const response = await askPersonalAssistant(trimmed, abortController.signal)
      if (requestId !== requestIdRef.current) return
      setMessages((current) => [...current, { role: 'assistant', content: response.answer ?? '', response, question: trimmed }])
    } catch (requestError) {
      if (requestId !== requestIdRef.current) return
      const message = requestError instanceof ChatApiError ? requestError.message : 'The assistant could not complete that request.'
      setError(message)
      setRetryQuestion(trimmed)
    } finally {
      if (requestId === requestIdRef.current) {
        abortControllerRef.current = null
        setIsLoading(false)
      }
    }
  }

  const retry = (value: string) => {
    const questionToRetry = retryQuestion ?? value
    if (questionToRetry) void sendQuestion(questionToRetry)
  }

  const portalTarget = typeof document === 'undefined' ? null : document.body
  const widget = assistantEnabled ? (
    <div className="ai-widget-root">
      {isOpen && <ChatPanel messages={messages} question={question} isLoading={isLoading} error={error} inputRef={inputRef} messageListRef={messageListRef} onQuestionChange={setQuestion} onSubmit={() => void sendQuestion(question)} onAsk={(value) => void sendQuestion(value)} onRetry={retry} onNewChat={startNewChat} onClose={closeChat} />}
      <button ref={launcherRef} className={`ai-launcher ${isOpen ? 'is-open' : ''}`} type="button" onClick={() => setIsOpen((value) => !value)} aria-expanded={isOpen} aria-controls="ai-widget-panel" aria-label={isOpen ? 'Minimize Ask Ke\'s AI' : 'Open Ask Ke\'s AI'}>
        {isOpen ? <X size={17} aria-hidden="true" /> : <Sparkles size={17} aria-hidden="true" />}
        <span>Ask Ke&apos;s AI</span>
      </button>
    </div>
  ) : null

  return (
    <>
      <aside className="ai-teaser" aria-labelledby="ai-teaser-title">
        <div className="ai-teaser-copy">
          <div className="eyebrow"><Bot size={14} /> Personal assistant preview</div>
          <h2 id="ai-teaser-title">Curious about my work?</h2>
          <p>Ask about my experience, projects, and research. The assistant answers from approved public sources and shows the evidence it used.</p>
        </div>
        <div className="ai-teaser-status"><LockKeyhole size={15} /> Independent service · {assistantEnabled ? 'local preview' : 'not connected'}</div>
        {assistantEnabled ? (
          <button className="ai-open-button" type="button" onClick={() => setIsOpen(true)} aria-expanded={isOpen} aria-controls="ai-widget-panel">
            Ask Ke&apos;s AI <Sparkles size={14} aria-hidden="true" />
          </button>
        ) : (
          <div className="ai-teaser-line"><span>Public portfolio content</span><span>Source citations</span><span>Independent service</span><span className="ai-teaser-arrow">Preview not connected <LockKeyhole size={14} /></span></div>
        )}
      </aside>
      {portalTarget && widget && createPortal(widget, portalTarget)}
    </>
  )
}
