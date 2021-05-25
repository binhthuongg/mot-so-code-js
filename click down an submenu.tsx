import Link from 'next/link';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import QRCode from 'qrcode.react';
import React, { useEffect, useRef, useState } from 'react';
import Modal from 'react-modal';
import { sunshineAccountApi } from '../../../commons/API/sunshineAccountApi';
import { modalStyles } from '../../../constants/theme';
import * as CONSTANTS from '../../../constants/utils';
import LayoutTaiKhoan from '../../../layouts/LayoutTaiKhoan';
import { ComponentLayout } from '../../../models/ComponentModel';
import {
    MyPackageModel,
    PackageModel,
    PackageOrderModel,
} from '../../../models/utils';
import ImageVNPayMobile from './images/ImageVNPayMobile.svg';
import styles from './styles';

const listScreen = {
    listPackages: 'listPackages',
    packageDetail: 'packageDetail',
    payPackage: 'payPackage',
};

/**
 * Có 3 screens: listPackages, packageDetails, payPackage
 * render tương ứng
 */
const MuaGoiDichVuMobile: ComponentLayout = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isShowPopup, setIsShowPopup] = useState(false);
    const [textPopup, setTextPopup] = useState('');
    const [title, setTitle] = useState('Gói cước');
    const [listPackage, setListPackage] = useState<PackageModel[]>([]);
    const [
        selectedPackageOrder,
        setSelectedPackageOrder,
    ] = useState<PackageOrderModel>({
        id: '',
        user_id: '',
        package_id: '',
        booking_no: '',
        qr_code: '',
        trans_id: 0,
        expire_date: '',
    });
    const [screen, setScreen] = useState(listScreen.listPackages);
    const [listDichVuDaMua, setListDichVuDaMua] = useState<MyPackageModel[]>(
        [],
    );
    const [copiedNoiDungStatus, setCopiedNoiDungStatus] = useState(false);
    const [copiedSoTienStatus, setCopiedSoTienStatus] = useState(false);
    const [copiedTaiKhoanStatus, setCopiedTaiKhoanStatus] = useState(false);
    const copyNoiDungRef = useRef<HTMLDivElement>(null);
    const copySoTienRef = useRef<HTMLDivElement>(null);
    const copyTaiKhoanRef = useRef<HTMLDivElement>(null);
    /**
     * để check điều kiện setInterval
     */
    const isSetInterval = useRef(false);

    /**
     * để lưu giá trị của hàm setTimeout, dùng để clear
     */
    const timeOutValue = useRef(0);

    const getPackageOrder = (trans_id: number) => {
        sunshineAccountApi.getPackageOrderStatus(trans_id).then((response) => {
            console.log('response', response.data.data);
            /**
             * nếu tran_st khác 0 thì mới hiện popup
             */
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
        // console.log('isSetInterval.current', isSetInterval.current);
        // console.log('selectedPackageOrder', selectedPackageOrder);
        if (isSetInterval.current) {
            timeOutValue.current = window.setInterval(() => {
                if (selectedPackageOrder && selectedPackageOrder.trans_id) {
                    getPackageOrder(selectedPackageOrder.trans_id);
                }
            }, CONSTANTS.TIME_GET_PACKAGE_ORDER_STATUS);
        }
    };

    const createQrCode = async (packageId: string) => {
        if (listPackage[activeIndex]) {
            await sunshineAccountApi
                .packageOrder(packageId)
                .then((response) => {
                    setSelectedPackageOrder(response.data.data);
                });
        }
    };

    const handleClickSinglePackage = (packageId: string) => {
        const numberIndex = listPackage.findIndex((singlePackage) => {
            return singlePackage.id === packageId;
        });
        setActiveIndex(numberIndex);
        setScreen(listScreen.packageDetail);
        setTitle('Xác nhận');
    };

    const renderListPackage = () => {
        let html = null;
        if (listPackage && listPackage.length) {
            html = listPackage.map((singlePackage, index) => {
                return (
                    <div
                        className='item'
                        key={index}
                        onClick={() =>
                            handleClickSinglePackage(singlePackage.id)
                        }
                        role='button'
                        tabIndex={0}
                    >
                        <h3 className='label'>{singlePackage.name}</h3>
                        <p className='price'>{singlePackage.amount}</p>
                        <style jsx>{styles}</style>
                    </div>
                );
            });
        } else {
            html = 'Không có gói cước nào';
        }
        return html;
    };

    /**
     *
     */
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
                    <Link href='/tai-khoan/dich-vu-da-mua/'>
                        <a>
                            <button className='button' type='button'>
                                Xem dịch vụ đã mua
                            </button>
                        </a>
                    </Link>
                    <button
                        className='button'
                        type='button'
                        onClick={() => handleClosePopup()}
                    >
                        Đóng
                    </button>
                </div>
            </Modal>
        );
        return html;
    };

    /**
     * Tìm list dịch vụ đã mua
     *
     * Set list các gói
     */
    const fetchData = async () => {
        await sunshineAccountApi
            .getMyPackage()
            .then((response) => {
                // console.log('response', response);
                if (response && response.data.data) {
                    setListDichVuDaMua(response.data.data);
                }
            })
            .catch((error) => {
                console.log('error', error.response);
                return '';
            });
        await sunshineAccountApi
            .getPackages()
            .then((response) => {
                if (response && response.data.data) {
                    console.log('response', response);
                    setListPackage(response.data.data);
                }
            })
            .catch((error) => {
                console.log('error', error);
            });
    };
    useEffect(() => {
        console.log('screen', screen);
        if (screen === listScreen.payPackage) {
            functionGetPackageOrder();
        }
    }, [screen]);

    useEffect(() => {
        fetchData();
        return () => clearInterval(timeOutValue.current);
    }, []);
    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        const handleClickOutside = (event: any) => {
            if (
                copyNoiDungRef.current &&
                !copyNoiDungRef.current.contains(event.target)
            ) {
                setCopiedNoiDungStatus(false);
            }
        };

        // Bind the event listener
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [copyNoiDungRef]);
    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        const handleClickOutside = (event: any) => {
            if (
                copySoTienRef.current &&
                !copySoTienRef.current.contains(event.target)
            ) {
                setCopiedSoTienStatus(false);
            }
        };

        // Bind the event listener
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [copySoTienRef]);
    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        const handleClickOutside = (event: any) => {
            if (
                copyTaiKhoanRef.current &&
                !copyTaiKhoanRef.current.contains(event.target)
            ) {
                setCopiedTaiKhoanStatus(false);
            }
        };

        // Bind the event listener
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [copyTaiKhoanRef]);

    const showQRImage = () => {
        let html = null;
        if (selectedPackageOrder && selectedPackageOrder.qr_code) {
            html = (
                <div className='qrImage'>
                    <QRCode
                        value={selectedPackageOrder.qr_code}
                        size={350}
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
        html = (
            <div className='imageWrapper'>
                <img src={ImageVNPayMobile} alt='VNPayImage' />
                {showQRImage()}
                <style jsx>{styles}</style>
            </div>
        );
        return html;
    };
    const renderMobilePageTitle = () => {
        return (
            <div className='mobilePageTitle'>
                <div className='rowContainer'>{title}</div>
            </div>
        );
    };
    const renderMyPackage = () => {
        let html = null;
        if (listDichVuDaMua && listDichVuDaMua.length) {
            html = listDichVuDaMua.map((singleDichVu, index) => {
                return (
                    <div className='rowContent' key={index}>
                        <div className='label'>
                            <p className='name'>{singleDichVu.package_name}</p>
                            <p className='textSmall'>
                                {singleDichVu.expiry_str}
                            </p>
                        </div>
                        <style jsx>{styles}</style>
                    </div>
                );
            });
        } else {
            return 'Bạn chưa có gói đăng ký nào';
        }
        return html;
    };
    const renderMyPackageHtml = () => {
        let html = null;
        html = (
            <div className='listPackagesWrapper'>
                <div className='title'>
                    <div className='rowContainer'>
                        <h2>Gói của bạn</h2>
                    </div>
                </div>
                <div className='list listMyPackages'>
                    <div className='rowContainer'>{renderMyPackage()}</div>
                </div>
                <style jsx>{styles}</style>
            </div>
        );
        return html;
    };
    const renderListPackageHtml = () => {
        let html = null;
        html = (
            <div className='ListAllPackagesWrapper'>
                <div className='title'>
                    <div className='rowContainer'>
                        <h2>Các lựa chọn</h2>
                    </div>
                </div>
                <div className='listAllPackages'>
                    <div className='rowContainer'>{renderListPackage()}</div>
                </div>
                <style jsx>{styles}</style>
            </div>
        );
        return html;
    };
    const renderLinkToMaKichHoatHtml = () => {
        let html = null;
        html = (
            <>
                <div className='link'>
                    <div className='rowContainer'>
                        <div className='inner'>
                            <Link href='/tai-khoan/ma-kich-hoat'>
                                <a>Nhập code được tặng</a>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className='description'>
                    <div className='rowContainer'>
                        Nếu bạn có code được tặng hãy nhập code ở trên, bạn sẽ
                        được xem miễn phí các nội dung HBO GO
                    </div>
                </div>
                <style jsx>{styles}</style>
            </>
        );
        return html;
    };
    const renderPackageDetailHtml = () => {
        let html = null;
        const selectedPackage = listPackage[activeIndex];
        html = (
            <>
                <div className='rowContainer'>
                    <img
                        src={selectedPackage.image_link}
                        alt=''
                        className='packageImage'
                    />
                    <h3 className='label'>Gói lựa chọn</h3>
                    <div className='packageName'>
                        <h3 className='name'>{selectedPackage.name}</h3>
                    </div>
                    <div className='packagePrice'>{selectedPackage.amount}</div>
                </div>
                <style jsx>{styles}</style>
            </>
        );
        return html;
    };
    const handleClickCheckout = async (packageId: string) => {
        isSetInterval.current = true;
        await createQrCode(packageId);
        setScreen(listScreen.payPackage);
        setTitle('Thông tin chuyển khoản');
    };
    const renderButtonCheckout = () => {
        let html = null;
        const selectedPackage = listPackage[activeIndex];
        html = (
            <div className='checkout'>
                <div className='rowContainer'>
                    <button
                        type='button'
                        onClick={() => handleClickCheckout(selectedPackage.id)}
                    >
                        Thanh toán
                    </button>
                </div>
                <style jsx>{styles}</style>
            </div>
        );
        return html;
    };
    const renderPayPackageDescription = () => {
        let html = null;
        html = (
            <div className='section sectionDescription'>
                <div className='rowContainer'>
                    <h3 className='title'>Thanh toán online</h3>
                    <p>Hỗ trợ thanh toán bằng mã QR hoặc thẻ ATM</p>
                </div>
                <style jsx>{styles}</style>
            </div>
        );
        return html;
    };
    const renderPayPackageQrCode = () => {
        let html = null;
        html = (
            <div className='section sectionQrCode'>
                <div className='rowContainer'>
                    <h3 className='title'>Mã QR</h3>
                    {renderQRImage()}
                </div>
                <style jsx>{styles}</style>
            </div>
        );
        return html;
    };
    const renderPayPackageBankInformation = () => {
        let html = null;
        const selectedPackage = listPackage[activeIndex];
        html = (
            <div className='section sectionBankInformation'>
                <div className='rowContainer'>
                    <h3 className='title'>Chuyển khoản ngân hàng</h3>
                    <div className='bankInformation'>
                        <ul>
                            <li>
                                <div className='content'>
                                    <div className='text'>
                                        <h4 className='label'>Nội dung</h4>
                                        <strong>
                                            {selectedPackageOrder.booking_no}
                                        </strong>
                                    </div>
                                    <div
                                        className='copyWrapper'
                                        ref={copyNoiDungRef}
                                    >
                                        <CopyToClipboard
                                            onCopy={() =>
                                                setCopiedNoiDungStatus(true)
                                            }
                                            text={
                                                selectedPackageOrder.booking_no
                                            }
                                        >
                                            <button type='button'>Copy</button>
                                        </CopyToClipboard>
                                        <p
                                            className={`copyStatus ${
                                                copiedNoiDungStatus
                                                    ? 'show'
                                                    : 'hide'
                                            }`}
                                        >
                                            Đã copy
                                        </p>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className='content'>
                                    <div className='text'>
                                        <h4 className='label'>Số tiền</h4>
                                        <div className='amount'>
                                            {selectedPackage.amount}
                                        </div>
                                    </div>
                                    <div
                                        className='copyWrapper'
                                        ref={copySoTienRef}
                                    >
                                        <CopyToClipboard
                                            onCopy={() =>
                                                setCopiedSoTienStatus(true)
                                            }
                                            text={selectedPackage.amount || ''}
                                        >
                                            <button type='button'>Copy</button>
                                        </CopyToClipboard>
                                        <p
                                            className={`copyStatus ${
                                                copiedSoTienStatus
                                                    ? 'show'
                                                    : 'hide'
                                            }`}
                                        >
                                            Đã copy
                                        </p>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className='content'>
                                    <div className='text'>
                                        <h4 className='label'>
                                            Tài khoản nhận chuyển khoản
                                        </h4>
                                        {selectedPackage.bank_acc}
                                        <p>
                                            Số tài khoản:
                                            <strong>
                                                {selectedPackage.bank_num}
                                            </strong>
                                        </p>
                                        <p>
                                            {`Ngân hàng: ${selectedPackage.bank_name}`}
                                        </p>
                                    </div>
                                    <div
                                        className='copyWrapper'
                                        ref={copyTaiKhoanRef}
                                    >
                                        <CopyToClipboard
                                            onCopy={() =>
                                                setCopiedTaiKhoanStatus(true)
                                            }
                                            text={`${selectedPackage.bank_acc}. Số tài khoản: ${selectedPackage.bank_num}. Ngân hàng: ${selectedPackage.bank_name}.`}
                                        >
                                            <button type='button'>Copy</button>
                                        </CopyToClipboard>
                                        <p
                                            className={`copyStatus ${
                                                copiedTaiKhoanStatus
                                                    ? 'show'
                                                    : 'hide'
                                            }`}
                                        >
                                            Đã copy
                                        </p>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <style jsx>{styles}</style>
            </div>
        );
        return html;
    };
    const mainRender = () => {
        let html = null;
        switch (screen) {
            case listScreen.listPackages:
                html = (
                    <div className='screenListPackages'>
                        {renderMyPackageHtml()}
                        {renderListPackageHtml()}
                        {renderLinkToMaKichHoatHtml()}
                        <style jsx>{styles}</style>
                    </div>
                );
                break;
            case listScreen.packageDetail:
                html = (
                    <div className='screenPackageDetail'>
                        <div className='mainContent'>
                            {renderPackageDetailHtml()}
                            {renderButtonCheckout()}
                        </div>
                        <style jsx>{styles}</style>
                    </div>
                );
                break;
            case listScreen.payPackage:
                html = (
                    <div className='screenPayPackage'>
                        {renderPayPackageDescription()}
                        {renderPayPackageQrCode()}
                        {renderPayPackageBankInformation()}
                        <style jsx>{styles}</style>
                    </div>
                );
                break;

            default:
                break;
        }
        return html;
    };
    return (
        <div className='muaGoiDichVuWrapper 333'>
            {renderMobilePageTitle()}
            {mainRender()}
            {renderPopup()}
            <style jsx>{styles}</style>
        </div>
    );
};

MuaGoiDichVuMobile.Layout = LayoutTaiKhoan;

export default MuaGoiDichVuMobile;
