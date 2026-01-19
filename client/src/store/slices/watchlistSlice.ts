import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WatchlistState {
    symbols: string[];
    selectedSymbol: string | null;
}

const initialState: WatchlistState = {
    symbols: [],
    selectedSymbol: null
};

const watchlistSlice = createSlice({
    name: 'watchlist',
    initialState,
    reducers: {
        setWatchlist: (state, action: PayloadAction<string[]>) => {
            state.symbols = action.payload;
        },
        addSymbolOptimistic: (state, action: PayloadAction<string>) => {
            if (!state.symbols.includes(action.payload)) {
                state.symbols.push(action.payload);
            }
        },
        removeSymbolOptimistic: (state, action: PayloadAction<string>) => {
            state.symbols = state.symbols.filter(s => s !== action.payload);
        },
        selectSymbol: (state, action: PayloadAction<string | null>) => {
            state.selectedSymbol = action.payload;
        }
    }
});

export const {
    setWatchlist,
    addSymbolOptimistic,
    removeSymbolOptimistic,
    selectSymbol
} = watchlistSlice.actions;

export default watchlistSlice.reducer;
