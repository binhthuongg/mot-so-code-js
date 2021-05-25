import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { sunshineAccountApi } from '../../../commons/API/sunshineAccountApi';
import { isClientSide } from '../../../commons/utils';
import * as LOCAL_STORAGE from '../../../constants/LocalStorage';
import * as CONSTANTS from '../../../constants/utils';
import iconClose from './images/iconClose.svg';
import PopUpBackground from './images/PopUpBackground.png';
import styles, { modalStyles } from './styles';

function PopUpCodeTraiNghiem(): React.ReactElement {
    const [isStepInsertCode, setIsStepInsertCode] = useState(true);
    const [valueInput, setValueInput] = useState('');
    const [activeSuccess, setActiveSuccess] = useState(false);
    const [resultNotification, setResultNotification] = useState('');
    const [isShowPopUp, setIsShowPopup] = useState(false);

    const handleSubmit = () => {
        sunshineAccountApi.activeCodeSet(valueInput).then((response) => {
            if (response.data.status === 'success') {
                setResultNotification(response.data.data);
                setActiveSuccess(true);
                localStorage.setItem(
                    LOCAL_STORAGE.HIDE_POPUP_AFTER_LOGIN,
                    'true',
                );
                localStorage.setItem(
                    LOCAL_STORAGE.HAS_ACTIVE_CODE_TRAI_NGHIEM,
                    'true',
                );
            } else {
                setResultNotification(response.data.message);
                setActiveSuccess(false);
            }
        });
        setIsStepInsertCode(false);
    };

    const renderInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValueInput(event.target.value);
    };

    const textPopUpInsertCode = () => {
        let html = null;
        html = (
            <div className='popUpContent popUpInsertCode'>
                <div className='popUpLogo'>
                    <img src='/images/logo.svg' alt='Logo Popup' />
                </div>
                <div className='textWrapper'>
                    <h3>
                        Nhập mã
                        <strong>{` "${CONSTANTS.CODE_TRAI_NGHIEM}"`}</strong>
                        <br />
                        trải nghiệm ngay kho phim bom tấn
                        <br />
                        không giới hạn
                    </h3>
                    <form onSubmit={handleSubmit}>
                        <input
                            type='text'
                            className='input'
                            value={valueInput}
                            onChange={renderInputValue}
                        />
                        <button type='submit' className='button'>
                            Gửi
                        </button>
                    </form>
                </div>
                <style jsx>{styles}</style>
            </div>
        );
        return html;
    };

    const handleClosePopup = () => {
        setIsShowPopup(false);
        localStorage.setItem(LOCAL_STORAGE.HIDE_POPUP_AFTER_LOGIN, 'true');
    };

    const textPopUpSubmitSuccess = () => {
        let html = null;
        html = (
            <div className='popUpContent popUpSubmit popUpSubmitSuccess'>
                <div className='textWrapper'>
                    <h3>{resultNotification}</h3>
                    <button
                        type='button'
                        onClick={() => handleClosePopup()}
                        className='button'
                    >
                        OK
                    </button>
                </div>
                <style jsx>{styles}</style>
            </div>
        );
        return html;
    };

    const textPopUpSubmitFailed = () => {
        let html = null;
        html = (
            <div className='popUpContent popUpSubmit popUpSubmitFailed'>
                <div className='textWrapper'>
                    <h3>{resultNotification}</h3>
                    <Link href='tai-khoan/ma-kich-hoat'>
                        <a>
                            <button
                                type='button'
                                onClick={() => handleClosePopup()}
                                className='button'
                            >
                                Nhập lại Code
                            </button>
                        </a>
                    </Link>
                </div>
                <style jsx>{styles}</style>
            </div>
        );
        return html;
    };

    const textPopUpSubmit = () => {
        let html = null;
        if (activeSuccess) {
            html = <>{textPopUpSubmitSuccess()}</>;
        } else {
            html = <>{textPopUpSubmitFailed()}</>;
        }
        return html;
    };
    const textPopUp = () => {
        let html = null;
        if (isStepInsertCode) {
            html = <>{textPopUpInsertCode()}</>;
        } else {
            html = <>{textPopUpSubmit()}</>;
        }
        return html;
    };

    Modal.setAppElement('.appWrapper');

    const modalComponentStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            background: `url(${PopUpBackground}) center center`,
            backgroundSize: 'cover',
            border: 'none',
            color: '#ffffff',
            padding: '55px 30px',
        },
        overlay: {
            background: 'transparent',
            zIndex: 9998989,
        },
    };

    useEffect(() => {
        if (isClientSide) {
            const hidePopupAfterLogin = localStorage.getItem(
                LOCAL_STORAGE.HIDE_POPUP_AFTER_LOGIN,
            );
            const hasActiveCode = localStorage.getItem(
                LOCAL_STORAGE.HAS_ACTIVE_CODE_TRAI_NGHIEM,
            );
            if (hidePopupAfterLogin !== 'true' && hasActiveCode !== 'true') {
                setIsShowPopup(true);
            } else {
                setIsShowPopup(false);
            }
        }
    }, []);

    const renderPopUp = () => {
        return (
            <Modal
                isOpen={isShowPopUp}
                style={modalComponentStyles}
                closeTimeoutMS={500}
            >
                <div className='popUpWrapper'>{textPopUp()}</div>
                <button
                    className='close'
                    onClick={() => handleClosePopup()}
                    type='button'
                >
                    <img src={iconClose} alt='Close' />
                </button>
                <style jsx>{styles}</style>
                <style jsx>{modalStyles}</style>
            </Modal>
        );
    };
    return <>{renderPopUp()}</>;
}
export default PopUpCodeTraiNghiem;
