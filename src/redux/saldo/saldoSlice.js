import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  saldo: 100000,
};

export const saldoSlice = createSlice({
  name: "saldo",
  initialState,
  reducers: {
    decrementByAmount: (state, action) => {
      if (state.saldo < action.payload) return;
      state.saldo -= action.payload;
    },
    incrementByAmount: (state, action) => {
      state.saldo += action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { decrementByAmount, incrementByAmount } = saldoSlice.actions;

export default saldoSlice.reducer;
