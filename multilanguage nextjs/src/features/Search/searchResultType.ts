import { createSlice } from '@reduxjs/toolkit';
import * as SearchResultType from '../../constants/SearchResultType';

const searchResultTypeSlice = createSlice({
    name: 'film/searchResultType',
    initialState: SearchResultType.SEARCH_RESULT_TYPE_INPUT,
    reducers: {
        actionSearchResultType(state, action) {
            const searchResultType = action.payload;
            state = searchResultType;
            return state;
        },
    },
});

export const { actionSearchResultType } = searchResultTypeSlice.actions;

export default searchResultTypeSlice.reducer;
