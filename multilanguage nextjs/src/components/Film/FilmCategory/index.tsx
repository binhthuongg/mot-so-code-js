import React from 'react';
import * as CONSTANTS from '../../../constants/Movie';
import { FilmModel } from '../../../models/FilmModel';
import FilmListSlider from '../FilmListSlider';
import styles, { sliderStyles } from './styles';

type listMoviesGenreType = {
    id: string;
    name: string;
    listMovies: FilmModel[];
}[];

type PropType = {
    listMoviesGenre: listMoviesGenreType;
};

/**
 * Hiển thị Phim Category
 *
 * cần truyền props: listMoviesGenre
 */
function FilmCategory(props: PropType): React.ReactElement {
    const { listMoviesGenre } = props;
    // console.log('listMoviesGenre', listMoviesGenre);

    // const renderListFilm = (
    //     listMovies: FilmModel[],
    //     isSunshineMovie: boolean,
    // ) => {
    //     let html = null;
    //     if (listMovies) {
    //         if (listMovies.length && listMovies.length > 0) {
    //             console.log('listMovies', listMovies);
    //             const player: PlayerType = {};
    //             html = listMovies.map((singleMovie, index) => {
    //                 if (isSunshineMovie) {
    //                     player.movie_url =
    //                         singleMovie && singleMovie.movie_url
    //                             ? singleMovie.movie_url
    //                             : '';
    //                     player.timeStartPlaying = 0;
    //                     player.isDrmVideo = false;
    //                     player.filmDetail = singleMovie;
    //                 }
    //                 return (
    //                     <FilmSingleFeatured
    //                         isSunshineMovie={isSunshineMovie}
    //                         key={index}
    //                         link={`/chi-tiet-phim/${singleMovie.movie_id}`}
    //                         imagePosterUrl={singleMovie.portrait_poster_url}
    //                         title={singleMovie.name}
    //                         {...player}
    //                     />
    //                 );
    //             });
    //         }
    //     }
    //     return html;
    // };

    const renderListFilmGenres = () => {
        let html = null;
        if (listMoviesGenre) {
            if (listMoviesGenre.length && listMoviesGenre.length > 0) {
                html = listMoviesGenre.map((singleGenre, index) => {
                    let isSunshineMovie = false;
                    let isSliderMovie = false;
                    if (singleGenre.id === CONSTANTS.SUNSHINE_GENRE_ID) {
                        isSunshineMovie = true;
                    }
                    if (singleGenre.id === CONSTANTS.SLIDER_GENRE_ID) {
                        isSliderMovie = true;
                    }
                    if (
                        singleGenre.listMovies &&
                        singleGenre.listMovies.length
                    ) {
                        return (
                            <FilmListSlider
                                key={index}
                                title={singleGenre.name}
                                listMovie={singleGenre.listMovies}
                                isSunshineMovie={isSunshineMovie}
                                isSliderMovie={isSliderMovie}
                            />
                            // <div className='listCategory' key={index}>
                            //     <h2 className='categoryName'>
                            //         {singleGenre.name}
                            //     </h2>
                            //     <div className='listMovies'>
                            //         {renderListFilm(
                            //             singleGenre.listMovies,
                            //             isSunshineMovie,
                            //         )}
                            //     </div>
                            //     <style jsx>{styles}</style>
                            // </div>
                        );
                    }
                    return '';
                });
            } else {
                html = (
                    <div className='listCategory'>
                        <h2 className='categoryName'>
                            Đang cập nhật thể loại phim
                        </h2>
                        <div className='listMovies'>
                            Đang cập nhật danh sách phim
                        </div>
                        <style jsx>{styles}</style>
                    </div>
                );
            }
        }
        return html;
    };

    return (
        <div className='FilmCategoryWrapper'>
            <div className='rowContainer'>{renderListFilmGenres()}</div>
            <style jsx>{styles}</style>
            <style jsx>{sliderStyles}</style>
        </div>
    );
}

export default FilmCategory;
