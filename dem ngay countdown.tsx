import dynamic from 'next/dynamic';
import Router from 'next/router';
import React, { useState } from 'react';
import { isMobileOnly } from 'react-device-detect';
import { v4 as uuidv4 } from 'uuid';
import { clientSignIn, userSignIn } from '../../commons/API/getToken';
import { movieApi } from '../../commons/API/movieApi';
import { sunshineAccountApi } from '../../commons/API/sunshineAccountApi';
import * as LOCAL_STORAGE from '../../constants/LocalStorage';
import LayoutFullScreen from '../../layouts/LayoutFullScreen';
import { ComponentLayout } from '../../models/ComponentModel';
import styles from '../../styles/dang-nhap/styles';
import LoginScreenMobile from './images/LoginScreenMobile.jpg';
import LoginScreenDesktop from './images/LoginScreenDesktop.jpg';
import { isClientSide } from '../../commons/utils';
// import logo from './images/logo.svg';

const testPhoneNumber = '01234567893';
const DateStart = 'March 18, 2021';

const Device = dynamic(() => import('../../components/Device'), {
    ssr: false,
});

const DangNhap: ComponentLayout = () => {
    const [loginName, setLoginName] = useState('');
    const [loginStep, setLoginStep] = useState('phone'); // bước đăng nhập: phone hoặc otp
    const [errorStep, setErrorStep] = useState(''); // lỗi bước đăng nhập: errorStepPhone hoặc errorStepOTP hoặc errorServer
    const [input, setInput] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');
    const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        setInput(inputValue);
        if (loginStep === 'phone') {
            setPhoneNumber(inputValue);
        } else {
            setOtp(inputValue);
        }
    };
    const handleError = () => {
        let html = null;
        switch (errorStep) {
            case 'errorStepPhone':
                html = (
                    <p className='error'>
                        Thất bại. Vui lòng kiểm tra số điện thoại.
                        <style jsx>{styles}</style>
                    </p>
                );
                break;
            case 'errorStepOTP':
                html = (
                    <p className='error'>
                        Thất bại. Vui lòng kiểm tra mã OTP.
                        <style jsx>{styles}</style>
                    </p>
                );
                break;
            case 'errorServer':
                html = (
                    <p className='error'>
                        Thất bại. Không thể kết nối đến server.
                        <style jsx>{styles}</style>
                    </p>
                );
                break;

            default:
                break;
        }
        return html;
    };
    const redirectToHomePage = () => {
        Router.push('/');
    };
    const handleSubmitStepPhone = async () => {
        // https://vnfaster.com/validate-so-dien-thoai-bang-javascript-don-gian.html
        const vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
        // const phoneNumberString = phoneNumber.toString();
        // const checkPhoneNumber = vnf_regex.test(phoneNumber);
        const checkPhoneNumber = true;
        setErrorStep('');
        if (!checkPhoneNumber && phoneNumber !== testPhoneNumber) {
            setErrorStep('errorStepPhone');
            return;
        }
        try {
            await clientSignIn();
        } catch (error) {
            setErrorStep('errorServer');
            return;
        }
        await movieApi
            .setUserRegister(phoneNumber)
            .then((response) => {
                if (response.data.status === 'success') {
                    setLoginName(response.data.data.loginName);
                    setLoginStep('otp');
                    setInput('');
                } else {
                    setErrorStep('errorStepPhone');
                }
            })
            .catch((error) => {
                console.log('error', error);
            });

        // console.log('response', response);
    };
    const handleSubmitStepOTP = async () => {
        await movieApi
            .setVerificationCode(loginName, otp)
            .then(async (response) => {
                console.log('response', response);
                if (response.data.status === 'success') {
                    const { loginSecret } = response.data.data;
                    // console.log('getLoginSecret', getLoginSecret);
                    // console.log('loginName', loginName);
                    console.log('loginSecret', loginSecret);
                    await userSignIn(loginName, loginSecret)
                        .then(async () => {
                            setOtp('');
                            const device_code = uuidv4();
                            if (
                                localStorage.getItem(
                                    LOCAL_STORAGE.DEVICE_CODE,
                                ) === null
                            ) {
                                localStorage.setItem(
                                    LOCAL_STORAGE.DEVICE_CODE,
                                    device_code,
                                );
                            }
                            // set login device
                            await sunshineAccountApi
                                .deviceLoginSet()
                                .then((response) => {
                                    console.log('deviceResponse', response);
                                })
                                .catch((error) => {
                                    console.log('deviceError', error);
                                });
                            // set ActiveCodeSet gói cước // tạm thời bỏ
                            // await sunshineAccountApi
                            //     .activeCodeSet(
                            //         CONSTANTS_API.DEFAULT_CODE_ACTIVE,
                            //         phoneNumber,
                            //     )
                            //     .then((response) => {
                            //         console.log(
                            //             'activeCodeSetResponse',
                            //             response,
                            //         );
                            //     })
                            //     .catch((error) => {
                            //         console.log('activeCodeSetError', error);
                            //     });
                            redirectToHomePage();
                        })
                        .catch((error) => {
                            console.log('error', error);
                            setErrorStep('errorStepOTP');
                            return '';
                        });
                } else {
                    setErrorStep('errorStepOTP');
                    return '';
                }
            })
            .catch((error) => {
                console.log('error', error);
            });
    };
    const handleSubmit = () => {
        if (!input) {
            return;
        }
        if (loginStep === 'phone') {
            handleSubmitStepPhone();
        } else {
            // console.log('otp', otp);
            handleSubmitStepOTP();
        }
        // }
    };
    const renderInput = () => {
        let html = null;
        html = (
            <>
                <input
                    type={loginStep === 'phone' ? 'number' : 'password'}
                    placeholder={
                        loginStep === 'phone'
                            ? 'Nhập số điện thoại'
                            : 'Nhập mã OTP'
                    }
                    value={input}
                    className='input'
                    onChange={handleChangeInput}
                />
                <style jsx>{styles}</style>
            </>
        );
        return html;
    };
    const renderButtonSubmit = () => {
        let html = null;
        html = (
            <div className='buttonWrapper '>
                <button
                    type='button'
                    className='button buttonNextStep'
                    onClick={() => handleSubmit()}
                >
                    {loginStep === 'phone' ? 'Tiếp tục' : 'Xong'}
                </button>
                <style jsx>{styles}</style>
            </div>
        );
        return html;
    };
    const renderMobile = () => {
        let html = null;
        html = (
            <div className='loginMobile'>
                <div className='background'>
                    <img src={LoginScreenMobile} alt='' />
                </div>
                <div className='content'>
                    <div className='rowContainer'>
                        <div className='logo'>
                            <img src='/images/logo.svg' alt='Logo' />
                        </div>
                        <div className='description'>
                            Nền tảng Truyền hình trực tuyến
                            <br />
                            Giải Trí - Tin tức tổng hợp thế hệ mới
                            <br />
                            của Sunshine Group
                        </div>
                        <div className='form'>
                            <h3 className='label'>
                                {loginStep === 'phone'
                                    ? 'Nhập số điện thoại để trải nghiệm ngay kho giải trí không giới hạn'
                                    : 'Mật khẩu/OTP'}
                            </h3>
                            {renderInput()}
                            {handleError()}
                            {renderButtonSubmit()}
                        </div>
                    </div>
                </div>
                <style jsx>{styles}</style>
            </div>
        );
        return html;
    };

    const renderImageStyles = () => {
        let height: string | number = 'auto';
        if (isClientSide) {
            height = window.innerHeight;
        }
        return {
            height,
        };
    };

    /**
     * Số ngày còn lại
     *
     * https://stackoverflow.com/questions/55717793/calculate-the-difference-between-two-dates-in-react-native/55717984
     */
    const renderDaysLeft = () => {
        const msDiff = new Date(DateStart).getTime() - new Date().getTime(); // Future date - current date
        let result: string | number = Math.floor(
            msDiff / (1000 * 60 * 60 * 24),
        );
        if (result < 10) {
            result = `0${result}`;
        }
        return (
            <>
                <strong>{result}</strong>
                <style jsx>{styles}</style>
            </>
        );
    };

    const renderDesktop = () => {
        let html = null;
        html = (
            <div className='loginDesktop'>
                <div className='poster'>
                    <img
                        className='posterImage'
                        src={LoginScreenDesktop}
                        alt=''
                        style={renderImageStyles()}
                    />
                    <div className='content'>
                        <div className='rowContainer'>
                            <div className='description'>
                                <div className='timeLeft'>
                                    Khởi chiếu sau
                                    {renderDaysLeft()}
                                    ngày
                                </div>
                                <div>
                                    trên
                                    <img
                                        src='/images/logo.svg'
                                        alt='Logo'
                                        className='logo'
                                    />
                                </div>
                            </div>
                            <div className='form'>
                                <h3 className='label'>
                                    Đăng nhập để trải nghiệm thế giới giải trí
                                    bất tận cùng kho phim siêu hấp dẫn
                                </h3>
                                <div className='inputWrapper'>
                                    {renderInput()}
                                    {renderButtonSubmit()}
                                </div>
                                {handleError()}
                            </div>
                        </div>
                    </div>
                </div>
                <style jsx>{styles}</style>
            </div>
        );
        return html;
    };
    const mainRender = () => {
        return (
            <Device>
                {() => {
                    if (isMobileOnly) {
                        return <>{renderMobile()}</>;
                    }
                    return <>{renderDesktop()}</>;
                }}
            </Device>
        );
    };
    return (
        <div className='loginWrapper'>
            {mainRender()}
            <style jsx>{styles}</style>
        </div>
    );
};

DangNhap.Layout = LayoutFullScreen;

export default DangNhap;
