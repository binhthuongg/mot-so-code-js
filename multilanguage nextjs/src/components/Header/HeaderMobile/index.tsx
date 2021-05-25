import Link from 'next/link';
import Router from 'next/router';
import React from 'react';
import SwiperCore, { Autoplay, Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import IconHome from './images/IconHome.svg';
import IconMore from './images/IconMore.svg';
import IconSearch from './images/IconSearch.svg';
import IconTruyenHinh from './images/IconTruyenHinh.svg';
import IconYeuThich from './images/IconYeuThich.svg';
import styles, { headerStyles } from './styles';

type routeType = {
    name: string;
    path: string;
    iconHover?: string;
};
type LAYOUT_MAIN_ROUTE_type = routeType[];

const LAYOUT_MAIN_ROUTE = [
    {
        name: 'Tất cả',
        path: '/',
    },
    {
        name: 'Phim bộ',
        path: '/phim-bo',
    },
    {
        name: 'Phim lẻ',
        path: '/phim-le',
    },

    {
        name: 'Tài liệu',
        path: '/tai-lieu',
    },
    {
        name: 'Châu Á',
        path: '/chau-a',
    },
    {
        name: 'Thiếu nhi & Gia đình',
        path: '/thieu-nhi-gia-dinh',
    },
];

const MENU_BOTTOM = [
    {
        icon: IconHome,
        name: 'Trang chủ',
        path: '/',
    },
    {
        icon: IconTruyenHinh,
        name: 'Truyền hình',
        path: '/truyen-hinh',
    },
    {
        icon: IconYeuThich,
        name: 'Yêu thích',
        path: '/yeu-thich',
    },
    {
        icon: IconMore,
        name: 'Xem thêm',
        path: '/tai-khoan',
    },
];

function HeaderMobile(): React.ReactElement {
    SwiperCore.use([Navigation, Pagination, Autoplay]);

    const showNavLink = (LAYOUT_MAIN_ROUTE: LAYOUT_MAIN_ROUTE_type) => {
        let result = null;
        if (LAYOUT_MAIN_ROUTE.length > 0) {
            result = LAYOUT_MAIN_ROUTE.map((route, index: number) => {
                return (
                    <SwiperSlide key={index}>
                        <Link key={index} href={route.path}>
                            <a className='navLink'>
                                <span className='text'>{route.name}</span>
                            </a>
                        </Link>
                        <style jsx>{styles}</style>
                    </SwiperSlide>
                );
            });
        }
        return result;
    };

    const renderSearchInput = () => {
        return (
            <div className='headerSearch'>
                <Link href='/tim-kiem'>
                    <a>
                        <img src={IconSearch} alt='' />
                    </a>
                </Link>
                <style jsx>{styles}</style>
            </div>
        );
    };

    const renderHeaderLogo = () => {
        return (
            <div className='logo'>
                <Link href='/'>
                    <a className='navLink'>
                        <img src='/images/logo.svg' alt='Logo' />
                    </a>
                </Link>
                <style jsx>{styles}</style>
            </div>
        );
    };

    const renderMobileMenu = () => {
        let html = null;
        const autoPlaySetting = {
            delay: 5000,
            disableOnInteraction: false,
        };
        html = (
            <div className='mobileMenu'>
                <Swiper
                    slidesPerView='auto'
                    spaceBetween={20}
                    speed={1000}
                    autoplay={autoPlaySetting}
                >
                    {showNavLink(LAYOUT_MAIN_ROUTE)}
                </Swiper>

                <style jsx>{styles}</style>
            </div>
        );
        return html;
    };

    const renderHeaderTop = () => {
        let html = null;
        const isHeaderTopAbsolute = () => {
            if (
                Router.pathname.indexOf('/yeu-thich') > -1 ||
                Router.pathname.indexOf('/truyen-hinh') > -1 ||
                Router.pathname.indexOf('/tim-kiem') > -1
            ) {
                return false;
            }
            return true;
        };
        const taiKhoanText = 'tai-khoan';
        if (Router.pathname.indexOf(taiKhoanText) < 0) {
            html = (
                <div
                    className={`headerMobileTop ${
                        isHeaderTopAbsolute() ? 'isAbsolute' : ''
                    }`}
                >
                    <div className='rowContainer'>
                        <div className='sectionTop'>
                            <div className='sectionTopLeft'>
                                {renderHeaderLogo()}
                                {renderSearchInput()}
                            </div>
                        </div>
                    </div>
                    <div className='sectionBottom'>
                        <div className='rowContainer'>{renderMobileMenu()}</div>
                    </div>
                    <style jsx>{styles}</style>
                </div>
            );
        }
        return html;
    };

    const renderHeaderBottomLinks = () => {
        let html = null;
        if (MENU_BOTTOM && MENU_BOTTOM.length) {
            html = MENU_BOTTOM.map((singleMenu, index) => {
                return (
                    <div className='menuItem' key={index}>
                        <Link href={singleMenu.path}>
                            <a
                                className={
                                    Router.pathname === singleMenu.path
                                        ? 'active'
                                        : ''
                                }
                            >
                                <div className='image'>
                                    <img src={singleMenu.icon} alt='' />
                                </div>
                                <span>{singleMenu.name}</span>
                            </a>
                        </Link>
                        <style jsx>{styles}</style>
                    </div>
                );
            });
        }
        return html;
    };

    const renderHeaderBottom = () => {
        let html = null;
        html = (
            <div className='headerBottom'>
                <div className='rowContainer'>
                    <div className='inner'>{renderHeaderBottomLinks()}</div>
                </div>
                <style jsx>{styles}</style>
            </div>
        );
        // if (Router.pathname === '/' || Router.pathname === '/tai-khoan') {
        // }
        return html;
    };
    return (
        <div className='headerMobile'>
            {renderHeaderTop()}
            {renderHeaderBottom()}
            <style jsx>{styles}</style>
            <style jsx>{headerStyles}</style>
        </div>
    );
}

export default HeaderMobile;
