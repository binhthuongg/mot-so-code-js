import axios from 'axios';
import queryString from 'query-string';
import * as CONSTANTS from '../../constants/API';
import * as LOCAL_STORAGE from '../../constants/LocalStorage';
import { isClientSide } from '../utils';
import { actionRefreshToken } from './getToken';

/**
 * Set up default config for http requests here
 * Please have a look at here: https://github.com/axios/axios#request- config for the full list of configs
 */
const instanceUserSunshineTv = axios.create({
    baseURL: CONSTANTS.API_SUNSHINETV_BASE_URL,
    paramsSerializer: (params) => queryString.stringify(params),
    headers: {
        Authorization:
            'Basic bW9iaWxlX3N1bnNoaW5ldHZfYXBwX3Byb2Q6RldTdVlOWHluY2VjZDgyeA==',
        'Content-Type': 'application/x-www-form-urlencoded',
    },
});

instanceUserSunshineTv.interceptors.request.use(async (config) => {
    // Handle token here ...
    const getToken = () => {
        if (isClientSide) {
            return localStorage.getItem(LOCAL_STORAGE.USER_TOKEN);
        }
    };
    const token = getToken();
    if (token) {
        config.headers = {
            Authorization: `Bearer ${token}`,
        };
    }

    return config;
});

instanceUserSunshineTv.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // console.log('error', error);
        // console.log('error.response', error.response);
        if (error.response && error.response.status === 401) {
            actionRefreshToken()
                .then((response) => {
                    // eslint-disable-next-line no-console
                    console.log('responseRefresh', response);
                })
                .catch((error) => {
                    // eslint-disable-next-line no-console
                    console.log('errorRefresh', error);
                });
            // return false;
        }
        // return Promise.reject(error);
    },
);

export default instanceUserSunshineTv;
