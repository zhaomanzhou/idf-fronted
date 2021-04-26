const servers = {
    local: 'http://localhost',
    aliyun: 'http://1.zmz121.cn',
    preview: 'https://preview.idofast.com',
};

let server_user = servers.preview;
let server_file = servers.preview;
//server_file要带端口


if (process.env.NODE_ENV === 'development') {
    server_user = servers.local;
    server_file = servers.aliyun;
}

const user_api = {
    getVcode: '/user/vcode/register',
    register: '/user/register',
    loginByPassword: '/user/login',
    getUserByToken: '/user/detail/token',
    resetPasswordByPassword: '/user/resetPassword/withOldPassword',

    getVCodeForResetPassword: '/user/vcode/resetPassword',
    resetPasswordByVcode: '/user/resetPassword/withVcode',

    publishNotice: '/notice/add',
    modifyNotice: '/notice/modify',
    getNotificationList: '/notice/list/user/notification',
    noticeDetail: '/notice/detail/',

    getInstructionList: '/notice/list/user/instruction',
    getKnowledgeList: '/notice/list/user/knowledge',

    getNoticeListAdmin: '/notice/list/admin',
    updateNoticeStickAndOrderValue: '/notice/modify/stickAndOrderValue',

    downNotice: '/notice/modify/down/',
    putUpNotice: '/notice/modify/up/',
    deleteNotice: '/notice/modify/delete/',

    getBundleListAdmin: '/bundle/admin/list/',
    addNewBundle: '/bundle/admin/add',
    updateBundle: '/bundle/admin/update',
    getBundleDetailAdmin: '/bundle/admin/detail',
    getBundleDetail: '/bundle/detail',
    deleteBundleAdmin: '/bundle/admin/delete',

    createOrder: '/order/create',
    getOrderListForCurUser: '/order/user/list',
    cancelOrder: '/order/cancel',
    checkIsPaid: '/order/check/isPaid',
    getOrderListForAdmin: '/order/admin/list',
    getOrderDetail: '/order/admin/detail',

    createPay: '/pay/create',
    getPayInfo: '/pay/order/info',
    syncOrderPay: '/pay/sync',

    queryOrderPay: '/pay/query/',
    alipayQuery: '/pay/query',

    getUserDetailById: '/user/detail/id',
    updateUserRemark: '/user/update/remark',
    updateUserStatus: '/user/status/update',
    getDeviceList: '/user/device/list',
    updateDeviceList: '/user/update/device',

    getUserList: '/proxyinfo/list',
    getUserProxyInfoById: '/proxyinfo//detail/',
    updateUserProxyInfo: '/proxyinfo/update',
    getSelfUserProxyInfo: '/proxyinfo/detail',

    rechargeByPerson: '/pay/recharge/human',
    getRechargeList: '/rechargelog/user/list',
    getDataResetLog: '/data/resetlog',

    getPreferencesList: '/system/preference/all/list',
    getInstructionPreferences: '/system/preference/instruction/list',
    updatePreferences: '/system/preference/update',
    getDashBoardNotice: '/notice/dashboard',
    getDashBoardFlow: '/data/flowOfDay',
    getDashBoardFlowForAdmin: '/data/admin/flowOfDay',

    createV2rayNode: '/server/v2ray/add',
    getDirectNodeList: '/server/v2ray/direct/list',
    getAllV2rayNodes: '/server/v2ray/admin/list',
    deleteV2rayNode: '/server/v2ray/delete',
    updateV2rayNode: '/server/v2ray/update',

    getallV2rayNodesForSimpleYser: '/server/v2ray/list',
    getSubscriptionUrl: '/subscription/url',

    getOnlineStatusGroupByNode: '/server/online/byNode',
};

const file_api = {
    uploadPic: '/file/upload/headpic',
};

const user_apis = {
    port: process.env.NODE_ENV === 'development' ? '8001' : '443',
    api: user_api,
    server: server_user,
};

const file_apis = {
    port: process.env.NODE_ENV === 'development' ? '8010' : '443',
    api: file_api,
    server: server_file,
};

let apiPortMap = new Map();
for (let url in user_apis.api) {
    apiPortMap.set(user_apis.api[url], user_apis);
}

for (let url in file_apis.api) {
    apiPortMap.set(file_apis.api[url], file_apis);
}

export { user_api, file_api, apiPortMap };

export default { user_api, file_api, apiPortMap };
