import css from 'styled-jsx/css';

export default css`
    .dichVuDaMuaWrapper {
        .rowContent {
            display: flex;
            align-items: center;
            justify-content: space-between;
            position: relative;
            padding: 16px 0;
            &:before {
                content: '';
                display: none;
                position: absolute;
                z-index: -1;
                left: -20px;
                right: -20px;
                top: 0;
                bottom: 0;
                background: #161616;
                pointer-events: none;
            }
            &:not(:last-child) {
                margin-bottom: 1px;
            }
            &:hover {
                &:before {
                    display: block;
                }
            }
        }
        .value {
            margin-left: 50px;
        }
        .textSmall {
            color: rgba(255, 255, 255, 0.8);
            margin-top: 9px;
        }
    }
`;
