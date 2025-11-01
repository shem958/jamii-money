'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CircularProgress, Box, Typography, Paper } from '@mui/material';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any | null>(null);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    // 🚫 Redirect if missing credentials
    if (!storedUser || !token) {
      router.replace('/login');
      return;
    }

    try {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    } catch (err) {
      console.error('Invalid stored user:', err);
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      router.replace('/login');
    } finally {
      setIsChecking(false);
    }
  }, [router]);

  // 🌀 Loading indicator (while verifying token)
  if (isChecking) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        flexDirection="column"
        gap={2}
      >
        <CircularProgress color="primary" />
        <Typography variant="body1" color="text.secondary">
          Checking authorization...
        </Typography>
      </Box>
    );
  }

  // 🚫 Unauthorized fallback (in case user is removed mid-session)
  if (!user) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        flexDirection="column"
        gap={2}
      >
        <Typography variant="h6" color="error">
          Unauthorized. Redirecting...
        </Typography>
      </Box>
    );
  }

  // ✅ Authorized: Show Dashboard
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
      </Paper>
    </Box>
  );
}
