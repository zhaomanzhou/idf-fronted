import request from '@/utils/request';
import api from '@/utils/api';

const getBundleList = async () => {
    return await request.get(api.user_api.getBundleListAdmin, {});
};

/**
 * 添加套餐，传入的参数是NewBundle.tsx里Form提交后的结果
 * 需要自行转换
 * @param values
 */
const addNewBundle = async (values) => {
    let maxSpeed = 0;
    if (!values.notLimitSpeed) {
        maxSpeed = values.maxSpeed;
    }

    let totalDataMb = 0;
    if (values.totalData.dataUnit === 'MB') {
        totalDataMb = values.totalData.data;
    } else if (values.totalData.dataUnit === 'GB') {
        totalDataMb = values.totalData.data * 1024;
    }
    let newBundle = {
        name: values.name,
        totalData: totalDataMb,
        speed: maxSpeed,
        maxConnection: values.maxConnection,
        level: values.level,
        duration: values.duration,
        active: values.active,
        description: values.description,
    };
    return await request.post(api.user_api.addNewBundle, newBundle);
};

const updateBundle = async (values, id) => {
    let maxSpeed = 0;
    if (!values.notLimitSpeed) {
        maxSpeed = values.maxSpeed;
    }

    let totalDataMb = 0;
    if (values.totalData.dataUnit === 'MB') {
        totalDataMb = values.totalData.data;
    } else if (values.totalData.dataUnit === 'GB') {
        totalDataMb = values.totalData.data * 1024;
    }
    let newBundle = {
        id: id,
        name: values.name,
        totalData: totalDataMb,
        speed: maxSpeed,
        maxConnection: values.maxConnection,
        level: values.level,
        duration: values.duration,
        active: values.active,
        description: values.description,
    };
    return await request.post_json(api.user_api.updateBundle, newBundle, {});
};

const getBundleDetailAdmin = async (id: number) => {
    return await request.get(api.user_api.getBundleDetailAdmin, { id: id });
};

const deleteBundleAdmin = async (id: number) => {
    return await request.post(api.user_api.deleteBundleAdmin, { id: id });
};

export default {
    getBundleList,
    addNewBundle,
    getBundleDetailAdmin,
    deleteBundleAdmin,
    updateBundle,
};
