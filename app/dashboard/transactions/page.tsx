"use client";

import {
  Box,
  Typography,
  Button,
  Stack,
  Chip,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Avatar,
  Divider,
  IconButton,
  InputAdornment,
} from "@mui/material";
import {
  Add as AddIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  ArrowUpward as SendIcon,
  ArrowDownward as ReceiveIcon,
  AccountBalanceWallet as WalletIcon,
  Group as GroupIcon,
  TrendingUp as GoalIcon,
  Download as DownloadIcon,
  Refresh as RefreshIcon,
} from "@mui/icons-material";
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";

export default function TransactionsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  // Mock transaction data
  const transactions = [
    {
      id: 1,
      date: "2024-01-15",
      time: "14:30",
      type: "deposit",
      category: "wallet",
      description: "M-Pesa Deposit",
      amount: 25000,
      status: "completed",
      reference: "MPD123456789",
      from: "M-Pesa",
      to: "Main Wallet",
    },
    {
      id: 2,
      date: "2024-01-14",
      time: "10:15",
      type: "transfer",
      category: "chama",
      description: "Family Vacation Fund - Monthly Contribution",
      amount: -10000,
      status: "completed",
      reference: "CHM987654321",
      from: "Main Wallet",
      to: "Family Vacation Fund",
    },
    {
      id: 3,
      date: "2024-01-13",
      time: "16:45",
      type: "withdrawal",
      category: "wallet",
      description: "ATM Withdrawal - Equity Bank",
      amount: -5000,
      status: "completed",
      reference: "ATM456789123",
      from: "Main Wallet",
      to: "Cash",
    },
    {
      id: 4,
      date: "2024-01-12",
      time: "09:20",
      type: "transfer",
      category: "goal",
      description: "Emergency Fund - Weekly Saving",
      amount: -3000,
      status: "completed",
      reference: "GOL789123456",
      from: "Main Wallet",
      to: "Emergency Fund",
    },
    {
      id: 5,
      date: "2024-01-11",
      time: "18:10",
      type: "deposit",
      category: "wallet",
      description: "Salary Deposit",
      amount: 75000,
      status: "completed",
      reference: "SAL321654987",
      from: "Company Payroll",
      to: "Main Wallet",
    },
    {
      id: 6,
      date: "2024-01-10",
      time: "11:30",
      type: "transfer",
      category: "chama",
      description: "Investment Club - Share Purchase",
      amount: -15000,
      status: "pending",
      reference: "CHM654987321",
      from: "Main Wallet",
      to: "Investment Club",
    },
    {
      id: 7,
      date: "2024-01-09",
      time: "13:45",
      type: "withdrawal",
      category: "wallet",
      description: "Groceries Payment",
      amount: -8500,
      status: "completed",
      reference: "GRC159753486",
      from: "Main Wallet",
      to: "Merchant",
    },
    {
      id: 8,
      date: "2024-01-08",
      time: "07:15",
      type: "deposit",
      category: "wallet",
      description: "Freelance Payment",
      amount: 12000,
      status: "completed",
      reference: "FRL852963741",
      from: "Client",
      to: "Main Wallet",
    },
  ];

  // Filter transactions based on search and filters
  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.description
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      transaction.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.to.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = filterType === "all" || transaction.type === filterType;
    const matchesStatus =
      filterStatus === "all" || transaction.status === filterStatus;

    return matchesSearch && matchesType && matchesStatus;
  });

  const getTransactionIcon = (type: string, category: string) => {
    if (type === "deposit")
      return <ReceiveIcon sx={{ color: "success.main" }} />;
    if (type === "withdrawal") return <SendIcon sx={{ color: "error.main" }} />;
    if (category === "chama") return <GroupIcon sx={{ color: "info.main" }} />;
    if (category === "goal") return <GoalIcon sx={{ color: "warning.main" }} />;
    return <WalletIcon sx={{ color: "primary.main" }} />;
  };

  const getTransactionColor = (type: string) => {
    switch (type) {
      case "deposit":
        return "success";
      case "withdrawal":
        return "error";
      case "transfer":
        return "info";
      default:
        return "default";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "success";
      case "pending":
        return "warning";
      case "failed":
        return "error";
      default:
        return "default";
    }
  };

  // Calculate summary statistics
  const totalIncome = transactions
    .filter((t) => t.amount > 0)
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = Math.abs(
    transactions
      .filter((t) => t.amount < 0)
      .reduce((sum, t) => sum + t.amount, 0),
  );

  const netFlow = totalIncome - totalExpenses;

  return (
    <DashboardLayout>
      <Box sx={{ maxWidth: 1400, mx: "auto", py: 4 }}>
        {/* Header */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mb={4}
        >
          <Typography variant="h4" fontWeight="bold">
            Transactions
          </Typography>
          <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              startIcon={<DownloadIcon />}
              onClick={() => console.log("Export transactions")}
            >
              Export
            </Button>
            <Button
              variant="outlined"
              startIcon={<RefreshIcon />}
              onClick={() => console.log("Refresh transactions")}
            >
              Refresh
            </Button>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => console.log("New transaction")}
            >
              New Transaction
            </Button>
          </Stack>
        </Stack>

        {/* Summary Cards */}
        <Box sx={{ display: "flex", gap: 3, mb: 4, flexWrap: "wrap" }}>
          <Box sx={{ flex: "1", minWidth: "250px" }}>
            <Card elevation={2} sx={{ borderRadius: 3 }}>
              <CardContent sx={{ p: 3 }}>
                <Stack direction="row" alignItems="center" spacing={2} mb={1}>
                  <Avatar sx={{ bgcolor: "success.light" }}>
                    <ReceiveIcon />
                  </Avatar>
                  <Typography variant="h6" fontWeight="bold">
                    Total Income
                  </Typography>
                </Stack>
                <Typography variant="h4" fontWeight="bold" color="success.main">
                  KES {totalIncome.toLocaleString()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  This month
                </Typography>
              </CardContent>
            </Card>
          </Box>

          <Box sx={{ flex: "1", minWidth: "250px" }}>
            <Card elevation={2} sx={{ borderRadius: 3 }}>
              <CardContent sx={{ p: 3 }}>
                <Stack direction="row" alignItems="center" spacing={2} mb={1}>
                  <Avatar sx={{ bgcolor: "error.light" }}>
                    <SendIcon />
                  </Avatar>
                  <Typography variant="h6" fontWeight="bold">
                    Total Expenses
                  </Typography>
                </Stack>
                <Typography variant="h4" fontWeight="bold" color="error.main">
                  KES {totalExpenses.toLocaleString()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  This month
                </Typography>
              </CardContent>
            </Card>
          </Box>

          <Box sx={{ flex: "1", minWidth: "250px" }}>
            <Card elevation={2} sx={{ borderRadius: 3 }}>
              <CardContent sx={{ p: 3 }}>
                <Stack direction="row" alignItems="center" spacing={2} mb={1}>
                  <Avatar
                    sx={{
                      bgcolor: netFlow >= 0 ? "success.light" : "warning.light",
                    }}
                  >
                    <WalletIcon />
                  </Avatar>
                  <Typography variant="h6" fontWeight="bold">
                    Net Flow
                  </Typography>
                </Stack>
                <Typography
                  variant="h4"
                  fontWeight="bold"
                  color={netFlow >= 0 ? "success.main" : "warning.main"}
                >
                  {netFlow >= 0 ? "+" : ""}KES {netFlow.toLocaleString()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  This month
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Box>

        {/* Filters and Search */}
        <Card elevation={2} sx={{ borderRadius: 3, mb: 4 }}>
          <CardContent sx={{ p: 3 }}>
            <Stack
              direction="row"
              spacing={3}
              alignItems="center"
              flexWrap="wrap"
            >
              <TextField
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                sx={{ minWidth: 300 }}
              />

              <FormControl sx={{ minWidth: 150 }}>
                <InputLabel>Type</InputLabel>
                <Select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  label="Type"
                >
                  <MenuItem value="all">All Types</MenuItem>
                  <MenuItem value="deposit">Deposits</MenuItem>
                  <MenuItem value="withdrawal">Withdrawals</MenuItem>
                  <MenuItem value="transfer">Transfers</MenuItem>
                </Select>
              </FormControl>

              <FormControl sx={{ minWidth: 150 }}>
                <InputLabel>Status</InputLabel>
                <Select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  label="Status"
                >
                  <MenuItem value="all">All Status</MenuItem>
                  <MenuItem value="completed">Completed</MenuItem>
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="failed">Failed</MenuItem>
                </Select>
              </FormControl>

              <Button
                variant="outlined"
                startIcon={<FilterIcon />}
                onClick={() => console.log("Advanced filters")}
              >
                More Filters
              </Button>
            </Stack>
          </CardContent>
        </Card>

        {/* Transactions Table */}
        <Card elevation={2} sx={{ borderRadius: 3 }}>
          <CardContent sx={{ p: 0 }}>
            <Box sx={{ p: 3, pb: 0 }}>
              <Typography variant="h6" fontWeight="bold">
                Transaction History ({filteredTransactions.length} transactions)
              </Typography>
            </Box>

            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Date & Time</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>From → To</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="center">Status</TableCell>
                    <TableCell>Reference</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredTransactions.map((transaction) => (
                    <TableRow key={transaction.id} hover>
                      <TableCell>
                        <Box>
                          <Typography variant="body2" fontWeight="medium">
                            {transaction.date}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {transaction.time}
                          </Typography>
                        </Box>
                      </TableCell>

                      <TableCell>
                        <Stack direction="row" alignItems="center" spacing={2}>
                          <Avatar
                            sx={{ bgcolor: "grey.100", width: 32, height: 32 }}
                          >
                            {getTransactionIcon(
                              transaction.type,
                              transaction.category,
                            )}
                          </Avatar>
                          <Typography variant="body2">
                            {transaction.description}
                          </Typography>
                        </Stack>
                      </TableCell>

                      <TableCell>
                        <Chip
                          label={
                            transaction.type.charAt(0).toUpperCase() +
                            transaction.type.slice(1)
                          }
                          color={getTransactionColor(transaction.type) as any}
                          size="small"
                          variant="outlined"
                        />
                      </TableCell>

                      <TableCell>
                        <Box>
                          <Typography variant="body2" fontWeight="medium">
                            {transaction.from}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            → {transaction.to}
                          </Typography>
                        </Box>
                      </TableCell>

                      <TableCell align="right">
                        <Typography
                          variant="body2"
                          fontWeight="bold"
                          color={
                            transaction.amount >= 0
                              ? "success.main"
                              : "error.main"
                          }
                        >
                          {transaction.amount >= 0 ? "+" : ""}KES{" "}
                          {Math.abs(transaction.amount).toLocaleString()}
                        </Typography>
                      </TableCell>

                      <TableCell align="center">
                        <Chip
                          label={
                            transaction.status.charAt(0).toUpperCase() +
                            transaction.status.slice(1)
                          }
                          color={getStatusColor(transaction.status) as any}
                          size="small"
                        />
                      </TableCell>

                      <TableCell>
                        <Typography variant="body2" fontFamily="monospace">
                          {transaction.reference}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {filteredTransactions.length === 0 && (
              <Box sx={{ textAlign: "center", py: 6 }}>
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  No transactions found
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Try adjusting your search or filter criteria
                </Typography>
              </Box>
            )}

            {filteredTransactions.length > 0 && (
              <Box sx={{ p: 3, pt: 2 }}>
                <Divider sx={{ mb: 2 }} />
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="body2" color="text.secondary">
                    Showing {filteredTransactions.length} of{" "}
                    {transactions.length} transactions
                  </Typography>
                  <Button variant="outlined" size="small">
                    Load More
                  </Button>
                </Stack>
              </Box>
            )}
          </CardContent>
        </Card>
      </Box>
    </DashboardLayout>
  );
}
