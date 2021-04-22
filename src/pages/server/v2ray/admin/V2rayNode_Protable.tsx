import React, { useEffect, useState } from 'react';
import { Button, Input, Progress, Space, Tag, Descriptions, Form, Popconfirm, message } from 'antd';
import ProList from '@ant-design/pro-list';
import AddV2rayNode from '@/pages/server/v2ray/admin/add/AddOrUpdateV2rayNode';
import api from '@/utils/api';
import request from '@/utils/request';
import { V2rayNodeVo } from '@/pages/server/data';
import { Fragment } from 'react';
import NodeItem from '@/pages/server/v2ray/admin/componment/nodeitem/NodeItem';
import ProTable, { ProColumns } from '@ant-design/pro-table';

export default () => {
    const [nodeList, setNodeList] = useState<V2rayNodeVo[]>([]);

    const [refresh, setRefresh] = useState<boolean>(false);

    const deleteNode = (id: number) => {
        request
            .post(api.user_api.deleteV2rayNode, { id: id })
            .then(() => {
                message.success('删除成功');
            })
            .finally(() => {
                setRefresh(!refresh);
            });
    };

    const columns: ProColumns<V2rayNodeVo>[] = [
        {
            title: '等级',
            dataIndex: 'level',
            render: (_, record) => {
                return 'VIP' + record.level;
            },
        },
        {
            title: 'ID',
            dataIndex: 'id',
        },
        {
            title: '节点名称',
            dataIndex: 'name',
        },
        {
            title: 'host',
            dataIndex: 'host',
            render: (_, record) => {
                return <Tag color="red">{record.host}</Tag>;
            },
            width: '10%',
        },
        {
            title: '访问端口',
            dataIndex: 'port',
        },

        // {
        //     title: '协议',
        //     dataIndex: 'protocol',
        // },
        {
            title: 'TLS',
            dataIndex: 'supportTls',
            valueEnum: {
                true: { text: '开启', status: 'Success' },
                false: { text: '未开启', status: 'Default' },
            },
        },
        {
            title: '倍率',
            dataIndex: 'magnification',
            render: (_, record) => {
                return record.magnification / 10;
            },
        },

        // {
        //     title: '速率',
        //     dataIndex: 'speed',
        //     render: (_, record) =>{
        //         return record.speed + "Mbps"
        //     }
        // },
        {
            title: '描述',
            dataIndex: 'description',
        },
        {
            title: '管理员备注',
            dataIndex: 'messageForAdmin',
        },
        {
            title: '序列号',
            dataIndex: 'sequence',
        },
        {
            title: '状态',
            dataIndex: 'enable',
            valueEnum: {
                true: { text: '已上线', status: 'Success' },
                false: { text: '未上线', status: 'Default' },
            },
            width: '8%',
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            valueType: 'date',
            width: '8%',
        },
        {
            title: '更新时间',
            dataIndex: 'updateTime',
            valueType: 'date',
            width: '8%',
        },
        {
            title: '操作',
            key: 'option',
            valueType: 'option',
            width: '8%',
            render: () => [<a key="link">修改</a>, <a key="link2">删除</a>],
        },
    ];

    return (
        <ProTable
            columns={columns}
            request={async () => {
                let res = await request.get(api.user_api.getAllV2rayNodes, {});
                return {
                    data: res,
                    success: true,
                };
            }}
            toolBarRender={() => {
                return [
                    <AddV2rayNode
                        onSuccess={() => {
                            setRefresh(!refresh);
                        }}
                    />,
                ];
            }}
            pagination={{
                defaultPageSize: 8,
                showSizeChanger: false,
            }}
            headerTitle="节点列表"
            rowKey="id"
            search={false}
        />
    );
};
