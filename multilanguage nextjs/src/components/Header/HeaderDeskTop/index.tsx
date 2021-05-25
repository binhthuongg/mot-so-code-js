import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import Router from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as SearchResultType from '../../../constants/SearchResultType';
import { actionChangeInput } from '../../../features/Search/searchResultByInput';
import { actionSearchResultType } from '../../../features/Search/searchResultType';
import IconSearch from './images/icon-search.svg';
import IconAccount from './images/IconAccount.svg';
import IconMenu from './images/IconMenu.svg';
import IconCloseMobileMenu from './images/IconCloseMobileMenu.svg';
import styles from './styles';

type routeType = {
    name: string;
    path: string;
    iconHover?: string;
};
type LAYOUT_MAIN_ROUTE_type = routeType[];

const LAYOUT_MAIN_ROUTE = [
    {
        name: 'Trang chủ',
        path: '/',
    },
    {
        name: 'Truyền hình',
        path: '/truyen-hinh',
    },
    // {
    //     name: 'Mới & phổ biến',
    //     icon: IconTrending,
    //     path: '/moi-phobien',
    // },
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

    {
        name: 'Yêu thích',
        path: '/yeu-thich',
    },
];

function HeaderDesktop(): React.ReactElement {
    const router = useRouter();
    const [isShowMobileMenu, setIsShowMobileMenu] = useState(false);
    const [searchInputText, setSearchInputText] = useState('');
    const mobileMenuRef = useRef<HTMLDivElement>(null);
    const dispatch = useDispatch();

    const accountSubMenuItems = [
        {
            name: 'Quản lý tài khoản',
            path: '/tai-khoan',
        },
        {
            name: 'Dịch vụ đã mua',
            path: '/tai-khoan/dich-vu-da-mua',
        },
        {
            name: 'Lịch sử giao dịch',
            path: '/tai-khoan/lich-su-giao-dich',
        },
        {
            name: 'Mã kích hoạt',
            path: '/tai-khoan/ma-kich-hoat',
        },
        {
            name: 'Mua gói dịch vụ',
            path: '/tai-khoan/mua-goi-dich-vu',
        },
        {
            name: 'Đăng xuất',
            path: '/tai-khoan/dang-xuat',
        },
    ];

    const renderSubMenuItem = () => {
        let html = null;
        html = accountSubMenuItems.map((accountSubMenuSingle, index) => {
            return (
                <li
                    key={index}
                    className={
                        router.pathname === accountSubMenuSingle.path
                            ? 'active'
                            : ''
                    }
                >
                    <Link href={accountSubMenuSingle.path}>
                        <a>{accountSubMenuSingle.name}</a>
                    </Link>
                    <style jsx>{styles}</style>
                </li>
            );
        });
        return html;
    };

    const renderAccount = () => {
        let html = null;
        html = (
            <div className='account'>
                <Link href='/tai-khoan'>
                    <a className='navLink'>
                        <div className='image'>
                            <img
                                src={IconAccount}
                                alt=''
                                className='iconAccount'
                            />
                        </div>
                    </a>
                </Link>
                <div className='subMenu'>
                    <ul>{renderSubMenuItem()}</ul>
                </div>
                <style jsx>{styles}</style>
            </div>
        );
        return html;
    };

    const showNavLink = (LAYOUT_MAIN_ROUTE: LAYOUT_MAIN_ROUTE_type) => {
        let result = null;
        if (LAYOUT_MAIN_ROUTE.length > 0) {
            result = LAYOUT_MAIN_ROUTE.map((route, index: number) => {
                return (
                    <li
                        key={index}
                        className={`navItem ${
                            router.pathname === route.path ? 'active' : ''
                        }`}
                        onClick={() => setIsShowMobileMenu(false)}
                    >
                        <Link key={index} href={route.path}>
                            <a className='navLink'>
                                <span className='text'>{route.name}</span>
                            </a>
                        </Link>
                        <style jsx>{styles}</style>
                    </li>
                );
            });
        }
        return result;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setSearchInputText(value);
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleSubmitForm = (e: any) => {
        e.preventDefault();
        dispatch(
            actionSearchResultType(SearchResultType.SEARCH_RESULT_TYPE_INPUT),
        );
        dispatch(actionChangeInput(searchInputText));
        Router.push('/tim-kiem');
    };

    const renderSearchInput = () => {
        return (
            <div className='headerSearch'>
                <form onSubmit={(e) => handleSubmitForm(e)}>
                    <input
                        type='text'
                        placeholder='Tìm kiếm'
                        onChange={(e) => handleChange(e)}
                    />
                    <button type='submit'>
                        <img src={IconSearch} alt='Submit' />
                    </button>
                </form>
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

    const renderHeaderMenu = () => {
        return (
            <div className='headerMenuWrapper'>
                <nav className='navBarMain'>
                    <ul className='nav'>{showNavLink(LAYOUT_MAIN_ROUTE)}</ul>
                </nav>
                <style jsx>{styles}</style>
            </div>
        );
    };

    const openMobileMenu = () => {
        setIsShowMobileMenu(true);
    };

    const renderHeaderMenuToggle = () => {
        return (
            <div
                className='mobileMenuToggle'
                onClick={() => openMobileMenu()}
                role='button'
                tabIndex={0}
            >
                <img src={IconMenu} alt='Menu' />
                <style jsx>{styles}</style>
            </div>
        );
    };

    const renderHeaderRight = () => {
        return (
            <div className='headerRight'>
                {renderHeaderMenuToggle()}
                {renderSearchInput()}
                {renderAccount()}
                <style jsx>{styles}</style>
            </div>
        );
    };

    const renderMobileMenu = () => {
        return (
            <div
                className={`mobileMenuWrapper ${
                    isShowMobileMenu ? 'show' : 'hide'
                }`}
            >
                <div
                    className='iconClose'
                    onClick={() => setIsShowMobileMenu(false)}
                    role='button'
                    tabIndex={0}
                >
                    <img src={IconCloseMobileMenu} alt='Close' />
                </div>
                <div className='mobileMenu' ref={mobileMenuRef}>
                    <ul className='nav'>{showNavLink(LAYOUT_MAIN_ROUTE)}</ul>
                </div>
                <style jsx>{styles}</style>
            </div>
        );
    };

    /**
     * Tạo event khi click hiện mobileMenu rồi kích ra ngoài, mobileMenu sẽ ẩn
     * https://stackoverflow.com/questions/32553158/detect-click-outside-react-component
     */
    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const handleClickOutside = (event: any) => {
            if (
                mobileMenuRef.current &&
                !mobileMenuRef.current.contains(event.target)
            ) {
                setIsShowMobileMenu(false);
            }
        };

        // Bind the event listener
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [mobileMenuRef]);
    return (
        <div className='header headerDesktop'>
            {renderHeaderLogo()}
            {renderHeaderMenu()}
            {renderHeaderRight()}
            {renderMobileMenu()}
            <style jsx>{styles}</style>
        </div>
    );
}

export default HeaderDesktop;
