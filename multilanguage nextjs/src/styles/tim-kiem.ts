import css from 'styled-jsx/css';

export default css`
    .SearchWrapper {
        .layoutInner {
            display: flex;
            flex-wrap: wrap;
        }
        .SearchNavigationWrapper,
        .SearchContentWrapper {
            padding-top: 70px;
            height: 100vh;
            overflow: auto;
            -ms-overflow-style: none; /* IE and Edge */
            scrollbar-width: none; /* Firefox */
            &::-webkit-scrollbar {
                display: none;
            }
            @media screen and (max-width: 767px) {
                padding-top: 40px;
                height: auto;
            }
        }
        .SearchNavigationWrapper {
            width: 30%;
            padding-left: 30px;
        }
        .SearchContentWrapper {
            width: 70%;
            @media screen and (max-width: 767px) {
                width: 100%;
            }
        }
    }
`;
