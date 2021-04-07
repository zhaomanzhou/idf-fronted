export interface UserInfoLite {
    id: number;
    createTime: string;
    email: string;
    avatarUrl: string;
    role: string;
    status: string;
    remark: string;
    osDevice: number;
    ext: string;
    level: number;
    speed: number;
    totalData: number;
    usedData: number;
    nextSettleDate: string;
    expireDate: string;
    maxConnection: number;
    bundleId: number;
    bundleName: number;
    totalActiveDay: number;
    namespace: number;
}

export interface User {
    id: number;
    nickname: object;
    email: string;
    avatarUrl: object;
    role: string;
    remark: string;
    osDevice: string[];
    ext: object;
    updateTime: number;
    createTime: number;
    status: number;
}

export interface UserProxyInfo {
    id: number;
    level: number;
    speed: number;
    totalData: number;
    usedData: number;
    nextSettleDate: number;
    expireDate: number;
    maxConnection: number;
    bundleId: number;
    bundleName: string;
    totalActiveDay: number;
    namespace: number;
}
