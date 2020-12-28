import request from '@/utils/request';
import api from '@/utils/api';

const fetchNotificationList = async () => {
    return await request.get(api.user_api.getNotificationList, {});
};

const fetchInstructionList = async () => {
    return await request.get(api.user_api.getInstructionList, {});
};

const fetchKnowledgeList = async () => {
    return await request.get(api.user_api.getKnowledgeList, {});
};

export default {
    fetchNotificationList,
    fetchInstructionList,
    fetchKnowledgeList,
};
