import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DrmTokenFunction from '../../commons/API/drmToken';
import { movieApi } from '../../commons/API/movieApi';
import { isClientSide } from '../../commons/utils';
import { setupDRMToday } from '../../commons/setupFilmShakaDRM';
import * as LOCAL_STORAGE from '../../constants/LocalStorage';
import * as CONSTANTS_MOVIE from '../../constants/Movie';
import Modal from 'react-modal';
import { actionSetMovieScreen } from '../../features/Film/movieScreen';
import iconClose from './images/iconClose.svg';
import styles, {globalStyles} from './styles';
import { isSafari } from 'react-device-detect';
import { secondaryColor } from '../../constants/theme';

const shaka = isClientSide ? require('shaka-player') : null;

/**
* Component player, hiển thị màn hình xem phim
*
* Không cần truyền prop
*/
function Player() {
	const [isShowPopUp, setIsShowPopup] = useState(true);
	if(isClientSide) {
		console.log('shaka.Player.isBrowserSupported()', shaka.Player.isBrowserSupported())

	}
	Modal.setAppElement('.appWrapper');

	const playingScreen = useSelector(
        (state) => state.movieScreen,
	);
	const playerTitle = useSelector(
        (state) => state.player.playerTitle,
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

	const renderPopupSafari = () => {

		const handleClosePopup = () => {
			setIsShowPopup(false);
		};

		if(isSafari && isDrmVideo){
			// setIsShowPopup(true);
			const modalComponentStyles = {
				content: {
					top: '50%',
					left: '50%',
					right: 'auto',
					bottom: 'auto',
					marginRight: '-50%',
					transform: 'translate(-50%, -50%)',
					background: secondaryColor,
					border: 'none',
					color: '#ffffff',
					padding: '20px 30px',
				},
				overlay: {
					background: 'transparent',
					zIndex: 999899999999999989,
				},
			};
			return (
				<Modal
					isOpen={isShowPopUp}
					style={modalComponentStyles}
					closeTimeoutMS={500}
				>
					<div className='popUpWrapper'>Ứng dụng không hỗ trợ phát định dạng video này trên trình duyệt của bạn. Vui lòng sử dụng Chrome, Firefox, hoặc Microsoft Edge mới nhất. </div>
					<button type='button' onClick={() => handleClosePopup()}>
						x
					</button>
					<style jsx>{styles}</style>
				</Modal>
			);
		}
	};
	let player = null;
	let functionTimeOutPing = null;
	let functionTimeOutSetWatching = null;
	
	const dispatch = useDispatch();
	const videoRef = useRef();
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
		functionTimeOutPing = setInterval(() => {
			if(videoRef.current) {
				DrmTokenFunction.ping(null, tokenId).then((response)=> {
					console.log('response', response);
				}).catch((error) => {
					console.log('error', error);
					console.log('error.status', error.response.status);
					if(error.response.status === 426) {
						refreshDrm(sessionId).then(()=> {
							console.log('refresh')
						}).catch(()=>{
							console.log('abc')
						});
					}
				})
			}
		}, CONSTANTS_MOVIE.TIME_MOVIE_INTERVAL_TIME_PING);
	};
	const setMovieWatching=(currentTime) => {
		if(movieId && isDrmVideo) {
			movieApi.movieWatchingSet(movieId, currentTime).catch((error)=> {
				console.log('error', error);
			});
		}
	};
	functionTimeOutSetWatching = setInterval(() => {
		if(videoRef.current && !videoRef.current.paused && playingScreen === CONSTANTS_MOVIE.MOVIE_DETAIL_PLAYING) {
			
			setMovieWatching(videoRef.current.currentTime);
		}
	}, CONSTANTS_MOVIE.TIME_MOVIE_WATCHING_SET);
    async function initPlayer() {
		player = new shaka.Player(videoRef.current);
		videoRef.current.currentTime = timeStartPlaying;
		// if (isDrmVideo && isClientSide) {
		if (isDrmVideo) {
			await customData();
			await setupDRMToday(player);

			// Ping lần đầu
			const sessionId = localStorage.getItem(LOCAL_STORAGE.SESSION_ID);
			await setTimeout(()=> {
				pingFirstTime(sessionId);
			}, CONSTANTS_MOVIE.TIME_MOVIE_FIRST_TIME_PING);
			const tokenId = localStorage.getItem(LOCAL_STORAGE.DRM_TOKEN);
			pingInterval(tokenId, sessionId);
		}
		// setMovieWatching();
		// if(isClientSide) {
			player
			.unload().then(()=> {
				player.load(url)
				.then(() => {
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
		dispatch(actionSetMovieScreen(CONSTANTS_MOVIE.MOVIE_DETAIL_SHOW_INFO));
		try {
			player.unload();
		} catch (error) {
			console.log('error', error);
		}
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
        // if (playingScreen === CONSTANTS_MOVIE.MOVIE_DETAIL_PLAYING && url && isClientSide) {
        if (playingScreen === CONSTANTS_MOVIE.MOVIE_DETAIL_PLAYING && url) {
            shaka.polyfill.installAll();

            // Check to see if the browser supports the basic APIs Shaka needs.
            if (shaka.Player.isBrowserSupported()) {
                // Everything looks good!
				initPlayer();
            } else {
                // This browser does not have the minimum set of APIs we need.
                console.error('Browser not supported!');
			}
        }
		return () => {
			clearInterval(functionTimeOutPing);
			clearInterval(functionTimeOutSetWatching);
		};
	}, [playingScreen, url, updateLicence, updateLicence2]);
    return (
        <div className={`FilmPlaying 3 ${playingScreen === CONSTANTS_MOVIE.MOVIE_DETAIL_PLAYING ? 'active' : ''}`}>
			<h2 className='name'>{playerTitle}</h2>
            <video ref={videoRef} poster={posterUrl} controls autoPlay>
                <track kind='captions' />
            </video>
			<button className='close' onClick={()=>handleCloseFilm()} type='button'>
				<img src={iconClose} alt='Close' />
			</button>
			{renderPopupSafari()}
            <style jsx>{styles}</style>
            <style jsx>{globalStyles}</style>
        </div>
    );
}

export default Player;
