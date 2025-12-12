// redux/slices/authSlice.ts
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    token: null,
    // isAuthInitialized is now obsolete
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            const { user, token } = action.payload;
            state.user = user;
            state.token = token;
            // Redux Persist handles saving to localStorage automatically
        },
        // loadCredentials action is no longer necessary
        logout: (state) => {
            state.user = null;
            state.token = null;
            // Redux Persist handles clearing local storage automatically
        },
    },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;