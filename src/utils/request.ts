import axios from 'axios';
import { apiPortMap } from './api';
import { message } from 'antd';
import querystring from 'querystring';
import { history } from 'umi';

const response_status = {
    success: 200,
    unlogin: 401,
    invalidToken: 1007,
};
axios.defaults.timeout = 5000;
axios.defaults.headers.post['Content-Type'] =
    'application/x-www-form-urlencoded;charset=UTF-8;Accept-Language:zh-CN,zh;q=0.8';

// 返回拦截器
axios.interceptors.response.use(
    (config) => {
        try {
            let response = config.data;
            if (response !== undefined) {
                if (response.status === response_status.success) {
                    return response.data;
                } else if (
                    response.status === response_status.unlogin ||
                    response.status === response_status.invalidToken
                ) {
                    message.error('登陆已过期，请重新登陆');
                    history.push('/user/login');
                } else {
                    message.error(response.msg);
                    console.log(response);
                }
                return Promise.reject(response.msg);
            }
        } catch (err) {
            message.error(err.message);
            return Promise.reject(err.message);
        }
    },
    (error) => {
        message.error(error.message);
        return Promise.reject(error);
    },
);

function genDomain(url: string) {
    let api_obj = apiPortMap.get(url + '');
    return api_obj.server + ':' + api_obj.port;
}

let token = '';

const refreshAxiosConfig = (token1: string) => {
    token = token1;
};

const get = async (url: string, parmas: string | any) => {
    let domain = genDomain(url);
    url = domain + url;
    return await axios
        .get(url, {
            params: parmas,
            headers: { token: token },
        })
        .then((res) => {
            return res;
        })
        .catch((err) => {
            // throw err;
            return Promise.reject(err);
        });
};
const post = async (url: string, params: string | any) => {
    let domain = genDomain(url);
    url = domain + url;
    return await axios
        .post(url, querystring.stringify(params), {
            headers: { token: token },
        })
        .then((res) => {
            return res;
        })
        .catch((err) => {
            // throw err;
            return Promise.reject(err);
        });
};

const post_json = (url: string, body: any, param: any) => {
    let domain = genDomain(url);
    url = domain + url;
    if (param) {
        url = url + parseRequestParam(param);
    }

    return new Promise((resolve, reject) => {
        axios
            .post(url, body, {
                headers: { token: token },
            })
            .then((res) => {
                resolve(res);
            })
            .catch((err) => {
                throw err;
                // reject(err);
            });
    });
};

const get_restful = async (url: string, parmas: string | any) => {
    let domain = genDomain(url);
    url = domain + url + parmas;
    return await axios
        .get(url, {
            headers: { token: token },
        })
        .then((res) => {
            return res;
        })
        .catch((err) => {
            // throw err;
            return Promise.reject(err);
        });
};

const post_restful = async (url: string, parmas: string | any) => {
    let domain = genDomain(url);
    url = domain + url + parmas;
    return await axios
        .post(
            url,
            {},
            {
                headers: { token: token },
            },
        )
        .then((res) => {
            return res;
        })
        .catch((err) => {
            // throw err;
            return Promise.reject(err);
        });
};

const parseRequestParam = (param: any) => {
    let res = '';
    let length = Object.keys(param).length;
    if (length === 0) {
        return '';
    }
    let i = 0;
    for (let val in param) {
        if (i > 0) {
            res = res + '&';
        } else {
            res = res + '?';
        }
        i++;
        res += val + '=' + param[val];
    }

    return res;
};

export { get, post, post_json, refreshAxiosConfig, get_restful, post_restful, genDomain };
export default { get, post, post_json, refreshAxiosConfig, get_restful, post_restful, genDomain };
