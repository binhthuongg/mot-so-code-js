import * as LOCAL_STORAGE from '../constants/LocalStorage';
import { actionRefreshToken } from './API/getToken';

export const isClientSide: boolean = typeof window !== 'undefined';
export const isLogin = (): boolean => {
    return (
        isClientSide && localStorage.getItem(LOCAL_STORAGE.USER_TOKEN) !== null
    );
};

/**
 * darken hoặc lighten màu: darken -0.2, lighten +
 * https://www.sitepoint.com/javascript-generate-lighter-darker-color/
 */
export const ColorLuminance = (hex: string, lum: number): string => {
    // validate hex string
    hex = String(hex).replace(/[^0-9a-f]/gi, '');
    if (hex.length < 6) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    lum = lum || 0;

    // convert to decimal and change luminosity
    let rgb = '#';
    let c;
    let i;
    for (i = 0; i < 3; i += 1) {
        c = parseInt(hex.substr(i * 2, 2), 16);
        c = Math.round(Math.min(Math.max(0, c + c * lum), 255)).toString(16);
        rgb += `00${c}`.substr(c.length);
    }

    return rgb;
};

/**
 * đổi màu rgb
 * return {r, g, b}
 * https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const hexToRgb = (hex: string): any => {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, (m, r, g, b) => {
        return r + r + g + g + b + b;
    });

    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? {
              r: parseInt(result[1], 16),
              g: parseInt(result[2], 16),
              b: parseInt(result[3], 16),
          }
        : null;
};

/**
 * cắt chuỗi thành số ký tự
 * link: https://stackoverflow.com/questions/5454235/shorten-string-without-cutting-words-in-javascript
 */
export const renderTextByNumberCharacter = (
    text: string,
    numberCharacter: number,
    separator = ' ',
): string => {
    if (text.length <= numberCharacter) return text;
    return `${text.substr(
        0,
        text.lastIndexOf(separator, numberCharacter),
    )} ... `;
};

/**
 * xử lý Refresh Token
 */
export const handleRefreshToken = (errorStatus: number): void => {
    if (errorStatus === 401) {
        actionRefreshToken();
    }
};
