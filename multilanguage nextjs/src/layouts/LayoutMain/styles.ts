import css from 'styled-jsx/css';

export default css.global`
    .LayoutMain {
        position: relative;
        padding-left: 150px;
        .LayoutMainSidebar {
            position: fixed;
            width: 150px;
            z-index: 2;
            top: 0;
            left: 0;
            bottom: 0;
            &.activeSidebar {
                z-index: 666;
            }
        }
        .LayoutMainContent {
            height: 100%;
            overflow: auto;
            padding-bottom: 0;
            position: relative;
            z-index: 3;
            // padding-left: 50px;
        }
    }
`;
