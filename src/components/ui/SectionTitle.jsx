import React from 'react';

const SectionTitle = ({ title, subtitle }) => {
    return (
        <div className="mb-12 text-center">
            {subtitle && (
                <span className="block text-rose-500 font-mono text-sm mb-2 tracking-wider">
                    &lt;{subtitle} /&gt;
                </span>
            )}
            <h2 className="text-3xl md:text-4xl font-bold text-white">
                {title}
                <span className="text-rose-500">.</span>
            </h2>
        </div>
    );
};

export default SectionTitle;
