import React, { MutableRefObject, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { movieApi } from '../../../commons/API/movieApi';
import * as SearchResultType from '../../../constants/SearchResultType';
import { actionFetchListMoviesBySearchInputSuccess } from '../../../features/Search/searchResultByInput';
import { FilmModel } from '../../../models/FilmModel';
import FilmSingleFeatured from '../../Film/FilmSingleFeatured';
import styles, { searchResultStyles } from './styles';

type stateType = {
    searchResultByInput: {
        inputText: string;
        resultByInput: [FilmModel] | [];
    };
    searchResultByGenreId: {
        genreId: string;
        resultByGenreId: {
            data: [];
        };
    };
    searchResultType: string;
};

function SearchResult(): React.ReactElement {
    const dispatch = useDispatch();
    const searchResultType = useSelector(
        (state: stateType) => state.searchResultType,
    );
    const inputSearch = useSelector(
        (state: stateType) => state.searchResultByInput.inputText,
    );
    const genreId = useSelector(
        (state: stateType) => state.searchResultByGenreId.genreId,
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const typingTimeoutRef: MutableRefObject<any> = useRef();
    const getMoviesBySearchTitle = async () => {
        try {
            const result = await movieApi.getMoviesBySearchTitle(inputSearch);
            dispatch(
                actionFetchListMoviesBySearchInputSuccess(result.data.data),
            );
        } catch (error) {
            return '';
        }
    };
    // async function getMoviesBySearchTitle() {
    //     // await dispatch(fetchListMoviesBySearchTitleRequest(inputSearch));
    // }
    async function getMoviesByGenreId() {
        // await dispatch(actionFetchListMoviesByGenreIdRequest(genreId));
    }
    useEffect(() => {
        if (searchResultType === SearchResultType.SEARCH_RESULT_TYPE_INPUT) {
            if (typingTimeoutRef.current) {
                clearTimeout(typingTimeoutRef.current);
            }
            typingTimeoutRef.current = setTimeout(() => {
                getMoviesBySearchTitle();
            }, 1000);
        } else {
            getMoviesByGenreId();
        }
    }, [inputSearch, dispatch, searchResultType, genreId]);
    let listFilmResult = [];
    if (searchResultType === SearchResultType.SEARCH_RESULT_TYPE_INPUT) {
        listFilmResult = useSelector(
            (state: stateType) => state.searchResultByInput.resultByInput,
        );
    } else {
        listFilmResult = useSelector(
            (state: stateType) =>
                state.searchResultByGenreId.resultByGenreId.data,
        );
    }
    const renderListFilm = (listFilmResult: [FilmModel] | []) => {
        let html = null;
        if (listFilmResult) {
            if (listFilmResult.length && listFilmResult.length > 0) {
                return listFilmResult.map(
                    (singleMovie: FilmModel, index: number) => {
                        return (
                            <FilmSingleFeatured
                                key={index}
                                link={`/chi-tiet-phim/${singleMovie.movie_id}`}
                                imagePosterUrl={singleMovie.portrait_poster_url}
                                title={singleMovie.name}
                            />
                        );
                    },
                );
            }
        }
        html = <p>Không có kết quả nào</p>;
        return html;
    };
    return (
        <div className='SearchResult'>
            <h2 className='title'>Kết quả tìm kiếm</h2>
            <div className='list'>{renderListFilm(listFilmResult)}</div>
            <style jsx>{styles}</style>
            <style jsx>{searchResultStyles}</style>
        </div>
    );
}
export default SearchResult;
