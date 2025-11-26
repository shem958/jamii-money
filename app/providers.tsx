'use client';

import { ReactNode, useEffect } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { Provider } from 'react-redux';
import { store } from '@/redux/store'; // Use alias for consistency
import theme from '../styles/theme'; 

export default function Providers({ children }: { children: ReactNode }) {
    useEffect(() => {
        // Remove server-side injected CSS (important for MUI + Next.js)
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles && jssStyles.parentElement) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
    }, []);

    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </Provider>
    );
}