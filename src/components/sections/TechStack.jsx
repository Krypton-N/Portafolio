import React from 'react';
import { Code, Server, Terminal, Cpu } from 'lucide-react';
import skills from '../../data/skills.json';
import Reveal from '../motion/Reveal';

const iconMap = {
    "Languages & Backend": Server,
    "AI & Data Science": Cpu,
    "Tools & DevOps": Terminal,
};

/**
 * Skills grid — rendered inside the Method act (no own heading; the section
 * marker comes from the parent).
 */
const TechStack = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {skills.map((category, index) => {
                const Icon = iconMap[category.category] || Code;
                return (
                    <Reveal key={`${category.category}-${index}`} delay={index * 0.06} className="h-full">
                        <div className="bg-zinc-900/40 backdrop-blur-sm border border-white/5 p-6 rounded-2xl hover:bg-zinc-800/40 transition-colors group flex flex-col h-full hover:border-rose-500/20">
                            <div className="flex items-center gap-3 mb-5">
                                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center group-hover:bg-rose-500/10 transition-colors">
                                    <Icon className="text-zinc-300 group-hover:text-rose-400 transition-colors" size={20} />
                                </div>
                                <h3 className="text-base font-bold text-white">{category.category}</h3>
                            </div>
                            <div className="flex flex-wrap gap-2 mt-auto">
                                {category.items.map((item) => (
                                    <span
                                        key={item}
                                        className="px-3 py-1 bg-white/5 rounded-full text-xs text-zinc-400 border border-white/5 group-hover:border-rose-500/10 font-mono"
                                    >
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </Reveal>
                );
            })}
        </div>
    );
};

export default TechStack;
