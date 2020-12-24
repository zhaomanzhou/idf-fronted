import {Reducer, Effect} from '@/models/connect'

export interface StateType {
    status?: 'ok' | 'error';
    type?: string;
    currentAuthority?: 'user' | 'guest' | 'admin';
}

export interface LoginModelType {
    namespace: string;
    state: StateType;
    effects: {
        [propName: string]: Effect;
    };
    reducers: {
        [propName: string]: Reducer<StateType>;
    };
}

export interface LoginParamByPassword {
    email: string;
    password: string;
}

export interface UserVo {
    avatarUrl: string;
    createTime: string;
    email: string;
    ext: string;
    id: string;
    nickname: string;
    osDevice: number[];
    remark: string;
    role: number;
    updateTime: string;
}

export default {
    StateType,
    LoginModelType,
    LoginParamByPassword,
    UserBean
}
