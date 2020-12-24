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
                component: './user/register/register'
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
        path: '/',
        component: '../layouts/SecurityLayout',
        routes: [
            {
                path: '/',
                component: '../layouts/BasicLayout',
                authority: ['admin', 'user'],
                routes: [
                    {
                        path: '/',
                        redirect: '/notice',
                    },
                    {
                        path: '/welcome',
                        name: '欢迎',
                        icon: 'smile',
                        component: './Welcome',
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
                            },
                            {
                                path: '/notice/list',
                                name: '公告列表',
                                component: './notice/list/NoticeList',
                            },
                            {
                                exact: false,
                                path: '/notice/detail/',
                                name: '公告详情',
                                component: './notice/detail/detail',

                            },
                        ],

                    },

                    {
                        path: '/admin',
                        name: 'admin',
                        icon: 'crown',
                        component: './Admin',
                        authority: ['admin'],
                        routes: [
                            {
                                path: '/admin/sub-page',
                                name: 'sub-page',
                                icon: 'smile',
                                component: './Welcome',
                                authority: ['admin'],
                            },
                        ],
                    },
                    {
                        name: 'list.table-list',
                        icon: 'table',
                        path: '/list',
                        component: './ListTableList',
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
