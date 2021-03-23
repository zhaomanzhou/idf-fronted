import React from 'react';
import { Button, Space, Tag, Tooltip } from 'antd';
import { DownOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import request from 'umi-request';
import { timestampToDateStr } from '@/utils/utils';
import { Fragment } from 'react';

/*
{
account: {
accountNo: "1eiewr8",
bandwidth: 100,
createTime: 1616248667747,
cycle: 30,
fromDate: 1616245200000,
id: 1169,
level: 0,
maxConnection: 256,
speed: 10240,
status: 1,
subscriptionUrl: "/subscribe/iujc1pm5d6?type=0&timestamp=1616249026297&token=5975e1778eeed4428dd34756629b0fff",
toDate: 1618923600000,
updateTime: 1616252468426,
userId: 1168,
uuid: "6c623174-c38b-40b4-bd70-af766516bf6e"
},
connectionStat: {
cache: {
bwggia.idofast.com: {
count: 1,
lastSetTime: 1616504149425
}
},
lastBlock: 0,
total: 1
},
user: {
createTime: 1616248667740,
email: "2075128522@qq.com",
id: 1168,
password: "88d1ef86f1c9a3b33cdfc8bd5e5ef64e",
remark: "微信shiny-月付",
role: "vip",
status: 1,
updateTime: 1616322066757
}
}
 */

const colors = ['success', 'processing', 'error', 'warning'];
const servers = [];

const columns: ProColumns[] = [
    {
        title: '账号',
        render: (_, entity) => {
            return entity.account.accountNo;
        },
        width: '7%',
    },
    {
        title: 'email',
        render: (_, entity) => {
            return entity.user.email;
        },
        width: '10%',
    },

    {
        title: '备注',
        render: (_, entity) => {
            return entity.user.remark;
        },
        width: '18%',
    },

    {
        title: '在线服务器',
        width: '30%',
        key: 'option',
        valueType: 'option',
        render: (_, entity) => {
            let cahche = Object.keys(entity.connectionStat.cache);

            return (
                <div>
                    <Space direction="vertical">
                        {cahche.map((e, index) => {
                            let sum = 0;
                            for (let i = 0; i < 4; i++) {
                                sum += e.charCodeAt(i);
                            }
                            console.log(sum);
                            return (
                                <Tag
                                    key={index}
                                    color={colors[sum % colors.length]}
                                    style={{ fontSize: 15 }}
                                >
                                    {e}
                                </Tag>
                            );
                        })}
                    </Space>
                </div>
            );
        },
    },

    {
        title: '注册时间',
        valueType: 'date',
        dataIndex: 'createTime',
    },
    {
        title: '过期时间',
        valueType: 'date',
        dataIndex: 'createTime',
    },
];

export default () => {
    return (
        <ProTable
            columns={columns}
            request={async (params, sorter, filter) => {
                let res = await request(
                    'http://idofast.com:9091/report/detail/all?title=idoyuepao',
                );

                // console.log(params, sorter, filter);

                // console.log(res)
                res.map((e) => {
                    e.id = e.account.accountNo;
                    e.createTime = e.user.createTime;
                    e.toDate = e.account.toDate;
                });

                res.sort((a, b) => {
                    let a1 = Object.keys(a.connectionStat.cache);
                    let b1 = Object.keys(b.connectionStat.cache);
                    return b1.length - a1.length;
                });
                return Promise.resolve({
                    data: res,
                    success: true,
                });
            }}
            rowKey="id"
            pagination={{
                showQuickJumper: true,
            }}
            search={false}
            dateFormatter="string"
            headerTitle="表格标题"
            toolBarRender={() => [
                <Button key="show">查看日志</Button>,
                <Button key="out">
                    导出数据
                    <DownOutlined />
                </Button>,
                <Button type="primary" key="primary">
                    创建应用
                </Button>,
            ]}
        />
    );
};
