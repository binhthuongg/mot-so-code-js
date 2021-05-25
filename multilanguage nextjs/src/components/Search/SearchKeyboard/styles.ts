import { mainColor } from '../../../constants/theme';
import css from 'styled-jsx/css';

export default css`
    .SearchKeyBoard {
        display: none;
        margin-bottom: 35px;
        td {
            width: 69px;
            height: 68px;
            background: #333333;
            text-align: center;
            padding: 0 5px;
            cursor: pointer;
            &:hover {
                background: ${mainColor};
            }
            img {
                display: inline-block;
                vertical-align: middle;
            }
        }
    }
`;
