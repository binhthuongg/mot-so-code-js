import css from 'styled-jsx/css';
import { hexToRgb } from '../../../commons/utils';
import { mainColor, secondaryColor } from '../../../constants/theme';

export default css`
    .headerDesktop {
        display: flex;
        justify-content: space-between;
        padding: 10px 25px;
        align-items: center;
        position: fixed;
        z-index: 66669;
        left: 0;
        right: 0;
        background: #000000;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }
    .navBarMain {
        @media screen and (max-width: 1199px) {
            display: none !important;
        }
        ul {
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .account {
            display: block;
        }
        .id {
            display: none;
        }
        .iconVip {
            display: block;
            margin: auto;
        }

        .textBottom {
            position: absolute;
            z-index: 1;
            bottom: 25;
            font-size: 0.75em;
            color: rgba(255, 255, 255, 0.6);
            line-height: 1.6;
        }

        .iconAccount {
            margin-bottom: 10px;
        }
        .iconSmall {
            display: block;
        }
        .image {
            display: block;
            img {
                vertical-align: middle;
            }
        }
        .navItem {
            display: block;
            font-size: 15px;

            &:not(:last-child) {
                margin-right: 30px;
                @media screen and (max-width: 1299px) {
                    font-size: 14px;
                    margin-right: 20px;
                }
            }

            &.active {
                .navLink {
                    color: ${mainColor};
                }
            }
            .log-out {
                font-weight: bold;
            }
            &.account {
                display: block;
                .iconVip {
                    display: block;
                }
                .text {
                    display: block;
                }
            }
            &.account {
                min-height: 90px;
            }
        }
        .navLink {
            color: #fff;
            &:hover {
                color: ${mainColor};
            }
        }
    }
    .headerRight {
        display: flex;
        align-items: center;
        margin-left: 20px;
        > div {
            &:not(:last-child) {
                margin-right: 25px;
            }
        }
    }
    .logo {
        min-width: 200px;
        @media screen and (max-width: 1299px) {
            min-width: 160px;
        }
    }
    .headerSearch {
        form {
            font-size: 12px;
            position: relative;
            input {
                background: #c4c4c4;
                border-radius: 10px;
                width: 240px;
                height: 32px;
                color: #000000;
                padding: 0 50px 0 20px;
                border: none;
                text-align: right;
                outline: none;
                font-size: inherit;
                font-style: italic;
                @media screen and (max-width: 1299px) {
                    width: 180px;
                }
                &::-webkit-input-placeholder {
                    color: #000000;
                    font-size: inherit;
                    opacity: 1;
                }
                &:-ms-input-placeholder {
                    color: #000000;
                    font-size: inherit;
                    opacity: 1;
                }
                &::placeholder {
                    color: #000000;
                    font-size: inherit;
                    opacity: 1;
                }
            }
            button {
                position: absolute;
                z-index: 1;
                right: 10px;
                top: 50%;
                transform: translateY(-50%);
                border: none;
                background: none;
                outline: none;
                cursor: pointer;
            }
        }
    }
    .account {
        position: relative;
        &:hover {
            .subMenu {
                opacity: 1;
                visibility: visible;
            }
        }
        .subMenu {
            opacity: 0;
            font-size: 12px;
            visibility: hidden;
            transition: 0.3s ease;
            position: absolute;
            top: 100%;
            background: rgba(0, 0, 0, 0.8);
            width: 135px;
            right: 0;
            text-align: right;
            padding: 20px 20px;
            li {
                &:not(:last-child) {
                    margin-bottom: 8px;
                }
                &.active {
                    a {
                        color: ${mainColor};
                    }
                }
            }
        }
    }
    .mobileMenuWrapper {
        position: fixed;
        z-index: 8889;
        top: 0;
        bottom: 0;
        left: -100px;
        background: rgba(0, 0, 0, 0.85);
        opacity: 0;
        font-size: 15px;
        visibility: hidden;
        transition: 0.5s ease;
        @media screen and (min-width: 1200px) {
            display: none !important;
        }
        &.show {
            opacity: 1;
            visibility: visible;
            left: 0;
        }
        .iconClose {
            position: absolute;
            z-index: 1;
            top: 15px;
            left: 10px;
            cursor: pointer;
        }
        .mobileMenu {
            width: 162px;
            max-width: 100%;
            height: 100%;
            /* background: ${`rgba(${hexToRgb(secondaryColor).r}, ${
                hexToRgb(secondaryColor).g
            }, ${hexToRgb(secondaryColor).b}, 0.5)`}; */
            background: rgba(0, 0, 0, 0.8);
            padding: 45px 30px;
            text-align: right;
            li {
                &:not(:last-child) {
                    margin-bottom: 8px;
                }
            }
        }
    }
    .mobileMenuToggle {
        cursor: pointer;
        position: fixed;
        top: 75px;
        left: 20px;
        img {
            vertical-align: middle;
        }
        @media screen and (min-width: 1200px) {
            display: none !important;
        }
    }
`;
