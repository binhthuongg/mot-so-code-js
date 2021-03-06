import css from 'styled-jsx/css';

export default css`
    .FilmNotification {
        display: block;
        position: fixed;
        z-index: 98;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, 0.54);
        border: 1px solid #ffffff;
        padding: 50px;
        &.hide {
            display: none;
        }
        .actions {
            margin-top: 30px;
            text-align: center;
            button {
                display: inline-block;
                &:not(:last-child) {
                    margin-right: 10px;
                }
            }
        }
    }
`;
