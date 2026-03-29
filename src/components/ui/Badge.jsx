import React from 'react';

const Badge = ({ children, className = '' }) => {
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium bg-rose-500/10 text-rose-300 border border-rose-500/20 backdrop-blur-sm shadow-[0_0_10px_rgba(244,63,94,0.1)] ${className}`}>
      {children}
    </span>
  );
};

export default Badge;
