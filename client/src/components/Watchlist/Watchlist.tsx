import React, { useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_WATCHLIST, GET_STOCKS_BY_SYMBOLS } from '../../graphql/queries';
import { REMOVE_FROM_WATCHLIST } from '../../graphql/mutations';
import { Card } from '../common/Card';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setWatchlist, removeSymbolOptimistic, selectSymbol } from '../../store/slices/watchlistSlice';

export const Watchlist: React.FC = () => {
    // 1. Get Watchlist IDs
    const { data: watchlistData, loading: watchlistLoading } = useQuery(GET_WATCHLIST);
    const dispatch = useAppDispatch();
    const symbols = useAppSelector(state => state.watchlist.symbols);
    const selectedSymbol = useAppSelector(state => state.watchlist.selectedSymbol);

    // 2. Sync Redux with Watchlist Data
    useEffect(() => {
        if (watchlistData?.watchlist?.symbols) {
            dispatch(setWatchlist(watchlistData.watchlist.symbols));
        }
    }, [watchlistData, dispatch]);

    // 3. Get Stock Details for ALL symbols
    // Note: In real app, might want to batch or use subscription
    const { data: stocksData } = useQuery(GET_STOCKS_BY_SYMBOLS, {
        variables: { symbols },
        skip: symbols.length === 0,
        pollInterval: 10000 // Poll every 10s for real-time-ish updates
    });

    const [removeFromWatchlist] = useMutation(REMOVE_FROM_WATCHLIST);

    const handleRemove = async (e: React.MouseEvent, symbol: string) => {
        e.stopPropagation();
        dispatch(removeSymbolOptimistic(symbol));
        try {
            await removeFromWatchlist({
                variables: { symbol },
                refetchQueries: ['GetWatchlist']
            });
        } catch (err) {
            console.error(err);
        }
    };

    const handleSelect = (symbol: string) => {
        dispatch(selectSymbol(symbol));
    };

    if (watchlistLoading) return <LoadingSpinner />;

    return (
        <Card title="My Watchlist" className="h-full flex flex-col">
            <div className="flex-1 overflow-y-auto">
                {!symbols.length && (
                    <div className="text-center text-vv-text-tertiary py-8">
                        Your watchlist is empty.
                        <br />Search for stocks to add them.
                    </div>
                )}
                {stocksData?.stocks?.map((stock: any) => (
                    <div
                        key={stock.symbol}
                        onClick={() => handleSelect(stock.symbol)}
                        className={`flex items-center justify-between p-3 border-b border-vv-border cursor-pointer transition-colors ${selectedSymbol === stock.symbol ? 'bg-vv-bg-tertiary border-l-4 border-l-vv-green' : 'hover:bg-vv-bg-hover'}`}
                    >
                        <div>
                            <div className="font-bold text-vv-text-primary">{stock.symbol}</div>
                            <div className="text-xs text-vv-text-secondary">{stock.name}</div>
                        </div>
                        <div className="text-right">
                            <div className="font-mono text-vv-text-primary">
                                ${stock.price.toFixed(2)}
                            </div>
                            <div className={`text-xs font-mono flex items-center justify-end ${stock.change >= 0 ? 'text-vv-success' : 'text-vv-danger'}`}>
                                {stock.change >= 0 ? '↑' : '↓'} {Math.abs(stock.changePercent).toFixed(2)}%
                            </div>
                        </div>
                        <button
                            onClick={(e) => handleRemove(e, stock.symbol)}
                            className="ml-2 text-vv-text-tertiary hover:text-vv-danger"
                        >
                            ×
                        </button>
                    </div>
                ))}
            </div>
        </Card>
    );
};
