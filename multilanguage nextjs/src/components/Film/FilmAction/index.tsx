import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { movieApi } from '../../../commons/API/movieApi';
import * as CONSTANTS_MOVIE from '../../../constants/Movie';
import { actionSetMovieScreen } from '../../../features/Film/movieScreen';
import {
    actionSetMovieId,
    actionSetPlayerPoster,
    actionSetPlayerTimeStartPlaying,
    actionSetPlayerTitle,
    actionSetPlayerUrl,
} from '../../../features/Film/player';
import {
    FilmModel,
    listSeasonEpisodeModel,
    MovieSeasonModel,
} from '../../../models/FilmModel';
import IconPlay from './images/icon-play.svg';
import IconPlayWhite from './images/icon-play-white.svg';
import IconYeuThich from './images/icon-yeuThich.svg';
import styles from './styles';

type PropType = {
    filmDetail: FilmModel;
    listAllSeason?: MovieSeasonModel[];
};

type stateType = {
    player: {
        canPlay: boolean;
    };
};

function FilmAction(props: PropType): React.ReactElement {
    const { filmDetail, listAllSeason } = props;
    const [forReRender, setForReRender] = useState(0);
    const [selectedSeasonIndex, setSelectedSeasonIndex] = useState(0);
    const [isShowListSeason, setIsShowListSeason] = useState(false);
    const [isShowListEpisode, setIsShowListEpisode] = useState(false);
    const player = useSelector((state: stateType) => state.player);
    const dispatch = useDispatch();

    const setFavoriteText = () => {
        if (filmDetail.is_favorite) {
            return 'Đã yêu thích';
        }
        return 'Yêu thích';
    };

    const setFavorite = async () => {
        await movieApi.movieFavoriteSet(filmDetail.movie_id).then(() => {
            filmDetail.is_favorite = !filmDetail.is_favorite;
            setForReRender(forReRender + 1); // re render component
        });
    };

    const changeSelectIndexSeason = (season_id: string) => {
        if (listAllSeason) {
            const index = listAllSeason.findIndex((singleOtherPart) => {
                return singleOtherPart.season_id === season_id;
            });
            if (index > -1 && index !== selectedSeasonIndex) {
                setSelectedSeasonIndex(index);
            }
        }
    };

    const listSeasonActiveClass = (id: string) => {
        if (
            listAllSeason &&
            id === listAllSeason[selectedSeasonIndex].season_id
        ) {
            return 'active';
        }
    };

    const renderListSeason = () => {
        let html = null;
        if (listAllSeason && listAllSeason.length) {
            html = listAllSeason.map((singleSeason, index) => {
                return (
                    <li
                        key={index}
                        onClick={() =>
                            changeSelectIndexSeason(singleSeason.season_id)
                        }
                        className={listSeasonActiveClass(
                            singleSeason.season_id,
                        )}
                    >
                        <span className='text'>{singleSeason.name}</span>
                        <style jsx>{styles}</style>
                    </li>
                );
            });
        }
        return html;
    };

    const handlePlayEpisode = (movieEpisode: listSeasonEpisodeModel) => {
        if (!player.canPlay) return;
        if (!movieEpisode.movie_url) return;
        dispatch(actionSetMovieScreen(CONSTANTS_MOVIE.MOVIE_DETAIL_PLAYING));
        dispatch(actionSetPlayerTitle(movieEpisode.name));
        dispatch(actionSetPlayerUrl(movieEpisode.movie_url));
        dispatch(actionSetMovieId(movieEpisode.movie_id));
        dispatch(
            actionSetPlayerPoster(movieEpisode.season_landscape_poster_url),
        );
        dispatch(actionSetPlayerTimeStartPlaying(0));
    };

    const renderListEpisode = () => {
        let html = null;
        if (listAllSeason && listAllSeason.length) {
            const selectedSeason = listAllSeason[selectedSeasonIndex];
            if (selectedSeason.listSeasonEpisode) {
                html = selectedSeason.listSeasonEpisode.map(
                    (singleEpisode, index) => {
                        const watchingPercent = `${singleEpisode.watching_percent}%`;
                        return (
                            <li key={index}>
                                <span
                                    className='text'
                                    onClick={() =>
                                        handlePlayEpisode(singleEpisode)
                                    }
                                    role='button'
                                    tabIndex={0}
                                >
                                    {singleEpisode.name}
                                    <img src={IconPlayWhite} alt='' />
                                </span>
                                <div className='line'>
                                    <span style={{ width: watchingPercent }} />
                                </div>
                                <style jsx>{styles}</style>
                            </li>
                        );
                    },
                );
            }
        }
        return html;
    };

    const toggleShowListSeason = () => {
        setIsShowListSeason(!isShowListSeason);
    };

    const renderActionSelectSeason = () => {
        let html = null;
        if (filmDetail.seasons && filmDetail.seasons.length) {
            html = (
                <li
                    onClick={() => toggleShowListSeason()}
                    className={`singleButton hideMobile  ${
                        isShowListSeason ? 'active' : ''
                    }`}
                >
                    {/* <span className='image'>
                        <img src={IconPlay} alt='' />
                    </span> */}
                    <span>Chọn mùa</span>
                    <div
                        className={`subMenu listSeason ${
                            isShowListSeason ? 'active' : ''
                        }`}
                    >
                        <ul>{renderListSeason()}</ul>
                    </div>
                    <style jsx>{styles}</style>
                </li>
            );
        }
        return html;
    };

    const toggleShowListEpisode = () => {
        setIsShowListEpisode(!isShowListEpisode);
    };

    const renderActionSelectEpisode = () => {
        let html = null;
        if (filmDetail.seasons && filmDetail.seasons.length) {
            html = (
                <li
                    onClick={() => toggleShowListEpisode()}
                    className={`singleButton hideMobile ${
                        isShowListEpisode ? 'active' : ''
                    }`}
                >
                    {/* <span className='image'>
                        <img src={IconYeuThich} alt='' />
                    </span> */}
                    <span>Chọn tập</span>
                    <div
                        className={`subMenu listEpisode ${
                            isShowListEpisode ? 'active' : ''
                        }`}
                    >
                        <ul>{renderListEpisode()}</ul>
                    </div>
                    <style jsx>{styles}</style>
                </li>
            );
        }
        return html;
    };

    const playFilm = () => {
        if (!player.canPlay) return;
        dispatch(actionSetMovieScreen(CONSTANTS_MOVIE.MOVIE_DETAIL_PLAYING));
        dispatch(actionSetPlayerTitle(filmDetail.name));
        dispatch(actionSetPlayerUrl(filmDetail.movie_url));
        dispatch(actionSetMovieId(filmDetail.movie_id));
        dispatch(actionSetPlayerPoster(filmDetail.season_landscape_poster_url));
        dispatch(actionSetPlayerTimeStartPlaying(filmDetail.watching_point));
    };

    const renderActionPlayFilm = () => {
        let html = null;
        html = (
            <li
                onClick={() => playFilm()}
                className={`singleButton buttonPlay ${
                    filmDetail.is_trailer ? 'isTrailer' : ''
                }`}
            >
                <span className='image'>
                    <img src={IconPlay} alt='' />
                </span>
                <span className='text'>
                    {filmDetail.is_trailer ? 'Phát trailer' : 'Phát'}
                </span>
                <style jsx>{styles}</style>
            </li>
        );
        return html;
    };

    const renderActionSetIsFavorite = () => {
        let html = null;
        html = (
            <li className='singleButton' onClick={() => setFavorite()}>
                <span className='image'>
                    <img src={IconYeuThich} alt='' />
                </span>
                <span className='text'>{setFavoriteText()}</span>
                <style jsx>{styles}</style>
            </li>
        );
        return html;
    };

    const findLastViewSeasonIndex = () => {
        if (listAllSeason) {
            const result = listAllSeason.findIndex((singleSeason) => {
                return singleSeason.season_id === filmDetail.season_last_id;
            });
            if (result > -1) {
                setSelectedSeasonIndex(result);
            }
        }
    };
    useEffect(() => {
        findLastViewSeasonIndex();
    }, [listAllSeason]);

    return (
        <div className='FilmAction'>
            <ul className='listAction'>
                {renderActionSelectSeason()}
                {renderActionSelectEpisode()}
                {renderActionPlayFilm()}
                {renderActionSetIsFavorite()}
            </ul>
            <style jsx>{styles}</style>
        </div>
    );
}

export default FilmAction;
