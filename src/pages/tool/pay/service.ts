import request from '@/utils/request';
import api from '@/utils/api';

const syncPay = async (orderId: number) => {
    return await request.get_restful(api.user_api.queryOrderPay, orderId);
};

export default {
    syncPay,
};
