import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { movieApi } from '../../commons/API/movieApi';
import FilmCategory from '../../components/Film/FilmCategory';
import FilmHeaderCategory from '../../components/Film/FilmHeaderCategorySlider';
import Player from '../../components/Player';
import * as CONSTANTS_MOVIE from '../../constants/Movie';
import { actionSetMovieScreen } from '../../features/Film/movieScreen';
import LayoutNoSidebar from '../../layouts/LayoutNoSidebar';
import { ComponentLayout } from '../../models/ComponentModel';
import { FilmModel } from '../../models/FilmModel';
import styles from '../../styles/phim-bo/styles';

type PropType = {
    listFilmGenres: [];
    // eslint-disable-next-line react/no-unused-prop-types
    children?: React.ReactNode;
};

type stateType = {
    movieScreen: string;
};

type listMovieGenresType = {
    id: string;
    name: string;
    listMovies: FilmModel[];
}[];

type listAllGenresType = {
    id: string;
    name: string;
    listMovies: FilmModel[];
}[];

const PhimLe: ComponentLayout<PropType> = () => {
    const [listMoviesGenre, setListMoviesGenre] = useState<listMovieGenresType>(
        [],
    );
    const playingScreen = useSelector((state: stateType) => state.movieScreen);
    let getListMoviesGenre: listMovieGenresType = [];
    let listAllGenres: listAllGenresType = [];
    const [listHeaderMovies, setListHeaderMovies] = useState([]);
    const dispatch = useDispatch();
    const fetchData = async () => {
        try {
            // lấy header Category
            await movieApi
                .getMoviesByGenreIdAndTypeId(
                    CONSTANTS_MOVIE.MOVIE_HEADER_CATEGORY_ID,
                    CONSTANTS_MOVIE.PHIM_LE_ID,
                )
                .then((response) => {
                    setListHeaderMovies(response.data.data);
                });
            // lấy hết list Genre
            await movieApi
                .getAllMoviesGenres(CONSTANTS_MOVIE.PHIM_LE_ID)
                .then((response) => {
                    listAllGenres = response.data.data;
                });
            if (listAllGenres && listAllGenres.length) {
                getListMoviesGenre = [...listAllGenres];
                const numberAllGenres = listAllGenres.length;
                for (let i = 0; i < numberAllGenres; i += 1) {
                    if (
                        getListMoviesGenre[i].id !==
                        CONSTANTS_MOVIE.MOVIE_HEADER_CATEGORY_ID
                    ) {
                        getListMoviesGenre[i].listMovies = [];
                        const movies = await movieApi.getMoviesByGenreIdAndTypeId(
                            getListMoviesGenre[i].id,
                            CONSTANTS_MOVIE.PHIM_LE_ID,
                        );
                        getListMoviesGenre[i].listMovies = [
                            ...movies.data.data,
                        ];
                    }
                }
            }
            setListMoviesGenre(getListMoviesGenre);
        } catch (error) {
            // eslint-disable-next-line no-console
            console.log('error', error.response);
            return '';
        }
    };
    useEffect(() => {
        dispatch(actionSetMovieScreen(CONSTANTS_MOVIE.MOVIE_DETAIL_SHOW_INFO));
        fetchData();
    }, [dispatch]);

    const renderPlayer = () => {
        if (playingScreen === CONSTANTS_MOVIE.MOVIE_DETAIL_PLAYING) {
            return <Player />;
        }
    };

    return (
        <div className='PhimLeWrapper'>
            <Head>
                <title>Phim Lẻ</title>
            </Head>
            <FilmHeaderCategory listHeaderMovies={listHeaderMovies} />
            <FilmCategory listMoviesGenre={listMoviesGenre} />
            {renderPlayer()}
            <style jsx>{styles}</style>
        </div>
    );
};

// export const getStaticProps = async (): Promise<Record<string, unknown>> => {
//     const listFilmGenres = [];
//     try {
//         const listGenres = await movieApi.getAllMoviesGenres();
//         // console.log('listGenres', listGenres);
//         for (const singleGenre of listGenres.data) {
//             // console.log('singleGenre.id', singleGenre.id);
//             const movies = await movieApi.getMoviesByGenreId(singleGenre.id);
//             // console.log('movies', movies);
//             singleGenre.listMovies = movies.data;
//             listFilmGenres.push(singleGenre);
//         }
//     } catch (error) {
//         return {};
//     }
//     return {
//         props: {
//             listFilmGenres,
//         },
//     };
// };

PhimLe.Layout = LayoutNoSidebar;

export default PhimLe;
