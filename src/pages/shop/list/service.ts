import request from '@/utils/request';
import api from '@/utils/api';

const getBundleList = async () => {
    return await request.get(api.user_api.getBundleListAdmin, {});
};

export default {
    getBundleList,
};
