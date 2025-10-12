'use client';

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#4A2C2A', // Deep brown
        },
        secondary: {
            main: '#D9C2A3', // Soft beige-gold
        },
        background: {
            default: '#FAF9F6', // Light neutral
            paper: '#FFFFFF',
        },
        text: {
            primary: '#2E2C2B',
            secondary: '#6B4E31',
        },
    },
    typography: {
        fontFamily: ['"Inter"', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'].join(','),
        h1: {
            fontWeight: 700,
            fontSize: '2.5rem',
        },
        h2: {
            fontWeight: 600,
            fontSize: '2rem',
        },
        h3: {
            fontWeight: 600,
            fontSize: '1.5rem',
        },
        body1: {
            fontSize: '1rem',
            lineHeight: 1.6,
        },
        button: {
            textTransform: 'none',
            fontWeight: 600,
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 10,
                    padding: '0.6rem 1.2rem',
                },
                containedPrimary: {
                    color: '#fff',
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                },
            },
        },
    },
});

export default theme;
