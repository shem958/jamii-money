'use client';

import { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Stack,
  CircularProgress,
} from '@mui/material';
import { useLoginMutation } from '@/redux/api/authApi';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [login, { isLoading }] = useLoginMutation();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await login(form).unwrap();
      router.push('/');
    } catch (err: any) {
      setError(err?.data?.message || 'Login failed');
    }
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        width={350}
        p={4}
        boxShadow={3}
        borderRadius={2}
        bgcolor="background.paper"
      >
        <Typography variant="h5" mb={2}>
          Sign In
        </Typography>

        <Stack spacing={2}>
          <TextField
            name="email"
            label="Email"
            type="email"
            fullWidth
            value={form.email}
            onChange={handleChange}
          />
          <TextField
            name="password"
            label="Password"
            type="password"
            fullWidth
            value={form.password}
            onChange={handleChange}
          />
          {error && (
            <Typography color="error" variant="body2">
              {error}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} /> : 'Login'}
          </Button>
        </Stack>

        <Typography
          variant="body2"
          mt={2}
          sx={{ textAlign: 'center', cursor: 'pointer' }}
          onClick={() => router.push('/(auth)/register')}
        >
          Don’t have an account? Register
        </Typography>
      </Box>
    </Box>
  );
}
