import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
    glow?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    glow = false,
    className = '',
    ...props
}) => {
    const baseStyles = 'px-4 py-2 rounded-md font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';

    const variants = {
        primary: 'bg-vv-green text-white hover:bg-vv-green-accent',
        secondary: 'bg-vv-bg-tertiary text-vv-text-primary hover:bg-vv-bg-hover',
        danger: 'bg-vv-danger text-white hover:opacity-90',
        ghost: 'bg-transparent text-vv-text-secondary hover:text-vv-text-primary'
    };

    const glowStyle = glow ? 'shadow-[0_0_8px_rgba(0,166,81,0.4)] hover:shadow-[0_0_12px_rgba(0,166,81,0.6)]' : '';

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${glowStyle} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};
