import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    title?: string;
    id?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '', title, id }) => {
    return (
        <div id={id} className={`bg-vv-bg-secondary border border-vv-border rounded-lg shadow-lg overflow-hidden flex flex-col ${className}`}>
            {title && (
                <div className="px-4 py-3 border-b border-vv-border bg-vv-bg-tertiary">
                    <h3 className="font-semibold text-vv-text-primary">{title}</h3>
                </div>
            )}
            <div className="p-4 flex-1 min-h-0 flex flex-col">
                {children}
            </div>
        </div>
    );
};
