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
                name: 'reset-password',
                path: '/user/reset-password',
                component: './user/reset-password/ResetPassword',
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
                        path: '/bundle/',
                        name: '套餐',
                        icon: 'AppstoreOutlined',
                        routes: [
                            {
                                exact: true,
                                path: '/bundle/admin/manager',
                                name: '套餐管理',
                                icon: 'AppstoreOutlined',
                                component: './bundle/manage/BundleManager',
                            },

                            {
                                path: '/bundle/shop/',
                                name: '套餐商店',
                                icon: 'ShopOutlined',
                                hideChildrenInMenu: true,
                                routes: [
                                    {
                                        path: '/bundle/shop/',
                                        component: './bundle/list/BundleList',
                                    },
                                    {
                                        exact: false,
                                        path: '/bundle/shop/settlement',
                                        component: './bundle/settlement/Settlement',
                                    },

                                    {
                                        exact: false,
                                        path: '/bundle/shop/pay',
                                        component: './bundle/pay/Pay',
                                    },
                                ],
                            },
                        ],
                    },

                    {
                        path: '/order/',
                        name: '订单',
                        icon: 'CalendarOutlined',
                        routes: [
                            {
                                path: '/order/my/list',
                                name: '我的订单',
                                icon: 'CalendarOutlined',
                                component: './order/my/list',
                            },

                            {
                                path: '/order/admin/',
                                name: '订单管理',
                                icon: 'ApartmentOutlined',
                                hideChildrenInMenu: true,
                                routes: [
                                    {
                                        path: '/order/admin/',
                                        name: '订单管理',
                                        icon: 'ApartmentOutlined',
                                        component: './order/manage/OrderManage',
                                    },
                                    {
                                        path: '/order/admin/detail/:id',
                                        name: '订单详情',
                                        icon: 'CalendarOutlined',
                                        component: './order/detail/OrderDetail',
                                    },
                                ],
                            },
                        ],
                    },

                    {
                        path: '/tool/',
                        name: '工具',
                        icon: 'ToolOutlined',
                        routes: [
                            {
                                path: '/tool/pay/sync',
                                name: '支付查询',
                                component: './tool/pay/PaySync',
                                authority: ['admin'],
                            },
                        ],
                    },

                    {
                        path: '/online',
                        name: '在线分析',
                        icon: 'CloudOutlined',
                        component: './AoldSystem/online/Oneline',
                    },
                    {
                        path: '/flow',
                        name: '流量分析',
                        icon: 'DatabaseOutlined',
                        component: './AoldSystem/flow/Flow',
                    },
                    {
                        path: '/setting/system',
                        name: '系统设置',
                        icon: 'SettingOutlined',
                        component: './setting/system/SystemPreference',
                    },
                    {
                        path: '/setting/profile',
                        name: '个人中心',
                        icon: 'UserOutlined',
                        component: './profile/index',
                    },
                    {
                        path: '/node',
                        name: '服务器',
                        icon: 'CloudOutlined',
                        routes: [
                            {
                                path: '/node/v2ray',
                                name: 'V2ray',
                                icon: 'ToolOutlined',
                                component: './node/v2ray/V2rayNode',
                            },
                        ],
                    },
                    {
                        path: '/users/manage',
                        name: '用户管理',
                        icon: 'SolutionOutlined',
                        hideChildrenInMenu: true,
                        routes: [
                            {
                                path: '/users/manage',
                                name: '用户管理',
                                icon: 'ToolOutlined',
                                component: './users/manage/UserManage',
                            },
                            {
                                path: '/users/manage/detail/:id',
                                name: '用户管理',
                                icon: 'ToolOutlined',
                                component: './users/manage/detail/UserDetail',
                            },
                        ],
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
