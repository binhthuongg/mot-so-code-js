import css from 'styled-jsx/css';

export default css`
    .lichSuGiaoDichWrapper {
        padding-bottom: 60px;
        height: 100%;
        .list {
            overflow: auto;
            height: 100%;
        }
        .rowContent {
            display: flex;
            align-items: center;
            padding-right: 35px;
            justify-content: space-between;
            position: relative;
            &:not(:last-child) {
                margin-bottom: 35px;
            }
        }
        .value {
            margin-left: 50px;
            font-size: 1em;
            color: rgba(255, 255, 255, 0.8);
        }
        .textSmall {
            font-size: 1em;
            margin-top: 10px;
            color: rgba(255, 255, 255, 0.8);
        }
    }
`;
