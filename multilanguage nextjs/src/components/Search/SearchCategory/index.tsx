import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { movieApi } from '../../../commons/API/movieApi';
import * as CONSTANTS_MOVIE from '../../../constants/Movie';
import * as SearchResultType from '../../../constants/SearchResultType';
import {
    actionFetchListMoviesBySearchGenreIdSuccess,
    actionGetSearchGenreId,
} from '../../../features/Search/searchResultByGenreId';
import { actionChangeInput } from '../../../features/Search/searchResultByInput';
import { actionSearchResultType } from '../../../features/Search/searchResultType';
import { FilmGenreModel } from '../../../models/FilmModel';
import styles from './styles';

type stateType = {
    searchResultType: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    listAllGenres: any;
};
function SearchCategory(): React.ReactElement {
    const dispatch = useDispatch();
    const [activeGenreId, setActiveGenreId] = useState('');
    const [listFilmGenre, setListFilmGenre] = useState<FilmGenreModel[]>([]);
    const searchResultType = useSelector(
        (state: stateType) => state.searchResultType,
    );
    const setClassName = (genreId?: string) => {
        if (
            genreId === activeGenreId &&
            searchResultType === SearchResultType.SEARCH_RESULT_TYPE_GENRE
        ) {
            return 'active';
        }
    };

    const fetchAllMoviesGenres = async () => {
        try {
            movieApi
                .getAllMoviesGenres(CONSTANTS_MOVIE.All_TYPE_ID)
                .then((response) => {
                    const getListMoviesGenre = response.data.data;
                    /**
                     * bỏ category header
                     */
                    const listMoviesGenreFiltered = getListMoviesGenre.filter(
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        (singleFilmGenre: any) => {
                            return (
                                singleFilmGenre.id !==
                                CONSTANTS_MOVIE.MOVIE_HEADER_CATEGORY_ID
                            );
                        },
                    );
                    setListFilmGenre(listMoviesGenreFiltered);
                });
            // dispatch(actionFetchListAllGenresSuccess(response.data));
        } catch (error) {
            return '';
        }
    };

    const fetchMoviesByGenreId = async (genreId?: string) => {
        try {
            const response = await movieApi.getMoviesByGenreId(genreId);
            dispatch(
                actionFetchListMoviesBySearchGenreIdSuccess(response.data),
            );
        } catch (error) {
            return '';
        }
    };
    const handleShowGenreMoviesById = (genreId?: string) => {
        if (genreId) {
            setActiveGenreId(genreId);
        }

        dispatch(
            actionSearchResultType(SearchResultType.SEARCH_RESULT_TYPE_GENRE),
        );
        dispatch(actionGetSearchGenreId(genreId));
        dispatch(actionChangeInput(''));
        fetchMoviesByGenreId(genreId);
        // dispatch(actionFetchListMoviesBySearchGenreIdSuccess(genreId));
    };

    useEffect(() => {
        fetchAllMoviesGenres();
        // dispatch(fetchListFilmGenresRequest());
    }, []);

    const renderSearchCategory = () => {
        let html = null;
        if (listFilmGenre && listFilmGenre.length) {
            html = listFilmGenre.map((singleGenre, index: number) => {
                return (
                    <li key={index}>
                        <span
                            onClick={() =>
                                handleShowGenreMoviesById(singleGenre.id)
                            }
                            className={setClassName(singleGenre.id)}
                            role='button'
                            tabIndex={0}
                        >
                            {singleGenre.name}
                        </span>
                        <style jsx>{styles}</style>
                    </li>
                );
            });
        }
        return html;
    };
    return (
        <div className='SearchCategory'>
            <h2>Thể loại phim</h2>
            <ul>{renderSearchCategory()}</ul>
            <style jsx>{styles}</style>
        </div>
    );
}
export default SearchCategory;
