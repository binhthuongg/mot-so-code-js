import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { sunshineAccountApi } from '../../../commons/API/sunshineAccountApi';
import { isLogin } from '../../../commons/utils';
import IconAccount from './images/IconAccount.svg';
import IconHome from './images/IconHome.svg';
import IconPhimBo from './images/IconPhimBo.svg';
import IconPhimLe from './images/IconPhimLe.svg';
import IconSearch from './images/IconSearch.svg';
import IconSunshineTVBig from './images/IconSunshineTVBig.svg';
import IconSunshineTVSmall from './images/IconSunshineTVSmall.svg';
import IconTV from './images/IconTV.svg';
import IconYeuThich from './images/IconYeuThich.svg';
import styles from './styles';

type routeType = {
    name: string;
    icon: string;
    path: string;
    iconHover?: string;
};
type LAYOUT_MAIN_ROUTE_type = routeType[];

const LAYOUT_MAIN_ROUTE = [
    {
        name: 'Tìm kiếm',
        icon: IconSearch,
        path: '/tim-kiem',
    },
    {
        name: 'Trang chủ',
        icon: IconHome,
        path: '/',
    },
    // {
    //     name: 'Mới & phổ biến',
    //     icon: IconTrending,
    //     path: '/moi-phobien',
    // },
    {
        name: 'Tivi',
        icon: IconTV,
        path: '/tv',
    },
    {
        name: 'Phim lẻ',
        icon: IconPhimLe,
        path: '/phim-le',
    },
    {
        name: 'Phim bộ',
        icon: IconPhimBo,
        path: '/phim-bo',
    },
    {
        name: 'Yêu thích',
        icon: IconYeuThich,
        path: '/yeu-thich',
    },
];

const moreNavItem = [
    // {
    //     name: 'HBOGo',
    //     icon: IconHBOBig,
    //     iconHover: IconHBOSmall,
    //     path: '/hbogo',
    //     position: 6,
    // },
    {
        name: 'SunshineTV',
        icon: IconSunshineTVBig,
        iconHover: IconSunshineTVSmall,
        path: '/sunshinetv',
        position: 7,
    },
];

function SidebarMain(): React.ReactElement {
    const [activeSidebar, setActiveSidebar] = useState(false);
    const [accountInfo, setAccountInfo] = useState({
        name: '',
    });
    const fetchData = async () => {
        if (isLogin()) {
            await sunshineAccountApi.getAccountInfo().then((response) => {
                // console.log('responseTaiKhoan', response);
                if (response && response.data && response.data.data) {
                    setAccountInfo(response.data.data);
                }
            });
            // .catch((error) => {
            //     if (error.response && error.response.status) {
            //         // handleRefreshToken(error.response.status);
            //         setAlreadyRefreshToken(true);
            //     }
            // });
        }
    };
    const showAccount = () => {
        let html = null;
        html = (
            <li className='navItem account'>
                <Link href='/tai-khoan'>
                    <a className='navLink'>
                        <div className='image'>
                            <img
                                src={IconAccount}
                                alt=''
                                className='iconAccount'
                            />
                        </div>
                        <div className='text'>
                            <span className='id'>
                                {accountInfo.name || 'Tài khoản'}
                            </span>
                            {/* <img src={IconVip1} alt='' className='iconVip' /> */}
                        </div>
                    </a>
                </Link>
                <style jsx>{styles}</style>
            </li>
        );
        return html;
    };
    const showNavLink = (LAYOUT_MAIN_ROUTE: LAYOUT_MAIN_ROUTE_type) => {
        let result = null;
        const router = useRouter();
        for (let i = 0; i < moreNavItem.length; i += 1) {
            LAYOUT_MAIN_ROUTE = [
                ...LAYOUT_MAIN_ROUTE.slice(0, moreNavItem[i].position),
                moreNavItem[i],
                ...LAYOUT_MAIN_ROUTE.slice(moreNavItem[i].position),
            ];
        }
        if (LAYOUT_MAIN_ROUTE.length > 0) {
            result = LAYOUT_MAIN_ROUTE.map((route, index: number) => {
                return (
                    <li
                        key={index}
                        className={`navItem ${
                            router.pathname === route.path ? 'active' : ''
                        }`}
                    >
                        <Link key={index} href={route.path}>
                            <a className='navLink'>
                                <div className='image'>
                                    <img src={route.icon} alt={route.name} />
                                </div>
                                <span className='text'>
                                    {route.iconHover ? (
                                        <img
                                            src={route.iconHover}
                                            alt=''
                                            className='iconSmall'
                                        />
                                    ) : (
                                        route.name
                                    )}
                                </span>
                            </a>
                        </Link>
                        <style jsx>{styles}</style>
                    </li>
                );
            });
        }
        return result;
    };
    const showClassActiveSidebar = (activeSidebar: boolean) => {
        return activeSidebar ? 'activeSidebar' : '';
    };
    const setClassActiveSidebar = (status: boolean) => {
        setActiveSidebar(status);
    };
    useEffect(() => {
        fetchData();
    }, []);
    return (
        <nav className={`navBarMain ${showClassActiveSidebar(activeSidebar)}`}>
            <ul
                className='nav'
                onMouseEnter={() => setClassActiveSidebar(true)}
                onMouseLeave={() => setClassActiveSidebar(false)}
            >
                {showAccount()}
                {showNavLink(LAYOUT_MAIN_ROUTE)}
            </ul>
            <style jsx>{styles}</style>
        </nav>
    );
}

export default SidebarMain;
