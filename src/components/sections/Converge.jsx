import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Mail, Linkedin, Github, FileText } from 'lucide-react';
import SectionMarker from '../ui/SectionMarker';
import Reveal from '../motion/Reveal';
import contactData from '../../data/contact.json';

const iconMap = { MessageCircle, Mail, Linkedin, Github };

/**
 * Act 5 — Converge. The gradient descent lands: loss minimized, field calm,
 * one clear action. (VisualSystem.md §4 · Act 5)
 */
const Converge = () => {
    return (
        <section className="py-24 lg:py-36">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionMarker index="04" label="Connect" id="connect" />

                <Reveal>
                    <div className="text-center">
                        <p className="font-mono text-xs text-rose-400/80 mb-6 inline-flex items-center gap-3 uppercase tracking-[0.35em]">
                            <span className="h-px w-8 bg-rose-500/40" />
                            converged
                            <span className="h-px w-8 bg-rose-500/40" />
                        </p>
                        <h2 className="font-display text-5xl md:text-7xl font-bold text-white leading-[0.95] mb-6">
                            Let's build<span className="text-rose-500">.</span>
                        </h2>
                        <p className="text-zinc-400 text-lg max-w-xl mx-auto mb-12 leading-relaxed">
                            Open to AI engineering roles, research collaborations, and ambitious projects.
                            Pick whichever channel you prefer.
                        </p>
                    </div>
                </Reveal>

                {/* Channels */}
                <Reveal delay={0.1}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto">
                        {contactData.map((item) => {
                            const Icon = iconMap[item.icon] || Mail;
                            return (
                                <a
                                    key={item.id}
                                    href={item.url}
                                    target={item.id === 'email' ? '_self' : '_blank'}
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-rose-500/20 hover:bg-white/[0.06] hover:shadow-[0_0_20px_rgba(225,29,72,0.12)] transition-all duration-300 group"
                                >
                                    <div className="p-3 rounded-xl bg-rose-500/10 text-rose-400 group-hover:scale-110 group-hover:bg-rose-500/20 transition-all duration-300">
                                        <Icon size={20} />
                                    </div>
                                    <div className="min-w-0">
                                        <h3 className="text-white font-medium text-sm group-hover:text-rose-300 transition-colors">
                                            {item.platform}
                                        </h3>
                                        <p className="text-zinc-500 text-xs font-mono truncate">{item.display}</p>
                                    </div>
                                </a>
                            );
                        })}
                    </div>
                </Reveal>

                <Reveal delay={0.2}>
                    <div className="text-center mt-10">
                        <Link
                            to="/cv"
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-white/20 transition-colors"
                        >
                            <FileText size={16} />
                            View résumé
                        </Link>
                    </div>
                </Reveal>
            </div>
        </section>
    );
};

export default Converge;
