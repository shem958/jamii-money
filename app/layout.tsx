'use client';

import { ReactNode, useEffect } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import theme from '../styles/theme';

// Optional: for smoother font rendering and dark mode handling
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Remove server-side injected CSS (important for MUI + Next.js)
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}
