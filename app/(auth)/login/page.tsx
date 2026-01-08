"use client";

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
  CircularProgress,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/redux/slices/authSlice";
import { useLoginMutation } from "@/redux/api/authApi";
import { persistor } from "@/redux/store";

const LoginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password is required"),
});

type LoginInputs = z.infer<typeof LoginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [loginUser, { isLoading }] = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit: SubmitHandler<LoginInputs> = async (formData) => {
    try {
      setError(null);
      const res = await loginUser(formData).unwrap();

      // Ensure data exists before mapping to Redux
      if (!res?.user || !res?.access_token) {
        throw new Error("Invalid response: user or token missing.");
      }

      // Map 'access_token' to 'token' for Redux state
      dispatch(
        setCredentials({
          user: {
            ...res.user,
            role: res.user.role || "user",
          },
          token: res.access_token,
        })
      );

      // Force storage write before navigation
      await persistor.flush();
      router.replace("/dashboard");
    } catch (err: any) {
      console.error("❌ Login failed:", err);
      setError(
        err?.data?.message || err?.message || "Invalid email or password."
      );
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#faf9f6" px={2}>
      <Paper elevation={4} sx={{ p: 4, width: "100%", maxWidth: 400, borderRadius: 3 }}>
        <Box textAlign="center" mb={3}>
          <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>Jamii Money</Typography>
          <Typography variant="body2" color="text.secondary">Sign in to your protected dashboard</Typography>
        </Box>

        {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Stack spacing={3}>
            <TextField
              fullWidth
              label="Email Address"
              type="email"
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
              disabled={isLoading}
            />
            <TextField
              fullWidth
              label="Password"
              type={showPassword ? "text" : "password"}
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
              disabled={isLoading}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword((prev) => !prev)} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button type="submit" variant="contained" size="large" fullWidth disabled={isLoading} sx={{ py: 1.5 }}>
              {isLoading ? <CircularProgress size={24} color="inherit" /> : "Login"}
            </Button>
            <Box textAlign="center">
              <Typography variant="body2">
                New to Jamii Money?{" "}
                <Button onClick={() => router.push("/register")} sx={{ fontWeight: "bold" }}>Create an account</Button>
              </Typography>
            </Box>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
}