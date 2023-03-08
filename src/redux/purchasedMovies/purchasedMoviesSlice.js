import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    movies: {},
};

export const purchasedMoviesSlice = createSlice({
    name: "purchasedMovies",
    initialState,
    reducers: {
        addMovie: (state, action) => {
            if (state.movies[action.payload]) {
                return;
            }
            state.movies[action.payload] = 1;
        },
        removeMovie: (state, action) => {
            if (!state.movies[action.payload]) return;
            delete state.movies[action.payload];
        },
    },
});

export const { addMovie, removeMovie } = purchasedMoviesSlice.actions;

export default purchasedMoviesSlice.reducer;
