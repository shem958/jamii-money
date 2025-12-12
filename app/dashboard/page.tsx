'use client';

import { CircularProgress, Box, Typography, Paper } from '@mui/material';
import withAuth from '@/components/withAuth';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store'; 
import DashboardLayout from '@/components/DashboardLayout'; // 👈 FIX: Module now exists
// import { AuthUser } from '@/redux/types'; // 👈 Uncomment if you created types.ts

// Temporarily define AuthUser type if types.ts is not yet set up
interface AuthUser {
    name: string;
    email: string;
    role: string;
    phone?: string; 
}


function DashboardContent() {
    // Cast the user for safe access after hydration
    // Replace `AuthUser` with the imported type if available
    const user = useSelector((state: RootState) => state.auth.user) as AuthUser | null; 

    // This block catches the moment before PersistGate finishes 
    // or if corrupted data results in a null user object.
    if (!user) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <CircularProgress color="primary" />
            </Box>
        );
    }

    // ✅ Show Dashboard
    return (
        <DashboardLayout>
            <Box
                display="flex"
                justifyContent="center"
                alignItems="flex-start" 
                pt={4}
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