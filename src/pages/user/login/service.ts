import srequest from '../../../utils/srequest';
import api from '../../../utils/api';

export interface LoginParamsType {
    email: string;
    password: string;
    mobile: string;
    captcha: string;
}



export async function loginByPassword(params: LoginParamsType) {
    return await srequest.post(api.user_api.loginByPassword, params)
}

const getUserByToken = async (token: string) =>{
    return await srequest.get(api.user_api.getUserByToken, {token: token})
}



export default {
    loginByPassword,
    getUserByToken
}
