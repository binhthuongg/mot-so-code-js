import Router from 'next/router';
import React from 'react';
import DrmTokenFunction from '../../../commons/API/drmToken';
import { actionRefreshToken } from '../../../commons/API/getToken';
import { isClientSide } from '../../../commons/utils';
import * as LOCAL_STORAGE from '../../../constants/LocalStorage';
import LayoutTaiKhoan from '../../../layouts/LayoutTaiKhoan';
import { ComponentLayout } from '../../../models/ComponentModel';
import styles from '../../../styles/tai-khoan/dang-xuat/styles';

const DangXuat: ComponentLayout = () => {
    let DrmToken = '';
    const getLocalDrmToken = isClientSide
        ? localStorage.getItem('DRM_TOKEN')
        : '';
    if (getLocalDrmToken) {
        DrmToken = getLocalDrmToken;
    }
    const redirectToLogin = () => {
        Router.push('/dang-nhap');
    };
    const handleDrmTokenEnd = () => {
        DrmTokenFunction.end(DrmToken)
            .then((response) => {
                // eslint-disable-next-line no-console
                console.log('response', response);
            })
            .catch((error) => {
                // eslint-disable-next-line no-console
                console.log('error', error);
                if (error.response && error.response.status === 401) {
                    actionRefreshToken();
                    DrmTokenFunction.end(DrmToken);
                }
            });
    };
    // console.log('DrmToken', DrmToken);
    const handleLogOut = () => {
        if (typeof window !== 'undefined') {
            const deviceCode = localStorage.getItem(LOCAL_STORAGE.DEVICE_CODE);
            localStorage.clear();
            if (deviceCode) {
                localStorage.setItem(LOCAL_STORAGE.DEVICE_CODE, deviceCode);
            }
        }
        if (DrmToken) {
            handleDrmTokenEnd();
        }
        redirectToLogin();
    };
    return (
        <div className='dangXuatWrapper'>
            <div className='rowContainer'>
                <h3 className='text'>Bạn có chắc chắn muốn Đăng xuất?</h3>
                <button type='button' onClick={handleLogOut} className='button'>
                    Đăng xuất
                </button>
            </div>
            <style jsx>{styles}</style>
        </div>
    );
};

DangXuat.Layout = LayoutTaiKhoan;

export default DangXuat;
