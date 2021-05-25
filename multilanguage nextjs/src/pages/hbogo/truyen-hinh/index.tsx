import Link from 'next/link';
import React from 'react';
import LayoutChanel from '../../../layouts/LayoutChanel/LayoutChanel';
import { ComponentLayout } from '../../../models/ComponentModel';
import TruyenHinh1 from './images/TruyenHinh1.jpg';
import TruyenHinh2 from './images/TruyenHinh2.jpg';
import TruyenHinh3 from './images/TruyenHinh3.jpg';
import styles from './styles.module.scss';

type TruyenHinhType = {
    imageUrl: string;
};
const TruyenHinh: ComponentLayout = () => {
    const listTruyenHinh: TruyenHinhType[] = [
        {
            imageUrl: TruyenHinh1,
        },
        {
            imageUrl: TruyenHinh2,
        },
        {
            imageUrl: TruyenHinh3,
        },
    ];
    const renderListTruyenHinh = (listTruyenHinh: TruyenHinhType[]) => {
        const html = [];
        for (let i = 0; i < listTruyenHinh.length; i += 1) {
            html.push(
                <li key={i}>
                    <Link href='/hbogo'>
                        <a>
                            <img src={listTruyenHinh[i].imageUrl} alt='' />
                        </a>
                    </Link>
                </li>,
            );
        }
        return html;
    };
    return (
        <div className={styles.TruyenHinhWrapper}>
            <div className={styles.listTruyenHinh}>
                <ul>{renderListTruyenHinh(listTruyenHinh)}</ul>
            </div>
        </div>
    );
};

TruyenHinh.Layout = LayoutChanel;

export default TruyenHinh;
