import css from 'styled-jsx/css';

export default css`
    .title {
        font-size: 20px;
        margin-bottom: 20px;
    }
    .sliderContainer {
        margin-left: -10px;
        position: relative;
    }
`;
export const sliderStyles = css.global`
    .FilmListSlider {
        .swiper-slide {
            width: auto;
        }
        .swiper-container {
            padding-top: 40px;
            padding-bottom: 40px;
            margin-top: -40px;
            margin-bottom: -40px;
        }
        .swiper-scrollbar {
            bottom: 23px;
        }
        &.category-slider {
            .FilmSingleFeaturedWrapper {
                position: relative;
                overflow: hidden;
                -webkit-font-smoothing: subpixel-antialiased;
                backface-visibility: hidden;
                &:before {
                    /* content: ''; */
                    /* display: block;
                    left: 0;
                    right: 0;
                    top: 0;
                    bottom: 0;
                    position: absolute;
                    z-index: 1;
                    background: rgba(0, 0, 0, 0.2); */
                }
                img {
                    width: 100%;
                    height: auto;
                }
                .title {
                    display: block;
                    position: absolute;
                    z-index: 89;
                    left: 0;
                    right: 0;
                    text-align: center;
                    font-size: 20px;
                    bottom: 0;
                    padding: 10px 20px;
                    background: rgba(0, 0, 0, 0.6);
                    @media screen and (max-width: 767px) {
                        font-size: 15px;
                    }
                }
            }
        }
        .swiperNavigation {
            @media screen and (max-width: 767px) {
                display: none;
            }
        }
    }
`;
