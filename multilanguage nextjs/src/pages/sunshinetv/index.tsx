import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { movieApi } from '../../commons/API/movieApi';
import { renderTextByNumberCharacter } from '../../commons/utils';
import Player from '../../components/Player';
import * as CONSTANTS_MOVIES from '../../constants/Movie';
import { actionSetMovieScreen } from '../../features/Film/movieScreen';
import {
    actionSetPlayerPoster,
    actionSetPlayerTitle,
    actionSetPlayerUrl,
} from '../../features/Film/player';
import LayoutMain from '../../layouts/LayoutMain';
import { ComponentLayout } from '../../models/ComponentModel';
import styles from '../../styles/sunshinetv/styles';

type SingleVideoType = {
    large_image: string;
    link_url: string;
    title: string;
};

type SingleCategoryType = {
    name_category?: string;
    sunshine_videos: SingleVideoType[];
};

type VideosType = SingleVideoType[];
const HBOGo: ComponentLayout = () => {
    const dispatch = useDispatch();
    const [sunshineTvData, setSunshineTvData] = useState([]);

    const fetchData = async () => {
        try {
            const response = await movieApi.getSunshineVideoList();
            setSunshineTvData(response.data.data);
        } catch (error) {
            return '';
        }
    };
    const handlePlaySunshineTv = (link_url: string, imageUrl: string) => {
        dispatch(actionSetMovieScreen(CONSTANTS_MOVIES.MOVIE_DETAIL_PLAYING));
        dispatch(actionSetPlayerTitle(''));
        dispatch(actionSetPlayerUrl(link_url));
        dispatch(actionSetPlayerPoster(imageUrl));
    };
    useEffect(() => {
        fetchData();
    }, []);

    const renderCategoryList = (videos: VideosType) => {
        let html = null;
        if (videos) {
            html = videos.map((singleVideo, index: number) => {
                return (
                    <div
                        className='TvCategoryItem'
                        key={index}
                        onClick={() =>
                            handlePlaySunshineTv(
                                singleVideo.link_url,
                                singleVideo.large_image,
                            )
                        }
                        tabIndex={0}
                        role='button'
                    >
                        <div className='image'>
                            <img src={singleVideo.large_image} alt='' />
                        </div>
                        <div className='title'>
                            {renderTextByNumberCharacter(singleVideo.title, 70)}
                        </div>
                        <style jsx>{styles}</style>
                    </div>
                );
            });
        }
        return html;
    };

    const renderSunshineTv = () => {
        let html = null;
        if (sunshineTvData && sunshineTvData.length) {
            html = sunshineTvData.map(
                (singleCategory: SingleCategoryType, index) => {
                    return (
                        <div className='TvCategory' key={index}>
                            <h3 className='singleTvCategoryTitle'>
                                {singleCategory.name_category}
                            </h3>
                            <div className='singleTvCategoryList'>
                                {renderCategoryList(
                                    singleCategory.sunshine_videos,
                                )}
                            </div>
                            <style jsx>{styles}</style>
                        </div>
                    );
                },
            );
        }
        return html;
    };
    return (
        <div className='SunshineTVWrapper'>
            <Head>
                <title>SunshineTV</title>
            </Head>
            {renderSunshineTv()}
            <Player />
            <style jsx>{styles}</style>
        </div>
    );
};

// export const getStaticProps = async (): Promise<Record<string, unknown>> => {
//     const id = MOVIE_DEFAULT_ID;
//     const res = await movieApi.getDetailMovieById(id);
//     const filmDetail: FilmModel[] = await res.data;

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
//             filmDetail,
//             listFilmGenres,
//         },
//     };
// };

HBOGo.Layout = LayoutMain;

export default HBOGo;
