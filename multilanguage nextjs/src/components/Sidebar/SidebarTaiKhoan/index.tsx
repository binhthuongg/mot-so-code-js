import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import React from 'react';
import styles from './styles';

type routeType = {
    name: string;
    path: string;
};
type LAYOUT_PROFILE_ROUTE_type = routeType[];

const LAYOUT_PROFILE_ROUTE = [
    {
        name: 'Trang chủ',
        path: '/',
    },
    {
        name: 'Tài khoản',
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

function SidebarTaiKhoan(): React.ReactElement {
    const router = useRouter();
    const showNavLink = (LAYOUT_PROFILE_ROUTE: LAYOUT_PROFILE_ROUTE_type) => {
        let result = null;
        if (LAYOUT_PROFILE_ROUTE.length > 0) {
            result = LAYOUT_PROFILE_ROUTE.map((route, index) => {
                return (
                    <li
                        key={index}
                        className={`navItem ${
                            router.pathname === route.path ? 'active' : ''
                        } ${
                            route.path === '/tai-khoan/dang-xuat'
                                ? 'log-out'
                                : ''
                        }`}
                    >
                        <Link href={route.path} key={index}>
                            <a className='navLink'>{route.name}</a>
                        </Link>
                        <style jsx>{styles}</style>
                    </li>
                );
            });
        }
        return result;
    };
    return (
        <nav className='navBar navBarProfile'>
            <ul className='nav'>{showNavLink(LAYOUT_PROFILE_ROUTE)}</ul>
            <style jsx>{styles}</style>
        </nav>
    );
}

export default SidebarTaiKhoan;
