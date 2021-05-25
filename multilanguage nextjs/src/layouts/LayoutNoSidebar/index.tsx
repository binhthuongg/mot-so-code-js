import React from 'react';
import Header from '../../components/Header';
import styles from './styles';

type PropType = {
    children?: React.ReactNode;
};
function LayoutNoSidebar(props: PropType): React.ReactElement {
    return (
        <div className='LayoutNoSidebar'>
            <Header />
            <div className='LayoutNoSidebarContent'>{props.children}</div>
            <style jsx>{styles}</style>
        </div>
    );
}

export default LayoutNoSidebar;
