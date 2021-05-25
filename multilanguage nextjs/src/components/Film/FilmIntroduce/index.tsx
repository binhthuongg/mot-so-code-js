import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import { isIOS, isMobileOnly } from 'react-device-detect';
import { renderTextByNumberCharacter } from '../../../commons/utils';
import { FilmModel, MovieSeasonModel } from '../../../models/FilmModel';
import FilmAction from '../FilmAction';
import styles from './styles';

type PropType = {
    isSinglePageMovie?: boolean;
    filmDetail: FilmModel;
    listAllSeason?: MovieSeasonModel[];
};

const Device = dynamic(() => import('../../Device'), {
    ssr: false,
});

function FilmIntroduce(props: PropType): React.ReactElement {
    const { listAllSeason, filmDetail } = props;
    // eslint-disable-next-line no-console
    console.log('filmDetail', filmDetail);
    const { isSinglePageMovie } = props;
    const [
        isClickReadMoreDescription,
        setIsClickReadMoreDescription,
    ] = useState(false);

    /**
     * Dùng để show ReadMore nếu text dài quá
     */
    const renderDescription = (
        description: string | undefined,
        numberCharacter: number,
    ) => {
        let html = null;
        if (!description) return;
        if (description.length < numberCharacter) return description;
        if (isSinglePageMovie) return description;
        const showAllText = () => {
            setIsClickReadMoreDescription(true);
        };
        if (!isClickReadMoreDescription) {
            html = (
                <>
                    {renderTextByNumberCharacter(description, numberCharacter)}
                    <span
                        onClick={() => showAllText()}
                        role='button'
                        tabIndex={0}
                        className='readMore'
                    >
                        Xem thêm
                    </span>
                    <style jsx>{styles}</style>
                </>
            );
            return html;
        }
        html = description;
        return html;
    };

    const renderFilmTypes = () => {
        let html = null;
        if (filmDetail.categories) {
            html = (
                <div className='filmTypes'>
                    {filmDetail.categories}
                    <style jsx>{styles}</style>
                </div>
            );
        }
        return html;
    };

    const renderFilmAgeRate = () => {
        let html = null;
        if (filmDetail.age_rate) {
            html = (
                <div className='filmAgeRate'>
                    {`${filmDetail.age_rate}+`}
                    <style jsx>{styles}</style>
                </div>
            );
        }
        return html;
    };

    const renderFilmMeta = () => {
        return (
            <div className='filmMeta'>
                {renderFilmAgeRate()}
                {renderFilmTypes()}
                <style jsx>{styles}</style>
            </div>
        );
    };

    const renderFilmYear = () => {
        let html = null;
        if (filmDetail.release_year) {
            html = (
                <div className='filmYear'>
                    <h4 className='label'>Năm sản xuất: </h4>
                    <span className='value'>{filmDetail.release_year}</span>
                    <style jsx>{styles}</style>
                </div>
            );
        }
        return html;
    };

    const renderFilmLength = () => {
        let html = null;
        if (filmDetail.length) {
            html = (
                <div className='filmLength'>
                    <h4 className='label'>Thời lượng: </h4>
                    <span className='value'>{filmDetail.length}</span>
                    <style jsx>{styles}</style>
                </div>
            );
        }
        return html;
    };

    const renderFilmYearAndLength = () => {
        let html = null;
        if (
            (filmDetail.release_year && filmDetail.release_year !== '0') ||
            filmDetail.length
        ) {
            html = (
                <div className='filmYearAndLength'>
                    {renderFilmYear()}
                    {renderFilmLength()}
                    <style jsx>{styles}</style>
                </div>
            );
        }
        return html;
    };

    const renderFilmDirector = () => {
        let html = null;
        if (filmDetail.director_names) {
            html = (
                <div className='filmActor'>
                    <h4 className='label'>Đạo diễn: </h4>
                    <span className='value'>{filmDetail.director_names}</span>
                    <style jsx>{styles}</style>
                </div>
            );
        }
        return html;
    };

    const renderFilmActor = () => {
        let html = null;
        if (filmDetail.actor_names) {
            html = (
                <div className='filmActor'>
                    <h4 className='label'>Diễn viên: </h4>
                    <span className='value'>{filmDetail.actor_names}</span>
                    <style jsx>{styles}</style>
                </div>
            );
        }
        return html;
    };

    const renderFilmActorAndDirector = () => {
        const html = (
            <div className='filmActorAndDirector'>
                {renderFilmDirector()}
                {renderFilmActor()}
                <style jsx>{styles}</style>
            </div>
        );
        return html;
    };

    /**
     * Bao gồm FilmYear, FilmLength, FilmActor, FilmDirector
     */
    const renderFilmMoreInformation = () => {
        let html = null;
        html = (
            <div className='filmMoreInfo'>
                {renderFilmYearAndLength()}
                {renderFilmActorAndDirector()}
                <style jsx>{styles}</style>
            </div>
        );
        return html;
    };

    const renderFilmTitle = () => {
        let html = null;
        html = (
            <div className='filmTitle'>
                <h1 className='filmTitleBig'>
                    {filmDetail.name || 'Đang cập nhật tiêu đề film'}
                </h1>
                <h3 className='filmTitleSmall'>
                    {filmDetail.name_en || 'Loading title'}
                </h3>
                <style jsx>{styles}</style>
            </div>
        );
        return html;
    };

    const renderFilmProgress = () => {
        let html = null;
        const { length_remain } = filmDetail;
        let { watching_percent } = filmDetail;
        if (watching_percent) {
            watching_percent = `${watching_percent.toString()}%`;
        }
        if (watching_percent && length_remain) {
            html = (
                <div className='filmProgressWrapper'>
                    <div className='filmProgress' title={watching_percent}>
                        <div className='line' />
                        <div
                            className='progress'
                            style={{ width: watching_percent }}
                        />
                    </div>
                    <div className='timeLeft'>
                        Còn lại
                        {` ${length_remain}`}
                    </div>
                    <style jsx>{styles}</style>
                </div>
            );
        }
        return html;
    };

    /**
     * Bao gồm FilmTitle và thanh FilmProgress
     */
    const renderFilmHeader = () => {
        return (
            <div className='filmHeader'>
                {renderFilmTitle()}
                {renderFilmProgress()}
                <style jsx>{styles}</style>
            </div>
        );
    };

    const renderFilmAction = () => {
        return (
            <FilmAction filmDetail={filmDetail} listAllSeason={listAllSeason} />
        );
    };

    const renderFilmDescription = () => {
        let html = null;
        html = (
            <div className='filmShortDescription'>
                {renderDescription(filmDetail.description, 400)}
                <style jsx>{styles}</style>
            </div>
        );
        return html;
    };

    const renderFilmMetaSection = () => {
        let html = null;
        html = (
            <Device>
                {() => {
                    if (isMobileOnly) return <></>;
                    return (
                        <div className='filmMetaWrapper'>
                            {renderFilmMeta()}
                            {renderFilmMoreInformation()}
                            <style jsx>{styles}</style>
                        </div>
                    );
                }}
            </Device>
        );
        return html;
    };

    /**
     * Bao gồm: FilmAction, FilmDescription, FilmMeta, FilmMoreInformation
     */
    const renderFilmDetails = () => {
        let html = null;
        html = (
            <div className='filmDetails'>
                <div className='filmMainInformationWrapper'>
                    {renderFilmAction()}
                    {renderFilmDescription()}
                </div>
                {renderFilmMetaSection()}

                <style jsx>{styles}</style>
            </div>
        );
        return html;
    };

    const renderDownloadApp = () => {
        let html = null;
        html = (
            <Device>
                {() => {
                    if (!isMobileOnly) return <></>;
                    let linkDownloadUrl =
                        'https://play.google.com/store/apps/details?id=vn.sunshinegroup.sunshinetv&hl=vi&gl=US';
                    if (isIOS) {
                        linkDownloadUrl =
                            'https://apps.apple.com/vn/app/sunshine-tv/id1493896361?l=vi';
                    }
                    return (
                        <div className='downloadAppWrapper'>
                            <h3>Xem SunshineTV trên điện thoại</h3>
                            <div className='linkDownload'>
                                <a href={linkDownloadUrl}>
                                    Tải ứng dụng miễn phí
                                </a>
                            </div>
                            <style jsx>{styles}</style>
                        </div>
                    );
                }}
            </Device>
        );
        return html;
    };

    /**
     * Bao gồm FilmHeader, FilmDetails
     */
    const renderFilmInformation = () => {
        return (
            <div className='filmInformation'>
                <div className='rowContainer'>
                    <div className='inner'>
                        {renderFilmHeader()}
                        {renderFilmDetails()}
                        {renderDownloadApp()}
                    </div>
                </div>
                <style jsx>{styles}</style>
            </div>
        );
    };

    const renderFilmFeaturedImage = () => {
        let html = null;
        html = (
            <div className='filmFeaturedImage'>
                <div className='inner'>
                    <img
                        src={
                            filmDetail.landscape_poster_url ||
                            filmDetail.season_landscape_poster_url
                        }
                        alt=''
                    />
                </div>
                <style jsx>{styles}</style>
            </div>
        );
        return html;
    };

    return (
        <div className='filmIntroduce'>
            {renderFilmInformation()}
            {renderFilmFeaturedImage()}
            <style jsx>{styles}</style>
        </div>
    );
}

export default FilmIntroduce;
