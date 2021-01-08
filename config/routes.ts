export default [
    {
        path: '/user',
        component: '../layouts/UserLayout',
        routes: [
            {
                path: '/user',
                redirect: '/user/login',
            },
            {
                name: 'login',
                path: '/user/login',
                component: './user/login/login',
            },
            {
                name: 'register',
                path: '/user/register',
                component: './user/register/register',
            },
            {
                name: 'register-result',
                icon: 'smile',
                path: '/user/register-result',
                component: './user/register-result',
            },
            {
                component: '404',
            },
        ],
    },
    {
        path: '/notice/detail/',
        routes: [
            {
                exact: false,
                path: '/notice/detail/',
                component: './notice/detail/detail',
            },
        ],
    },
    {
        path: '/',
        component: '../layouts/SecurityLayout',
        routes: [
            {
                path: '/',
                component: '../layouts/BasicLayout',
                routes: [
                    {
                        path: '/',
                        redirect: '/welcome',
                    },

                    {
                        path: '/welcome',
                        name: '欢迎',
                        icon: 'smile',
                        component: './dashboard/index',
                    },

                    {
                        path: '/notice/',
                        name: '公告',
                        icon: 'NotificationOutlined',
                        routes: [
                            {
                                path: '/notice/publish',
                                name: '发布公告',
                                component: './notice/publish/PublishNotice',
                                authority: ['admin'],
                            },
                            {
                                path: '/notice/list',
                                name: '公告列表',
                                component: './notice/list/NoticeList',
                            },
                            {
                                path: '/notice/manage',
                                name: '公告管理',
                                component: './notice/manage/manage',
                                authority: ['admin'],
                            },
                        ],
                    },

                    {
                        component: './404',
                    },
                ],
            },
            {
                component: './404',
            },
        ],
    },
    {
        component: './404',
    },
];
