import { createSlice } from '@reduxjs/toolkit';

const playerSlice = createSlice({
    name: 'film',
    initialState: {
        canPlay: false,
        playerTitle: '',
        timeStartPlaying: 0,
        urlToPlay: '',
        posterUrl: '',
        isDrmVideo: false,
        movieId: '',
    },
    reducers: {
        actionSetCanPlay(state, action) {
            return {
                ...state,
                canPlay: action.payload,
            };
        },
        actionSetPlayerTitle(state, action) {
            return {
                ...state,
                playerTitle: action.payload,
            };
        },
        actionSetPlayerTimeStartPlaying(state, action) {
            return {
                ...state,
                timeStartPlaying: action.payload,
            };
        },
        actionSetPlayerUrl(state, action) {
            return {
                ...state,
                urlToPlay: action.payload,
            };
        },
        actionSetPlayerPoster(state, action) {
            return {
                ...state,
                posterUrl: action.payload,
            };
        },
        actionSetPlayerDrmVideo(state, action) {
            return {
                ...state,
                isDrmVideo: action.payload,
            };
        },
        actionSetMovieId(state, action) {
            return {
                ...state,
                movieId: action.payload,
            };
        },
    },
});

export const {
    actionSetCanPlay,
    actionSetPlayerTitle,
    actionSetPlayerTimeStartPlaying,
    actionSetPlayerUrl,
    actionSetPlayerPoster,
    actionSetPlayerDrmVideo,
    actionSetMovieId,
} = playerSlice.actions;

export default playerSlice.reducer;
