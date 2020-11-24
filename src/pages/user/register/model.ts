import { Effect, Reducer } from 'umi';

import service from './service';
import { message } from 'antd';

export interface StateType {
    status?: 'ok' | 'error';
    currentAuthority?: 'user' | 'guest' | 'admin';
}

export interface ModelType {
    namespace: string;
    state: StateType;
    effects: {
        submit: Effect;
        sendVcode: Effect;
    };
    reducers: {
        registerHandle: Reducer<StateType>;
    };
}

const Model: ModelType = {
    namespace: 'userAndregister',

    state: {
        status: undefined,
    },

    effects: {
        * submit({ payload }, { call, put }) {
            yield call(service.register, payload);
            yield put({
                type: 'registerHandle',
            });
        },

        * sendVcode({ payload }, { call, put }) {
            yield call(service.getVcode, payload);
            message.success('验证码已发送，请注意查收！');
        },
    },

    reducers: {
        registerHandle(state) {
            return {
                ...state,
                status: 'ok',
            };
        },
    },
};

export default Model;
