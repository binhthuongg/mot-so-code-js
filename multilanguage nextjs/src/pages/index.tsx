import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { movieApi } from '../commons/API/movieApi';
import { isClientSide, isLogin } from '../commons/utils';
import FilmCategory from '../components/Film/FilmCategory';
import FilmHeaderCategory from '../components/Film/FilmHeaderCategorySlider';
import Player from '../components/Player';
import PopUpCodeTraiNghiem from '../components/PopUp/PopUpCodeTraiNghiem';
import * as CONSTANTS_MOVIE from '../constants/Movie';
import { actionSetMovieScreen } from '../features/Film/movieScreen';
import LayoutNoSidebar from '../layouts/LayoutNoSidebar';
import { ComponentLayout } from '../models/ComponentModel';

type stateType = {
    movieScreen: string;
};

const Home: ComponentLayout = () => {
    const [listMoviesGenre, setListMoviesGenre] = useState([]);
    const [listHeaderMovies, setListHeaderMovies] = useState([]);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const getListMoviesGenre: any = [];
    const dispatch = useDispatch();

    const playingScreen = useSelector((state: stateType) => state.movieScreen);

    const renderPlayer = () => {
        if (playingScreen === CONSTANTS_MOVIE.MOVIE_DETAIL_PLAYING) {
            return <Player />;
        }
    };

    const mainRender = () => {
        return (
            <>
                <FilmHeaderCategory listHeaderMovies={listHeaderMovies} />
                <FilmCategory listMoviesGenre={listMoviesGenre} />
                {renderPlayer()}
                <PopUpCodeTraiNghiem />
            </>
        );
    };
    const fetchData = async () => {
        if (isLogin()) {
            try {
                // lấy header Category
                await movieApi
                    .getMoviesByGenreId(
                        CONSTANTS_MOVIE.MOVIE_HEADER_CATEGORY_ID,
                    )
                    .then((response) => {
                        setListHeaderMovies(response.data.data);
                    });
                const listGenres = await movieApi.getAllMoviesGenres(
                    CONSTANTS_MOVIE.All_TYPE_ID,
                );
                // console.log('genres23', listGenres);
                for (const singleGenre of listGenres.data.data) {
                    // console.log('singleGenre.id', singleGenre.id);
                    const movies = await movieApi.getMoviesByGenreId(
                        singleGenre.id,
                    );
                    // console.log('movies', movies);
                    singleGenre.listMovies = movies.data.data;
                    getListMoviesGenre.push(singleGenre);
                }
                // bỏ category Header
                const listMoviesGenreFiltered = getListMoviesGenre.filter(
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    (singleFilmGenre: any) => {
                        return (
                            singleFilmGenre.id !==
                            CONSTANTS_MOVIE.MOVIE_HEADER_CATEGORY_ID
                        );
                    },
                );
                setListMoviesGenre(listMoviesGenreFiltered);
            } catch (error) {
                // eslint-disable-next-line no-console
                console.log('error', error);
            }
        }
    };
    useEffect(() => {
        dispatch(actionSetMovieScreen(CONSTANTS_MOVIE.MOVIE_DETAIL_SHOW_INFO));
        fetchData();
    }, []);

    useEffect(() => {
        if (
            playingScreen === CONSTANTS_MOVIE.MOVIE_DETAIL_PLAYING &&
            isClientSide
        ) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [playingScreen]);

    return (
        <div className='appWrapper'>
            <Head>
                <link
                    rel='stylesheet'
                    type='text/css'
                    href='/styles/slick.min.css'
                />
            </Head>
            {mainRender()}
        </div>
    );
};
Home.Layout = LayoutNoSidebar;

export default Home;
