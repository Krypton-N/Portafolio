import React, { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'motion/react';

const GLYPHS = '01<>{}[]#%&/\\=+*ABCDEFGHIJKLMNOPQRSTUVWXYZ';

/**
 * Decode-in reveal: characters scramble through random glyphs and resolve
 * left-to-right, like a model streaming tokens (VisualSystem.md §4, Act 1).
 * Fires once. Under reduced motion the final text shows immediately.
 *
 * `as` lets the caller pick the element (default span); className/style pass through.
 */
const DecodeText = ({ text, as = 'span', className, style, delay = 0 }) => {
    const reduce = useReducedMotion();
    const [display, setDisplay] = useState(reduce ? text : '');
    const frameRef = useRef(null);

    useEffect(() => {
        if (reduce) {
            setDisplay(text);
            return;
        }

        let revealed = 0;
        let tick = 0;
        let startTimer;
        const total = text.length;

        const step = () => {
            tick++;
            // Advance the resolved boundary at `speed`-controlled cadence
            if (tick % 2 === 0) revealed += 1;

            let out = '';
            for (let i = 0; i < total; i++) {
                const ch = text[i];
                if (i < revealed || ch === ' ' || ch === '\n') {
                    out += ch;
                } else if (i < revealed + 6) {
                    // scramble window just past the resolved boundary
                    out += GLYPHS[(Math.random() * GLYPHS.length) | 0];
                }
            }
            setDisplay(out);

            if (revealed <= total) {
                frameRef.current = requestAnimationFrame(step);
            } else {
                setDisplay(text);
            }
        };

        startTimer = setTimeout(() => {
            frameRef.current = requestAnimationFrame(step);
        }, delay);

        return () => {
            clearTimeout(startTimer);
            if (frameRef.current) cancelAnimationFrame(frameRef.current);
        };
    }, [text, reduce, delay]);

    return React.createElement(as, { className, style, 'aria-label': text }, display);
};

export default DecodeText;
