import { createSlice } from '@reduxjs/toolkit';

interface WalletState {
    balance: number;
    loading: boolean;
}

const initialState: WalletState = {
    balance: 0,
    loading: false,
};

const walletSlice = createSlice({
    name: 'wallet',
    initialState,
    reducers: {
        setBalance: (state, action) => {
            state.balance = action.payload;
        },
    },
});

export const { setBalance } = walletSlice.actions;
export default walletSlice.reducer;
