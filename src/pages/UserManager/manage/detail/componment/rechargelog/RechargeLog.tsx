import React from 'react';
import styles from './RechargeLog.less';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { RechargeLog, UserProxyInfo } from '@/pages/UserManager/manage/data';
import api from '@/utils/api';
import request from '@/utils/request';

export interface RechargeLogProps {
    proxyInfo: UserProxyInfo;
}

export default (props: RechargeLogProps) => {
    const columns: ProColumns<RechargeLog>[] = [
        {
            dataIndex: 'id',
            title: 'ID',
        },
        {
            dataIndex: 'bundleName',
            title: '套餐名称',
        },
        {
            dataIndex: 'prevBundleName',
            title: '原套餐名称',
        },
        {
            dataIndex: 'duration',
            title: '套餐时长(天)',
        },
        {
            dataIndex: 'rechargeNum',
            title: '充值月数',
        },
        {
            title: '扫码支付',
            dataIndex: 'humanRecharge',
            valueType: 'radio',
            valueEnum: {
                true: { text: '否', status: 'Default' },
                false: { text: '是', status: 'Success' },
            },
        },
        {
            dataIndex: 'orderId',
            title: '订单Id',
            render: (dom, record) => {
                return record.orderId === 0 ? '-' : record.orderId;
            },
        },
        {
            dataIndex: 'createTime',
            title: '创建时间',
            valueType: 'dateTime',
        },
    ];

    // @ts-ignore
    return (
        <ProTable<RechargeLog>
            columns={columns}
            request={async (params, sorter, filter) => {
                // 表单搜索项会从 params 传入，传递给后端接口。
                const res = await request.get(api.user_api.getRechargeList, {
                    userId: props.proxyInfo.id,
                });

                return {
                    data: res,
                    success: true,
                    // 不传会使用 data 的长度，如果是分页一定要传
                };
            }}
            rowKey="id"
            pagination={{
                showQuickJumper: true,
            }}
            toolBarRender={false}
            search={false}
        />
    );
};
