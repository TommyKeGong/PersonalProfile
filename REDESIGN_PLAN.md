# Redesign plan: kegong.dev

This roadmap translates the audit findings into a focused path toward a more convincing Apple-inspired technology presentation. It preserves the current React + TypeScript + Vite architecture, verified portfolio content, Cloudflare deployment path, and independent future RAG boundary.

The goal is not to imitate Apple’s identity. The goal is to borrow the discipline: one clear subject per chapter, deliberate whitespace, product-level visual proof, concise copy, and motion that explains rather than decorates.

## Target experience

When a recruiter opens the site, the first screen should communicate three things immediately:

1. Ke Gong is a software engineer focused on AI/ML and data engineering.
2. He builds concrete backend, data, and AI systems.
3. His work is supported by measurable engineering results and research credibility.

The page should then move like a product story:

`identity → engineering approach → selected system → measurable experience → research proof → skills → future assistant → contact`

## Current baseline

- Live site: [https://kegong.dev](https://kegong.dev)
- Application entry: [src/App.tsx](./src/App.tsx)
- Design system/styles: [src/index.css](./src/index.css)
- Verified content: [src/data/portfolio.ts](./src/data/portfolio.ts)
- Future assistant UI: [src/features/ai-assistant/AIChatTeaser.tsx](./src/features/ai-assistant/AIChatTeaser.tsx)
- Future assistant types: [src/types/aiAssistant.ts](./src/types/aiAssistant.ts)
- Future assistant contract: [docs/ai-assistant-contract.md](./docs/ai-assistant-contract.md)
- Deployment config: [wrangler.jsonc](./wrangler.jsonc)

The current implementation is functionally sound. Redesign work should focus on visual proof, information hierarchy, and accessibility polish rather than introducing a new framework or backend.

## Prioritized implementation roadmap

### Phase 0 — Guardrails and content approval

Priority: P0 / before visual work  
Complexity: low

- Keep all content in [src/data/portfolio.ts](./src/data/portfolio.ts) and preserve the verified facts.
- Confirm which project screenshots, diagrams, or research figures are safe for public use.
- Do not expose private documents, unpublished manuscripts, credentials, or E-CARGO runtime data.
- Decide whether a public technical-detail URL exists for either E-CARGO project. If no verified URL exists, retain expandable technical notes and do not fabricate one.
- Establish an asset budget: one hero visual, one primary project visual, one research visual, and one social preview image at most for the first iteration.

Acceptance criteria:

- Every new visual artifact has a source or an explicit “original diagram” label.
- No new claims or metrics are added without verification.

### Phase 1 — Hero and navigation hierarchy

Priority: P1  
Likely files: [src/App.tsx](./src/App.tsx), [src/index.css](./src/index.css)  
Complexity: low to medium

#### Hero changes

- Keep the expressive headline “Building intelligent digital experiences.” as the editorial statement.
- Add the verified identity line immediately above or below it: `Software Engineer · AI/ML & Data Engineering`.
- Add one concise proof line: `Backend systems, applied AI, data pipelines, and computational research.`
- Keep only two actions: `Explore my work` and `Get in touch`.
- Add one restrained, original hero artifact: a thin system map, a typographic research mark, or a real approved visual with no fake product UI.
- Reduce mobile hero vertical padding so 375 × 667 shows the headline, identity, intro, and primary action without requiring a second screen.

#### Navigation changes

- Keep the slim translucent header.
- Add a visible active-section state using `IntersectionObserver` and `aria-current="true"` on the active item.
- Add a skip-to-content link that becomes visible on focus.
- Preserve the mobile menu, but use a tighter tablet breakpoint strategy: keep the full nav through a width where it remains readable, then transition to the menu.
- Persist theme choice and fall back to `prefers-color-scheme` on first visit.

Acceptance criteria:

- A recruiter can identify role focus in under two seconds from the hero.
- At 375 × 667, the first screen is composed rather than dominated by unfinished hero whitespace.
- Keyboard users can skip navigation and see a clear focus indicator.

### Phase 2 — Project chapters with tangible proof

Priority: P1 / highest visual return  
Likely files: [src/App.tsx](./src/App.tsx), [src/index.css](./src/index.css), `public/` approved assets, possibly a new `src/components/ProjectChapter.tsx`  
Complexity: medium

Replace the current abstract-only project visuals with editorial chapters that each have one visual thesis.

#### E-CARGO Knowledge Agent

Recommended composition:

- Dark or near-black chapter background.
- Left or upper copy: project name, one-sentence purpose, verified implementation technologies.
- Main visual: an approved screenshot of document ingestion/retrieval, a redacted evidence view, or a real architecture diagram showing document → chunking/embedding → vector retrieval → grounded answer.
- A small caption that clearly identifies the visual as an implementation or architecture artifact.
- Three proof labels only: `evidence retrieval`, `source-grounded response`, `FastAPI + PostgreSQL/pgvector`.
- Keep technical notes expandable below the main visual.

Do not show a fake chat transcript or claim production readiness.

#### E-CARGO Research & Optimization

Recommended composition:

- Off-white or silver chapter background.
- Use a real, approved research figure, role-assignment visualization, or optimization output if available.
- If no figure can be safely published, refine the current orbital diagram into a clearly labeled `original conceptual diagram` with a short legend explaining roles, constraints, and scheduling.
- Link to the appropriate published research record where it is genuinely relevant; do not imply the project itself has a public repository if it does not.

#### Component structure

Extract a reusable `ProjectChapter` component with typed props:

- `title`
- `eyebrow`
- `description`
- `details`
- `technologies`
- `visual`
- `visualAlt`
- optional `href` only when a verified technical URL exists

Acceptance criteria:

- Each featured project has a primary visual that demonstrates a real system or clearly declares itself conceptual.
- The first project visual occupies enough area to feel like a product case study, not a card illustration.
- Mobile stacks copy and visual intentionally, with visual captions remaining legible.

### Phase 3 — Experience proof hierarchy

Priority: P1  
Likely files: [src/App.tsx](./src/App.tsx), [src/data/portfolio.ts](./src/data/portfolio.ts), [src/index.css](./src/index.css)  
Complexity: low

- Keep the editorial timeline rather than returning to cards.
- Add one verified outcome to each default row:
  - Nipissing University: constraint-based assignment workflows and reduced redundant API/database work through caching and batching.
  - Climind: approximately 92% heart-rate estimation accuracy or below 150ms inference latency.
  - iDriveCareer: approximately 95% less manual collection or approximately 25% higher throughput.
- Keep the remaining implementation details in `details`.
- Use the technology line as a quiet metadata footer, not a primary visual element.
- Consider a compact “outcome” label in blue so results scan before the long description.

Acceptance criteria:

- Every role communicates role, organization, period, one outcome, and one technical area without expanding anything.
- No metric is rounded upward or detached from its verified “approximately” qualifier.

### Phase 4 — Research and skills as proof, not inventory

Priority: P2  
Likely files: [src/App.tsx](./src/App.tsx), [src/data/portfolio.ts](./src/data/portfolio.ts), [src/index.css](./src/index.css)  
Complexity: low to medium

#### Research

- Keep the published/ongoing status distinction.
- Display a shorter editorial title, then the complete title in supporting metadata or an accessible expanded view.
- Use a publication row with year, venue, status, and DBLP link aligned consistently.
- Add a single sentence connecting the research to engineering practice: modeling, constraints, experiments, and explainable decisions.

#### Skills

- Keep typographic groupings and avoid badge grids.
- Add a small “primary strengths” line containing only verified high-signal areas: Java/Spring Boot, Python, RESTful services, PostgreSQL/MongoDB, Kafka, Docker, AWS/Azure, AI/LLM integration.
- Keep the complete skill inventory below for detailed scanning.

Acceptance criteria:

- A recruiter can distinguish published work from ongoing research without reading paragraph copy.
- Skills communicate focus before breadth.

### Phase 5 — Motion and interaction polish

Priority: P2  
Likely files: [src/App.tsx](./src/App.tsx), [src/index.css](./src/index.css)  
Complexity: medium

Use motion to explain the story, not to decorate it:

- Hero text: one subtle entrance sequence, no repeated drift on reload.
- Project visuals: gentle image scale or diagram-state transition on entry.
- Experience rows: opacity/translate reveal only once, with no layout shift.
- Navigation: active-section underline or opacity transition.
- Details: keep native disclosure behavior; add a restrained height/opacity transition only if it remains accessible.
- Respect `prefers-reduced-motion` by disabling transforms and scroll-linked motion.

Avoid:

- perpetual parallax;
- large JS animation libraries for simple transitions;
- auto-playing audio/video;
- motion that delays access to content.

Acceptance criteria:

- No content is hidden from users who disable motion.
- No major element shifts after first paint.
- Project motion adds comprehension rather than a generic “reveal everything” effect.

### Phase 6 — Metadata, accessibility, and deployment documentation

Priority: P2  
Likely files: [index.html](./index.html), [public/site.webmanifest](./public/site.webmanifest), [src/index.css](./src/index.css), [README.md](./README.md)  
Complexity: low

- Update `theme-color` and manifest background/theme colors to match the current light-first palette.
- Add a lightweight, approved social preview asset and `og:image`, `og:image:alt`, `twitter:card`, and `twitter:image`.
- Consider JSON-LD `Person` and `WebSite` data using only public information already approved for the site.
- Add skip link, explicit `:focus-visible` styles, and active navigation semantics.
- Verify muted text and blue labels with a contrast analyzer on white, off-white, charcoal, and dark-mode surfaces.
- Align [README.md](./README.md) with the actual Wrangler/Workers static-assets deployment configured in [wrangler.jsonc](./wrangler.jsonc), or intentionally migrate the deployment and update both files together.
- Pin direct dependency versions instead of relying on `latest` ranges for future reproducibility.

Acceptance criteria:

- Social sharing produces a deliberate preview.
- Browser chrome, manifest, and page palette agree.
- Keyboard focus is visibly obvious and the first Tab can reach a skip link.
- Deployment instructions describe the path that actually ships the site.

## Recommended visual system

### Typography

- Keep Inter/system fallback or introduce Geist only if the license and loading cost are clear.
- Hero display: `clamp(3.25rem, 8vw, 8.5rem)`, line-height around `.9`, with a max width that avoids overly long lines.
- Section titles: `clamp(2.5rem, 5vw, 5.5rem)`.
- Body: 17–20px desktop, 16–18px mobile, line-height 1.55–1.75.
- Metadata: 11–13px with restrained letter spacing; do not use uppercase for long prose.
- Keep display and body letter-spacing differences intentional; avoid applying the same negative tracking to every heading.

### Color and backgrounds

Use the existing approved palette as tokens:

- white `#FFFFFF` for hero and primary reading surfaces;
- off-white `#F5F5F7` for structural bands;
- silver `#D2D2D7` for dividers and low-emphasis detail;
- charcoal `#1D1D1F` for the project/Contact anchor chapters;
- blue `#0071E3` only for links, status, and selected emphasis.

Do not add gradients to solve a lack of imagery. Use a real artifact or a deliberately labeled conceptual diagram.

### Spacing and composition

- Desktop content max width: approximately 1280–1440px with 64–80px outer gutters.
- Chapter top/bottom padding: 128–176px desktop, 80–112px mobile.
- Use one primary alignment axis per chapter.
- Prefer full-bleed project visuals with a restrained copy column over nested panels.
- Keep one or two rules per chapter; do not turn every row into a bordered box.

## Suggested implementation order

1. Approve or reject public project visual assets.
2. Update hero identity line and mobile hero spacing.
3. Promote verified experience outcomes.
4. Implement typed `ProjectChapter` and replace project visuals.
5. Refine research title/status rows and primary skill emphasis.
6. Add skip link, focus styles, active navigation, and theme persistence.
7. Correct metadata/manifest/social preview.
8. Extract components from [src/App.tsx](./src/App.tsx) where the new visual states justify it.
9. Run typecheck, lint, build, responsive browser QA, keyboard QA, and a performance trace/Lighthouse audit.
10. Deploy only after the new live page matches the approved captures.

## Definition of done

- The hero states the role focus without losing its editorial character.
- E-CARGO Knowledge Agent has a genuine, approved, high-quality primary visual.
- The first screen of every requested viewport is intentionally composed.
- One measurable outcome is visible for each role by default.
- Published papers, ongoing research, and future assistant scope remain accurately labeled.
- Skip link, focus-visible states, active navigation, theme persistence, and social metadata are complete.
- The site remains static and independent from the E-CARGO Knowledge Agent runtime.
- `npm run typecheck`, `npm run lint`, `npm run build`, responsive browser QA, and performance measurements pass before deployment.

## Phase 2 completion checklist

- [x] Hero identity and mobile first-screen spacing updated.
- [x] Verified experience outcomes promoted above the disclosures.
- [x] E-CARGO Knowledge Agent and E-CARGO optimization visuals replaced with implementation-grounded SVG diagrams.
- [x] Featured research code linked to the public `NPRProblem` repository.
- [x] Selected projects curated from the public `Tommy-Gong` repositories with conservative collaboration notes.
- [x] Both GitHub accounts reviewed; no unverified project added from the empty `TommyKeGong/RedNoteSkillCodeX` repository.
- [x] Social metadata, manifest, skip link, keyboard focus, active navigation, and theme persistence added.
- [x] Complete local and production browser QA, then deploy the verified build.

The updated build was deployed through the existing Wrangler workflow and verified at `https://kegong.dev/` and `https://www.kegong.dev/`. A full Lighthouse trace and persisted per-viewport screenshot set remain follow-up items because the current browser automation surface did not expose them reliably.
