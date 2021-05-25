import instanceDrmToken from './axiosInstanceDrmToken';

type CustomDataType = {
    userId: string;
    sessionId: string;
    merchant: string;
    status: string;
    message: string;
};
type PingType = {
    token: string;
};
type RefreshType = {
    token: string;
};
type EndType = void;

const data = (session?: string, DrmToken?: string) => {
    if (DrmToken) {
        return {
            token: DrmToken,
        };
    }

    return {
        session,
    };
};
const DrmTokenFunction = {
    customData: (): Promise<CustomDataType> => {
        const url = '/CustomData';
        const params = {
            env: 'production',
        };
        return instanceDrmToken.get(url, { params });
    },
    ping: (session?: string, DrmToken?: string): Promise<PingType> => {
        const url = '/Ping';
        const params = data(session, DrmToken);
        return instanceDrmToken.get(url, { params });
    },
    refresh: (session: string): Promise<RefreshType> => {
        const url = '/Refresh';
        const params = {
            session,
        };
        return instanceDrmToken.get(url, { params });
    },
    end: (token: string | null): Promise<EndType> => {
        const url = '/End';
        const params = {
            token,
        };
        return instanceDrmToken.get(url, { params });
    },
};
export default DrmTokenFunction;
