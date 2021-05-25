import { AxiosResponse } from 'axios';
import * as LOCAL_STORAGE from '../../constants/LocalStorage';
import * as CONSTANTS from '../../constants/utils';
import { isClientSide } from '../utils';
import instanceUserSunshineTv from './axiosInstanceUserSunshineTv';

export const sunshineAccountApi = {
    getAccountInfo: (): Promise<AxiosResponse> => {
        const url = '/GetAccountInfo';
        return instanceUserSunshineTv.get(url);
    },
    getPackages: (): Promise<AxiosResponse> => {
        const url = '/GetPackages';
        return instanceUserSunshineTv.get(url);
    },
    getMyPackage: (): Promise<AxiosResponse> => {
        const url = '/GetMyPackage';
        return instanceUserSunshineTv.get(url);
    },
    getMyTransaction: (): Promise<AxiosResponse> => {
        const url = '/GetMyTransaction';
        return instanceUserSunshineTv.get(url);
    },
    activeCodeSet: (
        code: string,
        phone_number?: string,
    ): Promise<AxiosResponse> => {
        const url = '/ActiveCodeSet';
        if (phone_number) {
            return instanceUserSunshineTv.post(url, {
                code,
                phone_number,
                env: 'production',
            });
        }
        return instanceUserSunshineTv.post(url, {
            code,
            env: 'production',
        });
    },
    packageOrder: (package_id: string): Promise<AxiosResponse> => {
        const url = '/PackageOrder';
        return instanceUserSunshineTv.post(url, {
            package_id,
        });
    },
    getPackageOrderStatus: (trans_id?: number): Promise<AxiosResponse> => {
        const url = '/GetPackageOrderStatus';
        const params = {
            trans_id,
        };
        return instanceUserSunshineTv.get(url, { params });
    },
    deviceLoginSet: (): Promise<AxiosResponse> => {
        const device_code = isClientSide
            ? localStorage.getItem(LOCAL_STORAGE.DEVICE_CODE)
            : '';
        const device_name = CONSTANTS.DEVICE_NAME;
        const url = '/DeviceLoginSet';
        return instanceUserSunshineTv.post(url, {
            device_code,
            device_name,
        });
    },
    deleteDevice: (device_code_del: string[]): Promise<AxiosResponse> => {
        const device_loging = LOCAL_STORAGE.DEVICE_CODE
            ? LOCAL_STORAGE.DEVICE_CODE
            : '';
        const url = '/DeleteDevice';
        return instanceUserSunshineTv.post(url, {
            device_code_del,
            device_loging,
        });
    },
};
