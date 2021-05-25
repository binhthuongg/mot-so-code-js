import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { movieApi } from '../../../commons/API/movieApi';
import { MOVIE_HEADER_CATEGORY_ID } from '../../../constants/Movie';
import FilmIntroduce from '../FilmIntroduce';
import styles from './styles';

function FilmHeaderCategory(): React.ReactElement {
    const [listHeaderGenreAllMovies, setListHeaderGenreAllMovies] = useState(
        [],
    );
    useEffect(() => {
        const fetchData = async () => {
            try {
                await movieApi
                    .getMoviesByGenreId(MOVIE_HEADER_CATEGORY_ID)
                    .then((response) => {
                        setListHeaderGenreAllMovies(response.data.data);
                    });
            } catch (error) {
                return '';
            }
        };
        fetchData();
    }, []);
    // const { listFilmGenres } = props;
    const renderSliderContent = () => {
        let html = null;
        if (listHeaderGenreAllMovies && listHeaderGenreAllMovies.length) {
            html = listHeaderGenreAllMovies.map((singleMovie, index) => {
                return (
                    <FilmIntroduce
                        filmDetail={singleMovie}
                        isSinglePageMovie={false}
                        key={index}
                    />
                );
            });
        }
        return html;
    };
    const renderListFilm = () => {
        let html = null;
        const settings = {
            dots: false,
            arrows: false,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
        };
        if (listHeaderGenreAllMovies) {
            if (
                listHeaderGenreAllMovies.length &&
                listHeaderGenreAllMovies.length > 0
            ) {
                html = <Slider {...settings}>{renderSliderContent()}</Slider>;
            }
        }
        return html;
    };

    return (
        <div className='FilmHeaderCategoryWrapper'>
            {renderListFilm()}
            <style jsx>{styles}</style>
        </div>
    );
}

export default FilmHeaderCategory;
