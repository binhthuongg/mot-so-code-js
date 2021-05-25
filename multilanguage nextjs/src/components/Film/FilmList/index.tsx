import React from 'react';
import { FilmModel } from '../../../models/FilmModel';
import FilmSingleFeatured from '../FilmSingleFeatured';
import styles, { filmListStyles } from './styles';

type PropType = {
    title?: string;
    listMovie?: FilmModel[];
};

function FilmList(props: PropType): React.ReactElement {
    const { title, listMovie } = props;
    // console.log('listMovie', listMovie);

    const renderTitle = () => {
        let html = null;
        if (title) {
            html = (
                <h2 className='title'>
                    {title}
                    <style jsx>{styles}</style>
                </h2>
            );
        }
        return html;
    };
    const renderListFilm = () => {
        let html = null;
        if (listMovie && listMovie.length) {
            html = listMovie.map((singleMovie, index) => {
                return (
                    <FilmSingleFeatured
                        key={index}
                        link={`/chi-tiet-phim/${singleMovie.movie_id}`}
                        imagePosterUrl={singleMovie.portrait_poster_url}
                        title={singleMovie.name}
                    />
                );
            });
        } else {
            html = 'Không có phim để hiển thị';
        }
        return html;
    };

    return (
        <div className='filmListWrapper'>
            {renderTitle()}
            <div className='filmList'>{renderListFilm()}</div>
            <style jsx>{styles}</style>
            <style jsx>{filmListStyles}</style>
        </div>
    );
}

export default FilmList;
