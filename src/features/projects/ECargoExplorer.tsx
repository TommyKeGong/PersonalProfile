import { useState } from 'react'
import { ArrowUpRight, Check, ChevronRight, GitBranch, Layers3, Play, RotateCcw, Search, SlidersHorizontal, Sparkles, Workflow, Zap } from 'lucide-react'

type ExplorerMode = 'graph' | 'assignment' | 'pipeline'

const modes: Array<{ id: ExplorerMode; label: string; icon: typeof GitBranch }> = [
  { id: 'graph', label: 'Role graph', icon: GitBranch },
  { id: 'assignment', label: 'Assignment lab', icon: SlidersHorizontal },
  { id: 'pipeline', label: 'Evaluation flow', icon: Workflow },
]

const roles = [
  { id: 'software-engineer', label: 'Software Engineer', kind: 'Current role', detail: 'Builds backend services, AI-assisted workflows, and maintainable system foundations.' },
  { id: 'researcher', label: 'Researcher', kind: 'Research role', detail: 'Frames computational questions, models constraints, and studies useful structure.' },
  { id: 'data-engineer', label: 'Data Engineer', kind: 'Related role', detail: 'Designs reliable pipelines that move, clean, and explain data for downstream work.' },
  { id: 'project-lead', label: 'Project Lead', kind: 'Relationship', detail: 'Coordinates responsibilities and keeps role boundaries visible across a group.' },
]

function RoleGraph() {
  const [selectedRole, setSelectedRole] = useState(roles[0].id)
  const selected = roles.find((role) => role.id === selectedRole) ?? roles[0]

  return (
    <div className="ecargo-mode-content ecargo-graph-mode">
      <div className="ecargo-graph-toolbar">
        <div className="ecargo-search"><Search size={14} /><span>Search roles</span></div>
        <span className="ecargo-fixture-label">Fixture graph · read only</span>
      </div>
      <div className="ecargo-graph-canvas" aria-label="Interactive example of an E-CARGO role graph">
        <svg className="ecargo-graph-lines" viewBox="0 0 600 350" aria-hidden="true">
          <path d="M145 183 C205 183 210 105 275 105" />
          <path d="M145 183 C215 183 220 260 290 260" />
          <path d="M335 105 C390 105 400 170 460 170" />
          <path d="M350 260 C405 260 405 185 460 170" />
        </svg>
        <div className="ecargo-graph-legend"><span className="legend-dot legend-blue" /> selected <span className="legend-dot legend-silver" /> related <span className="legend-line" /> relationship</div>
        <button className={`ecargo-role-node role-node-root ${selectedRole === 'software-engineer' ? 'is-selected' : ''}`} onClick={() => setSelectedRole('software-engineer')} type="button">Software<br />Engineer</button>
        <button className={`ecargo-role-node role-node-research ${selectedRole === 'researcher' ? 'is-selected' : ''}`} onClick={() => setSelectedRole('researcher')} type="button">Researcher</button>
        <button className={`ecargo-role-node role-node-data ${selectedRole === 'data-engineer' ? 'is-selected' : ''}`} onClick={() => setSelectedRole('data-engineer')} type="button">Data<br />Engineer</button>
        <button className={`ecargo-role-node role-node-lead ${selectedRole === 'project-lead' ? 'is-selected' : ''}`} onClick={() => setSelectedRole('project-lead')} type="button">Project<br />Lead</button>
      </div>
      <div className="ecargo-role-detail" aria-live="polite">
        <div><span className="ecargo-detail-kicker">Selected role</span><strong>{selected.label}</strong><span>{selected.kind}</span></div>
        <p>{selected.detail}</p>
        <ChevronRight size={17} aria-hidden="true" />
      </div>
    </div>
  )
}

function AssignmentLab() {
  const [isRun, setIsRun] = useState(false)

  return (
    <div className="ecargo-mode-content ecargo-assignment-mode">
      <div className="ecargo-lab-header"><div><span className="ecargo-detail-kicker">Sanitized scenario</span><h4>Fit people to responsibilities.</h4></div><span className="ecargo-fixture-label">No live execution</span></div>
      <div className="ecargo-assignment-grid">
        <div className="ecargo-assignment-column"><span className="ecargo-column-label">Agents</span><div className="ecargo-chip-list"><span>Agent A · backend</span><span>Agent B · research</span><span>Agent C · data</span></div></div>
        <div className="ecargo-assignment-arrow"><Zap size={16} /><span>qualification<br />+ constraints</span></div>
        <div className="ecargo-assignment-column"><span className="ecargo-column-label">Roles</span><div className="ecargo-chip-list"><span>API platform</span><span>Model analyst</span><span>Data pipeline</span></div></div>
      </div>
      <div className={`ecargo-result-panel ${isRun ? 'is-complete' : ''}`} aria-live="polite">
        <div><span className="ecargo-detail-kicker">Sample output</span><strong>{isRun ? 'Assignment is feasible' : 'Ready for an assignment run'}</strong></div>
        <span className="ecargo-result-status"><Check size={14} /> {isRun ? 'constraints checked' : 'fixture loaded'}</span>
      </div>
      <button className="ecargo-run-button" type="button" onClick={() => setIsRun((value) => !value)}>{isRun ? <><RotateCcw size={15} /> Reset sample</> : <><Play size={15} /> Run sample assignment</>}</button>
    </div>
  )
}

function EvaluationPipeline() {
  const stages = [
    ['01', 'Agent profile', 'skills · experience · preferences'],
    ['02', 'LLM evaluation', 'evidence-backed qualification score'],
    ['03', 'GRA assignment', 'role limits · conflicts · constraints'],
    ['04', 'Explainable result', 'assignment proposal · solver status'],
  ]

  return (
    <div className="ecargo-mode-content ecargo-pipeline-mode">
      <div className="ecargo-lab-header"><div><span className="ecargo-detail-kicker">System boundary</span><h4>From evidence to assignment.</h4></div><span className="ecargo-fixture-label">Conceptual flow</span></div>
      <div className="ecargo-pipeline-list">
        {stages.map(([number, title, detail], index) => <div className="ecargo-pipeline-stage" key={title}><span className="ecargo-stage-number">{number}</span><div><strong>{title}</strong><span>{detail}</span></div>{index < stages.length - 1 && <ChevronRight className="ecargo-stage-arrow" size={16} />}</div>)}
      </div>
      <div className="ecargo-pipeline-note"><Sparkles size={15} /><span>AI evaluation and optimization stay separate, so each result can be inspected before assignment.</span></div>
    </div>
  )
}

export function ECargoExplorer() {
  const [mode, setMode] = useState<ExplorerMode>('graph')
  const activeMode = modes.find((item) => item.id === mode) ?? modes[0]
  const ActiveIcon = activeMode.icon

  return (
    <section className="ecargo-explorer" aria-labelledby="ecargo-explorer-title">
      <div className="ecargo-explorer-intro">
        <div><p className="project-kicker">03.03 / Interactive case study · E-CARGO</p><h3 id="ecargo-explorer-title">See the system<br /><span>think in layers.</span></h3></div>
        <div className="ecargo-explorer-copy"><p>A product-style view of role relationships, evaluation, and constrained assignment — presented with sanitized fixture data and no connection to the live service.</p><a className="blue-link" href="https://e-cargo.info/" target="_blank" rel="noreferrer">Open Role Dictionary <ArrowUpRight size={14} /></a></div>
      </div>
      <div className="ecargo-window">
        <div className="ecargo-window-chrome"><div className="ecargo-window-dots"><span /><span /><span /></div><span className="ecargo-window-title"><Layers3 size={14} /> E-CARGO Systems Explorer</span><span className="ecargo-window-state">interactive preview</span></div>
        <div className="ecargo-window-body">
          <aside className="ecargo-mode-nav" aria-label="Explorer views">
            <span className="ecargo-mode-label">Explore the model</span>
            {modes.map(({ id, label, icon: Icon }) => <button className={mode === id ? 'is-active' : ''} key={id} type="button" onClick={() => setMode(id)} aria-pressed={mode === id}><Icon size={15} /><span>{label}</span><ChevronRight size={14} /></button>)}
            <div className="ecargo-mode-caption"><span>UI surface</span><strong>frontend only</strong><small>Independent from E-CARGO runtime</small></div>
          </aside>
          <div className="ecargo-demo-panel"><div className="ecargo-demo-heading"><div><span className="ecargo-detail-kicker">{activeMode.label}</span><strong><ActiveIcon size={16} /> {mode === 'graph' ? 'Explore relationships' : mode === 'assignment' ? 'Test a constrained scenario' : 'Follow the decision path'}</strong></div><span className="ecargo-demo-counter">0{modes.findIndex((item) => item.id === mode) + 1} / 03</span></div>{mode === 'graph' ? <RoleGraph /> : mode === 'assignment' ? <AssignmentLab /> : <EvaluationPipeline />}</div>
        </div>
      </div>
      <div className="ecargo-explorer-footer"><span><span className="ecargo-footer-dot" /> sanitized demo data</span><span>role graph · LLM evaluation · GRA optimization</span><span>engineering story, not a live dashboard</span></div>
    </section>
  )
}
