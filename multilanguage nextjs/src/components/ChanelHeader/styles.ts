import { mainColor } from '../../constants/theme';
import css from 'styled-jsx/css';

export default css`
    .ChanelHeader {
        padding: 12px 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .sectionNavigation {
            li {
                display: inline-block;
                margin-right: 55px;
                padding: 5px 0 10px 0;
                position: relative;
                &:before {
                    content: '';
                    display: none;
                    position: absolute;
                    z-index: 1;
                    left: 0;
                    right: 0;
                    height: 8px;
                    border-radius: 100px;
                    bottom: 0;
                    background: ${mainColor};
                }
                &:hover,
                &.active {
                    &:before {
                        display: block;
                    }
                }
                a {
                    display: block;
                    color: inherit;
                }
                .text {
                    display: block;
                }
            }
        }
        .sectionChanelLogo {
            padding-right: 30px;
            margin-left: 100px;
        }
    }
`;
