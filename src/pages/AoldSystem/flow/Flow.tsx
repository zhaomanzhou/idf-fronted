import React from 'react';
import styles from './Flow.less';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import { Alert, Space } from 'antd';
import { CloudServerOutlined } from '@ant-design/icons';
import request from 'umi-request';
import data from '@/pages/user/login/data';

const columns: ProColumns[] = [
    {
        dataIndex: 'index',
        valueType: 'indexBorder',
        width: 48,
    },
    {
        title: '账号Id',
        dataIndex: 'accountNo',
        sorter: (a, b) => a.accountId - b.accountId,
    },

    {
        title: '开始时间',
        dataIndex: 'fromDate',
        valueType: 'dateTime',
        sorter: (a, b) => a.fromDate - b.fromDate,
    },

    {
        title: '更新时间',
        dataIndex: 'updateTime',
        valueType: 'dateTime',
        sorter: (a, b) => a.updateTime - b.updateTime,
    },
    {
        title: '结束时间',
        dataIndex: 'toDate',
        valueType: 'dateTime',
    },

    {
        title: '流量',
        dataIndex: 'flow',
        render: (_, data) => {
            return (data.flow / (1024 * 1024 * 1024)).toFixed(2) + 'GB';
        },
        sorter: (a, b) => a.flow - b.flow,
    },
];

export default () => {
    return (
        <ProTable
            columns={columns}
            request={async (params, sorter, filter) => {
                let res = await request('http://idofast.com:9091/report/state/all?title=idoyuepao');

                return Promise.resolve({
                    data: res,
                    success: true,
                });
            }}
            rowKey="id"
            search={false}
            dateFormatter="string"
            headerTitle="表格标题"
            pagination={{
                pageSize: 100,
            }}
        />
    );
};
