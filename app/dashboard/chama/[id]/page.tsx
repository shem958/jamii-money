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
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import {
  ArrowBack as ArrowBackIcon,
  Add as AddIcon,
  Person as PersonIcon,
  AccountBalance as AccountBalanceIcon,
  TrendingUp as TrendingUpIcon,
} from "@mui/icons-material";
import { useRouter, useParams } from "next/navigation";
import DashboardLayout from "@/components/DashboardLayout";

export default function ChamaDetailPage() {
  const router = useRouter();
  const params = useParams();
  const chamaId = params.id;

  // Mock data - in real app, this would be fetched based on chamaId
  const chama = {
    id: chamaId,
    name: "Family Vacation Fund",
    description: "Saving for our family vacation to Mombasa",
    balance: 150000,
    target: 500000,
    status: "Active",
    members: 5,
    monthlyContribution: 10000,
    createdAt: "2024-01-15",
    endDate: "2024-12-31",
  };

  const members = [
    { id: 1, name: "John Doe", contribution: 30000, status: "Active" },
    { id: 2, name: "Jane Smith", contribution: 25000, status: "Active" },
    { id: 3, name: "Mike Johnson", contribution: 35000, status: "Active" },
    { id: 4, name: "Sarah Wilson", contribution: 30000, status: "Active" },
    { id: 5, name: "David Brown", contribution: 30000, status: "Pending" },
  ];

  const transactions = [
    {
      id: 1,
      date: "2024-01-15",
      member: "John Doe",
      amount: 10000,
      type: "Contribution",
    },
    {
      id: 2,
      date: "2024-01-20",
      member: "Jane Smith",
      amount: 10000,
      type: "Contribution",
    },
    {
      id: 3,
      date: "2024-01-25",
      member: "Mike Johnson",
      amount: 15000,
      type: "Bonus Contribution",
    },
  ];

  const progress = (chama.balance / chama.target) * 100;

  return (
    <DashboardLayout>
      <Box sx={{ maxWidth: 1200, mx: "auto", py: 4 }}>
        {/* Header */}
        <Stack direction="row" alignItems="center" spacing={2} mb={4}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => router.push("/dashboard/chama")}
            variant="outlined"
          >
            Back to Chamas
          </Button>
          <Typography variant="h4" fontWeight="bold">
            {chama.name}
          </Typography>
          <Chip
            label={chama.status}
            color="success"
            size="small"
            variant="outlined"
          />
        </Stack>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {/* Overview Cards */}
          <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
            <Box sx={{ flex: "1", minWidth: "300px" }}>
              <Card elevation={2} sx={{ borderRadius: 3 }}>
                <CardContent sx={{ p: 3 }}>
                  <Stack direction="row" alignItems="center" spacing={2} mb={2}>
                    <Avatar sx={{ bgcolor: "primary.main" }}>
                      <AccountBalanceIcon />
                    </Avatar>
                    <Typography variant="h6" fontWeight="bold">
                      Current Balance
                    </Typography>
                  </Stack>
                  <Typography variant="h4" fontWeight="bold" color="primary">
                    KES {chama.balance.toLocaleString()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Target: KES {chama.target.toLocaleString()}
                  </Typography>
                </CardContent>
              </Card>
            </Box>

            <Box sx={{ flex: "1", minWidth: "300px" }}>
              <Card elevation={2} sx={{ borderRadius: 3 }}>
                <CardContent sx={{ p: 3 }}>
                  <Stack direction="row" alignItems="center" spacing={2} mb={2}>
                    <Avatar sx={{ bgcolor: "success.main" }}>
                      <TrendingUpIcon />
                    </Avatar>
                    <Typography variant="h6" fontWeight="bold">
                      Progress
                    </Typography>
                  </Stack>
                  <Typography
                    variant="h4"
                    fontWeight="bold"
                    color="success.main"
                  >
                    {Math.round(progress)}%
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={progress > 100 ? 100 : progress}
                    sx={{ height: 8, borderRadius: 5, mt: 1 }}
                  />
                </CardContent>
              </Card>
            </Box>

            <Box sx={{ flex: "1", minWidth: "300px" }}>
              <Card elevation={2} sx={{ borderRadius: 3 }}>
                <CardContent sx={{ p: 3 }}>
                  <Stack direction="row" alignItems="center" spacing={2} mb={2}>
                    <Avatar sx={{ bgcolor: "warning.main" }}>
                      <PersonIcon />
                    </Avatar>
                    <Typography variant="h6" fontWeight="bold">
                      Members
                    </Typography>
                  </Stack>
                  <Typography
                    variant="h4"
                    fontWeight="bold"
                    color="warning.main"
                  >
                    {chama.members}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Active contributors
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          </Box>

          {/* Chama Details */}
          <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
            <Box sx={{ flex: "1", minWidth: "300px" }}>
              <Card elevation={2} sx={{ borderRadius: 3 }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" fontWeight="bold" mb={2}>
                    Chama Details
                  </Typography>
                  <Stack spacing={2}>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Description
                      </Typography>
                      <Typography variant="body1">
                        {chama.description}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Monthly Contribution
                      </Typography>
                      <Typography variant="body1">
                        KES {chama.monthlyContribution.toLocaleString()}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Target Date
                      </Typography>
                      <Typography variant="body1">{chama.endDate}</Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Created
                      </Typography>
                      <Typography variant="body1">{chama.createdAt}</Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Box>

            {/* Quick Actions */}
            <Box sx={{ flex: "1", minWidth: "300px" }}>
              <Card elevation={2} sx={{ borderRadius: 3 }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" fontWeight="bold" mb={2}>
                    Quick Actions
                  </Typography>
                  <Stack spacing={2}>
                    <Button
                      variant="contained"
                      startIcon={<AddIcon />}
                      fullWidth
                      size="large"
                    >
                      Make Contribution
                    </Button>
                    <Button variant="outlined" fullWidth>
                      Invite Members
                    </Button>
                    <Button variant="outlined" fullWidth>
                      View Reports
                    </Button>
                    <Button variant="outlined" fullWidth color="error">
                      Leave Chama
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            </Box>
          </Box>

          {/* Members List */}
          <Box>
            <Card elevation={2} sx={{ borderRadius: 3 }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight="bold" mb={2}>
                  Members
                </Typography>
                <TableContainer component={Paper} variant="outlined">
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Member Name</TableCell>
                        <TableCell align="right">Total Contribution</TableCell>
                        <TableCell align="center">Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {members.map((member) => (
                        <TableRow key={member.id}>
                          <TableCell>{member.name}</TableCell>
                          <TableCell align="right">
                            KES {member.contribution.toLocaleString()}
                          </TableCell>
                          <TableCell align="center">
                            <Chip
                              label={member.status}
                              color={
                                member.status === "Active"
                                  ? "success"
                                  : "warning"
                              }
                              size="small"
                              variant="outlined"
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Box>

          {/* Recent Transactions */}
          <Box>
            <Card elevation={2} sx={{ borderRadius: 3 }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight="bold" mb={2}>
                  Recent Transactions
                </Typography>
                <TableContainer component={Paper} variant="outlined">
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Member</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell align="right">Amount</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {transactions.map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell>{transaction.date}</TableCell>
                          <TableCell>{transaction.member}</TableCell>
                          <TableCell>{transaction.type}</TableCell>
                          <TableCell align="right">
                            KES {transaction.amount.toLocaleString()}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Box>
    </DashboardLayout>
  );
}
