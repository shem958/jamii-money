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
            
            console.log('🔐 setCredentials called:', { 
                hasUser: !!user, 
                hasToken: !!token,
                userName: user?.name 
            });
            
            // Ensure we only set state if both values exist
            if (user && token) {
                state.user = user;
                state.token = token;
                console.log('✅ Credentials set in Redux state');
            } else {
                console.warn('⚠️ Credentials incomplete:', { user, token });
            }
        },
        logout: (state) => {
            console.log('🚪 Logout called');
            state.user = null;
            state.token = null;
        },
    }
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;