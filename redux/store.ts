// redux/store.ts (FINAL FIX FOR SSR ISSUE)
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
// ❌ REMOVED: import storage from 'redux-persist/lib/storage';

// 👇 1. Conditional Storage Import Helper (CRITICAL FIX)
const isClient = typeof window !== 'undefined';
const storage = isClient
    ? require('redux-persist/lib/storage').default // Import localStorage on client
    : require('redux-persist/lib/storage/createWebStorage').default('no-op'); // Fallback for SSR

import { authApi } from '@/redux/api/authApi';
import authReducer from '@/redux/slices/authSlice';
import walletReducer from '@/redux/slices/walletSlice';

const rootReducer = combineReducers({
    // RTK Query reducers
    [authApi.reducerPath]: authApi.reducer,
    // Local app state reducers
    auth: authReducer,
    wallet: walletReducer,
});

// 2. Persist Configuration
const persistConfig = {
    key: 'root',
    storage, // 👈 Uses the conditional storage defined above
    whitelist: ['auth'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(authApi.middleware),
    devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;