import React from 'react';
import { useDispatch } from 'react-redux';
import * as CONSTANTS_MOVIE from '../../../constants/Movie';
import { actionSetMovieScreen } from '../../../features/Film/movieScreen';
import {
    actionSetMovieId,
    actionSetPlayerPoster,
    actionSetPlayerTimeStartPlaying,
    actionSetPlayerTitle,
    actionSetPlayerUrl,
} from '../../../features/Film/player';
import { MovieEpisodeModel } from '../../../models/FilmModel';
// import styles from './styles.module.scss';
import styles from './styles';

type PropType = {
    listMovieEpisode: MovieEpisodeModel[];
};
function FilmEpisode(props: PropType): React.ReactElement {
    const { listMovieEpisode } = props;
    const dispatch = useDispatch();
    const handlePlayFilm = (movieEpisode: MovieEpisodeModel) => {
        dispatch(actionSetMovieScreen(CONSTANTS_MOVIE.MOVIE_DETAIL_PLAYING));
        dispatch(actionSetPlayerTitle(movieEpisode.name));
        dispatch(actionSetPlayerUrl(movieEpisode.movie_url));
        // dispatch(actionSetPlayerUrl('https://cdn.vod.sunshinetv.vn/storage01/hbo/the_twilight_zone_s1_04_a_traveler/dash/master.mpd'));
        dispatch(actionSetMovieId(movieEpisode.movie_id));
        dispatch(
            actionSetPlayerPoster(movieEpisode.season_landscape_poster_url),
        );
        dispatch(actionSetPlayerTimeStartPlaying(0));
    };
    const renderEpisode = () => {
        let html = null;
        if (listMovieEpisode && listMovieEpisode.length) {
            html = listMovieEpisode.map((singleMovieEpisode, index) => {
                return (
                    <li key={index}>
                        <div
                            className='item link'
                            onClick={() => handlePlayFilm(singleMovieEpisode)}
                            role='button'
                            tabIndex={0}
                        >
                            <span className='name'>{`Tập ${index + 1}`}</span>
                        </div>
                        <style jsx>{styles}</style>
                    </li>
                );
            });
        }
        return html;
    };
    return (
        <div className='FilmEpisode'>
            <ul className='listEpisode'>{renderEpisode()}</ul>
            <style jsx>{styles}</style>
        </div>
    );
}

export default FilmEpisode;
