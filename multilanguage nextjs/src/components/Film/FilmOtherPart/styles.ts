import css from 'styled-jsx/css';

export default css`
    .FilmOtherPartWrapper {
        margin-top: 30px;
        .title {
            font-size: 40px;
            margin-bottom: 25px;
        }
        .listAllSeason {
            display: block;
            li {
                display: inline-block;
                margin-right: 15px;
                margin-bottom: 15px;
                max-width: 30%;
                vertical-align: top;

                &:hover,
                &.active {
                    .item {
                        border: 10px solid white;
                    }
                }
                &:hover {
                    cursor: pointer;
                }
                &.active {
                    cursor: auto;
                }
            }
            .item {
                position: relative;
                width: 100%;
                width: 468px;
                height: 258px;
                border: 10px solid transparent;
                img.image {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
                .name {
                    position: absolute;
                    z-index: 1;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    padding: 14px 15px;
                    font-size: 40px;
                    text-align: center;
                    color: #fff;
                    background: rgba(0, 0, 0, 0.47);
                }
            }
        }
    }
`;
