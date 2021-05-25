import React from 'react';
import ComponentMuaGoiDichVu from '../../../components/MuaGoiDichVu';
import LayoutTaiKhoan from '../../../layouts/LayoutTaiKhoan';
import { ComponentLayout } from '../../../models/ComponentModel';

const MuaGoiDichVu: ComponentLayout = () => {
    return <ComponentMuaGoiDichVu />;
};

MuaGoiDichVu.Layout = LayoutTaiKhoan;

export default MuaGoiDichVu;
