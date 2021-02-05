import React, { Reducer, useReducer, useRef, Fragment } from 'react';
import ProTable, { ActionType, ProColumns, TableDropdown } from '@ant-design/pro-table';

import request from '@/utils/request';
import api from '@/utils/api';

const columns: ProColumns[] = [
    {
        title: '订单id',
        dataIndex: 'id',
        valueType: 'indexBorder',
    },
    {
        title: '创建时间',
        dataIndex: 'createTime',
        valueType: 'date',
    },
    {
        title: '更新时间',
        dataIndex: 'updateTime',
        valueType: 'date',
    },
    {
        title: '关闭时间',
        dataIndex: 'closeTime',
        valueType: 'date',
    },
    {
        title: '付款时间',
        dataIndex: 'payTime',
        valueType: 'date',
    },
    {
        title: '套餐id',
        dataIndex: 'bundleId',
    },
    {
        title: '套餐时长',
        dataIndex: 'totalMonth',
    },
    {
        title: '订单金额',
        dataIndex: 'totalMoney',
        render: (_, record) => {
            return (record.totalMoney * 0.01).toFixed(2);
        },
    },

    {
        title: '支付宝交易号',
        dataIndex: 'tradeNo',
    },
    {
        title: '订单状态',
        dataIndex: 'orderStatus',
    },
];

export default () => {
    return (
        <Fragment>
            <ProTable
                columns={columns}
                request={async (params, sort, filter) => {
                    const res: any = await request.get(api.user_api.getOrderListForCurUser, {});
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
                headerTitle="我的订单"
                pagination={false}
            />
        </Fragment>
    );
};
