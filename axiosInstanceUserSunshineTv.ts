import axios from 'axios';
import queryString from 'query-string';
import * as CONSTANTS_API from '../../constants/API';
import * as LOCAL_STORAGE from '../../constants/LocalStorage';
import { isClientSide } from '../utils';

// Set up default config for http requests here
// Please have a look at here `https://github.com/axios/axios#request- config` for the full list of configs

// https://gist.github.com/Godofbrowser/bf118322301af3fc334437c683887c5f

// for multiple requests
let isRefreshing = false;
let failedQueue: any = [];

const processQueue = (error: any, token = null) => {
    failedQueue.forEach((prom: any) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });

    failedQueue = [];
};

const instanceUserSunshineTv = axios.create({
    baseURL: CONSTANTS_API.API_SUNSHINETV_BASE_URL,
    paramsSerializer: (params) => queryString.stringify(params),
    headers: CONSTANTS_API.headerBaseAuthenticate(),
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
        const originalRequest = error.config;

        if (
            error.response &&
            error.response.status === 401 &&
            !originalRequest.retry
        ) {
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then((token) => {
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                        return axios(originalRequest);
                    })
                    .catch((err) => {
                        return Promise.reject(err);
                    });
            }

            originalRequest.retry = true;
            isRefreshing = true;

            const refreshToken = window.localStorage.getItem(
                LOCAL_STORAGE.REFRESH_TOKEN,
            );
            const scopeUser = 'offline_access api_sstv_service';
            return new Promise((resolve, reject) => {
                axios
                    .post(
                        `${CONSTANTS_API.API_SUNSHINE_AUTHENTICATION_URL}/connect/token`,
                        queryString.stringify({
                            refresh_token: refreshToken,
                            scope: scopeUser,
                            grant_type: 'refresh_token',
                        }),
                        { headers: CONSTANTS_API.headerBaseAuthenticate() },
                    )
                    .then(({ data }) => {
                        console.log('data', data);
                        window.localStorage.setItem(
                            LOCAL_STORAGE.USER_TOKEN,
                            data.access_token,
                        );
                        window.localStorage.setItem(
                            LOCAL_STORAGE.REFRESH_TOKEN,
                            data.refresh_token,
                        );
                        axios.defaults.headers.common.Authorization = `Bearer ${data.access_token}`;
                        originalRequest.headers.Authorization = `Bearer ${data.access_token}`;
                        processQueue(null, data.access_token);
                        resolve(axios(originalRequest));
                    })
                    .catch((err) => {
                        processQueue(err, null);
                        reject(err);
                    })
                    .finally(() => {
                        isRefreshing = false;
                    });
            });
        }

        return Promise.reject(error);
    },
);

export default instanceUserSunshineTv;
