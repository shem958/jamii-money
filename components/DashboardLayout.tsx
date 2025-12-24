// components/DashboardLayout.tsx
"use client";

import { Box, AppBar, Toolbar, Typography, Button, Stack } from "@mui/material";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { logout } from "@/redux/slices/authSlice";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    // Dispatch logout action which clears Redux state and triggers PersistGate/withAuth redirect
    dispatch(logout());
    router.push("/login");
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      {/* Navigation Bar */}
      <AppBar position="static" sx={{ bgcolor: "#3949ab" }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Jamii Money Dashboard
          </Typography>

          <Button color="inherit" onClick={() => router.push("/dashboard")}>
            Dashboard
          </Button>

          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      {/* Main Content Area (Sidebar + Content) */}
      <Box display="flex" sx={{ flexGrow: 1 }}>
        {/* Sidebar Placeholder */}
        <Box
          sx={{
            width: 200,
            bgcolor: "#e8eaf6",
            p: 2,
            flexShrink: 0,
            display: { xs: "none", md: "block" },
          }}
        >
          <Typography variant="subtitle1" fontWeight="bold" mb={1}>
            Modules
          </Typography>
          <Stack spacing={1}>
            <Button
              variant="text"
              size="small"
              fullWidth
              sx={{ justifyContent: "flex-start" }}
              onClick={() => router.push("/dashboard/wallets")} // 👈 Add this link
            >
              Wallets
            </Button>
            <Button
              variant="text"
              size="small"
              fullWidth
              sx={{ justifyContent: "flex-start" }}
              onClick={() => router.push("/dashboard/goals")}
            >
              Goals
            </Button>
            <Button
              variant="text"
              size="small"
              fullWidth
              sx={{ justifyContent: "flex-start" }}
              onClick={() => router.push("/dashboard/chama")}
            >
              Chamas
            </Button>
            <Button
              variant="text"
              size="small"
              fullWidth
              sx={{ justifyContent: "flex-start" }}
              onClick={() => router.push("/dashboard/transactions")}
            >
              Transactions
            </Button>
          </Stack>
        </Box>

        {/* Content Area */}
        <Box component="main" sx={{ flexGrow: 1, p: 3, bgcolor: "#fafafa" }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
}
