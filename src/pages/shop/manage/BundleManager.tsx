import styles from './BundleManager.less';

import React, { Reducer, useReducer, useRef, useState } from 'react';
import { Button, message, Tag, Tooltip } from 'antd';
import { DownOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import service from '@/pages/shop/manage/service';
import request from '@/utils/request';
import api from '@/utils/api';
import {
    Action,
    BundleContext,
    BundleContextType,
    initState,
    reducer,
} from './context/ContextManager';
import NewBundle from '@/pages/shop/manage/componment/new/NewBundle';
import UpdateBundle from '@/pages/shop/manage/componment/update/UpdateBundle';
import login from '@/pages/user/login/login';

export type BundleItem = {
    id: number;
    createTime: number;
    updateTime: number;
    name: string;
    totalData: number;
    speed: number;
    maxConnection: number;
    level: number;
    duration: number;
    price: number;
    active: boolean;
    description: string;
};

export default () => {
    const columns: ProColumns<BundleItem>[] = [
        {
            title: '套餐id',
            dataIndex: 'id',
            valueType: 'indexBorder',
        },
        {
            title: '套餐名称',
            dataIndex: 'name',
        },
        {
            title: '总流量',
            dataIndex: 'totalData',
            render: (_, record) => {
                if (record.totalData < 1024) {
                    return `${record.totalData} MB`;
                } else {
                    let num = (record.totalData / 1024.0).toFixed(2);
                    return `${num}GB`;
                }
            },
        },
        {
            title: '最大速度(Mbps)',
            width: '10%',
            dataIndex: 'speed',
            render: (_, record) => {
                if (record.speed <= 0) {
                    return `不限速`;
                } else {
                    return record.speed;
                }
            },
        },

        {
            title: '用户等级',
            dataIndex: 'level',
        },
        {
            title: '最大连接数',
            dataIndex: 'maxConnection',
        },

        {
            title: '有效期(天)',
            dataIndex: 'duration',
        },
        {
            title: '是否上线',
            dataIndex: 'active',
            render: (_, record) => {
                if (record.active) {
                    return <Tag color={'green'}>已上线</Tag>;
                } else {
                    return <Tag color={'gray'}>已下线</Tag>;
                }
            },
        },
        {
            title: '价格',
            dataIndex: 'price',
            render: (_, record) => {
                return `¥ ${(record.price / 100.0).toFixed(2)}`;
            },
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            valueType: 'date',
        },
        {
            title: '修改时间)',
            dataIndex: 'updateTime',
            valueType: 'date',
        },
        {
            title: '操作',
            width: 180,
            key: 'option',
            valueType: 'option',
            render: (text, record, _, action) => [
                <a
                    key="link"
                    onClick={() => {
                        onUpdateClick(record.id);
                    }}
                >
                    修改
                </a>,
                <TableDropdown
                    key="actionGroup"
                    onSelect={(key) => {
                        switch (key) {
                            case 'delete': {
                                deleteBundle(record.id);
                                action.reload();
                                break;
                            }
                        }
                    }}
                    menus={[
                        { key: 'more', name: '更多信息' },
                        { key: 'delete', name: '删除' },
                    ]}
                />,
            ],
        },
    ];

    const deleteBundle = (id: number) => {
        service
            .deleteBundleAdmin(id)
            .then((res) => {
                message.success('删除成功');
            })
            .catch((err) => {
                message.error('删除失败');
            });
    };

    const onUpdateClick = (id: number) => {
        dispatch({
            type: 'set_modify',
            payload: id,
        });
        dispatch({ type: 'show_modify' });
    };

    const [state, dispatch] = useReducer<Reducer<BundleContextType, Action>>(reducer, initState);
    const actionRef = useRef<ActionType>();

    return (
        <BundleContext.Provider value={{ ...state, dispatch }}>
            <ProTable<BundleItem>
                columns={columns}
                request={async (params, sort, filter) => {
                    const res: any = await request.get(api.user_api.getBundleListAdmin, {});
                    return {
                        data: res,
                        success: true,
                        // 不传会使用 data 的长度，如果是分页一定要传
                        total: res.length,
                    };
                }}
                rowKey="id"
                search={false}
                dateFormatter="string"
                headerTitle="表格标题"
                pagination={false}
                actionRef={actionRef}
                toolBarRender={() => [
                    <Button
                        type="primary"
                        key="primary"
                        onClick={() => {
                            dispatch({ type: 'show_new' });
                        }}
                    >
                        创建套餐
                    </Button>,
                ]}
            />
            <NewBundle action={actionRef.current} />
            <UpdateBundle action={actionRef.current} />
        </BundleContext.Provider>
    );
};
