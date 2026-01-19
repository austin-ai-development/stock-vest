import { configureStore } from '@reduxjs/toolkit';
import watchlistReducer from './slices/watchlistSlice';
import marketReducer from './slices/marketSlice';

export const store = configureStore({
    reducer: {
        watchlist: watchlistReducer,
        market: marketReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
