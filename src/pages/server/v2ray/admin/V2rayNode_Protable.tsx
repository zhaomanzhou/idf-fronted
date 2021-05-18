import React, {useEffect, useRef, useState} from 'react';
import {Button, Input, Progress, Space, Tag, Descriptions, Form, Popconfirm, message, FormInstance, Badge} from 'antd';
import ProList from '@ant-design/pro-list';
import AddV2rayNode from '@/pages/server/v2ray/admin/add/AddOrUpdateV2rayNode';
import api from '@/utils/api';
import request from '@/utils/request';
import { V2rayNodeVo } from '@/pages/server/data';
import { Fragment } from 'react';
import NodeItem from '@/pages/server/v2ray/admin/componment/nodeitem/NodeItem';
import ProTable, {ActionType, ColumnsState, ProColumns} from '@ant-design/pro-table';
import './V2rayNode.less'

export default () => {

    const [refresh, setRefresh] = useState<boolean>(false);

    const ref = useRef<ActionType>();

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

    useEffect(() => {
        if(ref){
            // @ts-ignore
            ref.current.reload();
        }
    }, [refresh]);

    const columns: ProColumns<V2rayNodeVo>[] = [
        {
            title: '序号',
            dataIndex: 'level',
            valueType: 'indexBorder',
        },
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: '等级',
            dataIndex: 'level',
            render: (_, record) => {
                return 'V' + record.level;
            },
        },
        {
            title: '节点名称',
            dataIndex: 'name',
            render: (_, item) => {
                return (
                    <Fragment>
                        <Badge status={item.enable?"success": "default"} text={item.name} /> {" "}

                    </Fragment>
                    )
            },
            valueType: 'text',
            sorter: (e1, e2) =>{
                return e1.name > e2.name? 1: -1;
            },
        },

        {
            title: 'host',
            dataIndex: 'host',
            // render: (_, record) => {
            //     return <Tag color="red">{record.host}</Tag>;
            // },
            copyable: true,
        },


        {
            title: '访问端口',
            dataIndex: 'port',
            render: (_, record) => {
                return(
                    <Fragment>
                        <Tag color={"blue"}>{record.port + " "}</Tag>
                        {record.supportTls && <Tag color="red">TLS</Tag>}
                    </Fragment>
                )
            },
            sorter: (e1, e2) => {
                return e1.port > e2.port? 1: -1;
            }

        },

        // {
        //     title: '协议',
        //     dataIndex: 'protocol',
        // },
        // {
        //     title: 'TLS',
        //     dataIndex: 'supportTls',
        //     valueEnum: {
        //         true: { text: '开启', status: 'Success' },
        //         false: { text: '未开启', status: 'Default' },
        //     },
        // },
        {
            title: '倍率',
            dataIndex: 'magnification',
            render: (_, record) => {
                return record.magnification / 10;
            },
            key: 'magnification',
        },

        {
            title: '速率',
            dataIndex: 'speed',
            render: (_, record) =>{
                return record.speed + "Mbps"
            },
            key: 'speed',
        },
        {
            title: '描述',
            dataIndex: 'description',
            key: 'description'
        },
        {
            title: '管理员备注',
            dataIndex: 'messageForAdmin',
        },
        {
            title: '序列号',
            dataIndex: 'sequence',
            key:'sequence'
        },
        {
            title: '父节点',
            dataIndex: 'parentName',
            render: (_, record) => {
                return(
                    <Fragment>
                        {record.parentName &&
                        <Fragment>
                            {record.parentName}<Tag color="green">{record.parentHost}</Tag>
                        </Fragment>
                        }
                    </Fragment>
                )
            },
            width: '14%',
            sorter:(e1, e2) => {
                let v1 = e1.parentName? e1.parentName: '';
                let v2 = e2.parentName? e2.parentName: '';
                return v1 < v2? 1: -1;
            }
        },

        {
            title: '创建时间',
            dataIndex: 'createTime',
            valueType: 'date',
            width: '8%',
            key: 'createTime',
            sorter: true,
        },
        {
            title: '更新时间',
            dataIndex: 'updateTime',
            valueType: 'date',
            width: '8%',
            key:'updateTime',
            sorter: true,

        },
        {
            title: '操作',
            key: 'option',
            valueType: 'option',
            width: '8%',
            render: (_, node) => [

                <AddV2rayNode
                    key={node.id}
                    node={node}
                    onSuccess={() => {
                        setRefresh(!refresh);
                    }}
                />,
                <Popconfirm
                    title="确定要删除该节点？"
                    onConfirm={() => deleteNode(node.id)}
                    okText="是"
                    cancelText="否"
                    key={node.id}
                >
                    <a href="#">删除</a>
                </Popconfirm>,
            ],
        },
    ];

    const [columnsStateMap, setColumnsStateMap] = useState<Record<string, ColumnsState>>({
        description: {
            show: false,
        },
        sequence: {
            show: false,
        },
        magnification:{
            show: false,
        },
        speed:{
            show: false,
        },
        createTime:{
            show: false,
        },
        updateTime:{
            show: false,
        },
        id:{
            show: false,
        }


    });

    const rowClassName = (record, index) => {
        let className = '';
        className = index % 2 === 0 ? "oddRow" : "evenRow";
        return className
    }
    return (
        <ProTable
            rowClassName={rowClassName}
            columns={columns}
            request={async () => {
                let res = await request.get(api.user_api.getAllV2rayNodes, {});
                return {
                    data: res,
                    success: true,
                };
            }}
            actionRef={ref}
            toolBarRender={() => {
                return [
                    <AddV2rayNode
                        onSuccess={() => {
                            setRefresh(!refresh);
                        }}
                    />,
                ];
            }}

            columnsStateMap={columnsStateMap}
            onColumnsStateChange={(map) => setColumnsStateMap(map)}
            headerTitle="节点列表"
            rowKey="id"
            search={false}
            columnEmptyText={false}
        />
    );
};
