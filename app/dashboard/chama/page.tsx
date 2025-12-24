"use client";

import {
  Box,
  Typography,
  Button,
  Stack,
  LinearProgress,
  Chip,
  Card,
  CardContent,
  Divider,
} from "@mui/material";
import {
  Add as AddIcon,
  ArrowForwardIos as ArrowIcon,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/components/DashboardLayout";

export default function ChamasPage() {
  const router = useRouter();

  const myChamas = [
    {
      id: 1,
      name: "Family Vacation Fund",
      balance: 150000,
      target: 500000,
      status: "Active",
    },
  ];

  return (
    <DashboardLayout>
      <Box sx={{ maxWidth: 1200, mx: "auto", py: 4 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mb={4}
        >
          <Typography variant="h4" fontWeight="bold">
            My Chamas
          </Typography>
          <Button variant="contained" startIcon={<AddIcon />}>
            Create New Chama
          </Button>
        </Stack>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
          {myChamas.map((chama) => {
            // Ensure the progress value is a valid number between 0 and 100
            const progress = (chama.balance / chama.target) * 100;

            return (
              <Box
                key={chama.id}
                sx={{ flexBasis: { xs: "100%", md: "calc(50% - 12px)" } }}
              >
                <Card elevation={2} sx={{ borderRadius: 3 }}>
                  <CardContent sx={{ p: 3 }}>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      mb={2}
                    >
                      <Typography variant="h6" fontWeight="bold">
                        {chama.name}
                      </Typography>
                      <Chip
                        label={chama.status}
                        color="success"
                        size="small"
                        variant="outlined"
                      />
                    </Stack>

                    <Box sx={{ my: 2 }}>
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        mb={1}
                      >
                        <Typography variant="body2" color="text.secondary">
                          Progress
                        </Typography>
                        <Typography variant="body2" fontWeight="bold">
                          {Math.round(progress)}%
                        </Typography>
                      </Stack>
                      <LinearProgress
                        variant="determinate"
                        value={progress > 100 ? 100 : progress}
                        sx={{ height: 8, borderRadius: 5 }}
                      />
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    <Button
                      fullWidth
                      endIcon={<ArrowIcon />}
                      onClick={() =>
                        router.push(`/dashboard/chama/${chama.id}`)
                      }
                    >
                      View Group Details
                    </Button>
                  </CardContent>
                </Card>
              </Box>
            );
          })}
        </Box>
      </Box>
    </DashboardLayout>
  );
}
