import React, { useEffect, useState } from 'react';
import { sunshineAccountApi } from '../../../commons/API/sunshineAccountApi';
import LayoutTaiKhoan from '../../../layouts/LayoutTaiKhoan';
import { ComponentLayout } from '../../../models/ComponentModel';
import styles from '../../../styles/tai-khoan/dich-vu-da-mua/styles';

type listDichVuDaMuaType = {
    package_name?: string;
    expiry_str?: string;
}[];
const DichVuDaMua: ComponentLayout = () => {
    const [listDichVuDaMua, setListDichVuDaMua] = useState([]);
    const renderListDichVuDaMua = (listDichVuDaMua: listDichVuDaMuaType) => {
        let html = [];
        if (listDichVuDaMua && listDichVuDaMua.length) {
            html = listDichVuDaMua.map((singleDichVu, index) => {
                return (
                    <div className='rowContent' key={index}>
                        <div className='label'>
                            {singleDichVu.package_name}
                            <p className='textSmall'>
                                {singleDichVu.expiry_str}
                            </p>
                        </div>
                        <div className='value'>
                            <button type='button' className='button'>
                                Gia hạn
                            </button>
                        </div>
                        <style jsx>{styles}</style>
                    </div>
                );
            });
        } else {
            return 'Không có danh sách';
        }
        return html;
    };
    const fetchData = () => {
        sunshineAccountApi
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
    return (
        <div className='dichVuDaMuaWrapper'>
            <h2 className='pageTitle'>Dịch vụ đã mua</h2>
            <div className='list'>{renderListDichVuDaMua(listDichVuDaMua)}</div>
            <style jsx>{styles}</style>
        </div>
    );
};

DichVuDaMua.Layout = LayoutTaiKhoan;

export default DichVuDaMua;
