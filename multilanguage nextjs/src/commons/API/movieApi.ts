import axios, { AxiosResponse } from 'axios';
import * as LOCAL_STORAGE from '../../constants/LocalStorage';
import instanceRequestSunshineTv from './axiosInstanceRequestSunshineTv';
import instanceUserSunshineTv from './axiosInstanceUserSunshineTv';

const userToken =
    typeof window !== 'undefined'
        ? localStorage.getItem(LOCAL_STORAGE.USER_TOKEN)
        : null;
const headerBaseAuthenticate = () => {
    return {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`,
    };
};
export const movieApi = {
    getAllMoviesGenres: (
        movie_type_id: string,
        moreParams: Record<string, unknown> = {},
    ): Promise<AxiosResponse> => {
        const url = '/GetMovieGenres';
        const params = {
            movie_type_id,
            ...moreParams,
        };
        return instanceUserSunshineTv.get(url, { params });
    },

    getMoviesByGenreId: (
        genreId?: string,
        moreParams: Record<string, unknown> = {},
    ): Promise<AxiosResponse> => {
        const url = '/GetMoviesBy';
        const params = {
            movie_genres_id: genreId,
            ...moreParams,
        };
        return instanceUserSunshineTv.get(url, { params });
    },

    getMoviesByGenreIdAndTypeId: (
        movie_genres_id: string,
        movie_type_id: string,
        moreParams: Record<string, unknown> = {},
    ): Promise<AxiosResponse> => {
        const url = '/GetMoviesBy';
        const params = {
            movie_genres_id,
            movie_type_id,
            ...moreParams,
        };
        return instanceUserSunshineTv.get(url, { params });
    },

    getMoviePage: (
        mainParams: Record<string, unknown> = {},
        moreParams: Record<string, unknown> = {
            offSet: 0,
            pageSize: 20,
        },
    ): Promise<AxiosResponse> => {
        const url = '/GetMoviePage';
        const params = {
            ...mainParams,
            ...moreParams,
        };
        return instanceUserSunshineTv.get(url, { params });
    },

    getDetailMovieById: (
        movieID: string | string[],
        moreParams: Record<string, unknown> = {},
    ): Promise<AxiosResponse> => {
        const url = '/GetMovieDetail';
        const params = {
            movie_id: movieID,
            ...moreParams,
        };
        return instanceUserSunshineTv.get(url, { params });
    },

    getMoviesBySearchTitle: (
        searchText: string,
        moreParams: Record<string, unknown> = {
            offSet: 0,
            pageSize: 20,
        },
    ): Promise<AxiosResponse> => {
        const url = '/GetMoviePage';
        const params = {
            filter: searchText,
            ...moreParams,
        };
        return instanceUserSunshineTv.get(url, { params });
    },

    getMovieSeaSonByMovieId: (
        movieID: string | string[],
        moreParams: Record<string, unknown> = {},
    ): Promise<AxiosResponse> => {
        const url = '/GetMovieSeaSonByMovieId';
        const params = {
            movie_id: movieID,
            ...moreParams,
        };
        return instanceUserSunshineTv.get(url, { params });
    },

    getMovieEpisodeBySeason: (
        movie_season_id: string | string[],
        moreParams: Record<string, unknown> = {},
        env = 'android',
    ): Promise<AxiosResponse> => {
        const url = '/GetMovieEspiodeBySeason';
        const params = {
            movie_season_id,
            env,
            ...moreParams,
        };
        return instanceUserSunshineTv.get(url, { params });
    },

    movieFavoriteSet: (
        movie_id: string | undefined,
    ): Promise<AxiosResponse> => {
        return axios({
            method: 'post',
            url:
                'https://apisunshinetv.sunshinegroup.vn/api/v1/sunshinetv/MovieFavoriteSet',
            headers: headerBaseAuthenticate(),
            data: {
                movie_id,
            },
        });
    },

    movieWatchingSet: (
        movie_id: string | undefined,
        watching_point: number,
        movie_season_espisode_id?: string,
    ): Promise<AxiosResponse> => {
        const params = movie_season_espisode_id
            ? {
                  movie_id,
                  watching_point: Math.ceil(watching_point),
                  movie_season_espisode_id,
              }
            : {
                  movie_id,
                  watching_point: Math.ceil(watching_point),
              };
        // return instanceUserSunshineTv.post(url, params);

        return axios({
            method: 'post',
            url:
                'https://apisunshinetv.sunshinegroup.vn/api/v1/sunshinetv/MovieWatchingSet',
            headers: headerBaseAuthenticate(),
            data: params,
        });
    },

    getTvLives: (
        env = 'android',
        moreParams?: Record<string, unknown>,
    ): Promise<AxiosResponse> => {
        const url = '/GetLives';
        const params = {
            env,
            ...moreParams,
        };
        return instanceUserSunshineTv.get(url, { params });
    },

    setUserRegister: (phoneNumber: string): Promise<AxiosResponse> => {
        const url = '/SetUserRegister';
        const params = {
            phone: phoneNumber,
            loginType: 0,
            // tokenLogin: localStorage.getItem('access_token'),
            // phoneF: '11',
            // userType: 0,
        };
        return instanceRequestSunshineTv.post(url, params);
    },

    setVerificationCode: (
        loginName: string,
        verificationCode: string,
        tokenType = 0,
    ): Promise<AxiosResponse> => {
        const url = '/setVerificationCode';
        const params = {
            loginName,
            verificationCode,
            tokenType,
            // tokenLogin: localStorage.getItem('access_token'),
            // phoneF: '11',
            // userType: 0,
        };
        return instanceRequestSunshineTv.put(url, params);
    },

    getSunshineVideoList: (): Promise<AxiosResponse> => {
        const url = '/GetSunshineVideoList';
        return instanceUserSunshineTv.get(url);
    },

    getMovieTypes: (): Promise<AxiosResponse> => {
        const url = '/GetMovieTypes';
        return instanceUserSunshineTv.get(url);
    },
};
