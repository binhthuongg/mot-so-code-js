import css from 'styled-jsx/css';

export default css`
    .layoutTaiKhoanWrapper {
        display: block;
        position: relative;
        .background {
            position: absolute;
            z-index: 1;
            left: 0;
            right: 0;
            top: 0;
            img {
                width: 100%;
                object-fit: cover;
            }
            @media screen and (max-width: 767px) {
                display: none;
            }
        }
        .layoutContent {
            position: relative;
            z-index: 9;
            padding-top: 120px;
            @media screen and (max-width: 767px) {
                padding: 0;
            }
            > .rowContainer {
                @media screen and (max-width: 767px) {
                    padding-left: 0;
                    padding-right: 0;
                }
            }
        }
        .layout {
            display: flex;
        }
        .layoutMain {
            width: 73%;
            @media screen and (max-width: 767px) {
                width: 100%;
            }
        }
        > .rowContainer {
            @media screen and (max-width: 767px) {
                padding-left: 0;
                padding-right: 0;
            }
        }
    }
`;
export const taiKhoanGlobalStyles = css.global`
    .layoutTaiKhoanWrapper {
        .pageTitle {
            font-size: 20px;
            margin-bottom: 30px;
            padding-bottom: 10px;
            border-bottom: 1px solid white;
            @media screen and (max-width: 767px) {
                font-size: 18px;
            }
        }
    }
`;
