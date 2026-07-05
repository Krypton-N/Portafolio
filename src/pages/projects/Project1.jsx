import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Wrench, Lightbulb, Target, Code, Layers, FlaskConical, ChevronDown, ChevronUp, Zap, AlertTriangle, CheckCircle2, BookOpen, Terminal, CircleCheck } from 'lucide-react';
import projectsData from '../../data/projects.json';
import Badge from '../../components/ui/Badge';
import SectionMarker from '../../components/ui/SectionMarker';
import Reveal from '../../components/motion/Reveal';

import antigravity_interface from '../../resources/projects/Project_AntigravityEDOs/antigravity_interface.webp';
import antigravity_results from '../../resources/projects/Project_AntigravityEDOs/antigravity_results.webp';
import architecture_diagram from '../../resources/projects/Project_AntigravityEDOs/architecture_diagram.webp';

/* ───────────────────────── building blocks (page-local) ───────────────────────── */

const Stat = ({ value, label }) => (
    <div className="flex flex-col">
        <span className="font-display text-2xl md:text-3xl font-bold text-white leading-none">{value}</span>
        <span className="font-mono text-[11px] text-zinc-500 mt-1 uppercase tracking-wider">{label}</span>
    </div>
);

/* A rendered display equation (mono, generous spacing) */
const Eq = ({ children, className = '' }) => (
    <span className={`font-mono text-zinc-100 ${className}`} style={{ fontVariantLigatures: 'none' }}>{children}</span>
);

/* Solution-form card (the three homogeneous cases) */
const FormCard = ({ label, children }) => (
    <div className="bg-zinc-950/50 rounded-lg p-4 border border-white/8 text-center">
        <p className="text-[10px] font-mono text-rose-400 uppercase tracking-wider mb-2">{label}</p>
        <Eq className="text-base text-zinc-200">{children}</Eq>
    </div>
);

const MethodCard = ({ n, title, children }) => (
    <div className="relative pl-9 pb-6 last:pb-0">
        <span className="absolute left-0 top-1 -translate-x-1/2 flex h-6 w-6 items-center justify-center rounded-full bg-rose-500/15 border border-rose-500/40 font-mono text-[11px] text-rose-300 font-bold">{n}</span>
        <h3 className="font-display text-lg font-bold text-white mb-2">{title}</h3>
        <div className="text-sm text-zinc-400 leading-relaxed space-y-3">{children}</div>
    </div>
);

const Project1 = () => {
    const project = projectsData.find(p => p.id === 1);
    const [expanded, setExpanded] = useState({});
    const toggle = (idx) => setExpanded((prev) => ({ ...prev, [idx]: !prev[idx] }));

    const techStack = [
        { name: 'Python 3.x', role: 'Core language' },
        { name: 'SymPy', role: 'Symbolic computation' },
        { name: 'NumPy', role: 'Matrix operations' },
        { name: 'PyQt6', role: 'Graphical interface' },
        { name: 'Matplotlib', role: 'LaTeX rendering' },
        { name: 'PyInstaller', role: '.exe packaging' },
    ];

    const retos = [
        { icon: <Code size={16} />, title: 'Robust equation parsing', description: 'Building a parser that accepts natural human notation. The problem: when `y` appeared alone (no derivatives), SymPy treated it as an UndefinedFunction, causing type errors.', solution: "Treat `y` as a Symbol during parsing, then substitute it with Function('y')(x) after expansion." },
        { icon: <Zap size={16} />, title: 'Resonance in Undetermined Coefficients', description: 'Correctly implementing the modification rule — multiplying by xˢ when the proposed yₚ already exists in y_c.', solution: 'Compare the critical root α + iβ of each g(x) term against the characteristic-polynomial roots, using multiplicity as the exponent s.' },
        { icon: <AlertTriangle size={16} />, title: 'Complex conjugate root pairs', description: 'SymPy returns both halves of a conjugate pair. Generating the real-valued solution (cos and sin) meant not processing the same pair twice.', solution: 'A "marking" mechanism with a set of processed roots prevents duplication.' },
        { icon: <FlaskConical size={16} />, title: 'Symbolic integration in Variation of Parameters', description: "Not every uₖ′ = Wₖ / W has a closed-form antiderivative; SymPy sometimes returns unevaluated Integral objects.", solution: 'try-except handling for these cases guarantees the application never crashes.' },
        { icon: <Layers size={16} />, title: 'LaTeX rendering inside PyQt6', description: 'Embedding Matplotlib inside PyQt6 as a LaTeX engine required configuring figures for a dark theme.', solution: 'FigureCanvasQTAgg backend with transparent background, white text, and adequate minimum sizes.' },
        { icon: <Target size={16} />, title: 'Responsive UI design', description: 'The first prototype squashed results and made LaTeX plots unreadable.', solution: 'A complete redesign with a global QScrollArea, cards with generous minimumHeight (180px), and professional QSS styling.' },
    ];

    const equations = [
        { type: 'Homogeneous — distinct real roots', eq: "y″ − 3y′ + 2y = 0", method: 'Characteristic Polynomial' },
        { type: 'Homogeneous — repeated roots', eq: "y″ − 4y′ + 4y = 0", method: 'Characteristic Polynomial' },
        { type: 'Homogeneous — complex roots', eq: "y″ + 4y = 0", method: 'Characteristic Polynomial' },
        { type: 'Non-homogeneous — polynomial', eq: "y″ − 3y′ + 2y = 2x² − 6x + 4", method: 'Undetermined Coefficients' },
        { type: 'Non-homogeneous — exponential', eq: "y″ − 3y′ + 2y = eˣ", method: 'Undetermined Coefficients' },
        { type: 'Non-homogeneous — tangent', eq: "y″ + y = tan(x)", method: 'Variation of Parameters' },
        { type: 'Cauchy-Euler, homogeneous', eq: "x²y″ − 2xy′ + 2y = 0", method: 'Cauchy-Euler' },
        { type: 'Cauchy-Euler, non-homogeneous', eq: "x²y″ − 2xy′ + 2y = x³", method: 'Cauchy-Euler' },
    ];

    const mejoras = [
        { t: 'Numerical methods', d: 'Runge-Kutta, Euler, and Adams-Bashforth for ODEs without a closed-form solution.' },
        { t: 'Solution plots', d: 'Visualize the solution function y(x) alongside the symbolic expression.' },
        { t: 'Export options', d: 'Export solution steps as PDF, image, or LaTeX file.' },
        { t: 'Systems of ODEs', d: 'Solve systems of linear differential equations using matrices.' },
        { t: 'Web version', d: 'Flask/Django + MathJax for browser access.' },
        { t: 'Non-linear ODEs', d: 'Research and implement methods for non-linear differential equations.' },
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
                            <p className="font-mono text-xs text-rose-400 uppercase tracking-[0.25em] mb-3">Antigravity · the symbolic engine</p>
                            <h1 className="font-display text-4xl md:text-6xl font-bold text-white leading-[0.98] tracking-tight">
                                It teaches a<br />computer to<br />
                                <span className="bg-gradient-to-r from-rose-500 to-rose-300 bg-clip-text text-transparent">solve calculus.</span>
                            </h1>
                            <p className="text-lg text-zinc-400 leading-relaxed mt-6 max-w-lg">
                                A desktop app that solves n-th order Ordinary Differential Equations automatically —
                                and shows every step, rendered in LaTeX.
                            </p>
                            <div className="flex flex-wrap gap-x-8 gap-y-4 mt-10 pt-6 border-t border-white/10">
                                <Stat value="1,200+" label="lines · python" />
                                <Stat value="5" label="solving methods" />
                                <Stat value="8" label="equation types" />
                            </div>
                        </div>

                        {/* Signature: the solver panel */}
                        <div className="lg:col-span-6">
                            <Reveal>
                                <div className="rounded-2xl border border-white/10 bg-zinc-950/70 backdrop-blur-md overflow-hidden shadow-2xl font-mono">
                                    <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/5 bg-white/[0.02]">
                                        <Terminal size={13} className="text-rose-400" />
                                        <span className="text-xs text-zinc-500">antigravity · solver</span>
                                    </div>
                                    <div className="p-5 space-y-4 text-sm">
                                        <div className="flex gap-3">
                                            <span className="text-rose-400 text-xs pt-0.5 select-none">in</span>
                                            <Eq className="text-zinc-100">y″ + 4y′ + 4y = e²ˣ</Eq>
                                        </div>
                                        <div className="text-[11px] text-zinc-600 border-y border-white/5 py-2 pl-9">
                                            characteristic&nbsp;polynomial&nbsp;→&nbsp;<Eq className="text-zinc-400">r² + 4r + 4 = 0</Eq>&nbsp;→&nbsp;<Eq className="text-rose-300">r = −2 (×2)</Eq>
                                        </div>
                                        <div className="flex gap-3">
                                            <span className="text-rose-400 text-xs pt-0.5 select-none">out</span>
                                            <Eq className="text-zinc-100">y = (C₁ + C₂x)e⁻²ˣ + ¹⁄₁₆ e²ˣ</Eq>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-rose-300 pl-9 pt-1">
                                            <CircleCheck size={13} /> verified
                                        </div>
                                    </div>
                                </div>
                            </Reveal>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">

                {/* ─── 01 · The Problem ───────────────────────────────── */}
                <section className="pt-12">
                    <SectionMarker index="01" label="The Problem" />
                    <Reveal>
                        <div className="space-y-4 text-zinc-300/90 leading-relaxed text-[15px]">
                            <p>
                                In the third semester of the AI Engineering program at ESCOM, the Differential Equations
                                course made one thing clear: solving high-order ODEs by hand is a long chain of precise
                                steps — characteristic polynomial, factoring roots, proposing particular solutions, the
                                modification rule, the Wronskian, symbolic integration, verification — with many chances
                                for a small mistake.
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-6 not-prose">
                                {[
                                    ['Wolfram Alpha', 'Powerful, but returns only the final result. Full versions are paid.'],
                                    ['Online calculators', 'Limited ODE types; rarely handle Cauchy-Euler or Variation of Parameters with full breakdowns.'],
                                    ['Manual solving', 'Slow and error-prone, especially across many exam exercises.'],
                                ].map(([t, d]) => (
                                    <div key={t} className="bg-zinc-900/40 rounded-xl p-4 border border-white/8">
                                        <h4 className="font-bold text-white text-sm mb-1.5">{t}</h4>
                                        <p className="text-xs text-zinc-500 leading-relaxed">{d}</p>
                                    </div>
                                ))}
                            </div>
                            <p className="border-l-2 border-rose-500/40 pl-5 text-zinc-300">
                                Antigravity doesn't just solve the equation — it <strong className="text-white">shows every intermediate
                                step</strong> (homogeneous, particular, general, verification), so a student can understand the process
                                and check their own work.
                            </p>
                        </div>
                    </Reveal>
                </section>

                {/* ─── 02 · The Five Methods ──────────────────────────── */}
                <section className="pt-20">
                    <SectionMarker index="02" label="The Solving Engine" />
                    <Reveal>
                        <p className="text-zinc-400 mb-10 max-w-2xl">
                            The core (<code className="font-mono text-sm text-rose-300 bg-rose-500/10 px-1.5 py-0.5 rounded">ode_solver.py</code>,
                            555 lines) selects the right method automatically. Five strategies, in order of preference:
                        </p>
                        <div className="relative border-l border-zinc-800 ml-3">
                            <MethodCard n="1" title="Equation Parser">
                                <p>Interprets equations typed in plain text. The user writes:</p>
                                <div className="bg-zinc-950/60 rounded-lg p-3 border border-white/8 text-center my-2">
                                    <Eq className="text-zinc-200">y″ + 4*y′ + 4*y = exp(2*x)</Eq>
                                </div>
                                <p>It normalizes the string, splits at <code className="text-rose-300">=</code>, replaces derivatives via regex (<code className="text-rose-300">y′′′ → Derivative(y, x, 3)</code>), parses with <code className="text-rose-300">sympy.parse_expr</code>, and classifies each term.</p>
                            </MethodCard>
                            <MethodCard n="2" title="Homogeneous Solution">
                                <p>The heart of the module: building and solving the <strong className="text-zinc-200">characteristic polynomial</strong>. <code className="text-rose-300">sympy.roots()</code> returns a root → multiplicity map, essential for three cases:</p>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3 not-prose">
                                    <FormCard label="Distinct real root">Cᵢ eʳˣ</FormCard>
                                    <FormCard label="Repeated real root">Cᵢ xʲ eʳˣ</FormCard>
                                    <FormCard label="Complex conjugates"><span className="text-sm">eᵅˣ(C cos βx + C sin βx)</span></FormCard>
                                </div>
                            </MethodCard>
                            <MethodCard n="3" title="Undetermined Coefficients">
                                <p>For a particular solution yₚ when g(x) is a polynomial, exponential, sine/cosine, or combination. It decomposes g(x), detects <strong className="text-zinc-200">resonance</strong> (comparing α + iβ to the characteristic roots), applies the modification rule (×xˢ) on a match, then substitutes and solves the resulting system.</p>
                            </MethodCard>
                            <MethodCard n="4" title="Variation of Parameters">
                                <p>The general fallback when Undetermined Coefficients fails (e.g. g(x) = tan x or sec x). It builds the <strong className="text-zinc-200">Wronskian</strong> W, computes det(W), applies Cramer's rule per column, integrates uₖ′ = det(Wₖ)/W, and assembles yₚ = Σ uₖ·yₖ.</p>
                            </MethodCard>
                            <MethodCard n="5" title="Cauchy-Euler">
                                <p>For aₙ·xⁿ·y⁽ⁿ⁾ + … + a₀·y = g(x), it auto-detects the form (each coefficient ∝ xᵏ), applies the substitution <Eq className="text-zinc-200">x = eᵗ</Eq> to get a constant-coefficient ODE, builds the operator polynomial with falling factorials, solves recursively, and substitutes t = ln(x) back.</p>
                            </MethodCard>
                        </div>
                    </Reveal>
                </section>

                {/* ─── 03 · Supported Equations ───────────────────────── */}
                <section className="pt-20">
                    <SectionMarker index="03" label="Supported Equations" />
                    <Reveal>
                        <div className="rounded-2xl overflow-hidden border border-white/8 bg-zinc-900/30">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-white/10 bg-white/[0.02]">
                                        <th className="text-left px-5 py-3 text-[11px] font-mono text-zinc-500 uppercase tracking-wider">Type</th>
                                        <th className="text-left px-5 py-3 text-[11px] font-mono text-zinc-500 uppercase tracking-wider">Example</th>
                                        <th className="text-left px-5 py-3 text-[11px] font-mono text-zinc-500 uppercase tracking-wider hidden md:table-cell">Method</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {equations.map((e) => (
                                        <tr key={e.type} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors">
                                            <td className="px-5 py-3 text-zinc-300 text-xs">{e.type}</td>
                                            <td className="px-5 py-3"><Eq className="text-rose-200 text-xs">{e.eq}</Eq></td>
                                            <td className="px-5 py-3 hidden md:table-cell">
                                                <span className="text-[11px] font-mono bg-rose-500/10 text-rose-300 px-2 py-1 rounded-full border border-rose-500/20 whitespace-nowrap">{e.method}</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                            {['Rendered original equation', 'Homogeneous solution (y_c)', 'Particular solution (yₚ)', 'General solution', 'Method used', 'Automatic verification'].map((f) => (
                                <span key={f} className="flex items-center gap-2 text-sm text-zinc-400">
                                    <span className="w-1.5 h-1.5 bg-rose-500 rounded-full" /> {f}
                                </span>
                            ))}
                        </div>
                    </Reveal>
                </section>

                {/* ─── 04 · Architecture & Interface ──────────────────── */}
                <section className="pt-20">
                    <SectionMarker index="04" label="Architecture & Interface" />
                    <Reveal>
                        <p className="text-zinc-400 mb-6 max-w-2xl">A modular layered architecture — solving logic, utilities, and presentation cleanly separated.</p>

                        {/* file tree */}
                        <div className="bg-zinc-950/60 rounded-xl p-5 border border-white/8 font-mono text-sm mb-8">
                            <p className="text-rose-400 text-[11px] uppercase tracking-wider mb-3 font-sans font-bold">File structure</p>
                            <div className="space-y-1 text-zinc-400">
                                <p className="text-zinc-300">Programa_EDOS/</p>
                                <p className="pl-4">├── antigravity_core/</p>
                                <p className="pl-8">├── <span className="text-rose-200">main.py</span> <span className="text-zinc-600 text-xs">— entry point</span></p>
                                <p className="pl-8">├── <span className="text-rose-200">ode_solver.py</span> <span className="text-zinc-600 text-xs">— solving engine · 555 lines</span></p>
                                <p className="pl-8">├── <span className="text-rose-200">gui.py</span> <span className="text-zinc-600 text-xs">— PyQt6 GUI · 519 lines</span></p>
                                <p className="pl-8">├── <span className="text-rose-200">utils.py</span> <span className="text-zinc-600 text-xs">— parsing & LaTeX · 127 lines</span></p>
                                <p className="pl-8">└── dist/<span className="text-zinc-300"> Antigravity.exe</span> <span className="text-zinc-600 text-xs">— ~100 MB</span></p>
                            </div>
                        </div>

                        {/* GUI features */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                            {[
                                ['Virtual math keyboard', 'Functions, numpad, and operators in three sections.'],
                                ['Real-time LaTeX preview', 'The equation rendered live inside a Matplotlib widget.'],
                                ['Dynamic condition fields', 'Initial-condition inputs generated from the ODE order.'],
                                ['Expandable result cards', 'Each solution step with highlighted titles and LaTeX.'],
                            ].map(([t, d]) => (
                                <div key={t} className="flex items-start gap-3 bg-zinc-900/40 rounded-xl p-4 border border-white/8">
                                    <CheckCircle2 size={16} className="text-rose-400 mt-0.5 flex-shrink-0" />
                                    <p className="text-sm text-zinc-400"><strong className="text-zinc-200">{t}</strong> — {d}</p>
                                </div>
                            ))}
                        </div>

                        {/* gallery */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {[
                                [antigravity_interface, 'Main interface'],
                                [antigravity_results, 'Results panel'],
                                [architecture_diagram, 'Architecture'],
                            ].map(([src, label]) => (
                                <figure key={label} className="rounded-xl overflow-hidden border border-white/8 bg-zinc-950/50 group">
                                    <div className="px-3 py-2 border-b border-white/5">
                                        <span className="text-[11px] font-mono text-zinc-500">{label}</span>
                                    </div>
                                    <img src={src} alt={label} className="w-full h-auto group-hover:scale-[1.03] transition-transform duration-500" loading="lazy" />
                                </figure>
                            ))}
                        </div>
                    </Reveal>
                </section>

                {/* ─── 05 · Technical Challenges ──────────────────────── */}
                <section className="pt-20">
                    <SectionMarker index="05" label="Technical Challenges" />
                    <Reveal>
                        <div className="space-y-3">
                            {retos.map((reto, idx) => (
                                <div key={idx} className="bg-zinc-900/40 border border-white/8 rounded-xl overflow-hidden hover:border-rose-500/20 transition-colors">
                                    <button onClick={() => toggle(idx)} className="w-full flex items-center justify-between p-4 text-left" aria-expanded={!!expanded[idx]}>
                                        <div className="flex items-center gap-3">
                                            <span className="bg-rose-500/10 p-2 rounded-lg border border-rose-500/20 text-rose-400">{reto.icon}</span>
                                            <span>
                                                <span className="block font-bold text-white text-sm">{reto.title}</span>
                                                <span className="block text-xs text-zinc-500 mt-0.5 line-clamp-1">{reto.description}</span>
                                            </span>
                                        </div>
                                        <span className="text-zinc-500 ml-4 flex-shrink-0">{expanded[idx] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}</span>
                                    </button>
                                    {expanded[idx] && (
                                        <div className="px-4 pb-4 border-t border-white/5 pt-3">
                                            <p className="text-sm text-zinc-400 mb-3">{reto.description}</p>
                                            <div className="flex items-start gap-2 bg-rose-500/5 rounded-lg p-3 border border-rose-500/10">
                                                <Wrench size={14} className="text-rose-400 mt-0.5 flex-shrink-0" />
                                                <p className="text-sm text-zinc-300"><strong className="text-rose-300">Solution:</strong> {reto.solution}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </Reveal>
                </section>

                {/* ─── 06 · Roadmap & Close ───────────────────────────── */}
                <section className="pt-20">
                    <SectionMarker index="06" label="Roadmap" />
                    <Reveal>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {mejoras.map((m) => (
                                <div key={m.t} className="bg-zinc-900/40 border border-white/8 rounded-xl p-4 hover:border-rose-500/20 transition-colors group">
                                    <div className="flex items-center gap-2 mb-1.5">
                                        <Lightbulb size={14} className="text-rose-400" />
                                        <h4 className="font-bold text-white text-sm">{m.t}</h4>
                                    </div>
                                    <p className="text-xs text-zinc-500 leading-relaxed">{m.d}</p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-10 rounded-2xl border border-rose-500/15 bg-rose-500/[0.03] p-7">
                            <BookOpen size={20} className="text-rose-400 mb-3" />
                            <p className="text-zinc-300 leading-relaxed">
                                Building Antigravity fused two things I'm passionate about: programming and mathematics.
                                It forced me to understand each ODE method not as a formula to memorize, but as an
                                algorithm to implement.
                            </p>
                            <p className="text-zinc-400 mt-3 text-sm border-l-2 border-rose-500/40 pl-4">
                                It isn't just a program that solves differential equations — it's evidence that I understood
                                them well enough to teach a computer how.
                            </p>
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
                                        ['Author', 'Noe Rodriguez'],
                                        ['Institution', 'ESCOM — IPN'],
                                        ['Course', 'Differential Equations · 3rd sem.'],
                                        ['Role', 'Solo development'],
                                        ['Code', '~1,200+ lines · Python'],
                                        ['Build', 'Antigravity.exe · ~100 MB'],
                                        ['Status', 'Functional · packaged'],
                                    ].map(([k, v]) => (
                                        <div key={k} className="flex justify-between py-1.5 border-b border-white/5 last:border-0">
                                            <span className="text-zinc-500 text-xs font-mono">{k}</span>
                                            <span className="text-zinc-300 text-xs text-right">{v}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-zinc-200 mb-3">Tech stack</h3>
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {techStack.map((t) => (
                                        <span key={t.name} title={t.role} className="font-mono text-xs px-2.5 py-1 rounded-full bg-white/5 border border-white/5 text-zinc-400">{t.name}</span>
                                    ))}
                                </div>
                                <h3 className="text-sm font-bold text-zinc-200 mb-3">Methodology</h3>
                                <div className="space-y-2 text-xs text-zinc-500">
                                    <p><span className="font-mono text-rose-400">1 ·</span> Solving engine — full math logic, console-validated.</p>
                                    <p><span className="font-mono text-rose-400">2 ·</span> GUI — prototype → dark-theme redesign with expandable cards.</p>
                                    <p><span className="font-mono text-rose-400">3 ·</span> Integration & packaging — wiring, error handling, PyInstaller → .exe.</p>
                                </div>
                            </div>
                        </div>
                    </section>
                </Reveal>

                {/* next */}
                <div className="pt-16 mt-10 border-t border-white/10 flex items-center justify-between">
                    <Link to="/project/6" className="font-mono text-sm text-zinc-400 hover:text-rose-400 transition-colors inline-flex items-center gap-2 group">
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> prev · rag engine
                    </Link>
                    <Link to="/project/3" className="font-mono text-sm text-zinc-400 hover:text-rose-400 transition-colors inline-flex items-center gap-2 group text-right">
                        next · hybrid rag <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Project1;
