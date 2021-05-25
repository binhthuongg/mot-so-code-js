import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import React from 'react';
import IconLogoHBO from './images/IconLogoHBO.svg';
import styles from './styles';

function ChanelHeader(): React.ReactElement {
    type chanelNavigationType = {
        name: string;
        url: string;
    }[];
    const chanelNavigation = [
        {
            name: 'Trang chủ',
            url: '/hbogo',
        },
        {
            name: 'Phim lẻ',
            url: '/hbogo/phim-le',
        },
        {
            name: 'Phim bộ',
            url: '/hbogo/phim-bo',
        },
        {
            name: 'Châu Á',
            url: '/hbogo/chau-a',
        },
        {
            name: 'Truyền hình',
            url: '/hbogo/truyen-hinh',
        },
        {
            name: 'Tài liệu',
            url: '/hbogo/tai-lieu',
        },
        {
            name: 'Thiếu nhi & Gia đình',
            url: '/hbogo/thieu-nhi-gia-dinh',
        },
    ];
    const router = useRouter();
    const showNavLink = (chanelNavigation: chanelNavigationType) => {
        let result = null;
        if (chanelNavigation.length > 0) {
            result = chanelNavigation.map((route, index) => {
                return (
                    <li
                        key={index}
                        className={`navItem ${
                            router.pathname === route.url ? 'active' : ''
                        }`}
                    >
                        <Link href={route.url}>
                            <a>
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
    return (
        <div className='ChanelHeader'>
            <div className='sectionNavigation'>
                <ul>{showNavLink(chanelNavigation)}</ul>
            </div>
            <div className='sectionChanelLogo'>
                <div className='logo'>
                    <img src={IconLogoHBO} alt='' />
                </div>
            </div>
            <style jsx>{styles}</style>
        </div>
    );
}

export default ChanelHeader;
