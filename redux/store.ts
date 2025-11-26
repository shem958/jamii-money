import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '@/redux/api/authApi';
import authReducer from '@/redux/slices/authSlice'; // 👈 NEW: Import authReducer
import walletReducer from '@/redux/slices/walletSlice';

export const store = configureStore({
    reducer: {
        // RTK Query reducers
        [authApi.reducerPath]: authApi.reducer,

        // Local app state reducers
        auth: authReducer, // 👈 ADDED: The local auth slice
        wallet: walletReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware),
    devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;