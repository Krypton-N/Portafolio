import React from 'react';

const Button = ({ children, onClick, variant = 'primary', className = '', href, ...props }) => {
    const baseStyles = "px-6 py-2 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer";

    const variants = {
        primary: "bg-rose-600 text-white hover:bg-rose-500 shadow-[0_0_20px_rgba(225,29,72,0.4)] hover:shadow-[0_0_30px_rgba(225,29,72,0.6)]",
        secondary: "bg-white/5 backdrop-blur-md border border-white/10 text-white hover:bg-white/10 hover:border-white/20 hover:scale-105",
        ghost: "bg-transparent text-zinc-400 hover:text-rose-400 hover:bg-white/5",
    };

    const Component = href ? 'a' : 'button';

    return (
        <Component
            href={href}
            onClick={onClick}
            className={`${baseStyles} ${variants[variant] || variants.primary} ${className}`}
            {...props}
        >
            {children}
        </Component>
    );
};

export default Button;
