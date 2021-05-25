import { createSlice } from '@reduxjs/toolkit';

const searchResultByGenreIdSlice = createSlice({
    name: 'film/SearchResultByGenreId',
    initialState: {
        genreId: '',
        resultByGenreId: [],
    },
    reducers: {
        actionGetSearchGenreId(state, action) {
            const genreId = action.payload;
            return {
                ...state,
                genreId,
            };
        },
        actionFetchListMoviesBySearchGenreIdSuccess(state, action) {
            const resultByGenreId = action.payload;
            return {
                ...state,
                resultByGenreId,
            };
        },
        actionFetchListMoviesBySearchGenreIdFailed(state) {
            return { ...state };
        },
    },
});

export const {
    actionGetSearchGenreId,
    actionFetchListMoviesBySearchGenreIdSuccess,
    actionFetchListMoviesBySearchGenreIdFailed,
} = searchResultByGenreIdSlice.actions;

export default searchResultByGenreIdSlice.reducer;
