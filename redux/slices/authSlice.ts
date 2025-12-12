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
    // 1. Check if we are on the browser (not SSR)
    if (typeof window === 'undefined') {
        return defaultAuthState;
    }

    // 2. Synchronously check for token/user in localStorage
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser) {
        try {
            const user = JSON.parse(storedUser);
            // State is initialized and data found
            return {
                user: user,
                token: storedToken,
                isAuthInitialized: true,
            };
        } catch (error) {
            console.error("Error parsing user from localStorage:", error);
            // Clear bad data and return initialized state (logged out)
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            return { ...defaultAuthState, isAuthInitialized: true };
        }
    }

    // 3. No token found: Return default but mark as initialized (logged out)
    return { ...defaultAuthState, isAuthInitialized: true };
};

// Use the synchronous function result as the actual initial state
const authSlice = createSlice({
    name: 'auth',
    initialState: getInitialAuthState(), // 👈 CRITICAL FIX: Synchronously initialize state
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
        // We remove loadCredentials as it is no longer needed
    },
});

export const { setCredentials, logout } = authSlice.actions; // Removed loadCredentials
export default authSlice.reducer;