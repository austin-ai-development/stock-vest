import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Card } from '../common/Card';
import { useQuery } from '@apollo/client';
import { GET_STOCK_CHART } from '../../graphql/queries';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { useAppSelector } from '../../store/hooks';

const ranges = ['1D', '5D', '1M', '3M', '1Y'];

export const StockChart: React.FC = () => {
    const [timeRange, setTimeRange] = useState('1M');
    const selectedSymbol = useAppSelector(state => state.watchlist.selectedSymbol);

    const { data, loading } = useQuery(GET_STOCK_CHART, {
        variables: { symbol: selectedSymbol || '', timeRange },
        skip: !selectedSymbol,
        onCompleted: (d) => console.log('Chart Data Received:', d),
        onError: (e) => console.error('Chart Error:', e)
    });

    if (!selectedSymbol) {
        return (
            <Card className="h-full flex items-center justify-center text-vv-text-tertiary">
                Select a stock to view its chart
            </Card>
        );
    }

    return (
        <Card className="h-full flex flex-col p-4 overflow-hidden">
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h2 className="text-2xl font-bold text-vv-text-primary">{selectedSymbol}</h2>
                    {/* Add more profile info here */}
                </div>
                <div className="flex space-x-1 bg-vv-bg-tertiary rounded-md p-1">
                    {ranges.map(range => (
                        <button
                            key={range}
                            onClick={() => setTimeRange(range)}
                            className={`px-3 py-1 text-sm rounded-md transition-colors ${timeRange === range ? 'bg-vv-green text-white shadow-sm' : 'text-vv-text-secondary hover:text-vv-text-primary'}`}
                        >
                            {range}
                        </button>
                    ))}
                </div>
            </div>

            {/* 
                Chart Container: 
                - flex-1 min-h-0: Fills remaining vertical space in Card, but allows shrinking.
                - relative: Establishes a positioning context for the absolute child.
            */}
            {/* 
                Chart Container: 
                - flex-1 min-h-0: Fills remaining vertical space in Card, but allows shrinking.
                - relative: Establishes a positioning context for the absolute child.
            */}
            <div className="flex-1 min-h-0 relative w-full">
                {loading ? (
                    <LoadingSpinner />
                ) : (
                    /* 
                        Absolute Positioning Wrapper:
                        - inset-0: Pins to edges of the relative parent.
                        - Takes rendering out of flow to prevent "infinite growth loop" where chart pushes parent.
                    */
                    <div className="absolute inset-0">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data?.stockChart?.data || []}>
                                <defs>
                                    <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#00A651" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#00A651" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="timestamp" hide />
                                <YAxis
                                    domain={['auto', 'auto']}
                                    orientation="right"
                                    tick={{ fill: '#6C7A89', fontSize: 12 }}
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1A1F2E', borderColor: '#2D3748', color: '#E8EAED' }}
                                    itemStyle={{ color: '#00A651' }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="price"
                                    stroke="#00A651"
                                    strokeWidth={2}
                                    fillOpacity={1}
                                    fill="url(#colorPrice)"
                                    isAnimationActive={false}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                )}
            </div>
        </Card>
    );
};
