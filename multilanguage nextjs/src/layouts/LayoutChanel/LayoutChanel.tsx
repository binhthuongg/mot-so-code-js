import React from 'react';
import ChanelHeader from '../../components/ChanelHeader';
import SidebarMain from '../../components/Sidebar/SidebarMain';
import styles from './styles';

type PropType = {
    children?: React.ReactNode;
};
function LayoutChanel(props: PropType): React.ReactElement {
    return (
        <div className='layoutChanel'>
            <div className='layoutChanelSidebar'>
                <SidebarMain />
            </div>
            <div className='layoutChanelContent'>
                <div className='layoutChanelMenu'>
                    <ChanelHeader />
                </div>
                {props.children}
            </div>
            <style jsx>{styles}</style>
        </div>
    );
}

export default LayoutChanel;
