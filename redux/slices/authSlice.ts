import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, AuthUser } from '@/redux/types';

const initialState: AuthState = {
    user: null,
    token: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<{ user: AuthUser; token: string }>) => {
            const { user, token } = action.payload;
            // Ensure we only set state if both values exist
            if (user && token) {
                state.user = user;
                state.token = token;
            }
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
        },
    }
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;