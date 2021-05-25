import axios from 'axios';
import queryString from 'query-string';
import * as CONSTANTS from '../../constants/API';
import * as LOCAL_STORAGE from '../../constants/LocalStorage';
import { isClientSide } from '../utils';
import { actionRefreshToken } from './getToken';

// Set up default config for http requests here
// Please have a look at here `https://github.com/axios/axios#request- config` for the full list of configs

const instance = axios.create({
    baseURL: CONSTANTS.API_SUNSHINETV_BASE_URL,
    paramsSerializer: (params) => queryString.stringify(params),
    headers: {
        Authorization:
            'Basic bW9iaWxlX3N1bnNoaW5ldHZfYXBwX3Byb2Q6RldTdVlOWHluY2VjZDgyeA==',
        'Content-Type': 'application/x-www-form-urlencoded',
    },
});

instance.interceptors.request.use(async (config) => {
    // Handle token here ...
    const token = isClientSide
        ? localStorage.getItem(LOCAL_STORAGE.USER_TOKEN)
        : null;
    if (token) {
        config.headers = {
            Authorization: `Bearer ${token}`,
        };
    }

    return config;
});

instance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // eslint-disable-next-line no-console
        console.log('error', error);
        if (error.response && error.response.status === 401) {
            actionRefreshToken();
        }
    },
);

export default instance;
