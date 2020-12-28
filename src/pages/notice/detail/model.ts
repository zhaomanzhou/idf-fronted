import { NoticeDetailModelType } from '@/pages/notice/detail/data';
import service from '@/pages/notice/detail/service';

const Model: NoticeDetailModelType = {
    namespace: 'noticeDetail',

    state: {
        notification: {
            id: 1,
            title: '',
            contentMarkdown: '',
            contentHtml: '',
            noticeType: 1,
            stick: false,
            orderValue: 20201224165053,
            updateTime: '2020-12-25',
            createTime: '2020-12-25',
        },
    },

    effects: {
        *getNotification(action, effects) {
            const notice = yield effects.call(service.getNotification, action.payload);
            yield effects.put({
                type: 'setNotification',
                payload: notice,
            });
        },
    },

    reducers: {
        setNotification(state, action) {
            state.notification = action.payload;
            return state;
        },
    },
    subscriptions: {
        keyboardWatcher({ dispatch, history }) {
            history.listen((location, action) => {
                const pathPrefix = '/notice/detail/';
                // if(location.pathname.indexOf(pathPrefix) != -1)
                // {
                //     let id = location.pathname.substring(location.pathname.indexOf(pathPrefix) + pathPrefix.length)
                //     dispatch({
                //         type: 'getNotification',
                //         payload: id,
                //     });
                // }
            });
        },
    },
};

export default Model;
