import { useEffect } from 'react';
import Lenis from 'lenis';
import { setLenis } from '../../lib/smoothScroll';

/**
 * Mounts Lenis smooth scrolling for the whole app (VisualSystem.md §2.3).
 * Disabled entirely under prefers-reduced-motion — native scroll remains.
 */
const SmoothScroll = () => {
    useEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        const lenis = new Lenis({ lerp: 0.1 });
        setLenis(lenis);

        let rafId;
        const raf = (time) => {
            lenis.raf(time);
            rafId = requestAnimationFrame(raf);
        };
        rafId = requestAnimationFrame(raf);

        return () => {
            cancelAnimationFrame(rafId);
            lenis.destroy();
            setLenis(null);
        };
    }, []);

    return null;
};

export default SmoothScroll;
