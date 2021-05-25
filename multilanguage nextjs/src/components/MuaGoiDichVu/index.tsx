import dynamic from 'next/dynamic';
import React from 'react';
import { isMobileOnly } from 'react-device-detect';
import MuaGoiDichVuDesktop from './Desktop';
import MuaGoiDichVuMobile from './Mobile';

const Device = dynamic(() => import('../../components/Device'), {
    ssr: false,
});

function ComponentMuaGoiDichVu(): React.ReactElement {
    return (
        <Device>
            {() => {
                if (isMobileOnly) return <MuaGoiDichVuMobile />;
                return <MuaGoiDichVuDesktop />;
            }}
        </Device>
    );
}

export default ComponentMuaGoiDichVu;
