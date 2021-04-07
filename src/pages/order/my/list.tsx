import React, { Reducer, useReducer, useRef, Fragment, useState } from 'react';
import ProTable, { ActionType, ProColumns, TableDropdown } from '@ant-design/pro-table';
import { Link } from 'umi';

import request from '@/utils/request';
import api from '@/utils/api';
import { Button, Modal, Result, Space, Spin, Tag } from 'antd';
import styles from '@/pages/bundle/settlement/Settlement.less';
import service from '@/pages/order/service';
import { OrderToUser } from '@/pages/order/data';

type CancelStatus = 'initial' | 'canceling' | 'success' | 'fail';
export default () => {
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [cancelStatus, setCancelStatus] = useState<CancelStatus>('initial');
    const tableRef = useRef<ActionType>();

    const cancelOrder = (orderId: number) => {
        setModalVisible(true);
        setCancelStatus('canceling');
        service
            .cancelOrder(orderId)
            .then(() => {
                setCancelStatus('success');
                // @ts-ignore
                tableRef.current.reload();
            })
            .catch(() => {
                setCancelStatus('fail');
            });
    };

    const cancelBtn = (record: OrderToUser) => {
        let shouldDisable: boolean = !(
            record.orderStatus === 'WAIT_TO_SCAN' ||
            record.orderStatus === 'WAIT_TO_PAY' ||
            record.orderStatus == 'INITIAL_CREATED'
        );

        if (shouldDisable) {
            return (
                <Space>
                    <Link to={'/bundle/shop/pay/' + record.id} disabled>
                        付款
                    </Link>
                    <Button type="link" disabled>
                        取消
                    </Button>
                </Space>
            );
        } else {
            return (
                <Space>
                    <Link to={'/bundle/shop/pay/' + record.id}>付款</Link>
                    <Button
                        type="link"
                        onClick={() => {
                            cancelOrder(record.id);
                        }}
                    >
                        取消
                    </Button>
                </Space>
            );
        }
    };

    const columns: ProColumns<OrderToUser>[] = [
        {
            title: '订单号',
            dataIndex: 'id',
        },
        {
            title: '订单名称',
            dataIndex: 'bundleName',
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            valueType: 'dateTime',
        },

        {
            title: '购买时长',
            dataIndex: 'totalMonth',
            render: (_, record) => {
                return record.totalMonth + '月';
            },
        },
        {
            title: '订单金额',
            dataIndex: 'totalMoney',
            render: (_, record) => {
                return '¥' + record.totalMoney * 0.01;
            },
        },

        {
            title: '订单状态',
            dataIndex: 'orderStatus',
            render: (_, record) => {
                switch (record.orderStatus) {
                    case 'INITIAL_CREATED':
                    case 'WAIT_TO_SCAN':
                    case 'WAIT_TO_PAY': {
                        return <Tag color="processing">未支付</Tag>;
                    }
                    case 'CANCEL_USER':
                    case 'CANCEL_TIMEOUT': {
                        return <Tag color="default">已取消</Tag>;
                    }
                    case 'SUCCESS': {
                        return <Tag color="success">已支付</Tag>;
                    }
                    default: {
                        return <Tag color="error">未知</Tag>;
                    }
                }
            },
        },
        {
            title: '更多',
            dataIndex: 'orderStatus',
            render: (_, record) => {
                return (
                    <Fragment>
                        <Space>{cancelBtn(record)}</Space>
                    </Fragment>
                );
            },
        },
    ];

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
                actionRef={tableRef}
            />

            <Modal
                title="取消订单"
                visible={modalVisible}
                footer={null}
                onCancel={() => {
                    setModalVisible(false);
                }}
            >
                {cancelStatus === 'success' && <Result status="success" title="订单取消成功" />}
                {cancelStatus === 'fail' && <Result status="error" title="订单取消失败" />}
                {cancelStatus === 'canceling' && (
                    <Fragment>
                        <Spin
                            tip={'正在取消订单，请稍等...'}
                            size={'large'}
                            className={styles.loading}
                        />
                    </Fragment>
                )}
            </Modal>
        </Fragment>
    );
};
