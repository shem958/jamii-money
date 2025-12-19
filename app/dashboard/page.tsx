"use client";

import { Box, Typography, Paper } from "@mui/material";
import withAuth from "@/components/withAuth";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import DashboardLayout from "@/components/DashboardLayout";

function DashboardContent() {
  const user = useSelector((state: RootState) => state.auth.user);

  // At this point, withAuth guarantees user exists
  // No need for conditional rendering
  return (
    <DashboardLayout>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="flex-start"
        pt={4}
        width="100%"
      >
        <Paper
          elevation={3}
          sx={{ p: 4, borderRadius: 3, maxWidth: 500, width: "100%" }}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            textAlign="center"
            gutterBottom
          >
            Welcome, {user?.name || "User"} 👋
          </Typography>

          <Box sx={{ mt: 3 }}>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Email:</strong> {user?.email}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Phone:</strong> {user?.phone || "—"}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Role:</strong> {user?.role || "—"}
            </Typography>
          </Box>

          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ mt: 3, display: "block", textAlign: "center" }}
          >
            Secure Session Active
          </Typography>
        </Paper>
      </Box>
    </DashboardLayout>
  );
}

export default withAuth(DashboardContent);
