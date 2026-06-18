import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, FlaskConical, Database, Layers, Search, GitMerge, Sparkles, Gauge } from 'lucide-react';
import projectsData from '../../data/projects.json';
import Badge from '../../components/ui/Badge';
import SectionMarker from '../../components/ui/SectionMarker';
import Reveal from '../../components/motion/Reveal';

/* ───────────────────────── building blocks (page-local) ───────────────────────── */

const Node = ({ icon, title, subtitle, accent }) => {
    const Icon = icon;
    return (
        <div className={`rounded-xl border p-4 text-center backdrop-blur-sm ${accent ? 'border-rose-500/30 bg-rose-500/[0.06]' : 'border-white/8 bg-zinc-900/50'}`}>
            <Icon size={18} className={`mx-auto mb-2 ${accent ? 'text-rose-400' : 'text-zinc-400'}`} />
            <p className="text-sm font-medium text-white">{title}</p>
            {subtitle && <p className="font-mono text-[11px] text-zinc-500 mt-0.5">{subtitle}</p>}
        </div>
    );
};

const Metric = ({ label, fill }) => (
    <div>
        <div className="flex items-center justify-between mb-1.5">
            <span className="text-sm text-zinc-300">{label}</span>
            <span className="font-mono text-xs text-zinc-600">pending</span>
        </div>
        <div className="h-2 rounded-full bg-zinc-800 overflow-hidden">
            <div className="h-full rounded-full bg-gradient-to-r from-rose-500/40 to-rose-500/10" style={{ width: `${fill}%` }} />
        </div>
    </div>
);

const Project3 = () => {
    const project = projectsData.find(p => p.id === 3);

    return (
        <div className="relative z-10">
            {/* ─── Hero ─────────────────────────────────────────────── */}
            <header className="pt-28 pb-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <Link to="/" className="inline-flex items-center text-zinc-400 hover:text-rose-400 mb-10 transition-colors group font-mono text-sm">
                        <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                        back to work
                    </Link>

                    <div className="flex flex-wrap items-center gap-3 mb-5">
                        {project.tags.map((tag, idx) => <Badge key={idx}>{tag}</Badge>)}
                        <span className="inline-flex items-center gap-2 font-mono text-[11px] text-rose-300 px-3 py-1 rounded-full border border-rose-500/30 bg-rose-500/5">
                            <span className="relative flex h-1.5 w-1.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
                                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-rose-500" />
                            </span>
                            in active development
                        </span>
                    </div>

                    <p className="font-mono text-xs text-rose-400 uppercase tracking-[0.25em] mb-3">Retrieval Lab</p>
                    <h1 className="font-display text-4xl md:text-6xl font-bold text-white leading-[0.98] tracking-tight">
                        Hybrid RAG,<br /><span className="bg-gradient-to-r from-rose-500 to-rose-300 bg-clip-text text-transparent">measured.</span>
                    </h1>
                    <p className="text-lg text-zinc-400 leading-relaxed mt-6 max-w-2xl">
                        {project.description} A built-in RAGAS evaluator scores every answer, so retrieval quality is a
                        number — not a vibe.
                    </p>
                </div>
            </header>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">

                {/* ─── 01 · Architecture ──────────────────────────────── */}
                <section className="pt-12">
                    <SectionMarker index="01" label="The Pipeline" />
                    <Reveal>
                        <p className="text-zinc-400 mb-10 max-w-2xl">{project.longDescription}</p>

                        {/* fusion diagram */}
                        <div className="rounded-2xl border border-white/8 bg-zinc-950/40 p-6 sm:p-10">
                            <div className="max-w-md mx-auto space-y-3">
                                <Node icon={Search} title="Query" subtitle="user question" />
                                <p className="text-center text-zinc-700 font-mono text-xs">│ fan-out</p>
                                <div className="grid grid-cols-2 gap-3">
                                    <Node icon={Database} title="Dense" subtitle="FAISS · embeddings" accent />
                                    <Node icon={Layers} title="Sparse" subtitle="BM25 · TF-IDF" accent />
                                </div>
                                <p className="text-center text-zinc-700 font-mono text-xs">│ merge</p>
                                <Node icon={GitMerge} title="Reranker" subtitle="fuse + prioritize" />
                                <p className="text-center text-zinc-700 font-mono text-xs">│</p>
                                <Node icon={Sparkles} title="LLM Generation" subtitle="LangChain prompts" />
                                <p className="text-center text-zinc-700 font-mono text-xs">│ score</p>
                                <Node icon={Gauge} title="RAGAS Evaluator" subtitle="→ metrics.json" accent />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
                            {[
                                ['Dense retrieval', 'Semantic search over embeddings, indexed with FAISS for fast nearest-neighbor lookup.'],
                                ['Sparse retrieval', 'Classic keyword scoring (BM25 / TF-IDF), fused with the dense results through a reranking stage.'],
                                ['Automated eval', 'RAGAS scores faithfulness, answer relevancy, and context precision per query.'],
                            ].map(([t, d]) => (
                                <div key={t} className="bg-zinc-900/40 rounded-xl p-4 border border-white/8">
                                    <h4 className="font-bold text-white text-sm mb-1.5">{t}</h4>
                                    <p className="text-xs text-zinc-500 leading-relaxed">{d}</p>
                                </div>
                            ))}
                        </div>
                    </Reveal>
                </section>

                {/* ─── 02 · Evaluation ────────────────────────────────── */}
                <section className="pt-20">
                    <SectionMarker index="02" label="Evaluation · RAGAS" />
                    <Reveal>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                            <div>
                                <p className="text-zinc-400 leading-relaxed mb-4">
                                    Most RAG demos stop at "it answered." This one runs an LLM-as-judge evaluation after every
                                    generation, turning retrieval quality into <strong className="text-zinc-200">three quantitative metrics</strong>
                                    stored per query for traceability.
                                </p>
                                <p className="font-mono text-xs text-zinc-600">
                                    live numbers land here once the benchmark suite is finalized.
                                </p>
                            </div>
                            <div className="rounded-2xl border border-white/8 bg-zinc-900/40 p-6 space-y-5">
                                <div className="flex items-center justify-between">
                                    <span className="font-mono text-xs text-zinc-500">ragas · per-query</span>
                                    <FlaskConical size={14} className="text-rose-400" />
                                </div>
                                <Metric label="Faithfulness" fill={62} />
                                <Metric label="Answer relevancy" fill={48} />
                                <Metric label="Context precision" fill={71} />
                            </div>
                        </div>
                    </Reveal>
                </section>

                {/* ─── 03 · Status ────────────────────────────────────── */}
                <section className="pt-20">
                    <SectionMarker index="03" label="Status" />
                    <Reveal>
                        <div className="rounded-2xl border border-rose-500/20 bg-rose-500/[0.03] p-8 text-center">
                            <div className="w-14 h-14 mx-auto rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center mb-4">
                                <FlaskConical size={26} className="text-rose-400" />
                            </div>
                            <h3 className="font-display text-xl font-bold text-white mb-2">In active development</h3>
                            <p className="text-zinc-400 text-sm max-w-xl mx-auto leading-relaxed">
                                The pipeline runs; the benchmark suite and final metrics are being assembled. The full
                                technical breakdown — retrieval ablations, RAGAS scores, and a reproducible eval harness —
                                will be published here once it reaches a stable milestone.
                            </p>
                            <div className="flex flex-wrap justify-center gap-2 mt-6">
                                {project.tags.map((t) => (
                                    <span key={t} className="font-mono text-xs px-2.5 py-1 rounded-full bg-white/5 border border-white/5 text-zinc-400">{t}</span>
                                ))}
                            </div>
                        </div>
                    </Reveal>
                </section>

                {/* next */}
                <div className="pt-16 mt-10 border-t border-white/10 flex items-center justify-between">
                    <Link to="/project/1" className="font-mono text-sm text-zinc-400 hover:text-rose-400 transition-colors inline-flex items-center gap-2 group">
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> prev · ode solver
                    </Link>
                    <Link to="/" className="font-mono text-sm text-zinc-400 hover:text-rose-400 transition-colors inline-flex items-center gap-2 group text-right">
                        all work <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Project3;
