import fs from 'fs';
import path from 'path';

const DATA_FILE = path.resolve(__dirname, '../../data/watchlist.json');

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
        return JSON.parse(data);
    } catch (error) {
        // If file doesn't exist, return default
        return {
            watchlist: {
                id: '1',
                symbols: [],
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            }
        };
    }
};

// Helper to write DB
const writeDB = (db: DB) => {
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
        db.watchlist.symbols = db.watchlist.symbols.filter(s => s !== symbol);
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
