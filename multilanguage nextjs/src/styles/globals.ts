import css from 'styled-jsx/css';
import iconBack from '../../public/images/icon-back.svg';
import iconNext from '../../public/images/icon-next.svg';
import { ColorLuminance } from '../commons/utils';
import {
    backgroundColor,
    fontSize,
    mainColor,
    scrollBarColor,
    scrollbarRadius,
    scrollBarThumb,
    scrollBarThumbHover,
    scrollbarWidth,
    textColor,
    secondaryColor,
} from '../constants/theme';

export default css.global`
    body {
        font-family: Roboto, Arial, Helvetica, sans-serif;
        font-weight: normal;
        background-color: ${backgroundColor};
        color: ${textColor};
        font-size: ${fontSize};
        line-height: 1.55;
        @media screen and (max-width: 767px) {
            font-size: 15px;
        }
    }
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        outline: none;
        -webkit-overflow-scrolling: touch;
    }
    ul {
        list-style: none;
    }
    a {
        text-decoration: none;
    }
    .button {
        border: none;
        background: ${secondaryColor};
        outline: none;
        height: 45px;
        line-height: 45px;
        padding: 0 20px;
        white-space: nowrap;
        text-align: center;
        min-width: 135px;
        font-size: 18px;
        cursor: pointer;
        border-radius: 4px;
        color: #fff;
        &:hover {
            color: #fff;
            background: ${ColorLuminance(secondaryColor, -0.2)};
            a {
                color: #fff;
            }
        }
        @media screen and (max-width: 767px) {
            height: 40px;
            line-height: 40px;
            min-width: 86px;
            padding: 0 15px;
            font-size: 14px;
        }
        a {
            color: inherit;
        }
    }
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        font-weight: normal;
    }
    h1 {
        font-size: 2em;
    }
    h2 {
        font-size: 1.45em;
    }
    img {
        display: inline-block;
        vertical-align: top;
        max-width: 100%;
    }
    * {
        scrollbar-color: ${`${scrollBarThumb} ${scrollBarColor}`};
        scrollbar-width: thin;
    }
    a {
        color: ${textColor};
        transition: 0.3s ease;
        &:hover {
            color: ${mainColor};
        }
    }
    ::-webkit-scrollbar {
        width: ${scrollbarWidth};
    }
    ::-webkit-scrollbar-track,
    ::-webkit-scrollbar-thumb {
        background: ${scrollBarColor};
    }
    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: ${scrollBarThumb};
        border-radius: ${scrollbarRadius};
    }
    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
        background: ${scrollBarThumbHover};
    }
    /* slider */
    .slick-list {
        margin-left: -15px;
        margin-right: -15px;
        .slick-slide {
            padding-left: 15px;
            padding-right: 15px;
        }
    }
    /* Swiper */
    .swiper-container-horizontal {
        > .swiper-scrollbar {
            height: 8px !important;
            background: #4e4e4e;
            border-radius: 5px;
            bottom: 0;
            position: absolute;
        }
        .swiper-scrollbar-drag {
            background: #c4c4c4;
            border-radius: 5px;
            min-width: 50px !important;
        }
    }
    .swiperNavigationButton {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        z-index: 989;
        background: rgba(0, 0, 0, 0.4);
        width: 107px;
        height: 107px;
        cursor: pointer;
        @media screen and (max-width: 1799px) {
            width: 90px;
            height: 90px;
        }
        @media screen and (max-width: 1499px) {
            width: 70px;
            height: 70px;
        }
        &:before {
            content: '';
            display: block;
            width: 48px;
            height: 83px;
            position: absolute;
            z-index: 1;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            @media screen and (max-width: 1799px) {
                transform: translate(-50%, -50%) scale(0.7);
            }
            @media screen and (max-width: 1499px) {
                transform: translate(-50%, -50%) scale(0.5);
            }
        }
        &.swiper-button-disabled {
            cursor: auto;
            opacity: 0;
        }
        &.swiperButtonPrev {
            left: 0;
            transform: translate(-100%, -50%);
            &::before {
                background: url(${iconBack}) center center no-repeat;
            }
        }
        &.swiperButtonNext {
            right: 0;
            transform: translate(100%, -50%);
            &::before {
                background: url(${iconNext}) center center no-repeat;
            }
        }
    }
    .swiperPagination {
        margin-top: 20px;
        text-align: center;
        .swiper-pagination-bullet {
            width: 10px;
            height: 10px;
            background: #c4c4c4;
            margin: 0 5px !important;
            border-radius: 100%;
            opacity: 1;
            transition: 0.3s ease;
            &.swiper-pagination-bullet-active {
                background: ${mainColor};
            }
        }
    }
    // layout
    .rowContainer {
        padding-left: 8.5%;
        padding-right: 8.5%;
        width: 100%;
        @media screen and (max-width: 1499px) {
            padding-left: 6%;
            padding-right: 6%;
        }
        @media screen and (max-width: 991px) {
            padding-left: 25px;
            padding-right: 25px;
        }
        @media screen and (max-width: 767px) {
            padding-left: 20px;
            padding-right: 20px;
        }
    }
    .pageTitle {
        font-size: 30px;
        margin-bottom: 30px;
    }
    .mobilePageTitle {
        padding: 15px 0;
        text-align: center;
        font-size: 15px;
        background: #1a1e2d;
    }
    // Modal
    .ReactModal__Content {
        max-width: 80%;
        @media screen and (max-width: 767px) {
            padding: 25px !important;
        }
    }
    .ReactModalPortal {
        text-align: center;
        display: block;
        .listButtons {
            margin-top: 30px;
            @media screen and (max-width: 767px) {
                margin-top: 20px;
            }
        }
        button {
            margin: 5px 10px;
        }
    }
    canvas {
        max-width: 100%;
        height: auto !important;
    }
    .homeWrapper {
        &.activePlaying {
            /* position: fixed;
            z-index: 9898989898;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            background: #090809; */
        }
    }
`;
