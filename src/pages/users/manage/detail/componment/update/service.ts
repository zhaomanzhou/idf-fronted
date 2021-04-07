import moment from 'moment';
import api from '@/utils/api';
import request from '@/utils/request';

const updateUserProxy = async (values, id) => {
    let speed = values.speed.data;
    if (values.speed.dataUnit === 'mbps') {
        speed = speed * 1024;
    }
    let totalData = values.totalData.data;
    if (values.totalData.dataUnit === 'GB') {
        totalData = values.totalData.data * 1024;
    }

    let expireDate = moment(values.expireDate, 'YYYY-MM-DD HH:mm:ss').valueOf();
    if (values.extraActiveDay !== '') {
        expireDate += values.extraActiveDay * 24 * 60 * 60 * 1000;
    }
    let requestParam = {
        id: id,
        level: values.level,
        speed: speed,
        totalData: totalData,
        nextSettleDate: moment(values.nextSettleDate, 'YYYY-MM-DD HH:mm:ss').valueOf(),
        expireDate: expireDate,
        maxConnection: values.maxConnection,
    };

    return await request.get(api.user_api.updateUserProxyInfo, requestParam);
};

export default {
    updateUserProxy,
};
