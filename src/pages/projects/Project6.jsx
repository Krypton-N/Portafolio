import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    ArrowLeft, Search, Database, Layers, GitMerge, Sparkles, ShieldOff,
    Quote, Target, Route, Server, Gauge, CheckCircle2, Circle, ChevronDown, ChevronUp,
} from 'lucide-react';
import projectsData from '../../data/projects.json';
import Badge from '../../components/ui/Badge';
import SectionMarker from '../../components/ui/SectionMarker';
import Reveal from '../../components/motion/Reveal';

/* ───────────────────────── building blocks (page-local) ───────────────────────── */

const Stat = ({ value, label }) => (
    <div className="flex flex-col">
        <span className="font-display text-2xl md:text-3xl font-bold text-white leading-none">{value}</span>
        <span className="font-mono text-[11px] text-zinc-500 mt-1 uppercase tracking-wider">{label}</span>
    </div>
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

/* One layer in the anti-hallucination stack */
const Layer = ({ n, icon, title, description }) => (
    <div className="rounded-xl border border-white/8 bg-zinc-900/40 p-5 flex gap-4">
        <div className="flex-shrink-0">
            <span className="w-8 h-8 rounded-full border border-rose-500/40 bg-rose-500/10 text-rose-400 flex items-center justify-center font-mono text-xs">{n}</span>
        </div>
        <div>
            <div className="flex items-center gap-2 mb-1.5">
                {icon}
                <h4 className="font-bold text-white text-sm">{title}</h4>
            </div>
            <p className="text-xs text-zinc-500 leading-relaxed">{description}</p>
        </div>
    </div>
);

/* A single roadmap milestone — shipped or planned */
const Milestone = ({ done, title, note }) => (
    <div className="flex gap-3 items-start">
        {done
            ? <CheckCircle2 size={16} className="text-rose-400 mt-0.5 flex-shrink-0" />
            : <Circle size={16} className="text-zinc-700 mt-0.5 flex-shrink-0" />}
        <div>
            <p className={`text-sm font-medium ${done ? 'text-white' : 'text-zinc-500'}`}>{title}</p>
            <p className="text-xs text-zinc-500 mt-0.5 leading-relaxed">{note}</p>
        </div>
    </div>
);

const Project6 = () => {
    const project = projectsData.find(p => p.id === 6);
    const [expanded, setExpanded] = useState({});
    const toggle = (idx) => setExpanded((prev) => ({ ...prev, [idx]: !prev[idx] }));

    const stack = [
        { name: 'BGE-M3', role: 'Dense + sparse embeddings, one pass' },
        { name: 'bge-reranker-v2-m3', role: 'Cross-encoder reranker' },
        { name: 'Qdrant', role: 'Vector DB · named vectors · server-side RRF' },
        { name: 'Semantic router', role: 'Chit-chat vs. document query' },
        { name: 'LLM gateway', role: 'Model-agnostic · one-line provider swap' },
        { name: 'FastAPI', role: 'Streaming API (SSE)' },
        { name: 'React + Vite', role: 'Chat UI · clickable citations' },
        { name: 'Docker', role: 'Qdrant, disk-backed for low RAM use' },
    ];

    const retrievalCompare = [
        {
            title: 'Dense retrieval',
            description: 'Embeds the query into the same vector space as every chunk. Finds passages that mean the same thing, even with completely different wording — paraphrases, synonyms, related concepts.',
            weak: 'Misses exact literal tokens: error codes, identifiers, article numbers.',
        },
        {
            title: 'Sparse retrieval (BM25)',
            description: 'Classic lexical scoring. Nails exact, rare tokens — a function name, a legal article number, an error code — that a dense vector might blur past.',
            weak: 'Blind to synonyms and paraphrasing; a reworded question can miss a perfect match.',
        },
    ];

    const roadmap = [
        { done: true, title: 'Ingestion pipeline', note: 'Structure-aware parsing → structural + semantic chunking → dense + sparse embedding in one pass → indexed in Qdrant with full metadata.' },
        { done: true, title: 'Hybrid retrieval', note: 'Dense + sparse prefetch, fused server-side via Reciprocal Rank Fusion (k=60), then reranked by a cross-encoder down to the top 8.' },
        { done: true, title: 'Grounded generation', note: 'Citation-forced prompting, a post-generation validator, and a hard abstention gate below a calibrated confidence threshold.' },
        { done: true, title: 'Semantic routing + API/UI', note: 'Chit-chat is filtered before it burns a retrieval pass; a FastAPI + React interface streams the answer with clickable citation chips.' },
        { done: false, title: 'MCP server', note: 'Expose search/answer as tools so any MCP-aware agent (e.g. Claude Desktop/Code) can query the corpus directly.' },
        { done: false, title: 'Automated RAGAS evaluation', note: 'A versioned golden set scored on faithfulness, answer relevancy, and context precision — turning "it works" into a tracked number.' },
    ];

    return (
        <div className="relative z-10">
            {/* ─── Hero ─────────────────────────────────────────────── */}
            <header className="pt-28 pb-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <Link to="/" className="inline-flex items-center text-zinc-400 hover:text-rose-400 mb-10 transition-colors group font-mono text-sm">
                        <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                        back to work
                    </Link>

                    <div className="flex flex-wrap gap-2 mb-5">
                        {project.tags.map((tag, idx) => <Badge key={idx}>{tag}</Badge>)}
                    </div>

                    <p className="font-mono text-xs text-rose-400 uppercase tracking-[0.25em] mb-3">Retrieval Engineering · Zero Hallucination</p>
                    <h1 className="font-display text-4xl md:text-6xl font-bold text-white leading-[0.98] tracking-tight">
                        Hybrid RAG,<br /><span className="bg-gradient-to-r from-rose-500 to-rose-300 bg-clip-text text-transparent">engineered not to lie.</span>
                    </h1>
                    <p className="text-lg text-zinc-400 leading-relaxed mt-6 max-w-2xl">
                        {project.description}
                    </p>

                    <div className="flex flex-wrap gap-x-10 gap-y-4 mt-10 pt-6 border-t border-white/10">
                        <Stat value="100→8" label="retrieval funnel" />
                        <Stat value="<200ms" label="query latency (GPU)" />
                        <Stat value="3" label="anti-hallucination layers" />
                    </div>
                </div>
            </header>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">

                {/* ─── 01 · Why grounding ─────────────────────────────── */}
                <section className="pt-12">
                    <SectionMarker index="01" label="Why Retrieval, Not Memory" />
                    <Reveal>
                        <p className="text-zinc-400 leading-relaxed max-w-2xl mb-8">
                            An LLM answering from memory has two failure modes: it doesn't know your private documents, and it
                            invents with confidence when it doesn't know. RAG fixes both by handing the model the right passages
                            <em className="text-zinc-300 not-italic"> at query time</em> and requiring it to answer from those
                            passages only — never from what it half-remembers.
                        </p>
                        <div className="rounded-2xl border border-white/8 bg-zinc-950/40 p-6 sm:p-8">
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 font-mono text-sm">
                                <span className="px-4 py-2 rounded-lg bg-zinc-900/60 border border-white/10 text-zinc-300">question</span>
                                <span className="text-rose-400 text-xs">──▶</span>
                                <span className="px-4 py-2 rounded-lg border border-rose-500/30 bg-rose-500/[0.06] text-rose-300">[1] retrieve</span>
                                <span className="text-rose-400 text-xs">──▶</span>
                                <span className="px-4 py-2 rounded-lg border border-rose-500/30 bg-rose-500/[0.06] text-rose-300">[2] generate, citing</span>
                            </div>
                        </div>
                        <p className="text-xs text-zinc-600 font-mono mt-4 text-center">
                            all the engineering weight sits on step [1] — retrieve garbage, generate garbage.
                        </p>
                    </Reveal>
                </section>

                {/* ─── 02 · Architecture ──────────────────────────────── */}
                <section className="pt-20">
                    <SectionMarker index="02" label="Architecture — The Funnel" />
                    <Reveal>
                        <p className="text-zinc-400 mb-8 max-w-2xl">
                            A wide-to-narrow pipeline: start with many cheap candidates, spend the expensive compute only on the
                            few that make it through. Every question runs this exact path.
                        </p>
                        <div className="rounded-2xl border border-white/8 bg-zinc-950/40 p-6 sm:p-10">
                            <div className="max-w-md mx-auto space-y-3">
                                <Node icon={Search} title="Semantic Router" subtitle="chit-chat vs. document query" />
                                <p className="text-center text-zinc-700 font-mono text-xs">│ documental</p>
                                <Node icon={Sparkles} title="Embed" subtitle="dense + sparse, one BGE-M3 pass" />
                                <p className="text-center text-zinc-700 font-mono text-xs">│ fan-out</p>
                                <div className="grid grid-cols-2 gap-3">
                                    <Node icon={Database} title="Dense" subtitle="Qdrant · top 100" accent />
                                    <Node icon={Layers} title="Sparse" subtitle="BM25 · top 100" accent />
                                </div>
                                <p className="text-center text-zinc-700 font-mono text-xs">│ server-side RRF, k=60</p>
                                <Node icon={GitMerge} title="Reranker" subtitle="cross-encoder · 50 → top 8" />
                                <p className="text-center text-zinc-700 font-mono text-xs">│ best score ≥ threshold?</p>
                                <Node icon={ShieldOff} title="Abstention Gate" subtitle="below threshold → no LLM call" accent />
                                <p className="text-center text-zinc-700 font-mono text-xs">│</p>
                                <Node icon={Quote} title="Generation + Citations" subtitle="cites every claim, validated post-hoc" />
                            </div>
                        </div>
                    </Reveal>
                </section>

                {/* ─── 03 · Anti-hallucination ─────────────────────────── */}
                <section className="pt-20">
                    <SectionMarker index="03" label="Three Anti-Hallucination Layers" />
                    <Reveal>
                        <p className="text-zinc-400 mb-6 max-w-2xl leading-relaxed">
                            Not a prompt asking the model nicely — three concrete mechanisms, stacked, each closing a different
                            way a wrong answer could slip through.
                        </p>
                        <div className="space-y-3">
                            <Layer n="1" icon={<ShieldOff size={15} className="text-rose-400" />} title="Hard abstention before generation"
                                description="If the reranked top score falls under a calibrated confidence threshold, the LLM is never invoked at all. A deterministic 'not enough evidence' response goes out instead — the model has zero opportunity to invent." />
                            <Layer n="2" icon={<Quote size={15} className="text-rose-400" />} title="Mandatory citation + validation"
                                description="The generation prompt requires every claim to cite a source passage by ID. A post-generation validator checks each citation actually exists among the retrieved chunks — a fabricated reference gets discarded and flagged." />
                            <Layer n="3" icon={<Target size={15} className="text-rose-400" />} title="Context fidelity"
                                description="Even with evidence over the threshold, the model is instructed to answer only what the retrieved passages say — including admitting when it has a reference to something but not its full text, rather than filling the gap." />
                        </div>
                    </Reveal>
                </section>

                {/* ─── 04 · Why hybrid ─────────────────────────────────── */}
                <section className="pt-20">
                    <SectionMarker index="04" label="Why Hybrid Retrieval" />
                    <Reveal>
                        <p className="text-zinc-400 mb-6 max-w-2xl leading-relaxed">
                            Dense and sparse retrieval fail in opposite ways, which is exactly why running both and fusing the
                            results beats either one alone.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {retrievalCompare.map((r) => (
                                <div key={r.title} className="bg-zinc-900/40 rounded-xl p-5 border border-white/8">
                                    <h4 className="font-bold text-white text-sm mb-2">{r.title}</h4>
                                    <p className="text-xs text-zinc-400 leading-relaxed mb-3">{r.description}</p>
                                    <p className="text-xs text-zinc-600 leading-relaxed border-l-2 border-rose-500/30 pl-3">{r.weak}</p>
                                </div>
                            ))}
                        </div>
                        <p className="text-xs text-zinc-600 font-mono mt-4">
                            fused server-side in Qdrant via Reciprocal Rank Fusion (k=60) — no hand-tuned blend weights per corpus.
                        </p>
                    </Reveal>
                </section>

                {/* ─── 05 · Stack ──────────────────────────────────────── */}
                <section className="pt-20">
                    <SectionMarker index="05" label="Stack" />
                    <Reveal>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {stack.map((s) => (
                                <div key={s.name} className="flex items-center justify-between gap-4 bg-zinc-900/40 border border-white/8 rounded-xl px-4 py-3">
                                    <span className="font-mono text-sm text-rose-300">{s.name}</span>
                                    <span className="text-xs text-zinc-500 text-right">{s.role}</span>
                                </div>
                            ))}
                        </div>
                    </Reveal>
                </section>

                {/* ─── 06 · Status & Roadmap ───────────────────────────── */}
                <section className="pt-20">
                    <SectionMarker index="06" label="Status & Roadmap" />
                    <Reveal>
                        <div className="rounded-2xl border border-white/8 bg-zinc-950/40 p-6 sm:p-8">
                            <button onClick={() => toggle('roadmap')} className="w-full flex items-center justify-between mb-1" aria-expanded={!!expanded.roadmap}>
                                <div className="flex items-center gap-3">
                                    <Gauge size={18} className="text-rose-400" />
                                    <span className="font-bold text-white text-sm">Core pipeline runs end-to-end</span>
                                </div>
                                <span className="text-zinc-500 flex-shrink-0">{expanded.roadmap ? <ChevronUp size={16} /> : <ChevronDown size={16} />}</span>
                            </button>
                            <p className="text-xs text-zinc-500 ml-8 mb-1">ingestion → hybrid retrieval → grounded generation → routing → API/UI are built and working locally.</p>
                            {expanded.roadmap && (
                                <div className="mt-6 space-y-4 border-t border-white/5 pt-6">
                                    {roadmap.map((m, idx) => <Milestone key={idx} {...m} />)}
                                </div>
                            )}
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
                                        ['Domain', 'Legacy source code + long-form regulatory text'],
                                        ['Retrieval', 'Hybrid — dense (BGE-M3) + sparse (BM25), RRF fusion'],
                                        ['Reranking', 'Cross-encoder, 100 → 50 → top 8'],
                                        ['Grounding', 'Hard abstention · forced citations · fidelity checks'],
                                        ['LLM layer', 'Model-agnostic gateway, swappable via config'],
                                        ['Status', 'Core pipeline functional · MCP + automated eval next'],
                                    ].map(([k, v]) => (
                                        <div key={k} className="flex justify-between py-1.5 border-b border-white/5 last:border-0 gap-4">
                                            <span className="text-zinc-500 text-xs font-mono">{k}</span>
                                            <span className="text-zinc-300 text-xs text-right">{v}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-zinc-200 mb-3">Design principle</h3>
                                <div className="flex items-start gap-3 bg-zinc-900/40 border border-white/8 rounded-xl p-4">
                                    <Route size={16} className="text-rose-400 mt-0.5 flex-shrink-0" />
                                    <p className="text-xs text-zinc-500 leading-relaxed">
                                        Every piece scales by swapping its deployment, not by rewriting code: the vector store, the
                                        embedder, and the reranker all sit behind the same interface locally as they would in a
                                        clustered, production deployment.
                                    </p>
                                </div>
                                <div className="flex items-center gap-4 bg-zinc-900/40 border border-white/8 rounded-xl p-4 mt-4">
                                    <Server size={22} className="text-rose-400 flex-shrink-0" />
                                    <p className="text-xs text-zinc-500 leading-relaxed border-l-2 border-rose-500/40 pl-4">
                                        Runs fully local — embeddings, reranking, and the vector store never leave the machine. Only
                                        the final answer drafting calls out to an LLM API.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>
                </Reveal>

                {/* next */}
                <div className="pt-16 mt-10 border-t border-white/10 flex items-center justify-between">
                    <Link to="/project/5" className="font-mono text-sm text-zinc-400 hover:text-rose-400 transition-colors inline-flex items-center gap-2 group">
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> prev · photolab pro
                    </Link>
                    <Link to="/project/1" className="font-mono text-sm text-zinc-400 hover:text-rose-400 transition-colors inline-flex items-center gap-2 group text-right">
                        next · ode solver <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Project6;
