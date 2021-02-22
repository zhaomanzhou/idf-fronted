import React, { useEffect, useState } from 'react';
import { useParams } from 'umi';
import styles from './OrderDetail.less';
import { GridContent, PageContainer, PageLoading } from '@ant-design/pro-layout';
import { Button, Card, Descriptions, Divider, message, Steps } from 'antd';
import service from '@/pages/order/service';
import { OrderToAdminDetail } from '@/pages/order/data';
import { orderStatusToText } from '../util';
import { timestampToStr } from '@/utils/utils';
import classNames from 'classnames';
import { history } from 'umi';

const { Step } = Steps;
const desc = (timestamp) => (
    <div className={classNames(styles.textSecondary, styles.stepDescription)}>
        <div>{timestampToStr(timestamp)}</div>
    </div>
);

const payDesc = (order: OrderToAdminDetail) => {
    return (
        <div>
            <a
                onClick={() => {
                    message.info('正在进行支付宝手动同步...');
                    service.syncOrderPay(order.id).then((res) => {
                        message.success('同步成功');
                        setTimeout(() => {
                            history.go(0);
                        }, 1000);
                    });
                }}
            >
                支付宝手动同步
            </a>
        </div>
    );
};

export default (props) => {
    const params = useParams();
    // @ts-ignore
    let id = params.id;

    const [curOrder, setCurOrder] = useState<OrderToAdminDetail>();

    useEffect(() => {
        service
            .getOrderDetail(id)
            .then((res) => {
                console.log(res);
                // @ts-ignore
                setCurOrder(res);
            })
            .catch((err) => {
                history.push('/');
            });
    }, []);

    if (!curOrder) {
        return <PageLoading />;
    }
    return (
        <PageContainer>
            <div className={styles.main}>
                <GridContent>
                    <Card style={{ marginBottom: 32 }}>
                        <Descriptions title="订单信息">
                            <Descriptions.Item label="订单ID">{curOrder?.id}</Descriptions.Item>
                            <Descriptions.Item label="用户ID">{curOrder?.userId}</Descriptions.Item>
                            <Descriptions.Item label="用户邮箱">
                                {curOrder.userEmail}
                            </Descriptions.Item>
                            <Descriptions.Item label="状态">
                                {orderStatusToText(curOrder?.orderStatus)}
                            </Descriptions.Item>
                            <Descriptions.Item label="创建时间">
                                {timestampToStr(curOrder.createTime)}
                            </Descriptions.Item>
                            <Descriptions.Item label="支付宝交易号">
                                {curOrder.tradeNo}
                            </Descriptions.Item>
                            <Descriptions.Item label="付款人支付宝ID">
                                {curOrder.buyerId}
                            </Descriptions.Item>
                            <Descriptions.Item label="付款人支付宝账号">
                                {curOrder.buyerLogonId}
                            </Descriptions.Item>
                        </Descriptions>
                    </Card>

                    <Card style={{ marginBottom: 32 }}>
                        {curOrder.orderStatus === 'CANCEL_USER' ||
                        curOrder.orderStatus === 'CANCEL_TIMEOUT' ? (
                            <Steps>
                                <Step
                                    title="创建订单"
                                    description={timestampToStr(curOrder.createTime)}
                                    status={'finish'}
                                />
                                {curOrder.scanTime && (
                                    <Step
                                        title="扫描二维码"
                                        description={timestampToStr(curOrder.createTime)}
                                        status={'finish'}
                                    />
                                )}
                                <Step
                                    title="取消订单"
                                    description={
                                        curOrder.orderStatus === 'CANCEL_USER'
                                            ? '用户自己取消'
                                            : '超时系统取消'
                                    }
                                    status={'error'}
                                />
                            </Steps>
                        ) : (
                            <Steps>
                                <Step
                                    title="创建订单"
                                    description={desc(curOrder.createTime)}
                                    status={'finish'}
                                />
                                <Step
                                    title="扫描二维码"
                                    description={desc(curOrder.scanTime)}
                                    status={
                                        curOrder.orderStatus === 'SUCCESS'
                                            ? 'finish'
                                            : curOrder.scanTime
                                            ? 'finish'
                                            : 'wait'
                                    }
                                />
                                <Step
                                    title="支付"
                                    description={payDesc(curOrder)}
                                    status={curOrder.orderStatus === 'SUCCESS' ? 'finish' : 'wait'}
                                />
                                <Step
                                    title="完成"
                                    description={desc(curOrder.payTime)}
                                    status={curOrder.orderStatus === 'SUCCESS' ? 'finish' : 'wait'}
                                />
                            </Steps>
                        )}
                    </Card>
                    <Card bordered={false}>
                        <Descriptions title="套餐信息" style={{ marginBottom: 32 }}>
                            <Descriptions.Item label="套餐ID">
                                {curOrder.bundleId}
                            </Descriptions.Item>
                            <Descriptions.Item label="套餐名">
                                {curOrder.bundleName}
                            </Descriptions.Item>
                            <Descriptions.Item label="购买时长">
                                {curOrder.totalMonth}月
                            </Descriptions.Item>
                            <Descriptions.Item label="总价">
                                {curOrder.totalMoney / 100.0}元
                            </Descriptions.Item>
                        </Descriptions>
                        <Divider style={{ marginBottom: 32 }} />
                    </Card>
                </GridContent>
            </div>
        </PageContainer>
    );
};
