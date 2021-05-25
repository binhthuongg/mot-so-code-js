import css from 'styled-jsx/css';
import { mainColor } from '../../../constants/theme';

export default css`
    .headerMobile {
        font-weight: 300;
    }
    .headerMobileTop {
        padding: 20px 0;
        > div {
            &:not(:last-child) {
                margin-bottom: 10px;
            }
        }
        &.isAbsolute {
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            z-index: 9;
        }
    }
    .sectionTopRight {
        display: block;
    }
    .sectionTop {
        display: flex;
        justify-content: space-between;
        position: relative;
        img {
            vertical-align: middle;
        }
    }
    .sectionTopLeft {
        display: flex;
        align-items: center;
        > div {
            &:not(:last-child) {
                margin-right: 30px;
            }
        }
    }
    .logo {
        img {
            width: 110px;
        }
    }
    .subMenu {
        position: absolute;
        z-index: 1595;
        right: 0;
        top: 100%;
        display: none;
        background: #000;
        padding: 15px 20px;
        font-size: 13px;
        &.show {
            display: block;
        }
    }
    .mobileMenu {
        font-size: 13px;
    }
    .headerBottom {
        border-top: 1px solid rgba(255, 255, 255, 0.1);
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 8888999;
        padding: 6px 0;
        background: #000;
        .inner {
            display: flex;
            justify-content: space-between;
        }
        .menuItem {
            font-size: 12px;
            text-align: center;
            .image {
                display: flex;
                min-height: 16px;
                align-items: center;
                justify-content: center;
                margin-bottom: 3px;
            }
            span {
                display: block;
            }
            a {
                &.active {
                    color: ${mainColor};
                }
            }
        }
    }
`;

export const headerStyles = css.global`
    .mobileMenu {
        .swiper-slide {
            width: auto;
        }
    }
`;
