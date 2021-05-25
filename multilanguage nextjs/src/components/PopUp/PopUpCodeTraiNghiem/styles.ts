import css from 'styled-jsx/css';
import { ColorLuminance } from '../../../commons/utils';
import { mainColor } from '../../../constants/theme';

export default css`
    .popUpWrapper {
        text-align: center;
    }
    .popUpInsertCode {
        width: 790px;
        max-width: 100%;
        .popUpLogo {
            margin-bottom: 10px;
            img {
                width: 270px;
                @media screen and (max-width: 1199px) {
                    width: 215px;
                }
                @media screen and (max-width: 767px) {
                    width: 180px;
                }
            }
        }
        .textWrapper {
            background: rgba(0, 0, 0, 0.6);
            border-radius: 20px;
            padding: 30px 40px;
            width: 506px;
            max-width: 100%;
            margin: auto;
            @media screen and (max-width: 767px) {
                padding: 20px 15px;
            }
        }
        h3 {
            margin-bottom: 25px;
            font-size: 25px;
            font-weight: 300;
            color: #969696;
            @media screen and (max-width: 1499px) {
                font-size: 20px;
            }
            @media screen and (max-width: 767px) {
                font-size: 15px;
            }
            strong {
                font-size: 1.15em;
                color: white;
            }
        }
        form {
            position: relative;
            padding-right: 130px;
            @media screen and (max-width: 767px) {
                padding: 0;
            }
        }
        .input {
            background: #c4c4c4;
            border-radius: 10px;
            height: 40px;
            line-height: 40px;
            border: none;
            width: 100%;
            outline: none;
            padding: 0 15px;
            font-size: 18px;
            @media screen and (max-width: 767px) {
                font-size: 16px;
            }
        }
        .button {
            height: 40px;
            line-height: 40px;
            margin: 0;
            margin-left: 10px;
            border-radius: 10px;
            background: ${mainColor};
            vertical-align: middle;
            position: absolute;
            z-index: 1;
            top: 0;
            right: 0;
            width: 113px;
            min-width: 0;
            bottom: 0;
            &:hover {
                background: ${ColorLuminance(mainColor, -0.2)};
            }
            @media screen and (max-width: 767px) {
                position: static;
                margin-top: 10px;
            }
        }
    }
    .close {
        border: none;
        outline: none;
        position: absolute;
        cursor: pointer;
        width: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 40px;
        background: none;
        top: 0;
        right: 0;
        width: auto;
        height: auto;
        min-width: 0;
        padding: 10px;
        border-radius: 4px;
        line-height: 1;
        margin: 0;
        z-index: 98988888;
    }
    .popUpSubmit {
        padding: 0 35px;
        h3 {
            margin-bottom: 30px;
        }
    }
`;
export const modalStyles = css.global`
    .ReactModal__Overlay {
        opacity: 0;
        transition: 2s ease 1s;
    }

    .ReactModal__Overlay--after-open {
        opacity: 1;
    }

    .ReactModal__Overlay--before-close {
        opacity: 0;
        transition: 0.3s ease;
    }
`;
