import request from '@/utils/request';
import api from '@/utils/api';

const getPacketBundleList = async () => {
    return await request.get_restful(api.user_api.noticeDetail, {});
};

export default {
    getPacketBundleList,
};
