import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_MARKET_INDICES } from '../../graphql/queries';
import { Card } from '../common/Card';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { formatPercent } from '../../utils/formatters';

import { useAppDispatch } from '../../store/hooks';
import { selectSymbol } from '../../store/slices/watchlistSlice';

export const MarketOverview: React.FC = () => {
    const { data, loading, error } = useQuery(GET_MARKET_INDICES);
    const dispatch = useAppDispatch();

    if (loading) return <div className="h-24 flex items-center justify-center"><LoadingSpinner /></div>;
    if (error) return <div className="text-vv-danger text-sm">Error loading market data</div>;

    const indices = data?.marketIndices || [];

    return (
        <Card title="Market Overview" className="mb-4">
            <div className="grid grid-cols-3 gap-4">
                {indices.map((index: any) => (
                    <div
                        key={index.symbol}
                        className="bg-vv-bg-tertiary p-3 rounded-md flex flex-col items-center justify-center cursor-pointer hover:bg-vv-bg-hover transition-colors"
                        onClick={() => dispatch(selectSymbol(index.symbol))}
                    >
                        <div className="text-vv-text-tertiary text-xs font-bold mb-1">{index.name}</div>
                        <div className="text-vv-text-primary font-bold text-lg">
                            {index.value ? index.value.toFixed(2) : '0.00'}
                        </div>
                        <div className={`text-sm font-medium ${index.change >= 0 ? 'text-vv-green' : 'text-vv-danger'}`}>
                            {index.change > 0 ? '+' : ''}{index.change.toFixed(2)} ({formatPercent(index.changePercent)})
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
};
