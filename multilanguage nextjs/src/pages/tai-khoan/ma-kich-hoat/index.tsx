import React, { useState } from 'react';
import { sunshineAccountApi } from '../../../commons/API/sunshineAccountApi';
import LayoutTaiKhoan from '../../../layouts/LayoutTaiKhoan';
import { ComponentLayout } from '../../../models/ComponentModel';
import styles from '../../../styles/tai-khoan/ma-kich-hoat/styles';
import iconBackSpace from './images/iconBackSpace.svg';

type keyboardType = (string | number)[][];
const MaKichHoat: ComponentLayout = () => {
    const [isStepInsertCode, setIsStepInsertCode] = useState(true);
    const [valueInput, setValueInput] = useState('');
    const [resultNotification, setResultNotification] = useState('');
    const keyboard = [
        [0, 1, 2, 3],
        [4, 5, 6, 7],
        [8, 9, 'backSpace'],
    ];
    const clickKeyboard = (letter: string | number) => {
        setValueInput(valueInput + letter);
    };
    const clickBackspace = () => {
        setValueInput(valueInput.slice(0, -1));
    };
    const renderKeyboardRow = (row: (string | number)[]) => {
        let html = null;
        html = row.map((singleKeyBoard, index) => {
            if (singleKeyBoard === 'backSpace') {
                return (
                    <td
                        colSpan={2}
                        key={index}
                        onClick={() => clickBackspace()}
                    >
                        <img src={iconBackSpace} alt='' />
                    </td>
                );
            }
            return (
                <td key={index} onClick={() => clickKeyboard(singleKeyBoard)}>
                    {singleKeyBoard}
                </td>
            );
        });
        return html;
    };
    const renderKeyboard = (keyboard: keyboardType) => {
        let html = null;
        html = keyboard.map((row, index) => {
            return <tr key={index}>{renderKeyboardRow(row)}</tr>;
        });
        return html;
    };

    const renderInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValueInput(event.target.value);
    };

    const handleInsertCodeSubmit = (code: string) => {
        setIsStepInsertCode(false);
        setValueInput('');
        sunshineAccountApi.activeCodeSet(code).then((response) => {
            setResultNotification(response.data.message);
            if (response.data.status === 'success') {
                setResultNotification(response.data.data);
            } else {
                setResultNotification(response.data.message);
            }
        });
    };

    const renderInsertCodeHtml = () => {
        let html = null;
        if (isStepInsertCode) {
            html = (
                <div className='text'>
                    <h2 className='pageTitle'>Mã kích hoạt / Gift Code</h2>
                    <input
                        type='text'
                        placeholder='Nhập mã'
                        className='input'
                        value={valueInput}
                        onChange={renderInputValue}
                    />
                    <div className='keyboardWrapper'>
                        <div className='keyboard'>
                            <table>
                                <tbody>{renderKeyboard(keyboard)}</tbody>
                            </table>
                        </div>
                        <div
                            className='buttonNextStep button'
                            onClick={() => handleInsertCodeSubmit(valueInput)}
                            tabIndex={0}
                            role='button'
                        >
                            Kích hoạt
                        </div>
                    </div>
                    <p className='note'>(*) Hỗ trợ: 1900.6077</p>
                    <style jsx>{styles}</style>
                </div>
            );
        }
        return html;
    };

    const renderNotificationHtml = () => {
        let html = null;
        if (!isStepInsertCode) {
            html = (
                <div>
                    <h3 className='label'>{resultNotification}</h3>
                    <button
                        type='button'
                        onClick={() => setIsStepInsertCode(true)}
                        className='button'
                    >
                        Quay lại
                    </button>
                    <style jsx>{styles}</style>
                </div>
            );
        }
        return html;
    };

    return (
        <div className='maKichHoatWrapper'>
            <div className='rowContainer'>
                {renderInsertCodeHtml()}
                {renderNotificationHtml()}
            </div>
            <style jsx>{styles}</style>
        </div>
    );
};

MaKichHoat.Layout = LayoutTaiKhoan;

export default MaKichHoat;
