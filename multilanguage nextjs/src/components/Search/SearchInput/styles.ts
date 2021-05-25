import css from 'styled-jsx/css';

export default css`
    .SearchInputWrapper {
        margin-right: 50px;
        margin-bottom: 30px;
        position: relative;
        @media screen and (max-width: 767px) {
            margin-right: 0;
        }
        input {
            border: 2px solid white;
            width: 100%;
            line-height: 50px;
            font-size: inherit;
            padding: 5px 20px;
            outline: none;
            background: none;
            color: white;
            border-radius: 5px;
            &::-webkit-input-placeholder {
                color: white;
                font-size: inherit;
                opacity: 1;
            }
            &:-ms-input-placeholder {
                color: white;
                font-size: inherit;
                opacity: 1;
            }
            &::placeholder {
                color: white;
                font-size: inherit;
                opacity: 1;
            }
            @media screen and (max-width: 767px) {
                line-height: 35px;
                border: 1px solid white;
            }
        }
    }
    .error {
        margin-top: 5px;
        color: red;
        font-size: 0.7em;
    }
`;

export const searchInputGlobalStyles = css.global`
    .SearchInputWrapper.focus {
        .SearchRelatedWrapper {
            opacity: 1;
            visibility: visible;
        }
    }
`;
