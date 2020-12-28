import request from '@/utils/request';
import api from '@/utils/api';

const fetchNotificationList = async () => {
    return await request.get(api.user_api.getNotificationList, {});
};

const updateNoticeStickAndOrderValue = async (param) => {
    return await request.post(api.user_api.updateNoticeStickAndOrderValue, param);
};

export default {
    fetchNotificationList,
    updateNoticeStickAndOrderValue,
};
