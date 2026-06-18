import React from 'react';
import { motion as Motion, useReducedMotion } from 'motion/react';

/**
 * Standard entrance: fade + rise, fires once when scrolled into view.
 * Tokens: --dur-med (400ms), --ease-out-expo. Under reduced motion it
 * becomes an instant opacity-only change (VisualSystem.md §2.3).
 *
 * Stagger siblings by passing incremental `delay` (0.06s steps, max 5 items).
 */
const Reveal = ({ children, delay = 0, y = 24, className }) => {
    const reduce = useReducedMotion();

    return (
        <Motion.div
            className={className}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{
                duration: reduce ? 0 : 0.4,
                delay: reduce ? 0 : delay,
                ease: [0.16, 1, 0.3, 1],
            }}
        >
            {children}
        </Motion.div>
    );
};

export default Reveal;
