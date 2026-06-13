import React from 'react';
import {
    Github, ExternalLink, ArrowRight,
    // Curated cover-icon set. `import * as Icons` would bundle the entire
    // lucide library (~700 KB min); add icons here when projects.json needs them.
    BrainCircuit, Layers, BarChart3, FlaskConical, Code2, Sparkles,
    Cpu, Database, Terminal, Globe, Bot, Network, LineChart, Server,
} from 'lucide-react';
import Badge from './Badge';
import { Link } from 'react-router-dom';

const COVER_ICONS = {
    BrainCircuit, Layers, BarChart3, FlaskConical, Code2, Sparkles,
    Cpu, Database, Terminal, Globe, Bot, Network, LineChart, Server,
};

/* ─────────────────────────────────────────────────
   Visual theme — single rose/zinc palette.
   All categories share one accent to keep the brand
   monochromatic (deep black + rose). Category identity
   is conveyed by the filter tabs, not by card color.
───────────────────────────────────────────────── */
const THEME = {
    hoverBorder:  'hover:border-rose-500/30',
    hoverShadow:  'hover:shadow-[0_0_40px_rgba(225,29,72,0.25)]',
    titleHover:   'group-hover:text-rose-400',
    primaryIcon:  'text-rose-400',
    primaryIconBg:'bg-rose-500/10 border border-rose-500/30 shadow-[0_0_30px_rgba(225,29,72,0.25)]',
    shimmer:      'rgba(225,29,72,0.35), rgba(251,113,133,0.18), rgba(136,19,55,0.25), rgba(225,29,72,0.35)',
    wipBg:        'bg-rose-500/15 border-rose-500/40',
    wipDot:       'bg-rose-500',
    wipPing:      'bg-rose-400',
    wipText:      'text-rose-300',
    wipLabel:     'text-rose-500/70',
    secondary: [
        { icon: 'text-rose-300', bg: 'bg-rose-500/10 border border-rose-500/20' },
        { icon: 'text-zinc-300', bg: 'bg-white/5 border border-white/10' },
        { icon: 'text-zinc-300', bg: 'bg-white/5 border border-white/10' },
    ],
};

/* ─────────────────────────────────────────────────
   VISUAL COVER — icon cluster + animated gradient
   Used when the project JSON has a "coverIcons" field
───────────────────────────────────────────────── */
const VisualCover = ({ project, theme }) => {
    const [primaryName, ...secondaryNames] = project.coverIcons || [];
    const PrimaryIcon = COVER_ICONS[primaryName] || Code2;

    return (
        <div
            className="relative h-48 overflow-hidden flex items-center justify-center flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, #18181b 0%, #27272a 40%, #1c1917 70%, #18181b 100%)' }}
        >
            {/* Shimmer gradient overlay */}
            <div
                className="absolute inset-0 opacity-30"
                style={{
                    background: `linear-gradient(270deg, ${theme.shimmer})`,
                    backgroundSize: '400% 400%',
                    animation: 'pc-shimmer 6s ease infinite',
                }}
            />

            {/* Icon cluster */}
            <div className="relative z-10 flex flex-col items-center gap-3">
                {/* Primary icon */}
                <div className="relative">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center backdrop-blur-sm ${theme.primaryIconBg}`}>
                        <PrimaryIcon size={32} className={theme.primaryIcon} />
                    </div>
                    {/* Live ping dot — only for WIP */}
                    {project.wip && (
                        <span className="absolute -top-1 -right-1 flex h-3 w-3">
                            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${theme.wipPing}`} />
                            <span className={`relative inline-flex rounded-full h-3 w-3 ${theme.wipDot}`} />
                        </span>
                    )}
                </div>

                {/* Secondary icons (up to 3) */}
                {secondaryNames.length > 0 && (
                    <div className="flex gap-3">
                        {secondaryNames.slice(0, 3).map((name, idx) => {
                            const SecIcon = COVER_ICONS[name] || Sparkles;
                            const s = theme.secondary[idx] || theme.secondary[0];
                            return (
                                <div key={idx} className={`w-9 h-9 rounded-xl flex items-center justify-center ${s.bg}`}>
                                    <SecIcon size={18} className={s.icon} />
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* WIP ribbon */}
            {project.wip && (
                <div className={`absolute top-4 left-4 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full border backdrop-blur-sm ${theme.wipBg}`}>
                    <span
                        className={`w-2 h-2 rounded-full ${theme.wipDot}`}
                        style={{ animation: 'pc-pulse 1.5s ease-in-out infinite' }}
                    />
                    <span className={`text-xs font-semibold tracking-wide uppercase ${theme.wipText}`}>
                        In Development
                    </span>
                </div>
            )}

            {/* Links overlay — non-WIP visual cards */}
            {!project.wip && (
                <div className="absolute top-4 right-4 z-20 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                    {project.links?.github && project.links.github !== '#' && (
                        <a href={project.links.github} target="_blank" rel="noopener noreferrer" aria-label="View source on GitHub"
                            className="p-2 bg-black/50 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-black transition-colors border border-white/10">
                            <Github size={18} />
                        </a>
                    )}
                    {project.links?.demo && (
                        <a href={project.links.demo} target="_blank" rel="noopener noreferrer" aria-label="Open live demo"
                            className="p-2 bg-black/50 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-black transition-colors border border-white/10">
                            <ExternalLink size={18} />
                        </a>
                    )}
                </div>
            )}
        </div>
    );
};

/* ─────────────────────────────────────────────────
   IMAGE COVER — original behaviour, polished
   Used when the project JSON has an "image" field
   and no "coverIcons" field
───────────────────────────────────────────────── */
const ImageCover = ({ project }) => (
    <div className="relative h-56 overflow-hidden flex-shrink-0">
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent z-10 opacity-60" />
        <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
            loading="lazy"
        />
        {/* Links overlay */}
        <div className="absolute top-4 right-4 z-20 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
            {project.links?.github && project.links.github !== '#' && (
                <a href={project.links.github} target="_blank" rel="noopener noreferrer" aria-label="View source on GitHub"
                    className="p-2 bg-black/50 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-black transition-colors border border-white/10">
                    <Github size={18} />
                </a>
            )}
            {project.links?.demo && (
                <a href={project.links.demo} target="_blank" rel="noopener noreferrer" aria-label="Open live demo"
                    className="p-2 bg-black/50 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-black transition-colors border border-white/10">
                    <ExternalLink size={18} />
                </a>
            )}
        </div>
    </div>
);

/* ─────────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────────── */
const ProjectCard = ({ project }) => {
    const { id, title, description, tags, coverIcons, wip } = project;
    const isVisual = Array.isArray(coverIcons) && coverIcons.length > 0;
    const theme = THEME;

    return (
        <div className={`group relative bg-zinc-900/50 backdrop-blur-md border border-white/5 rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-2 h-full flex flex-col ${theme.hoverBorder} ${theme.hoverShadow}`}>

            {/* Cover section — adaptive */}
            {isVisual
                ? <VisualCover project={project} theme={theme} />
                : <ImageCover project={project} />
            }

            {/* Content section */}
            <div className="p-6 flex flex-col flex-grow">
                <div className="mb-4">
                    <h3 className={`font-bold text-white mb-2 leading-snug transition-colors ${theme.titleHover} ${isVisual ? 'text-xl' : 'text-2xl'}`}>
                        {title}
                    </h3>
                    <p className="text-zinc-400 text-sm line-clamp-3 leading-relaxed">
                        {description}
                    </p>
                </div>

                <div className="flex flex-wrap gap-2 mb-6 mt-auto">
                    {tags.map((tag) => <Badge key={tag}>{tag}</Badge>)}
                </div>

                {/* CTA */}
                {wip ? (
                    <div className="w-full px-6 py-2 rounded-lg font-medium flex items-center justify-between bg-zinc-800/30 border border-zinc-700/30 text-zinc-500 cursor-not-allowed select-none">
                        <span className="text-sm">Coming soon…</span>
                        <span className={`text-xs font-semibold uppercase tracking-wide ${theme.wipLabel}`}>WIP</span>
                    </div>
                ) : (
                    <Link
                        to={`/project/${id}`}
                        className="w-full px-6 py-2 rounded-lg font-medium transition-all duration-300 flex items-center justify-between cursor-pointer bg-zinc-800/50 border border-zinc-700/50 text-white hover:bg-zinc-800 hover:border-rose-500/30 hover:scale-105 group/btn"
                    >
                        Details
                        <ArrowRight size={18} className="transform group-hover/btn:translate-x-1 transition-transform group-hover/btn:text-rose-400" />
                    </Link>
                )}
            </div>
        </div>
    );
};

export default ProjectCard;
