import React from 'react';
import SwiperCore, {
    Autoplay,
    Navigation,
    Pagination,
    Scrollbar,
} from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { v4 as uuidv4 } from 'uuid';
import { FilmModel } from '../../../models/FilmModel';
import FilmSingleFeatured from '../FilmSingleFeatured';
import styles, { sliderStyles } from './styles';

type PropType = {
    title?: string;
    isSunshineMovie?: boolean;
    isSliderMovie?: boolean;
    listMovie?: FilmModel[];
};

/**
 * Component để tạo slider của list phim
 *
 * Cần truyền props: title, listMovie, isSunshineTv
 */
function FilmListSlider(props: PropType): React.ReactElement {
    const { title, listMovie, isSunshineMovie, isSliderMovie } = props;

    /**
     * sử dụng để phân biệt các controls của từng component trong trường hợp gọi nhiều
     */
    const randomClass = `slider-${uuidv4()}`;
    let categorySliderClass = '';
    if (isSliderMovie) {
        categorySliderClass = 'category-slider';
    }

    // function updateSwiperScrollBar(swiper) {
    //     setTimeout(() => {
    //         // swiper.scrollbar.updateSize();
    //     }, 1000);
    // }
    // updateSwiperScrollBar();

    const renderTitle = () => {
        let html = null;
        if (title && !isSliderMovie) {
            html = (
                <h2 className='title'>
                    {title}
                    <style jsx>{styles}</style>
                </h2>
            );
        }
        return html;
    };
    SwiperCore.use([Navigation, Pagination, Scrollbar, Autoplay]);

    const renderListFilm = () => {
        let html = null;
        if (listMovie && listMovie.length) {
            html = listMovie.map((singleMovie, index) => {
                return (
                    <SwiperSlide key={index}>
                        <FilmSingleFeatured
                            link={`/chi-tiet-phim/${singleMovie.movie_id}`}
                            imagePosterUrl={
                                isSliderMovie
                                    ? singleMovie.landscape_poster_url
                                    : singleMovie.portrait_poster_url
                            }
                            title={singleMovie.name}
                            movie_url={singleMovie.movie_url}
                            isSunshineMovie={isSunshineMovie}
                        />
                    </SwiperSlide>
                );
            });
        } else {
            html = 'Đang cập nhật danh sách phim';
        }
        return html;
    };

    const renderNavigation = () => {
        return (
            <div className='swiperNavigation'>
                <div className='swiperNavigationButton swiperButtonPrev' />
                <div className='swiperNavigationButton swiperButtonNext' />
                <style jsx>{sliderStyles}</style>
            </div>
        );
    };

    const renderListFilmWrapper = () => {
        let html = null;
        const responsiveSettingSlider = {
            0: {
                slidesPerView: 1,
            },
            480: {
                slidesPerView: 2,
            },
            992: {
                slidesPerView: 3,
            },
        };
        const autoPlaySetting = {
            delay: 5000,
            disableOnInteraction: false,
        };
        if (listMovie && listMovie.length) {
            html = (
                <div className='sliderContainer 11'>
                    <Swiper
                        autoplay={isSliderMovie ? autoPlaySetting : undefined}
                        spaceBetween={15}
                        slidesPerView={isSliderMovie ? 3 : 'auto'}
                        loopAdditionalSlides={2}
                        scrollbar={{ draggable: true }}
                        breakpoints={
                            isSliderMovie ? responsiveSettingSlider : undefined
                        }
                        speed={900}
                        // onAfterInit={(swiper) => updateSwiperScrollBar(swiper)}
                        navigation={{
                            prevEl: `.${randomClass} .swiperNavigation .swiperButtonPrev`,
                            nextEl: `.${randomClass} .swiperNavigation .swiperButtonNext`,
                        }}
                    >
                        {renderListFilm()}
                    </Swiper>
                    {renderNavigation()}
                    <style jsx>{styles}</style>
                </div>
            );
        } else {
            html = 'Đang cập nhật danh sách phim';
        }
        return html;
    };

    return (
        <div className={`FilmListSlider ${randomClass} ${categorySliderClass}`}>
            {renderTitle()}
            {renderListFilmWrapper()}

            <style jsx>{styles}</style>
            <style jsx>{sliderStyles}</style>
        </div>
    );
}

export default FilmListSlider;
