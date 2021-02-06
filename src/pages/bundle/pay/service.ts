import request from '@/utils/request';
import api from '@/utils/api';

const getPayInfo = async (orderId: number) => {
    return await request.get(api.user_api.getPayInfo, {
        orderId: orderId,
    });
};

const checkIsPaid = async (orderId: number) => {
    return request.get(api.user_api.checkIsPaid, {
        orderId: orderId,
    });
};

export default {
    getPayInfo,
    checkIsPaid,
};
