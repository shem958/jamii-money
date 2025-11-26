// redux/slices/authSlice.ts (Updated)
import { createSlice } from '@reduxjs/toolkit';

// CRITICAL FIX: Default to null/null for SSR safety
const initialState = {
    user: null,
    token: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            const { user, token } = action.payload;
            state.user = user;
            state.token = token;

            if (typeof window !== 'undefined' && token && user) {
                localStorage.setItem('user', JSON.stringify(user));
                localStorage.setItem('token', token);
            }
        },
        // NEW: Action to load initial data from local storage, only called client-side
        loadCredentials: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            if (typeof window !== 'undefined') {
                localStorage.removeItem('user');
                localStorage.removeItem('token');
            }
        },
    },
});

export const { setCredentials, loadCredentials, logout } = authSlice.actions;
export default authSlice.reducer;