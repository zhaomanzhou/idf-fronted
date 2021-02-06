import React, { Reducer, useReducer, useRef, Fragment, useState } from 'react';
import ProTable, { ActionType, ProColumns, TableDropdown } from '@ant-design/pro-table';
import { Link } from 'umi';

import request from '@/utils/request';
import api from '@/utils/api';
import { Button, Modal, Result, Space, Spin } from 'antd';
import styles from '@/pages/bundle/settlement/Settlement.less';
import service from '@/pages/order/service';
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
            record.orderStatus === 'WAIT_TO_SCAN' || record.orderStatus === 'WAIT_TO_PAY'
        );

        if (shouldDisable) {
            return (
                <Space>
                    <Link to={'/bundle/pay/' + record.id} disabled>
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
                    <Link to={'/bundle/pay/' + record.id}>付款</Link>
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
