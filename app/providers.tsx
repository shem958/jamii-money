// app/providers.tsx (Updated)
'use client';

import { ReactNode, useEffect } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import theme from '../styles/theme'; 
import AuthLoader from './AuthLoader'; // 👈 Integrated AuthLoader

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
                <AuthLoader>
                    {children} {/* Children are now wrapped by the AuthLoader */}
                </AuthLoader>
            </ThemeProvider>
        </Provider>
    );
}