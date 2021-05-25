import { combineReducers } from 'redux';
import listAllChanelSlice from '../features/Chanel/listAllChanel';
import listMoviePagesSlice from '../features/Film/listMoviePages';
import movieScreenSlice from '../features/Film/movieScreen';
import playerSlice from '../features/Film/player';
import sunshineVideoSlice from '../features/Film/sunshineVideo';
import searchResultByGenreIdSlice from '../features/Search/searchResultByGenreId';
import searchResultByInputSlice from '../features/Search/searchResultByInput';
import searchResultTypeSlice from '../features/Search/searchResultType';

const rootReducer = combineReducers({
    searchResultType: searchResultTypeSlice,
    searchResultByInput: searchResultByInputSlice,
    searchResultByGenreId: searchResultByGenreIdSlice,
    listAllChanel: listAllChanelSlice,
    listMoviePages: listMoviePagesSlice,
    movieScreen: movieScreenSlice,
    player: playerSlice,
    sunshineVideo: sunshineVideoSlice,
});

export default rootReducer;
