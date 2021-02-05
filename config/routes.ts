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
                        redirect: '/bundle/manager',
                    },

                    {
                        path: '/welcome',
                        name: '欢迎',
                        icon: 'smile',
                        component: './dashboard/index',
                    },

                    {
                        exact: true,
                        path: '/admin/bundle/manager',
                        name: '套餐管理',
                        icon: 'AppstoreOutlined',
                        component: './bundle/manage/BundleManager',
                    },

                    {
                        path: '/bundle',
                        name: '套餐商店',
                        icon: 'ShopOutlined',
                        hideChildrenInMenu: true,
                        routes: [
                            {
                                path: '/bundle',
                                component: './bundle/list/BundleList',
                            },
                            {
                                exact: false,
                                path: '/bundle/settlement',
                                component: './bundle/settlement/Settlement',
                            },

                            {
                                exact: false,
                                path: '/bundle/pay',
                                component: './bundle/pay/Pay',
                            },
                        ],
                    },

                    {
                        path: '/order/my/list',
                        name: '我的订单',
                        icon: 'ShopOutlined',
                        component: './order/my/list',
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

/*
            {
                exact: false,
                path: '/bundle/settlement',
                name: '套餐结算',
                icon: 'ShoppingCartOutlined',
                component: './bundle/settlement/Settlement',
            },
            {
                exact: false,
                path: '/order/pay',
                name: '购买订单',
                icon: 'ShoppingCartOutlined',
                component: './order/pay/Pay',
            },
 */
