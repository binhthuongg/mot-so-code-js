import React, { useState } from 'react';
import SidebarMain from '../../components/Sidebar/SidebarMain';
// import styles from './styles.module.scss';
import styles from './styles';

type PropType = {
    children?: React.ReactNode;
};
function LayoutMain(props: PropType): React.ReactElement {
    const [activeSidebar, setActiveSidebar] = useState(false);
    const showClassActiveSidebar = (activeSidebar: boolean) => {
        return activeSidebar ? 'activeSidebar' : '';
    };
    const setClassActiveSidebar = (status: boolean) => {
        setActiveSidebar(status);
    };
    return (
        <div className='LayoutMain'>
            <div
                className={`LayoutMainSidebar ${showClassActiveSidebar(
                    activeSidebar,
                )}`}
                onMouseEnter={() => setClassActiveSidebar(true)}
                onMouseLeave={() => setClassActiveSidebar(false)}
            >
                {/* <Sidebar /> */}
                <SidebarMain />
            </div>
            <div className='LayoutMainContent' id='layoutMainContent'>
                {props.children}
            </div>
            <style jsx>{styles}</style>
        </div>
    );
}

export default LayoutMain;
