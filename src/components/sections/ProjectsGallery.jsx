import React, { useState, useMemo } from 'react';
import ProjectCard from '../ui/ProjectCard';
import Reveal from '../motion/Reveal';

/* Keyframes injected once here so ProjectCard stays keyframe-free */
const CARD_KEYFRAMES = `
@keyframes pc-shimmer {
    0%   { background-position: 0% 50%; }
    50%  { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
}
@keyframes pc-pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50%       { opacity: 0.4; transform: scale(0.85); }
}
`;

const ProjectsGallery = ({ projects }) => {
    const [filter, setFilter] = useState('all');

    const categories = [
        { id: 'all',   label: 'All' },
        { id: 'dev',   label: 'Development' },
        { id: 'ai',    label: 'AI' },
        { id: 'data',  label: 'Data Science' },
    ];

    const filteredProjects = useMemo(() => {
        if (filter === 'all') return projects;
        return projects.filter(project => project.category === filter);
    }, [filter, projects]);

    return (
        <div>
            {/* Inject card animation keyframes once */}
            <style>{CARD_KEYFRAMES}</style>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-2 mb-10">
                <span className="font-mono text-xs text-zinc-600 mr-2 uppercase tracking-wider">filter:</span>
                {categories.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => setFilter(cat.id)}
                        aria-pressed={filter === cat.id}
                        className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                            filter === cat.id
                                ? 'bg-rose-500/10 text-rose-400 ring-1 ring-rose-500'
                                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'
                        }`}
                    >
                        {cat.label}
                    </button>
                ))}
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((project, idx) => (
                    <Reveal key={project.id} delay={(idx % 3) * 0.06} className="h-full">
                        <ProjectCard project={project} />
                    </Reveal>
                ))}
            </div>

            {filteredProjects.length === 0 && (
                <div className="text-center text-zinc-500 mt-12 italic">
                    No projects in this category yet — check back soon.
                </div>
            )}
        </div>
    );
};

export default ProjectsGallery;
