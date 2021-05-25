import React, { useEffect, useState } from 'react';
import { sunshineAccountApi } from '../../../commons/API/sunshineAccountApi';
import LayoutTaiKhoan from '../../../layouts/LayoutTaiKhoan';
import { ComponentLayout } from '../../../models/ComponentModel';
import IconChecked from './images/ant-design_check-square-outlined.svg';
import IconNoCheck from './images/ant-design_square-outlined.svg';
import styles from './styles.module.scss';

type listIdSelectType = number[];
type listThietBiType = {
    id: number;
    device_name: string;
    last_login: string;
    is_logging: boolean;
}[];

const TaiKhoan: ComponentLayout = () => {
    const [listThietBi, setListThietBi] = useState([
        {
            id: 1,
            device_name: 'Sony Smart TV Android',
            last_login: '10 tháng 10, 2020 11:11 AM',
            is_logging: true,
        },
        {
            id: 2,
            device_name: 'Iphone 1',
            last_login: '10 tháng 10, 2020 11:11 AM',
            is_logging: false,
        },
        {
            id: 3,
            device_name: 'Iphone 12',
            last_login: '10 tháng 10, 2020 11:11 AM',
            is_logging: true,
        },
        {
            id: 4,
            device_name: 'Iphone 13',
            last_login: '10 tháng 10, 2020 11:11 AM',
            is_logging: false,
        },
        {
            id: 5,
            device_name: 'Iphone 14',
            last_login: '10 tháng 10, 2020 11:11 AM',
            is_logging: false,
        },
    ]);
    const [accountInfo, setAccountInfo] = useState({
        name: '',
        email: '',
        device_code: '',
    });
    const fetchData = () => {
        sunshineAccountApi.getAccountInfo().then((response) => {
            console.log('response', response);
            if (
                response &&
                response.data.data &&
                response.data.data.device_login_now
            ) {
                setListThietBi(response.data.data.device_login_now);
            }
            if (response && response.data.data) {
                setAccountInfo(response.data.data);
            }
        });
    };
    useEffect(() => {
        fetchData();
    }, []);
    const listIdSelect: listIdSelectType = [];
    const listThietBiId = [];
    for (let index = 0; index < listThietBi.length; index += 1) {
        listThietBiId.push(listThietBi[index].id);
        if (listThietBi[index].is_logging) {
            listIdSelect.push(listThietBi[index].id);
        }
    }
    const chooseThietBi = (id: number) => {
        const index = listThietBi.findIndex((listThietBi) => {
            return listThietBi.id === id;
        });
        listThietBi[index].is_logging = !listThietBi[index].is_logging;
        setListThietBi([...listThietBi]);
    };
    const handleRemoveThietBi = (listIdSelect: listIdSelectType) => {
        // listConLai là listThietBi filter ra những thiết bị có id khác id trong listIdSelect
        const listConLai = listThietBi.filter((thietBi) => {
            return listIdSelect.indexOf(thietBi.id) < 0;
        });
        setListThietBi(listConLai);
    };

    const renderListThietBi = (listThietBi: listThietBiType) => {
        const html = [];
        for (let i = 0; i < listThietBi.length; i += 1) {
            html.push(
                <div
                    key={i}
                    className={`${styles.rowThietBi} ${
                        listThietBi[i].is_logging ? styles.is_logging : ''
                    }`}
                    onClick={() => chooseThietBi(listThietBi[i].id)}
                    role='button'
                    tabIndex={0}
                >
                    <div className={styles.label}>
                        {listThietBi[i].device_name}
                        <p className={styles.textSmall}>
                            Đăng nhập lần cuối
                            {listThietBi[i].last_login}
                        </p>
                    </div>
                    <div className={styles.value}>
                        <div className={styles.icon}>
                            <img
                                src={
                                    listThietBi[i].is_logging
                                        ? IconChecked
                                        : IconNoCheck
                                }
                                alt=''
                            />
                        </div>
                    </div>
                </div>,
            );
        }
        return html;
    };
    return (
        <div className={styles.TaiKhoanWrapper}>
            <div className={styles.information}>
                <div className={styles.rowContent}>
                    <div className={styles.label}>Tên đăng nhập</div>
                    <div className={styles.value}>
                        {accountInfo.name || 'Đang cập nhật tên đăng nhập'}
                    </div>
                </div>
                <div className={styles.rowContent}>
                    <div className={styles.label}>Email</div>
                    <div className={styles.value}>
                        {accountInfo.email || 'Đang cập nhật email'}
                    </div>
                </div>
                <div className='rowContent'>
                    <div className='label'>Mã thiết bị</div>
                    <div className='value'>
                        {accountInfo.device_code || 'Đang cập nhật mã thiết bị'}
                    </div>
                </div>
            </div>
            <div className={styles.thietBiDangNhap}>
                <div className={styles.sectionHeader}>
                    <div className={styles.rowContent}>
                        <div className={styles.label}>
                            <p className={styles.textSmall}>
                                Các thiết bị đã đăng nhập
                            </p>
                        </div>
                        <div className={styles.value}>
                            {listThietBi.length > 0 ? (
                                <button
                                    type='button'
                                    className={styles.button}
                                    onClick={() =>
                                        handleRemoveThietBi(listIdSelect)
                                    }
                                >
                                    Xoá thiết bị
                                </button>
                            ) : (
                                ''
                            )}
                        </div>
                    </div>
                </div>
                <div className={styles.listThietBi}>
                    {listThietBi.length > 0
                        ? renderListThietBi(listThietBi)
                        : 'Không có thiết bị nào'}
                </div>
            </div>
        </div>
    );
};

TaiKhoan.Layout = LayoutTaiKhoan;

export default TaiKhoan;
