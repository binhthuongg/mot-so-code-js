import { createSlice } from '@reduxjs/toolkit';
import * as CONSTANTS from '../../constants/Movie';

// trạng thái play film hay không
const movieScreenSlice = createSlice({
    name: 'movieScreen',
    initialState: CONSTANTS.MOVIE_DETAIL_SHOW_INFO,
    reducers: {
        actionSetMovieScreen(state, action) {
            return action.payload;
        },
    },
});

export const { actionSetMovieScreen } = movieScreenSlice.actions;

export default movieScreenSlice.reducer;
