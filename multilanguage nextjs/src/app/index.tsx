import React, { useEffect, useState } from 'react';
import FilmIntroduce from '../components/Film/FilmIntroduce';
import { movieApi } from '../commons/API/movieApi';
import { MOVIE_DEFAULT_ID } from '../constants/Movie';
// import './styles.scss';

function App(): React.ReactElement {
    const id = MOVIE_DEFAULT_ID;
    const [filmDetail, setFilmDetail] = useState({});
    const fetchData = async () => {
        try {
            const filmDetailFromAPI = await movieApi.getDetailMovieById(id);
            setFilmDetail(filmDetailFromAPI.data);
        } catch (error) {
            return '';
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className='appWrapper'>
            {/* {renderLayoutProfile(LAYOUT_PROFILE_ROUTE)} */}
            {/* {renderLayoutMain(LAYOUT_MAIN_ROUTE)} */}
            {/* {renderLayoutNoSidebar(LAYOUT_NO_SIDEBAR_ROUTE)} */}
            {/* {renderLayoutChanel(LAYOUT_CHANEL_ROUTE)} */}
            <FilmIntroduce filmDetail={filmDetail} />
        </div>
    );
}
export default App;
