// app/layout.tsx
// ⚠️ No 'use client' directive here! This is a Server Component.

import { ReactNode } from 'react';
import Providers from './providers'; // 👈 Import the client wrapper
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: ReactNode }) {
    // ❌ Removed useEffect, ThemeProvider, CssBaseline, and Redux Provider

    return (
        <html lang="en">
            <body className={inter.className}>
                {/* Wrap children with the client-only Providers component */}
                <Providers>
                    {children}
                </Providers>
            </body>
        </html>
    );
}