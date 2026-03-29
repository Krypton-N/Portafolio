import React from 'react';
import { Github, ExternalLink, ArrowRight } from 'lucide-react';
import Badge from './Badge';

import { Link } from 'react-router-dom';

const ProjectCard = ({ project }) => {
    const { id, title, description, tags, links, image } = project;

    return (
        <div className="group relative bg-zinc-900/50 backdrop-blur-md border border-white/5 rounded-3xl overflow-hidden hover:border-white/10 transition-all duration-500 hover:shadow-[0_0_40px_rgba(225,29,72,0.25)] hover:-translate-y-2 h-full flex flex-col">
            {/* Image Section */}
            <div className="relative h-64 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent z-10 opacity-60" />
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                />

                {/* Links Overlay */}
                <div className="absolute top-4 right-4 z-20 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                    {links?.github && (
                        <a href={links.github} target="_blank" rel="noopener noreferrer" className="p-2 bg-black/50 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-black transition-colors border border-white/10">
                            <Github size={18} />
                        </a>
                    )}
                    {links?.demo && (
                        <a href={links.demo} target="_blank" rel="noopener noreferrer" className="p-2 bg-black/50 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-black transition-colors border border-white/10">
                            <ExternalLink size={18} />
                        </a>
                    )}
                </div>
            </div>

            {/* Content Section */}
            <div className="p-6 flex flex-col flex-grow">
                <div className="mb-4">
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-rose-400 transition-colors">{title}</h3>
                    <p className="text-zinc-400 line-clamp-3 leading-relaxed">{description}</p>
                </div>

                <div className="flex flex-wrap gap-2 mb-6 mt-auto">
                    {tags.map((tag) => (
                        <Badge key={tag}>{tag}</Badge>
                    ))}
                </div>

                <Link
                    to={`/proyecto/${id}`}
                    className="w-full px-6 py-2 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 cursor-pointer bg-zinc-800/50 border border-zinc-700/50 text-white hover:bg-zinc-800 hover:border-rose-500/30 hover:scale-105 justify-between group/btn"
                >
                    Details
                    <ArrowRight size={18} className="transform group-hover/btn:translate-x-1 transition-transform group-hover/btn:text-rose-400" />
                </Link>
            </div>
        </div>
    );
};

export default ProjectCard;
