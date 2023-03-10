import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    genres: [],
};

export const genreSlice = createSlice({
    name: "genre",
    initialState,
    reducers: {
        addGenre: (state, action) => {
            state.genres = [...state.genres, action.payload];
        },
        removeGenre: (state, action) => {
            state.genres = state.genres.filter(
                (genre) => parseInt(genre) !== parseInt(action.payload)
            );
        },
    },
});

export const { addGenre, removeGenre } = genreSlice.actions;

export default genreSlice.reducer;
