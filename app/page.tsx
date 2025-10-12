'use client';

import { Button, Typography, Stack } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { setBalance } from '../redux/slices/walletSlice';

export default function HomePage() {
  const dispatch = useDispatch();
  const balance = useSelector((state: RootState) => state.wallet.balance);

  return (
    <Stack alignItems="center" justifyContent="center" spacing={2} sx={{ minHeight: '100vh' }}>
      <Typography variant="h4" color="primary">
        Wallet Balance: KES {balance}
      </Typography>
      <Button variant="contained" onClick={() => dispatch(setBalance(balance + 500))}>
        Add 500 KES
      </Button>
    </Stack>
  );
}
