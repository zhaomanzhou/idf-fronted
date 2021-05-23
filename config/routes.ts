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
                        path: '/shop',
                        name: '套餐商店',
                        icon: 'ShopOutlined',
                        hideChildrenInMenu: true,
                        routes: [
                            {
                                path: '/shop',
                                component: './shop/list/BundleList',
                            },
                            {
                                exact: false,
                                path: '/shop/settlement/:id',
                                component: './shop/settlement/Settlement',
                            },

                            {
                                exact: false,
                                path: '/shop/pay',
                                component: './shop/pay/Pay',
                            },
                        ],
                    },

                    {
                        path: '/order/my/list',
                        name: '我的订单',
                        icon: 'CalendarOutlined',
                        component: './order/my/list',
                    },

                    {
                        path: '/notice/list',
                        name: '公告列表',
                        component: './notice/list/NoticeList',
                        icon: 'NotificationOutlined',
                    },

                    {
                        path: '/online',
                        name: '在线分析',
                        icon: 'CloudOutlined',
                        component: './AoldSystem/online/Oneline',
                        authority: ['admin'],
                    },

                    {
                        path: '/setting/system',
                        name: '系统设置',
                        icon: 'SettingOutlined',
                        component: './setting/system/SystemPreference',
                        authority: ['admin'],
                    },

                    {
                        path: '/server/v2ray/list',
                        name: '服务器',
                        icon: 'ToolOutlined',
                        component: './server/v2ray/planuser/index',
                    },
                    {
                        path: '/server',
                        name: '服务器管理',
                        icon: 'CloudOutlined',
                        routes: [
                            {
                                path: '/server/v2ray/admin',
                                name: 'V2ray',
                                icon: 'ToolOutlined',
                                component: './server/v2ray/admin/V2rayNode',
                            },
                        ],
                        authority: ['admin'],
                    },
                    {
                        path: '/manage',
                        name: '管理',
                        icon: 'SolutionOutlined',
                        hideChildrenInMenu: false,
                        routes: [
                            {
                                path: '/manage/shop',
                                name: '套餐管理',
                                icon: 'AppstoreOutlined',
                                component: './shop/manage/BundleManager',
                            },
                            {
                                path: '/manage/order/admin/',
                                name: '订单管理',
                                icon: 'ApartmentOutlined',
                                hideChildrenInMenu: true,
                                routes: [
                                    {
                                        path: '/manage/order/admin/',
                                        name: '订单管理',
                                        icon: 'ApartmentOutlined',
                                        component: './order/manage/OrderManage',
                                    },
                                    {
                                        path: '/manage/order/admin/detail/:id',
                                        name: '订单详情',
                                        icon: 'CalendarOutlined',
                                        component: './order/detail/OrderDetail',
                                    },
                                ],
                                authority: ['admin'],
                            },
                            {
                                path: '/manage/user',
                                name: '用户管理',
                                icon: 'ToolOutlined',
                                hideChildrenInMenu: true,
                                routes: [
                                    {
                                        path: '/manage/user',
                                        name: '用户管理',
                                        icon: 'ToolOutlined',
                                        component: './UserManager/manage/UserManage',
                                    },
                                    {
                                        path: '/manage/user/detail/:id',
                                        name: '用户管理',
                                        icon: 'ToolOutlined',
                                        component: './UserManager/manage/detail/UserDetail',
                                    },
                                ],
                            },
                        ],
                        authority: ['admin'],
                    },

                    {
                        path: '/notice/',
                        name: '公告编辑',
                        icon: 'NotificationOutlined',
                        routes: [
                            {
                                path: '/notice/publish',
                                name: '发布公告',
                                component: './notice/publish/PublishNotice',
                                authority: ['admin'],
                            },
                            {
                                path: '/notice/manage',
                                name: '公告管理',
                                component: './notice/manage/manage',
                                authority: ['admin'],
                            },
                        ],
                        authority: ['admin'],
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
                            },
                        ],
                        authority: ['admin'],
                    },

                    {
                        path: '/setting/profile',
                        name: '个人中心',
                        icon: 'UserOutlined',
                        component: './profile/index',
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
