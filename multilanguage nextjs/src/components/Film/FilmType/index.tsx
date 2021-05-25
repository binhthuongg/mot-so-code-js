import React, { useState } from 'react';
import { FilmModel, ListFilmModel } from '../../../models/FilmModel';
import styles from './styles';

type listFilmGenresType = {
    name: string;
    listMovies: FilmModel[];
}[];
type PropType = {
    listFilmGenres: listFilmGenresType;
};
function FilmType(props: PropType): React.ReactElement {
    const [showGenreActiveIndex, setShowGenreActiveIndex] = useState(0);

    const { listFilmGenres } = props;
    const renderFilmTypeHeader = (
        listFilmGenres: listFilmGenresType,
        showGenreActiveIndex: number,
    ) => {
        const html = [];
        if (listFilmGenres.length > 0) {
            html.push(
                <div className='filmTypeHeaderInner' key={showGenreActiveIndex}>
                    <div className='boxText'>
                        <h2 className='name'>
                            {listFilmGenres[showGenreActiveIndex].name}
                        </h2>
                    </div>
                    <div className='boxImage'>
                        <img
                            src={
                                listFilmGenres[showGenreActiveIndex]
                                    .listMovies[0].landscape_poster_url ||
                                listFilmGenres[showGenreActiveIndex]
                                    .listMovies[0].season_landscape_poster_url
                            }
                            // src={getMovieImageBackdrop(
                            //     listFilmGenres[showGenreActiveIndex]
                            //         .listMovies[0].backdrop_path,
                            //     'original',
                            // )}
                            alt={listFilmGenres[showGenreActiveIndex].name}
                        />
                    </div>
                    <style jsx>{styles}</style>
                </div>,
            );
        }
        return html;
    };
    const addClassActive = (index: number) => {
        let className = '';
        className = index === showGenreActiveIndex ? 'active' : '';
        return className;
    };
    const renderFilmTypeList = (listFilmGenres: ListFilmModel) => {
        const html = [];
        if (listFilmGenres) {
            if (listFilmGenres.length > 0) {
                for (let i = 0; i < listFilmGenres.length; i += 1) {
                    const changeFilmTypeID = (index: number) => {
                        setShowGenreActiveIndex(index);
                    };
                    html.push(
                        <li
                            key={i}
                            onMouseEnter={() => changeFilmTypeID(i)}
                            className={addClassActive(i)}
                        >
                            <span>{listFilmGenres[i].name}</span>
                            <style jsx>{styles}</style>
                        </li>,
                    );
                }
            }
            return html;
        }
    };

    return (
        <div className='FilmTypeWrapper'>
            <div className='FilmTypeHeader'>
                {renderFilmTypeHeader(listFilmGenres, showGenreActiveIndex)}
            </div>
            <div className='filmTypeList'>
                <h3 className='title'>Thể loại</h3>
                <ul className='list'>{renderFilmTypeList(listFilmGenres)}</ul>
            </div>
            <style jsx>{styles}</style>
        </div>
    );
}

export default FilmType;
