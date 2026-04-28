import React, { useState, useMemo } from 'react';
import SectionTitle from '../ui/SectionTitle';
import ProjectCard from '../ui/ProjectCard';

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
        { id: 'all',   label: 'Todos' },
        { id: 'dev',   label: 'Desarrollo' },
        { id: 'ai',    label: 'IA' },
        { id: 'infra', label: 'Infraestructura' },
        { id: 'data',  label: 'Data Science' },
    ];

    const filteredProjects = useMemo(() => {
        if (filter === 'all') return projects;
        return projects.filter(project => project.category === filter);
    }, [filter, projects]);

    return (
        <section id="proyectos" className="py-20">
            {/* Inject card animation keyframes once */}
            <style>{CARD_KEYFRAMES}</style>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionTitle title="Proyectos Destacados" subtitle="Portfolio" />

                {/* Filter Tabs */}
                <div className="flex flex-wrap justify-center gap-2 mb-12">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setFilter(cat.id)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
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
                    {filteredProjects.map((project) => (
                        <div key={project.id} className="animate-in fade-in zoom-in duration-500">
                            <ProjectCard project={project} />
                        </div>
                    ))}
                </div>

                {filteredProjects.length === 0 && (
                    <div className="text-center text-zinc-500 mt-12 italic">
                        No hay proyectos en esta categoría aún — viaja al pasado o crea el futuro.
                    </div>
                )}
            </div>
        </section>
    );
};

export default ProjectsGallery;
