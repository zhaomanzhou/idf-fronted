import request from '@/utils/request';
import api from '@/utils/api';
export interface Order {
    bundleId: number;
    closeTime: object;
    createTime: string;
    id: number;
    orderName: string;
    orderStatus: string;
    payLink: object;
    payTime: object;
    payType: string;
    totalMoney: number;
    totalMonth: number;
    tradeNo: object;
    updateTime: string;
    userId: number;
}

const getBundleDetail = async (id: number) => {
    return await request.get(api.user_api.getBundleDetail, { id: id });
};

const createOrder = async (bundleId: number, totalMonth: number, payType: number) => {
    return await request.post(api.user_api.createOrder, {
        bundleId: bundleId,
        totalMonth: totalMonth,
        payType: 0,
    });
};

const createPay = async (orderId: number) => {
    return await request.post(api.user_api.createPay, {
        orderId: orderId,
    });
};

export default {
    getBundleDetail,
    createOrder,
    createPay,
};
