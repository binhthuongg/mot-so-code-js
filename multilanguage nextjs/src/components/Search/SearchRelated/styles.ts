import { mainColor } from '../../../constants/theme';
import css from 'styled-jsx/css';

export default css`
    .SearchRelatedWrapper {
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        padding: 8px 15px;
        border: 1px solid white;
        font-size: 14px;
        z-index: 899;
        max-height: 200px;
        background: #000;
        overflow: auto;
        margin-top: 5px;
        border-radius: 5px;
        opacity: 0;
        visibility: hidden;
        transition: 0.3s ease;
        ul {
            padding-right: 50px;
        }
        li {
            span {
                display: block;
                padding: 5px 0;
                outline: none;
                cursor: pointer;
                &:hover,
                &.active {
                    color: ${mainColor};
                }
            }
        }
    }
`;
