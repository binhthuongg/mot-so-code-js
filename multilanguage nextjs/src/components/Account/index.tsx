import dynamic from 'next/dynamic';
import React from 'react';
import { isMobileOnly } from 'react-device-detect';
import AccountDesktop from './AccountDesktop';
import AccountMobile from './AccountMobile';

const Device = dynamic(() => import('../../components/Device'), {
    ssr: false,
});

function Account(): React.ReactElement {
    return (
        <Device>
            {() => {
                if (isMobileOnly) return <AccountMobile />;
                return <AccountDesktop />;
            }}
        </Device>
    );
}

export default Account;
