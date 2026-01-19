export interface Stock {
    symbol: string;
    name: string;
    price: number;
    change: number;
    changePercent: number;
    high?: number;
    low?: number;
    open?: number;
    previousClose?: number;
    volume?: number;
    marketCap?: number;
    lastUpdated?: string;
}

export interface Watchlist {
    id: string;
    symbols: string[];
    createdAt: string;
    updatedAt: string;
}
