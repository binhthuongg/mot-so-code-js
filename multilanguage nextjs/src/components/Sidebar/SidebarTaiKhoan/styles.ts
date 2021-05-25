import css from 'styled-jsx/css';
import { mainColor, secondaryColor } from '../../../constants/theme';

export default css`
    .navBarProfile {
        width: 27%;
        text-align: right;
        padding-right: 50px;
        font-size: 20px;
        @media screen and (max-width: 767px) {
            display: none;
        }
        .nav {
            display: block;
        }
        .navItem {
            display: block;
            &:not(:last-child) {
                margin-bottom: 20px;
            }
            &.active {
                .navLink {
                    &:before {
                        display: block;
                    }
                }
            }
            &.log-out {
                font-weight: bold;
            }
        }
        .navLink {
            color: #fff;
            display: inline-block;
            padding-bottom: 12px;
            position: relative;

            &:before {
                content: '';
                display: none;
                position: absolute;
                background: ${secondaryColor};
                border-radius: 100px;
                width: 135px;
                height: 8px;
                z-index: 1;
                bottom: 0;
                right: 0;
                @media screen and (max-width: 1199px) {
                    height: 5px;
                }
            }
            &:hover {
                color: ${mainColor};
            }
        }
    }
`;
