# ProjectCard System — Agent Reference Guide

> **Scope:** How project cards work in the gallery, how the data schema drives their appearance, and the exact steps to add a new project.
>
> **Files involved:**
> - `src/components/ui/ProjectCard.jsx` — The adaptive card component
> - `src/components/sections/ProjectsGallery.jsx` — The gallery that renders cards
> - `src/data/projects.json` — Source of truth for all project data

---

## 1. How It Works — Two Card Modes

`ProjectCard` is **adaptive**: the same component renders two visually distinct layouts depending on the data in `projects.json`. The deciding factor is whether the entry has a `coverIcons` array.

```
project entry in projects.json
        │
        ├── has "coverIcons" field?
        │        │
        │        YES → Visual Mode (icon panel + animated gradient)
        │        NO  → Image Mode  (photo cover with hover links)
        │
        └── has "wip": true?
                 │
                 YES → WIP ribbon "In Development" + disabled CTA "Coming soon…"
                 NO  → Normal "Details" button linking to /proyecto/:id
```

### Mode A — Image Mode (default)

Used when a project has an `"image"` field and **no** `"coverIcons"` field.

- Renders a 56-unit tall photo cover (`h-56`).
- On hover: photo scales up, GitHub/Demo icon links appear top-right.
- Content below: title, description (3 lines max), badges, "Details" link button.

### Mode B — Visual Mode

Used when a project has a `"coverIcons"` field (even if `"image"` is also present — `coverIcons` takes priority for the card visual).

- Renders a 48-unit tall icon panel (`h-48`) with:
  - A dark zinc base gradient.
  - An animated rose shimmer overlay.
  - A primary large icon (first element in `coverIcons`).
  - Up to 3 secondary smaller icons (elements 2–4 in `coverIcons`).
- Icon names must exist in the **curated `COVER_ICONS` map** inside `ProjectCard.jsx` (see section 5).
- If `"wip": true`, a live-pulsing **"In Development"** ribbon appears top-left.

---

## 2. Color Theme

All cards share a **single rose/zinc theme** (`THEME` constant in `ProjectCard.jsx`): rose accent, rose hover glow, zinc surfaces. This is a deliberate brand decision — the site palette is deep black + rose only. Category identity is conveyed by the filter tabs, **not** by card color.

> Historical note: the component previously had per-category themes (amber/violet/emerald). That was removed for color discipline. Do not reintroduce per-category colors without an explicit design decision.

---

## 3. The Full JSON Schema

Every entry in `src/data/projects.json` is an object with these fields:

```jsonc
{
    // ── REQUIRED fields ─────────────────────────────────────
    "id": 5,                          // Unique integer. Used in the detail page route: /proyecto/5
    "title": "Name of the project",   // Shown as the card heading (English)
    "description": "Short summary",   // Shown below the title, capped at 3 lines on the card
    "tags": ["React", "Node"],        // Tech tags rendered as rose badges
    "links": {
        "github": "https://...",      // Use "#" if not yet public. null hides the button.
        "demo": "https://..."         // Use null to hide the Demo button.
    },
    "category": "dev",                // Used by the gallery filter tabs. One of: "ai" | "dev" | "data" | "infra"
    "longDescription": "...",         // Full description, reusable on the detail page

    // ── CARD MODE selector (pick one) ────────────────────────
    // Option A — Image mode: provide an image path, omit coverIcons
    "image": "/Portafolio/PortadasProjects/Portada_MyProject.webp",

    // Option B — Visual mode: provide coverIcons, image field is ignored for the card
    "coverIcons": ["BrainCircuit", "Layers", "BarChart3", "FlaskConical"],

    // ── OPTIONAL fields ─────────────────────────────────────
    "wip": true                       // Omit or set false for completed projects.
                                      // When true: shows "In Development" ribbon,
                                      // disables the Details button.
}
```

### Field rules

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | integer | ✅ | Must be unique. Must match a `Project{id}.jsx` detail page if `wip` is false |
| `title` | string | ✅ | English. Keep under ~50 chars for clean card display |
| `description` | string | ✅ | English. Keep under ~200 chars; truncated at 3 lines on card |
| `tags` | string[] | ✅ | 3–6 tags recommended for visual balance |
| `links.github` | string \| null | ✅ | `"#"` = placeholder (button hidden on detail page); `null` = no button |
| `links.demo` | string \| null | ✅ | `null` = no Demo button rendered |
| `category` | string | ✅ | One of `"ai"`, `"dev"`, `"data"`, `"infra"` — affects filtering only, not card color |
| `longDescription` | string | ✅ | Reusable on the detail page. Can be multiple sentences |
| `image` | string | Conditional | Required for Image Mode. Path relative to `public/`. **Use .webp** (covers ≤ ~200 KB) |
| `coverIcons` | string[] | Conditional | Required for Visual Mode. 1–4 icon names present in `COVER_ICONS` |
| `wip` | boolean | Optional | Default: `false`. Set `true` for in-progress projects |

> `galleryImages` and `developmentProcess` were removed from the schema (they referenced placeholder URLs and were unused by the detail pages, which own their content).

---

## 4. Step-by-Step: Adding a New Project

### Case 1 — Completed project with a cover image

**Step 1:** Place the cover image in `public/PortadasProjects/` as an optimized **WebP** (≤ ~1200px wide, quality ~80). You can use the repo script as reference: `scripts/optimize-images.mjs`.
```
public/
└── PortadasProjects/
    └── Portada_MyNewProject.webp    ← put it here
```

**Step 2:** Add the entry to `src/data/projects.json`:
```json
{
    "id": 5,
    "title": "My New Project",
    "description": "Short description visible on the card.",
    "image": "/Portafolio/PortadasProjects/Portada_MyNewProject.webp",
    "tags": ["Python", "FastAPI", "Docker"],
    "links": {
        "github": "https://github.com/Krypton-N/my-new-project",
        "demo": null
    },
    "category": "dev",
    "longDescription": "Full detailed description for the project detail page."
}
```

**Step 3:** Create the detail page at `src/pages/projects/Project5.jsx`.
The simplest starting point is to copy `Project3.jsx` (the minimal template) and change the `id` lookup:
```jsx
const project = projectsData.find(p => p.id === 5);  // ← change this number
```

**Step 4:** Register the route in `src/App.jsx`:
```jsx
import Project5 from './pages/projects/Project5';
// ...
<Route path="/proyecto/5" element={<Project5 />} />
```

---

### Case 2 — WIP / In-development project (Visual Mode)

No cover image needed, no detail page needed.

**Step 1:** Add to `src/data/projects.json`:
```json
{
    "id": 6,
    "title": "My WIP Project",
    "description": "What this project will do when done.",
    "coverIcons": ["Bot", "Database", "Cpu"],
    "wip": true,
    "tags": ["Python", "LLM"],
    "links": {
        "github": "#",
        "demo": null
    },
    "category": "ai",
    "longDescription": "Placeholder for future detail page."
}
```

**No** detail page or route needed — the card CTA is disabled while `wip: true`.

---

### Case 3 — Completed project using Visual Mode (no cover image)

Same as Case 2 but without `"wip": true`, and with a real `id` linked to a detail page:
```json
{
    "id": 7,
    "title": "My Icon Project",
    "coverIcons": ["Network", "Server", "Layers", "Cpu"],
    "category": "infra",
    "wip": false,
    ...
}
```
Then follow steps 3–4 from Case 1 to create and register the detail page.

---

## 5. Choosing `coverIcons`

**Important:** icons are resolved against the curated `COVER_ICONS` map at the top of `ProjectCard.jsx` — **not** the full lucide-react library. This is deliberate: `import * as Icons from 'lucide-react'` bundled the entire icon set (~700 KB minified) and was removed for performance.

Currently available names:

```
BrainCircuit, Layers, BarChart3, FlaskConical, Code2, Sparkles,
Cpu, Database, Terminal, Globe, Bot, Network, LineChart, Server
```

**To use a new icon:** add it to both the lucide import and the `COVER_ICONS` object in `ProjectCard.jsx` (one line each), then reference it in `projects.json`. Unknown names fall back to `Code2` (primary) / `Sparkles` (secondary).

Array order matters:
- **Index 0** → Large primary icon (64×64), rose accent
- **Index 1–3** → Small secondary icons (rose/zinc tints)

Maximum 4 icons. Minimum 1 (only primary is rendered if the array has 1 element).

---

## 6. Gallery Filter Behavior

The filter tabs in `ProjectsGallery.jsx` filter by `category`. Current categories:

| Tab label | Filters `category` value |
|---|---|
| All | Shows all projects |
| Development | `"dev"` |
| AI | `"ai"` |
| Infrastructure | `"infra"` |
| Data Science | `"data"` |

To add a new category tab, edit the `categories` array in `ProjectsGallery.jsx`:
```jsx
const categories = [
    { id: 'all',      label: 'All' },
    { id: 'dev',      label: 'Development' },
    { id: 'ai',       label: 'AI' },
    { id: 'infra',    label: 'Infrastructure' },
    { id: 'data',     label: 'Data Science' },
    { id: 'research', label: 'Research' },  // ← new tab
];
```
No theme changes are needed — all cards share the single rose theme.

---

## 7. Animation Keyframes

The shimmer and pulse animations (`pc-shimmer`, `pc-pulse`) are defined **once** in `ProjectsGallery.jsx` via a `<style>` tag. They are **not** inside `ProjectCard.jsx`. Do not add them again elsewhere to avoid duplication.

---

## 8. File Reference

| File | Responsibility |
|---|---|
| `src/data/projects.json` | All project data — edit here to add/modify projects |
| `src/components/ui/ProjectCard.jsx` | Adaptive card renderer (Image Mode + Visual Mode) + `COVER_ICONS` map |
| `src/components/ui/Badge.jsx` | Rose-accent badge for tags |
| `src/components/sections/ProjectsGallery.jsx` | Grid layout, filter tabs, keyframe injection |
| `src/pages/projects/Project{id}.jsx` | Individual detail pages |
| `src/App.jsx` | Route registration — add new `/proyecto/:id` routes here |
| `public/PortadasProjects/` | Cover images (WebP) for Image Mode cards |
