import React, { Reducer, useReducer, useRef, Fragment, useState } from 'react';
import ProTable, { ActionType, ProColumns, TableDropdown } from '@ant-design/pro-table';
import { Link } from 'umi';

import request from '@/utils/request';
import api from '@/utils/api';
import { Button, Checkbox, Input, Modal, Result, Space, Spin, Tag, Tooltip } from 'antd';
import { OrderToAdmin, OrderToUser } from '@/pages/order/data';
import { PlusOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { SortOrder } from 'antd/lib/table/interface';
import { strToTimestamp } from '@/utils/utils';

const columns: ProColumns<OrderToAdmin>[] = [
    {
        title: '订单号',
        dataIndex: 'id',
        sorter: (a, b) => a.id - b.id,
    },
    {
        title: '套餐名称',
        dataIndex: 'bundleName',
        hideInSearch: true,
        sorter: (a, b) => a.bundleId - b.bundleId,
    },
    {
        title: '用户id',
        dataIndex: 'userId',

        sorter: (a, b) => a.userId - b.userId,
    },
    {
        title: '用户邮箱',
        dataIndex: 'userEmail',
    },
    {
        title: '开始时间',
        key: 'startTime',
        valueType: 'dateTime',
        hideInTable: true,
    },
    {
        title: '截止时间',
        key: 'endTime',
        valueType: 'dateTime',
        hideInTable: true,
    },

    {
        title: '创建时间',
        dataIndex: 'createTime',
        valueType: 'dateTime',
        hideInSearch: true,
        sorter: (a, b) => a.createTime - b.createTime,
    },
    {
        title: '关闭时间',
        dataIndex: 'closeTime',
        valueType: 'dateTime',
        hideInSearch: true,
    },
    {
        title: '付款时间',
        dataIndex: 'payTime',
        valueType: 'dateTime',
        hideInSearch: true,
    },

    {
        title: '套餐时长',
        dataIndex: 'totalMonth',
        hideInSearch: true,
        sorter: (a, b) => a.totalMonth - b.totalMonth,
    },
    {
        title: '订单金额',
        dataIndex: 'totalMoney',
        render: (_, record) => {
            return '¥' + record.totalMoney * 0.01;
        },
        sorter: (a, b) => a.totalMoney - b.totalMoney,
        hideInSearch: true,
    },

    {
        title: '订单状态',
        dataIndex: 'orderStatus',
        hideInSearch: true,
        filters: true,
        onFilter: false,
        valueEnum: {
            INITIAL_CREATED: { text: '刚创建', status: 'Default' },
            WAIT_TO_SCAN: { text: '等待扫码', status: 'Processing' },
            WAIT_TO_PAY: { text: '等待付款', status: 'Processing' },
            CANCEL_USER: { text: '用户取消', status: 'Error' },
            CANCEL_TIMEOUT: { text: '超时取消', status: 'Error' },
            SUCCESS: { text: '已完成', status: 'Success' },
        },
    },
    {
        title: '详细信息',
        dataIndex: 'orderStatus',
        hideInSearch: true,
        render: (_, record) => {
            return (
                <Fragment>
                    <Link to={'/manage/order/admin/detail/' + record.id}>查看</Link>
                </Fragment>
            );
        },
    },
];

export default () => {
    const [innerSort, setInnerSort] = useState<boolean>(false);

    const dataRequest = async (
        params: OrderToAdmin & {
            pageSize?: number;
            current?: number;
            keyword?: string;
            startTime?: string;
            endTime?: string;
        },
        sort: Record<string, SortOrder>,
        filter: Record<string, React.ReactText[]>,
    ) => {
        let orderStatusList: number[] = [];
        if (filter.orderStatus) {
            orderStatusList = filter.orderStatus.map((value, index) => {
                switch (value) {
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
            });
        }
        console.log(orderStatusList);
        const res: any = await request.get(api.user_api.getOrderListForAdmin, {
            currentPage: params.current,
            pageSize: params.pageSize,
            id: params.id,
            userId: params.userId,
            userEmail: params.userEmail,
            startTime: strToTimestamp(params.startTime),
            endTime: strToTimestamp(params.endTime),
            orderStatusList: orderStatusList,
        });
        return {
            data: res.data,
            success: true,
            // 不传会使用 data 的长度，如果是分页一定要传
            total: res.totalElement,
        };
    };

    return (
        <Fragment>
            <ProTable
                columns={columns}
                request={dataRequest}
                rowKey="id"
                pagination={{
                    showQuickJumper: true,
                }}
                search={{
                    layout: 'vertical',
                    defaultCollapsed: true,
                }}
                dateFormatter="string"
                headerTitle="我的订单"
                toolBarRender={() => [
                    <Fragment>
                        <Checkbox
                            onChange={() => {
                                setInnerSort(!innerSort);
                            }}
                        >
                            页内排序
                        </Checkbox>
                        <Tooltip
                            placement="top"
                            title="对表格某一列启用排序后，是否只对本页数据，还是所有的数据排序"
                        >
                            <QuestionCircleOutlined style={{ marginLeft: 4 }} />
                        </Tooltip>
                    </Fragment>,
                ]}
            />
        </Fragment>
    );
};
