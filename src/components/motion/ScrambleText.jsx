import React, { useEffect, useRef } from 'react';
import { animate, scrambleText } from 'animejs';
import { useReducedMotion } from 'motion/react';

/**
 * Anime.js 4.4 scrambleText wrapper.
 * - Scrambles in on mount (after `delay`).
 * - If `cycle` (array) is given, transitions between the phrases on an interval
 *   — each change re-scrambles, like Anime.js's scrambleText demo.
 * - Reduced motion: renders the first/only phrase statically, no animation.
 *
 * The element starts with the first phrase as text content (no layout shift,
 * and a graceful fallback if JS never runs).
 */
const ScrambleText = ({
    text,
    cycle,
    className,
    style,
    delay = 0,
    interval = 3400,
    duration = 900,
    chars = 'uppercase',
    from = 'left',
}) => {
    const reduce = useReducedMotion();
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const phrases = cycle && cycle.length ? cycle : [text];
        el.textContent = phrases[0];
        if (reduce) return;

        let i = 0;
        let intervalId;
        let cancelled = false;

        const to = (target) => {
            animate(el, {
                duration,
                ease: 'out(3)',
                innerHTML: scrambleText({ text: target, chars, from }),
            });
        };

        const startId = setTimeout(() => {
            if (cancelled) return;
            to(phrases[0]); // entrance scramble-in
            if (phrases.length > 1) {
                intervalId = setInterval(() => {
                    i = (i + 1) % phrases.length;
                    to(phrases[i]);
                }, interval);
            }
        }, delay);

        return () => {
            cancelled = true;
            clearTimeout(startId);
            clearInterval(intervalId);
        };
    }, [text, cycle, reduce, delay, interval, duration, chars, from]);

    return <span ref={ref} className={className} style={style} aria-label={(cycle && cycle[0]) || text} />;
};

export default ScrambleText;
