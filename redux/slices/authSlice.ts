// redux/slices/authSlice.ts (FINAL CORRECTED VERSION)
import { createSlice } from '@reduxjs/toolkit';

// Define the shape of the default state
const defaultAuthState = {
    user: null,
    token: null,
    isAuthInitialized: false,
};

// Function to synchronously read local storage during store creation
const getInitialAuthState = () => {
    if (typeof window === 'undefined') {
        // SSR: Always return the default, uninitialized state
        return defaultAuthState;
    }

    // Client Side: Synchronously check for token/user in localStorage
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser) {
        try {
            const user = JSON.parse(storedUser);
            // State is initialized and data found
            return {
                user: user,
                token: storedToken,
                isAuthInitialized: true, // DEFINITIVE: State is known
            };
        } catch (error) {
            console.error("Error parsing user from localStorage:", error);
            localStorage.removeItem('user');
            localStorage.removeItem('token');
        }
    }

    // No token found: Return default but mark as initialized (logged out)
    return { ...defaultAuthState, isAuthInitialized: true };
};

// Use the synchronous function result as the actual initial state
const authSlice = createSlice({
    name: 'auth',
    initialState: getInitialAuthState(), // 👈 CRITICAL: State is now synchronous
    reducers: {
        setCredentials: (state, action) => {
            const { user, token } = action.payload;
            state.user = user;
            state.token = token;
            state.isAuthInitialized = true; // Always true after login
            // ... (rest of local storage saving logic)
            if (typeof window !== 'undefined' && token && user) {
                localStorage.setItem('user', JSON.stringify(user));
                localStorage.setItem('token', token);
            }
        },
        // loadCredentials is removed as the initial state load is now synchronous
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthInitialized = true; // Always true after logout
            // ... (rest of local storage clearing logic)
            if (typeof window !== 'undefined') {
                localStorage.removeItem('user');
                localStorage.removeItem('token');
            }
        },
    },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;