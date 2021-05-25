import dynamic from 'next/dynamic';
import React from 'react';
import { isMobileOnly } from 'react-device-detect';
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FilmModel } from '../../../models/FilmModel';
import FilmIntroduceSlider from '../FilmIntroduceSlide';
import styles, { sliderStyles } from './styles';

type PropType = {
    listHeaderMovies: FilmModel[];
};

const Device = dynamic(() => import('../../Device'), {
    ssr: false,
});

/**
 * component hiển thị slider của category header
 *
 * cần truyền props: listHeaderMovies
 */
function FilmHeaderCategorySlider(props: PropType): React.ReactElement {
    const { listHeaderMovies } = props;

    const renderSliderContent = () => {
        let html = null;
        if (listHeaderMovies && listHeaderMovies.length) {
            html = listHeaderMovies.map((singleMovie, index) => {
                return (
                    <SwiperSlide key={index}>
                        <FilmIntroduceSlider
                            filmDetail={singleMovie}
                            key={index}
                        />
                    </SwiperSlide>
                );
            });
            /**
             * khi có số phim = 1 thì nhân 2 lên để tăng số lượng slide
             */
            if (listHeaderMovies.length === 1) {
                return (
                    <>
                        {html}
                        {html}
                    </>
                );
            }
        }
        return html;
    };

    SwiperCore.use([Navigation, Pagination, Autoplay]);

    const renderNavigation = () => {
        return (
            <div className='swiperNavigation 234'>
                <div className='swiperNavigationButton swiperButtonPrev' />
                <div className='swiperNavigationButton swiperButtonNext' />
            </div>
        );
    };

    const renderPagination = () => {
        return (
            <Device>
                {() => {
                    if (isMobileOnly) return <></>;
                    if (listHeaderMovies && listHeaderMovies.length > 1) {
                        return <div className='swiperPagination' />;
                    }
                }}
            </Device>
        );
    };

    const renderListFilm = () => {
        let html = null;
        const autoPlaySetting = {
            delay: 5000,
            disableOnInteraction: false,
        };
        if (listHeaderMovies) {
            if (listHeaderMovies && listHeaderMovies.length > 0) {
                html = (
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={20}
                        navigation={{
                            prevEl:
                                '.FilmHeaderCategorySliderWrapper .swiperNavigation .swiperButtonPrev',
                            nextEl:
                                '.FilmHeaderCategorySliderWrapper .swiperNavigation .swiperButtonNext',
                        }}
                        pagination={{
                            clickable: true,
                            el: '.swiperPagination',
                        }}
                        autoplay={
                            listHeaderMovies.length > 1
                                ? autoPlaySetting
                                : false
                        }
                        speed={1000}
                        loop
                        loopAdditionalSlides={5}
                    >
                        {renderSliderContent()}
                        {renderNavigation()}
                    </Swiper>
                );
            }
        }
        return html;
    };

    return (
        <div className='FilmHeaderCategorySliderWrapper'>
            {renderListFilm()}
            {renderPagination()}
            <style jsx>{styles}</style>
            <style jsx>{sliderStyles}</style>
        </div>
    );
}

export default FilmHeaderCategorySlider;
