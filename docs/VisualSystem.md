# Visual System — "Tensor Field + Research Log"

> **Status:** APPROVED 2026-06-11 — typography: **Option B (Space Grotesk + Inter + JetBrains Mono)**. Ready for the Medium Impact phase.
>
> **Creative direction (approved):** Tensor Field as visual protagonist + Research Log editorial structure + Inference instrumentation modules. Execution reference: vectrfl.com (Utsubo). Rule: *one effect, perfectly polished* > many effects.
>
> **Hard constraints:** Lighthouse Performance ≥ 90 desktop / ≥ 75 mobile · static elegant fallback for `prefers-reduced-motion` and low-end devices · GitHub Pages (no backend) · budget: `motion` (~30 KB) + `lenis` (~5 KB) + raw WebGL/ogl shader (~15 KB).

---

## 1. Typography — three proposals (DECIDED: Option B)

All options are free (SIL OFL / OFL-compatible), self-hosted as WOFF2 with `font-display: swap`, subsetted to Latin. Two families maximum + one mono. The mono is **systemic**: every metadata, date, metric, label, and the loss counter uses it.

### Option A — "Precision Instrument" · Geist + Geist Mono
| Role | Font | Why |
|---|---|---|
| Display + body | **Geist** (variable) | Vercel's design language: cold, precise, engineered. Tight tracking at display sizes reads as "systems engineer". |
| Mono / data | **Geist Mono** | Same skeleton as the sans → perfect optical pairing for the instrumentation UI (loss counter, status bar). |

- Personality: Vercel / Linear. The safest "serious engineering" signal.
- Risk: widely used in dev circles — slightly less distinctive.
- Weight cost: ~55 KB woff2 total (2 variable files).

### Option B — "Future Lab" · Space Grotesk + Inter + JetBrains Mono
| Role | Font | Why |
|---|---|---|
| Display (h1–h3) | **Space Grotesk** | Geometric with quirky terminals — futurist character without being a "sci-fi font". Distinctive at 96px+. |
| Body | **Inter** | Invisible, perfect at text sizes; doesn't compete with the display. |
| Mono / data | **JetBrains Mono** | The most legible coding mono; ligatures off for UI labels. |

- Personality: Awwwards-leaning, more memorable hero. Closest to the vectrfl energy.
- Risk: three families = more discipline needed; display font can overpower if overused (rule: Space Grotesk ONLY ≥ 30px).
- Weight cost: ~85 KB woff2 total.

### Option C — "Research Press" · Inter Display + Source Serif 4 + IBM Plex Mono
| Role | Font | Why |
|---|---|---|
| Display + UI | **Inter Display** | Neutral modern, optical sizes for big headlines. |
| Long-form (project pages, abstracts) | **Source Serif 4** | The distill.pub / research-paper voice. Makes the Research Log concept literal: project pages read like publications. |
| Mono / data | **IBM Plex Mono** | Academic-technical heritage (IBM), pairs with serif beautifully. |

- Personality: Stripe Press / Anthropic research blog. Strongest with CTOs/researchers, least "flashy".
- Risk: serif on dark backgrounds requires careful sizing (min 18px, +0.01em tracking); most editorial discipline required.
- Weight cost: ~95 KB woff2 total.

**Director's recommendation:** **Option B** for the approved direction — the Tensor Field needs a display voice with character to stand beside it, and Space Grotesk at 8rem over the converging field is the hero image of the site. Option A if you prefer maximum sobriety; Option C if the audience skews research over startups.

### Type scale (identical for all options, fluid via clamp)
```
--text-xs:   clamp(0.75rem, 0.72rem + 0.15vw, 0.8125rem)   /* labels, metadata     */
--text-sm:   clamp(0.875rem, 0.84rem + 0.2vw, 0.9375rem)   /* secondary body       */
--text-base: clamp(1rem, 0.95rem + 0.25vw, 1.125rem)       /* body                 */
--text-lg:   clamp(1.125rem, 1.05rem + 0.4vw, 1.375rem)    /* lead paragraphs      */
--text-xl:   clamp(1.5rem, 1.3rem + 1vw, 2rem)             /* h3 / card titles     */
--text-2xl:  clamp(2rem, 1.6rem + 2vw, 3rem)               /* h2 / section titles  */
--text-3xl:  clamp(2.75rem, 2rem + 3.75vw, 5rem)           /* h1 secondary pages   */
--text-hero: clamp(3.5rem, 2.5rem + 5vw, 8rem)             /* hero display only    */

line-height: 1.1 display · 1.25 headings · 1.65 body · 1.4 mono
tracking:    -0.03em display · -0.01em headings · 0 body · 0.02em mono labels/uppercase
```

---

## 2. Design tokens

### 2.1 Color — one hue, many temperatures
```css
@theme {
  /* Surfaces (zinc, but deepened — true black base) */
  --color-bg:        #050507;   /* page base — deeper than zinc-950 */
  --color-surface-1: #0c0c0f;   /* cards                         */
  --color-surface-2: #121216;   /* raised cards / popovers       */
  --color-line:      rgba(255,255,255,0.06);  /* hairline borders */
  --color-line-hi:   rgba(255,255,255,0.12);  /* hovered borders  */

  /* Text */
  --color-text-hi:   #fafafa;   /* headings                      */
  --color-text:      #a1a1aa;   /* body (zinc-400)               */
  --color-text-lo:   #52525b;   /* metadata (zinc-600)           */

  /* Accent ramp — the ONLY hue on the site */
  --color-accent:     #f43f5e;  /* rose-500 — interactive, counter, field highlights */
  --color-accent-hi:  #fb7185;  /* rose-400 — hover states        */
  --color-accent-lo:  #9f1239;  /* rose-800 — field base tint     */
  --color-accent-glow: rgba(244,63,94,0.25);  /* the single permitted glow */
}
```
Rules: emerald/amber/violet/blue exist **nowhere** (current code still has a few stray accents inside project pages — to be cleaned during the redesign pass). Rose appears in at most 2 elements per viewport. Everything else is zinc.

### 2.2 Space, radius, elevation
```
Spacing: 4-based scale; section rhythm = 8rem desktop / 5rem mobile (--space-section)
Radii:   --r-sm 8px (chips) · --r-md 14px (cards) · --r-lg 22px (modals). One radius per component class — no more mixing rounded-xl/2xl/3xl ad hoc.
Elevation: borders, not shadows. Glow (--color-accent-glow) ONLY on: primary CTA, active card hover. Never two glows at once.
```

### 2.3 Motion tokens
```
--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1)     /* entrances           */
--ease-in-out:   cubic-bezier(0.65, 0, 0.35, 1)    /* layout / transitions */
--dur-fast: 150ms   /* hovers          */
--dur-med:  400ms   /* entrances       */
--dur-slow: 800ms   /* hero decode, page transitions */
Stagger: 60ms between siblings, max 5 staggered items per group.
Scroll choreography: lenis (lerp 0.1) + motion scroll-linked values. No element animates more than once per visit (entrances fire once).
prefers-reduced-motion: all entrances become opacity-only at 0ms; lenis disabled; field static.
```

---

## 3. Tensor Field — shader specification

**Concept:** the entire site sits on one living surface — a curl-noise flow field rendered as short oriented strokes (NOT dots, NOT connected lines). Scroll = training: the field's "temperature" descends from chaos (hero) to convergence (contact). The cursor is a physical perturbation. A mono `loss:` counter in the corner narrates the descent.

### 3.1 Technique
- **Renderer:** raw WebGL2 via `ogl` (~15 KB). Single full-screen instanced draw call.
- **Geometry:** ~6,000 instanced quads (desktop) / ~2,000 (mobile), each a 2-tri stroke oriented along the field.
- **Field:** GPU simulation, two ping-pong RG16F textures (256×256): position + age. Velocity = curl of simplex noise `curl(p * freq, t * speed)`.
- **Stroke rendering:** vertex shader stretches each quad along its velocity vector; length ∝ speed; alpha falls off at stroke ends. Color = mix(zinc-dark, accent-lo→accent, energy), capped so the field never outshines the type.

### 3.2 Uniforms (the narrative contract)
```glsl
uniform float uTemperature; // 1.0 (hero) → 0.0 (contact). Driven by scroll progress, smoothed by lenis lerp.
                            // High: noise freq 2.4, speed 1.0, full chaos.
                            // Low:  noise freq 0.5, speed 0.12, strokes align to a laminar horizontal flow (convergence).
uniform vec2  uPointer;     // cursor in field space
uniform vec2  uPointerVel;  // cursor velocity → perturbation strength
uniform float uTime;
```
- **Cursor perturbation (physical, not cosmetic):** the pointer injects a radial impulse into the velocity field (gaussian kernel, radius ~120px, strength ∝ |uPointerVel|), then the field *relaxes back* over ~1.5s — it must feel like dragging a hand through water, not like particles following a magnet. On touch devices: perturbation on tap/drag only.
- **Loss counter:** `loss: f(uTemperature)` where `f(t) = 0.003 + 2.844 · t²` + small jitter, formatted to 3 decimals in the corner status bar (mono font). Reaches 0.003 exactly at the contact section.

### 3.3 Performance budget & fallbacks
| Tier | Detection | Behavior |
|---|---|---|
| Desktop full | default | 6k instances, 256² sim, DPR ≤ 2, render at 0.75× resolution + upscale |
| Mobile | viewport < 768px or `navigator.hardwareConcurrency ≤ 4` | 2k instances, 128² sim, DPR 1, no pointer velocity buffer |
| Fallback | `prefers-reduced-motion`, no WebGL2, or 2 consecutive frames > 50ms at startup | Static pre-rendered field image (WebP, per-breakpoint) showing the *converged* state — the elegant ending, not the chaos |

- Sim + render paused via `IntersectionObserver` (canvas off-screen) and `visibilitychange`.
- Target: < 4ms GPU frame on a 2020 integrated GPU; zero main-thread work besides uniform updates.
- The canvas lives in `App.jsx` (persistent across routes — page transitions happen *over* the field, never unmount it). On project detail pages `uTemperature` is pinned low (calm field) and instance count halved.

---

## 4. Experience architecture — the 5 acts (Home)

One continuous scroll. The field is the protagonist; sections are typeset *on* it. Hairline-bordered surfaces only where text needs contrast (backdrop blur, no solid fills).

```
┌────────────────────────────────────────────────────────────┐
│ ACT 1 · HERO                            uTemperature = 1.0 │
│                                                            │
│  ┌ status bar (mono, top-left under navbar) ┐              │
│  │ ALAN NOE RODRIGUEZ · AI ENGINEER · ESCOM-IPN            │
│  │ loss: 2.847 ▓▓▓▓▓▓▓▓░░ training…         │              │
│  └──────────────────────────────────────────┘              │
│                                                            │
│        AI ENGINEER.                       ← display font,  │
│        I BUILD SYSTEMS                      --text-hero,   │
│        THAT LEARN.                          decode-in once │
│                                                            │
│        [ View the work ↓ ]   [ Contact ]                   │
│   field: full chaos, strokes react to cursor               │
├────────────────────────────────────────────────────────────┤
│ ACT 2 · PROOF (projects)                uTemperature ≈ 0.7 │
│                                                            │
│  ── 01 / WORK ─────────────────────────── (mono label)     │
│                                                            │
│  ┌─ FEATURED: AI Image Restoration ────────────────────┐   │
│  │  full-width BEFORE ◀──slider──▶ AFTER               │   │
│  │  pipeline annotations: physical · artistic · faces  │   │
│  └─────────────────────────────────────────────────────┘   │
│  ┌ card ┐  ┌ card ┐  ┌ card ┐      ← stagger 60ms entrance │
│  └──────┘  └──────┘  └──────┘                              │
├────────────────────────────────────────────────────────────┤
│ ACT 3 · LIVE (inference module)         uTemperature ≈ 0.5 │
│  ── 02 / RUNTIME ──────────────                            │
│  "Ask my portfolio." [ ⚡ load model · opt-in ]            │
│  (RAG placeholder this phase: architecture slot only —     │
│   renders a teaser panel until the final phase)            │
├────────────────────────────────────────────────────────────┤
│ ACT 4 · METHOD (skills + journey)       uTemperature ≈ 0.25│
│  ── 03 / METHOD ──────────────                             │
│  skills constellation (canvas, hover → highlights          │
│  projects that use the skill) + compact timeline           │
│  field: strokes begin aligning into laminar flow           │
├────────────────────────────────────────────────────────────┤
│ ACT 5 · CONVERGE (contact)              uTemperature = 0.0 │
│                                                            │
│        loss: 0.003 ✓ converged                             │
│        LET'S BUILD.                                        │
│        anoe.rgz@gmail.com · LinkedIn · GitHub · Resume     │
│   field: calm, ordered, breathing slowly                   │
└────────────────────────────────────────────────────────────┘
```

**Section transitions:** no hard edges — `uTemperature` interpolates continuously with scroll; section labels (`01 / WORK`) are the only structural markers, mono + hairline rule. **Page transitions:** 200ms crossfade of content over the persistent field. **Microinteractions:** underline-grow links (kept from current navbar), magnetic hover only on the 2 primary CTAs, cursor halo removed everywhere else.

**Psychological goals per act:** 1 positioning in 3s → 2 evidence before claims → 3 capability demonstrated live → 4 how I think → 5 emotional close + single action.

---

## 5. Implementation order (Medium Impact phase, after typography sign-off)

1. **Fonts + tokens** — load chosen option, replace ad-hoc classes with tokens. (0.5–1 day)
2. **Lenis + motion baseline** — smooth scroll, entrance system, reduced-motion plumbing. (1 day)
3. **Tensor Field shader** — replaces `NeuralBackground`; built behind a flag, A/B against fallback; perf-gate before merge. (4–6 days)
4. **Home re-architecture** — 5 acts, status bar + loss counter, featured slider (reuse `ImageComparisonViewer` lens logic for the inline slider). (3–4 days)
5. **Project pages restyle** — Research Log typography pass + stray-color cleanup; data-driven single `ProjectPage` refactor. (3–5 days)
6. **Perf audit** — Lighthouse on deployed Pages build; fix until ≥ 90/75. (1 day)

RAG module: **slot reserved in Act 3 only** (lazy-loaded boundary + opt-in UI shell). No implementation until the final phase, per scope decision.
