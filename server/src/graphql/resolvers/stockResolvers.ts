import { FinnhubService } from '../../services/finnhubService';

export const stockResolvers = {
    Query: {
        stock: async (_: any, { symbol }: { symbol: string }) => {
            const quote = await FinnhubService.getQuote(symbol);
            if (!quote) return null;
            // Note: Finnhub quote doesn't return name. In a real app we'd fetch profile.
            // For demo, we might compromise or fetch profile too.
            // Let's assume we can fetch profile or just use symbol as name fallback for now.
            return { ...quote, name: symbol };
        },
        searchStocks: async (_: any, { query }: { query: string }) => {
            return await FinnhubService.search(query);
        },
        stocks: async (_: any, { symbols }: { symbols: string[] }) => {
            const promises = symbols.map(s => FinnhubService.getQuote(s));
            const results = await Promise.all(promises);
            return results.filter(r => r !== null).map((r: any) => ({ ...r, name: r.symbol }));
        },
        stockChart: async (_: any, { symbol, timeRange }: { symbol: string, timeRange: string }) => {
            // Generate mock candle data
            const now = new Date();
            const data = [];
            let points = 50;
            let intervalDays = 1;

            switch (timeRange) {
                case '1D': points = 24; intervalDays = 0.04; break; // ~1 hour
                case '5D': points = 60; intervalDays = 0.1; break;
                case '1M': points = 30; intervalDays = 1; break;
                case '3M': points = 90; intervalDays = 1; break;
                case '1Y': points = 52; intervalDays = 7; break;
            }

            let price = 150 + Math.random() * 50; // Random start price

            for (let i = points; i >= 0; i--) {
                const date = new Date(now.getTime() - i * intervalDays * 24 * 60 * 60 * 1000);
                const volatility = price * 0.02; // 2% volatility
                const change = (Math.random() - 0.5) * volatility;
                price += change;

                data.push({
                    timestamp: date.toISOString(),
                    price: parseFloat(price.toFixed(2)),
                    volume: Math.floor(Math.random() * 10000) + 1000
                });
            }

            return {
                symbol,
                timeRange,
                data
            };
        },
        topGainers: async () => {
            // Mock Data for Demo
            return [
                { symbol: 'NVDA', name: 'NVIDIA Corp', price: 887.45, change: 24.32, changePercent: 2.89, high: 890.00, low: 860.00 },
                { symbol: 'META', name: 'Meta Platforms', price: 498.12, change: 12.45, changePercent: 2.56, high: 500.00, low: 485.00 },
                { symbol: 'AMD', name: 'Advanced Micro Devices', price: 178.90, change: 4.50, changePercent: 2.58, high: 180.00, low: 174.00 }
            ];
        },
        topLosers: async () => {
            // Mock Data for Demo
            return [
                { symbol: 'TSLA', name: 'Tesla Inc', price: 168.45, change: -5.60, changePercent: -3.21, high: 175.00, low: 165.00 },
                { symbol: 'LULU', name: 'Lululemon', price: 350.20, change: -8.90, changePercent: -2.48, high: 360.00, low: 348.00 },
                { symbol: 'BA', name: 'Boeing Co', price: 180.30, change: -3.45, changePercent: -1.88, high: 185.00, low: 179.00 }
            ];
        },
        marketIndices: async () => {
            // Use real data for indices (using ETF proxies)
            const symbols = ['SPY', 'DIA', 'QQQ'];
            const promises = symbols.map(s => FinnhubService.getQuote(s));
            const results = await Promise.all(promises);

            // Map results, falling back to mock if API fails/limits
            return results.map((quote: any, index) => {
                const symbol = symbols[index];
                const nameMap: Record<string, string> = { 'SPY': 'S&P 500', 'DIA': 'Dow Jones', 'QQQ': 'Nasdaq 100' };

                if (quote) {
                    return {
                        symbol,
                        name: nameMap[symbol],
                        value: quote.price,
                        change: quote.change,
                        changePercent: quote.changePercent
                    };
                } else {
                    // Fallback mock if API limit reached or error
                    const mocks: Record<string, any> = {
                        'SPY': { value: 520.00, change: 0, changePercent: 0 },
                        'DIA': { value: 390.00, change: 0, changePercent: 0 },
                        'QQQ': { value: 440.00, change: 0, changePercent: 0 }
                    };
                    return {
                        symbol,
                        name: nameMap[symbol],
                        ...mocks[symbol]
                    };
                }
            });
        }
    }
};
