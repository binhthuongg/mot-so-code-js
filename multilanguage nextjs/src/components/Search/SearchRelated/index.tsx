import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as SearchResultType from '../../../constants/SearchResultType';
import { actionChangeInput } from '../../../features/Search/searchResultByInput';
import { actionSearchResultType } from '../../../features/Search/searchResultType';
import { FilmModel } from '../../../models/FilmModel';
import styles from './styles';

type stateType = {
    searchResultByInput: {
        resultByInput: [];
        inputText: string;
    };
    searchResultType: string;
};
type relatedFilmListType = FilmModel[];
function SearchRelated(): React.ReactElement {
    const dispatch = useDispatch();
    const relatedFilmList = useSelector(
        (state: stateType) => state.searchResultByInput.resultByInput,
    );
    const searchInputValue = useSelector(
        (state: stateType) => state.searchResultByInput.inputText,
    );
    const searchResultType = useSelector(
        (state: stateType) => state.searchResultType,
    );
    const handleClickRelateFilm = (movieName?: string) => {
        // console.log('movieName');
        dispatch(
            actionSearchResultType(SearchResultType.SEARCH_RESULT_TYPE_INPUT),
        );
        dispatch(actionChangeInput(movieName));
    };
    const setClassName = (name: string | undefined, index: number) => {
        if (
            name === searchInputValue &&
            searchResultType === SearchResultType.SEARCH_RESULT_TYPE_INPUT &&
            index === 0
        ) {
            return 'active';
        }
    };
    const renderSearchRelated = (relatedFilmList: relatedFilmListType) => {
        let html = null;
        if (relatedFilmList.length > 0) {
            html = relatedFilmList.map(
                (relatedFilm: FilmModel, index: number) => {
                    return (
                        <li key={index}>
                            <span
                                onClick={() =>
                                    handleClickRelateFilm(relatedFilm.name)
                                }
                                className={setClassName(
                                    relatedFilm.name,
                                    index,
                                )}
                                role='button'
                                tabIndex={0}
                            >
                                {relatedFilm.name}
                            </span>
                            <style jsx>{styles}</style>
                        </li>
                    );
                },
            );
        } else {
            html = 'Không có kết quả nào';
        }
        return html;
    };
    return (
        <div className='SearchRelatedWrapper 34'>
            {/* <h2>Tìm kiếm liên quan</h2> */}
            <ul>{renderSearchRelated(relatedFilmList)}</ul>
            <style jsx>{styles}</style>
        </div>
    );
}
export default SearchRelated;
