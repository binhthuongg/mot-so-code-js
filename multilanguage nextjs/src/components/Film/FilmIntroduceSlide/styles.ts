import { mainColor } from '../../../constants/theme';
import css from 'styled-jsx/css';

export default css`
    .FilmIntroduceSlide {
        position: relative;
        overflow: hidden;
        &::before {
            content: '';
            display: block;
            position: absolute;
            z-index: 1;
            pointer-events: none;
            left: 0;
            bottom: -5px;
            right: 0;
            height: 250px;
            max-height: 40%;
            background: linear-gradient(
                180deg,
                #000000 17.71%,
                rgba(0, 0, 0, 0) 100%
            );
            transform: rotate(-180deg);
            -webkit-font-smoothing: subpixel-antialiased;
            backface-visibility: hidden;
        }
        &.isMobileOnly {
            .content {
                display: block;
            }
            .filmTitle,
            .filmFeaturedImage {
                a {
                    pointer-events: none;
                    &:hover {
                        color: white;
                    }
                }
            }
            .filmTitle {
                &:hover {
                    a {
                        color: white;
                    }
                }
            }
        }
    }

    .filmAgeRate {
        position: absolute;
        top: 18px;
        left: 20px;
        width: 38px;
        height: 38px;
        border-radius: 100%;
        background: ${mainColor};
        color: white;
        font-size: 15px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .filmInformation {
        position: absolute;
        z-index: 2;
        left: 0;
        right: 0;
        bottom: 65px;
        padding: 0 20px;
        .rowContainer {
            @media screen and (min-width: 992px) {
                padding: 0;
            }
        }
        .content {
            display: flex;
            align-items: flex-end;
            justify-content: space-between;
        }
        @media screen and (max-width: 767px) {
            display: block;
            padding: 30px 0;
            bottom: 0;
        }
    }
    .filmTitle {
        font-size: 20px;
        max-width: 65%;
        position: relative;
        cursor: pointer;
        line-height: 1.15;
        @media screen and (max-width: 767px) {
            width: 100%;
            max-width: 100%;
            text-align: center;
        }
        &:hover {
            h1,
            h3 {
                color: ${mainColor};
            }
        }
        .link {
            position: absolute;
            z-index: 989;
            display: block;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            font-size: 0;
        }
        .filmTitleBig {
            font-size: 40px;
            @media screen and (max-width: 1499px) {
                font-size: 30px;
            }
            @media screen and (max-width: 1299px) {
                font-size: 25px;
            }
            @media screen and (max-width: 767px) {
                font-size: 25px;
            }
            @media screen and (max-width: 350px) {
                font-size: 22px;
            }
        }
        .filmTitleSmall {
            margin-top: 10px;
            font-size: 20px;
            @media screen and (max-width: 1299px) {
                font-size: 18px;
            }
            @media screen and (max-width: 767px) {
                font-size: 16px;
            }
        }
    }
    .filmFeaturedImage {
        width: 100%;
        outline: none;
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
    .buttonWrapper {
        display: flex;
        align-items: center;
        min-width: 215px;
        margin-left: 35px;
        justify-content: flex-end;
        @media screen and (max-width: 991px) {
            margin: 0;
        }
        .singleButton {
            background: #ffffff;
            border-radius: 5px;
            border: none;
            outline: none;
            font-size: 15px;
            height: 32px;
            line-height: 32px;
            padding: 0 12px;
            white-space: nowrap;
            margin: 5px 9px;
            @media screen and (max-width: 1299px) {
                margin: 5px 5px;
                padding: 0 10px;
                font-size: 14px;
            }
        }
        button {
            border: none;
            outline: none;
            font-size: 15px;
            cursor: pointer;
            background: none;
        }
        img {
            margin-right: 5px;
            vertical-align: middle;
        }
    }
`;
