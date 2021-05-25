import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { movieApi } from '../../../commons/API/movieApi';
import FilmIntroduce from '../../../components/Film/FilmIntroduce';
import { MOVIE_DEFAULT_ID } from '../../../constants/Movie';
import LayoutChanel from '../../../layouts/LayoutChanel/LayoutChanel';
import { ComponentLayout } from '../../../models/ComponentModel';

const HBOGoChauA: ComponentLayout = () => {
    const [filmDetail, setFilmDetail] = useState({});
    const id = MOVIE_DEFAULT_ID;
    const fetchData = async () => {
        try {
            const response = await movieApi.getDetailMovieById(id);
            setFilmDetail(response.data);
        } catch (error) {
            return '';
        }
    };
    useEffect(() => {
        fetchData();
    }, []);
    return (
        <div className='HBOWrapper'>
            <Head>
                <title>Châu Á HBO</title>
            </Head>
            <FilmIntroduce filmDetail={filmDetail} />
            {/* <FilmCategory /> */}
        </div>
    );
};

// export const getStaticProps = async (): Promise<Record<string, unknown>> => {
//     const id = MOVIE_DEFAULT_ID;
//     const res = await movieApi.getDetailMovieById(id);
//     const filmDetail: FilmModel[] = await res.data;

//     const listFilmGenres = [];
//     try {
//         const listGenres = await movieApi.getAllMoviesGenres();
//         // console.log('listGenres', listGenres);
//         for (const singleGenre of listGenres.data) {
//             // console.log('singleGenre.id', singleGenre.id);
//             const movies = await movieApi.getMoviesByGenreId(singleGenre.id);
//             // console.log('movies', movies);
//             singleGenre.listMovies = movies.data;
//             listFilmGenres.push(singleGenre);
//         }
//     } catch (error) {
//         return {};
//     }

//     return {
//         props: {
//             filmDetail,
//             listFilmGenres,
//         },
//     };
// };

HBOGoChauA.Layout = LayoutChanel;

export default HBOGoChauA;
