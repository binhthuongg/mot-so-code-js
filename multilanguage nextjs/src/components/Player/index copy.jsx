import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DrmTokenFunction from '../../commons/API/drmToken';
import { movieApi } from '../../commons/API/movieApi';
import { isClientSide } from '../../commons/utils';
import { setupDRMToday } from '../../commons/setupFilmShakaDRM';
import * as LOCAL_STORAGE from '../../constants/LocalStorage';
import * as CONSTANTS_MOVIES from '../../constants/Movie';
import { actionSetMovieScreen } from '../../features/Film/movieScreen';
import iconClose from './images/iconClose.svg';
import styles from './styles';

const shaka = isClientSide ? require('shaka-player/dist/shaka-player.ui.js') : null;

function Player(props) {
	let player = null;
	const playingScreen = useSelector(
        (state) => state.movieScreen,
	);
	const url = useSelector(
        (state) => state.player.urlToPlay,
	);
	const posterUrl = useSelector(
        (state) => state.player.posterUrl,
	);
	const isDrmVideo = useSelector(
        (state) => state.player.isDrmVideo,
	);
	const movieId = useSelector(
        (state) => state.player.movieId,
	);
	const timeStartPlaying = useSelector(
        (state) => state.player.timeStartPlaying,
	);
	const dispatch = useDispatch();
	const videoRef = useRef();
	const videoContainer = useRef();
	const [updateLicence, setUpdateLicence] = useState(false);
	const [updateLicence2, setUpdateLicence2] = useState(false);
	const customData = async () => {
		await DrmTokenFunction.customData().then((response)=> {
			console.log('response', response)
			if (isClientSide && response.status === 'success' ) {
				localStorage.setItem(LOCAL_STORAGE.USER_ID, response.userId);
				localStorage.setItem(LOCAL_STORAGE.SESSION_ID, response.sessionId);
				localStorage.setItem(LOCAL_STORAGE.MERCHANT, response.merchant);
				setUpdateLicence(true);
			}
		})
	};
    function onError(error) {
        // Log the error.
		console.error('Error code abc', error.code, 'object', error);
		if(error.code === 6007) {
			// handleDrmData();
			// customData();
			setUpdateLicence2(!updateLicence2);
		}
    }
    function onErrorEvent(event) {
		onError(event.detail);
        // Extract the shaka.util.Error object from the event.
	}
	const refreshDrm = async (sessionId) => {
		await DrmTokenFunction.refresh(sessionId).then((response)=> {
			localStorage.setItem(LOCAL_STORAGE.DRM_TOKEN, response.token);
			console.log('response', response);
		})
	};
	const pingFirstTime = async(sessionId) => {
		await DrmTokenFunction.ping(sessionId).then((response)=> {
			localStorage.setItem(LOCAL_STORAGE.DRM_TOKEN, response.token);
		}).catch(()=> {
			console.log('error');
		})
	};
	const pingInterval = (tokenId, sessionId) => {
		setInterval(() => {
			if(videoRef.current) {
				DrmTokenFunction.ping(null, tokenId).then((response)=> {
					console.log('response', response)
				}).catch((error) => {
					console.log('error', error)
					console.log('error.status', error.status);
					if(error.status === 426) {
						refreshDrm(sessionId);
					}
				})
			}
		}, CONSTANTS_MOVIES.TIME_MOVIE_INTERVAL_TIME_PING);
	};
	const setMovieWatching=(currentTime) => {
		if(movieId && isDrmVideo) {
			movieApi.movieWatchingSet(movieId, currentTime).catch((error)=> {
				console.log('error', error);
			});
		}
	};
	setInterval(() => {
		if(videoRef.current && !videoRef.current.paused && playingScreen === CONSTANTS_MOVIES.MOVIE_DETAIL_PLAYING) {
			
			setMovieWatching(videoRef.current.currentTime);
		}
	}, CONSTANTS_MOVIES.TIME_MOVIE_WATCHING_SET);
    async function initPlayer() {
		console.log('url', url);
		player = new shaka.Player(videoRef.current);
		const ui = new shaka.ui.Overlay(player, videoContainer.current, videoRef.current);
		const config = {
			addSeekBar: true,
			overflowMenuButtons: ['captions'],
			'controlPanelElements': ['fast_forward', 'rewind']
		};
		ui.configure(config); // configure UI
		ui.getControls();
		console.log('ui', ui);
		  

		videoRef.current.currentTime = timeStartPlaying;
		// if (isDrmVideo && isClientSide) {
		if (isDrmVideo) {
			await customData();
			await setupDRMToday(player);

			// Ping lần đầu
			const sessionId = localStorage.getItem(LOCAL_STORAGE.SESSION_ID);
			await setTimeout(()=> {
				pingFirstTime(sessionId);
			}, CONSTANTS_MOVIES.TIME_MOVIE_FIRST_TIME_PING);
			const tokenId = localStorage.getItem(LOCAL_STORAGE.DRM_TOKEN);
			pingInterval(tokenId, sessionId);
		}
		// setMovieWatching();
		// if(isClientSide) {
			player
			.unload().then(()=> {
				console.log('unload');
				player.load(url)
				.then(() => {
					console.log('load');
					// This runs if the asynchronous load is successful.
					console.log(`The video has now been loaded! ${url}`);
				})
				.catch(onError); // onError is executed if the asynchronous load fails.

			});

			// Listen for error events.
			player.addEventListener('error', onErrorEvent);
		// }
		
    }
    
	const handleCloseFilm = () => {
		player.unload();
		dispatch(actionSetMovieScreen(CONSTANTS_MOVIES.MOVIE_DETAIL_SHOW_INFO));
		// if(videoRef.current && isClientSide) {
		if(videoRef.current ) {
			videoRef.current.pause();
			videoRef.current.currentTime = 0;
		}
		// if(isDrmVideo && isClientSide) {
		if(isDrmVideo) {
			const tokenId = localStorage.getItem(LOCAL_STORAGE.DRM_TOKEN);
			DrmTokenFunction.end(tokenId).catch(()=> {
				console.log('end error');
			});
		}
	};
    useEffect(() => {
        // if (playingScreen === CONSTANTS_MOVIES.MOVIE_DETAIL_PLAYING && url && isClientSide) {
        if (playingScreen === CONSTANTS_MOVIES.MOVIE_DETAIL_PLAYING && url) {
            shaka.polyfill.installAll();

            // Check to see if the browser supports the basic APIs Shaka needs.
            if (shaka.Player.isBrowserSupported()) {
                // Everything looks good!
				initPlayer();
				console.log('chay di ma');
            } else {
                // This browser does not have the minimum set of APIs we need.
                console.error('Browser not supported!');
			}
        }
	}, [playingScreen, url, updateLicence, updateLicence2]);
    return (
        <div className={`FilmPlaying 3 ${playingScreen === CONSTANTS_MOVIES.MOVIE_DETAIL_PLAYING ? 'active' : ''}`} >
			<div ref={videoContainer}>
            <video ref={videoRef} poster={posterUrl} controls autoPlay>
                <track kind='captions' />
            </video>

			</div>
			<button className='close' onClick={handleCloseFilm} type='button'>
				<img src={iconClose} alt='Close' />
			</button>
            <style jsx>{styles}</style>
        </div>
    );
}

export default Player;
