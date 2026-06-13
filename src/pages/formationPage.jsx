import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ArrowLeft, ArrowRight, ZoomIn, X, MousePointer2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion as Motion, useScroll, useTransform, useReducedMotion } from 'motion/react';

import Img_CertDevIA from '../resources/Page_CertificationsAssets/DevConIA.webp';
import Img_CertAgile from '../resources/Page_CertificationsAssets/Kickoff-BadgeAgile.png';
import Img_CertPredictive from '../resources/Page_CertificationsAssets/Kickoff-Badge-predictive Methodology.png';
import Img_CertPM_Agile from '../resources/Page_CertificationsAssets/Project Managment & Agile Fundamentals.webp';
import Img_CertDeepLearning from '../resources/Page_CertificationsAssets/DLI_nvidia.webp';
import ImgESCOM from '../resources/Page_CertificationsAssets/logoESCOMBlanco.png';
import ImgBatiz from '../resources/Page_CertificationsAssets/Batiz.webp';

// ── Data ───────────────────────────────────────────────
const certificates = [
    { id: 1, file: Img_CertDevIA, title: 'Introduction to AI-Powered Development', issuer: 'BIG School — Romuald Fons & Brais Moure', date: 'March 2026 · 6 h', description: 'AI Development from 0 to Production — the full lifecycle of building and deploying complex autonomous agents.', keywords: ['AI Agents', 'Production', 'Software Dev', 'Complex Systems'] },
    { id: 2, file: Img_CertAgile, title: 'PMI KICKOFF — Agile', issuer: 'Project Management Institute', date: '2025', description: 'Official PMI badge certifying command of Scrum and Kanban, adaptability, and continuous value delivery.', keywords: ['Scrum', 'Kanban', 'Adaptability', 'Teamwork'] },
    { id: 3, file: Img_CertPredictive, title: 'PMI KICKOFF — Predictive', issuer: 'Project Management Institute', date: '2025', description: 'Traditional (waterfall) project management structured planning, scope definition, and risk control.', keywords: ['Waterfall', 'Planning', 'Risk', 'Scope'] },
    { id: 4, file: Img_CertPM_Agile, title: 'Project Management & Agile Fundamentals', issuer: 'Santander Open Academy', date: 'Aug 2025 · 8 h', description: 'Design Thinking to ideate, Lean Startup to validate via MVPs, and Scrum for iterative execution.', keywords: ['Design Thinking', 'Lean Startup', 'MVP', 'Scrum'] },
    { id: 5, file: Img_CertDeepLearning, title: 'Fundamentals of Deep Learning', issuer: 'NVIDIA Deep Learning Institute', date: 'Nov 2025 – Jan 2026', description: 'Neural network architecture for Computer Vision and NLP — optimization, Dropout, Data Augmentation.', keywords: ['Deep Learning', 'Computer Vision', 'NLP', 'NVIDIA DLI'] },
];

const degrees = [
    { phase: '02', title: 'B.Eng. in Artificial Intelligence', date: 'Present', institution: 'School of Computer Science (ESCOM) — IPN', description: 'Advanced training in intelligent system design. Hands on focus on production LLM architectures, RAG systems, autonomous agents, and computer vision for process automation.', current: true, file: ImgESCOM, keywords: ['Artificial Intelligence', 'Computer Vision', 'Machine Learning', 'Python'] },
    { phase: '01', title: 'Programming Technician', date: '2020 – 2024', institution: 'CECyT 9 "Juan de Dios Batíz" — IPN', description: 'High performance program that built a solid foundation in exact sciences, data structures, efficient algorithm design, and scalable software methodologies.', current: false, file: ImgBatiz, keywords: ['Data Structures', 'Algorithms', 'Software', 'Programming'] },
];

/* ── 3D tilt card with layered depth ── */
const TiltCard = ({ children, className = '' }) => {
    const reduce = useReducedMotion();
    const ref = useRef(null);
    const [t, setT] = useState('perspective(1200px) rotateX(0deg) rotateY(0deg)');

    const onMove = (e) => {
        if (reduce || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        setT(`perspective(1200px) rotateY(${px * 9}deg) rotateX(${-py * 9}deg) scale(1.015)`);
    };
    const onLeave = () => setT('perspective(1200px) rotateX(0deg) rotateY(0deg) scale(1)');

    return (
        <div
            ref={ref}
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            className={className}
            style={{ transform: t, transformStyle: 'preserve-3d', transition: 'transform 0.25s cubic-bezier(0.16,1,0.3,1)' }}
        >
            {children}
        </div>
    );
};

/* ── Certificate card ── */
const CertCard = ({ cert, onOpen }) => (
    <TiltCard className="group relative w-[78vw] sm:w-[400px] flex-shrink-0 rounded-3xl border border-white/10 bg-zinc-900/50 backdrop-blur-md overflow-hidden shadow-2xl hover:border-rose-500/30 transition-colors">
        <div className="absolute -inset-px rounded-3xl bg-gradient-to-b from-rose-500/0 via-rose-500/0 to-rose-500/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        <button onClick={() => onOpen(cert.file, cert.title)} className="block w-full relative" style={{ transform: 'translateZ(40px)' }} aria-label={`Zoom ${cert.title}`}>
            <div className="h-52 bg-zinc-950/60 flex items-center justify-center p-6 overflow-hidden">
                <img src={cert.file} alt={cert.title} className="max-h-full max-w-full object-contain" loading="lazy" />
            </div>
            <span className="absolute top-3 right-3 flex items-center gap-1 text-[10px] font-mono text-zinc-300 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                <ZoomIn size={11} /> zoom
            </span>
        </button>
        <div className="p-5" style={{ transform: 'translateZ(25px)' }}>
            <p className="font-mono text-[11px] text-rose-400 mb-1">{cert.date}</p>
            <h3 className="font-display text-lg font-bold text-white leading-tight mb-1.5">{cert.title}</h3>
            <p className="text-rose-300/80 text-xs font-mono mb-3">{cert.issuer}</p>
            <p className="text-sm text-zinc-400 leading-relaxed mb-4">{cert.description}</p>
            <div className="flex flex-wrap gap-1.5">
                {cert.keywords.map((k) => (
                    <span key={k} className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-white/5 border border-white/5 text-zinc-500">{k}</span>
                ))}
            </div>
        </div>
    </TiltCard>
);

/* ── Pinned horizontal scroll gallery (desktop) / native snap (mobile · reduced) ── */
const CertGallery = ({ onOpen }) => {
    const reduce = useReducedMotion();
    const sectionRef = useRef(null);
    const trackRef = useRef(null);
    const rangeRef = useRef(0);            // live value read by the transform
    const [range, setRange] = useState(0); // mirror, only to re-render the section height
    const [pin, setPin] = useState(false);

    const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });
    // functional transforms read rangeRef live, so a post-mount re-measure takes effect
    const x = useTransform(scrollYProgress, (v) => -rangeRef.current * v);
    const barW = useTransform(scrollYProgress, (v) => `${8 + v * 92}%`);

    useEffect(() => {
        const measure = () => {
            const enable = window.innerWidth >= 1024 && !reduce;
            if (enable && trackRef.current) {
                const r = Math.max(0, trackRef.current.scrollWidth - window.innerWidth + 64);
                rangeRef.current = r;
                setRange(r);
                setPin(r > 40);
            } else {
                rangeRef.current = 0;
                setRange(0);
                setPin(false);
            }
        };
        measure();
        // re-measure once the layout has switched to the pinned track (different gap/padding)
        const t = setTimeout(measure, 350);
        window.addEventListener('resize', measure);
        return () => { clearTimeout(t); window.removeEventListener('resize', measure); };
    }, [reduce]);

    const cards = certificates.map((c) => <CertCard key={c.id} cert={c} onOpen={onOpen} />);

    // sectionRef stays mounted in both modes so useScroll binds to it from the first render
    return (
        <section ref={sectionRef} style={pin ? { height: `${Math.round(range * 1.25) + 800}px` } : undefined} className="relative">
            {pin ? (
                <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
                    <Motion.div ref={trackRef} style={{ x }} className="flex gap-8 px-[6vw] w-max will-change-transform">
                        {cards}
                    </Motion.div>
                    <div className="mx-[6vw] mt-10 h-px bg-white/10 relative">
                        <Motion.div style={{ width: barW }} className="absolute inset-y-0 left-0 bg-rose-500/70" />
                    </div>
                </div>
            ) : (
                <div className="overflow-x-auto snap-x snap-mandatory pb-6 -mx-4 px-4 [scrollbar-width:none]">
                    <div ref={trackRef} className="flex gap-5 w-max">
                        {certificates.map((c) => (
                            <div key={c.id} className="snap-center"><CertCard cert={c} onOpen={onOpen} /></div>
                        ))}
                    </div>
                </div>
            )}
        </section>
    );
};

/* ── Lightbox ── */
const Lightbox = ({ src, alt, onClose }) => {
    useEffect(() => {
        const onKey = (e) => { if (e.key === 'Escape') onClose(); };
        document.addEventListener('keydown', onKey);
        document.body.style.overflow = 'hidden';
        return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
    }, [onClose]);

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/85 backdrop-blur-md" onClick={onClose} style={{ animation: 'fadeIn 200ms ease' }}>
            <style>{`@keyframes fadeIn{from{opacity:0}to{opacity:1}}@keyframes scaleIn{from{transform:scale(.9);opacity:0}to{transform:scale(1);opacity:1}}`}</style>
            <button onClick={onClose} aria-label="Close" className="absolute top-5 right-5 w-10 h-10 rounded-full bg-zinc-800/80 border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white hover:bg-rose-500/30 transition-all">
                <X size={20} />
            </button>
            <img src={src} alt={alt} onClick={(e) => e.stopPropagation()} className="max-w-[90vw] max-h-[88vh] object-contain rounded-2xl shadow-2xl" style={{ animation: 'scaleIn 250ms cubic-bezier(0.34,1.56,0.64,1)' }} />
        </div>
    );
};

/* ── Degree block (editorial, alternating) ── */
const DegreeBlock = ({ degree, onOpen, flip }) => {
    const reduce = useReducedMotion();
    return (
        <Motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: reduce ? 0 : 0.6, ease: [0.16, 1, 0.3, 1] }}
            className={`grid lg:grid-cols-12 gap-8 lg:gap-12 items-center ${flip ? '' : ''}`}
        >
            {/* image */}
            <div className={`lg:col-span-5 ${flip ? 'lg:order-2' : ''}`}>
                <TiltCard className="relative rounded-3xl border border-white/10 bg-zinc-900/40 backdrop-blur-md p-10 flex items-center justify-center min-h-[240px] overflow-hidden group">
                    <span className="absolute top-5 left-6 font-display text-7xl font-bold text-white/[0.04] select-none" style={{ transform: 'translateZ(10px)' }}>{degree.phase}</span>
                    <img src={degree.file} alt={degree.title} onClick={() => onOpen(degree.file, degree.title)} className="max-h-40 max-w-[70%] object-contain cursor-zoom-in relative" style={{ transform: 'translateZ(45px)' }} loading="lazy" />
                </TiltCard>
            </div>

            {/* text */}
            <div className={`lg:col-span-7 ${flip ? 'lg:order-1' : ''}`}>
                <div className="flex items-center gap-3 mb-3">
                    <span className="font-mono text-xs text-rose-400">EPOCH {degree.phase}</span>
                    {degree.current && (
                        <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-rose-300 px-2.5 py-0.5 rounded-full border border-rose-500/30 bg-rose-500/5">
                            <span className="h-1.5 w-1.5 rounded-full bg-rose-500 animate-pulse" /> in progress
                        </span>
                    )}
                </div>
                <h3 className="font-display text-3xl md:text-4xl font-bold text-white leading-tight">{degree.title}</h3>
                <p className="text-rose-400/90 font-mono text-sm mt-2">{degree.institution}</p>
                <p className="font-mono text-xs text-zinc-600 mt-1">{degree.date}</p>
                <p className="text-zinc-400 leading-relaxed mt-5 max-w-xl">{degree.description}</p>
                <div className="flex flex-wrap gap-2 mt-5">
                    {degree.keywords.map((k) => (
                        <span key={k} className="font-mono text-xs px-2.5 py-1 rounded-full bg-white/5 border border-white/5 text-zinc-400">{k}</span>
                    ))}
                </div>
            </div>
        </Motion.div>
    );
};

/* ── Page ── */
const FormationPage = () => {
    const [lightbox, setLightbox] = useState(null);
    const openLightbox = useCallback((src, alt) => setLightbox({ src, alt }), []);
    const closeLightbox = useCallback(() => setLightbox(null), []);

    return (
        <div className="relative z-10 min-h-screen pb-24">
            {lightbox && <Lightbox src={lightbox.src} alt={lightbox.alt} onClose={closeLightbox} />}

            {/* ─── Hero ─── */}
            <header className="pt-28 pb-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    <Link to="/" className="inline-flex items-center text-zinc-400 hover:text-rose-400 mb-12 transition-colors group font-mono text-sm">
                        <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                        back to home
                    </Link>
                    <p className="font-mono text-xs text-rose-400 uppercase tracking-[0.3em] mb-4">Education · the training set</p>
                    <h1 className="font-display text-6xl md:text-8xl lg:text-[9rem] font-bold text-white leading-[0.88] tracking-tight">
                        Foundations<span className="text-rose-500">.</span>
                    </h1>
                    <p className="text-lg text-zinc-400 leading-relaxed mt-8 max-w-xl">
                        Every model is shaped by what it learned from. Here is the data the engineer was trained on —
                        the degrees, and the certifications that fine-tuned the rest.
                    </p>
                    <div className="flex flex-wrap gap-x-10 gap-y-4 mt-10 pt-8 border-t border-white/10 font-mono text-sm">
                        <div><span className="text-white text-xl font-display font-bold">2020 → now</span><span className="block text-zinc-500 text-xs mt-1">timespan</span></div>
                        <div><span className="text-white text-xl font-display font-bold">IPN</span><span className="block text-zinc-500 text-xs mt-1">2 institutions</span></div>
                        <div><span className="text-white text-xl font-display font-bold">5</span><span className="block text-zinc-500 text-xs mt-1">certifications</span></div>
                    </div>
                </div>
            </header>

            {/* ─── Academic path ─── */}
            <section className="px-4 sm:px-6 lg:px-8 py-12">
                <div className="max-w-6xl mx-auto">
                    <div className="flex items-center gap-4 mb-16">
                        <span className="font-mono text-xs tracking-[0.25em] text-rose-400 uppercase whitespace-nowrap">Academic path</span>
                        <span className="h-px flex-1 bg-gradient-to-r from-rose-500/30 via-white/10 to-transparent" />
                    </div>
                    <div className="space-y-20">
                        {degrees.map((d, i) => (
                            <DegreeBlock key={d.phase} degree={d} onOpen={openLightbox} flip={i % 2 === 1} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── Certifications (immersive gallery) ─── */}
            <div className="px-4 sm:px-6 lg:px-8 pt-24 pb-4">
                <div className="max-w-6xl mx-auto flex flex-wrap items-end justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-4 mb-3">
                            <span className="font-mono text-xs tracking-[0.25em] text-rose-400 uppercase whitespace-nowrap">Fine-tuning · certifications</span>
                        </div>
                        <h2 className="font-display text-3xl md:text-4xl font-bold text-white">Five passes, five gradients.</h2>
                    </div>
                    <span className="hidden lg:inline-flex items-center gap-2 font-mono text-xs text-zinc-500">
                        <MousePointer2 size={13} className="text-rose-400" /> scroll to traverse · hover to tilt
                    </span>
                </div>
            </div>

            <CertGallery onOpen={openLightbox} />

            {/* ─── footer nav ─── */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 mt-8 border-t border-white/10 flex items-center justify-between">
                <Link to="/" className="font-mono text-sm text-zinc-400 hover:text-rose-400 transition-colors inline-flex items-center gap-2 group">
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> home
                </Link>
                <Link to="/contact" className="font-mono text-sm text-zinc-400 hover:text-rose-400 transition-colors inline-flex items-center gap-2 group">
                    get in touch <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>
        </div>
    );
};

export default FormationPage;
