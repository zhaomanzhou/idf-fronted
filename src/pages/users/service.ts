import request from '@/utils/request';
import api from '@/utils/api';

export const getUserInformationList = async () => {
    return await request.get(api.user_api.getUserList, {});
};

export default {
    getUserInformationList,
};
