import { parse } from 'querystring';
import moment from 'moment';

/* eslint no-useless-escape:0 import/prefer-default-export:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export const isUrl = (path: string): boolean => reg.test(path);

export const isAntDesignPro = (): boolean => {
    if (ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
        return true;
    }
    return window.location.hostname === 'preview.pro.ant.design';
};

// 给官方演示站点用，用于关闭真实开发环境不需要使用的特性
export const isAntDesignProOrDev = (): boolean => {
    const { NODE_ENV } = process.env;
    if (NODE_ENV === 'development') {
        return true;
    }
    return isAntDesignPro();
};

export const getPageQuery = () => parse(window.location.href.split('?')[1]);

export const strToTimestamp = (strDate?: string) => {
    if (strDate === undefined || strDate === null) {
        return null;
    }
    //"2014-07-10 10:21:12"
    let date = new Date(strDate); //时间对象
    let timestamp = date.getTime(); //转换成时间戳
    return timestamp;
};

export const timestampToStr = (timestamp: number | string) => {
    if (!timestamp) {
        return;
    }

    return moment(timestamp).format('YYYY-MM-DD hh:mm:ss');
};

export const timestampToDateStr = (timestamp: number | string) => {
    if (!timestamp) {
        return;
    }
    return moment(timestamp).format('YYYY-MM-DD');
};

export const stringfyV2 = (timestamp: number | string) => {
    if (!timestamp) {
        return;
    }
    // @ts-ignore
    return moment(timestamp).format('YYYY-MM-DD hh:mm');
};

const toDecimal2NoZero = (x) => {
    var f = Math.round(x * 100) / 100;
    var s = f.toString();
    return s;
};

export default {
    timestampToStr,
    timestampToDateStr,
    stringfyV2,
    toDecimal2NoZero,
};
