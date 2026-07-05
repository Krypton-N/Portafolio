import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Layers, Database, Terminal, BrainCircuit, Radio, Wrench, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import projectsData from '../../data/projects.json';
import Badge from '../../components/ui/Badge';
import SectionMarker from '../../components/ui/SectionMarker';
import Reveal from '../../components/motion/Reveal';

import imgSobel from '../../resources/projects/Project_PhotoLabPro/sobel_deteccion_baches.webp';
import imgTabla from '../../resources/projects/Project_PhotoLabPro/tabla_propiedades_componentes.webp';
import imgSplash from '../../resources/projects/Project_PhotoLabPro/photolab_pro_splash_screen.webp';
import imgBachesProcessed from '../../resources/projects/Project_PhotoLabPro/vista_procesada_baches.webp';
import imgBaches3Result from '../../resources/projects/Project_PhotoLabPro/baches-detectados3.webp';
import imgBaches1Result from '../../resources/projects/Project_PhotoLabPro/baches-detectados1.webp';

/* ───────────────────────── building blocks (page-local) ───────────────────────── */

const Stat = ({ value, label }) => (
    <div className="flex flex-col">
        <span className="font-display text-2xl md:text-3xl font-bold text-white leading-none">{value}</span>
        <span className="font-mono text-[11px] text-zinc-500 mt-1 uppercase tracking-wider">{label}</span>
    </div>
);

const K = ({ children }) => (
    <code className="font-mono text-xs text-rose-300 bg-rose-500/10 px-1.5 py-0.5 rounded border border-rose-500/15">{children}</code>
);

/* Node on the architecture rail */
const Node = ({ icon, title, subtitle, accent }) => {
    const Icon = icon;
    return (
        <div className={`rounded-xl border p-4 text-center backdrop-blur-sm ${accent ? 'border-rose-500/30 bg-rose-500/[0.06]' : 'border-white/8 bg-zinc-900/50'}`}>
            <Icon size={18} className={`mx-auto mb-2 ${accent ? 'text-rose-400' : 'text-zinc-400'}`} />
            <p className="text-sm font-medium text-white">{title}</p>
            {subtitle && <p className="font-mono text-[11px] text-zinc-500 mt-1 leading-snug">{subtitle}</p>}
        </div>
    );
};

/* A single iteration in an experimental process — kept, discarded, or a turning-point insight */
const Attempt = ({ n, title, note, discarded }) => (
    <div className="flex gap-3 items-start">
        <span className={`font-mono text-[11px] mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center border ${discarded ? 'border-zinc-700 text-zinc-600' : 'border-rose-500/40 text-rose-400 bg-rose-500/10'}`}>{n}</span>
        <div>
            <p className="text-sm text-white font-medium">
                {title} {discarded && <span className="text-zinc-600 font-normal font-mono text-xs">— discarded</span>}
            </p>
            <p className="text-xs text-zinc-500 mt-0.5 leading-relaxed">{note}</p>
        </div>
    </div>
);

/* A single request/response step in the MCP trace */
const McpStep = ({ n, tool, call, result }) => (
    <div className="rounded-xl overflow-hidden border border-rose-500/15 bg-zinc-950/60">
        <div className="flex items-center gap-2 px-4 py-2 border-b border-white/5 bg-white/[0.02]">
            <span className="font-mono text-[11px] text-zinc-600">{String(n).padStart(2, '0')}</span>
            <span className="font-mono text-xs text-rose-300">{tool}</span>
        </div>
        <div className="p-4 font-mono text-[12.5px] leading-relaxed space-y-1.5">
            <p className="text-zinc-500">→ {call}</p>
            <p className="text-zinc-300">← {result}</p>
        </div>
    </div>
);

const Project5 = () => {
    const project = projectsData.find(p => p.id === 5);
    const [expanded, setExpanded] = useState({});
    const toggle = (idx) => setExpanded((prev) => ({ ...prev, [idx]: !prev[idx] }));

    const techStack = [
        { name: 'PyQt6', role: 'Desktop GUI' },
        { name: 'OpenCV', role: 'Image processing core' },
        { name: 'NumPy', role: 'Array computation' },
        { name: 'Matplotlib', role: 'Histograms & plots' },
        { name: 'SciPy', role: 'Scientific computing' },
        { name: 'scikit-image', role: 'Advanced ops (SLIC, SSIM)' },
        { name: 'Numba', role: 'JIT hotpaths' },
        { name: 'pydicom', role: 'Medical DICOM support' },
        { name: 'FastMCP · mcp 1.27.2', role: 'MCP server (Anthropic SDK)' },
    ];

    const challenges = [
        {
            icon: <Wrench size={16} />,
            title: 'Matplotlib is not thread-safe',
            description: 'FastMCP runs async and can call tools concurrently; two operations touching pyplot at once would corrupt figure state.',
            solution: 'Every MCP call is routed through a dedicated single-worker thread pool, so pyplot always sees the same execution context — serialized, never parallel.',
        },
        {
            icon: <Layers size={16} />,
            title: 'One engine, two consumers',
            description: 'The GUI and the headless MCP server both need the exact same processing logic, without maintaining two copies of it.',
            solution: "Every operation is a pure function f(imagen, **params) → ndarray. A headless Sesion wrapper instantiates the same ImageState the GUI uses — zero duplicated code between the two.",
        },
        {
            icon: <Radio size={16} />,
            title: 'A live mirror without coupling the server to the GUI',
            description: 'Watching MCP edits happen inside the actual PyQt6 window is a strong demo, but the server must keep working with the GUI closed.',
            solution: 'A one-way, fire-and-forget message over a local TCP socket (127.0.0.1) replays the recipe on the GUI if it happens to be open. The MCP server never waits on it.',
        },
    ];

    return (
        <div className="relative z-10">
            {/* ─── Hero ─────────────────────────────────────────────── */}
            <header className="pt-28 pb-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-5xl mx-auto">
                    <Link to="/" className="inline-flex items-center text-zinc-400 hover:text-rose-400 mb-10 transition-colors group font-mono text-sm">
                        <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                        back to work
                    </Link>

                    <div className="grid lg:grid-cols-12 gap-10 items-center">
                        <div className="lg:col-span-6">
                            <div className="flex flex-wrap gap-2 mb-5">
                                {project.tags.map((tag, idx) => <Badge key={idx}>{tag}</Badge>)}
                            </div>
                            <p className="font-mono text-xs text-rose-400 uppercase tracking-[0.25em] mb-3">Desktop App · Digital Image Processing · ESCOM</p>
                            <h1 className="font-display text-4xl md:text-6xl font-bold text-white leading-[0.98] tracking-tight">
                                PhotoLab Pro<br />
                                <span className="bg-gradient-to-r from-rose-500 to-rose-300 bg-clip-text text-transparent">talks to your LLM.</span>
                            </h1>
                            <p className="text-lg text-zinc-400 leading-relaxed mt-6 max-w-lg">
                                A non-destructive image-processing pipeline built with PyQt6 and OpenCV — with the same
                                engine exposed as an MCP server, so an LLM can inspect, transform, and filter images
                                before they ever reach a training dataset.
                            </p>
                            <div className="flex flex-wrap gap-x-8 gap-y-4 mt-10 pt-6 border-t border-white/10">
                                <Stat value="13" label="PDI modules" />
                                <Stat value="117" label="operations" />
                                <Stat value="10" label="MCP tools" />
                            </div>
                        </div>

                        <div className="lg:col-span-6">
                            <Reveal>
                                <figure className="rounded-2xl overflow-hidden border border-white/10 bg-zinc-950/50 shadow-2xl">
                                    <img src={imgSobel} alt="PhotoLab Pro — Sobel edge detection over a real pothole-detection photo, dual view with parameter panel" className="w-full h-auto" loading="lazy" />
                                </figure>
                                <p className="text-center text-xs text-zinc-600 font-mono mt-3">real capture · Sobel edge detection · road-defect sample</p>
                            </Reveal>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">

                {/* ─── 01 · Non-destructive by design ─────────────────── */}
                <section className="pt-12">
                    <SectionMarker index="01" label="Non-destructive by design" />
                    <Reveal>
                        <p className="text-zinc-400 mb-6 leading-relaxed">
                            <code className="font-mono text-sm text-rose-300 bg-rose-500/10 px-1.5 py-0.5 rounded">_imagen_original</code> is
                            never mutated. Every operation appends to a history and an incremental cache, so undo, redo, and reordering
                            a step are all <strong className="text-zinc-200">O(1)</strong> — no full pipeline replay.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
                            {[
                                ['Non-destructive pipeline', 'The original image is copied once on load and never touched again — reset just restores it.'],
                                ['O(1) incremental cache', 'A cache list parallel to the history means undo/redo and step edits never replay from scratch.'],
                                ['13 modules · 117 operations', 'Histograms, Fourier, morphology, segmentation, edge detection, connected components, metrics, and more.'],
                            ].map(([t, d]) => (
                                <div key={t} className="bg-zinc-900/40 rounded-xl p-4 border border-white/8">
                                    <h4 className="font-bold text-white text-sm mb-1.5">{t}</h4>
                                    <p className="text-xs text-zinc-500 leading-relaxed">{d}</p>
                                </div>
                            ))}
                        </div>

                        <figure className="rounded-xl overflow-hidden border border-white/8 bg-zinc-950/50 p-2">
                            <img src={imgTabla} alt="PhotoLab Pro connected-components module — geometric properties table (area, centroid, bounding box, perimeter, eccentricity) for 759 detected components" className="w-full h-auto rounded-lg" loading="lazy" />
                        </figure>
                        <figcaption className="mt-3 text-sm text-zinc-500 leading-snug">
                            The metrics module measuring 759 detected components (area, centroid, bounding box, perimeter, eccentricity)
                            on the same road-defect image — the analysis half of the same non-destructive pipeline.
                        </figcaption>
                    </Reveal>
                </section>

                {/* ─── 02 · Architecture ───────────────────────────────── */}
                <section className="pt-20">
                    <SectionMarker index="02" label="Architecture" />
                    <Reveal>
                        <p className="text-zinc-400 mb-8 max-w-2xl">
                            Three decoupled layers, one shared state. The GUI and the MCP server never touch each other's internals —
                            both talk to the same <K>ImageState</K>.
                        </p>
                        <div className="rounded-2xl border border-white/8 bg-zinc-950/40 p-6 sm:p-10">
                            <div className="max-w-md mx-auto space-y-3">
                                <Node icon={BrainCircuit} title="LLM · Claude" subtitle="tools/list + tools/call · stdio" />
                                <p className="text-center text-zinc-700 font-mono text-xs">│</p>
                                <Node icon={Terminal} title="MCP Server" subtitle="FastMCP · 10 tools" accent />
                                <p className="text-center text-zinc-700 font-mono text-xs">│ aplicar() / analizar() via Sesion (headless)</p>
                                <Node icon={Database} title="ImageState" subtitle="incremental cache · never mutates the original" accent />
                                <p className="text-center text-zinc-700 font-mono text-xs">│ Qt signals + direct calls · GUI owns the instance</p>
                                <Node icon={Layers} title="GUI · PyQt6" subtitle="viewer · histogram · parameter panel" />
                            </div>
                        </div>
                        <p className="text-xs text-zinc-600 font-mono mt-4 text-center">
                            optional live mirror: MCP → GUI is one-way, fire-and-forget, over a local TCP socket — the server never waits on it
                        </p>
                        <div className="flex flex-wrap gap-2 mt-6 justify-center">
                            <span className="font-mono text-xs px-2.5 py-1 rounded-full bg-white/5 border border-white/5 text-zinc-400">Observer (Qt signals)</span>
                            <span className="font-mono text-xs px-2.5 py-1 rounded-full bg-white/5 border border-white/5 text-zinc-400">Command</span>
                        </div>
                    </Reveal>
                </section>

                {/* ─── 03 · The MCP Server (centerpiece) ──────────────── */}
                <section className="pt-20">
                    <SectionMarker index="03" label="The MCP Server" />
                    <Reveal>
                        <div className="rounded-2xl border border-rose-500/25 bg-rose-500/[0.04] p-6 sm:p-8 shadow-[0_0_40px_rgba(244,63,94,0.06)]">
                            <p className="text-zinc-300 leading-relaxed mb-6">
                                The exact same engine behind the GUI is exposed as an <strong className="text-white">MCP server</strong> —
                                so an LLM can drive real image-processing operations directly, no GUI required.
                            </p>

                            <p className="text-sm text-zinc-500 mb-4 border-l-2 border-rose-500/40 pl-4">
                                "Load the ten-of-hearts card into PhotoLab's GUI, identify each heart, segment them, and overlay
                                them so I can see each one separately."
                            </p>

                            <div className="space-y-3">
                                <McpStep n={1} tool="listar_operaciones"
                                    call={'{ categoria: "m11", detalle: true }'}
                                    result="schema of segmentacion_color — h_min/h_max/s_min/s_max/v_min/v_max, modo_resultado enum" />
                                <McpStep n={2} tool="aplicar_operacion · segmentacion_color"
                                    call={'{ h_min: 170, h_max: 10, s_min: 70, v_min: 50, modo_resultado: "Máscara binaria" }'}
                                    result="hue wrap-around handles red crossing 0° — mask with the 10 hearts + corner pips" />
                                <McpStep n={3} tool="analizar → aplicar_operacion · filtrado_por_area"
                                    call={'{ operacion: "analisis.componentes_conexas" } → 24 components → { area_min: 150, area_max: 5000 }'}
                                    result="filtered down to exactly the 10 hearts" />
                                <McpStep n={4} tool="aplicar_operacion · etiquetado_8 → obtener_resultado"
                                    call={'{} → { guardar_en: ".../output/..._etiquetado_overlay.png" }'}
                                    result="10 hearts, each colored, numbered 1–10, with a bounding box — exported full-resolution" />
                            </div>

                            <div className="flex flex-wrap gap-2 mt-6">
                                {['aplicar_operacion', 'listar_operaciones', 'analizar', 'abrir_gui'].map((t) => (
                                    <span key={t} className="font-mono text-xs px-2.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-300">{t}</span>
                                ))}
                            </div>
                        </div>
                    </Reveal>
                </section>

                {/* ─── 04 · Real-World Case: Reading Potholes ──────────── */}
                <section className="pt-20">
                    <SectionMarker index="04" label="Real-World Case: Reading Potholes" />
                    <Reveal>
                        <p className="text-zinc-400 mb-6 leading-relaxed max-w-2xl">
                            No scripted demo this time — this is an unscripted session in Claude Desktop, driving the
                            same MCP server live against real street photos, to solve an actual computer-vision problem:
                            isolate the potholes and ignore everything else the camera happened to catch.
                        </p>
                        <p className="text-sm text-zinc-500 mb-8 border-l-2 border-rose-500/40 pl-4">
                            "Load Baches3. It's a photo of a damaged street. Your goal: detect the actual POTHOLES in
                            the pavement and flag each one individually using connected components. Only potholes —
                            don't count vehicles, sidewalk puddles, or anything that isn't pavement damage. Tell me
                            how many you found and each one's area, largest to smallest. Work iteratively: apply an
                            approach, look at the result, and if you're catching things that aren't potholes — or
                            missing obvious ones — change strategy and explain what changed and why."
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                            <figure className="rounded-xl overflow-hidden border border-white/8 bg-zinc-950/50">
                                <img src={imgBachesProcessed} alt="PhotoLab Pro Sobel edge magnitude view over Baches3.jpg, an early exploration pass before the final connected-components strategy" className="w-full h-auto" loading="lazy" />
                                <figcaption className="text-center text-xs text-zinc-600 font-mono py-2 border-t border-white/5">exploration pass · edge magnitude, pre-final strategy</figcaption>
                            </figure>
                            <figure className="rounded-xl overflow-hidden border border-rose-500/20 bg-zinc-950/50">
                                <img src={imgBaches3Result} alt="Final result: Baches3.jpg with 3 potholes labeled B1-B3, each with its pixel area, vehicles and pedestrians correctly excluded" className="w-full h-auto" loading="lazy" />
                                <figcaption className="text-center text-xs text-rose-400/80 font-mono py-2 border-t border-rose-500/10">final · 3 potholes labeled, areas measured</figcaption>
                            </figure>
                        </div>

                        <div className="rounded-2xl border border-white/8 bg-zinc-950/40 p-6 sm:p-8 space-y-5 mb-6">
                            <Attempt n={1} title="Global Otsu threshold" discarded
                                note="Otsu maximizes inter-class variance across the whole frame — it doesn't know what a pothole is. In a street scene with people, buildings, and asphalt, the optimal split was just 'bright vs. dark,' which pulled in pedestrians and building walls right alongside the real damage." />
                            <Attempt n={2} title="Black-hat morphology" discarded
                                note="Black-hat highlights dark structures against a locally brighter background — the wrong assumption here. The pavement itself is already dark, and potholes are just darker depressions on top of it; there's no bright local background to punch through. It lit up pedestrian edges instead of holes." />
                            <Attempt n={3} title="Morphological order matters: close before open"
                                note="Opening (erode → dilate) strips anything smaller than the structuring element. After thresholding, the potholes' blobs were fuzzy and fragmented, so opening wiped them out before closing ever got a chance to fill them in. Flipping the order — close first, then open — kept the potholes and dropped the noise." />
                            <Attempt n={4} title="Two channels, OR-combined, inside a hand-drawn road mask"
                                note="Once it was clear the MCP catalog had no primitive for an arbitrary ROI, no OR-fusion between two masks, and no centroid-based filter — only area — the session dropped to raw OpenCV for that specific piece of logic, still round-tripping every result back through cargar_imagen / obtener_resultado to inspect it inside PhotoLab's own viewer. Channel A: a low global threshold (68) for the darkest, water-filled depressions. Channel B: adaptive thresholding (block 101, C 15) for shallower damage. Both masked to a hand-drawn road-only region — cutting the people, the far sidewalk, and the near puddle — then OR-combined and filtered to components between 2,500 and 70,000 px²." />
                        </div>

                        <div className="rounded-xl border border-white/8 bg-zinc-900/40 p-4 mb-8 overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="text-left text-zinc-500 font-mono text-xs uppercase tracking-wider">
                                        <th className="pb-2 font-normal">Pothole</th>
                                        <th className="pb-2 font-normal">Area</th>
                                        <th className="pb-2 font-normal">Description</th>
                                    </tr>
                                </thead>
                                <tbody className="text-zinc-300">
                                    {[
                                        ['B1', '10,829 px²', 'central elongated crack/pothole'],
                                        ['B2', '7,419 px²', 'oval pothole, left mid-distance'],
                                        ['B3', '5,931 px²', 'foreground pothole, left'],
                                    ].map(([label, area, desc]) => (
                                        <tr key={label} className="border-t border-white/5">
                                            <td className="py-2 font-mono text-rose-300">{label}</td>
                                            <td className="py-2 font-mono">{area}</td>
                                            <td className="py-2 text-zinc-500">{desc}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <p className="text-zinc-400 leading-relaxed mb-3">
                            A second, independent run on a different street photo (<K>Baches1.png</K>, 700×454) hit the
                            same wall from a different angle. Otsu at 125 fused a parked bus, the far road surface, and
                            sidewalk glare into one 99,059 px² blob. Raising the threshold to a manual 148 cut the false
                            positives — but the bus happened to occupy almost exactly the same area range (10,660 px²)
                            as the real potholes (8,987–10,559 px²), so area alone couldn't tell them apart.
                        </p>
                        <p className="text-zinc-400 leading-relaxed mb-8">
                            The fix was the same lesson learned twice: a spatial mask (excluding <K>y &lt; 130</K> and{' '}
                            <K>x &lt; 140</K> — no vehicles, no sidewalk) combined with a closing kernel tuned from
                            13×13 up to 19×19 so a small pothole fragment wouldn't disappear. Final count:{' '}
                            <strong className="text-white">5 potholes</strong>, from 10,565 down to 1,422 px².
                        </p>

                        <figure className="rounded-xl overflow-hidden border border-white/8 bg-zinc-950/50 p-2 max-w-md">
                            <img src={imgBaches1Result} alt="Second independent run: Baches1.png with 5 potholes labeled by area, largest to smallest, with a legend" className="w-full h-auto rounded-lg" loading="lazy" />
                        </figure>
                        <figcaption className="mt-3 text-sm text-zinc-500 leading-snug">
                            Same server, two independent photos — same discovery both times: a plain threshold sees
                            brightness, not damage. The ROI mask and the multi-channel fusion did the real work, and the
                            session stayed honest about stepping outside its own tool catalog to get there.
                        </figcaption>
                    </Reveal>
                </section>

                {/* ─── 05 · Technical Challenges ───────────────────────── */}
                <section className="pt-20">
                    <SectionMarker index="05" label="Technical Challenges" />
                    <Reveal>
                        <div className="space-y-3">
                            {challenges.map((c, idx) => (
                                <div key={idx} className="bg-zinc-900/40 border border-white/8 rounded-xl overflow-hidden hover:border-rose-500/20 transition-colors">
                                    <button onClick={() => toggle(idx)} className="w-full flex items-center justify-between p-4 text-left" aria-expanded={!!expanded[idx]}>
                                        <div className="flex items-center gap-3">
                                            <span className="bg-rose-500/10 p-2 rounded-lg border border-rose-500/20 text-rose-400">{c.icon}</span>
                                            <span>
                                                <span className="block font-bold text-white text-sm">{c.title}</span>
                                                <span className="block text-xs text-zinc-500 mt-0.5 line-clamp-1">{c.description}</span>
                                            </span>
                                        </div>
                                        <span className="text-zinc-500 ml-4 flex-shrink-0">{expanded[idx] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}</span>
                                    </button>
                                    {expanded[idx] && (
                                        <div className="px-4 pb-4 border-t border-white/5 pt-3">
                                            <p className="text-sm text-zinc-400 mb-3">{c.description}</p>
                                            <div className="flex items-start gap-2 bg-rose-500/5 rounded-lg p-3 border border-rose-500/10">
                                                <CheckCircle2 size={14} className="text-rose-400 mt-0.5 flex-shrink-0" />
                                                <p className="text-sm text-zinc-300"><strong className="text-rose-300">Solution:</strong> {c.solution}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </Reveal>
                </section>

                {/* Appendix */}
                <Reveal>
                    <section className="mt-20 pt-10 border-t border-white/10">
                        <h2 className="font-mono text-xs text-zinc-500 uppercase tracking-[0.25em] mb-8">Appendix</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-sm font-bold text-zinc-200 mb-3">Technical sheet</h3>
                                <div className="space-y-0 text-sm">
                                    {[
                                        ['Author', 'Noé Rodríguez'],
                                        ['Institution', 'ESCOM — IPN'],
                                        ['Course', 'Digital Image Processing · 4th sem.'],
                                        ['Collaboration', 'Centro de Investigación de Cómputo'],
                                        ['Period', 'May – June 2026'],
                                        ['Role', 'Solo development'],
                                        ['Modules · Operations', '13 · 117'],
                                        ['MCP tools', '10 (FastMCP · mcp 1.27.2)'],
                                        ['Code', '~15,958 lines · Python'],
                                        ['Status', 'Functional · packaged with PyInstaller'],
                                    ].map(([k, v]) => (
                                        <div key={k} className="flex justify-between py-1.5 border-b border-white/5 last:border-0 gap-4">
                                            <span className="text-zinc-500 text-xs font-mono">{k}</span>
                                            <span className="text-zinc-300 text-xs text-right">{v}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-zinc-200 mb-3">Tech stack</h3>
                                <div className="flex flex-wrap gap-2 mb-8">
                                    {techStack.map((t) => (
                                        <span key={t.name} title={t.role} className="font-mono text-xs px-2.5 py-1 rounded-full bg-white/5 border border-white/5 text-zinc-400">{t.name}</span>
                                    ))}
                                </div>
                                <div className="flex items-center gap-4 bg-zinc-900/40 border border-white/8 rounded-xl p-4">
                                    <img src={imgSplash} alt="PhotoLab Pro splash screen" className="w-16 h-auto rounded-lg border border-white/10 flex-shrink-0" loading="lazy" />
                                    <p className="text-xs text-zinc-500 leading-relaxed border-l-2 border-rose-500/40 pl-4">
                                        From a classroom exercise to an AI-controllable image pipeline — 117 operations exposed to an
                                        LLM across three completed phases.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>
                </Reveal>

                {/* next */}
                <div className="pt-16 mt-10 border-t border-white/10 flex items-center justify-between">
                    <Link to="/project/4" className="font-mono text-sm text-zinc-400 hover:text-rose-400 transition-colors inline-flex items-center gap-2 group">
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> prev · data analysis
                    </Link>
                    <Link to="/project/6" className="font-mono text-sm text-zinc-400 hover:text-rose-400 transition-colors inline-flex items-center gap-2 group text-right">
                        next · rag engine <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Project5;
