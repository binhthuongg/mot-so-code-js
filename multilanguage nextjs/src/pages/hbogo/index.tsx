import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { movieApi } from '../../commons/API/movieApi';
import FilmIntroduce from '../../components/Film/FilmIntroduce';
import { MOVIE_DEFAULT_ID } from '../../constants/Movie';
import LayoutChanel from '../../layouts/LayoutChanel/LayoutChanel';
import { ComponentLayout } from '../../models/ComponentModel';

type PropType = {
    // eslint-disable-next-line react/no-unused-prop-types
    children?: React.ReactNode;
};
const HBOGo: ComponentLayout<PropType> = () => {
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
                <title>HBO</title>
            </Head>
            <FilmIntroduce filmDetail={filmDetail} />
        </div>
    );
};

// export const getStaticProps = async (): Promise<Record<string, unknown>> => {
//     const id = 'b9acc786-f400-4f9e-8bf8-23a17f93e068';
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

HBOGo.Layout = LayoutChanel;

export default HBOGo;
