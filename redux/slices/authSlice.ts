// redux/slices/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { REHYDRATE } from 'redux-persist';
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
            state.user = user;
            state.token = token;
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
        },
    },
    extraReducers: (builder) => {
        // Handle rehydration from redux-persist
        builder.addCase(REHYDRATE, (state, action: any) => {
            if (action.payload?.auth) {
                state.user = action.payload.auth.user;
                state.token = action.payload.auth.token;
            }
        });
    },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;