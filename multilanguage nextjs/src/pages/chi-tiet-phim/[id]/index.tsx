// eslint-disable-next-line @typescript-eslint/no-unused-vars
import axios from 'axios';
import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DrmTokenFunction from '../../../commons/API/drmToken';
import { movieApi } from '../../../commons/API/movieApi';
import { isClientSide } from '../../../commons/utils';
import FilmIntroduce from '../../../components/Film/FilmIntroduce';
import FilmListSlider from '../../../components/Film/FilmListSlider';
import FilmNotification from '../../../components/Film/FilmNotification';
import Player from '../../../components/Player';
import * as CONSTANTS_MOVIE from '../../../constants/Movie';
import {
    actionSetCanPlay,
    actionSetPlayerDrmVideo,
    actionSetPlayerPoster,
    actionSetPlayerTimeStartPlaying,
    actionSetPlayerTitle,
    actionSetPlayerUrl,
} from '../../../features/Film/player';
import LayoutNoSidebar from '../../../layouts/LayoutNoSidebar';
import { ComponentLayout } from '../../../models/ComponentModel';
import { FilmModel } from '../../../models/FilmModel';
import styles from '../../../styles/chi-tiet-phim/styles';

type stateType = {
    movieScreen: string;
    player: {
        canPlay: boolean;
    };
};

const ChitietPhim: ComponentLayout = () => {
    const router = useRouter();
    const { id } = router.query;
    const dispatch = useDispatch();
    const playingScreen = useSelector((state: stateType) => state.movieScreen);
    const [isShowNotification, setShowNotification] = useState(false);
    const [filmDetail, setFilmDetail] = useState<FilmModel>({});
    const [listAllSeason, setListOtherPart] = useState([]);
    const fetchData = async () => {
        if (id) {
            try {
                await movieApi.getDetailMovieById(id).then((response) => {
                    setFilmDetail(response.data.data);
                    dispatch(actionSetPlayerDrmVideo(true));
                    dispatch(actionSetPlayerTitle(response.data.data.name));
                    dispatch(actionSetPlayerTimeStartPlaying(0));
                    dispatch(
                        actionSetPlayerPoster(
                            response.data.data.landscape_poster_url,
                        ),
                    );
                    dispatch(actionSetPlayerUrl(response.data.data.movie_url));
                });
                await movieApi
                    .getMovieSeaSonByMovieId(id)
                    .then(async (response) => {
                        if (response.data.data && response.data.data.length) {
                            const result = response.data.data;
                            const resultLength = result.length;
                            for (let i = 0; i < resultLength; i += 1) {
                                await movieApi
                                    .getMovieEpisodeBySeason(
                                        result[i].season_id,
                                    )
                                    .then((response) => {
                                        result[i].listSeasonEpisode =
                                            response.data.data;
                                    });
                            }
                            setListOtherPart(result);
                        }
                    });
            } catch (error) {
                // eslint-disable-next-line no-console
                console.log('error', error);
                return '';
            }
            if (filmDetail.is_trailer) {
                dispatch(actionSetCanPlay(true));
            } else {
                await DrmTokenFunction.customData().then((response) => {
                    if (response.status !== 'success') {
                        dispatch(actionSetCanPlay(false));
                        setShowNotification(true);
                    } else {
                        dispatch(actionSetCanPlay(true));
                    }
                });
            }
        }
    };
    const handleShowNotification = (isShowNotification: boolean) => {
        setShowNotification(isShowNotification);
    };
    const renderRelated = () => {
        const { movie_similars } = filmDetail;
        if (movie_similars) {
            return (
                <div className='FilmRelated'>
                    <div className='rowContainer'>
                        <FilmListSlider
                            title={CONSTANTS_MOVIE.PHIM_LIEN_QUAN_TITLE}
                            listMovie={movie_similars}
                        />
                    </div>
                    <style jsx>{styles}</style>
                </div>
            );
        }
    };
    const renderNotification = () => {
        if (isShowNotification) {
            return (
                <FilmNotification
                    setShowNotification={handleShowNotification}
                />
            );
        }
    };

    useEffect(() => {
        // dispatch(actionSetMovieScreen(CONSTANTS_MOVIE.MOVIE_DETAIL_SHOW_INFO));
        fetchData();
    }, [id]);

    const scrollTop = () => {
        const elementWrapper = document.getElementById('layoutMainContent');
        if (elementWrapper) {
            elementWrapper.scrollTop = 0;
        }
    };
    useEffect(() => {
        scrollTop();
    }, [id]);

    const renderPlayer = () => {
        if (playingScreen === CONSTANTS_MOVIE.MOVIE_DETAIL_PLAYING) {
            return <Player />;
        }
    };

    const renderSingleMovie = () => {
        // if (detailScreen === CONSTANTS_MOVIE.MOVIE_DETAIL_PLAYING) {
        //     return <Player />;
        // }
        // if (detailScreen === CONSTANTS_MOVIE.MOVIE_DETAIL_SHOW_LIST_RELATED_MOVIE) {
        //     const { movie_similars } = filmDetail || [];
        //     return (
        //         <div className='ListRelatedMovieWrapper'>
        //             <FilmList
        //                 title='Danh sách phim liên quan'
        //                 listMovie={movie_similars}
        //             />
        //             <button
        //                 className='buttonBack'
        //                 type='button'
        //                 onClick={() => handleBackScreen()}
        //             >
        //                 Trở lại
        //             </button>
        //             <style jsx>{styles}</style>
        //         </div>
        //     );
        // }
        return (
            <div className='ChiTietPhimInfo'>
                <Head>
                    <title>{`${filmDetail.name} - SunshineTV`}</title>
                </Head>
                <FilmIntroduce
                    listAllSeason={listAllSeason}
                    filmDetail={filmDetail}
                    isSinglePageMovie
                />
                {renderRelated()}
                {renderPlayer()}
                {renderNotification()}
            </div>
        );
    };
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
        <div className='ChiTietPhim'>
            {renderSingleMovie()}
            <style jsx>{styles}</style>
        </div>
    );
};

const tokenForExport =
    'eyJhbGciOiJSUzI1NiIsImtpZCI6Ijc1QUY4OTQxQkEwQTFCNzA3RTMxQjk4QjJBMURDMENEQkZBRDQ5RTQiLCJ0eXAiOiJhdCtqd3QiLCJ4NXQiOiJkYS1KUWJvS0czQi1NYm1MS2gzQXpiLXRTZVEifQ.eyJuYmYiOjE2MTU5NjYwNTQsImV4cCI6MTYxNTk2OTY1NCwiaXNzIjoiaHR0cHM6Ly9hcGkuc3Vuc2hpbmVncm91cC52bjo1MDAwIiwiYXVkIjoiYXBpX3NzdHZfc2VydmljZSIsImNsaWVudF9pZCI6Im1vYmlsZV9zdW5zaGluZXR2X2FwcF9wcm9kIiwic3ViIjoiZTRlNWE5OTAtNjk3ZC00NjUyLWE3ZTItNmRhODk0NTRlNTEwIiwiYXV0aF90aW1lIjoxNjE1ODYxNTY0LCJpZHAiOiJsb2NhbCIsInJvbGUiOiJyb2xfc3N0dl91c2VyIiwibmFtZSI6InNzdHZfMDEyMzQ1Njc4OTMiLCJzY29wZSI6WyJhcGlfc3N0dl9zZXJ2aWNlIiwib2ZmbGluZV9hY2Nlc3MiXSwiYW1yIjpbInB3ZCJdfQ.E1T6u5bQNkBNVBKtGtvKmsaazcuDDYYcLv_FRlRKPyaE-ANSpdHJp0WV88Q_FmJ6o1va6UzCkxFMxRpcgbTPd0YvSHezehv5fgDd3pPCyBlP1pvlyLRLHsSJPGUNO3ZVx5VE_khEEsEKzEy8PNlTDIbqoByhaJA3l5yjkiHuSHLLydKQEuNwo249JqN2Qwh-rBHtbKEBslUHibRHwbJVtMyaYBWiz4WFMNoWA2EPQ_uEzKoZcUgGqlpksoH8-g1Ik448vMw3fy92KZFr4qnPX2Tj91sFK8_4hlISa8xWjQl6UXhOK4mf2zd3KThr6H9iMO0I5b7Dr7ox13piJ4jT4g';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const headerBaseAuthenticate = () => {
    return {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tokenForExport}`,
    };
};
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function getStaticPaths() {
    const response = await axios({
        method: 'get',
        url:
            'https://apisunshinetv.sunshinegroup.vn/api/v1/sunshinetv/GetMoviePage?offSet=0&pageSize=1000',
        headers: headerBaseAuthenticate(),
    });
    const postList = await response.data.data;
    return {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        paths: postList.map((movie: any) => {
            return {
                params: {
                    id: `${movie.movie_id}`,
                },
            };
        }),
        fallback: false,
    };
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function getStaticProps() {
    // // fetch single post detail
    // console.log('params.id', params.id);
    // params.id = '8ba8af80-e941-4e99-a5f5-1b0cdf650cca';
    // const { data } = await axios.get(
    //     `https://apisunshinetv.sunshinegroup.vn/api/v1/sunshinetv/GetMovieDetail?movie_id=${params.id}&env=android`,
    //     {
    //         headers: headerBaseAuthenticate(),
    //     },
    // );
    // // console.log(data);
    return {
        props: {
            // data,
        },
    };
}

ChitietPhim.Layout = LayoutNoSidebar;

export default ChitietPhim;
