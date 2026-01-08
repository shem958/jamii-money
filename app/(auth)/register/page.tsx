'use client';

import { 
  Box, 
  Button, 
  TextField, 
  Typography, 
  Paper, 
  Stack, 
  Alert, 
  IconButton, 
  InputAdornment,
  CircularProgress 
} from '@mui/material';
import { Visibility, VisibilityOff, PersonAdd as RegisterIcon } from '@mui/icons-material';
import { useRegisterMutation } from '@/redux/api/authApi';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// 1. Define Zod schema for form input validation
const RegisterFormSchema = z.object({
  name: z.string().min(2, 'Full Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone must be at least 10 digits'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  payday: z.string().optional().refine(val => { 
    if (!val || val === '') return true; 
    const num = Number(val);
    return Number.isInteger(num) && num >= 1 && num <= 31;
  }, {
    message: "Payday must be a whole number between 1 and 31, or left blank.",
  }),
});

type RegisterFormInputs = z.infer<typeof RegisterFormSchema>;
type RegisterPayload = Omit<RegisterFormInputs, 'payday'> & {
    payday?: number; 
};

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [registerUser, { isLoading }] = useRegisterMutation();
  const [serverError, setServerError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormInputs>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
        name: '',
        email: '',
        phone: '',
        password: '',
        payday: '',
    }
  });

  const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
    setServerError(null);
    const payload: RegisterPayload = {
        ...data,
        payday: data.payday ? Number(data.payday) : undefined,
    }

    try {
      await registerUser(payload).unwrap(); 
      alert('Registration successful! Redirecting to login.');
      router.push('/login'); 
    } catch (err: any) {
      console.error('Registration failed:', err); 
      let errorMessage = 'Registration failed. Please check your inputs.';

      if (err.data && err.data.message) {
        errorMessage = Array.isArray(err.data.message) 
            ? err.data.message[0] 
            : err.data.message; 
      }
      setServerError(errorMessage);
    }
  };
  
  return (
    <Box 
      display="flex" 
      justifyContent="center" 
      alignItems="center" 
      minHeight="100vh" 
      bgcolor="#faf9f6"
      px={2}
    >
      <Paper elevation={4} sx={{ p: 4, width: '100%', maxWidth: 450, borderRadius: 3 }}>
        <Box textAlign="center" mb={3}>
          <RegisterIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
          <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
            Create Account
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Join Jamii Money to start saving with your community
          </Typography>
        </Box>

        {serverError && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {serverError}
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2.5}>
            <TextField
              fullWidth
              label="Full Name"
              {...register('name')}
              error={!!errors.name}
              helperText={errors.name?.message}
              disabled={isLoading}
            />

            <TextField
              fullWidth
              label="Email Address"
              type="email"
              {...register('email')}
              error={!!errors.email}
              helperText={errors.email?.message}
              disabled={isLoading}
            />

            <TextField
              fullWidth
              label="Phone Number"
              {...register('phone')}
              error={!!errors.phone}
              helperText={errors.phone?.message}
              disabled={isLoading}
            />

            <TextField
              fullWidth
              label="Payday (1-31, optional)"
              type="number"
              {...register('payday')}
              error={!!errors.payday}
              helperText={errors.payday?.message}
              disabled={isLoading}
            />

            <TextField
              fullWidth
              label="Password"
              type={showPassword ? 'text' : 'password'}
              {...register('password')}
              error={!!errors.password}
              helperText={errors.password?.message}
              disabled={isLoading}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              disabled={isLoading}
              sx={{ py: 1.5, mt: 1, fontWeight: 'bold' }}
            >
              {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Register'}
            </Button>

            <Box textAlign="center">
              <Typography variant="body2">
                Already have an account?{' '}
                <Button 
                  onClick={() => router.push('/login')} 
                  sx={{ textTransform: 'none', fontWeight: 'bold' }}
                >
                  Login here
                </Button>
              </Typography>
            </Box>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
}