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

export default {
    createPay,
    getPayInfo,
};
