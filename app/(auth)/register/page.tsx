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
import { useRegisterMutation } from '@/redux/api/authApi';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();
  const [registerUser, { isLoading }] = useRegisterMutation();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await registerUser(form).unwrap();
      router.push('/');
    } catch (err: any) {
      setError(err?.data?.message || 'Registration failed');
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
          Create Account
        </Typography>

        <Stack spacing={2}>
          <TextField
            name="name"
            label="Full Name"
            fullWidth
            value={form.name}
            onChange={handleChange}
          />
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
            {isLoading ? <CircularProgress size={24} /> : 'Register'}
          </Button>
        </Stack>

        <Typography
          variant="body2"
          mt={2}
          sx={{ textAlign: 'center', cursor: 'pointer' }}
          onClick={() => router.push('/(auth)/login')}
        >
          Already have an account? Login
        </Typography>
      </Box>
    </Box>
  );
}
