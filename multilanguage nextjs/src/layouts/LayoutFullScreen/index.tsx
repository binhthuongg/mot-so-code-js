import React from 'react';
import styles from './styles';

type PropType = {
    children?: React.ReactNode;
};
function LayoutFullScreen(props: PropType): React.ReactElement {
    return (
        <div className='LayoutFullScreen'>
            <div className='LayoutFullScreenContent'>
                {props.children}
                <style jsx>{styles}</style>
            </div>
        </div>
    );
}

export default LayoutFullScreen;
