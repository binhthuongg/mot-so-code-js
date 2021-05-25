import css from 'styled-jsx/css';

export default css`
    .FilmSingleFeaturedWrapper {
        display: inline-block;
        vertical-align: top;
        /* overflow: hidden; */
        cursor: pointer;
        &:hover {
            img {
                transform: scale(1.1);
            }
        }
        .inner {
            cursor: pointer;
            outline: none;
        }
        a {
            display: block;
        }
    }
    .title {
        display: none;
    }
    .image {
        width: 214px;
        height: 346px;
        object-fit: cover;
        transition: 0.4s ease;
        @media screen and (max-width: 1499px) {
            width: 190px;
            height: 307px;
        }
        @media screen and (max-width: 991px) {
            width: 160px;
            height: 240px;
        }
        @media screen and (max-width: 767px) {
            width: 140px;
            height: 200px;
        }
        @media screen and (max-width: 350px) {
            width: 130px;
            height: 170px;
        }
    }
`;
