import { configureStore } from "@reduxjs/toolkit";
import saldoReducer from "./saldo/saldoSlice";
import purchasedMoviesReducer from "./purchasedMovies/purchasedMoviesSlice";

export const store = configureStore({
  reducer: {
    saldo: saldoReducer,
    purchasedMovies: purchasedMoviesReducer,
  },
});
