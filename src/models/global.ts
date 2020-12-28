import { Reducer, Effect } from 'umi';

import { NoticeIconData } from '@/components/NoticeIcon';
import { UserVo } from '@/pages/user/login/data';
import service from '@/pages/user/login/service';
import request from '@/utils/request';

export interface NoticeItem extends NoticeIconData {
    id: string;
    type: string;
    status: string;
}

export interface GlobalModelState {
    collapsed: boolean;
    token: string;
    user: UserVo | null;
}

export interface GlobalModelType {
    namespace: 'global';
    state: GlobalModelState;
    effects: {
        [propType: string]: Effect;
    };
    reducers: {
        [propType: string]: Reducer<any>;
    };
}

const GlobalModel: GlobalModelType = {
    namespace: 'global',

    state: {
        collapsed: true,
        token: '',
        user: null,
    },

    effects: {
        *initUserFromLocalStorage(action, effect) {
            let user: UserVo = yield effect.select((state: any) => state.global.user);
            if (user !== null && user !== undefined) {
                return;
            }
            let tokenItem = yield effect.select((state: any) => state.global.token);
            if (!tokenItem) {
                tokenItem = localStorage.getItem('token');
            }
            if (tokenItem) {
                user = yield effect.call(service.getUserByToken, tokenItem);
                yield effect.put({
                    type: 'setToken',
                    payload: tokenItem,
                });
                yield effect.put({
                    type: 'setUser',
                    payload: user,
                });
            }
        },
    },

    reducers: {
        setToken(state, action) {
            state.token = action.payload;
            localStorage.setItem('token', action.payload);
            request.refreshAxiosConfig(action.payload);
            return state;
        },

        setUser(state: GlobalModelState, action) {
            state.user = action.payload;
            return state;
        },

        changeLayoutCollapsed(state = { collapsed: true }, { payload }): GlobalModelState {
            return {
                ...state,
                collapsed: payload,
            };
        },
    },
};

export default GlobalModel;
