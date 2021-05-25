import React, { useEffect, useState } from 'react';
import { sunshineAccountApi } from '../../../commons/API/sunshineAccountApi';
import LayoutTaiKhoan from '../../../layouts/LayoutTaiKhoan';
import { ComponentLayout } from '../../../models/ComponentModel';
import styles from '../../../styles/tai-khoan/lich-su-giao-dich/styles';

type listLichSuGiaoDichType = {
    transaction_text: string;
    description: string;
    trans_dt: string;
}[];
const LichSuGiaoDich: ComponentLayout = () => {
    const [listLichSuGiaoDich, setListLichSuGiaoDich] = useState([]);
    const fetchData = () => {
        sunshineAccountApi
            .getMyTransaction()
            .then((response) => {
                // console.log('response', response);
                if (response && response.data.data) {
                    setListLichSuGiaoDich(response.data.data);
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

    const renderListLichSuGiaoDich = (
        listLichSuGiaoDich: listLichSuGiaoDichType,
    ) => {
        let html = null;
        if (listLichSuGiaoDich && listLichSuGiaoDich.length) {
            html = listLichSuGiaoDich.map((singleLichSu, index) => {
                return (
                    <div className='rowContent' key={index}>
                        <div className='label'>
                            {singleLichSu.transaction_text}
                            <p className='textSmall'>
                                {singleLichSu.description}
                            </p>
                        </div>
                        <div className='value'>{singleLichSu.trans_dt}</div>
                        <style jsx>{styles}</style>
                    </div>
                );
            });
        } else {
            return 'Không có danh sách';
        }
        return html;
    };
    return (
        <div className='lichSuGiaoDichWrapper'>
            <div className='list'>
                {renderListLichSuGiaoDich(listLichSuGiaoDich)}
            </div>
            <style jsx>{styles}</style>
        </div>
    );
};

LichSuGiaoDich.Layout = LayoutTaiKhoan;

export default LichSuGiaoDich;
