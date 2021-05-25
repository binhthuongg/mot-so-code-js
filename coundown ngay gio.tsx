import dynamic from 'next/dynamic';
import Router from 'next/router';
import React, { useEffect, useState } from 'react';
import { isMobileOnly } from 'react-device-detect';
import { v4 as uuidv4 } from 'uuid';
import { clientSignIn, userSignIn } from '../../commons/API/getToken';
import { movieApi } from '../../commons/API/movieApi';
import { sunshineAccountApi } from '../../commons/API/sunshineAccountApi';
import { isClientSide } from '../../commons/utils';
import * as LOCAL_STORAGE from '../../constants/LocalStorage';
import * as CONSTANTS from '../../constants/utils';
import LayoutFullScreen from '../../layouts/LayoutFullScreen';
import { ComponentLayout } from '../../models/ComponentModel';
import styles from '../../styles/dang-nhap/styles';
import LoginScreenDesktop from './images/LoginScreenDesktop.jpg';
import LoginScreenMobile from './images/LoginScreenMobile.jpg';

const testPhoneNumber = '01234567893';

const Device = dynamic(() => import('../../components/Device'), {
    ssr: false,
});

const DangNhap: ComponentLayout = () => {
    const [loginName, setLoginName] = useState('');
    const [loginStep, setLoginStep] = useState('phone'); // bước đăng nhập: phone hoặc otp
    const [errorStep, setErrorStep] = useState(''); // lỗi bước đăng nhập: errorStepPhone hoặc errorStepOTP hoặc errorServer
    const [input, setInput] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [dayLeft, setDayLeft] = useState<string | number>(0);
    const [hourLeft, setHourLeft] = useState<string | number>(0);
    const [minuteLeft, setMinuteLeft] = useState<string | number>(0);
    const [secondLeft, setSecondLeft] = useState<string | number>(0);
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

    const timeLeft = () => {
        return (
            Date.parse(CONSTANTS.TIME_OPENING) -
            Date.parse(new Date().toString())
        );
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
        // const vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
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
                // eslint-disable-next-line no-console
                console.log('error', error);
            });

        // console.log('response', response);
    };
    const handleSubmitStepOTP = async () => {
        await movieApi
            .setVerificationCode(loginName, otp)
            .then(async (response) => {
                // console.log('response', response);
                if (response.data.status === 'success') {
                    const { loginSecret } = response.data.data;
                    // console.log('getLoginSecret', getLoginSecret);
                    // console.log('loginName', loginName);
                    // eslint-disable-next-line no-console
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
                                .then(() => {
                                    // console.log('deviceResponse', response);
                                })
                                .catch((error) => {
                                    // eslint-disable-next-line no-console
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
                            localStorage.setItem(
                                LOCAL_STORAGE.HIDE_POPUP_AFTER_LOGIN,
                                'false',
                            );
                            redirectToHomePage();
                        })
                        .catch((error) => {
                            // eslint-disable-next-line no-console
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
                // eslint-disable-next-line no-console
                console.log('error', error);
            });
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleSubmit = (e: any) => {
        e.preventDefault();
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
                <button type='submit' className='button buttonNextStep'>
                    {loginStep === 'phone' ? 'Tiếp tục' : 'Xong'}
                </button>
                <style jsx>{styles}</style>
            </div>
        );
        return html;
    };

    const renderStyleHeight100PercentWindow = () => {
        let height: string | number = 'auto';
        if (isClientSide) {
            height = window.innerHeight;
        }
        return {
            height,
        };
    };

    const renderMobile = () => {
        let html = null;
        html = (
            <div
                className='loginMobile'
                style={renderStyleHeight100PercentWindow()}
            >
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
                        <form className='form' onSubmit={handleSubmit}>
                            <h3 className='label'>
                                {loginStep === 'phone'
                                    ? 'Nhập số điện thoại để trải nghiệm ngay kho giải trí không giới hạn'
                                    : 'Mật khẩu/OTP'}
                            </h3>
                            {renderInput()}
                            {handleError()}
                            {renderButtonSubmit()}
                        </form>
                    </div>
                </div>
                <style jsx>{styles}</style>
            </div>
        );
        return html;
    };

    const leading0 = (number: string | number) => {
        return number < 10 ? `0${number}` : number;
    };

    const getTimeUntil = () => {
        const timeLeftValue = timeLeft();
        if (timeLeftValue < 0) {
            return;
        }
        setDayLeft(leading0(Math.floor(timeLeftValue / (1000 * 60 * 60 * 24))));
        setHourLeft(
            leading0(Math.floor((timeLeftValue / (1000 * 60 * 60)) % 24)),
        );
        setMinuteLeft(leading0(Math.floor((timeLeftValue / 1000 / 60) % 60)));
        setSecondLeft(leading0(Math.floor((timeLeftValue / 1000) % 60)));
    };

    /**
     * Số ngày còn lại
     *
     * https://codesandbox.io/s/q3y18x0pmw?file=/src/Clock.js:404-438
     *
     * https://stackoverflow.com/questions/55717793/calculate-the-difference-between-two-dates-in-react-native/55717984
     */
    // const renderDaysLeft = () => {
    //     const msDiff =
    //         new Date(CONSTANTS.TIME_OPENING).getTime() - new Date().getTime(); // Future date - current date
    //     let result: string | number = Math.floor(
    //         msDiff / (1000 * 60 * 60 * 24),
    //     );
    //     if (result === 0) {
    //         result = 'trong hôm nay, bắt đầu lúc 18:30';
    //         return ` ${result}`;
    //     }
    //     if (result < 0) {
    //         result = ` ngày ${CONSTANTS.TIME_OPENING} `;
    //         return ` ${result}`;
    //     }
    //     if (result < 10 && result > 0) {
    //         result = `0${result}`;
    //     }
    //     return (
    //         <>
    //             {' sau'}
    //             <strong>{result}</strong>
    //             ngày
    //             <style jsx>{styles}</style>
    //         </>
    //     );
    // };

    useEffect(() => {
        const interval = setInterval(() => getTimeUntil(), 1000);
        return () => {
            clearInterval(interval);
        };
    }, []);

    const renderDayLeft = () => {
        let html = null;
        if (dayLeft > 0) {
            html = (
                <>
                    <strong>{dayLeft}</strong>
                    ngày,
                    <style jsx>{styles}</style>
                </>
            );
        }
        return html;
    };
    const renderTimeLeft = () => {
        let html = null;
        html = (
            <>
                <span>Khởi chiếu sau</span>
                {renderDayLeft()}
                <strong>{hourLeft}</strong>
                <span>giờ :</span>
                <strong>{minuteLeft}</strong>
                <span>phút :</span>
                <strong>{secondLeft}</strong>
                <span>giây</span>
                <style jsx>{styles}</style>
            </>
        );
        return html;
    };

    const renderTime = () => {
        let html = <p>Hiện đang có mặt</p>;
        if (timeLeft() > 0) {
            html = <>{renderTimeLeft()}</>;
        }
        return html;
    };

    const renderDesktop = () => {
        let html = null;
        html = (
            <div className='loginDesktop'>
                <div className='poster'>
                    <div className='logo'>
                        <img src='/images/logo.svg' alt='logo' />
                    </div>
                    <img
                        className='posterImage'
                        src={LoginScreenDesktop}
                        alt=''
                        style={renderStyleHeight100PercentWindow()}
                    />
                    <div className='content'>
                        <div className='rowContainer'>
                            <div className='description'>
                                <div className='timeLeft'>{renderTime()}</div>
                                <div>
                                    trên
                                    <img
                                        src='/images/logo.svg'
                                        alt='Logo'
                                        className='logoText'
                                    />
                                </div>
                            </div>
                            <form className='form' onSubmit={handleSubmit}>
                                <h3 className='label'>
                                    Đăng nhập để trải nghiệm thế giới giải trí
                                    bất tận cùng kho phim siêu hấp dẫn
                                </h3>
                                <div className='inputWrapper'>
                                    {renderInput()}
                                    {renderButtonSubmit()}
                                </div>
                                {handleError()}
                            </form>
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
