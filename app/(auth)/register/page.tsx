'use client';
import { Box, Button, TextField, Typography, Container } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, form);
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 10, textAlign: 'center' }}>
        <Typography variant="h5" mb={3}>Create Jamii Money Account</Typography>
        <form onSubmit={handleSubmit}>
          <TextField fullWidth label="Name" variant="outlined" margin="normal"
            value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}/>
          <TextField fullWidth label="Email" variant="outlined" margin="normal"
            value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}/>
          <TextField fullWidth label="Password" type="password" variant="outlined" margin="normal"
            value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })}/>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
            Register
          </Button>
        </form>
      </Box>
    </Container>
  );
}
