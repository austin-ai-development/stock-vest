import * as finnhub from 'finnhub';
import axios from 'axios';
import NodeCache from 'node-cache';
import dotenv from 'dotenv';
dotenv.config();

const api_key = process.env.FINNHUB_API_KEY ? finnhub.ApiClient.instance.authentications['api_key'] : null;
if (api_key) {
    api_key.apiKey = process.env.FINNHUB_API_KEY;
}

const finnhubClient = new finnhub.DefaultApi();
const cache = new NodeCache({ stdTTL: 60 }); // Cache for 60 seconds

export const FinnhubService = {
    getQuote: async (symbol: string) => {
        if (!process.env.FINNHUB_API_KEY) return null;

        const cached = cache.get(`quote_${symbol}`);
        if (cached) return cached;

        try {
            const response = await axios.get(`https://finnhub.io/api/v1/quote`, {
                params: {
                    symbol: symbol.toUpperCase(),
                    token: process.env.FINNHUB_API_KEY
                }
            });

            const data = response.data;
            const formatted = {
                symbol: symbol.toUpperCase(),
                price: data.c,
                change: data.d,
                changePercent: data.dp,
                high: data.h,
                low: data.l,
                open: data.o,
                previousClose: data.pc,
                lastUpdated: new Date().toISOString()
            };
            cache.set(`quote_${symbol}`, formatted);
            return formatted;
        } catch (error: any) {
            const status = error.response?.status;
            if (status === 401) {
                console.error(`Finnhub API Unauthorized (Quote). Check your API key. Symbol: ${symbol}`);
            } else if (status === 429) {
                console.error(`Finnhub API Limit Reached (Quote). Symbol: ${symbol}`);
            } else {
                console.error(`Error fetching quote for ${symbol}:`, error.message);
            }
            return null;
        }
    },

    search: async (query: string) => {
        console.log(`[FinnhubService] Searching for: ${query}`);
        if (!process.env.FINNHUB_API_KEY) {
            console.error("[FinnhubService] Missing FINNHUB_API_KEY");
            return [];
        }

        try {
            const response = await axios.get(`https://finnhub.io/api/v1/search`, {
                params: {
                    q: query,
                    token: process.env.FINNHUB_API_KEY
                }
            });

            const data = response.data;
            return data?.result ? data.result.map((item: any) => ({
                symbol: item.symbol,
                name: item.description,
                price: 0,
                change: 0,
                changePercent: 0
            })) : [];

        } catch (error: any) {
            const status = error.response?.status;
            if (status === 401) {
                console.error(`Finnhub API Unauthorized (Search). Check your API key.`);
            } else if (status === 429) {
                console.error(`Finnhub API Limit Reached (Search).`);
            } else {
                console.error(`Error searching stocks for ${query}:`, error.message);
            }
            return [];
        }
    },

    // Add other methods (market news, candles/chart data) as needed
};
