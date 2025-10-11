'use client';
import { useState } from 'react';
import { Box, Button, TextField, Typography, Container } from '@mui/material';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setCredentials } from '@/redux/slices/authSlice';

export default function LoginPage() {
  const dispatch = useDispatch();
  const [form, setForm] = useState({ email: '', password: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, form);
    dispatch(setCredentials({ user: res.data.user, token: res.data.token }));
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 10, textAlign: 'center' }}>
        <Typography variant="h5" mb={3}>Login to Jamii Money</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth label="Email" variant="outlined" margin="normal"
            value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <TextField
            fullWidth label="Password" type="password" variant="outlined" margin="normal"
            value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
            Login
          </Button>
        </form>
      </Box>
    </Container>
  );
}
