// Singleton access to the Lenis instance so navigation code
// (Navbar anchors, ScrollToTop) can drive the same scroller.
let lenis = null;

export const setLenis = (instance) => {
    lenis = instance;
};

export const getLenis = () => lenis;

/** Scroll helper that prefers Lenis and falls back to native. */
export const scrollTo = (target, options = {}) => {
    if (lenis) {
        lenis.scrollTo(target, { duration: 1.1, ...options });
    } else if (typeof target === 'number') {
        window.scrollTo({ top: target, behavior: options.immediate ? 'auto' : 'smooth' });
    } else if (target instanceof Element) {
        target.scrollIntoView({ behavior: options.immediate ? 'auto' : 'smooth' });
    }
};
