'use client';

import { CircularProgress, Box, Typography, Paper } from '@mui/material';
import withAuth from '@/components/withAuth'; // 👈 Import wrapper
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store'; // Assuming RootState is exported

function DashboardContent() {
  // Access user data directly from Redux state (hydrated from localStorage)
  const user = useSelector((state: RootState) => state.auth.user);

  // Fallback state, primarily handled by withAuth but good practice
  if (!user) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress color="primary" />
      </Box>
    );
  }

  // ✅ Show Dashboard
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="background.default"
      p={4}
    >
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3, width: 380 }}>
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
        
        {/* Placeholder for future dashboard content */}
        <Typography variant="caption" color="text.secondary" sx={{ mt: 3, display: 'block', textAlign: 'center' }}>
          This is your protected dashboard.
        </Typography>

      </Paper>
    </Box>
  );
}

// Export the protected component wrapped by withAuth
export default withAuth(DashboardContent);