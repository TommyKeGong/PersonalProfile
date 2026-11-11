# Website audit: kegong.dev

Audit date: 2026-11-10  
Audited URL: [https://kegong.dev](https://kegong.dev)  
Scope: live rendered site, repository implementation, and deployment metadata  
Constraint: audit only; no application code, DNS, Cloudflare settings, E-CARGO runtime, or deployment was changed.

## Executive verdict

The current site is a competent, responsive portfolio and is materially more refined than a generic card-based developer template. It has a clear content structure, restrained palette, large typography, full-width project chapters, and a working future-assistant boundary.

It does not yet meet the standard of an Apple-inspired premium technology product page. The main gap is not broken functionality; it is presentation depth. Apple’s product pages make the object being presented feel tangible through real product imagery, cinematic composition, and a carefully sequenced narrative. The portfolio currently relies on abstract CSS diagrams, repeated text-and-rule layouts, and closed disclosure panels. That makes it feel like a polished portfolio system rather than a premium technology presentation.

Overall weighted score: **7.4 / 10**.

The highest-return next step is to make the projects feel like real engineering artifacts: use approved screenshots, architecture diagrams, or data visualizations; surface verified outcomes in the primary composition; and choreograph each project as a short visual story rather than a text block beside an abstract graphic.

## Evidence and capture references

Browser automation was available and the live URL was inspected directly. The integrated browser captured the homepage at all requested viewports and captured the major sections at 1440 × 900. The screenshot tool did not persist image files into the repository, so the references below identify the live URL, viewport, and section captured rather than pretending that local screenshot files exist.

### Homepage captures

| Reference | Viewport | What was captured | Result |
| --- | ---: | --- | --- |
| H1 | 1440 × 900 | Homepage at scroll position 0 | No horizontal overflow; desktop navigation visible; hero headline is the focal point. |
| H2 | 1280 × 800 | Homepage at scroll position 0 | No horizontal overflow; same composition with a shorter hero crop. |
| H3 | 768 × 1024 | Homepage at scroll position 0 | No horizontal overflow; tablet uses the mobile navigation control. |
| H4 | 390 × 844 | Homepage at scroll position 0 | No horizontal overflow; large hero remains readable but extends beyond one screen. |
| H5 | 375 × 667 | Homepage at scroll position 0 | No horizontal overflow; hero height is approximately 939px, so the first screen shows only part of the hero narrative. |

### Major-section captures

At 1440 × 900, the browser captured the hero, About, Experience, Projects, Research, Skills, future AI assistant, Contact, and Footer sections from the live site. The live reference for all captures is [https://kegong.dev](https://kegong.dev).

### Measured responsive geometry

| Viewport | `scrollWidth` | Horizontal overflow | Hero height | H1 top / height |
| ---: | ---: | --- | ---: | ---: |
| 1440 × 900 | 1425 | No | 834px | 232px / 252px |
| 1280 × 800 | 1265 | No | 801px | 233px / 224px |
| 768 × 1024 | 753 | No | 740px | 233px / 134px |
| 390 × 844 | 375 | No | 910px | 200px / 212px |
| 375 × 667 | 360 | No | 939px | 201px / 212px |

The reduced `scrollWidth` values reflect the browser scrollbar gutter; none exceeded the viewport width.

## Apple design-language comparison

Apple’s current [homepage](https://www.apple.com/) and [MacBook Air product page](https://www.apple.com/macbook-air/) establish a product-first pattern: a very small navigation system, a short product statement, large supporting imagery, and many full-width chapters that each demonstrate one specific property. The MacBook Air page also uses real product imagery and repeated visual demonstrations rather than asking the visitor to infer the product from text.

The current portfolio adopts some of the same surface principles:

- large, confident type using responsive `clamp()` values;
- restrained white, off-white, charcoal, silver, and blue palette;
- slim translucent navigation after scrolling;
- large section spacing and full-width project chapters;
- short labels and concise supporting copy;
- restrained reveal motion with a reduced-motion fallback.

The comparison breaks down in four areas:

1. **Tangible visual subject**: Apple shows the object. This site shows an abstract retrieval flow and orbital diagram. They are relevant, but they do not provide the same confidence as an approved screenshot of the E-CARGO interface, a real architecture diagram, or an actual research visualization.
2. **Narrative progression**: Apple changes the visual grammar from chapter to chapter. This site repeats a heading, rule, text block, and list pattern across About, Experience, Research, and Skills.
3. **Proof hierarchy**: Apple places the important product capability in the main presentation. Here, most measurable outcomes are behind native `details` elements, so the recruiter-facing scan can miss the strongest evidence.
4. **Interaction depth**: The site has reveal transitions, smooth anchors, theme switching, and disclosures, but no project-specific media behavior, progressive diagrams, or meaningful scroll-linked demonstration.

Conclusion: the site is **inspired by the vocabulary** of premium product sites, but it is not yet **at the quality bar** of a premium product presentation.

## Section-by-section visual review

### Navigation

Strengths:

- Compact desktop navigation with clear section anchors.
- Mobile menu is available below the `lg` breakpoint and closes after a selection.
- Theme control is keyboard reachable and has an accessible name.

Problems:

- The navigation becomes a mobile menu at 768px even though a tablet landscape viewport has enough room for a compact horizontal navigation. This is not broken, but it makes the tablet presentation feel more like a collapsed mobile layout than an intentionally designed intermediate layout.
- There is no explicit active-section treatment or `aria-current` state while scrolling.
- The theme choice is not persisted; reload returns to light mode because `isDark` initializes to `false` in [App.tsx](./src/App.tsx).

### Hero

Strengths:

- The headline is the clearest focal point and uses a suitably large responsive scale.
- The two-line composition is readable at all requested widths.
- The lower metadata row gives the page a sense of authorship and location without exposing private information.

Problems:

- “Building intelligent digital experiences.” is visually strong but generic. It does not state the verified professional headline, “Software Engineer | AI/ML & Data Engineering,” with enough prominence for a recruiter’s first glance.
- The hero has no distinctive visual object. At 1440px it is mostly type, whitespace, and small metadata; that feels elegant but not “stunning” or product-launch quality.
- On 375 × 667 the hero is approximately 939px tall. This is not overflow, but it means the first screen does not finish the introductory composition.

### About

The editorial statement and three fact columns are clean and readable. The section is one of the more successful parts of the page. It still uses a familiar text-and-rule structure and could gain personality from one restrained academic/research visual, such as a typographic degree timeline or a single annotated model graphic.

### Experience

The timeline is substantially better than stacked cards. It is scannable, uses clear role/company hierarchy, and the details disclosure prevents the page from becoming a resume wall.

The main weakness is proof visibility. Verified metrics such as approximately 92% heart-rate estimation accuracy, approximately 30% lower latency, below 150ms inference latency, approximately 95% less manual collection, approximately 25% higher throughput, and approximately 99.5% data integrity are not visible until the visitor expands details. The primary rows should expose one verified result per role, with the remaining bullets in the disclosure.

### Projects

The full-width chapters are directionally correct and avoid a generic project-card grid. The E-CARGO Knowledge Agent receives the most visual emphasis and its technology list is accurate.

The visual areas are the largest quality gap. The “PDF / retrieve / rank / respond” diagram and the orbital E-CARGO diagram are original and grounded in the project descriptions, but they read as abstract decorative graphics. They do not show a real interface, retrieval evidence, citation behavior, pipeline state, optimization output, or research result. No project link to a public technical artifact is present; the “Read technical notes” control is an expandable disclosure, not a technical-details URL.

### Research / publications

The section correctly distinguishes two published conference papers from ongoing research. Bibliographic links point to DBLP and are presented as records rather than falsely claiming unpublished work is accepted. This is a content strength.

The paper titles are long and visually heavy. On mobile they create dense reading blocks. A shorter display title plus a metadata line containing the full title would improve scanability without changing the underlying facts.

### Skills

The typographic grouping is a good choice and avoids colorful badges. The section is accurate and restrained. It is still a long list, so a recruiter can benefit from a first row of “primary strengths” before the complete verified inventory.

### Future AI Assistant

The section clearly states that the assistant is coming soon, independent, and not connected. It does not imply that a backend exists. The typography and line-based treatment fit the redesign better than a fake chat widget would.

The section could more explicitly say “public portfolio content only” in the main sentence, rather than leaving that boundary in a lower metadata row. The source contract in [docs/ai-assistant-contract.md](./docs/ai-assistant-contract.md) is otherwise aligned with the requested architecture.

### Contact and footer

The dark contact chapter creates a clear ending and the public email, GitHub, and LinkedIn links are present. The LinkedIn link uses a bot icon in [App.tsx](./src/App.tsx), which is semantically mismatched and should use a professional/network icon or no icon. The footer is functional but minimal; it could include a small availability/location line without adding clutter.

## Functional testing

Tested against the live URL without submitting forms or activating external side effects:

| Test | Result | Evidence |
| --- | --- | --- |
| Desktop anchor links | Pass | All in-page href targets resolved to existing IDs. Projects reached `scrollY ≈ 3179` with target top at 0 after the smooth scroll settled. |
| Mobile navigation | Pass | At 390px, menu opened with About, Experience, Projects, Research, Contact; selecting Contact closed the menu and reached the Contact section. |
| Theme switching | Pass | Button toggled the `dark` class and changed its accessible label to “Switch to light mode”. |
| Experience disclosures | Pass | Native `details` opened from the first Summary control. |
| Contact links | Pass, not followed | `mailto:gongketommy@gmail.com`, GitHub, and LinkedIn hrefs are present and match the verified public details. |
| Project/research links | Partial | GitHub profile and DBLP links are present; project “technical notes” are disclosures rather than external technical-detail links. External destinations were not opened during the interaction run. |
| Keyboard navigation | Pass with caveat | Tab reached the logo, theme button, contact link, menu button, hero link, and disclosure controls. The browser supplied `outline: auto`; no explicit custom `:focus-visible` treatment is defined. |
| Responsive layout | Pass | No horizontal overflow at 1440, 1280, 768, 390, or 375px. |
| Broken images/assets | Pass | The live DOM contains no raster `<img>` elements, so no broken image request was observed. Inline Lucide SVGs render as controls/icons. |
| Console/runtime errors | Pass in this run | No console errors or page errors were observed during reload and interaction testing. |

## Content and privacy audit

The displayed content is consistent with the verified portfolio brief:

- Ke Gong, Scarborough, Ontario, Canada, and the public email/GitHub/LinkedIn links are shown.
- The University of Toronto B.Sc. and Nipissing University M.Sc. are represented.
- The three internships, organizations, locations, and dates are represented.
- The two DBLP-linked papers are explicitly labeled published conference papers.
- Ongoing research is labeled ongoing rather than accepted or published.
- E-CARGO Knowledge Agent is described as a source-grounded technical project without claiming production readiness.
- No telephone number, residential address, postal code, immigration information, work permit date, demographic information, credentials, or private research documents were found in the inspected source tree.
- A repository search found no placeholder, Lorem ipsum, TODO, fake, or sample copy.

Recruiter communication is good but not optimal. The current page communicates breadth across software, backend, AI/ML, data, and research; it does not surface enough quantified evidence in the default scan. The primary headline is also less specific than the verified professional headline.

## Technical audit

### Implementation

- Framework: React + TypeScript + Vite, configured in [vite.config.ts](./vite.config.ts).
- Component structure: the page is a single composition in [App.tsx](./src/App.tsx), with the future assistant isolated in [AIChatTeaser.tsx](./src/features/ai-assistant/AIChatTeaser.tsx). For the current small site this is workable; for further iteration, section components should be extracted so visual chapters can evolve independently.
- Styling: [index.css](./src/index.css) contains the custom design system plus Tailwind utility usage in JSX. The CSS is readable but dense and globally named; it will become harder to maintain as motion and project-specific visual states grow.
- Responsive behavior: explicit breakpoints at 640px and 768px, with Tailwind layout utilities. Measured overflow is clean at all requested widths.
- Rendering cost: no images, video, font files, or large data requests are loaded. The application is static and has no backend dependency.
- Bundle observation: the live browser reported an encoded JavaScript resource of approximately 78KB and CSS of approximately 5.9KB in this run. These are modest for a static React site, though the browser’s transfer-size values were cache-influenced.

### Accessibility

Positive signals:

- `html lang="en"` is present.
- Semantic `main`, `nav`, `section`, `article`, `aside`, and `footer` landmarks are used.
- The page has one H1 followed by section H2s and content H3s.
- Theme and menu buttons have accessible labels; the mobile menu button exposes `aria-expanded`.
- Native `details/summary` controls are keyboard reachable.
- Reduced motion is covered in [index.css](./src/index.css) with `prefers-reduced-motion`.

Gaps:

- No skip-to-content link was observed.
- No explicit `:focus-visible` style was defined; the audit relied on the browser’s default outline.
- No active navigation state or `aria-current` is exposed while scrolling.
- Contrast was not measured with a dedicated accessibility analyzer; muted text and blue labels should be checked against both white and off-white backgrounds before further palette changes.

### SEO and metadata

Present:

- `lang`, viewport, title, description, canonical URL, Open Graph title/description/type/url, `robots.txt`, sitemap, favicon, and web manifest.

Missing or stale:

- No `og:image` or Twitter card metadata is present, so shared links will have a weak or generic preview.
- [index.html](./index.html) sets `theme-color` to the previous dark palette `#101827`, while the redesign is light-first and uses `#ffffff`, `#f5f5f7`, `#1d1d1f`, and `#0071e3`.
- [public/site.webmanifest](./public/site.webmanifest) also retains the previous dark background/theme colors.
- No JSON-LD Person or WebSite structured data is present. This is not required for correctness, but it would improve machine-readable identity and professional discovery.

### Deployment

[wrangler.jsonc](./wrangler.jsonc) deploys static assets from `dist` as the `ke-gong-portfolio` Worker with observability enabled. The live custom domains returned HTTP 200 during the audit. The repository README still describes a Cloudflare Pages Git-connected workflow, while the actual deployment configuration is Wrangler/Workers static assets. That documentation drift should be resolved for operational clarity; it is not a live outage.

## Performance measurements and limitations

A browser navigation timing check on the live site reported:

| Metric | Measured value | Interpretation |
| --- | ---: | --- |
| Response start | 23ms | Very fast in this browser/network run. |
| DOMContentLoaded | 71ms | Fast for this static page. |
| Load event | 73ms | Fast; no image/font waterfall was observed. |
| First Contentful Paint | 116ms | Excellent in this warm integrated-browser run. |
| LCP | Not collected | No buffered LCP entry was exposed by this harness. |
| INP | Not measured | Requires field interaction aggregation or a dedicated performance tool. |
| CLS | Not measured | Requires a trace or layout-shift observer over the page lifecycle. |

These are lab-like, single-run measurements, not field data. [web.dev’s Web Vitals guidance](https://web.dev/articles/vitals) recommends evaluating LCP, INP, and CLS at the 75th percentile; its good thresholds are LCP ≤ 2.5s, INP ≤ 200ms, and CLS ≤ 0.1. No Lighthouse or Chrome DevTools performance-trace MCP was available in this session, so the audit does not claim passing Core Web Vitals.

Measured performance is currently a strength. The main performance risk is future media: adding large project screenshots, video, or scroll-linked effects without responsive sizing, lazy loading, and reduced-motion handling could erase the current advantage.

## Future RAG readiness

The frontend is structurally ready for a separate service without a major rewrite:

- [src/types/aiAssistant.ts](./src/types/aiAssistant.ts) defines request, response, citation, and enabled/configuration interfaces.
- [docs/ai-assistant-contract.md](./docs/ai-assistant-contract.md) reserves independent FastAPI `/api/health` and `/api/chat` endpoints.
- The current site is static and does not connect to the E-CARGO database, runtime, credentials, or backend.
- The public UI is disabled and explicitly marked “coming soon”.

Readiness score is high because the boundary exists. Integration quality will depend on later choices that were not implemented or testable now: API error states, citation validation, streaming behavior, conversation reset, rate limiting, abuse handling, and privacy review for ingestion.

## Objective scores

| Category | Score | Reason |
| --- | ---: | --- |
| Overall visual design | 7.1 | Coherent and polished, but still visually repetitive and abstract. |
| Apple-inspired design quality | 6.4 | Surface vocabulary is present; product-story depth and media quality are not. |
| Typography | 8.0 | Strong scale, readable line lengths, good responsive sizing. |
| Layout and whitespace | 7.4 | Generous and aligned, with some long repetitive sequences. |
| Mobile responsiveness | 7.3 | No overflow and usable controls; first-screen composition is tall and tablet feels collapsed. |
| User experience | 7.4 | Anchors, disclosures, theme, and menu work; content proof is hidden too deeply. |
| Content and professionalism | 8.0 | Verified, privacy-safe, and honest; headline and metric visibility can improve. |
| Accessibility | 7.0 | Good semantics and keyboard reachability; missing skip link, focus styling, active state, and contrast measurement. |
| Performance | 8.8 | Static, image-free, fast measured FCP and small observed resources; full CWV not measured. |
| Future RAG readiness | 8.5 | Clear independent contract and disabled feature boundary. |

Weighted overall calculation: visual design 20%, Apple-inspired quality 15%, typography 10%, layout 10%, mobile 10%, UX 10%, content 10%, accessibility 8%, performance 4%, and RAG readiness 3%. This weights the user’s visual objective most heavily while still reserving meaningful weight for correctness, usability, and architecture. The weighted result is **7.4 / 10**.

## Prioritized findings

### P0 — Critical

**None found.** No broken deployment, runtime error, security exposure, or critical navigation failure was observed.

### P1 — High

#### P1-01 — Project presentation is not visually tangible enough

1. **Problem:** The largest project sections use abstract CSS diagrams instead of a real interface, architecture artifact, evidence excerpt, or research visualization.
2. **Evidence:** Live Projects section capture at 1440 × 900; project visual implementation in [App.tsx](./src/App.tsx) and [index.css](./src/index.css).
3. **Why it matters:** The site asks employers to trust that sophisticated systems exist without showing what was built. This is the largest gap against Apple’s product-page standard.
4. **Recommended fix:** Add one approved, compressed artifact per featured project: a redacted UI screenshot, a real architecture diagram, a retrieval evidence view, or a genuine optimization output. Keep the abstract CSS graphics as fallback or supporting motifs, not as the primary proof.
5. **Expected benefit:** Higher perceived authenticity, stronger project comprehension, and a more premium visual identity.
6. **Complexity:** Medium. Asset selection and redaction are the main uncertainty; component changes are moderate.

#### P1-02 — The hero is visually strong but professionally underspecified

1. **Problem:** The main headline is “Building intelligent digital experiences.” and the verified professional headline is not shown as the primary identity statement.
2. **Evidence:** Live hero capture; H1 in [App.tsx](./src/App.tsx).
3. **Why it matters:** Recruiters should know the candidate’s target role before reading the rest of the page. The current phrase could describe a designer, product engineer, or agency.
4. **Recommended fix:** Keep the expressive headline, but add a small, high-contrast identity line such as “Software Engineer · AI/ML & Data Engineering” immediately above or below it, with the current location as secondary metadata.
5. **Expected benefit:** Faster role recognition without sacrificing the premium hero composition.
6. **Complexity:** Low.

#### P1-03 — The strongest verified results are hidden behind disclosures

1. **Problem:** Default experience rows show role summaries and technology names, while the most persuasive metrics are inside closed `details` panels.
2. **Evidence:** Live Experience capture; [App.tsx](./src/App.tsx) renders `details`; verified content is stored in [portfolio.ts](./src/data/portfolio.ts).
3. **Why it matters:** The page is optimized for browsing but not for a recruiter’s 10-second scan. The measurable outcomes are the most credible evidence of practical engineering.
4. **Recommended fix:** Promote one quantified outcome per role into the default row. Leave the additional technical bullets in the disclosure.
5. **Expected benefit:** Stronger hiring signal and better alignment with the stated job-seeking objective.
6. **Complexity:** Low.

### P2 — Medium

#### P2-01 — Mobile hero consumes more than one viewport

1. **Problem:** At 375 × 667 the hero is approximately 939px tall; at 390 × 844 it is approximately 910px tall.
2. **Evidence:** Measured live geometry table above.
3. **Why it matters:** The page is not broken, but the first screen does not complete the introduction, making the mobile landing experience feel slower than the desktop one.
4. **Recommended fix:** Reduce hero vertical padding on small screens, move the metadata row below the first section, or use a tighter mobile-only composition while preserving the type scale.
5. **Expected benefit:** More of the primary value proposition appears immediately on mobile.
6. **Complexity:** Low.

#### P2-02 — Theme metadata is stale after the redesign

1. **Problem:** HTML and manifest theme colors remain `#101827`, the old dark palette.
2. **Evidence:** [index.html](./index.html) and [site.webmanifest](./public/site.webmanifest).
3. **Why it matters:** Browser chrome and install prompts can show the wrong color, creating a visible mismatch with the light-first design.
4. **Recommended fix:** Set theme/background colors to the current palette or implement a deliberate light/dark metadata strategy.
5. **Expected benefit:** More coherent browser-level branding.
6. **Complexity:** Low.

#### P2-03 — Social preview metadata is incomplete

1. **Problem:** `og:image`, `twitter:card`, and a social preview asset are missing.
2. **Evidence:** [index.html](./index.html) contains title/description/type/url only.
3. **Why it matters:** Shared links will not communicate the premium visual identity and may render a generic preview.
4. **Recommended fix:** Create one lightweight approved social card and add `og:image`, `og:image:alt`, `twitter:card`, and `twitter:image`.
5. **Expected benefit:** Better recruiter and hiring-manager previews when the URL is shared.
6. **Complexity:** Low to medium.

#### P2-04 — Accessibility polish is incomplete

1. **Problem:** There is no skip link, no explicit focus-visible style, and no active navigation state.
2. **Evidence:** Keyboard testing reached controls using browser default outlines; no custom focus rule appears in [index.css](./src/index.css).
3. **Why it matters:** Default outlines vary by browser and active section context is valuable for long pages.
4. **Recommended fix:** Add a skip link, explicit high-contrast `:focus-visible` styles, and a scroll-aware active-section indicator with `aria-current`.
5. **Expected benefit:** Better keyboard orientation and stronger WCAG robustness.
6. **Complexity:** Low to medium.

#### P2-05 — Deployment documentation does not match the actual deployment path

1. **Problem:** README describes Cloudflare Pages, while [wrangler.jsonc](./wrangler.jsonc) is the actual static-assets Worker configuration.
2. **Evidence:** [README.md](./README.md) versus [wrangler.jsonc](./wrangler.jsonc).
3. **Why it matters:** Future maintenance could follow the wrong deployment instructions or assume a Git-connected Pages project exists.
4. **Recommended fix:** Document the actual Wrangler/Workers static-assets path and custom-domain ownership clearly, or intentionally migrate and document Pages.
5. **Expected benefit:** Lower operational risk.
6. **Complexity:** Low.

#### P2-06 — Theme choice is not retained

1. **Problem:** Theme toggling works but resets on reload and does not honor the operating-system preference.
2. **Evidence:** `useState(false)` and class toggling in [App.tsx](./src/App.tsx); interaction test confirmed the toggle but did not find persistence.
3. **Why it matters:** A user who chooses dark mode must repeat the choice on each visit.
4. **Recommended fix:** Initialize from `localStorage` with a `prefers-color-scheme` fallback, and persist future changes.
5. **Expected benefit:** More predictable, polished interaction.
6. **Complexity:** Low.

### P3 — Low

#### P3-01 — LinkedIn icon is semantically mismatched

The LinkedIn contact link uses a bot icon in [App.tsx](./src/App.tsx). Use a professional/network icon or omit the icon. Complexity: low.

#### P3-02 — Dependency ranges are broad

[package.json](./package.json) uses `latest` for most direct dependencies, although the lockfile pins the current install. This is a reproducibility risk for future installs, not a current runtime defect. Complexity: low.

#### P3-03 — Component boundaries will become strained as visual storytelling grows

The entire site composition is in [App.tsx](./src/App.tsx). It is acceptable at the current size, but project chapters, navigation, and section content should be extracted before adding richer media, scroll states, or A/B variants. Complexity: medium.

## Five most serious problems

1. Featured projects do not show tangible, genuine engineering artifacts.
2. The hero does not state the target professional identity precisely enough.
3. Quantified achievements are hidden behind closed disclosures.
4. Mobile’s first screen is vertically overextended.
5. SEO/social metadata and theme metadata are incomplete or stale.

## Five highest-impact improvements

1. Replace abstract project-only visuals with approved real screenshots, diagrams, or research outputs.
2. Add the verified role headline to the hero without weakening the editorial headline.
3. Promote one verified metric per experience row into the default scan.
4. Add social preview metadata and correct theme/manifest colors.
5. Add skip/focus/active-section accessibility polish and persist theme preference.

## Testing limitations

- No Lighthouse or Chrome DevTools performance trace was available, so LCP, INP, CLS, TBT, and a formal performance score were not collected.
- Browser timing measurements are single-run, warm/cached lab observations, not field data.
- External GitHub, LinkedIn, email, and DBLP destinations were inspected as hrefs but not opened during the functional run.
- Contrast was not measured with a dedicated automated analyzer.
- No physical touch-device testing was performed; mobile was emulated through browser viewport sizes.
- The screenshot tool captured browser views but did not persist image files into the repository; this document therefore uses live URL/viewport references.

## Phase 2 implementation follow-up

The Phase 2 implementation addressed the highest-impact findings without changing the independent future-assistant boundary:

- Added a precise hero identity line for Ke Gong and two restrained first-screen actions.
- Promoted one verified achievement into each experience row while retaining expandable technical details.
- Replaced the abstract E-CARGO CSS illustrations with original SVG diagrams grounded in the verified implementation: PDF ingestion, PyMuPDF, chunking, Sentence Transformers, PostgreSQL/pgvector, semantic retrieval, LLM integration, and citation validation for the Knowledge Agent; agents, roles, K-Means, Genetic Algorithm, GMRA, constraints, and repository-reported experiment notes for the optimization research.
- Added a featured research-code link and a compact Selected Projects section for ML, data engineering, and full-stack work.
- Reviewed both public GitHub accounts. `Tommy-Gong` supplied the selected public repositories. `TommyKeGong/RedNoteSkillCodeX` was inspected but excluded because GitHub reports it as empty.
- Added skip navigation, visible keyboard focus styles, active section navigation, accessible mobile-nav controls, and persisted theme preference.
- Added canonical, Open Graph, Twitter Card, JSON-LD, manifest, theme-color, and an original `public/social-card.svg` asset.

The original audit score remains the baseline. A post-implementation score should be recalculated after the live deployment and viewport captures; local QA must still confirm that the new diagrams remain legible at 375px and 390px widths.

## Phase 2 verification

- `npm run typecheck`: passed.
- `npm run lint`: passed.
- `npm run build`: passed; Vite emitted approximately 79 KB gzip for the main JavaScript bundle and 6.5 KB gzip for CSS.
- Local rendered browser inspection: the hero identity, visible experience outcomes, accurate E-CARGO diagrams, selected repositories, future-assistant boundary, and contact links were present in the accessibility snapshot.
- Live deployment: `https://kegong.dev/` and `https://www.kegong.dev/` returned HTTP 200 after Wrangler deployment version `4651f2e8-2aad-4e2b-b355-488c61ce7a56`.
- Live asset checks: `/social-card.svg` and `/site.webmanifest` returned HTTP 200; the homepage included canonical, Open Graph, Twitter Card, and updated content markers.
- A screenshot capture was requested for the deployed homepage. The browser automation environment did not expose a reliable persisted image file or a second section capture, so this document does not claim pixel-level screenshot evidence for every viewport.
