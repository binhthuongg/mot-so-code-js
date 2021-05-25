import css from 'styled-jsx/css';

export default css`
    .FilmTypeWrapper {
        display: block;
        margin-bottom: 50px;
        .FilmTypeHeader {
            margin-bottom: 20px;
        }
        .filmTypeHeaderInner {
            display: flex;
            align-items: center;
            .boxText {
                padding-right: 30px;
                width: 34%;
                text-align: right;
                font-size: 40px;
            }
            .boxImage {
                width: 66%;
                position: relative;
                margin-bottom: -6%;
                min-height: 653px;
                &::before {
                    content: '';
                    display: block;
                    position: absolute;
                    z-index: 1;
                    left: 0;
                    right: 0;
                    top: 0;
                    bottom: 0;
                    background: linear-gradient(
                            90.48deg,
                            #000000 0.42%,
                            rgba(0, 0, 0, 0.79085) 11.49%,
                            rgba(255, 255, 255, 0) 53.36%
                        ),
                        linear-gradient(
                            180deg,
                            rgba(255, 255, 255, 0) 55.4%,
                            #000000 88.68%
                        );
                }
                img {
                    width: 100%;
                }
            }
        }
        .filmTypeList {
            position: relative;
            z-index: 2;
            .title {
                font-size: 40px;
                margin-bottom: 30px;
            }
            .list {
                white-space: nowrap;
                overflow: auto;
            }
            li {
                display: inline-block;
                border: 5px solid transparent;
                margin-right: 5px;
                cursor: pointer;
                &.active,
                &:hover {
                    border-color: #fff;
                }
                span {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 330px;
                    height: 189px;
                    background: #4f4f4f;
                }
            }
        }
    }
`;
