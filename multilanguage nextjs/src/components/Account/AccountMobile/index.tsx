import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { sunshineAccountApi } from '../../../commons/API/sunshineAccountApi';
import LayoutTaiKhoan from '../../../layouts/LayoutTaiKhoan';
import { ComponentLayout } from '../../../models/ComponentModel';
import { MyPackageModel } from '../../../models/utils';
import styles from './styles';

const AccountMobile: ComponentLayout = () => {
    const [listDichVuDaMua, setListDichVuDaMua] = useState<MyPackageModel[]>(
        [],
    );
    const [accountInfo, setAccountInfo] = useState({
        name: '',
        email: '',
        device_code: '',
    });
    const fetchData = async () => {
        await sunshineAccountApi
            .getAccountInfo()
            .then((response) => {
                // console.log('response', response);
                if (response && response.data.data) {
                    setAccountInfo(response.data.data);
                }
            })
            .catch((error) => {
                // eslint-disable-next-line no-console
                console.log('error', error);
                return '';
            });
        await sunshineAccountApi
            .getMyPackage()
            .then((response) => {
                // console.log('response', response);
                if (response && response.data.data) {
                    setListDichVuDaMua(response.data.data);
                }
            })
            .catch((error) => {
                // eslint-disable-next-line no-console
                console.log('error', error.response);
                return '';
            });
    };
    useEffect(() => {
        fetchData();
    }, []);

    const renderListPackages = () => {
        let html = null;
        if (listDichVuDaMua && listDichVuDaMua.length) {
            html = listDichVuDaMua.map((singleDichVu, index) => {
                return (
                    <div className='rowContent' key={index}>
                        <div className='label'>
                            {singleDichVu.package_name}
                            <p className='description'>
                                {singleDichVu.expiry_str}
                            </p>
                        </div>
                        <style jsx>{styles}</style>
                    </div>
                );
            });
        } else {
            return 'Kh??ng c?? danh s??ch';
        }
        return html;
    };
    const renderLinkToGetPackages = () => {
        let html = null;
        html = (
            <div className='linkGetPackages'>
                <div className='rowContainer'>
                    <Link href='/tai-khoan/mua-goi-dich-vu'>
                        <a>Mua g??i</a>
                    </Link>
                </div>
                <style jsx>{styles}</style>
            </div>
        );
        return html;
    };
    const renderLogOut = () => {
        let html = null;
        html = (
            <div className='logout'>
                <div className='rowContainer'>
                    <Link href='/tai-khoan/dang-xuat'>
                        <a>????ng xu???t</a>
                    </Link>
                </div>
                <style jsx>{styles}</style>
            </div>
        );
        return html;
    };
    return (
        <div className='TaiKhoanWrapper TaiKhoanMobile'>
            <h2 className='mobilePageTitle'>
                <div className='rowContainer'>T??i kho???n</div>
            </h2>
            <div className='sectionTaiKhoan'>
                <h2 className='sectionTitle'>
                    <div className='rowContainer'>T??i kho???n</div>
                </h2>
                <div className='list'>
                    <div className='rowContainer'>
                        <div className='rowContent'>
                            <h3 className='label'>T??n ????ng nh???p</h3>
                            <div className='value'>
                                {accountInfo.name ||
                                    '??ang c???p nh???t t??n ????ng nh???p'}
                            </div>
                        </div>
                        <div className='rowContent'>
                            <h3 className='label'>Email</h3>
                            <div className='value'>
                                {accountInfo.email || '??ang c???p nh???t email'}
                            </div>
                        </div>
                        <div className='rowContent'>
                            <h3 className='label'>M?? thi???t b???</h3>
                            <div className='value'>
                                {accountInfo.device_code ||
                                    '??ang c???p nh???t m?? thi???t b???'}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='sectionPackages'>
                <h2 className='sectionTitle'>
                    <div className='rowContainer'>G??i c???a b???n</div>
                </h2>
                <div className='list'>
                    <div className='rowContainer'>{renderListPackages()}</div>
                </div>
                {renderLinkToGetPackages()}
            </div>
            {renderLogOut()}
            <style jsx>{styles}</style>
        </div>
    );
};

AccountMobile.Layout = LayoutTaiKhoan;

export default AccountMobile;
