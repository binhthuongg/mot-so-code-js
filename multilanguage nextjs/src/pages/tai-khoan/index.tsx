import React from 'react';
import Account from '../../components/Account';
import LayoutTaiKhoan from '../../layouts/LayoutTaiKhoan';
import { ComponentLayout } from '../../models/ComponentModel';

const TaiKhoan: ComponentLayout = () => {
    return <Account />;
};

TaiKhoan.Layout = LayoutTaiKhoan;

export default TaiKhoan;
