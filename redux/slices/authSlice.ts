// redux/slices/authSlice.ts
import { createSlice } from '@reduxjs/toolkit';

const storedUser = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
const storedToken = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

const initialState = {
    user: storedUser ? JSON.parse(storedUser) : null,
    token: storedToken || null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            const { user, token } = action.payload;
            state.user = user;
            state.token = token;

            if (typeof window !== 'undefined') {
                localStorage.setItem('user', JSON.stringify(user));
                localStorage.setItem('token', token);
            }
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

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
