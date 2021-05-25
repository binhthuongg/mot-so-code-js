import css from 'styled-jsx/css';
import { ColorLuminance } from '../../../commons/utils';
import { secondaryColor } from '../../../constants/theme';

export default css`
    .maKichHoatWrapper {
        padding-bottom: 60px;
        @media screen and (max-width: 767px) {
            padding-top: 70px;
        }
        .rowContainer {
            @media screen and (min-width: 768px) {
                padding-left: 0;
                padding-right: 0;
            }
        }
        .text {
            width: 400px;
            max-width: 100%;
        }
        .label {
            color: rgba(255, 255, 255, 0.8);
            font-weight: normal;
            font-size: 1em;
            margin-bottom: 25px;
        }
        .input {
            height: 45px;
            line-height: 45px;
            padding: 0 20px;
            border: none;
            font-size: 15px;
            color: #000000;
            text-align: center;
            background: #fff;
            outline: none;
            margin-bottom: 25px;
            width: 100%;
            @media screen and (max-width: 1499px) {
                height: 55px;
                line-height: 55px;
            }
            @media screen and (max-width: 767px) {
                height: 45px;
                line-height: 45px;
            }
            &::-webkit-input-placeholder {
                color: #000000;
                font-size: 15px;
                opacity: 1;
            }
            &:-ms-input-placeholder {
                color: #000000;
                font-size: 15px;
                opacity: 1;
            }
            &::placeholder {
                color: #000000;
                font-size: 15px;
                opacity: 1;
            }
            &::-webkit-outer-spin-button,
            &::-webkit-inner-spin-button {
                -webkit-appearance: none;
                margin: 0;
            }

            /* Firefox */
            &[type='number'] {
                -moz-appearance: textfield;
            }
        }
        .keyboardWrapper {
            display: flex;
            justify-content: space-between;
        }
        .keyboard {
            display: none;
            margin-right: 15px;
            font-size: 40px;
            table {
                margin: -10px;
                border-spacing: 10px;
            }
            td {
                width: 71px;
                height: 71px;
                background: #333333;
                text-align: center;
                padding: 0 5px;
                border: 2px solid transparent;
                cursor: pointer;
                &:hover {
                    border-color: #fff;
                }
                img {
                    display: inline-block;
                    vertical-align: middle;
                }
            }
        }
        .buttonNextStep {
            background-color: ${secondaryColor};
            color: #fff;
            text-align: center;
            cursor: pointer;
            &:hover {
                background: ${ColorLuminance(secondaryColor, -0.2)};
            }
        }
        .note {
            font-size: 0.85em;
            margin-top: 25px;
        }
    }
`;
