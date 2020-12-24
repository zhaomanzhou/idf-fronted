import srequest from '../../../utils/request';
import api from '../../../utils/api';
import axios from 'axios';





export async function updatePic(params) {

    let formData = new FormData();
    formData.append("file",params.file);
    return await axios({
            method: 'post',
            url: 'http://1.zmz121.cn:8010/file/upload/headpic',
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }).then(res => {
            console.log(res)
            return res;
        }).catch(error => {
            return 'error';
        });
}

const publishNotice = async (param) =>{
    return await srequest.post(api.user_api.publishNotice, param);
}


export default {
    updatePic,
    publishNotice
}
