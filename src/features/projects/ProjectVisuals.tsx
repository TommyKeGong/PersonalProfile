export function KnowledgeArchitecture() {
  return (
    <svg className="project-diagram" viewBox="0 0 760 500" role="img" aria-labelledby="knowledge-diagram-title knowledge-diagram-desc">
      <title id="knowledge-diagram-title">E-CARGO Knowledge Agent evidence pipeline</title>
      <desc id="knowledge-diagram-desc">PDF documents are parsed and chunked, embedded with Sentence Transformers, stored in PostgreSQL with pgvector, retrieved semantically, passed to an LLM, and checked for citations before a source-grounded response.</desc>
      <g className="diagram-grid">
        <path d="M40 102H720M40 250H720M40 398H720" />
        <path d="M160 40V460M320 40V460M480 40V460M640 40V460" />
      </g>
      <text className="diagram-overline" x="40" y="35">VERIFIED IMPLEMENTATION SURFACE / E-CARGO KNOWLEDGE AGENT</text>
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
    <svg className="project-diagram" viewBox="0 0 760 500" role="img" aria-labelledby="optimization-diagram-title optimization-diagram-desc">
      <title id="optimization-diagram-title">E-CARGO optimization research model</title>
      <desc id="optimization-diagram-desc">Agent and role data is clustered, candidate capacity vectors are searched with a genetic algorithm, and GMRA assigns roles under constraints.</desc>
      <g className="optimization-grid">
        <path d="M46 106H714M46 250H714M46 394H714" />
        <path d="M176 40V460M330 40V460M484 40V460M638 40V460" />
      </g>
      <text className="diagram-overline" x="46" y="35">RESEARCH MODEL / E-CARGO ROLE ASSIGNMENT</text>
      <g className="optimization-connector">
        <path d="M166 170H218" />
        <path d="M318 170H370" />
        <path d="M470 170H522" />
        <path d="M622 170V310" />
        <path d="M522 350H470" />
        <path d="M370 350H318" />
        <path d="M218 350H166" />
      </g>
      <g className="optimization-node">
        <rect x="46" y="128" width="120" height="84" rx="2" />
        <text x="62" y="157">agents</text><text x="62" y="178">+ roles</text><text x="62" y="198">ability data</text>
      </g>
      <g className="optimization-node optimization-node-blue">
        <rect x="218" y="128" width="100" height="84" rx="2" />
        <text x="235" y="157">K-Means</text><text x="235" y="178">cluster</text><text x="235" y="198">suitability</text>
      </g>
      <g className="optimization-node">
        <rect x="370" y="128" width="100" height="84" rx="2" />
        <text x="390" y="157">Genetic</text><text x="390" y="178">Algorithm</text><text x="390" y="198">capacity search</text>
      </g>
      <g className="optimization-node optimization-node-blue">
        <rect x="522" y="128" width="100" height="84" rx="2" />
        <text x="546" y="157">GMRA</text><text x="546" y="178">assignment</text><text x="546" y="198">solver</text>
      </g>
      <g className="optimization-node optimization-node-result">
        <rect x="522" y="310" width="100" height="84" rx="2" />
        <text x="537" y="339">constraints</text><text x="537" y="360">roles + limits</text><text x="537" y="380">tested output</text>
      </g>
      <g className="optimization-metric">
        <text x="370" y="332">README-REPORTED EXPERIMENT NOTES</text>
        <text x="370" y="360">single GMRA call</text><text x="620" y="360">~1.2 s</text>
        <text x="370" y="384">Q compression</text><text x="620" y="384">&lt; 7 min</text>
      </g>
      <text className="diagram-caption" x="46" y="445">model constraints / search assignments / inspect outcomes</text>
    </svg>
  )
}
