import { ArrowUpRight, Bot, LockKeyhole } from 'lucide-react'

export function AIChatTeaser() {
  return (
    <aside className="ai-teaser" aria-labelledby="ai-teaser-title">
      <div className="ai-teaser-copy">
        <div className="eyebrow"><Bot size={14} /> Future feature</div>
        <h2 id="ai-teaser-title">Curious about my work?</h2>
        <p>An AI-powered way to explore my experience and research. Coming soon, with public sources and citations.</p>
      </div>
      <div className="ai-teaser-status"><LockKeyhole size={15} /> Independent assistant · not connected</div>
      <div className="ai-teaser-line"><span>Public portfolio content</span><span>Source citations</span><span className="hidden sm:inline-flex">Independent service</span><span className="ai-teaser-arrow">API boundary prepared <ArrowUpRight size={14} /></span></div>
    </aside>
  )
}
