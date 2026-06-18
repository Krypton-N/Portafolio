# Redesign Master Plan — Living Document

> **Purpose:** single source of truth for the full portfolio redesign. Tracks what is done, what is in progress, and what comes next, so no context is lost between sessions.
>
> **Companion docs:**
> - `docs/VisualSystem.md` — approved design system (typography, tokens, shader spec, 5-act wireframes)
> - `docs/ProjectCard.md` — card system reference
>
> **Last updated:** 2026-06-13 (Phase 2 — 2.1–2.5 done; 2.6 Lighthouse audit is the last step)

---

## Approved decisions (binding)

| Decision | Value |
|---|---|
| Creative direction | **Tensor Field + Research Log** with Inference modules. The WebGL field is the visual *protagonist*, not a background. Reference bar: vectrfl.com (Utsubo) |
| Quality rule | One effect perfectly polished > more effects |
| Language | **English only**, no toggle. Spanish copy was the draft |
| Typography | **Option B:** Space Grotesk (display, ≥30px only) + Inter (body) + JetBrains Mono (all metadata/metrics). Self-hosted woff2 |
| JS budget | `motion` ~30KB + `lenis` ~5KB + raw WebGL/`ogl` shader ~15KB |
| Performance gate | Lighthouse Performance **≥90 desktop / ≥75 mobile**; static elegant fallback for `prefers-reduced-motion`, no-WebGL2, and low-end devices |
| RAG demo ("Ask my portfolio") | Approved but **last phase only**. Until then: lazy-load boundary + opt-in UI slot in Act 3, nothing more |
| Deferred | "Latent Space" 3D concept (future evolution); route/anchor renaming to English (during Home re-architecture) |

---

## Phase 0 — Quick Wins ✅ DONE (2026-06-11)

- [x] **Images → WebP** — 36 images converted via `scripts/optimize-images.mjs` (sharp). 93.7 MB → 5.4 MB (−94.3%). Covers now 38–61 KB. Originals deleted (recoverable via git).
- [x] **Bundle fix (bonus)** — removed `import * as Icons from 'lucide-react'` in `ProjectCard.jsx`; replaced with curated `COVER_ICONS` map (14 icons). JS bundle: 960 KB → 384 KB (111 KB gzip).
- [x] **Bug fixes**
  - [x] Footer mailto had literal brackets → `mailto:anoe.rgz@gmail.com` (`Footer.jsx`)
  - [x] Navbar logo linked to `/Portafolio/` duplicating the basename → `/` (`Navbar.jsx`)
  - [x] Removed placehold.co placeholders and dead `galleryImages`/`developmentProcess` fields from `projects.json`
  - [x] Deleted dead `src/pages/ProjectDetailsPage.jsx`
  - [x] CV page copy repositioned: "React, Node.js" → **AI Engineer** (`CvPage.jsx`)
  - [x] `Project3.jsx` showed orphan Linux-server content → now real Hybrid RAG content + "In active development" panel
  - [x] `contact.json` GitHub display completed (`github.com/Krypton-N`)
- [x] **Metadata/SEO** — real `<title>`, meta description, full OG + Twitter cards, `theme-color`; generated `public/og-image.png` (1200×630) and `public/favicon.svg` (rose N monogram); 404-redirect comment translated (`index.html`)
- [x] **Canvas hygiene** (`NeuralBackground.jsx`) — pauses on `visibilitychange`; static single frame under `prefers-reduced-motion`; **not mounted on `/proyecto/*`** (the dimming overlays on project pages were removed too)
- [x] **Color discipline** — CATEGORY_THEME (amber/violet/emerald) collapsed to single rose+zinc `THEME`; cyan pulse → rose; orange hero orb → rose; CV language badges → rose/zinc; scrollbar slate → zinc; `aria-label` on all icon links
- [x] **Full English translation** — Hero, Navbar, ProjectsGallery, TechStack (incl. `skills.json` categories + iconMap keys), AboutTimeline, FormationPage (all certificates), CvPage, ImageComparisonViewer, Project1–4 (full prose, typos fixed, tone professionalized)
- [x] **Lint cleanup** — fixed pre-existing `react-hooks/refs` errors in `ImageComparisonViewer` (rect measured in handler, not render). 0 errors remaining (2 harmless compiler warnings in `NeuralBackground`, which gets replaced in Phase 2)
- [x] **Docs updated** — `docs/ProjectCard.md` rewritten for new contract; `docs/VisualSystem.md` created and approved; `docs/index.json` updated
- [x] Build verified green (`npm run build`), lint 0 errors

**Known leftovers (intentional, picked up in Phase 2):**
- Routes/anchors still Spanish (`/proyecto/:id`, `/formacion`, `#proyectos`, `#inicio`, `#habilidades`, `#sobre-mi`) — renamed during Home re-architecture to avoid breaking links twice
- Stray non-rose accents *inside* project pages (emerald check icons, amber notes, blue table highlights) — cleaned in the Phase 2 restyle pass
- `NeuralBackground` still the old particle canvas — replaced by the tensor field in Phase 2
- Hero headline still draft translation ("Building new Neurons") — replaced by approved copy ("AI Engineer. I build systems that learn.") in Phase 2

---

## Phase 1 — Visual System ✅ APPROVED (2026-06-11)

- [x] Audit of the full repo (weaknesses, bugs, perf, storytelling)
- [x] 5 creative concepts presented → direction chosen
- [x] `docs/VisualSystem.md`: typography proposals, fluid type scale, design tokens (color/space/radius/motion), tensor-field shader spec (uniforms, cursor physics, perf tiers, fallbacks), 5-act wireframes, implementation order
- [x] Typography decision: **Option B**

---

## Phase 2 — Medium Impact 🔜 NEXT (est. ~2 weeks)

Order matters; each step gates the next.

- [x] **2.1 Fonts + tokens** ✅ (2026-06-11)
  - Space Grotesk Variable / Inter Variable / JetBrains Mono Variable self-hosted via `@fontsource-variable/*`, imported in `src/index.css`
  - `@theme` tokens implemented (fluid type scale, surfaces, accent ramp, radii, motion); `font-display` applied to hero h1, SectionTitle, page h1/h2s; body = Inter
  - Pending (2.5): full ad-hoc → token migration across components
- [x] **2.2 Lenis + motion baseline** ✅ (2026-06-11)
  - `lenis` (lerp 0.1) in `SmoothScroll.jsx`, singleton in `src/lib/smoothScroll.js`; Navbar anchors + ScrollToTop use `lenis.scrollTo`; disabled under reduced motion
  - `Reveal.jsx` entrance component (motion, 400ms, ease-out-expo, once, 60ms stagger); applied to gallery cards + TechStack as baseline
  - Bonus: secondary pages code-split with `React.lazy` (main chunk 455 KB / 146 KB gzip)
- [x] **2.3 Tensor Field shader** ✅ v2 volumetric (2026-06-11) — `NeuralBackground` deleted, replaced by `TensorField.jsx`
  - v1 (flat 2D dashes) was **rejected by owner** — "palillos", less presence than the old background. v2 is a volumetric 3D flow: 2,400 curved ribbon trails (quadratic bezier bent by two flow samples, billboarded) inside a perspective frustum, with distance fog, near/far brightness, and **camera parallax following the cursor**. Still one instanced draw call
  - `uTemperature` 1→0 scroll narrative on home (turbulent volume → laminar streams; pinned 0.12 on project pages, 0.2 on secondary pages); 3D cursor repulsion with ~1.5s relaxation; gentle camera dolly-in while converging; loss counter 2.847→0.003. Verified headless with screenshots: hero turbulent + readable type, bottom converged, zero console errors
  - Debug war story for posterity: ogl culls back faces by default (winding flips killed v1 silently) → `cullFace: false`; `premultipliedAlpha: false` required for correct brightness
  - Pauses on `visibilitychange`; reduced-motion/no-WebGL2 → static CSS gradient veil; mobile tier 900 trails
  - Pending: owner visual tuning pass on real display; static pre-rendered fallback image; GPU frame-time measurement (v2 is heavier: ~72k verts × ~7 noise samples)
- [x] **2.4 Home re-architecture — the 5 acts** ✅ (2026-06-13) — verified headless, 5 acts + zero console errors; field reads turbulent at Act 1 → converged at Act 5
  - Act 1 Hero (`Hero.jsx`): approved copy "AI Engineer. I build systems that learn." with `DecodeText` token-by-token reveal, mono instrumentation status bar (`status: available · ALAN NOE RODRIGUEZ · ESCOM–IPN`), scroll cue. Orbs removed (field is the bg)
  - Act 2 Proof (`FeaturedWork.jsx` + `BeforeAfterSlider.jsx`): featured AI-restoration project leads with a full-width drag slider (before/after, keyboard-accessible) + 3 annotated pipeline phases + case-study link; `ProjectsGallery` (now title-less, filters+grid) follows
  - Act 3 Live (`LiveModule.jsx`): "Ask my portfolio" console shell with sample-question chips + explicit opt-in gate ("Load model · ~25 MB"). **Phase-3 hook documented in-file** (lazy boundary marked, nothing loads yet)
  - Act 4 Method (`Method.jsx` + `TechStack.jsx`): skills grid + compact 4-item journey timeline + link to full `/education`. Replaces the old `AboutTimeline` (deleted)
  - Act 5 Converge (`Converge.jsx`): `✓ loss: 0.003 · converged`, "Let's build." display headline, contact channels from `contact.json`, résumé CTA
  - New shared pieces: `SectionMarker.jsx` (mono `01 / WORK` + hairline, research-log dividers), `DecodeText.jsx` (reduced-motion safe)
  - **Routes renamed to English** with legacy redirects: `/proyecto/:id` → `/project/:id` (id-preserving), `/formacion` → `/education`; anchors `#home`/`#work`/`#method`/`#connect`; Navbar, ProjectCard, TensorField path-gate all updated
  - Deleted: `AboutTimeline.jsx`, `SectionTitle.jsx` (formationPage now uses `SectionMarker`)
  - Bundle: 471 KB / 150 KB gzip (home chunk; secondary pages still code-split)
- [x] **2.5 Project pages — each a unique experience** ✅ DONE (2026-06-13). All four rebuilt as distinct immersive experiences, verified headless, lint clean, zero console errors. Chunks: P1 24 KB, P2 30 KB, P3 8 KB, P4 21 KB (gzip 7.3 / 8.4 / 2.6 / 6.7).
  - **Direction change:** owner wants every project page to be its *own immersive experience*, NOT a shared data-driven template. Keep brand coherence (rose+zinc, Space Grotesk display, mono metadata, calm tensor field behind) but give each project a signature layout + interaction. Premature `ProjectPage` abstraction abandoned.
  - Per-project concepts:
    - **P2 · AI Restoration** ✅ DONE (2026-06-13) — *"The Restoration Pipeline"*. Cinematic hero (display title + full-size before/after `BeforeAfterSlider` + stat bar 14 nodes/3 stages/4K/9 samples). 14 ComfyUI nodes presented as a **node-graph rail** (`NodeCard` with port dots, mono titles, code-style settings) across 3 annotated stages. Results = 9-up grid → magnifier viewer. Execution-environment telemetry card. Full-graph preview. Prev/next footer. Verified headless, zero console errors, Project2 chunk 30 KB / 8.4 KB gzip.
    - **P4 · Data Analysis** ✅ DONE (2026-06-13) — *"Research Log"*. Abstract hero + scannable key-results band (r=0.83 · R²=0.692 · t=23.38 · 3.8h · n=705). Paper layout with §N sections, numbered `Figure` captions (6 figs), the OLS equation as a centered display equation, citation styling (James 1890 / Carr 2010 / Sweller 1988), appendix (metadata + stack + documents). Stray emerald/amber/blue accents cleaned to rose+zinc. Verified headless, zero console errors, Project4 chunk 21 KB / 6.7 KB gzip.
    - **P1 · ODE Solver** ✅ DONE (2026-06-13) — *"Symbolic Engine"*. Signature = a **solver panel** (in: y″+4y′+4y=e²ˣ → characteristic polynomial → out: y=(C₁+C₂x)e⁻²ˣ+¹⁄₁₆e²ˣ → verified). Equations rendered with **unicode/CSS, no KaTeX dep** (guards Lighthouse). 5 solving methods on a numbered rail with rendered solution-form cards; supported-equations table; file tree; GUI features + 3-image gallery; expandable challenges; roadmap; appendix. Stray emerald/amber/blue → rose+zinc.
    - **P3 · Hybrid RAG (WIP)** ✅ DONE (2026-06-13) — *"Retrieval Lab"*. Signature = a **fusion flow diagram** (Query → fan-out → Dense[FAISS] / Sparse[BM25] → Reranker → LLM → RAGAS → metrics.json) + a RAGAS metrics panel (faithfulness / answer relevancy / context precision, marked "pending"); honest in-development status.
  - Cross-cutting: stray non-rose accents cleaned across all pages; consistent prev/next footer; shared `SectionMarker` adopted.

- [x] **2.5b Education redesign + Act-5 fix** ✅ (2026-06-13, owner directive)
  - **Act 5 (Converge):** removed the `✓ loss: 0.003` line + green check (owner disliked it); now a clean `— CONVERGED —` rule in rose. (The bottom-left `loss:` counter is the tensor-field gradient-descent narrator — a separate, intentional element; left as-is.)
  - **Education (`formationPage.jsx`) fully rebuilt** as an immersive, award-style experience (no static timeline/bars):
    - Hero "Foundations." (display, *Education · the training set* framing) + stat row.
    - Academic path = two large **editorial blocks** with `TiltCard` 3D (mouse-tracked perspective + layered translateZ depth), giant EPOCH numbers, alternating layout.
    - Certifications = **pinned horizontal-scroll gallery** (vertical scroll → horizontal traverse of 5 3D-tilt cards, with a progress bar). Built with `useScroll`/`useTransform`.
    - **Fallbacks:** native snap horizontal scroll on mobile / `prefers-reduced-motion`. No extra WebGL — CSS transforms only (Lighthouse-safe).
    - Lightbox retained for full-size certificate viewing.
  - **Debug war story (for posterity):** the pinned scroll needs `useScroll({target})` bound to a section that is *always mounted* — conditionally rendering the `<section>` only when `pin` is true left `scrollYProgress` stuck at 0 (track `transform: none`). Fix: keep `sectionRef` on a permanent `<section>`, branch the inner content. Also use the **functional** `useTransform(p => -rangeRef.current * p)` reading a ref, not `[0,1]→[0,-range]` with a state value (which captures `range` as 0 before measurement). Verified: track translateX moves 0 → −925px across the traverse.
- [ ] **2.6 Performance audit** (1 day)
  - Lighthouse on the deployed GitHub Pages build, desktop + mobile
  - **Gate:** ≥90 / ≥75 or iterate until met

---

## Phase 3 — RAG "Ask my portfolio" 🔒 LAST (est. 1–2 weeks, do not start early)

- [ ] Client-side retrieval over portfolio content (transformers.js embeddings, quantized MiniLM-class model)
- [ ] Opt-in load ("⚡ load model · ~25 MB") inside the Act 3 slot; lazy-loaded chunk, zero cost until clicked
- [ ] Retrieval + extracts only (no generation) with visible chunk scores — honest and impressive
- [ ] Precomputed embeddings of projects/certs shipped as static JSON

---

## Quality gates (apply to every phase)

1. `npm run build` green and `npm run lint` with 0 errors before any commit
2. Lighthouse ≥90 desktop / ≥75 mobile on the deployed build
3. `prefers-reduced-motion` always has an elegant static path
4. Palette: zinc + rose only; max 2 rose elements per viewport
5. English only; mono font for all metadata/metrics
6. One effect polished > more effects — when in doubt, cut
