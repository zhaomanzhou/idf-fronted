
import service from './service';
import {LoginModelType, LoginParamByPassword, UserVo} from "@/pages/user/login/data";
import {getPageQuery} from "@/utils/utils";
import {message} from "antd";
import {history} from "@@/core/history";
import {setAuthority} from "@/utils/authority";
import {stringify} from "querystring";


const LoginModel: LoginModelType = {
    namespace: 'login',
    state: {
        currentAuthority: 'guest'
    },
    effects: {
        * login({ payload }, { call, put, select }) {
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


            let user:UserVo = yield call(service.getUserByToken, token);
            yield put({
                type: 'global/setToken',
                payload: token,
            });
            yield put({
                type: 'global/setUser',
                payload: user,
            })

            yield put({
                type: 'changeLoginStatus',
                payload: user.role,
            })



            const urlParams = new URL(window.location.href);
            const params = getPageQuery();
            message.success('🎉 🎉 🎉  登录成功！');
            let { redirect } = params as { redirect: string };
            if (redirect) {
                const redirectUrlParams = new URL(redirect);
                if (redirectUrlParams.origin === urlParams.origin) {
                    redirect = redirect.substr(urlParams.origin.length);
                    if (redirect.match(/^\/.*#/)) {
                        redirect = redirect.substr(redirect.indexOf('#') + 1);
                    }
                } else {
                    window.location.href = '/';
                    return;
                }
            }
            history.replace(redirect || '/');



        },

        logout() {
            if (window.location.pathname !== '/user/login') {
                setTimeout(() => {
                    history.replace({
                        pathname: '/user/login',
                        search: stringify({
                            redirect: window.location.href,
                        }),
                    });
                }, 100)

            }
        },
    },

    reducers: {
        changeLoginStatus(state, { payload }) {
            setAuthority(payload);
            state.currentAuthority = payload;
            return state;
        },
    },
};

export default LoginModel;



