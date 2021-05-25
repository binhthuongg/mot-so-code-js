import css from 'styled-jsx/css';
import { mainColor } from '../../constants/theme';

export default css`
    .SunshineTVWrapper {
        padding-top: 50px;
        padding-bottom: 50px;
    }
    .TvCategory {
        &:not(:last-child) {
            margin-bottom: 35px;
        }
    }
    .singleTvCategoryTitle {
        margin-bottom: 35px;
    }
    .TvCategoryItem {
        display: inline-block;
        width: 400px;
        margin: 0 20px 20px 0;
        vertical-align: top;
        cursor: pointer;
        outline: none;
        @media screen and (max-width: 1499px) {
            width: 350px;
        }
        @media screen and (max-width: 1299px) {
            width: 300px;
        }
        img {
            width: 100%;
            height: 265px;
            object-fit: cover;
            @media screen and (max-width: 1499px) {
                height: 225px;
            }
            @media screen and (max-width: 1299px) {
                height: 200px;
            }
        }
        .image {
            overflow: hidden;
            margin-bottom: 20px;
            &:hover {
                img {
                    transform: scale(1.02);
                }
            }
            img {
                transition: 0.3s ease;
            }
        }
        .title {
            color: white;
            &:hover {
                color: ${mainColor};
            }
            a {
                color: white;
                &:hover {
                    color: ${mainColor};
                }
            }
        }
    }
`;
