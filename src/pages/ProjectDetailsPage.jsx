import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Github, ExternalLink, Code } from 'lucide-react';
import projectsData from '../data/projects.json';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';

const ProjectDetailsPage = () => {
    const { id } = useParams();
    const project = projectsData.find(p => p.id.toString() === id);

    if (!project) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
                <h2 className="text-3xl font-bold text-white mb-4">Proyecto no encontrado</h2>
                <p className="text-zinc-400 mb-8">Parece que te has perdido en el hiperespacio.</p>
                <Link to="/" className="text-rose-400 hover:text-rose-300 font-medium">
                    &lt; Volver al inicio /&gt;
                </Link>
            </div>
        );
    }

    return (
        <>
            {/* Background Overlay to dim the background for better readability */}
            <div className="fixed inset-0 bg-zinc-950/80 pointer-events-none" aria-hidden="true" style={{ zIndex: 0 }} />

            <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto relative z-10">
                <Link to="/" className="inline-flex items-center text-zinc-400 hover:text-rose-400 mb-8 transition-colors group">
                    <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                    Volver
                </Link>

                {/* Header */}
                <div className="mb-12">
                    <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag, idx) => (
                            <Badge key={idx}>{tag}</Badge>
                        ))}
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        {project.title}<span className="text-rose-500">.</span>
                    </h1>
                    <p className="text-xl text-zinc-300 leading-relaxed max-w-3xl">
                        {project.description}
                    </p>

                    <div className="flex gap-4 mt-8">
                        {project.links?.github && (
                            <Button href={project.links.github} variant="secondary">
                                <Github size={20} /> Ver Código
                            </Button>
                        )}
                        {project.links?.demo && (
                            <Button href={project.links.demo} variant="primary">
                                <ExternalLink size={20} /> Demo Live
                            </Button>
                        )}
                    </div>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2 space-y-12">
                        {/* Long Description */}
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                                <span className="text-rose-500">01.</span> Sobre el Proyecto
                            </h2>
                            <div className="prose prose-invert prose-zinc max-w-none text-zinc-400 leading-relaxed">
                                <p>{project.longDescription}</p>
                            </div>
                        </section>

                        {/* Development Process */}
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                                <span className="text-rose-500">02.</span> Cómo se Hizo
                            </h2>
                            <div className="bg-zinc-900/40 border border-white/5 rounded-2xl p-6 text-zinc-400 leading-relaxed shadow-inner backdrop-blur-sm">
                                <p>{project.developmentProcess}</p>
                            </div>
                        </section>
                    </div>

                    {/* Gallery Sidebar */}
                    <div className="space-y-6">
                        <h3 className="text-lg font-bold text-zinc-200 border-b border-white/10 pb-2">
                            Galería
                        </h3>
                        {project.galleryImages && project.galleryImages.map((img, idx) => (
                            <div key={idx} className="rounded-xl overflow-hidden border border-white/5 hover:border-rose-500/30 transition-all duration-300 group shadow-lg">
                                <img
                                    src={img}
                                    alt={`Screenshot ${idx + 1}`}
                                    className="w-full h-auto transform group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProjectDetailsPage;
