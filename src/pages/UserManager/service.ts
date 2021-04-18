import request from '@/utils/request';
import api from '@/utils/api';

export const getUserInformationList = async () => {
    return await request.get(api.user_api.getUserList, {});
};

export const rechargeByPerson = async (bundleId: number, period: number, userId: number) => {
    return await request.post(api.user_api.rechargeByPerson, {
        bundleId: bundleId,
        period: period,
        userId: userId,
    });
};

export default {
    getUserInformationList,
    rechargeByPerson,
};
