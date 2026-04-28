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
                 YES → WIP ribbon "En Desarrollo" + disabled CTA "Próximamente…"
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
  - An animated shimmer overlay (color varies by `category`).
  - A primary large icon (first element in `coverIcons`).
  - Up to 3 secondary smaller icons (elements 2–4 in `coverIcons`).
- Icon names must be valid **lucide-react** icon names (PascalCase). Browse available icons at https://lucide.dev/icons/
- If `"wip": true`, a live-pulsing **"En Desarrollo"** ribbon appears top-left.

---

## 2. Color Theming by Category

Each `category` value maps to a full color theme automatically. No manual color specification is needed.

| `category` | Primary accent | Hover glow | Title hover | Secondary icon colors |
|---|---|---|---|---|
| `"ai"` | Amber | amber glow | amber | rose, violet, emerald |
| `"dev"` | Rose | rose glow | rose | amber, violet, emerald |
| `"data"` | Violet | violet glow | violet | rose, amber, emerald |
| `"infra"` | Emerald | emerald glow | emerald | rose, amber, violet |

If an unknown category is passed, it falls back to `"dev"` (rose).

---

## 3. The Full JSON Schema

Every entry in `src/data/projects.json` is an object with these fields:

```jsonc
{
    // ── REQUIRED fields ─────────────────────────────────────
    "id": 5,                          // Unique integer. Used in the detail page route: /proyecto/5
    "title": "Name of the project",   // Shown as the card heading
    "description": "Short summary",   // Shown below the title, capped at 3 lines on the card
    "tags": ["React", "Node"],        // Tech tags rendered as rose badges
    "links": {
        "github": "https://...",      // Use "#" if not yet public. null hides the button.
        "demo": "https://..."         // Use null to hide the Demo button.
    },
    "category": "dev",                // Controls color theme. One of: "ai" | "dev" | "data" | "infra"
    "longDescription": "...",         // Full description used on the detail page
    "galleryImages": [                // Images shown in the detail page gallery sidebar
        "/path/to/image.png",
        "https://placehold.co/..."
    ],
    "developmentProcess": "...",      // Text shown in the "Cómo se Hizo" section of the detail page

    // ── CARD MODE selector (pick one) ────────────────────────
    // Option A — Image mode: provide an image path, omit coverIcons
    "image": "/Portafolio/PortadasProjects/Portada_MyProject.png",

    // Option B — Visual mode: provide coverIcons, image field is ignored for the card
    "coverIcons": ["BrainCircuit", "Layers", "BarChart3", "FlaskConical"],

    // ── OPTIONAL fields ─────────────────────────────────────
    "wip": true                       // Omit or set false for completed projects.
                                      // When true: shows "En Desarrollo" ribbon,
                                      // disables the Details button.
}
```

### Field rules

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | integer | ✅ | Must be unique. Must match a `Project{id}.jsx` detail page if `wip` is false |
| `title` | string | ✅ | Keep under ~50 chars for clean card display |
| `description` | string | ✅ | Keep under ~200 chars; truncated at 3 lines on card |
| `tags` | string[] | ✅ | 3–6 tags recommended for visual balance |
| `links.github` | string \| null | ✅ | `"#"` = placeholder (button hidden on detail page); `null` = no button |
| `links.demo` | string \| null | ✅ | `null` = no Demo button rendered |
| `category` | string | ✅ | One of `"ai"`, `"dev"`, `"data"`, `"infra"` |
| `longDescription` | string | ✅ | Used on detail page. Can be multiple sentences |
| `galleryImages` | string[] | ✅ | Paths relative to project root or full URLs. Can use placehold.co for placeholders |
| `developmentProcess` | string | ✅ | Used on detail page "Cómo se Hizo" section |
| `image` | string | Conditional | Required for Image Mode. Path relative to `public/` |
| `coverIcons` | string[] | Conditional | Required for Visual Mode. 1–4 lucide-react icon names in PascalCase |
| `wip` | boolean | Optional | Default: `false`. Set `true` for in-progress projects |

---

## 4. Step-by-Step: Adding a New Project

### Case 1 — Completed project with a cover image

**Step 1:** Place the cover image in `public/PortadasProjects/`:
```
public/
└── PortadasProjects/
    └── Portada_MyNewProject.png    ← put it here
```

**Step 2:** Add the entry to `src/data/projects.json`:
```json
{
    "id": 5,
    "title": "My New Project",
    "description": "Short description visible on the card.",
    "image": "/Portafolio/PortadasProjects/Portada_MyNewProject.png",
    "tags": ["Python", "FastAPI", "Docker"],
    "links": {
        "github": "https://github.com/Krypton-N/my-new-project",
        "demo": null
    },
    "category": "dev",
    "longDescription": "Full detailed description for the project detail page.",
    "galleryImages": [
        "/path/to/screenshot1.png",
        "https://placehold.co/800x450/111/FFF?text=Architecture+Diagram"
    ],
    "developmentProcess": "Explain how it was built here."
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
    "longDescription": "Placeholder for future detail page.",
    "galleryImages": [],
    "developmentProcess": "In progress."
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
    "coverIcons": ["Workflow", "GitBranch", "Layers", "Zap"],
    "category": "infra",
    "wip": false,
    ...
}
```
Then follow steps 3–4 from Case 1 to create and register the detail page.

---

## 5. Choosing `coverIcons`

Icons must be valid **lucide-react** names in PascalCase.

**Recommended icons by domain:**

| Domain | Icon suggestions |
|---|---|
| AI / ML | `BrainCircuit`, `Bot`, `Cpu`, `Sparkles`, `Network` |
| Data / Analytics | `BarChart3`, `LineChart`, `Database`, `TableProperties`, `FlaskConical` |
| RAG / Search | `Search`, `Layers`, `FileSearch`, `Library` |
| Backend / Infra | `Server`, `Container`, `GitBranch`, `Workflow`, `Blocks` |
| Frontend / Dev | `Code2`, `Paintbrush`, `Globe`, `Layout`, `Smartphone` |
| Systems / Automation | `Cpu`, `Zap`, `Wrench`, `Settings2`, `Terminal` |

Array order matters:
- **Index 0** → Large primary icon (64×64), uses category primary color
- **Index 1** → Small secondary icon, uses first secondary color
- **Index 2** → Small secondary icon, uses second secondary color
- **Index 3** → Small secondary icon, uses third secondary color

Maximum 4 icons. Minimum 1 (only primary is rendered if the array has 1 element).

---

## 6. Gallery Filter Behavior

The filter tabs in `ProjectsGallery.jsx` filter by `category`. Current categories:

| Tab label | Filters `category` value |
|---|---|
| Todos | Shows all projects |
| Desarrollo | `"dev"` |
| IA | `"ai"` |
| Infraestructura | `"infra"` |
| Data Science | `"data"` |

To add a new category tab, edit the `categories` array in `ProjectsGallery.jsx`:
```jsx
const categories = [
    { id: 'all',      label: 'Todos' },
    { id: 'dev',      label: 'Desarrollo' },
    { id: 'ai',       label: 'IA' },
    { id: 'infra',    label: 'Infraestructura' },
    { id: 'data',     label: 'Data Science' },
    { id: 'research', label: 'Investigación' },  // ← new tab
];
```
And add a theme entry in the `CATEGORY_THEME` object in `ProjectCard.jsx`.

---

## 7. Animation Keyframes

The shimmer and pulse animations (`pc-shimmer`, `pc-pulse`) are defined **once** in `ProjectsGallery.jsx` via a `<style>` tag. They are **not** inside `ProjectCard.jsx`. Do not add them again elsewhere to avoid duplication.

---

## 8. File Reference

| File | Responsibility |
|---|---|
| `src/data/projects.json` | All project data — edit here to add/modify projects |
| `src/components/ui/ProjectCard.jsx` | Adaptive card renderer (Image Mode + Visual Mode) |
| `src/components/ui/Badge.jsx` | Rose-accent badge for tags |
| `src/components/sections/ProjectsGallery.jsx` | Grid layout, filter tabs, keyframe injection |
| `src/pages/projects/Project{id}.jsx` | Individual detail pages |
| `src/App.jsx` | Route registration — add new `/proyecto/:id` routes here |
| `public/PortadasProjects/` | Cover images for Image Mode cards |
