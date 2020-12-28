const servers = {
    local: 'http://localhost',
    aliyun: 'http://1.zmz121.cn',
};

let server_user = servers.local;
let server_file = servers.aliyun;

const user_api = {
    getVcode: '/user/vcode/register',
    register: '/user/register',
    loginByPassword: '/user/login',
    getUserByToken: '/user/detail/token',

    publishNotice: '/notice/add',
    modifyNotice: '/notice/modify',
    getNotificationList: '/notice/list/user/notification',
    noticeDetail: '/notice/detail/',

    getInstructionList: '/notice/list/user/instruction',
    getKnowledgeList: '/notice/list/user/knowledge',

    getNoticeListAdmin: '/notice/list/admin',
    updateNoticeStickAndOrderValue: '/notice/modify/stickAndOrderValue',
};

const file_api = {
    uploadPic: '/file/upload/headpic',
};

const user_apis = {
    port: '8001',
    api: user_api,
    server: server_user,
};

const file_apis = {
    port: '8010',
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
