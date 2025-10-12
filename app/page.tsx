'use client';

import { Button, Typography, Paper, Stack } from '@mui/material';

export default function HomePage() {
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      spacing={3}
      sx={{ minHeight: '100vh', backgroundColor: 'background.default' }}
    >
      <Paper sx={{ p: 4, textAlign: 'center', maxWidth: 400 }}>
        <Typography variant="h2" color="primary" gutterBottom>
          Jamii Money
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          Your trusted community finance platform.
        </Typography>
        <Button variant="contained" color="primary">
          Get Started
        </Button>
      </Paper>
    </Stack>
  );
}
