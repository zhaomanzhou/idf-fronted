export const orderStatusToText = (orderStatus: string) => {
    switch (orderStatus) {
        case 'INITIAL_CREATED':
            return '刚创建';
        case 'WAIT_TO_SCAN':
            return '等待扫码';
        case 'WAIT_TO_PAY':
            return '等待付款';
        case 'CANCEL_USER':
            return '用户取消';
        case 'CANCEL_TIMEOUT':
            return '超时取消';
        case 'SUCCESS':
            return '已完成';
        default:
            return '未知';
    }
};

export const orderStatusToNumber = (orderStatus: string) => {
    switch (orderStatus) {
        case 'INITIAL_CREATED':
            return 0;
        case 'WAIT_TO_SCAN':
            return 5;
        case 'WAIT_TO_PAY':
            return 10;
        case 'CANCEL_USER':
            return 21;
        case 'CANCEL_TIMEOUT':
            return 22;
        case 'SUCCESS':
            return 30;
        default:
            return -1;
    }
};
