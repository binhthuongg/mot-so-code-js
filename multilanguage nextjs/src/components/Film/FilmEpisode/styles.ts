import css from 'styled-jsx/css';

export default css`
    .FilmEpisode {
        display: block;
        margin-bottom: 50px;
        overflow: hidden;
        .listEpisode {
            display: block;
            font-size: 30px;
            li {
                display: inline-block;
                margin-right: 0;
                margin-bottom: 0;
                vertical-align: middle;
            }
            .item {
                overflow: hidden;
                padding: 4px;
                cursor: pointer;

                &:hover {
                    .name {
                        border-color: white;
                    }
                }
                a.link {
                    border: 4px solid transparent;
                    border-radius: 5px;
                    display: block;
                    &:hover {
                        border-color: #fff;
                    }
                }
                .name {
                    border: 5px solid transparent;
                    width: 100%;
                    border-radius: 5px;
                    background: #333333;
                    display: flex;
                    text-align: center;
                    height: 107px;
                    width: 228px;
                    align-items: center;
                    justify-content: center;
                    color: #fff;
                    overflow: hidden;
                }
            }
        }
    }
`;
