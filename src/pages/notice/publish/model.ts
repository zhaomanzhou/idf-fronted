import service from '@/pages/notice/publish/service';
import { message } from 'antd';
import { Notice } from '@/pages/notice/list/data';
import { Effect, Reducer } from '@/models/connect';
import { History } from 'history';
import { history } from 'umi';

export interface StateType {
    modify: boolean;
    originNotice: Notice | null;
}

export interface PublishNoticeModelType {
    namespace: string;
    state: StateType;
    effects: {
        [propName: string]: Effect;
    };
    reducers: {
        [propName: string]: Reducer<StateType>;
    };
}

const Model: PublishNoticeModelType = {
    namespace: 'publishNotice',

    state: {
        modify: false,
        originNotice: null,
    },

    effects: {
        *publish({ payload }, effect) {
            yield effect.call(service.publishNotice, payload);
            message.success('发布成功');
            history.push('/notice/manage');
        },

        *getModifyNotice({ payload }, effects) {
            const notice = yield effects.call(service.getNotification, payload);
            yield effects.put({
                type: 'setModifyNotice',
                payload: notice,
            });
        },

        *modifyNotice({ payload }, effects) {
            yield effects.call(service.modifyNotification, payload);
            message.success('修改成功');
            history.push('/notice/manage');
        },
    },

    reducers: {
        setModifyNotice(state, action) {
            state.modify = true;
            state.originNotice = action.payload;
            return state;
        },
    },
};

export default Model;
