import dynamic from 'next/dynamic';
import React from 'react';
import { isMobileOnly } from 'react-device-detect';
import HeaderDesktop from './HeaderDeskTop';
import HeaderMobile from './HeaderMobile';

const Device = dynamic(() => import('../../components/Device'), {
    ssr: false,
});

function Header(): React.ReactElement {
    return (
        <Device>
            {() => {
                if (isMobileOnly) return <HeaderMobile />;
                return <HeaderDesktop />;
            }}
        </Device>
    );
}

export default Header;
