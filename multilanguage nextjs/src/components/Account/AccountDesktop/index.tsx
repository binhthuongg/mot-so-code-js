import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { sunshineAccountApi } from '../../../commons/API/sunshineAccountApi';
import { modalStyles } from '../../../constants/theme';
import LayoutTaiKhoan from '../../../layouts/LayoutTaiKhoan';
import { ComponentLayout } from '../../../models/ComponentModel';
import { thietBiModel } from '../../../models/utils';
import IconChecked from './images/ant-design_check-square-outlined.svg';
import IconNoCheck from './images/ant-design_square-outlined.svg';
import styles from './styles';

type listThietBiType = thietBiModel[];

const AccountDesktop: ComponentLayout = () => {
    const [listThietBi, setListThietBi] = useState<listThietBiType>([]);
    const [alreadyDeleteDevice, setAlreadyDeleteDevice] = useState(false);
    const [isShowPopup, setIsShowPopup] = useState(false);
    const [accountInfo, setAccountInfo] = useState({
        name: '',
        email: '',
        device_code: '',
    });
    const fetchData = () => {
        let result = [];
        sunshineAccountApi
            .getAccountInfo()
            .then((response) => {
                // console.log('response', response);
                if (
                    response &&
                    response.data.data &&
                    response.data.data.device_login_now
                ) {
                    result = response.data.data.device_login_now;
                    result.map((single: thietBiModel) => {
                        single.checked = false;
                        return null;
                    });
                    setListThietBi(result);
                }
                if (response && response.data.data) {
                    setAccountInfo(response.data.data);
                }
            })
            .catch((error) => {
                // eslint-disable-next-line no-console
                console.log('error', error);
                return '';
            });
    };
    useEffect(() => {
        fetchData();
    }, [alreadyDeleteDevice]);
    const chooseThietBi = (singleThietBi: thietBiModel) => {
        singleThietBi.checked = !singleThietBi.checked;
        setListThietBi([...listThietBi]);
    };
    const handleRemoveThietBi = () => {
        const listIdDeviceSelected: string[] = [];
        listThietBi.map((singleThietBi) => {
            if (singleThietBi.checked) {
                listIdDeviceSelected.push(singleThietBi.device_code);
            }
            return null;
        });
        sunshineAccountApi
            .deleteDevice(listIdDeviceSelected)
            .then((response) => {
                // eslint-disable-next-line no-console
                console.log('response', response);
                setAlreadyDeleteDevice(!alreadyDeleteDevice);
                setIsShowPopup(true);
            })
            .catch((error) => {
                // eslint-disable-next-line no-console
                console.log('error', error);
            });
    };

    const renderListThietBi = (listThietBi: listThietBiType) => {
        let html = [];
        html = listThietBi.map((singleThietBi, index) => {
            return (
                <div
                    key={index}
                    className={`rowThietBi ${
                        singleThietBi.is_logging ? 'is_logging' : ''
                    }`}
                    onClick={() => chooseThietBi(singleThietBi)}
                    role='button'
                    tabIndex={0}
                >
                    <div className='label'>
                        {singleThietBi.device_name}
                        <p className='textSmall'>
                            {`????ng nh???p l???n cu???i ${singleThietBi.login_time}`}
                        </p>
                    </div>
                    <div className='value'>
                        <div className='icon'>
                            <img
                                src={
                                    singleThietBi.checked
                                        ? IconChecked
                                        : IconNoCheck
                                }
                                alt=''
                            />
                        </div>
                    </div>
                    <style jsx>{styles}</style>
                </div>
            );
        });
        return html;
    };
    const handleClosePopup = () => {
        setIsShowPopup(false);
    };
    const renderPopup = () => {
        if (!isShowPopup) {
            return;
        }

        // const html = <p>{textPopup}</p>;
        const html = (
            <Modal isOpen={isShowPopup} style={modalStyles}>
                X??a th??nh c??ng
                <div className='listButtons'>
                    <button
                        type='button'
                        className='button'
                        onClick={() => handleClosePopup()}
                    >
                        ????ng
                    </button>
                </div>
            </Modal>
        );
        return html;
    };
    return (
        <div className='TaiKhoanWrapper'>
            <h2 className='pageTitle'>Th??ng tin t??i kho???n</h2>
            <div className='information'>
                <div className='rowContent'>
                    <h3 className='label'>T??n ????ng nh???p</h3>
                    <div className='value'>
                        {accountInfo.name || '??ang c???p nh???t t??n ????ng nh???p'}
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
                        {accountInfo.device_code || '??ang c???p nh???t m?? thi???t b???'}
                    </div>
                </div>
            </div>
            <div className='thietBiDangNhap'>
                <div className='sectionHeader'>
                    <div className='rowContent'>
                        <div className='title'>
                            <h2>C??c thi???t b??? ???? ????ng nh???p</h2>
                        </div>
                        <div className='value'>
                            {listThietBi.length > 0 ? (
                                <button
                                    type='button'
                                    className='button'
                                    onClick={() => handleRemoveThietBi()}
                                >
                                    Xo?? thi???t b???
                                </button>
                            ) : (
                                ''
                            )}
                        </div>
                    </div>
                </div>
                <div className='listThietBi'>
                    {listThietBi.length > 0
                        ? renderListThietBi(listThietBi)
                        : 'Kh??ng c?? thi???t b??? n??o'}
                </div>
            </div>
            {renderPopup()}
            <style jsx>{styles}</style>
        </div>
    );
};

AccountDesktop.Layout = LayoutTaiKhoan;

export default AccountDesktop;
