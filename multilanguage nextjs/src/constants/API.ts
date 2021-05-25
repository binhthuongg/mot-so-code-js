/**
 * Url SunshineTv
 */
export const API_SUNSHINETV_BASE_URL =
    'https://apisunshinetv.sunshinegroup.vn/api/v1/sunshinetv';

/**
 * Url Sunshine Authentication
 */
export const API_SUNSHINE_AUTHENTICATION_URL =
    'https://api.sunshinegroup.vn:5000';

export const headerBaseAuthenticateForGetStaticPaths = (
    tokenForExport: string,
): Record<string, unknown> => {
    return {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tokenForExport}`,
    };
};

export const headerBaseAuthenticate = (): Record<string, unknown> => {
    return {
        Authorization:
            'Basic bW9iaWxlX3N1bnNoaW5ldHZfYXBwX3Byb2Q6RldTdVlOWHluY2VjZDgyeA==',
        'Content-Type': 'application/x-www-form-urlencoded',
    };
};

export const scopeClient = 'api_sstv_service';
export const scopeUser = 'offline_access api_sstv_service';

/**
 * Code activeSet
 */
export const DEFAULT_CODE_ACTIVE = '123456';
