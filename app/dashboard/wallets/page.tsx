"use client";

import {
    Box,
    Typography,
    Grid,
    Paper,
    Button,
    Stack,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
    Divider,
} from "@mui/material";
import {
    Add as AddIcon,
    AccountBalanceWallet as WalletIcon,
    ArrowUpward as SendIcon,
    ArrowDownward as ReceiveIcon,
    History as HistoryIcon,
} from "@mui/icons-material";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import DashboardLayout from "@/components/DashboardLayout";

export default function WalletsPage() {
    const balance = useSelector((state: RootState) => state.wallet.balance);

    return (
        <DashboardLayout>
            <Box sx={{ maxWidth: 1200, mx: "auto", py: 4 }}>
                <Grid container spacing={4}>
                    {/* Left Column: Wallet Overview */}
                    <Grid item xs={12} lg={7}>
                        <Typography variant="h4" fontWeight="bold" gutterBottom>
                            My Wallets
                        </Typography>

                        {/* Aesthetic Virtual Card */}
                        <Paper
                            elevation={6}
                            sx={{
                                p: 4,
                                borderRadius: 4,
                                background: "linear-gradient(135deg, #3949ab 0%, #1a237e 100%)",
                                color: "white",
                                position: "relative",
                                overflow: "hidden",
                                mb: 4,
                            }}
                        >
                            {/* Decorative Circle Background */}
                            <Box
                                sx={{
                                    position: "absolute",
                                    top: -50,
                                    right: -50,
                                    width: 200,
                                    height: 200,
                                    borderRadius: "50%",
                                    bgcolor: "rgba(255, 255, 255, 0.1)",
                                }}
                            />

                            <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                                <Box>
                                    <Typography variant="subtitle1" sx={{ opacity: 0.8 }}>
                                        Total Balance
                                    </Typography>
                                    <Typography variant="h3" fontWeight="bold">
                                        KES {balance.toLocaleString()}
                                    </Typography>
                                </Box>
                                <WalletIcon sx={{ fontSize: 40, opacity: 0.8 }} />
                            </Stack>

                            <Box sx={{ mt: 8 }}>
                                <Typography variant="body1" sx={{ letterSpacing: 2, mb: 1 }}>
                                    **** **** **** 1234
                                </Typography>
                                <Typography variant="subtitle2" sx={{ opacity: 0.8 }}>
                                    Jamii Primary Account
                                </Typography>
                            </Box>
                        </Paper>

                        {/* Quick Actions Bar */}
                        <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
                            <Button
                                variant="contained"
                                startIcon={<AddIcon />}
                                fullWidth
                                sx={{ py: 1.5, borderRadius: 2 }}
                            >
                                Deposit
                            </Button>
                            <Button
                                variant="outlined"
                                startIcon={<SendIcon />}
                                fullWidth
                                sx={{ py: 1.5, borderRadius: 2 }}
                            >
                                Send
                            </Button>
                            <Button
                                variant="outlined"
                                startIcon={<ReceiveIcon />}
                                fullWidth
                                sx={{ py: 1.5, borderRadius: 2 }}
                            >
                                Receive
                            </Button>
                        </Stack>
                    </Grid>

                    {/* Right Column: Mini Transaction History */}
                    <Grid item xs={12} lg={5}>
                        <Paper sx={{ p: 3, borderRadius: 3, height: "100%" }}>
                            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                                <Typography variant="h6" fontWeight="bold">
                                    Recent Activity
                                </Typography>
                                <IconButton size="small">
                                    <HistoryIcon />
                                </IconButton>
                            </Stack>

                            <List>
                                {[
                                    { title: "M-Pesa Deposit", date: "Today, 2:45 PM", amount: "+2,500", color: "success.main" },
                                    { title: "Groceries", date: "Yesterday, 6:12 PM", amount: "-1,200", color: "error.main" },
                                    { title: "Salary Payout", date: "Dec 20, 9:00 AM", amount: "+45,000", color: "success.main" },
                                ].map((tx, index) => (
                                    <Box key={index}>
                                        <ListItem sx={{ px: 0 }}>
                                            <ListItemAvatar>
                                                <Avatar sx={{ bgcolor: "grey.100", color: "primary.main" }}>
                                                    {tx.amount.startsWith("+") ? <ReceiveIcon /> : <SendIcon />}
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={tx.title}
                                                secondary={tx.date}
                                            />
                                            <Typography fontWeight="bold" sx={{ color: tx.color }}>
                                                {tx.amount}
                                            </Typography>
                                        </ListItem>
                                        {index < 2 && <Divider variant="inset" component="li" />}
                                    </Box>
                                ))}
                            </List>
                            <Button fullWidth sx={{ mt: 2, textTransform: "none" }}>
                                View All Transactions
                            </Button>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </DashboardLayout>
    );
}