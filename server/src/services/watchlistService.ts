import fs from 'fs';
import path from 'path';

const DATA_FILE = path.resolve(__dirname, '../../data/watchlist.json');
const DEFAULT_STOCKS = ['AAPL', 'TSLA', 'MSFT']; // Default stocks for new users

interface WatchlistData {
    id: string;
    symbols: string[];
    createdAt: string;
    updatedAt: string;
}

interface DB {
    watchlist: WatchlistData;
}

// Helper to read DB
const readDB = (): DB => {
    try {
        const data = fs.readFileSync(DATA_FILE, 'utf-8');
        const db = JSON.parse(data);

        // If watchlist is empty, populate with default stocks
        if (!db.watchlist.symbols || db.watchlist.symbols.length === 0) {
            db.watchlist.symbols = DEFAULT_STOCKS;
            db.watchlist.updatedAt = new Date().toISOString();
            writeDB(db);
        }

        return db;
    } catch (error) {
        // If file doesn't exist, return default with starter stocks
        return {
            watchlist: {
                id: '1',
                symbols: DEFAULT_STOCKS,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            }
        };
    }
};

// Helper to write DB
const writeDB = (db: DB) => {
    fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
    fs.writeFileSync(DATA_FILE, JSON.stringify(db, null, 2));
};

export const WatchlistService = {
    getWatchlist: () => {
        const db = readDB();
        return db.watchlist;
    },

    addSymbol: (symbol: string) => {
        const db = readDB();
        if (!db.watchlist.symbols.includes(symbol)) {
            db.watchlist.symbols.push(symbol);
            db.watchlist.updatedAt = new Date().toISOString();
            writeDB(db);
        }
        return db.watchlist;
    },

    removeSymbol: (symbol: string) => {
        const db = readDB();
        db.watchlist.symbols = db.watchlist.symbols.filter((s: string) => s !== symbol);
        db.watchlist.updatedAt = new Date().toISOString();
        writeDB(db);
        return db.watchlist;
    },

    clear: () => {
        const db = readDB();
        db.watchlist.symbols = [];
        db.watchlist.updatedAt = new Date().toISOString();
        writeDB(db);
        return db.watchlist;
    }
};
