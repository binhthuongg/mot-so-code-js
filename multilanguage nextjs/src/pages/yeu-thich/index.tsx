import React, { useEffect, useState } from 'react';
import { movieApi } from '../../commons/API/movieApi';
import FilmList from '../../components/Film/FilmList';
import LayoutNoSidebar from '../../layouts/LayoutNoSidebar';
import { ComponentLayout } from '../../models/ComponentModel';
import { FilmModel } from '../../models/FilmModel';
import styles from '../../styles/yeu-thich/styles';

type ListFavouriteMoveType = FilmModel[];

const YeuThich: ComponentLayout = () => {
    const [
        listFavoriteMovie,
        setListFavoriteMovie,
    ] = useState<ListFavouriteMoveType>([]);
    const fetchData = async () => {
        try {
            await movieApi
                .getMoviePage({ is_favourite: true })
                .then((response) => {
                    // console.log('response', response);
                    setListFavoriteMovie(response.data.data);
                })
                .catch((error) => {
                    // eslint-disable-next-line no-console
                    console.log('error', error);
                });
        } catch (error) {
            return '';
        }
    };
    useEffect(() => {
        fetchData();
    }, []);
    return (
        <div className='YeuThichWrapper'>
            <div className='rowContainer'>
                <FilmList
                    title='Danh sách phim yêu thích'
                    listMovie={listFavoriteMovie}
                />
            </div>
            <style jsx>{styles}</style>
        </div>
    );
};

YeuThich.Layout = LayoutNoSidebar;

export default YeuThich;
