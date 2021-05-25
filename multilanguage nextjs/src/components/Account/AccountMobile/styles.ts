import { secondaryColor } from '../../../constants/theme';
import css from 'styled-jsx/css';

export default css`
    .TaiKhoanWrapper {
        font-size: 17px;
        width: 100%;
        padding-bottom: 100px;
        .sectionTaiKhoan {
            padding: 20px 0;
        }
    }
    .sectionTitle {
        font-size: 14px;
        margin-bottom: 10px;
        color: rgba(255, 255, 255, 0.8);
    }
    .sectionTaiKhoan {
        .rowContent {
            display: flex;
            justify-content: space-between;
            padding: 5px 0;
            align-items: center;
            &:not(:last-child) {
                border-bottom: 1px solid rgba(255, 255, 255, 0.6);
            }
        }
        .list {
            background: #1a1e2d;
            padding: 20px 0;
        }
        .label {
            font-size: 1em;
        }
        .value {
            margin-left: 15px;
            font-size: 14px;
            color: rgba(255, 255, 255, 0.6);
        }
    }
    .sectionPackages {
        .list {
            background: #1a1e2d;
            padding: 20px 0;
        }
        .rowContent {
            &:not(:last-child) {
                margin-bottom: 10px;
            }
        }
        .label {
            color: white;
        }
        .description {
            color: rgba(255, 255, 255, 0.6);
            font-size: 14px;
        }
        .linkGetPackages {
            text-align: center;
            a {
                display: inline-block;
                margin-top: 20px;
                background: ${secondaryColor};
                border-radius: 100px;
                height: 39px;
                line-height: 39px;
                padding: 0 30px;
                text-align: center;
            }
        }
    }
    .logout {
        margin-top: 10px;
        text-align: center;
        a {
            display: inline-block;
            margin-top: 20px;
            background: #faad14;
            border-radius: 100px;
            height: 39px;
            line-height: 39px;
            padding: 0 30px;
            text-align: center;
            width: 100%;
        }
    }
`;
