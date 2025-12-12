// redux/slices/authSlice.ts
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    token: null,
    // isAuthInitialized and manual localStorage logic are removed
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            const { user, token } = action.payload;
            state.user = user;
            state.token = token;
            // Redux Persist automatically saves this state
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            // Redux Persist automatically clears this state (via PURGE or blacklist)
        },
    },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;