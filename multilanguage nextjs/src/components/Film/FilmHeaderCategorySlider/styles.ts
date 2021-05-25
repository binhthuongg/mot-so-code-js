import css from 'styled-jsx/css';

export default css`
    .FilmCategoryWrapper {
        display: block;
        max-width: 100%;
        overflow-x: auto;
        position: relative;
        z-index: 97;
        padding-bottom: 70px;
    }
    .listCategory {
        &:not(:last-child) {
            margin-bottom: 15px;
        }
    }
    .categoryName {
        font-size: 40px;
        margin-bottom: 10px;
    }
    .listFilm {
        white-space: nowrap;
        overflow-x: auto;
    }

    .FilmHeaderCategorySliderWrapper {
        display: block;
        overflow: hidden;
        margin-bottom: 50px;
        position: relative;
        @media screen and (max-width: 767px) {
            margin-bottom: 0;
        }
    }
`;

export const sliderStyles = css.global`
    .FilmHeaderCategorySliderWrapper {
        .swiper-container {
            padding-left: 25%;
            padding-right: 25%;
            @media screen and (max-width: 1499px) {
                padding-left: 15%;
                padding-right: 15%;
            }
            @media screen and (max-width: 767px) {
                padding-left: 0;
                padding-right: 0;
            }
        }
        .swiper-container-horizontal {
            padding-bottom: 10px;
        }
        .swiper-slide:not(.swiper-slide-active) {
            opacity: 0.2;
            pointer-events: none;
            .filmInformation {
                display: none;
            }
        }
        .swiperNavigationButton {
            &.swiperButtonPrev {
                left: 24%;
                @media screen and (max-width: 1499px) {
                    left: 14%;
                }
                @media screen and (max-width: 1199px) {
                    left: 14%;
                }
            }
            &.swiperButtonNext {
                right: 24%;
                @media screen and (max-width: 1499px) {
                    right: 14%;
                }
                @media screen and (max-width: 1199px) {
                    right: 14%;
                }
            }
        }
        .swiperPagination {
            position: absolute;
            z-index: 989;
            left: 0;
            right: 0;
            margin: 0;
            bottom: 0;
        }
        .swiperNavigation {
            @media screen and (max-width: 767px) {
                display: none;
            }
        }
    }
`;
