'use client';
import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        mode: 'light',
        primary: { main: '#6B4E31' },      // Jamii Brown
        secondary: { main: '#D9C2A3' },    // Light Beige
        background: { default: '#FAF8F6' },
    },
    typography: {
        fontFamily: 'Inter, Roboto, sans-serif',
        h1: { fontWeight: 600 },
        h2: { fontWeight: 500 },
    },
});
