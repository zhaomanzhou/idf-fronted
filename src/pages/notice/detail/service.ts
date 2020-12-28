import request from '@/utils/request';
import api from '@/utils/api';

const getNotification = async (param: number) => {
    return await request.get_restful(api.user_api.noticeDetail, param);
};

export default {
    getNotification,
};
