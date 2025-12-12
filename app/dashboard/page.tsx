'use client';

import { CircularProgress, Box, Typography, Paper } from '@mui/material';
import withAuth from '@/components/withAuth';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store'; 
import DashboardLayout from '@/components/DashboardLayout'; // 👈 Imported the Layout component
import { AuthUser } from '@/redux/types'; // 👈 Imported the AuthUser type

function DashboardContent() {
    // 1. Correctly select and cast the user type, resolving all TypeScript errors.
    // The selector is now guaranteed to provide a definitive type (AuthUser | null).
    const user = useSelector((state: RootState) => state.auth.user) as AuthUser | null; 

    // 2. This check remains the definitive guard for missing user data.
    if (!user) {
        // This spinner indicates: "Token is present, but User object is null/corrupted."
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <CircularProgress color="primary" />
            </Box>
        );
    }
    
    // 3. Render the full dashboard content wrapped in the layout
    return (
        <DashboardLayout>
            <Box
                display="flex"
                justifyContent="center"
                alignItems="flex-start" 
                pt={4} // Top padding below the navbar
                width="100%"
            >
                <Paper elevation={3} sx={{ p: 4, borderRadius: 3, maxWidth: 500 }}>
                    <Typography
                        variant="h4"
                        fontWeight="bold"
                        textAlign="center"
                        gutterBottom
                    >
                        Welcome, {user.name || 'User'} 👋
                    </Typography>

                    <Typography variant="body1" sx={{ mb: 1 }}>
                        <strong>Email:</strong> {user.email}
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 1 }}>
                        <strong>Phone:</strong> {user.phone || '—'} 
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 1 }}>
                        <strong>Role:</strong> {user.role || '—'} 
                    </Typography>
                    
                    <Typography variant="caption" color="text.secondary" sx={{ mt: 3, display: 'block', textAlign: 'center' }}>
                        This is your protected dashboard.
                    </Typography>
                </Paper>
            </Box>
        </DashboardLayout>
    );
}

// Export the protected component wrapped by withAuth
export default withAuth(DashboardContent);