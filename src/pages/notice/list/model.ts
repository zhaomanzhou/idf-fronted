import { NoticeListModelType, StateType } from '@/pages/notice/list/data';
import service from '@/pages/notice/list/service';

const Model: NoticeListModelType = {
    namespace: 'noticeList',

    state: {
        notificationList: [],
        instructionList: [],
        knowledgeList: [],
    },

    effects: {
        *getNotificationList(action, effects) {
            const noticeList = yield effects.call(service.fetchNotificationList);
            yield effects.put({
                type: 'setNotificationList',
                payload: noticeList,
            });
        },

        *getInstructionList(action, effects) {
            const noticeList = yield effects.call(service.fetchInstructionList);
            yield effects.put({
                type: 'setInstructionList',
                payload: noticeList,
            });
        },

        *getKnowledgeList(action, effects) {
            const noticeList = yield effects.call(service.fetchKnowledgeList);
            yield effects.put({
                type: 'setKnowledgeList',
                payload: noticeList,
            });
        },
    },

    reducers: {
        setNotificationList(state, action) {
            state.notificationList = action.payload;
            return state;
        },
        setInstructionList(state, action) {
            state.instructionList = action.payload;
            return state;
        },
        setKnowledgeList(state, action) {
            state.knowledgeList = action.payload;
            return state;
        },
    },
    subscriptions: {},
};

export default Model;
