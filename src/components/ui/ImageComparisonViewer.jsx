import React, { useState, useRef, useCallback, useEffect } from 'react';
import { X, ZoomIn, ZoomOut, Move, ChevronLeft, ChevronRight } from 'lucide-react';

const ZOOM_LEVELS = [2, 3, 4, 5];
const LENS_SIZE = 320;

const ImageComparisonViewer = ({ isOpen, onClose, images = [], currentIndex = 0, onNavigate }) => {
    const current = images[currentIndex] || {};
    const { beforeSrc = '', afterSrc = '', sampleLabel = '' } = current;
    const [zoomLevel, setZoomLevel] = useState(2);
    const [lensPos, setLensPos] = useState({ x: 0.5, y: 0.5 });
    const [isLensActive, setIsLensActive] = useState(false);
    const [hoveredSide, setHoveredSide] = useState(null); // 'before' or 'after'
    const [beforeDims, setBeforeDims] = useState(null);
    const [afterDims, setAfterDims] = useState(null);
    const beforeRef = useRef(null);
    const afterRef = useRef(null);
    const overlayRef = useRef(null);

    const hasPrev = currentIndex > 0;
    const hasNext = currentIndex < images.length - 1;

    const goToPrev = useCallback(() => {
        if (hasPrev) {
            setBeforeDims(null);
            setAfterDims(null);
            setIsLensActive(false);
            onNavigate(currentIndex - 1);
        }
    }, [hasPrev, currentIndex, onNavigate]);

    const goToNext = useCallback(() => {
        if (hasNext) {
            setBeforeDims(null);
            setAfterDims(null);
            setIsLensActive(false);
            onNavigate(currentIndex + 1);
        }
    }, [hasNext, currentIndex, onNavigate]);

    // Keyboard: Escape, ArrowLeft, ArrowRight
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowLeft') goToPrev();
            if (e.key === 'ArrowRight') goToNext();
        };
        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
        };
    }, [isOpen, onClose, goToPrev, goToNext]);

    const handleMouseMove = useCallback((e, side) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
        const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
        setLensPos({ x, y });
        setIsLensActive(true);
        setHoveredSide(side);
    }, []);

    const handleMouseLeave = useCallback(() => {
        setIsLensActive(false);
        setHoveredSide(null);
    }, []);

    const cycleZoom = useCallback((direction) => {
        setZoomLevel(prev => {
            const currentIdx = ZOOM_LEVELS.indexOf(prev);
            if (direction === 'up') {
                return ZOOM_LEVELS[Math.min(currentIdx + 1, ZOOM_LEVELS.length - 1)];
            }
            return ZOOM_LEVELS[Math.max(currentIdx - 1, 0)];
        });
    }, []);

    if (!isOpen) return null;

    const renderLens = (imgRef, src, side) => {
        if (!isLensActive || !imgRef.current) return null;

        const rect = imgRef.current.getBoundingClientRect();
        const lensX = lensPos.x * rect.width;
        const lensY = lensPos.y * rect.height;

        const bgWidth = rect.width * zoomLevel;
        const bgHeight = rect.height * zoomLevel;
        const bgX = -(lensPos.x * bgWidth - LENS_SIZE / 2);
        const bgY = -(lensPos.y * bgHeight - LENS_SIZE / 2);

        return (
            <div
                className="lens-magnifier"
                style={{
                    position: 'absolute',
                    left: `${lensX - LENS_SIZE / 2}px`,
                    top: `${lensY - LENS_SIZE / 2}px`,
                    width: `${LENS_SIZE}px`,
                    height: `${LENS_SIZE}px`,
                    borderRadius: '50%',
                    border: hoveredSide === side
                        ? '3px solid rgba(244, 63, 94, 0.9)'
                        : '3px solid rgba(244, 63, 94, 0.5)',
                    boxShadow: hoveredSide === side
                        ? '0 0 20px rgba(244, 63, 94, 0.4), 0 0 60px rgba(0,0,0,0.5), inset 0 0 30px rgba(0,0,0,0.2)'
                        : '0 0 10px rgba(244, 63, 94, 0.2), 0 0 40px rgba(0,0,0,0.4), inset 0 0 20px rgba(0,0,0,0.15)',
                    backgroundImage: `url(${src})`,
                    backgroundSize: `${bgWidth}px ${bgHeight}px`,
                    backgroundPosition: `${bgX}px ${bgY}px`,
                    backgroundRepeat: 'no-repeat',
                    pointerEvents: 'none',
                    zIndex: 50,
                    transition: 'border-color 0.2s, box-shadow 0.2s',
                    overflow: 'hidden',
                }}
            >
                {/* Crosshair */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    pointerEvents: 'none',
                }}>
                    <div style={{
                        width: '1px',
                        height: '100%',
                        background: 'rgba(244, 63, 94, 0.3)',
                        position: 'absolute',
                    }} />
                    <div style={{
                        height: '1px',
                        width: '100%',
                        background: 'rgba(244, 63, 94, 0.3)',
                        position: 'absolute',
                    }} />
                </div>
            </div>
        );
    };

    return (
        <div
            ref={overlayRef}
            className="fixed inset-0 z-[9999] flex flex-col"
            style={{
                background: 'rgba(0, 0, 0, 0.95)',
                backdropFilter: 'blur(20px)',
            }}
        >
            {/* Header Bar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10"
                style={{ background: 'rgba(24, 24, 27, 0.8)' }}>
                <div className="flex items-center gap-4">
                    <h3 className="text-white font-semibold text-lg">{sampleLabel}</h3>
                    <span className="text-zinc-500 text-sm hidden sm:inline">
                        {currentIndex + 1} / {images.length} · Mueve el cursor para comparar con la lupa
                    </span>
                </div>

                <div className="flex items-center gap-3">
                    {/* Zoom controls */}
                    <div className="flex items-center gap-2 bg-zinc-800/80 rounded-xl px-3 py-1.5 border border-white/10">
                        <button
                            onClick={() => cycleZoom('down')}
                            className="text-zinc-400 hover:text-rose-400 transition-colors p-1"
                            title="Reducir zoom de lupa"
                        >
                            <ZoomOut size={18} />
                        </button>
                        <span className="text-sm font-mono text-rose-400 min-w-[2.5rem] text-center">
                            {zoomLevel}x
                        </span>
                        <button
                            onClick={() => cycleZoom('up')}
                            className="text-zinc-400 hover:text-rose-400 transition-colors p-1"
                            title="Aumentar zoom de lupa"
                        >
                            <ZoomIn size={18} />
                        </button>
                    </div>

                    {/* Close */}
                    <button
                        onClick={onClose}
                        className="text-zinc-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-xl"
                        title="Cerrar (Esc)"
                    >
                        <X size={22} />
                    </button>
                </div>
            </div>

            {/* Image Comparison Area */}
            <div className="flex-1 flex items-center justify-center p-4 sm:p-6 gap-4 overflow-hidden">
                {/* Before */}
                <div className="flex-1 flex flex-col items-center max-h-full">
                    <div className="mb-3 flex items-center gap-2">
                        <span className="text-xs font-bold uppercase tracking-widest bg-zinc-800 text-zinc-400 px-3 py-1 rounded-lg border border-white/10">
                            Antes
                        </span>
                    </div>
                    <div
                        className="relative rounded-2xl overflow-hidden border border-white/10 cursor-crosshair max-h-[calc(100vh-160px)] flex items-center justify-center"
                        style={{ background: 'rgba(9, 9, 11, 0.8)' }}
                        onMouseMove={(e) => handleMouseMove(e, 'before')}
                        onMouseLeave={handleMouseLeave}
                    >
                        <img
                            ref={beforeRef}
                            src={beforeSrc}
                            alt="Antes"
                            className="max-h-[calc(100vh-200px)] w-auto object-contain select-none"
                            draggable={false}
                            onLoad={(e) => setBeforeDims({ w: e.target.naturalWidth, h: e.target.naturalHeight })}
                        />
                        {renderLens(beforeRef, beforeSrc, 'before')}
                    </div>
                    {beforeDims && (
                        <span className="mt-2 text-xs font-mono text-zinc-500 bg-zinc-900/60 px-3 py-1 rounded-lg border border-white/5">
                            {beforeDims.w} × {beforeDims.h} px
                        </span>
                    )}
                </div>

                {/* Divider */}
                <div className="hidden sm:flex flex-col items-center gap-2 self-center">
                    <div className="w-px h-16 bg-gradient-to-b from-transparent via-rose-500/50 to-transparent" />
                    <Move size={16} className="text-rose-500/50" />
                    <div className="w-px h-16 bg-gradient-to-b from-transparent via-rose-500/50 to-transparent" />
                </div>

                {/* After */}
                <div className="flex-1 flex flex-col items-center max-h-full">
                    <div className="mb-3 flex items-center gap-2">
                        <span className="text-xs font-bold uppercase tracking-widest bg-rose-500/80 text-white px-3 py-1 rounded-lg border border-rose-400/30">
                            Después
                        </span>
                    </div>
                    <div
                        className="relative rounded-2xl overflow-hidden border border-white/10 cursor-crosshair max-h-[calc(100vh-160px)] flex items-center justify-center"
                        style={{ background: 'rgba(9, 9, 11, 0.8)' }}
                        onMouseMove={(e) => handleMouseMove(e, 'after')}
                        onMouseLeave={handleMouseLeave}
                    >
                        <img
                            ref={afterRef}
                            src={afterSrc}
                            alt="Después"
                            className="max-h-[calc(100vh-200px)] w-auto object-contain select-none"
                            draggable={false}
                            onLoad={(e) => setAfterDims({ w: e.target.naturalWidth, h: e.target.naturalHeight })}
                        />
                        {renderLens(afterRef, afterSrc, 'after')}
                    </div>
                    {afterDims && (
                        <span className="mt-2 text-xs font-mono text-zinc-500 bg-zinc-900/60 px-3 py-1 rounded-lg border border-white/5">
                            {afterDims.w} × {afterDims.h} px
                        </span>
                    )}
                </div>
            </div>

            {/* Navigation Arrows */}
            {hasPrev && (
                <button
                    onClick={goToPrev}
                    className="fixed left-4 top-1/2 -translate-y-1/2 z-[10000] bg-zinc-900/80 hover:bg-rose-500/80 text-zinc-300 hover:text-white p-3 rounded-full border border-white/10 hover:border-rose-400/50 transition-all duration-200 backdrop-blur-sm shadow-lg hover:shadow-rose-500/20"
                    title="Anterior (←)"
                >
                    <ChevronLeft size={24} />
                </button>
            )}
            {hasNext && (
                <button
                    onClick={goToNext}
                    className="fixed right-4 top-1/2 -translate-y-1/2 z-[10000] bg-zinc-900/80 hover:bg-rose-500/80 text-zinc-300 hover:text-white p-3 rounded-full border border-white/10 hover:border-rose-400/50 transition-all duration-200 backdrop-blur-sm shadow-lg hover:shadow-rose-500/20"
                    title="Siguiente (→)"
                >
                    <ChevronRight size={24} />
                </button>
            )}

            {/* Footer hint */}
            <div className="text-center pb-3">
                <p className="text-zinc-600 text-xs">
                    <kbd className="bg-zinc-800 text-zinc-400 px-1.5 py-0.5 rounded text-[10px] border border-white/10 mx-0.5">←</kbd>
                    <kbd className="bg-zinc-800 text-zinc-400 px-1.5 py-0.5 rounded text-[10px] border border-white/10 mx-0.5">→</kbd>
                    &nbsp;Navegar&nbsp;·&nbsp;
                    <kbd className="bg-zinc-800 text-zinc-400 px-1.5 py-0.5 rounded text-[10px] border border-white/10 mx-0.5">Esc</kbd>
                    &nbsp;Cerrar
                </p>
            </div>
        </div>
    );
};

export default ImageComparisonViewer;
