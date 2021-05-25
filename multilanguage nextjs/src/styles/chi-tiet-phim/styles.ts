import css from 'styled-jsx/css';

export default css`
    .ChiTietPhim {
        padding-bottom: 70px;
        &.playingScreen {
            position: fixed;
            z-index: 9898989898;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            background: #090809;
        }
    }
    .FilmRelated {
        margin-top: 50px;
        .title {
            margin-bottom: 35px;
        }
    }
    .ListRelatedMovieWrapper {
        padding: 50px 0;
        .buttonBack {
            margin-top: 50px;
        }
    }
`;
