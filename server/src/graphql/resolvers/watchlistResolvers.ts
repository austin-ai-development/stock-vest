import { WatchlistService } from '../../services/watchlistService';

export const watchlistResolvers = {
    Query: {
        watchlist: () => {
            return WatchlistService.getWatchlist();
        }
    },
    Mutation: {
        addToWatchlist: (_: any, { symbol }: { symbol: string }) => {
            return WatchlistService.addSymbol(symbol);
        },
        removeFromWatchlist: (_: any, { symbol }: { symbol: string }) => {
            return WatchlistService.removeSymbol(symbol);
        },
        clearWatchlist: () => {
            return WatchlistService.clear();
        }
    }
};
