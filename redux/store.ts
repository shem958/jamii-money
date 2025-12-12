// redux/store.ts
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
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

// 1. Persist Configuration
const persistConfig = {
    key: 'root',
    storage,
    // Only persist the 'auth' slice
    whitelist: ['auth'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    // 2. Use the persisted reducer
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            // 3. Ignore Redux Persist action types in the serializability check
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(authApi.middleware),
    devTools: process.env.NODE_ENV !== 'production',
});

// 4. Export the Persistor instance
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;