import css from 'styled-jsx/css';
import { mainColor } from '../../../constants/theme';

export default css`
    .navBarMain {
        background: #000000;
        color: #fff;
        position: relative;
        z-index: 1;
        height: 100%;
        // transition: 0.5s ease;
        &.activeSidebar {
            // background: rgba(0, 0, 0, 0.9);
            background: linear-gradient(
                89.94deg,
                #000000 0.04%,
                rgba(0, 0, 0, 0.9) 21.9%,
                rgba(0, 0, 0, 0.48) 99.94%
            );
            width: 100vw;
            .nav {
                padding: 45px 45px 30px 45px;
                width: 380px;
            }
            .navLink {
                text-align: left;
                width: auto;
                &:before {
                    left: -5px;
                    right: -5px;
                    width: auto;
                    transform: none;
                }
                .id {
                    display: block;
                }
                .iconVip {
                    margin: 0;
                }
                .image {
                    min-width: 55px;
                }
            }
            .text {
                display: inline-block !important;
                vertical-align: middle;
                margin-left: 15px;
            }
            .image {
                display: inline-block;
            }
            .iconAccount {
                margin-bottom: 0;
            }
            .iconSmall {
                display: none;
            }
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
        .nav {
            height: 100%;
            padding: 45px 20px 30px 20px;
        }
        .navItem {
            display: block;

            &:not(:last-child) {
                margin-bottom: 30px;
                @media screen and (max-width: 1499px) {
                    margin-bottom: 25px;
                }
            }

            &.active {
                .navLink {
                    &:before {
                        display: block;
                    }
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
            display: inline-block;
            width: 100%;
            text-align: center;
            padding-bottom: 15px;
            position: relative;
            &:before {
                content: '';
                display: none;
                position: absolute;
                background: ${mainColor};
                border-radius: 100px;
                width: 60px;
                height: 8px;
                z-index: 1;
                bottom: 0;
                left: 50%;
                transform: translateX(-50%);
            }
            &:hover {
                color: ${mainColor};
            }
        }
        .text {
            display: none;
        }
    }
`;
