export interface OrderToUser {
    id: number;
    createTime: number;
    bundleId: number;
    totalMonth: number;
    orderName: string;
    totalMoney: number;
    payType: string;
    payLink: string;
    orderStatus: string;
    bundleName: string;
}

export interface OrderToAdmin {
    id: number;
    createTime: number;
    payTime: object;
    closeTime: object;
    bundleId: number;
    totalMonth: number;
    orderName: string;
    totalMoney: number;
    payType: string;
    tradeNo: string;
    payLink: string;
    orderStatus: string;
    bundleName: string;
    userId: number;
    userEmail: object;
}

export interface OrderToAdminDetail {
    id: number;
    createTime: number;
    payTime: number;
    closeTime: number;
    scanTime: number;
    bundleId: number;
    totalMonth: number;
    orderName: string;
    totalMoney: number;
    payType: string;
    tradeNo: string;
    payLink: string;
    orderStatus: string;
    bundleName: string;
    userId: number;
    userEmail: string;
    buyerId: string;
    buyerLogonId: string;
}
