import css from 'styled-jsx/css';

export default css`
    .FilmCategoryWrapper {
        display: block;
        max-width: 100%;
        overflow-x: auto;
        position: relative;
        z-index: 97;
        padding-bottom: 70px;
    }
`;

export const sliderStyles = css.global`
    .FilmCategoryWrapper {
        .FilmListSlider {
            &:not(:last-child) {
                margin-bottom: 30px;
            }
        }
    }
`;
