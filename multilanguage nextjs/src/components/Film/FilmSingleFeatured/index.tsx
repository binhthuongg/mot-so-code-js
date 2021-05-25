import Link from 'next/link';
import React from 'react';
import { useDispatch } from 'react-redux';
import * as CONSTANTS from '../../../constants/Movie';
import { actionSetMovieScreen } from '../../../features/Film/movieScreen';
import {
    actionSetCanPlay,
    actionSetPlayerPoster,
    actionSetPlayerTitle,
    actionSetPlayerUrl,
} from '../../../features/Film/player';
import styles from './styles';

type PropType = {
    isSunshineMovie?: boolean;
    link: string;
    imagePosterUrl?: string;
    title?: string;
    movie_url?: string;
};

/**
 * component để hiển thị feature image phim
 *
 * các props cần: link, isSunshineMovie? , movie_url?, title?, imagePosterUrl?
 */
function FilmSingleFeatured(props: PropType): React.ReactElement {
    const { link, imagePosterUrl, title, isSunshineMovie, movie_url } = props;
    const dispatch = useDispatch();
    const handleClickSunshineTV = () => {
        dispatch(actionSetCanPlay(true));
        dispatch(actionSetPlayerTitle(title));
        dispatch(actionSetMovieScreen(CONSTANTS.MOVIE_DETAIL_PLAYING));
        dispatch(actionSetPlayerUrl(movie_url));
        dispatch(actionSetPlayerPoster(imagePosterUrl));
        // return <Player url={movie_url} />;
    };
    const renderLink = () => {
        if (isSunshineMovie) {
            return (
                <div
                    onClick={() => handleClickSunshineTV()}
                    role='button'
                    tabIndex={0}
                    className='inner'
                >
                    <img className='image' src={imagePosterUrl} alt={title} />
                    <style jsx>{styles}</style>
                </div>
            );
        }
        return (
            <Link href={link}>
                <a className='inner'>
                    {/* <LazyLoadImage
						className={styles.image}
						src={imagePosterUrl}
						alt={title}
					/> */}
                    <img className='image' src={imagePosterUrl} alt={title} />
                    <style jsx>{styles}</style>
                </a>
            </Link>
        );
    };
    return (
        <div className='FilmSingleFeaturedWrapper'>
            {renderLink()}
            <h3 className='title'>{title}</h3>
            <style jsx>{styles}</style>
        </div>
    );
}

export default FilmSingleFeatured;
