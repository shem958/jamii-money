"use client";

import { Box, Typography, Grid, Paper, LinearProgress, Stack, Fab } from "@mui/material";
import { Add as AddIcon, LocalFireDepartment as HotIcon, Flight as TravelIcon, Home as HomeIcon } from "@mui/icons-material";
import DashboardLayout from "@/components/DashboardLayout";

export default function GoalsPage() {
    const goals = [
        { title: "Emergency Fund", current: 45000, target: 100000, icon: <HotIcon color="error" />, color: "#f44336" },
        { title: "Dream Home", current: 1200000, target: 5000000, icon: <HomeIcon color="primary" />, color: "#3949ab" },
        { title: "December Trip", current: 15000, target: 15000, icon: <TravelIcon color="success" />, color: "#4caf50" },
    ];

    return (
        <DashboardLayout>
            <Box sx={{ py: 4, position: 'relative', minHeight: '80vh' }}>
                <Typography variant="h4" fontWeight="bold" mb={4}>Financial Goals</Typography>

                <Grid container spacing={3}>
                    {goals.map((goal, index) => {
                        const progress = (goal.current / goal.target) * 100;
                        return (
                            <Grid item xs={12} md={4} key={index}>
                                <Paper sx={{ p: 3, borderRadius: 4, transition: '0.3s', '&:hover': { transform: 'translateY(-5px)' } }}>
                                    <Stack direction="row" spacing={2} alignItems="center" mb={2}>
                                        <Box sx={{ p: 1, bgcolor: 'rgba(0,0,0,0.04)', borderRadius: 2 }}>{goal.icon}</Box>
                                        <Typography variant="h6" fontWeight="bold">{goal.title}</Typography>
                                    </Stack>

                                    <Typography variant="body2" color="text.secondary">Current Savings</Typography>
                                    <Typography variant="h5" fontWeight="bold" mb={2}>KES {goal.current.toLocaleString()}</Typography>

                                    <LinearProgress
                                        variant="determinate"
                                        value={progress}
                                        sx={{ height: 10, borderRadius: 5, mb: 1, bgcolor: 'rgba(0,0,0,0.05)', '& .MuiLinearProgress-bar': { bgcolor: goal.color } }}
                                    />

                                    <Stack direction="row" justifyContent="space-between">
                                        <Typography variant="caption" color="text.secondary">{Math.round(progress)}% Complete</Typography>
                                        <Typography variant="caption" fontWeight="bold">Target: {goal.target.toLocaleString()}</Typography>
                                    </Stack>
                                </Paper>
                            </Grid>
                        );
                    })}
                </Grid>

                <Fab color="primary" aria-label="add" sx={{ position: 'fixed', bottom: 32, right: 32 }}>
                    <AddIcon />
                </Fab>
            </Box>
        </DashboardLayout>
    );
}