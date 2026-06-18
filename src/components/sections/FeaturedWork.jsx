import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import SectionMarker from '../ui/SectionMarker';
import BeforeAfterSlider from '../ui/BeforeAfterSlider';
import ProjectsGallery from './ProjectsGallery';
import Reveal from '../motion/Reveal';

const PHASES = [
    { n: '01', name: 'Physical', desc: 'Mathematical upscaling — 4× canvas with a sharpness-preserving model.' },
    { n: '02', name: 'Artistic', desc: 'A diffusion model repaints global texture and light, tethered by ControlNet.' },
    { n: '03', name: 'Surgical', desc: 'YOLO + SAM detect faces and rebuild them in their own high-res pass.' },
];

/**
 * Act 2 — Proof. The featured AI-restoration project leads with a full-width
 * before/after slider; the rest of the gallery follows. (VisualSystem.md §4)
 */
const FeaturedWork = ({ projects }) => {
    return (
        <section className="py-24 lg:py-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionMarker index="01" label="Work" id="work" />

                {/* Featured project */}
                <Reveal>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-20">
                        <div className="order-2 lg:order-1">
                            <span className="font-mono text-xs text-rose-400 uppercase tracking-wider">Featured · AI</span>
                            <h3 className="font-display text-3xl md:text-4xl font-bold text-white mt-3 mb-4 leading-tight">
                                AI Image Restoration Workflow
                            </h3>
                            <p className="text-zinc-400 leading-relaxed mb-6">
                                A three-stage ComfyUI pipeline that rebuilds blurry photographs into
                                high-definition pieces — not by guessing, but by understanding the image
                                and reconstructing it in passes.
                            </p>

                            <div className="space-y-3 mb-8">
                                {PHASES.map((p) => (
                                    <div key={p.n} className="flex gap-3">
                                        <span className="font-mono text-xs text-rose-400/70 pt-1">{p.n}</span>
                                        <div>
                                            <span className="text-zinc-200 font-medium text-sm">{p.name}</span>
                                            <p className="text-zinc-500 text-sm leading-snug">{p.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <Link
                                to="/project/2"
                                className="inline-flex items-center gap-1.5 text-sm font-medium text-white border-b border-rose-500/40 pb-0.5 hover:border-rose-400 hover:text-rose-300 transition-colors group"
                            >
                                Read the case study
                                <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </Link>
                        </div>

                        <div className="order-1 lg:order-2">
                            <BeforeAfterSlider
                                beforeSrc="/Portafolio/Project_AI_WorkFlow/antes_72.webp"
                                afterSrc="/Portafolio/Project_AI_WorkFlow/despues_72.webp"
                            />
                            <p className="text-center text-xs text-zinc-600 font-mono mt-3">
                                drag to compare · sample #3 of 9
                            </p>
                        </div>
                    </div>
                </Reveal>

                {/* Rest of the gallery */}
                <Reveal>
                    <h3 className="text-sm font-mono text-zinc-500 uppercase tracking-wider mb-6">
                        All projects
                    </h3>
                    <ProjectsGallery projects={projects} />
                </Reveal>
            </div>
        </section>
    );
};

export default FeaturedWork;
