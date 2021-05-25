import React, { useEffect, useState } from 'react';
import { FilmModel, MovieSeasonModel } from '../../../models/FilmModel';
import FilmEpisode from '../FilmEpisode';
import styles from './styles';

type PropType = {
    filmDetail: FilmModel;
    listAllSeason?: MovieSeasonModel[];
};
function FilmOtherPart(props: PropType): React.ReactElement {
    const { listAllSeason, filmDetail } = props;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const listMovieEpisode: any = [];
    const [selectedIndexSeason, setSelectedIndexSeason] = useState(0);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const renderListMovieEpisode = (listMovieEpisode: any) => {
        if (listAllSeason) {
            listMovieEpisode =
                listAllSeason[selectedIndexSeason].listSeasonEpisode;
        }
        if (listMovieEpisode && listMovieEpisode.length) {
            return <FilmEpisode listMovieEpisode={listMovieEpisode} />;
        }
    };
    const fetchListEpisode = () => {
        if (listAllSeason) {
            const index = listAllSeason.findIndex((singleOtherPart) => {
                return singleOtherPart.season_id === filmDetail.season_last_id;
            });
            if (index > -1) {
                setSelectedIndexSeason(index);
            }
        }
    };
    useEffect(() => {
        fetchListEpisode();
    }, []);

    const renderClassActive = (season_id: string) => {
        let result = '';
        if (
            listAllSeason &&
            season_id === listAllSeason[selectedIndexSeason].season_id
        ) {
            result = 'active';
        }
        return result;
    };

    const changeSelectIndexSeason = (season_id: string) => {
        if (listAllSeason) {
            const index = listAllSeason.findIndex((singleOtherPart) => {
                return singleOtherPart.season_id === season_id;
            });
            if (index > -1 && index !== selectedIndexSeason) {
                setSelectedIndexSeason(index);
            }
        }
    };

    const renderListOtherPart = (listAllSeason: MovieSeasonModel[]) => {
        let html = null;
        html = listAllSeason.map((singleOtherPart, index) => {
            return (
                <li
                    key={index}
                    className={renderClassActive(singleOtherPart.season_id)}
                    onClick={() => {
                        changeSelectIndexSeason(singleOtherPart.season_id);
                    }}
                >
                    <div className='item'>
                        <img
                            src={
                                singleOtherPart.season_landscape_poster_url ||
                                '#'
                            }
                            alt='Các phần khác'
                            className='image'
                        />
                        <h4 className='name'>{singleOtherPart.name}</h4>
                    </div>
                    <style jsx>{styles}</style>
                </li>
            );
        });
        return html;
    };
    const render = () => {
        if (!listAllSeason || listAllSeason.length < 1) {
            return;
        }
        return (
            <div className='FilmOtherPartWrapper'>
                {renderListMovieEpisode(listMovieEpisode)}
                <h3 className='title'>Các phần khác</h3>
                <ul className='listAllSeason'>
                    {renderListOtherPart(listAllSeason)}
                </ul>
                <style jsx>{styles}</style>
            </div>
        );
    };
    return <>{render()}</>;
}

export default FilmOtherPart;
