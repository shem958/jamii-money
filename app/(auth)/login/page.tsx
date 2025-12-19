"use client";

import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Stack,
  Alert,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useLoginMutation } from "@/redux/api/authApi";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/redux/slices/authSlice";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { persistor } from "@/redux/store";

const LoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password is required"),
});

type LoginInputs = z.infer<typeof LoginSchema>;

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>({
    resolver: zodResolver(LoginSchema),
  });

  const [loginUser, { isLoading }] = useLoginMutation();
  const router = useRouter();
  const dispatch = useDispatch();
  const [error, setError] = useState<string>("");

  const onSubmit: SubmitHandler<LoginInputs> = async (formData) => {
    try {
      setError("");
      const res = await loginUser(formData).unwrap();

      console.log("📥 Login response received:", {
        hasUser: !!res.user,
        hasToken: !!res.access_token,
      });

      // Dispatch credentials to Redux
      dispatch(
        setCredentials({
          user: res.user,
          token: res.access_token,
        })
      );

      // CRITICAL FIX: Wait for redux-persist to flush state to storage
      console.log("⏳ Waiting for persist to flush...");
      await persistor.flush();
      console.log("✅ Persist flush complete");

      // Additional safety delay
      await new Promise((resolve) => setTimeout(resolve, 150));

      console.log("🚀 Navigating to dashboard");
      // Navigate to dashboard
      router.push("/dashboard");
    } catch (error: any) {
      console.error("❌ Login failed:", error);
      setError(error?.data?.message || "Invalid email or password.");
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#faf9f6"
    >
      <Paper elevation={3} sx={{ p: 4, width: 400 }}>
        <Typography variant="h5" textAlign="center" mb={2}>
          Login
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <TextField
              label="Email"
              type="email"
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
              disabled={isLoading}
            />
            <TextField
              label="Password"
              type="password"
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
              disabled={isLoading}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
}
