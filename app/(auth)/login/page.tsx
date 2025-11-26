import { Box, Button, TextField, Typography, Paper, Stack } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useLoginMutation } from '@/redux/api/authApi';
import { useDispatch } from 'react-redux';
import { setCredentials } from '@/redux/slices/authSlice';
import { useForm, SubmitHandler } from 'react-hook-form'; // 👈 NEW
import { z } from 'zod'; // 👈 NEW
import { zodResolver } from '@hookform/resolvers/zod'; // 👈 NEW (requires @hookform/resolvers dependency)

// 1. Define Zod schema for validation
const LoginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password is required'),
});

type LoginInputs = z.infer<typeof LoginSchema>;

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginInputs>({
    resolver: zodResolver(LoginSchema),
  });
  
  const [loginUser, { isLoading }] = useLoginMutation();
  const router = useRouter();
  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<LoginInputs> = async (formData) => {
    try {
      const res = await loginUser(formData).unwrap();
      // Store credentials and token in Redux/localStorage
      dispatch(setCredentials({ user: res.user, token: res.access_token }));
      // Redirect now works without middleware interference
      router.push('/dashboard'); 
    } catch (error: any) {
      // Display a general error or parse a specific message from backend response
      console.error('Login failed:', error);
      alert(error?.data?.message || 'Invalid email or password. Please check your credentials.');
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#faf9f6">
      <Paper elevation={3} sx={{ p: 4, width: 400 }}>
        <Typography variant="h5" textAlign="center" mb={2}>Login</Typography>
        <form onSubmit={handleSubmit(onSubmit)}> 
          <Stack spacing={2}>
            <TextField 
              label="Email" 
              type="email" 
              required
              {...register('email')} 
              error={!!errors.email}
              helperText={errors.email?.message || ' '}
            />
            <TextField 
              label="Password" 
              type="password" 
              required
              {...register('password')} 
              error={!!errors.password}
              helperText={errors.password?.message || ' '}
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