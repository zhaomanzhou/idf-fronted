import React, { useEffect, useState } from 'react';
import { Button, Input, Progress, Space, Tag, Descriptions, Form, Popconfirm, message } from 'antd';
import ProList from '@ant-design/pro-list';
import AddV2rayNode from '@/pages/server/v2ray/admin/add/AddOrUpdateV2rayNode';
import api from '@/utils/api';
import request from '@/utils/request';
import { V2rayNodeVo } from '@/pages/server/data';
import { Fragment } from 'react';
import NodeItem from '@/pages/server/v2ray/admin/componment/nodeitem/NodeItem';

export default () => {
    const [nodeList, setNodeList] = useState<V2rayNodeVo[]>([]);

    const [refresh, setRefresh] = useState<boolean>(false);

    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        request
            .get(api.user_api.getAllV2rayNodes, {})
            .then((res) => {
                setNodeList(res);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [refresh]);

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

    return (
        <ProList<any>
            loading={loading}
            toolBarRender={() => {
                return [
                    <AddV2rayNode
                        onSuccess={() => {
                            setRefresh(!refresh);
                        }}
                    />,
                ];
            }}
            metas={{
                style: {},
                title: {
                    dataIndex: 'name',
                },
                subTitle: {
                    render: (_, value, index) => {
                        return <></>;
                    },
                },

                avatar: {
                    render: () => {
                        return 'https://gw.alipayobjects.com/zos/antfincdn/UCSiy1j6jx/xingzhuang.svg';
                    },
                },
                content: {
                    render: (_, node: V2rayNodeVo) => {
                        return (
                            <div key={1}>
                                <NodeItem label={'域名'} value={node.host} />
                                <NodeItem label={'端口'} value={node.port} />
                                <NodeItem label={'TLS'} value={node.supportTls ? '是' : '否'} />
                                {/*<NodeItem label={'协议'} value={node.protocol} />*/}
                                <NodeItem label={'等级'} value={'V' + node.level} />
                                <NodeItem label={'倍率'} value={node.magnification/10} />
                                {/*<NodeItem label={'速率'} value={node.speed + 'mbps'} />*/}
                                <NodeItem label={'描述'} value={node.description} />
                                <NodeItem
                                    label={'中转'}
                                    value={node.parentNodeId !== 0 ? '是' : '否'} />
                                <NodeItem label={'备注'} value={node.messageForAdmin} />
                                <NodeItem label={'序列号'} value={node.sequence} />
                                <NodeItem label={'父节点'} value={node.parentName} />
                            </div>
                        );
                    },
                },
                actions: {
                    render: (_, node) => {
                        return [
                            <Popconfirm
                                title="确定要删除该节点？"
                                onConfirm={() => deleteNode(node.id)}
                                okText="是"
                                cancelText="否"
                                key={node.id}
                            >
                                <a href="#">删除</a>
                            </Popconfirm>,
                            <AddV2rayNode
                                key={node.id}
                                node={node}
                                onSuccess={() => {
                                    setRefresh(!refresh);
                                }}
                            />,
                        ];
                    },
                },
            }}
            pagination={{
                defaultPageSize: 8,
                showSizeChanger: false,
            }}
            grid={{ gutter: 16, column: 4, xs: 1, sm: 1, md: 2, lg: 2, xl: 3, xxl: 4 }}
            headerTitle="节点列表"
            dataSource={nodeList}
        />
    );
};
