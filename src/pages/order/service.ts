import request from '@/utils/request';
import api from '@/utils/api';

export interface PayInfo {
    orderId: number;
    payLink: string;
    payType: string;
    tradeNo: string;
    totalMoney: number;
}

const createPay = async (orderId: number) => {
    return await request.post(api.user_api.createPay, {
        orderId: orderId,
    });
};

const getPayInfo = async (orderId: number) => {
    return await request.get(api.user_api.getPayInfo, {
        orderId: orderId,
    });
};

const cancelOrder = async (orderId: number) => {
    return await request.get(api.user_api.cancelOrder, {
        orderId: orderId,
    });
};

const getOrderListAdmin = async () => {
    return await request.get(api.user_api.getOrderListForAdmin, {
        currentPage: 1,
        pageSize: 4,
    });
};

const getOrderDetail = async (orderId: number) => {
    return await request.get(api.user_api.getOrderDetail, {
        orderId: orderId,
    });
};

const syncOrderPay = async (orderId: number) => {
    return await request.post(api.user_api.syncOrderPay, {
        orderId: orderId,
    });
};

export default {
    createPay,
    getPayInfo,
    cancelOrder,
    getOrderListAdmin,
    getOrderDetail,
    syncOrderPay,
};
