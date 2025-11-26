// app/AuthLoader.tsx
'use client';

import { useEffect, useState, ReactNode } from 'react';
import { useDispatch } from 'react-redux';
import { loadCredentials } from '@/redux/slices/authSlice'; // This action will be created next

export default function AuthLoader({ children }: { children: ReactNode }) {
    const dispatch = useDispatch();
    
    useEffect(() => {
        // This runs only on the client after initial mount
        const storedUser = localStorage.getItem('user');
        const storedToken = localStorage.getItem('token');

        if (storedUser && storedToken) {
            try {
                const user = JSON.parse(storedUser);
                // Dispatch action to hydrate Redux store
                dispatch(loadCredentials({ user, token: storedToken }));
            } catch (error) {
                console.error("Error parsing user from localStorage", error);
                localStorage.removeItem('user');
                localStorage.removeItem('token');
            }
        }
    }, [dispatch]);

    // We simply render children immediately, relying on the client's useEffect 
    // to handle the actual state loading, thus avoiding the hydration mismatch.
    return children;
}