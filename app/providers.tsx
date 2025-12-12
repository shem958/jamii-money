// app/providers.tsx (UPDATED with Redux Persist)
'use client';

import { ReactNode, useEffect } from 'react';
// 👇 Import CircularProgress and Box for the loading screen
import { ThemeProvider, CssBaseline, CircularProgress, Box } from '@mui/material'; 
import { Provider } from 'react-redux';
// 👇 Import store AND persistor
import { store, persistor } from '@/redux/store'; 
// 👇 Import PersistGate (the critical fix for the race condition)
import { PersistGate } from 'redux-persist/integration/react'; 
import theme from '../styles/theme'; 

// AuthLoader is now implicitly handled by PersistGate

export default function Providers({ children }: { children: ReactNode }) {
    useEffect(() => {
        // Remove server-side injected CSS (MUI requirement)
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles && jssStyles.parentElement) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
    }, []);
    
    // Define a loading component to show while Redux is rehydrating
    const loading = (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
            <CircularProgress />
        </Box>
    );

    return (
        <Provider store={store}>
            {/* CRITICAL FIX: PersistGate ensures children only render AFTER state is loaded. 
               This eliminates the race condition in withAuth.tsx. */}
            <PersistGate loading={loading} persistor={persistor}> 
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    {children} 
                </ThemeProvider>
            </PersistGate>
        </Provider>
    );
}