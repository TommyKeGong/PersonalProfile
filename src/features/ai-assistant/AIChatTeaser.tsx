import { ArrowUpRight, Bot, LockKeyhole } from 'lucide-react'

export function AIChatTeaser() {
  return (
    <aside className="panel ai-teaser overflow-hidden rounded-[2rem] p-6 sm:p-8" aria-labelledby="ai-teaser-title">
      <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <div className="eyebrow mb-4"><Bot size={15} /> Future feature</div>
          <h3 id="ai-teaser-title" className="display-font text-3xl font-semibold tracking-tight sm:text-4xl">Ask my AI <span className="accent-text">— coming soon</span></h3>
          <p className="muted mt-4 max-w-xl text-base leading-7">A future independent assistant will answer questions about my public background, projects, and research with citations. It is intentionally not active yet.</p>
        </div>
        <div className="flex items-center gap-3 text-sm muted"><LockKeyhole size={16} /> No backend connected</div>
      </div>
      <div className="relative z-10 mt-8 flex flex-wrap items-center gap-3 text-xs font-medium uppercase tracking-[0.16em] muted">
        <span className="chip">Public portfolio content</span><span className="chip">Source citations</span><span className="chip">Independent service</span>
        <span className="ml-auto hidden items-center gap-1 text-accent sm:flex">API boundary prepared <ArrowUpRight size={14} /></span>
      </div>
    </aside>
  )
}
