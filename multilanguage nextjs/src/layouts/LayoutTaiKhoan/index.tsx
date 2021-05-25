import dynamic from 'next/dynamic';
import React from 'react';
import { isMobileOnly } from 'react-device-detect';
import Header from '../../components/Header';
import SidebarTaiKhoan from '../../components/Sidebar/SidebarTaiKhoan';
import styles, { taiKhoanGlobalStyles } from './styles';
import ImageLayout from './images/ImageLayout.png';

type PropType = {
    children?: React.ReactNode;
};

const Device = dynamic(() => import('../../components/Device'), {
    ssr: false,
});

function LayoutTaiKhoan(props: PropType): React.ReactElement {
    const renderSideBarTaiKhoan = () => {
        return (
            <Device>
                {() => {
                    if (isMobileOnly) return <></>;
                    return <SidebarTaiKhoan />;
                }}
            </Device>
        );
    };
    return (
        <>
            <Header />
            <div className='layoutTaiKhoanWrapper'>
                <div className='background'>
                    <img src={ImageLayout} alt='' />
                </div>
                <div className='layoutContent'>
                    <div className='rowContainer'>
                        <div className='layout'>
                            {renderSideBarTaiKhoan()}
                            <div className='layoutMain'>{props.children}</div>
                        </div>
                    </div>
                </div>
                <style jsx>{styles}</style>
                <style jsx>{taiKhoanGlobalStyles}</style>
            </div>
        </>
    );
}

export default LayoutTaiKhoan;
