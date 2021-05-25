import css from 'styled-jsx/css';

export default css`
    .TV {
        display: block;
        padding-top: 35px;
        padding-bottom: 35px;
        .TVCategory {
            margin-bottom: 25px;
            .TVCategoryName {
                font-size: 30px;
                margin-bottom: 20px;
                @media screen and (max-width: 767px) {
                    font-size: 20px;
                }
            }
            .TVCategoryChanel {
                li {
                    display: inline-block;
                    margin-right: 20px;
                    vertical-align: middle;
                    margin-bottom: 20px;
                    border-radius: 10px;
                    width: 336px;
                    max-width: 100%;
                    height: 200px;
                    cursor: pointer;
                    overflow: hidden;
                    @media screen and (max-width: 1499px) {
                        width: 250px;
                        height: 150px;
                    }
                    @media screen and (max-width: 767px) {
                        width: 135px;
                        height: auto;
                        border-radius: 4px;
                    }
                    img {
                        object-fit: cover;
                        height: 100%;
                        width: 100%;
                    }
                }
            }
        }
    }
`;
