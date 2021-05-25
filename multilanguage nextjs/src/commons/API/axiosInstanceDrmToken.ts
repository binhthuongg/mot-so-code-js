import axios from 'axios';
import queryString from 'query-string';
import * as CONSTANTS from '../../constants/API';
import * as LOCAL_STORAGE from '../../constants/LocalStorage';
import { isClientSide } from '../utils';

/**
 * Set up default config for http requests here
 * Please have a look at here: https://github.com/axios/axios#request- config for the full list of configs
 */
const instanceDrmToken = axios.create({
    baseURL: CONSTANTS.API_SUNSHINETV_BASE_URL,
    paramsSerializer: (params) => queryString.stringify(params),
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    },
});

instanceDrmToken.interceptors.request.use(async (config) => {
    // Handle token here ...
    const token = isClientSide
        ? localStorage.getItem(LOCAL_STORAGE.USER_TOKEN)
        : null;
    // console.log('token25', token);
    // const token =
    //     'eyJhbGciOiJSUzI1NiIsImtpZCI6Ijc1QUY4OTQxQkEwQTFCNzA3RTMxQjk4QjJBMURDMENEQkZBRDQ5RTQiLCJ0eXAiOiJhdCtqd3QiLCJ4NXQiOiJkYS1KUWJvS0czQi1NYm1MS2gzQXpiLXRTZVEifQ.eyJuYmYiOjE2MTA5NTkyNTQsImV4cCI6MTYxMDk2Mjg1NCwiaXNzIjoiaHR0cHM6Ly9hcGkuc3Vuc2hpbmVncm91cC52bjo1MDAwIiwiYXVkIjoiYXBpX3NzdHZfc2VydmljZSIsImNsaWVudF9pZCI6Im1vYmlsZV9zdW5zaGluZXR2X2FwcF9wcm9kIiwic2NvcGUiOlsiYXBpX3NzdHZfc2VydmljZSJdfQ.SxTbiLNI8h4ZfjS_VOjVVJ1h4VVMSKTSopyx4_x1-mnPZbgGJ8tESO6N5LqopKCysuqUlpWNSly5mk1uv73lWOfzzKEDzayrME18UctQGMoD5S9VUCoxWRaFeSaHUPhO43v7xQ1i7XxU2FCZa0jL8hJbOkdwXt_ED4SKzCyvxgL2756s1h7c-kI3GVwIExeQScwcjCUv01iQ3yiFIshH87shxab_TEbU1EztdKfZNpSKrTg8UNR2TFG6989p5KkHfr47CvtKTBGv50GOCn9FzWSzTB-C04uhUQKEm6XsYdhq69LjcvkG70cq-EgH0hVcglxGkTAs7XWsMoOzokH5Qg';
    if (token) {
        // console.log('token22', token);
        config.headers = {
            Authorization: `Bearer ${token}`,
        };
    }

    return config;
});

instanceDrmToken.interceptors.response.use(
    (response) => {
        if (response && response.data) {
            return response.data;
        }
        return response;
    },
    (error) => {
        // Handle errors
        throw error;
    },
);

export default instanceDrmToken;
