import React from 'react';
import { Alert, Button, Card, Space, Statistic, Tag, Tooltip } from 'antd';
import {
    ArrowUpOutlined,
    CloudServerOutlined,
    DownOutlined,
    QuestionCircleOutlined,
} from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import request from 'umi-request';

const bgColors = ['#ffe6e6', '#ffede6', '#e6f0ff', '#e9e6ff', '#f5e6ff', '#fbe6ff', '#ffe6e6'];
const borderColors = ['#ff9191', '#ffb491', '#91bdff', '#9193ff', '#bb91ff', '#d891ff', '#ff9191'];

const serverNameMap = {
    bwggia: '美国线路1',
    tx: '香港线路2-腾讯云',
    hk1: '香港线路3-阿里云',
    hk2: '香港线路4-六六云',
    hk5: '香港线路5-UOZ',
    hk7: '香港线路7-Gigs',
    hkvip: '香港线路6-cloudiplc',
    us1: '美国线路2-rk',
    jpgia: '日本线路1-搬瓦工',
    sa1: '南非线路1',
    m1: '中转线路1',
    iplc1: '中转线路2-IPLC',
    korean1: '韩国线路1-狗云',
    korean2: '韩国线路2-月抛',
    idofast: '香港线路1-阿里云',
};

const ServerComponment = (entity, style) => {
    let cahche = Object.keys(entity.connectionStat.cache);

    return (
        <div>
            <Space direction="vertical">
                {cahche.map((e, index) => {
                    let sum = 0;
                    for (let i = 0; i < 4; i++) {
                        sum += e.charCodeAt(i);
                    }

                    let prefix = e.split('.')[0];
                    return (
                        <Alert
                            key={e}
                            message={
                                style == 1
                                    ? serverNameMap[prefix]
                                        ? serverNameMap[prefix]
                                        : prefix
                                    : entity.connectionStat.cache[e].count
                            }
                            showIcon
                            icon={
                                <CloudServerOutlined
                                    style={{
                                        fontSize: 15,
                                        color: borderColors[sum % bgColors.length],
                                    }}
                                />
                            }
                            style={{
                                backgroundColor: bgColors[sum % bgColors.length],
                                borderColor: borderColors[sum % bgColors.length],
                            }}
                        />
                    );
                })}
            </Space>
        </div>
    );
};

const columns: ProColumns[] = [
    {
        dataIndex: 'index',
        valueType: 'indexBorder',
        width: 48,
    },
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
        width: '20%',
        key: 'option',
        valueType: 'option',
        render: (_, entity) => {
            return ServerComponment(entity, 1);
        },
        sorter: (a, b) => {
            let keys1 = Object.keys(a.connectionStat.cache);
            let keys2 = Object.keys(b.connectionStat.cache);
            if (keys1.length == keys2.length && keys2.length == 0) {
                return 0;
            } else {
                return keys1[0] > keys2[0] ? -1 : 1;
            }
        },
    },
    {
        title: '连接数',
        render: (_, entity) => {
            return ServerComponment(entity, 2);
        },
    },

    {
        title: '会员时长',
        dataIndex: 'vipTime',
        sorter: (a, b) => a.vipTime - b.vipTime,
    },
    {
        title: '过期剩余',
        dataIndex: 'expireTimeRemain',
        sorter: (a, b) => a.expireTimeRemain - b.expireTimeRemain,
    },
];

const handleDate = (res) => {
    res.map((e) => {
        e.id = e.account.accountNo;
        e.createTime = e.user.createTime;
        e.toDate = e.account.toDate;

        //计算过期天数
        const thatDay = new Date(e.account.toDate);
        const thisDay = new Date();
        let milliseconds = thatDay.getTime() - thisDay.getTime();
        let days = Math.floor(milliseconds / (24 * 3600 * 1000));
        e.expireTimeRemain = days;

        //过期剩余
        const createDay = new Date(e.user.createTime);
        milliseconds = thisDay.getTime() - createDay.getTime();
        days = Math.floor(milliseconds / (24 * 3600 * 1000));
        e.vipTime = days;
    });

    //按服务器排序
    res.sort((a, b) => {
        let a1 = Object.keys(a.connectionStat.cache);
        let b1 = Object.keys(b.connectionStat.cache);
        return b1.length - a1.length;
    });

    return res;
};

export default () => {
    return (
        <ProTable
            columns={columns}
            request={async (params, sorter, filter) => {
                let res = await request(
                    'http://idofast.com:9091/report/detail/all?title=idoyuepao',
                );

                res = handleDate(res);

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
                pageSize: 50,
            }}
        />
    );
};
