import { mainColor } from '../../../constants/theme';
import css from 'styled-jsx/css';

export default css`
    .SearchCategory {
        margin-bottom: 35px;
        h2 {
            margin-bottom: 20px;
        }
        li {
            span {
                display: inline-block;
                padding: 5px 0;
                position: relative;
                outline: none;
                &:hover {
                    cursor: pointer;
                }
                &.active,
                &:hover {
                    color: ${mainColor};
                }
            }
        }
    }
`;
