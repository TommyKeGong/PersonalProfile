export interface ChatCitation {
  source_id: string
  title: string
  url: string | null
  chunk_id: string
  original_pages?: string | null
  publication_id?: string | null
  publication_status?: string | null
  authors?: string[] | null
}

export interface ChatRequest {
  question: string
}

export interface ChatResponse {
  answer: string | null
  citations: ChatCitation[]
  status: 'answered' | 'insufficient_evidence' | 'provider_error' | string
  provider: string
  retrieved_count: number
}

export interface AIAssistantConfig {
  apiBaseUrl?: string
  enabled: boolean
}
