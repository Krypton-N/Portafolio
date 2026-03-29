import React from 'react';
import { Code, Database, Globe, Layers, Server, Terminal, Smartphone, Cpu } from 'lucide-react';
import skills from '../../data/skills.json';
import SectionTitle from '../ui/SectionTitle';

const iconMap = {
    "Lenguajes & Backend": Server,
    "IA & Data Science": Cpu,
    "Herramientas & DevOps": Terminal,
    "Frontend": Globe,
    "Backend": Server,
    "Database": Database,
    "DevOps": Terminal,
    "Mobile": Smartphone,
    "Tools": Layers,
    "AI/ML": Cpu,
    "Other": Code
};

const TechStack = () => {
    return (
        <section id="habilidades" className="py-24 relative">
            <div className="container mx-auto px-6">
                <SectionTitle title="Habilidades" subtitle="Tech Stack" />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {skills.map((category, index) => {
                        const Icon = iconMap[category.category] || Code;
                        return (
                            <div
                                key={`${category.category}-${index}`}
                                className="bg-zinc-900/40 backdrop-blur-sm border border-white/5 p-6 rounded-2xl hover:bg-zinc-800/50 transition-colors group flex flex-col h-full hover:border-rose-500/20"
                            >
                                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-rose-500/10 transition-colors">
                                    <Icon className="text-white group-hover:text-rose-400 transition-colors" size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-4">{category.category}</h3>
                                <div className="flex flex-wrap gap-2 mt-auto">
                                    {category.items.map((item) => (
                                        <span
                                            key={item}
                                            className="px-3 py-1 bg-white/5 rounded-full text-xs text-zinc-400 border border-white/5 group-hover:border-rose-500/10"
                                        >
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default TechStack;
