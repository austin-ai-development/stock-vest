import { createSlice } from '@reduxjs/toolkit';

interface MarketState {
    // Add market global state if needed
    status: 'open' | 'closed';
}

const initialState: MarketState = {
    status: 'open'
};

const marketSlice = createSlice({
    name: 'market',
    initialState,
    reducers: {
        // helpers
    }
});

export default marketSlice.reducer;
