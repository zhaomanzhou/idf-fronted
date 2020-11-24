import { Effect, history, Reducer } from 'umi';


export interface StateType {
    status?: 'ok' | 'error';
    type?: string;
    currentAuthority?: 'user' | 'guest' | 'admin';
}

export interface LoginModelType {
    namespace: string;
    state: StateType;
    effects: {
        login: Effect;
        logout: Effect;
    };
    reducers: {
        changeLoginStatus: Reducer<StateType>;
    };
}

export interface LoginParamByPassword{
    email: string;
    password: string;
}

export interface UserBean{
    avatarUrl: string,
    createTime: string,
    email: string,
    ext: string,
    id: string,
    nickname: string,
    osDevice: number[],
    remark: string,
    role: number,
    updateTime: string
}
