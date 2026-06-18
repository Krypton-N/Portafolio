# Portfolio - AI Engineer

[![Project Status](https://img.shields.io/badge/Status-Active_Redesign_Phase_2-rose?style=flat-square)](https://github.com/Krypton-N/Portafolio)
[![React Version](https://img.shields.io/badge/React-19.2.0-blue?style=flat-square&logo=react)](https://react.dev/)
[![Vite Version](https://img.shields.io/badge/Vite-7.2.4-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vite.dev/)
[![Tailwind CSS Version](https://img.shields.io/badge/Tailwind_CSS-4.1.18-38B2AC?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![React Router Version](https://img.shields.io/badge/React_Router-7.13.0-CA4245?style=flat-square&logo=reactrouter)](https://reactrouter.com/)

A highly customized portfolio and interactive resume website built for Alan Noe Rodríguez Flor, AI Engineer. The project is designed around a "Tensor Field + Research Log" creative direction, where a custom WebGL simulation serves as a visual protagonist that acts as a real-time gradient descent narrator.

---

## Technical Stack

### Core & Framework
![React](https://img.shields.io/badge/React_19-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite_7-646CFF?style=flat-square&logo=vite&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router_7-CA4245?style=flat-square&logo=react-router&logoColor=white)

### Styling & Animation
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_4-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)
![WebGL](https://img.shields.io/badge/WebGL_/_OGL-990000?style=flat-square&logo=webgl&logoColor=white)
![Motion](https://img.shields.io/badge/Motion-000000?style=flat-square&logo=framer&logoColor=white)
![Lenis Scroll](https://img.shields.io/badge/Lenis_Scroll-000000?style=flat-square)

### Technologies Showcased
![Python](https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white)
![ComfyUI](https://img.shields.io/badge/ComfyUI-000000?style=flat-square)
![LangChain](https://img.shields.io/badge/LangChain-1C3C3C?style=flat-square&logo=langchain&logoColor=white)
![FAISS](https://img.shields.io/badge/FAISS-000000?style=flat-square)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white)
![Linux](https://img.shields.io/badge/Linux-FCC624?style=flat-square&logo=linux&logoColor=black)

---

## Visual & Interaction System

The website implements a carefully calibrated dark aesthetic (true black `#050507` base with precise rose `#f43f5e` accents) governed by the following pillars:

*   **Tensor Field WebGL Simulation**: Written in raw WebGL via the OGL library. The simulation features 2,400 curved ribbon trails bent by curl-noise flow samples in a 3D perspective frustum. It responds to scrolling (varying from turbulent chaos to converged laminar flow) and tracks cursor parallax.
*   **Narrative Gradient Descent**: A corner telemetry system displays a real-time `loss` metric which matches the scroll/temperature of the simulation, descending from `2.847` (turbulent hero section) down to `0.003` (converged contact form).
*   **Scroll Choreography**: Utilizing Lenis for smooth scrolling and Motion for once-only ease-out-expo entry transitions. Fallbacks are integrated for `prefers-reduced-motion` and low-end hardware.
*   **Editorial Typography**: Structured under a strict display/body hierarchy using Space Grotesk (display headings >= 30px), Inter (clean copy), and JetBrains Mono (all metadata, stats, and instrumentation labels).

For a complete breakdown of the visual system design tokens and guidelines, refer to the [Visual System Guide](./docs/VisualSystem.md).

---

## Experience Architecture: The 5 Acts

The homepage is structured as a single-page flow divided into five key narrative milestones:

1.  **Act 1: Hero** - Features an auto-decoding text intro, a mono instrumentation bar indicating current availability, and the interactive WebGL field at maximum turbulence.
2.  **Act 2: Proof** - Displays a featured AI image restoration project showcasing an interactive drag slider for before/after comparison, an environment node-graph, and a project gallery grid.
3.  **Act 3: Live** - Contains a mock shell console titled "Ask my portfolio", laying out the UI slot and opt-in triggers for the Phase 3 client-side Retrieval-Augmented Generation (RAG) system.
4.  **Act 4: Method** - A comprehensive skills matrix paired with a clean 4-item career timeline leading to the dedicated education views.
5.  **Act 5: Converge** - A clean converged separator leading to contact channels and a resume download action.

---

## Specialized Project Showcase

Instead of utilizing generic templates, each project details page features custom interactive elements representing the project's engineering focus:

*   **Project 1: Symbolic ODE Solver** - Built with a symbolic math solver sandbox visualizing equations via custom unicode/CSS format (maintaining high Lighthouse scores without heavy libraries). Includes an expandable challenges log and directory tree mapping.
*   **Project 2: AI Restoration Pipeline** - Visualizes a 14-node ComfyUI workflow mapped into a horizontal node-graph rail with physical ports and settings blocks, coupled with a loupe magnifier tool.
*   **Project 3: Hybrid RAG Lab** - Illustrates dense/sparse retrieval pipeline logic using flow diagrams, FAISS indexing steps, and a dashboard ready for RAGAS evaluation metrics.
*   **Project 4: Attention Span Analysis** - Formatted as an academic publication containing research figures, OLS regression formula representations, statistical tables (R-squared, t-stats), and standard citation styling.

For details on the project card structure and metadata schemas, see the [Project Card Guide](./docs/ProjectCard.md).

---

## Project Structure

```
Portafolio/
├── public/                 # Static assets (favicons, OG images, WebP assets)
├── src/
│   ├── assets/             # Asset files
│   ├── components/
│   │   ├── layout/         # Base structure (Navbar, Footer)
│   │   ├── sections/       # Primary section modules (Hero, TechStack, etc.)
│   │   └── ui/             # Reusable atomic UI (Buttons, Badges, Cards)
│   ├── data/               # Project and skills data stored in JSON
│   ├── lib/                # Scroll and shader utilities
│   ├── pages/              # Primary routes and project-specific views
│   ├── App.jsx             # Router and WebGL context manager
│   ├── index.css           # Global typography definitions and CSS tokens
│   └── main.jsx            # React mounting hook
├── docs/                   # Detailed feature guides (ProjectCard, VisualSystem, etc.)
├── package.json            # Configuration and script manager
└── vite.config.js          # Vite configuration
```

---

## Development

### Prerequisites
*   Node.js version 18 or higher

### Build and Run Commands
Install dependencies:
```bash
npm install
```

Start the development server with Hot Module Replacement (HMR):
```bash
npm run dev
```

Build the static distribution folder (`dist/`):
```bash
npm run build
```

Run ESLint formatting verification:
```bash
npm run lint
```

Preview the production build locally:
```bash
npm run preview
```

Deploy the production bundle to GitHub Pages:
```bash
npm run deploy
```
