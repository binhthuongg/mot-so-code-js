import css from 'styled-jsx/css';
import { scrollbarWidth } from '../../../constants/theme';

export default css`
    .muaGoiDichVuWrapper {
        padding-bottom: 60px;
        position: relative;
        .labelSale {
            position: absolute;
            z-index: 1;
            top: 0;
            right: 0;
            p {
                position: absolute;
                z-index: 1;
                left: 0;
                right: 0;
                text-align: center;
                font-size: 30px;
                padding: 0 10px;
                top: 35%;
                transform: translateY(-35%);
                @media screen and (max-width: 1499px) {
                    font-size: 25px;
                }
                span {
                    white-space: nowrap;
                    display: block;
                }
            }
            img {
                width: 155px;
                @media screen and (max-width: 1499px) {
                    width: 135px;
                }
            }
        }
        .header {
            padding-bottom: 24px;
            margin-right: 18%;
            border-bottom: 1px solid #fff;
            .description {
                color: rgba(255, 255, 255, 0.8);
            }
        }
        .mainContent {
            padding-top: 32px;
            display: flex;
            flex-wrap: wrap;
            color: rgba(255, 255, 255, 0.8);
            h2 {
                color: white;
                margin-bottom: 20px;
            }
        }
        .sectionQrPay {
            width: 40%;
            @media screen and (max-width: 991px) {
                width: 100%;
                margin-bottom: 35px;
            }
            .qrImageWrapper {
                margin-top: 35px;
                position: relative;
                max-width: 100%;
                position: relative;
                display: inline-block;
            }
            .qrImage {
                width: 85%;
                left: 50%;
                transform: translateX(-50%);
                position: absolute;
                bottom: 7%;
                text-align: center;
            }
            .buttonCreateQr {
                position: absolute;
                z-index: 1;
                top: 50%;
                max-width: 100%;
                left: 50%;
                transform: translate(-50%, -50%);
            }
            .qrImage {
                max-width: 100%;
            }
        }
        .sectionChuyenKhoan {
            width: 60%;
            padding-left: 10%;
            @media screen and (max-width: 991px) {
                width: 100%;
                padding: 0;
            }
        }
        .formChuyenKhoanWrapper {
            margin-top: 30px;
            .title {
                margin-bottom: 30px;
            }
            .rowChuyenKhoan {
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;
                &:not(:last-child) {
                    margin-bottom: 30px;
                }
            }
            .label,
            .value {
                flex: 1;
            }
            .label {
                text-align: left;
            }
            .value {
                text-align: right;
                margin-left: 50px;
                color: #fff;
            }
        }
        .list {
            margin-top: 65px;
            overflow-x: auto;
            white-space: nowrap;
            &::-webkit-scrollbar {
                height: ${scrollbarWidth};
            }
        }
        .item {
            display: inline-block;
            border: 10px solid transparent;
            border-radius: 10px;
            overflow: hidden;
            outline: none;
            width: 300px;
            cursor: pointer;
            &:not(:last-child) {
                margin-right: 20px;
            }
            &:hover,
            &.active {
                border-color: #fff;
            }
            @media screen and (max-width: 991px) {
                width: 275px;
            }
            img {
                width: 100%;
            }
        }
    }
`;
