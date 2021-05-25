import { createSlice } from '@reduxjs/toolkit';
import * as CONSTANTS from '../../constants/Movie';

const sunshineVideoSlice = createSlice({
    name: 'sunshineVideo',
    initialState: {
        screen: CONSTANTS.MOVIE_DETAIL_SHOW_INFO,
        urlToPlay: '',
        posterUrl: '',
    },
    reducers: {
        actionSetSunshineVideoScreen(state, action) {
            return {
                ...state,
                screen: action.payload,
            };
        },
        actionSetSunshineVideoUrl(state, action) {
            return {
                ...state,
                urlToPlay: action.payload,
            };
        },
        actionSetSunshineVideoPoster(state, action) {
            return {
                ...state,
                posterUrl: action.payload,
            };
        },
    },
});

export const {
    actionSetSunshineVideoScreen,
    actionSetSunshineVideoUrl,
    actionSetSunshineVideoPoster,
} = sunshineVideoSlice.actions;

export default sunshineVideoSlice.reducer;
