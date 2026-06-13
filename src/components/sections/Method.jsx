import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import SectionMarker from '../ui/SectionMarker';
import TechStack from './TechStack';
import Reveal from '../motion/Reveal';

const TIMELINE = [
    {
        title: 'B.Eng. in Artificial Intelligence',
        place: 'ESCOM — IPN',
        date: 'Present',
        current: true,
    },
    {
        title: 'Fundamentals of Deep Learning',
        place: 'NVIDIA Deep Learning Institute',
        date: 'Nov 2025 – Jan 2026',
    },
    {
        title: 'Project Management & Agile',
        place: 'Santander Academy',
        date: 'Jun – Aug 2025',
    },
    {
        title: 'Programming Technician',
        place: 'CECyT 9 — IPN',
        date: '2020 – 2024',
    },
];

/**
 * Act 4 — Method. How I think, not which logos I know: the skill set, then a
 * compact journey timeline. Full certifications live on /education.
 * (VisualSystem.md §4 · Act 4)
 */
const Method = () => {
    return (
        <section className="py-24 lg:py-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionMarker index="03" label="Method" id="method" />

                <Reveal>
                    <div className="max-w-2xl mb-12">
                        <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
                            How I work
                        </h2>
                        <p className="text-zinc-400 leading-relaxed">
                            The tools matter less than the habits: read the data first, model the problem,
                            verify against reality. Here's the stack I reach for and the path that built it.
                        </p>
                    </div>
                </Reveal>

                <TechStack />

                {/* Compact journey */}
                <div className="mt-20 grid grid-cols-1 lg:grid-cols-3 gap-10">
                    <Reveal className="lg:col-span-1">
                        <h3 className="font-display text-2xl font-bold text-white mb-3">Journey</h3>
                        <p className="text-zinc-500 text-sm leading-relaxed mb-5">
                            Academic background and certifications, condensed.
                        </p>
                        <Link
                            to="/education"
                            className="inline-flex items-center gap-1.5 text-sm font-medium text-white border-b border-rose-500/40 pb-0.5 hover:border-rose-400 hover:text-rose-300 transition-colors group"
                        >
                            Full timeline & certificates
                            <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </Link>
                    </Reveal>

                    <Reveal delay={0.1} className="lg:col-span-2">
                        <div className="border-l border-zinc-800 ml-1.5">
                            {TIMELINE.map((item, idx) => (
                                <div key={idx} className="relative pl-8 pb-8 last:pb-0 group">
                                    <span
                                        className={`absolute -left-[7px] top-1 h-3.5 w-3.5 rounded-full border-2 bg-zinc-950 transition-colors duration-300 ${
                                            item.current
                                                ? 'border-rose-500 group-hover:bg-rose-500'
                                                : 'border-zinc-700 group-hover:border-rose-500'
                                        }`}
                                    />
                                    <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                                        <h4 className="text-white font-medium">{item.title}</h4>
                                        <span className="font-mono text-xs text-zinc-600 whitespace-nowrap">{item.date}</span>
                                    </div>
                                    <p className="text-rose-400/80 text-sm font-mono mt-0.5">{item.place}</p>
                                </div>
                            ))}
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    );
};

export default Method;
