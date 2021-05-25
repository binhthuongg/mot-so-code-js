import { mainColor } from '../../constants/theme';
import css from 'styled-jsx/css';

export default css`
    .FilmPlaying {
        display: none;
        &.active {
            position: fixed;
            display: block;
            z-index: 989898989;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: black;
        }
    }
    video {
        width: 100%;
        height: 100%;
    }
    .name {
        position: absolute;
        z-index: 956565;
        left: 20px;
        top: 20px;
        max-width: 75%;
    }
    .close {
        border: none;
        outline: none;
        position: absolute;
        cursor: pointer;
        top: 20px;
        right: 25px;
        background: none;
        width: auto;
        height: auto;
        min-width: 0;
        padding: 0;
        line-height: 1;
        z-index: 98988888;
        img {
            width: 40px;
            @media screen and (max-width: 767px) {
                width: 25px;
            }
        }
    }
`;

export const globalStyles = css.global`
    .ReactModalPortal button {
        position: absolute;
        top: 0;
        right: 0;
        color: white;
        font-size: 20px;
        border: none;
        background: ${mainColor};
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 2px;
        margin: 0;
        cursor: pointer;
    }
    #fb-root {
        display: none !important;
    }
`;
