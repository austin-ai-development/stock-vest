import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { Button } from '../common/Button';
import { GET_WATCHLIST, GET_TOP_MOVERS, GET_MARKET_INDICES } from '../../graphql/queries';

interface SplashScreenProps {
    onComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
    const [fading, setFading] = useState(false);
    const [startPrefetch, setStartPrefetch] = useState(false);

    // Start prefetching data after 1 second to ensure smooth splash screen rendering
    useEffect(() => {
        const timer = setTimeout(() => setStartPrefetch(true), 1000);
        return () => clearTimeout(timer);
    }, []);

    // Prefetch critical data - Apollo Client will cache these results
    // When Dashboard mounts, it will read from cache for instant rendering
    useQuery(GET_WATCHLIST, { skip: !startPrefetch });
    useQuery(GET_TOP_MOVERS, { skip: !startPrefetch });
    useQuery(GET_MARKET_INDICES, { skip: !startPrefetch });

    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (e.key === 'Enter') handleContinue();
        };
        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, []);

    const handleContinue = () => {
        setFading(true);
        setTimeout(onComplete, 500); // 0.5s fade out match
    };

    if (fading) return <div className="fixed inset-0 bg-vv-bg-primary transition-opacity duration-500 opacity-0 pointer-events-none z-50"></div>;

    return (
        <div className="fixed inset-0 bg-vv-bg-primary flex flex-col items-center justify-center z-50 text-vv-text-primary p-4 pb-safe">
            <div className="max-w-2xl w-full border border-vv-border rounded-lg p-8 pb-6 bg-vv-bg-secondary shadow-2xl relative overflow-hidden max-h-[90vh] overflow-y-auto">
                {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-full h-1 bg-vv-green"></div>

                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold mb-2 tracking-tight">
                        <span className="text-vv-green">⬢</span> StockVest
                    </h1>
                    <p className="text-vv-text-tertiary uppercase tracking-widest text-sm">VectorVest Interview Demo</p>
                </div>

                <div className="space-y-6 mb-8">
                    <p className="text-center text-lg text-vv-text-secondary">Built with Modern Web Technologies</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center space-x-2"><span className="text-vv-green">✓</span> <span>React 18 + TypeScript</span></div>
                        <div className="flex items-center space-x-2"><span className="text-vv-green">✓</span> <span>Redux Toolkit (State Management)</span></div>
                        <div className="flex items-center space-x-2"><span className="text-vv-green">✓</span> <span>GraphQL + Apollo Client/Server</span></div>
                        <div className="flex items-center space-x-2"><span className="text-vv-green">✓</span> <span>Jest + React Testing Library</span></div>
                        <div className="flex items-center space-x-2"><span className="text-vv-green">✓</span> <span>Tailwind CSS</span></div>
                        <div className="flex items-center space-x-2"><span className="text-vv-green">✓</span> <span>Recharts</span></div>
                    </div>
                </div>

                <div className="text-center space-y-4">
                    <p className="text-vv-text-primary font-medium">Thank you for the opportunity to interview with VectorVest</p>

                    <div className="pt-4">
                        <Button onClick={handleContinue} glow className="min-w-[200px]">
                            Enter Dashboard
                        </Button>
                    </div>
                    <p className="text-xs text-vv-text-tertiary mt-4">Press Enter or Click to Continue</p>
                </div>

                <div className="mt-6 pt-4 border-t border-vv-border text-center text-xs text-vv-text-tertiary">
                    Built by Austin Vincelli-Evans • {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </div>
            </div>
        </div>
    );
};
