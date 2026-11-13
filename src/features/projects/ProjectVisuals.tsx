export function KnowledgeArchitecture() {
  return (
    <svg className="project-diagram" viewBox="0 0 760 500" role="img" aria-labelledby="knowledge-diagram-title knowledge-diagram-desc">
      <title id="knowledge-diagram-title">Knowledge Agent evidence pipeline</title>
      <desc id="knowledge-diagram-desc">PDF documents are parsed and chunked, embedded with Sentence Transformers, stored in PostgreSQL with pgvector, retrieved semantically, passed to an LLM, and checked for citations before a source-grounded response.</desc>
      <g className="diagram-grid">
        <path d="M40 102H720M40 250H720M40 398H720" />
        <path d="M160 40V460M320 40V460M480 40V460M640 40V460" />
      </g>
      <text className="diagram-overline" x="40" y="35">VERIFIED IMPLEMENTATION SURFACE / KNOWLEDGE AGENT</text>
      <g className="diagram-connector">
        <path d="M148 150H190" />
        <path d="M278 150H320" />
        <path d="M408 150H450" />
        <path d="M538 150H580" />
        <path d="M624 194V306" />
        <path d="M580 350H538" />
        <path d="M450 350H408" />
        <path d="M320 350H278" />
      </g>
      <g className="diagram-node">
        <rect x="40" y="112" width="108" height="76" rx="2" />
        <text x="55" y="143">PDF</text><text x="55" y="163">documents</text>
      </g>
      <g className="diagram-node">
        <rect x="190" y="112" width="88" height="76" rx="2" />
        <text x="204" y="143">PyMuPDF</text><text x="204" y="163">parse + chunk</text>
      </g>
      <g className="diagram-node diagram-node-blue">
        <rect x="320" y="112" width="88" height="76" rx="2" />
        <text x="334" y="143">Sentence</text><text x="334" y="163">Transformers</text>
      </g>
      <g className="diagram-node">
        <rect x="450" y="112" width="88" height="76" rx="2" />
        <text x="466" y="143">Postgres</text><text x="466" y="163">+ pgvector</text>
      </g>
      <g className="diagram-node diagram-node-blue">
        <rect x="580" y="112" width="88" height="76" rx="2" />
        <text x="594" y="143">semantic</text><text x="594" y="163">retrieval</text>
      </g>
      <g className="diagram-node">
        <rect x="580" y="306" width="88" height="76" rx="2" />
        <text x="607" y="337">LLM</text><text x="595" y="357">integration</text>
      </g>
      <g className="diagram-node diagram-node-blue">
        <rect x="450" y="306" width="88" height="76" rx="2" />
        <text x="462" y="337">citation</text><text x="462" y="357">validation</text>
      </g>
      <g className="diagram-node diagram-node-answer">
        <rect x="320" y="306" width="88" height="76" rx="2" />
        <text x="332" y="337">source-</text><text x="332" y="357">grounded</text>
      </g>
      <g className="diagram-node">
        <rect x="190" y="306" width="88" height="76" rx="2" />
        <text x="207" y="337">FastAPI</text><text x="207" y="357">service</text>
      </g>
      <text className="diagram-caption" x="40" y="445">document evidence in / answer evidence out</text>
    </svg>
  )
}

export function OptimizationDiagram() {
  return (
    <div className="optimization-figures" aria-label="E-CARGO research figures">
      <figure className="optimization-figure optimization-figure-flow">
        <img src="/research/ecargo-collaboration-flow.png" alt="Flowchart showing role negotiation, agent evaluation, group role assignment, role playing, transfer, re-evaluation, and collaboration completion." />
        <figcaption>Role-based collaboration workflow</figcaption>
      </figure>
      <figure className="optimization-figure optimization-figure-graphic">
        <svg className="optimization-graphic" viewBox="0 0 520 420" role="img" aria-labelledby="optimization-graphic-title optimization-graphic-desc">
          <title id="optimization-graphic-title">Constraint-aware role assignment optimization</title>
          <desc id="optimization-graphic-desc">Candidate agents and roles move through constraint scoring before a feasible Group Multi-Role Assignment is selected.</desc>
          <rect className="optimization-graphic-surface" x="0" y="0" width="520" height="420" />
          <g className="optimization-graphic-grid">
            <path d="M28 74H492M28 140H492M28 206H492M28 272H492M28 338H492" />
            <path d="M118 44V378M250 44V378M382 44V378" />
          </g>
          <text className="optimization-graphic-overline" x="28" y="32">OPTIMIZATION / FEASIBLE SEARCH</text>
          <text className="optimization-graphic-label" x="28" y="62">CANDIDATES</text>
          <text className="optimization-graphic-label" x="198" y="62">CONSTRAINT SCORE</text>
          <text className="optimization-graphic-label" x="382" y="62">SELECTED OUTPUT</text>
          <g className="optimization-graphic-card">
            <rect x="28" y="98" width="122" height="46" rx="2" />
            <text x="42" y="118">agents + roles</text>
            <text x="42" y="134">ability data</text>
            <rect x="28" y="166" width="122" height="46" rx="2" />
            <text x="42" y="186">candidate A</text>
            <text x="42" y="202">role coverage</text>
            <rect x="28" y="234" width="122" height="46" rx="2" />
            <text x="42" y="254">candidate B</text>
            <text x="42" y="270">capacity fit</text>
          </g>
          <g className="optimization-graphic-connector">
            <path d="M150 121H194" />
            <path d="M150 189H194" />
            <path d="M150 257H194" />
            <path d="M326 189H370" />
            <path d="M326 257H350V290H370" />
          </g>
          <g className="optimization-graphic-score">
            <rect x="194" y="98" width="132" height="182" rx="2" />
            <text x="210" y="122">score candidates</text>
            <text x="210" y="148">role fit</text>
            <rect className="optimization-graphic-bar" x="210" y="158" width="88" height="8" rx="4" />
            <rect className="optimization-graphic-bar optimization-graphic-bar-accent" x="210" y="158" width="68" height="8" rx="4" />
            <text x="210" y="188">role limits</text>
            <rect className="optimization-graphic-bar" x="210" y="198" width="88" height="8" rx="4" />
            <rect className="optimization-graphic-bar optimization-graphic-bar-accent" x="210" y="198" width="54" height="8" rx="4" />
            <text x="210" y="228">constraints</text>
            <rect className="optimization-graphic-bar" x="210" y="238" width="88" height="8" rx="4" />
            <rect className="optimization-graphic-bar optimization-graphic-bar-accent" x="210" y="238" width="76" height="8" rx="4" />
            <text className="optimization-graphic-note" x="210" y="264">feasibility check</text>
          </g>
          <g className="optimization-graphic-result">
            <rect x="370" y="150" width="122" height="148" rx="2" />
            <circle cx="394" cy="180" r="8" />
            <path d="M390 180l3 3 6-7" />
            <text x="414" y="184">feasible</text>
            <text x="386" y="222">GMRA</text>
            <text x="386" y="244">role assignment</text>
            <text x="386" y="274">roles + limits</text>
          </g>
          <text className="optimization-graphic-caption" x="28" y="382">model constraints / compare candidates / select a feasible assignment</text>
        </svg>
        <figcaption>Constraint-aware optimization view</figcaption>
      </figure>
    </div>
  )
}
