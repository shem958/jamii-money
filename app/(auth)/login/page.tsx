import { Box, Button, TextField, Typography, Paper, Stack } from '@mui/material';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLoginMutation } from '@/redux/api/authApi';
import { useDispatch } from 'react-redux';
import { setCredentials } from '@/redux/slices/authSlice';

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loginUser, { isLoading }] = useLoginMutation();
  const router = useRouter();
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await loginUser(formData).unwrap();
      dispatch(setCredentials({ user: res.user, token: res.access_token }));
      router.push('/dashboard');
    } catch {
      alert('Invalid email or password');
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#faf9f6">
      <Paper elevation={3} sx={{ p: 4, width: 400 }}>
        <Typography variant="h5" textAlign="center" mb={2}>Login</Typography>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField label="Email" name="email" type="email" required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <TextField label="Password" name="password" type="password" required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
            <Button type="submit" variant="contained" disabled={isLoading}>
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
}
