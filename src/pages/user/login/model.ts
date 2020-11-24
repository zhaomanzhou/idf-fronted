
import { Effect, history, Reducer } from 'umi';

import service from './service';
import { LoginModelType } from '../../../models/login';



const LoginModel: LoginModelType = {
    namespace: 'login',
    state: {
        status: undefined,
    },

    effects: {
        * login({ payload }, { call, put }) {
            let token: string;
            switch (payload.type)
            {
                case "account" :{
                    let param: LoginParamByPassword = {
                        email: payload.email,
                        password: payload.password
                    }
                    token = yield call(service.loginByPassword, param)
                    break;
                }
                case "vcode" :{
                    let param = {
                        email: payload.email,
                        vcode: payload.captcha
                    }
                    console.log(param);
                    return;
                }
                default: return;
            }

            // @ts-ignore
            let user:UserBean = yield call(service.getUserByToken, token);



        },

        logout() {

        },
    },

    reducers: {

    },
};

export default LoginModel;


