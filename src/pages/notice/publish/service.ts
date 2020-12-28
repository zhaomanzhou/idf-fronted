import srequest from '../../../utils/request';
import api from '../../../utils/api';
import axios from 'axios';
import request from '@/utils/request';

export async function updatePic(params) {
    let formData = new FormData();
    formData.append('file', params.file);
    return await axios({
        method: 'post',
        url: 'http://1.zmz121.cn:8010/file/upload/headpic',
        data: formData,
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
        .then((res) => {
            console.log(res);
            return res;
        })
        .catch((error) => {
            return 'error';
        });
}

const publishNotice = async (param) => {
    return await srequest.post(api.user_api.publishNotice, param);
};

const getNotification = async (param: number) => {
    return await request.get_restful(api.user_api.noticeDetail, param);
};

const modifyNotification = async (param: number) => {
    return await request.post(api.user_api.modifyNotice, param);
};

export default {
    updatePic,
    publishNotice,
    getNotification,
    modifyNotification,
};
