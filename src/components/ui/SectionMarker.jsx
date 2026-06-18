import React from 'react';

/**
 * Research-log section marker: mono index + label with a hairline rule.
 * The only structural divider between the five acts (VisualSystem.md §4).
 *
 *   01 / WORK ──────────────────────────────
 */
const SectionMarker = ({ index, label, id }) => (
    <div id={id} className="flex items-center gap-4 mb-12 scroll-mt-28">
        <span className="font-mono text-xs tracking-[0.25em] text-rose-400 uppercase whitespace-nowrap">
            {index} <span className="text-zinc-600">/</span> {label}
        </span>
        <span className="h-px flex-1 bg-gradient-to-r from-rose-500/30 via-white/10 to-transparent" />
    </div>
);

export default SectionMarker;
