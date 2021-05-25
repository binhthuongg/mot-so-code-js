import { secondaryColor } from '../../constants/theme';
import css from 'styled-jsx/css';

export default css`
    .TaiKhoanWrapper {
        font-size: 20px;
        width: 100%;
        .information {
            margin-bottom: 60px;
            .rowContent {
                &:not(:last-child) {
                    margin-bottom: 10px;
                }
            }
        }
        .rowContent {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .label {
            font-size: 20px;
        }
        .value {
            margin-left: 50px;
            color: rgba(255, 255, 255, 0.8);
            .button {
                font-size: 16px;
                background: ${secondaryColor};
                border-radius: 5px;
                height: 36px;
                line-height: 36px;
            }
        }
        .sectionHeader {
            margin-bottom: 20px;
        }
        .textSmall {
            color: rgba(255, 255, 255, 0.8);
        }
        .listThietBi {
            display: block;
        }
        .thietBiDangNhap {
            .title h2 {
                font-size: 20px;
                padding-bottom: 12px;
                border-bottom: 1px solid white;
            }
        }
        .rowThietBi {
            display: flex;
            align-items: center;
            justify-content: space-between;
            position: relative;
            padding: 16px 0;
            outline: none;
            &:not(:last-child) {
                margin-bottom: 1px;
            }
            &:before {
                content: '';
                display: none;
                position: absolute;
                z-index: -1;
                left: -20px;
                right: -20px;
                background: #161616;
                top: 0;
                bottom: 0;
                pointer-events: none;
            }
            p {
                margin-top: 5px;
            }
            .icon {
                font-size: 0;
                height: 26px;
                width: 26px;
                // background-image: url('/static/media/ant-design_square-outlined.svg');
            }
            &.checked {
                .icon {
                    display: block;
                    // background-image: url('/static/media/ant-design_check-square-outlined.svg');
                }
            }
            &:hover {
                cursor: pointer;
                &:before {
                    display: block;
                }
            }
        }
    }
`;
