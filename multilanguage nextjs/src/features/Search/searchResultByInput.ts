import { createSlice } from '@reduxjs/toolkit';

const searchResultByInputSlice = createSlice({
    name: 'search',
    initialState: {
        inputText: '',
        resultByInput: [],
    },
    reducers: {
        actionFetchListMoviesBySearchInputSuccess(state, action) {
            const results = action.payload;
            return {
                ...state,
                resultByInput: results,
            };
        },
        actionFetchListMoviesBySearchInputdFailed(state) {
            return state;
        },
        actionChangeInput(state, action) {
            const inputText = action.payload;
            return {
                ...state,
                inputText,
            };
        },
        actionClickKeyBoardToAddLetter(state, action) {
            state.inputText += action.payload;
            return state;
        },
        actionClickKeyBoardBackspace(state) {
            state.inputText = state.inputText.slice(0, -1);
            return state;
        },
    },
});

export const {
    actionFetchListMoviesBySearchInputSuccess,
    actionFetchListMoviesBySearchInputdFailed,
    actionChangeInput,
    actionClickKeyBoardToAddLetter,
    actionClickKeyBoardBackspace,
} = searchResultByInputSlice.actions;

export default searchResultByInputSlice.reducer;
