import request from '@/utils/request';
import api from '@/utils/api';

const fetchNotificationList = async () => {
    return await request.get(api.user_api.getNotificationList, {});
};

const updateNoticeStickAndOrderValue = async (param) => {
    return await request.post(api.user_api.updateNoticeStickAndOrderValue, param);
};

const downNotice = async (param) => {
    return await request.post_restful(api.user_api.downNotice, param);
};

const putUpNotice = async (param) => {
    return await request.post_restful(api.user_api.putUpNotice, param);
};

const deleteNotice = async (param) => {
    return await request.post_restful(api.user_api.deleteNotice, param);
};

export default {
    fetchNotificationList,
    updateNoticeStickAndOrderValue,
    downNotice,
    deleteNotice,
    putUpNotice,
};
