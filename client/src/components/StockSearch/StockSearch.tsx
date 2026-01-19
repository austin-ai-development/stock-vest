import React, { useState, useEffect } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import { SEARCH_STOCKS } from '../../graphql/queries';
import { ADD_TO_WATCHLIST } from '../../graphql/mutations';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addSymbolOptimistic, selectSymbol } from '../../store/slices/watchlistSlice';

export const StockSearch: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState<any[]>([]);
    const watchlistSymbols = useAppSelector(state => state.watchlist.symbols);

    const [searchStocks, { loading, data, error }] = useLazyQuery(SEARCH_STOCKS);

    useEffect(() => {
        if (error) console.error("Search Error:", error);
    }, [error]);
    const [addToWatchlist] = useMutation(ADD_TO_WATCHLIST);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (searchTerm.trim()) {
                searchStocks({ variables: { query: searchTerm } });
            } else {
                setResults([]);
            }
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [searchTerm, searchStocks]);

    useEffect(() => {
        if (data?.searchStocks) {
            setResults(data.searchStocks);
        }
    }, [data]);

    const handleAdd = async (symbol: string) => {
        // Redux Optimistic Update
        dispatch(addSymbolOptimistic(symbol));
        // GraphQL Mutation
        try {
            await addToWatchlist({
                variables: { symbol },
                refetchQueries: ['GetWatchlist'] // Ensure fresh data
            });
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Card title="Stock Search" className="h-full">
            <div className="relative mb-4">
                <input
                    type="text"
                    className="w-full bg-vv-bg-primary border border-vv-border rounded-md px-4 py-2 text-vv-text-primary focus:ring-2 focus:ring-vv-green outline-none"
                    placeholder="Search stocks (e.g. AAPL)..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="space-y-2 flex-1 min-h-0 overflow-y-auto">
                {loading && <LoadingSpinner />}
                {!loading && results.length === 0 && searchTerm && (
                    <div className="text-center text-vv-text-tertiary py-4">No results found</div>
                )}
                {results.map((stock) => (
                    <div
                        key={stock.symbol}
                        className="flex items-center justify-between p-2 hover:bg-vv-bg-hover rounded-md transition-colors cursor-pointer"
                        onClick={() => dispatch(selectSymbol(stock.symbol))}
                    >
                        <div>
                            <div className="font-bold text-vv-text-primary">{stock.symbol}</div>
                            <div className="text-sm text-vv-text-secondary truncate max-w-[150px]">{stock.name}</div>
                        </div>
                        <Button
                            variant="secondary"
                            className={`text-xs px-2 py-1 ${watchlistSymbols.includes(stock.symbol) ? 'opacity-50 cursor-not-allowed bg-vv-bg-tertiary' : 'bg-vv-bg-tertiary'}`}
                            disabled={watchlistSymbols.includes(stock.symbol)}
                            onClick={(e) => {
                                e.stopPropagation();
                                if (!watchlistSymbols.includes(stock.symbol)) {
                                    handleAdd(stock.symbol);
                                }
                            }}
                        >
                            {watchlistSymbols.includes(stock.symbol) ? 'Added' : '+ Add'}
                        </Button>
                    </div>
                ))}
            </div>
        </Card>
    );
};
