import { createSlice } from '@reduxjs/toolkit';

const listAllChanelSlice = createSlice({
    name: 'chanel',
    initialState: [],
    reducers: {
        actionFetchListAllChanelSuccess(state, action) {
            return action.payload;
        },
        actionFetchListAllChanelFailed(state) {
            state = [...state];
            return state;
        },
    },
});

export const {
    actionFetchListAllChanelSuccess,
    actionFetchListAllChanelFailed,
} = listAllChanelSlice.actions;

export default listAllChanelSlice.reducer;
