import { createSlice } from '@reduxjs/toolkit';

const listMoviePagesSlice = createSlice({
    name: 'listMovies',
    initialState: {
        listMovies: [],
        listHeaderMovies: [],
    },
    reducers: {
        actionSetListMoviesPage(state, action) {
            return action.payload;
        },
    },
});

export const { actionSetListMoviesPage } = listMoviePagesSlice.actions;

export default listMoviePagesSlice.reducer;
