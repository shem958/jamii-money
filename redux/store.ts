import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '@/redux/api/authApi';
import walletReducer from '@/redux/slices/walletSlice'; // ✅ import your local slice

export const store = configureStore({
    reducer: {
        // RTK Query reducers
        [authApi.reducerPath]: authApi.reducer,

        // Local app state reducers
        wallet: walletReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware),
    devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
