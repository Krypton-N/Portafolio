import React, { useState } from 'react';
import { Sparkles, Zap, CornerDownLeft } from 'lucide-react';
import SectionMarker from '../ui/SectionMarker';
import Reveal from '../motion/Reveal';

const SAMPLE_QUESTIONS = [
    'What has Noe built with computer vision?',
    'Show me the RAG project',
    'What did the attention-span study find?',
];

/**
 * Act 3 — Live ("Ask my portfolio"). For now this is the opt-in shell only:
 * it presents the inference UI and an explicit "load model" gate, but does not
 * run anything. Phase 3 wires a client-side retrieval model here behind a lazy
 * boundary — load it where `armed` becomes true (see the marked hook below).
 * (VisualSystem.md §4 · Act 3; RedesignPlan Phase 3.)
 */
const LiveModule = () => {
    const [armed, setArmed] = useState(false);

    const arm = () => {
        setArmed(true);
        // PHASE 3 HOOK: lazy-load the retrieval model + embeddings here, e.g.
        //   const RagDemo = React.lazy(() => import('./rag/RagDemo'));
        // and render it inside a <Suspense> below once ready. Opt-in already
        // gated by this click, so nothing ships until the user asks for it.
    };

    return (
        <section className="py-24 lg:py-32">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionMarker index="02" label="Runtime" id="live" />

                <Reveal>
                    <div className="text-center max-w-2xl mx-auto mb-10">
                        <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
                            Ask my portfolio<span className="text-rose-500">.</span>
                        </h2>
                        <p className="text-zinc-400 leading-relaxed">
                            Instead of telling you I can build retrieval systems, I'd rather show you one.
                            A semantic search model runs <span className="text-zinc-200">entirely in your browser</span> —
                            no server, no tracking, loaded only if you ask.
                        </p>
                    </div>
                </Reveal>

                {/* Console panel */}
                <Reveal delay={0.1}>
                    <div className="rounded-2xl border border-white/10 bg-zinc-950/60 backdrop-blur-md overflow-hidden shadow-2xl">
                        {/* Title bar */}
                        <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/5 bg-white/[0.02]">
                            <div className="flex items-center gap-2 font-mono text-xs text-zinc-500">
                                <Sparkles size={13} className="text-rose-400" />
                                portfolio-rag
                            </div>
                            <span className="font-mono text-[11px] text-zinc-600">
                                {armed ? 'model: loading…' : 'model: idle'}
                            </span>
                        </div>

                        {/* Body */}
                        <div className="p-6 sm:p-8">
                            {/* Sample questions */}
                            <div className="flex flex-wrap gap-2 mb-6">
                                {SAMPLE_QUESTIONS.map((q) => (
                                    <span
                                        key={q}
                                        className="text-xs px-3 py-1.5 rounded-full bg-white/5 border border-white/5 text-zinc-400 font-mono"
                                    >
                                        {q}
                                    </span>
                                ))}
                            </div>

                            {/* Faux input */}
                            <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-zinc-900/60 px-4 py-3">
                                <span className="text-rose-400 font-mono text-sm">›</span>
                                <input
                                    type="text"
                                    disabled
                                    placeholder={armed ? 'Loading retrieval model…' : 'Load the model to ask a question…'}
                                    className="flex-1 bg-transparent text-zinc-300 placeholder:text-zinc-600 text-sm outline-none disabled:cursor-not-allowed"
                                    aria-label="Ask my portfolio (loads on demand)"
                                />
                                <CornerDownLeft size={15} className="text-zinc-700" />
                            </div>

                            {/* Opt-in gate */}
                            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                                <p className="font-mono text-[11px] text-zinc-600 order-2 sm:order-1">
                                    {armed
                                        ? 'reserved for an upcoming release — wiring the model next.'
                                        : 'runs locally · ~25 MB · loaded only on click'}
                                </p>
                                <button
                                    type="button"
                                    onClick={arm}
                                    disabled={armed}
                                    className="order-1 sm:order-2 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium bg-rose-600 text-white shadow-[0_0_20px_rgba(225,29,72,0.35)] hover:bg-rose-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
                                >
                                    <Zap size={16} />
                                    {armed ? 'Coming soon' : 'Load model · ~25 MB'}
                                </button>
                            </div>
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
};

export default LiveModule;
