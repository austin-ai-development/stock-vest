import React from 'react';
import { Watchlist } from '../Watchlist/Watchlist';
import { StockSearch } from '../StockSearch/StockSearch';
import { StockChart } from '../StockChart/StockChart';
import { MarketOverview } from '../MarketOverview/MarketOverview';
import { TopMovers } from '../TopMovers/TopMovers';

import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { selectSymbol } from '../../store/slices/watchlistSlice';
import { useEffect } from 'react';

export const Dashboard: React.FC = () => {
    const dispatch = useAppDispatch();
    const { symbols, selectedSymbol } = useAppSelector(state => state.watchlist);

    // Auto-select first stock if none selected
    useEffect(() => {
        if (!selectedSymbol && symbols.length > 0) {
            dispatch(selectSymbol(symbols[0]));
        }
    }, [symbols, selectedSymbol, dispatch]);

    return (
        <div className="min-h-screen w-full flex flex-col bg-vv-bg-primary lg:h-screen lg:overflow-hidden">
            {/* Header */}
            <header className="bg-vv-bg-secondary border-b border-vv-border px-6 py-4 flex items-center justify-between shadow-sm z-10 shrink-0">
                <div className="flex items-center space-x-2">
                    <span className="text-2xl text-vv-green">⬢</span>
                    <span className="text-xl font-bold tracking-tight text-vv-text-primary">StockVest</span>
                </div>
                <div className="text-sm text-vv-text-tertiary hidden lg:block">
                    VectorVest Demo
                </div>
            </header>

            {/* Main Content Grid */}
            <main className="flex-1 p-4 grid grid-cols-1 gap-4 lg:grid-cols-12 lg:min-h-0 lg:overflow-visible">
                {/* Left Panel: Watchlist (3 cols) */}
                <div className="order-1 lg:order-1 lg:col-span-3 lg:h-full lg:min-h-0 h-96">
                    <Watchlist />
                </div>

                {/* Center Panel: Chart, Top Movers, Market Overview (6 cols) */}
                <div className="order-2 lg:order-2 lg:col-span-6 lg:h-full lg:min-h-0 flex flex-col gap-4">
                    {/* On Mobile: Chart first, then Movers, then Overview at bottom */}
                    {/* On Desktop: Overview first, then Chart, then Movers (We need to use order- classes inside flex too) */}

                    {/* Market Overview: Mobile Order 3, Desktop Order 1 */}
                    <div className="order-3 lg:order-1 shrink-0">
                        <MarketOverview />
                    </div>

                    {/* Chart: Mobile Order 1, Desktop Order 2 */}
                    <div className="order-1 lg:order-2 h-[400px] lg:flex-1 lg:h-auto lg:min-h-0 relative">
                        <StockChart />
                    </div>

                    {/* Top Movers: Mobile Order 2, Desktop Order 3 */}
                    <div className="order-2 lg:order-3 h-auto lg:h-64 shrink-0">
                        <TopMovers />
                    </div>
                </div>

                {/* Right Panel: Search & Details (3 cols) */}
                <div className="order-3 lg:order-3 lg:col-span-3 lg:h-full lg:min-h-0 h-auto">
                    <StockSearch />
                </div>
            </main>
        </div>
    );
};
