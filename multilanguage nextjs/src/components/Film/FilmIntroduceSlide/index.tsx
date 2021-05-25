import dynamic from 'next/dynamic';
import Link from 'next/link';
import React from 'react';
import { isMobileOnly } from 'react-device-detect';
import { useDispatch } from 'react-redux';
import { movieApi } from '../../../commons/API/movieApi';
import * as CONSTANTS_MOVIE from '../../../constants/Movie';
import { actionSetMovieScreen } from '../../../features/Film/movieScreen';
import {
    actionSetCanPlay,
    actionSetMovieId,
    actionSetPlayerDrmVideo,
    actionSetPlayerPoster,
    actionSetPlayerTimeStartPlaying,
    actionSetPlayerTitle,
    actionSetPlayerUrl,
} from '../../../features/Film/player';
import { FilmModel } from '../../../models/FilmModel';
import iconNotice from './images/iconNotice.svg';
import iconPlay from './images/iconPlay.svg';
import styles from './styles';

type PropType = {
    filmDetail: FilmModel;
};

const Device = dynamic(() => import('../../Device'), {
    ssr: false,
});

function FilmIntroduceSlider(props: PropType): React.ReactElement {
    const { filmDetail } = props;
    const dispatch = useDispatch();

    const renderFilmAgeRate = () => {
        if (filmDetail.age_rate && filmDetail.age_rate > 0) {
            return (
                <div className='filmAgeRate'>
                    {`${filmDetail.age_rate}+`}
                    <style jsx>{styles}</style>
                </div>
            );
        }
    };

    const renderFilmTitle = () => {
        return (
            <div className='filmTitle'>
                <Link href={`/chi-tiet-phim/${filmDetail.movie_id}`}>
                    <a className='link'>Link</a>
                </Link>
                <h1 className='filmTitleBig'>
                    {filmDetail.name || 'Đang cập nhật tiêu đề phim'}
                </h1>
                <h3 className='filmTitleSmall'>
                    {filmDetail.name_en || 'Loading title'}
                </h3>
                <style jsx>{styles}</style>
            </div>
        );
    };

    const handleClickPlay = () => {
        if (filmDetail.movie_id) {
            movieApi
                .getDetailMovieById(filmDetail.movie_id)
                .then((response) => {
                    dispatch(
                        actionSetMovieScreen(
                            CONSTANTS_MOVIE.MOVIE_DETAIL_PLAYING,
                        ),
                    );
                    dispatch(actionSetPlayerTitle(filmDetail.name));
                    if (filmDetail.is_trailer) {
                        dispatch(actionSetCanPlay(true));
                    } else {
                        dispatch(actionSetPlayerDrmVideo(true));
                    }
                    dispatch(actionSetPlayerUrl(response.data.data.movie_url));
                    dispatch(actionSetMovieId(filmDetail.movie_id));
                    dispatch(
                        actionSetPlayerPoster(
                            filmDetail.season_landscape_poster_url,
                        ),
                    );
                    dispatch(
                        actionSetPlayerTimeStartPlaying(
                            filmDetail.watching_point,
                        ),
                    );
                });
        }
    };

    const renderFilmButtons = () => {
        let html = null;
        html = (
            <Device>
                {() => {
                    if (isMobileOnly) return <></>;
                    return (
                        <div className='buttonWrapper'>
                            <button
                                type='button'
                                className='singleButton'
                                onClick={() => handleClickPlay()}
                            >
                                <img src={iconPlay} alt='Play' />
                                {filmDetail.is_trailer
                                    ? 'Phát trailer'
                                    : 'Phát'}
                            </button>
                            <Link
                                href={`/chi-tiet-phim/${filmDetail.movie_id}`}
                            >
                                <a className='singleButton'>
                                    <button type='button'>
                                        <img src={iconNotice} alt='Play' />
                                        Thông tin
                                    </button>
                                </a>
                            </Link>
                            <style jsx>{styles}</style>
                        </div>
                    );
                }}
            </Device>
        );
        return html;
    };

    // const renderDownloadApp = () => {
    //     let html = null;
    //     html = (
    //         <Device>
    //             {() => {
    //                 if (!isMobileOnly) return <></>;
    //                 let linkDownloadUrl =
    //                     'https://play.google.com/store/apps/details?id=vn.sunshinegroup.sunshinetv&hl=vi&gl=US';
    //                 if (isIOS) {
    //                     linkDownloadUrl =
    //                         'https://apps.apple.com/vn/app/sunshine-tv/id1493896361?l=vi';
    //                 }
    //                 return (
    //                     <div className='downloadAppWrapper'>
    //                         <h3>Xem SunshineTV trên điện thoại</h3>
    //                         <div className='linkDownload'>
    //                             <Link href={linkDownloadUrl}>
    //                                 <a>Tải ứng dụng miễn phí</a>
    //                             </Link>
    //                         </div>
    //                         <style jsx>{styles}</style>
    //                     </div>
    //                 );
    //             }}
    //         </Device>
    //     );
    //     return html;
    // };

    const renderFilmShortInformation = () => {
        let html = null;
        html = (
            <div className='filmInformation'>
                <div className='rowContainer'>
                    <div className='content'>
                        {renderFilmTitle()}
                        {renderFilmButtons()}
                        {/* {renderDownloadApp()} */}
                    </div>
                </div>
                <style jsx>{styles}</style>
            </div>
        );
        return html;
    };

    /**
     * Nếu là mobile thì lấy ảnh dọc, còn lại lấy ảnh ngang
     */
    const renderFilmFeaturedImage = () => {
        let html = null;
        html = (
            <div className='filmFeaturedImage'>
                <div className='inner'>
                    <Link href={`/chi-tiet-phim/${filmDetail.movie_id}`}>
                        <a>
                            <img
                                src={
                                    isMobileOnly
                                        ? filmDetail.portrait_poster_url
                                        : filmDetail.landscape_poster_url ||
                                          filmDetail.season_landscape_poster_url
                                }
                                alt=''
                            />
                        </a>
                    </Link>
                </div>
                <style jsx>{styles}</style>
            </div>
        );
        return html;
    };

    return (
        // <div
        //     className={`FilmIntroduceSlide ${
        //         isMobileOnly ? 'isMobileOnly' : ''
        //     }`}
        // >
        <div className='FilmIntroduceSlide 3'>
            {renderFilmAgeRate()}
            {renderFilmShortInformation()}
            {renderFilmFeaturedImage()}

            <style jsx>{styles}</style>
        </div>
    );
}

export default FilmIntroduceSlider;
