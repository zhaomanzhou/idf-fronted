import request from 'umi-request';
import srequest from '../../../utils/srequest'
import api from '../../../utils/api'
import { UserRegisterParams } from './register';

export async function fakeRegister(params: UserRegisterParams) {
  return request('/api/register', {
    method: 'POST',
    data: params,
  });
}

export async function getVcode(email: string){
  return srequest.get(api.user_api.getVcode, { email: email })

}

export const register = async (params: UserRegisterParams ) =>{
  return  await srequest.post(api.user_api.register, params)
      .then(res => {return res})
      .catch(err => {throw new Error(err)})
}



export default {
  fakeRegister,
  getVcode,
  register
}
