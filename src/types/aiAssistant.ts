export interface ChatCitation {
  id: string
  title: string
  sourceUrl?: string
  excerpt?: string
}

export interface ChatRequest {
  message: string
  conversationId?: string
}

export interface ChatResponse {
  answer: string
  citations: ChatCitation[]
  conversationId?: string
}

export interface AIAssistantConfig {
  apiBaseUrl?: string
  enabled: boolean
}
