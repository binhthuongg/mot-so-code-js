import { mainColor } from '../../../constants/theme';
import css from 'styled-jsx/css';

export default css`
    .FilmAction {
        display: block;
        margin-bottom: 25px;
    }
    .listAction {
        display: flex;
        align-items: center;
        padding: 0;
        .singleButton {
            padding: 0 15px;
            position: relative;
            cursor: pointer;
            background: white;
            border-radius: 5px;
            color: #000;
            height: 40px;
            font-size: 15px;
            display: flex;
            white-space: nowrap;
            align-items: center;
            /* &:hover,
            &.active {
                background-color: #fff;
            } */
            &.active {
                background-color: ${mainColor};
                color: white;
            }
            &:not(:last-child) {
                margin-right: 20px;
            }
            .image {
                display: inline-block;
                vertical-align: middle;
                position: relative;
                top: -1px;
                margin-right: 10px;
                @media screen and (max-width: 767px) {
                    max-width: 25px;
                }
            }
        }
        .buttonPlay {
            &:not(.isTrailer) {
                @media screen and (max-width: 767px) {
                    display: none;
                }
            }
        }
    }
    .hideMobile {
        @media screen and (max-width: 767px) {
            display: none !important;
        }
    }

    .subMenu {
        position: absolute;
        z-index: 1;
        left: 0;
        font-size: 12px;
        top: 100%;
        min-width: 200px;
        padding: 20px 15px;
        background: #000;
        max-height: 165px;
        overflow: auto;
        color: #fff;
        opacity: 0;
        visibility: hidden;
        transition: 0.3s ease;
        &.active {
            opacity: 1;
            visibility: visible;
        }
        li {
            &:not(:last-child) {
                margin-bottom: 15px;
            }
            .text {
                display: block;
                &:hover {
                    color: ${mainColor};
                }
            }
        }
        &.listSeason {
            li.active {
                .text {
                    color: ${mainColor};
                }
            }
        }
        &.listEpisode {
            min-width: 300px;
            li {
                padding: 10px 0;
                position: relative;
                margin-bottom: 0;
                white-space: nowrap;
            }
            img {
                margin-left: 10px;
            }

            .line {
                position: absolute;
                z-index: 1;
                left: 0;
                right: 0;
                height: 2px;
                bottom: 0;
                background: #c4c4c4;
                span {
                    position: absolute;
                    z-index: 1;
                    left: 0;
                    height: 100%;
                    top: 0;
                    background: #0090e1;
                }
            }
        }
    }
`;
