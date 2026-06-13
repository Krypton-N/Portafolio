import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion as Motion, useReducedMotion } from 'motion/react';
import { ArrowRight, ArrowDown } from 'lucide-react';
import Button from '../ui/Button';
import DecodeText from '../motion/DecodeText';
import { scrollTo } from '../../lib/smoothScroll';

const Hero = () => {
    const navigate = useNavigate();
    const reduce = useReducedMotion();

    const fade = (delay) => ({
        initial: reduce ? { opacity: 0 } : { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: reduce ? 0 : 0.6, delay: reduce ? 0 : delay, ease: [0.16, 1, 0.3, 1] },
    });

    const goToWork = (e) => {
        e.preventDefault();
        const el = document.getElementById('work');
        if (el) scrollTo(el);
    };

    return (
        <section
            id="home"
            className="min-h-screen flex items-center justify-center pt-24 pb-16 relative overflow-hidden"
        >
            <div className="container mx-auto px-6 relative z-10 max-w-5xl">
                {/* Instrumentation status bar */}
                <Motion.div
                    {...fade(0)}
                    className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[11px] sm:text-xs tracking-wider text-zinc-500 mb-8"
                >
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-sm">
                        <span className="relative flex h-1.5 w-1.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-rose-500" />
                        </span>
                      {/*Instrumentation status bar <span className="text-rose-300">status: available</span>*/} 
                    </span>
                    <span className="text-zinc-700">·</span>
                    <span>ALAN NOE RODRIGUEZ</span>
                    <span className="text-zinc-700">·</span>
                    <span></span>
                </Motion.div>

                {/* Display headline — decode-in */}
                <h1 className="font-display text-5xl sm:text-7xl lg:text-[7rem] font-bold leading-[0.95] tracking-tight text-white">
                    <DecodeText as="span" text="AI Engineer." className="block" delay={150} />
                    <DecodeText
                        as="span"
                        text="I build systems"
                        className="block bg-gradient-to-r from-rose-500 to-rose-300 bg-clip-text text-transparent"
                        delay={520}
                    />
                    <DecodeText as="span" text="that learn." className="block" delay={900} />
                </h1>

                <Motion.p
                    {...fade(1.1)}
                    className="text-lg md:text-xl text-zinc-400 max-w-xl mt-8 mb-12 leading-relaxed"
                >
                    Solid software engineering and applied Artificial Intelligence —
                    turning complex data into systems that work.
                </Motion.p>

                <Motion.div {...fade(1.3)} className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                    <Button href="#work" onClick={goToWork}>
                        View work <ArrowRight size={20} />
                    </Button>
                    <Button variant="secondary" onClick={() => navigate('/contact')}>
                        Contact me
                    </Button>
                </Motion.div>
            </div>

            {/* Scroll cue */}
            {!reduce && (
                <Motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.8, duration: 0.8 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 text-zinc-600"
                    aria-hidden="true"
                >
                    <ArrowDown size={20} className="animate-bounce" />
                </Motion.div>
            )}
        </section>
    );
};

export default Hero;
