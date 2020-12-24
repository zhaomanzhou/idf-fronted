import {NoticeListModelType, StateType} from "@/pages/notice/list/data";
import service from "@/pages/notice/list/service";
import {NoticeDetailModelType} from "@/pages/notice/detail/data";


const Model: NoticeDetailModelType = {
    namespace: 'NoticeDetail',

    state: {
        notification: null,
    },

    effects: {

        * getNotification(action, effects) {
            const noticeList = yield effects.call(service.fetchNotificationList, action.payload)
            yield effects.put({
                type: "setNoticeList",
                payload: noticeList,
            })
        },
    },

    reducers: {
        setNotification(state, action) {
            state.notification = action.payload;
            return state;
        }
    },
    subscriptions: {
        keyboardWatcher({dispatch, history}) {
            history.listen((location, action) =>{
                location.pathname
            })
        },
    }
};

export default Model;
