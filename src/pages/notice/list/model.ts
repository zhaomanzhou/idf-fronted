import {NoticeListModelType, StateType} from "@/pages/notice/list/data";
import service from "@/pages/notice/list/service";


const Model: NoticeListModelType = {
    namespace: 'noticeList',

    state: {
        NotificationList: [],
    },

    effects: {

        * getNotificationList(action, effects) {
            const noticeList = yield effects.call(service.fetchNotificationList)
            yield effects.put({
                type: "setNoticeList",
                payload: noticeList,
            })
        },
    },

    reducers: {
        setNoticeList(state, action) {
            state.NotificationList = action.payload;
            return state;
        }
    },
    subscriptions: {
        keyboardWatcher({dispatch}) {

        },
    }
};

export default Model;
