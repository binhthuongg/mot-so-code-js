import Link from 'next/link';
import React from 'react';
import styles from './styles';

type PropType = {
    setShowNotification: (status: boolean) => void;
};
function FilmNotification(props: PropType): React.ReactElement {
    const { setShowNotification } = props;
    const hide = () => {
        setShowNotification(false);
    };
    return (
        <div className='FilmNotification'>
            <h3 className='title'>
                Bạn cần nâng cấp tài khoản để xem nội dung này.
            </h3>
            <div className='actions'>
                <button type='button' className='button' onClick={() => hide()}>
                    Bỏ qua
                </button>
                <button type='button' className='button'>
                    <Link href='/tai-khoan/mua-goi-dich-vu'>
                        <a>Nâng cấp</a>
                    </Link>
                </button>
            </div>
            <style jsx>{styles}</style>
        </div>
    );
}

export default FilmNotification;
