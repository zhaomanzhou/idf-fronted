import React, { Reducer, useReducer, useRef, Fragment } from 'react';
import ProTable, { ActionType, ProColumns, TableDropdown } from '@ant-design/pro-table';
import { Link } from 'umi';

import request from '@/utils/request';
import api from '@/utils/api';
export interface OrderToUser {
    id: number;
    createTime: number;
    payTime: object;
    closeTime: object;
    bundleId: number;
    totalMonth: number;
    orderName: string;
    totalMoney: number;
    payType: string;
    tradeNo: string;
    payLink: string;
    orderStatus: string;
}

const columns: ProColumns<OrderToUser>[] = [
    {
        title: '订单id',
        dataIndex: 'id',
    },
    {
        title: '订单名称',
        dataIndex: 'orderName',
    },
    {
        title: '创建时间',
        dataIndex: 'createTime',
        valueType: 'dateTime',
    },
    {
        title: '关闭时间',
        dataIndex: 'closeTime',
        valueType: 'dateTime',
    },
    {
        title: '付款时间',
        dataIndex: 'payTime',
        valueType: 'dateTime',
    },

    {
        title: '套餐时长',
        dataIndex: 'totalMonth',
    },
    {
        title: '订单金额',
        dataIndex: 'totalMoney',
        render: (_, record) => {
            return '¥' + record.totalMoney * 0.01;
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
    {
        title: '更多',
        dataIndex: 'orderStatus',
        render: (_, record) => {
            return <Link to={'/bundle/pay/' + record.id}>付款</Link>;
        },
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
