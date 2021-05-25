export interface MyPackageModel {
    package_name: string;
    timeout_des: string;
    expiry_str: string;
    timeout: string;
}
export interface PackageOrderModel {
    id: string;
    user_id: string;
    package_id: string;
    booking_no: string;
    qr_code: string;
    trans_id: number;
    expire_date: string;
}

export interface PackageModel {
    id: string;
    name?: string;
    name_en?: string;
    amount?: string;
    pay_qr?: string;
    bank_acc?: string;
    amtofmonth?: string;
    bank_name?: string;
    bank_num?: string;
    image_link?: string;
    description?: string;
    packageOrder: PackageOrderModel;
    showQR?: boolean;
}

export interface thietBiModel {
    device_name: string;
    is_logging: string;
    id: number;
    device_code: string;
    login_time: string;
    status: boolean;
    checked?: boolean;
}

export interface chanelModel {
    link_live: string;
    name: string;
    image: string;
    live_id?: string;
    id?: string;
}
