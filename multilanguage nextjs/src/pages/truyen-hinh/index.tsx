import React, { useEffect, useState } from 'react';
import { isMobileOnly } from 'react-device-detect';
import { useDispatch, useSelector } from 'react-redux';
import { movieApi } from '../../commons/API/movieApi';
import Player from '../../components/Player';
import * as CONSTANTS_MOVIE from '../../constants/Movie';
import { actionSetMovieScreen } from '../../features/Film/movieScreen';
import {
    actionSetPlayerDrmVideo,
    actionSetPlayerPoster,
    actionSetPlayerTitle,
    actionSetPlayerUrl,
} from '../../features/Film/player';
import LayoutNoSidebar from '../../layouts/LayoutNoSidebar';
import { ComponentLayout } from '../../models/ComponentModel';
import { chanelModel } from '../../models/utils';
import styles from '../../styles/truyen-hinh/styles';

type listChanelType = chanelModel[];

type TvListType = {
    name?: string;
    lives: listChanelType;
}[];

type stateType = {
    movieScreen: string;
};

type PropType = {
    TvList?: TvListType;
    // eslint-disable-next-line react/no-unused-prop-types
    children?: React.ReactNode;
};

const TruyenHinh: ComponentLayout<PropType> = () => {
    const [TvList, setTvList] = useState([]);
    const dispatch = useDispatch();
    const playingScreen = useSelector((state: stateType) => state.movieScreen);
    const handleClick = (
        chanelUrl: string,
        chanelPoster: string,
        chanelTitle: string,
    ) => {
        if (isMobileOnly) return;
        dispatch(actionSetMovieScreen(CONSTANTS_MOVIE.MOVIE_DETAIL_PLAYING));
        dispatch(actionSetPlayerDrmVideo(true));
        dispatch(actionSetPlayerTitle(chanelTitle));
        dispatch(actionSetPlayerUrl(chanelUrl));
        dispatch(actionSetPlayerPoster(chanelPoster));
    };
    const renderTVChanel = (listChanel: listChanelType) => {
        let html = null;
        html = listChanel.map((singleChanel, index) => {
            return (
                <li
                    key={index}
                    onClick={() =>
                        handleClick(
                            singleChanel.link_live,
                            singleChanel.image,
                            singleChanel.name,
                        )
                    }
                >
                    <img src={singleChanel.image} alt='Hình ảnh kênh' />
                    <style jsx>{styles}</style>
                </li>
            );
        });
        return html;
    };
    const fetchData = async () => {
        try {
            await movieApi.getTvLives().then((response) => {
                setTvList(response.data.data);
            });
        } catch (error) {
            return '';
        }
    };

    useEffect(() => {
        dispatch(actionSetMovieScreen(CONSTANTS_MOVIE.MOVIE_DETAIL_SHOW_INFO));
        fetchData();
    }, []);

    const renderTV = (TvList: TvListType) => {
        let html = null;
        if (TvList && TvList.length) {
            html = TvList.map((TVCategory, index) => {
                if (TVCategory.lives && TVCategory.lives.length) {
                    return (
                        <div className='TVCategory' key={index}>
                            <h2 className='TVCategoryName'>
                                {TVCategory.name || 'Tên kênh'}
                            </h2>
                            <div className='TVCategoryChanel'>
                                <ul>{renderTVChanel(TVCategory.lives)}</ul>
                            </div>
                            <style jsx>{styles}</style>
                        </div>
                    );
                }
                return '';
            });
        }
        return html;
    };

    const renderPlayer = () => {
        if (playingScreen === CONSTANTS_MOVIE.MOVIE_DETAIL_PLAYING) {
            return <Player />;
        }
    };

    return (
        <div className='TV'>
            <div className='rowContainer'>
                {renderTV(TvList)}
                {renderPlayer()}
            </div>
            <style jsx>{styles}</style>
        </div>
    );
};

TruyenHinh.Layout = LayoutNoSidebar;

export default TruyenHinh;
