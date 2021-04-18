import React from 'react';
import styles from './DataResetLog.less';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { DataResetLog, RechargeLog, UserProxyInfo } from '@/pages/UserManager/manage/data';
import api from '@/utils/api';
import request from '@/utils/request';
import { Fragment } from 'react';

export interface DataResetLogProps {
    proxyInfo: UserProxyInfo;
}

export default (props: DataResetLogProps) => {
    const columns: ProColumns<DataResetLog>[] = [
        {
            dataIndex: 'id',
            title: 'ID',
        },

        {
            dataIndex: 'startDate',
            title: '开始时间',
            valueType: 'dateTime',
        },
        {
            dataIndex: 'endDate',
            title: '结束时间',
            valueType: 'dateTime',
        },

        {
            dataIndex: 'duration',
            title: '流量使用',
            render: (dom, record) => {
                return <Fragment>{(record.usedData / (1024 * 1024.0)).toFixed(2)} GB</Fragment>;
            },
        },

        {
            dataIndex: 'createTime',
            title: '记录时间',
            valueType: 'dateTime',
        },
    ];

    // @ts-ignore
    return (
        <ProTable<DataResetLog>
            columns={columns}
            request={async (params, sorter, filter) => {
                // 表单搜索项会从 params 传入，传递给后端接口。
                const res = await request.get(api.user_api.getDataResetLog, {
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
