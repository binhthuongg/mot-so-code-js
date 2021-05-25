import axios, { AxiosResponse } from 'axios';
import queryString from 'query-string';
import * as CONSTANTS_API from '../../constants/API';
import * as LOCAL_STORAGE from '../../constants/LocalStorage';
import { isClientSide } from '../utils';
import instanceUserSunshineTv from './axiosInstanceUserSunshineTv';

type responseType = AxiosResponse<Record<string, string>>;
const handleTokenResponse = (
    response: responseType,
    isRequestTokenStep = false,
): string => {
    const refreshToken = response.data.refresh_token;
    if (isRequestTokenStep) {
        const requestToken = response.data.access_token;
        if (requestToken) {
            localStorage.setItem(LOCAL_STORAGE.REQUEST_TOKEN, requestToken);
        }
    } else {
        const userToken = response.data.access_token;
        if (userToken) {
            localStorage.setItem(LOCAL_STORAGE.USER_TOKEN, userToken);
        }
    }
    if (refreshToken) {
        localStorage.setItem(LOCAL_STORAGE.REFRESH_TOKEN, refreshToken);
    }
    return '';
};
export const clientSignIn = async (): Promise<string | null> => {
    const response = await axios({
        method: 'post',
        url: `${CONSTANTS_API.API_SUNSHINE_AUTHENTICATION_URL}/connect/token`,
        headers: CONSTANTS_API.headerBaseAuthenticate(),
        data: queryString.stringify({
            scope: CONSTANTS_API.scopeClient,
            grant_type: 'client_credentials',
        }),
    });
    return handleTokenResponse(response, true);
};

export const userSignIn = async (
    username: string,
    password: string,
): Promise<string | null> => {
    try {
        const response = await axios({
            method: 'post',
            url: `${CONSTANTS_API.API_SUNSHINE_AUTHENTICATION_URL}/connect/token`,
            headers: CONSTANTS_API.headerBaseAuthenticate(),
            data: queryString.stringify({
                username,
                password,
                scope: CONSTANTS_API.scopeUser,
                grant_type: 'password',
            }),
        });
        return handleTokenResponse(response, false);
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log('error', error);
        return null;
    }
};

export const getToken = (): void => {
    if (!localStorage.getItem(LOCAL_STORAGE.REFRESH_TOKEN)) return;
    clientSignIn()
        .then(() => {
            const url = `${CONSTANTS_API.API_SUNSHINE_AUTHENTICATION_URL}/connect/token`;
            return instanceUserSunshineTv.post(
                url,
                queryString.stringify({
                    scope: CONSTANTS_API.scopeClient,
                    grant_type: 'client_credentials',
                }),
            );
        })
        .catch((error) => {
            // eslint-disable-next-line no-console
            console.log('error', error);
        });
};

// export const actionRefreshToken = (): void => {
//     if (!localStorage.getItem(LOCAL_STORAGE.USER_TOKEN)) return;
//     const refreshToken = isClientSide
//         ? localStorage.getItem(LOCAL_STORAGE.REFRESH_TOKEN)
//         : '';
//     clientSignIn()
//         .then(() => {
//             const url = `${base_auth}/connect/token`;
//             return instanceUserSunshineTv.post(
//                 url,
//                 queryString.stringify({
//                     refresh_token: refreshToken,
//                     scope: scopeUser,
//                     grant_type: 'refresh_token',
//                 }),
//             );
//         })
//         .catch((error) => {
//             console.log('error', error);
//         });
// };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const actionRefreshToken = async (): Promise<string> => {
    if (!localStorage.getItem(LOCAL_STORAGE.USER_TOKEN)) return '';
    const refreshToken = isClientSide
        ? localStorage.getItem(LOCAL_STORAGE.REFRESH_TOKEN)
        : '';
    try {
        const response = await axios({
            method: 'post',
            url: `${CONSTANTS_API.API_SUNSHINE_AUTHENTICATION_URL}/connect/token`,
            headers: CONSTANTS_API.headerBaseAuthenticate(),
            data: queryString.stringify({
                refresh_token: refreshToken,
                scope: CONSTANTS_API.scopeUser,
                grant_type: 'refresh_token',
            }),
        });
        // eslint-disable-next-line no-console
        console.log('response', response);
        return handleTokenResponse(response, false);
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log('error', error);
        return '';
    }
};
