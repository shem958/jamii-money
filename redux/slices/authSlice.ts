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
            
            console.log('🔐 setCredentials action dispatched');
            console.log('   User:', user?.name, user?.email);
            console.log('   Token:', token?.substring(0, 20) + '...');
            
            if (user && token) {
                state.user = user;
                state.token = token;
                console.log('✅ Credentials saved to Redux state');
                
                // Verify it's actually in state
                console.log('   State after update:', {
                    hasUser: !!state.user,
                    hasToken: !!state.token,
                });
            } else {
                console.warn('⚠️ Credentials incomplete:', { 
                    hasUser: !!user, 
                    hasToken: !!token 
                });
            }
        },
        logout: (state) => {
            console.log('🚪 Logout action dispatched');
            state.user = null;
            state.token = null;
        },
    }
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;