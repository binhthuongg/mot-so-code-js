import * as LOCAL_STORAGE from '../constants/LocalStorage';
import DrmTokenFunction from './API/drmToken';
import { isClientSide } from './utils';

const getLocalDrmToken = isClientSide
    ? localStorage.getItem(LOCAL_STORAGE.DRM_TOKEN)
    : '';

// export const DrmCustomData = (): void => {
// 	DrmTokenFunction.customData().then((response) => {

// 		}
// };
export const DrmCustomData = (): void => {
    DrmTokenFunction.customData().then((response) => {
        // eslint-disable-next-line no-console
        console.log('response', response);
    });
};

export const DrmEnd = (): void => {
    DrmTokenFunction.end(getLocalDrmToken).then((response) => {
        // eslint-disable-next-line no-console
        console.log('response', response);
    });
};
