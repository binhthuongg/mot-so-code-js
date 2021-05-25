import css from 'styled-jsx/css';

export default css`
    .loginMobile {
        padding-top: 50px;
        text-align: center;
        font-size: 15px;
        max-height: 100vh;
        overflow: hidden;
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
        }
        .content {
            position: absolute;
            z-index: 2;
            left: 0;
            right: 0;
            top: 30%;
            transform: translateY(-30%);
        }
        .rowContainer {
            padding-left: 10%;
            padding-right: 10%;
        }
        .logo {
            margin-bottom: 30px;
            img {
                width: 160px;
            }
        }
        .description {
            font-weight: bold;
            text-transform: uppercase;
            font-size: 13px;
            margin-bottom: 20px;
        }
        .label {
            font-size: 1em;
            color: #ababab;
            margin-bottom: 15px;
        }
        .input {
            width: 100%;
            height: 40px;
            line-height: 40px;
            padding: 0 20px;
            border: none;
            font-size: inherit;
            color: #333;
            border-radius: 5px;
            text-align: center;
            background: #fff;
            outline: none;
            margin-bottom: 15px;
            -moz-appearance: textfield;
            &::-webkit-input-placeholder {
                color: #333;
                font-size: inherit;
                opacity: 1;
            }
            &:-ms-input-placeholder {
                color: #333;
                font-size: inherit;
                opacity: 1;
            }
            &::placeholder {
                color: #333;
                font-size: inherit;
                opacity: 1;
            }
            &::-webkit-inner-spin-button {
                -webkit-appearance: none;
                margin: 0;
            }
        }
    }
    .loginDesktop {
        color: #b1b1b1;
        .logo {
            position: absolute;
            z-index: 9;
            left: 24%;
            top: 5%;
            @media screen and (max-width: 1499px) {
                left: 20%;
            }
            @media screen and (max-width: 1199px) {
                left: 15%;
            }
            img {
                width: 272px;
            }
        }
        .poster {
            position: relative;
            .posterImage {
                width: 100%;
                object-fit: cover;
            }
        }
        .content {
            position: absolute;
            left: 0;
            right: 0;
            z-index: 1;
            bottom: 5%;
            text-align: center;
            @media screen and (max-width: 1499px) {
                bottom: 5%;
            }
            @media screen and (max-width: 1399px) {
                bottom: 15px;
            }
        }
        .logoText {
            width: 170px;
            vertical-align: middle;
            margin-left: 5px;
        }
        .description {
            margin-bottom: 15px;
            @media screen and (max-width: 1399px) {
                margin-bottom: 15px;
            }
        }
        .label {
            font-size: 1em;
            margin-bottom: 15px;
        }
        .timeLeft {
            strong {
                margin: 0 5px;
                font-size: 25px;
                color: white;
                display: inline-block;
            }
        }

        .inputWrapper {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 0;
        }
        .input {
            width: 465px;
            max-width: 100%;
            padding: 0 20px;
            border: none;
            color: #000;
            text-align: center;
            outline: none;
            -moz-appearance: textfield;
            background: #c4c4c4;
            border-radius: 5px;
            &::-webkit-input-placeholder {
                color: #000;
                font-size: inherit;
                opacity: 1;
            }
            &:-ms-input-placeholder {
                color: #000;
                font-size: inherit;
                opacity: 1;
            }
            &::placeholder {
                color: #000;
                font-size: inherit;
                opacity: 1;
            }
            &::-webkit-inner-spin-button {
                -webkit-appearance: none;
                margin: 0;
            }
        }
        .buttonWrapper {
            margin-left: 10px;
        }
        .input,
        .button {
            font-size: inherit;
            height: 46px;
            line-height: 46px;
        }
    }
`;
