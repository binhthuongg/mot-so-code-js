import Link from 'next/link';
import QRCode from 'qrcode.react';
import React, { useEffect, useRef, useState } from 'react';
import Modal from 'react-modal';
import { sunshineAccountApi } from '../../../commons/API/sunshineAccountApi';
import * as CONSTANTS from '../../../constants/utils';
import LayoutTaiKhoan from '../../../layouts/LayoutTaiKhoan';
import { ComponentLayout } from '../../../models/ComponentModel';
import { PackageModel, PackageOrderModel } from '../../../models/utils';
import styles from '../../../styles/profile/mua-goi-dich-vu/styles';
import { modalStyles } from '../../../constants/theme';
import ImageLabelSale from './images/label-sale.svg';

const MuaGoiDichVu: ComponentLayout = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isShowPopup, setIsShowPopup] = useState(false);
    const [shouldUpdate, setShouldUpdate] = useState(0);
    const [textPopup, setTextPopup] = useState('');
    const [listPackage, setListPackage] = useState<PackageModel[]>([]);
    const activeIndexRef = useRef(0); // để lưu giá trị của activeIndex
    const isSetInterval = useRef(true); // để check điều kiện setInterval
    const timeOutValue = useRef(0); // để lưu giá trị của hàm setTimeout, dùng để clear
    const listPackageRef = useRef<PackageModel[]>([]); // để lưu giá trị của listPackage

    const getPackageOrder = (trans_id: number) => {
        sunshineAccountApi.getPackageOrderStatus(trans_id).then((response) => {
            console.log('response', response.data.data);
            if (response.data.data && response.data.data.trans_st !== 0) {
                setTextPopup(response.data.data.trans_text);
                isSetInterval.current = false;
                setIsShowPopup(true);
                clearInterval(timeOutValue.current);
            } else {
                setIsShowPopup(false);
            }
        });
    };

    const functionGetPackageOrder = () => {
        if (isSetInterval.current) {
            timeOutValue.current = window.setInterval(() => {
                console.log('222');
                const activeIndexNumber = activeIndexRef.current;
                if (
                    listPackageRef &&
                    listPackageRef.current &&
                    listPackageRef.current[activeIndexNumber] &&
                    listPackageRef.current[activeIndexNumber].packageOrder &&
                    listPackageRef.current[activeIndexNumber].packageOrder
                        .trans_id
                ) {
                    getPackageOrder(
                        listPackageRef.current[activeIndexNumber].packageOrder
                            .trans_id,
                    );
                }
            }, CONSTANTS.TIME_GET_PACKAGE_ORDER_STATUS);
        }
    };

    const updateComponent = () => {
        setShouldUpdate(shouldUpdate + 1);
    };

    const pushData = (index: number, packageOrder: PackageOrderModel) => {
        listPackageRef.current[index].packageOrder = packageOrder;
    };

    const createQrCode = async () => {
        if (
            listPackageRef.current[activeIndexRef.current] &&
            !listPackageRef.current[activeIndexRef.current].showQR
        ) {
            await sunshineAccountApi
                .packageOrder(listPackageRef.current[activeIndexRef.current].id)
                .then((response) => {
                    pushData(activeIndexRef.current, response.data.data);
                    listPackageRef.current[
                        activeIndexRef.current
                    ].showQR = true;
                });
            isSetInterval.current = true;
            updateComponent();
        }
    };

    const changeActiveIndex = (id: string) => {
        const numberIndex = listPackage.findIndex((singlePackage) => {
            return singlePackage.id === id;
        });
        setActiveIndex(numberIndex);
        activeIndexRef.current = numberIndex;
        if (
            listPackageRef.current[activeIndexRef.current] &&
            listPackageRef.current[activeIndexRef.current].packageOrder &&
            !listPackageRef.current[activeIndexRef.current].showQR
        ) {
            isSetInterval.current = true;
            clearInterval(timeOutValue.current);
        }
        createQrCode();
    };

    const renderListPackage = () => {
        let html = null;
        html = listPackage.map((singlePackage, index) => {
            return (
                <div
                    className={`item ${index === activeIndex ? 'active' : ''}`}
                    key={index}
                    onClick={() => changeActiveIndex(singlePackage.id)}
                    role='button'
                    tabIndex={0}
                >
                    <img src={singlePackage.image_link} alt='' />
                    <style jsx>{styles}</style>
                </div>
            );
        });
        return html;
    };
    const handleClosePopup = () => {
        setIsShowPopup(false);
        isSetInterval.current = true;
        functionGetPackageOrder();
    };

    const renderPopup = () => {
        if (!isShowPopup) {
            return;
        }

        // const html = <p>{textPopup}</p>;
        const html = (
            <Modal isOpen={isShowPopup} style={modalStyles}>
                {textPopup}
                <div className='listButtons'>
                    <Link href='/profile/dich-vu-da-mua/'>
                        <a>
                            <button type='button'>Xem dịch vụ đã mua</button>
                        </a>
                    </Link>
                    <button type='button' onClick={() => handleClosePopup()}>
                        Đóng
                    </button>
                </div>
            </Modal>
        );
        return html;
    };
    let result: PackageModel[] = [];
    const fetchData = async () => {
        await sunshineAccountApi
            .getPackages()
            .then((response) => {
                if (response && response.data.data) {
                    result = response.data.data;
                    listPackageRef.current = response.data.data;
                }
            })
            .then(() => {
                functionGetPackageOrder();
                console.log('listPackageRef.current', listPackageRef.current);
                createQrCode();
                setListPackage(result);
            })
            .catch((error) => {
                console.log('error', error);
            });
    };
    useEffect(() => {
        fetchData();
        return () => clearInterval(timeOutValue.current);
    }, []);
    const showQRImage = () => {
        let html = null;
        if (
            listPackageRef.current[activeIndexRef.current] &&
            listPackageRef.current[activeIndexRef.current].packageOrder &&
            listPackageRef.current[activeIndexRef.current].packageOrder.qr_code
        ) {
            html = (
                <div className='qrImage'>
                    <QRCode
                        value={
                            listPackageRef.current[activeIndexRef.current]
                                .packageOrder.qr_code
                        }
                        size={400}
                        level='H'
                        includeMargin
                    />
                    <style jsx>{styles}</style>
                </div>
            );
        }
        return html;
    };

    const renderQRImage = () => {
        let html = null;
        html = showQRImage();
        return html;
    };
    return (
        <div className='muaGoiDichVuWrapper'>
            <div className='labelSale'>
                <p className='price'>
                    <span className='number'>
                        {`${
                            listPackage[activeIndex]
                                ? listPackage[activeIndex].amount
                                : ''
                        }  `}
                    </span>
                    / tháng
                </p>
                <img src={ImageLabelSale} alt='' className='imageLabelSale' />
            </div>
            <header className='header'>
                <h1>
                    {`${
                        listPackage[activeIndex]
                            ? listPackage[activeIndex].name
                            : ''
                    }  `}
                </h1>
                <p className='description'>
                    {`${
                        listPackage[activeIndex]
                            ? listPackage[activeIndex].description
                            : ''
                    }  `}
                </p>
            </header>
            <div className='mainContent'>
                <div className='sectionQrPay'>
                    <h2 className='title'>Thanh toán bằng VNPayQR</h2>
                    <p className='description'>
                        (*) Sử dụng tính năng quét mã QR trong ứng dụng ngân
                        hàng để thanh toán
                    </p>
                    <div className='qrImageWrapper'>{renderQRImage()}</div>
                </div>
                <div className='sectionChuyenKhoan'>
                    <h2 className='title'>hoặc Chuyển khoản</h2>
                    <p className='description'>
                        (*) Chuyển khoản theo cú pháp dưới đây
                    </p>
                    <div className='formChuyenKhoanWrapper'>
                        <h4 className='title'>Chuyển đến:</h4>
                        <div className='formChuyenKhoan'>
                            <div className='rowChuyenKhoan'>
                                <div className='label'>Nội dung</div>
                                <div className='value'>
                                    {`${
                                        listPackage[activeIndex] &&
                                        listPackage[activeIndex].packageOrder &&
                                        listPackage[activeIndex].packageOrder
                                            .booking_no
                                            ? listPackage[activeIndex]
                                                  .packageOrder.booking_no
                                            : ''
                                    }  `}
                                </div>
                            </div>
                            <div className='rowChuyenKhoan'>
                                <div className='label'>Số tiền</div>
                                <div className='value'>
                                    {`${
                                        listPackage[activeIndex]
                                            ? listPackage[activeIndex].amount
                                            : ''
                                    }  `}
                                </div>
                            </div>
                            <div className='rowChuyenKhoan'>
                                <div className='label'>Số tài khoản</div>
                                <div className='value'>
                                    {`${
                                        listPackage[activeIndex]
                                            ? listPackage[activeIndex].bank_num
                                            : ''
                                    }  `}
                                </div>
                            </div>
                            <div className='rowChuyenKhoan'>
                                <div className='label'>Ngân hàng</div>
                                <div className='value'>
                                    {`${
                                        listPackage[activeIndex]
                                            ? listPackage[activeIndex].bank_name
                                            : ''
                                    }  `}
                                </div>
                            </div>
                            <div className='rowChuyenKhoan'>
                                <div className='label'>Chủ tài khoản</div>
                                <div className='value'>
                                    {`${
                                        listPackage[activeIndex]
                                            ? listPackage[activeIndex].bank_acc
                                            : ''
                                    }  `}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='list'>{renderListPackage()}</div>
            {renderPopup()}
            <style jsx>{styles}</style>
        </div>
    );
};

MuaGoiDichVu.Layout = LayoutTaiKhoan;

export default MuaGoiDichVu;
