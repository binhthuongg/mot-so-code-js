import css from 'styled-jsx/css';

export default css.global`
    .layoutChanel {
        position: relative;
        padding-left: 165px;
        height: 100vh;
        overflow: hidden;
        .layoutChanelSidebar {
            position: absolute;
            width: 165px;
            z-index: 98;
            top: 0;
            left: 0;
            bottom: 0;
        }
        .layoutChanelContent {
            height: 100%;
            overflow: auto;
            padding-bottom: 0;
            position: relative;
            z-index: 1;
            // padding-left: 50px;
        }
    }
`;
