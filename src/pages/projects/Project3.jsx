import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Github, ExternalLink } from 'lucide-react';
import projectsData from '../../data/projects.json';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';

const Project3 = () => {
    const project = projectsData.find(p => p.id === 3);

    return (
        <>
            <div className="fixed inset-0 bg-zinc-950/80 pointer-events-none" aria-hidden="true" style={{ zIndex: 0 }} />

            <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto relative z-10">
                <Link to="/" className="inline-flex items-center text-zinc-400 hover:text-rose-400 mb-8 transition-colors group">
                    <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                    Volver
                </Link>

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
                        {project.links?.github && project.links.github !== "#" && (
                            <Button href={project.links.github} variant="secondary">
                                <Github size={20} /> Ver Código
                            </Button>
                        )}
                        {project.links?.demo && project.links.demo !== "#" && (
                            <Button href={project.links.demo} variant="primary">
                                <ExternalLink size={20} /> Demo Live
                            </Button>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2 space-y-12">
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                                <span className="text-rose-500">01.</span> Sobre el Proyecto
                            </h2>
                            <div className="prose prose-invert prose-zinc max-w-none text-zinc-400 leading-relaxed space-y-4">
                                <p>Implementación de un servidor robusto basado en Linux, optimizado para rendimiento y seguridad.</p>
                                <ul className="list-disc pl-5 space-y-2">
                                    <li>Configuración de firewall avanzado.</li>
                                    <li>Gestión de usuarios centralizada.</li>
                                    <li>Particionamiento LVM para flexibilidad en el almacenamiento.</li>
                                </ul>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                                <span className="text-rose-500">02.</span> Cómo se Hizo
                            </h2>
                            <div className="bg-zinc-900/40 border border-white/5 rounded-2xl p-6 text-zinc-400 leading-relaxed shadow-inner backdrop-blur-sm space-y-4">
                                <p>El proceso incluyó la instalación de Arch Linux/Debian desde cero, compilación de un kernel personalizado para hardware específico y la configuración de contenedores Docker para aislar servicios.</p>
                            </div>
                        </section>
                    </div>

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

export default Project3;
