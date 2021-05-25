import { mainColor, secondaryColor } from '../../../constants/theme';
import css from 'styled-jsx/css';

export default css`
    .muaGoiDichVuWrapper {
        color: rgba(255, 255, 255, 0.8);
    }
    .screenListPackages {
        padding-bottom: 100px;
        .title {
            padding: 15px 0;
            h2 {
                color: rgba(255, 255, 255, 0.8);
                font-size: 14px;
            }
        }
        .list {
            background: #1a1e2d;
            padding: 20px 0;
        }
        .listMyPackages {
            color: rgba(255, 255, 255, 0.6);
            .rowContent {
                &:not(:last-child) {
                    margin-bottom: 15px;
                }
            }
            .name {
                color: white;
            }
            .buttonWrapper {
                margin-top: 10px;
            }
        }
        .listAllPackages {
            background: #1a1e2d;
            .item {
                display: flex;
                justify-content: space-between;
                padding: 10px 0;
                border-bottom: 1px solid rgba(255, 255, 255, 0.12);
                .label {
                    font-size: 17px;
                    color: white;
                }
                .price {
                    font-size: 17px;
                    color: rgba(255, 255, 255, 0.6);
                }
            }
        }
        .link {
            background: #1a1e2d;
            padding: 10px 0;
            a {
                font-size: 17px;
                color: ${mainColor};
            }
        }
        .description {
            padding: 20px 0;
        }
    }
    .screenPackageDetail {
        .mainContent {
            padding: 20px 0;
            text-align: center;
        }
        .packageImage {
            width: 135px;
            margin-bottom: 15px;
        }
        .label {
            font-size: 14px;
            margin-bottom: 10px;
        }
        .packageName {
            margin-bottom: 10px;
            .name {
                display: inline-block;
                padding: 6px 20px;
                border: 1px solid white;
            }
        }
        .packagePrice {
            font-size: 24px;
            margin-bottom: 15px;
        }
        .checkout {
            button {
                border: none;
                outline: none;
                border-radius: 100px;
                background: ${secondaryColor};
                padding: 12px 15px;
                font-size: 15px;
                color: white;
                width: 100%;
            }
        }
    }
    .screenPayPackage {
        padding-top: 30px;
        padding-bottom: 100px;
        .section {
            background: #1a1e2d;
            padding: 20px 0;
            &:not(:last-child) {
                margin-bottom: 5px;
            }
        }
        .title {
            padding: 0;
            font-size: 17px;
            font-weight: bold;
            margin-bottom: 10px;
        }
        .sectionQrCode {
            text-align: center;
            .title {
                text-align: left;
            }
            .imageWrapper {
                max-width: 100%;
                position: relative;
                display: inline-block;
            }
            .qrImage {
                width: 85%;
                left: 50%;
                transform: translateX(-50%);
                position: absolute;
                bottom: 18px;
                text-align: center;
            }
        }
        .bankInformation {
            ul {
                li {
                    padding: 10px 0;
                    &:not(:last-child) {
                        border-bottom: 1px solid rgba(255, 255, 255, 0.6);
                    }
                }
            }
            .label {
                font-size: 15px;
                font-weight: bold;
                margin-bottom: 5px;
            }
            .amount {
                color: ${mainColor};
                font-size: 20px;
                font-style: italic;
                line-height: 1;
            }
            .content {
                display: flex;
                align-items: center;
                justify-content: space-between;
            }
            button {
                margin-left: 10px;
                padding: 5px 10px;
                border-radius: 5px;
                background: ${secondaryColor};
                border: none;
                outline: none;
                color: #fff;
            }
            .copyStatus {
                margin-top: 5px;
                opacity: 0;
                text-align: right;
                visibility: hidden;
                color: ${mainColor};
                font-size: 13px;
                &.show {
                    opacity: 1;
                    visibility: visible;
                }
            }
        }
    }
`;
