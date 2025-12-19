// redux/store.ts (FIXED VERSION)
import { configureStore } from '@reduxjs/toolkit';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
} from 'redux-persist';

// Conditional Storage Import Helper (for SSR)
const isClient = typeof window !== 'undefined';
const storage = isClient
    ? require('redux-persist/lib/storage').default
    : require('redux-persist/lib/storage/createWebStorage').default('no-op');

import { authApi } from '@/redux/api/authApi';
import authReducer from '@/redux/slices/authSlice';
import walletReducer from '@/redux/slices/walletSlice';

// CRITICAL FIX: Persist only the auth slice, not the whole root
const persistConfig = {
    key: 'auth',
    storage,
    whitelist: ['user', 'token'], // Only persist these fields within auth
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
    reducer: {
        // RTK Query reducer (not persisted)
        [authApi.reducerPath]: authApi.reducer,
        // Persisted auth reducer
        auth: persistedAuthReducer,
        // Regular wallet reducer (not persisted)
        wallet: walletReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(authApi.middleware),
    devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;