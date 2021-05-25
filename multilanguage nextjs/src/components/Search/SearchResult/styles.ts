import css from 'styled-jsx/css';

export default css`
    .SearchResult {
        display: block;
        padding-bottom: 60px;
        .title {
            margin-bottom: 20px;
            font-size: 1.2em;
        }
        .list {
            display: block;
        }
    }
`;

export const searchResultStyles = css.global`
    .SearchResult {
        .FilmSingleFeaturedWrapper {
            margin-right: 15px;
            margin-bottom: 15px;
        }
    }
`;
