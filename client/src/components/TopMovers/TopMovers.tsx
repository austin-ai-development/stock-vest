import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_TOP_MOVERS } from '../../graphql/queries';
import { Card } from '../common/Card';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { formatPrice, formatPercent } from '../../utils/formatters';
import { useAppDispatch } from '../../store/hooks';
import { selectSymbol } from '../../store/slices/watchlistSlice';

export const TopMovers: React.FC = () => {
    const { data, loading, error } = useQuery(GET_TOP_MOVERS);
    const dispatch = useAppDispatch();

    if (loading) return <div className="h-32 flex items-center justify-center"><LoadingSpinner /></div>;
    if (error) return <div className="text-vv-danger text-sm">Error loading top movers</div>;

    const gainers = data?.topGainers || [];
    const losers = data?.topLosers || [];

    const handleSelect = (symbol: string) => {
        dispatch(selectSymbol(symbol));
    };

    const renderList = (stocks: any[], isGainer: boolean) => (
        <div className="space-y-2">
            {stocks.map((stock: any) => (
                <div
                    key={stock.symbol}
                    className="flex justify-between items-center p-2 hover:bg-vv-bg-hover rounded cursor-pointer transition-colors"
                    onClick={() => handleSelect(stock.symbol)}
                >
                    <div>
                        <div className="font-bold text-vv-text-primary text-sm">{stock.symbol}</div>
                        <div className="text-xs text-vv-text-tertiary truncate w-24">{stock.name}</div>
                    </div>
                    <div className="text-right">
                        <div className="text-vv-text-primary text-sm">{formatPrice(stock.price)}</div>
                        <div className={`text-xs ${isGainer ? 'text-vv-green' : 'text-vv-danger'}`}>
                            {formatPercent(stock.changePercent)}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <div className="grid grid-cols-2 gap-4 h-full">
            <Card title="Top Gainers" className="h-full">
                {renderList(gainers, true)}
            </Card>
            <Card title="Top Losers" className="h-full">
                {renderList(losers, false)}
            </Card>
        </div>
    );
};
