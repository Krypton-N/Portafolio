import React, { useCallback, useEffect, useRef, useState } from 'react';
import { MoveHorizontal } from 'lucide-react';

/**
 * Inline before/after comparison with a draggable divider (clip-path).
 * Used as the Act 2 centerpiece (VisualSystem.md §4). Mouse + touch + keyboard.
 */
const BeforeAfterSlider = ({ beforeSrc, afterSrc, beforeLabel = 'Before', afterLabel = 'After', className = '' }) => {
    const [pos, setPos] = useState(50); // percent
    const [dragging, setDragging] = useState(false);
    const containerRef = useRef(null);

    const setFromClientX = useCallback((clientX) => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect) return;
        const pct = ((clientX - rect.left) / rect.width) * 100;
        setPos(Math.max(0, Math.min(100, pct)));
    }, []);

    useEffect(() => {
        if (!dragging) return;
        const onMove = (e) => {
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            setFromClientX(clientX);
        };
        const onUp = () => setDragging(false);
        window.addEventListener('pointermove', onMove);
        window.addEventListener('pointerup', onUp);
        window.addEventListener('touchmove', onMove, { passive: true });
        window.addEventListener('touchend', onUp);
        return () => {
            window.removeEventListener('pointermove', onMove);
            window.removeEventListener('pointerup', onUp);
            window.removeEventListener('touchmove', onMove);
            window.removeEventListener('touchend', onUp);
        };
    }, [dragging, setFromClientX]);

    const onKeyDown = (e) => {
        if (e.key === 'ArrowLeft') setPos((p) => Math.max(0, p - 4));
        if (e.key === 'ArrowRight') setPos((p) => Math.min(100, p + 4));
    };

    return (
        <div
            ref={containerRef}
            className={`relative select-none overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 ${className}`}
            onPointerDown={(e) => { setDragging(true); setFromClientX(e.clientX); }}
        >
            {/* After (base layer) */}
            <img
                src={afterSrc}
                alt={afterLabel}
                className="block w-full h-auto pointer-events-none"
                draggable={false}
                loading="lazy"
            />
            <span className="absolute top-3 right-3 z-10 text-[10px] font-bold uppercase tracking-widest bg-rose-500/80 text-white px-2.5 py-1 rounded-md border border-rose-400/30">
                {afterLabel}
            </span>

            {/* Before (clipped overlay) */}
            <div
                className="absolute inset-0 overflow-hidden pointer-events-none"
                style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
            >
                <img
                    src={beforeSrc}
                    alt={beforeLabel}
                    className="block w-full h-auto"
                    draggable={false}
                    loading="lazy"
                />
                <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-widest bg-zinc-900/80 text-zinc-300 px-2.5 py-1 rounded-md border border-white/10">
                    {beforeLabel}
                </span>
            </div>

            {/* Divider + handle */}
            <div
                className="absolute top-0 bottom-0 z-20 w-px bg-rose-400/80 shadow-[0_0_12px_rgba(244,63,94,0.5)]"
                style={{ left: `${pos}%` }}
            >
                <button
                    type="button"
                    onKeyDown={onKeyDown}
                    aria-label="Drag to compare before and after"
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-zinc-900/90 border border-rose-400/40 backdrop-blur-sm flex items-center justify-center text-rose-300 cursor-ew-resize hover:scale-110 transition-transform shadow-lg"
                >
                    <MoveHorizontal size={18} />
                </button>
            </div>
        </div>
    );
};

export default BeforeAfterSlider;
