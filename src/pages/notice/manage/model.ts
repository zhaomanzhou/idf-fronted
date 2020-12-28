import { NoticeManageModelType } from '@/pages/notice/manage/data';
import service from '@/pages/notice/manage/service';
import { message } from 'antd';

const Model: NoticeManageModelType = {
    namespace: 'noticeManage',

    state: {
        NotificationList: [],
    },

    effects: {
        *getNotificationList(action, effects) {
            const noticeList = yield effects.call(service.fetchNotificationList);
            yield effects.put({
                type: 'setNoticeList',
                payload: noticeList,
            });
        },

        *updateNoticeStickAndOrderValue(action, effects) {
            yield effects.call(service.updateNoticeStickAndOrderValue, action.payload);
            message.success('更新成功');
        },
    },

    reducers: {
        setNoticeList(state, action) {
            state.NotificationList = action.payload;
            return state;
        },
    },
    subscriptions: {},
};

export default Model;
