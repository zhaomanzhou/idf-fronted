import React, { useState, Fragment, useEffect } from 'react';
import { Col, Row, Typography, Card, Space, Button, Divider, Modal, Result, Spin } from 'antd';
import { PageContainer, PageLoading } from '@ant-design/pro-layout';
import { history } from 'umi';

import Item from '@/pages/bundle/settlement/componment/item/Item';
import Title from '@/pages/bundle/settlement/componment/title/Title';
import '../../../assets/logos/iconfont.css';
import ResultSub from '@/pages/bundle/settlement/componment/result/ResultSub';
import PackageItem from '@/pages/bundle/settlement/componment/simplepriceitem/PackageItem';
import styles from './Settlement.less';
import { BundleItem } from '@/pages/bundle/manage/BundleManager';
import service, { Order } from '@/pages/bundle/settlement/service';

interface PayItem {
    name: string;
    icon: React.ReactNode;
    id: number;
}

type OrderStatus = 'initial' | 'generating_order' | 'generated' | 'invalid_operation';

const err_msg = {
    __html: '购买的套餐非当前使用套餐，如需更换请联系管理员<br />（更新套餐功能正在开发中...）',
};

export default () => {
    const [totalMonth, setTotalMonth] = useState<number>(1);
    const periodEnum = [1, 2, 3, 6, 12];

    const payTypeEnum: PayItem[] = [
        { name: '支付宝', icon: <span className="iconfont icon-zhifubao" />, id: 0 },
        { name: '微信支付', icon: <span className="iconfont icon-weixinzhifu" />, id: 1 },
    ];
    const [curPayType, setCurPayType] = useState<number>(payTypeEnum[0].id);
    const [bundle, setBundle] = useState<BundleItem>();

    useEffect(() => {
        let pathName = history.location.pathname;
        const pathPrefix = '/bundle/shop/settlement/';
        let id = pathName.substring(pathName.indexOf(pathPrefix) + pathPrefix.length);
        if (id === null || id === '') {
            history.push('/bundle/shop/list');
            return;
        }
        service
            .getBundleDetail(id)
            .then((res) => {
                // @ts-ignore
                setBundle(res);
            })
            .catch((err) => {
                history.push('/bundle/shop/list');
                return;
            });
    }, []);

    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [orderStatus, setOrderStatus] = useState<OrderStatus>('initial');
    const [order, setOrder] = useState<Order>();

    /**
     * 选好时间支付方式  点击立即下单
     */
    const handleOrder = () => {
        if (curPayType === payTypeEnum[1].id) {
            Modal.error({
                title: '暂不支持微信支付，请选用支付宝支付',
            });
            return;
        }
        setModalVisible(true);
        setOrderStatus('generating_order');
        // @ts-ignore
        service
            .createOrder(bundle?.id, totalMonth, curPayType)
            .then((res) => {
                setOrderStatus('generated');
                // @ts-ignore
                setOrder(res);
            })
            .catch((err) => {
                setOrderStatus('invalid_operation');
            });
    };

    /**
     * 生成订单后，点击立即付款
     */
    const handleToPay = () => {
        // @ts-ignore
        service.createPay(order?.id).then((res) => {});

        setModalVisible(false);
        setOrderStatus('generated');
        history.push('/bundle/shop/pay/' + order?.id);
    };

    if (bundle === undefined || bundle === null) {
        return <PageLoading />;
    }
    return (
        <PageContainer title={'套餐结算'}>
            <Card>
                <Row>
                    <Col span={24}>
                        <Title content={'选择套餐时长'} />
                    </Col>
                </Row>
                <Space />
                <Row gutter={16}>
                    {periodEnum.map((val, index) => {
                        return (
                            <Col span={4} key={index}>
                                <Item
                                    content={val + '个月'}
                                    chosen={totalMonth === val}
                                    key={index}
                                    onClick={() => {
                                        setTotalMonth(val);
                                    }}
                                />
                            </Col>
                        );
                    })}
                </Row>

                <Row>
                    <Col span={24}>
                        <Title content={'选择支付方式'} />
                    </Col>
                </Row>
                <Space />
                <Row gutter={16}>
                    {payTypeEnum.map((val, index) => {
                        return (
                            <Col span={4} key={index}>
                                <Item
                                    content={
                                        <Fragment>
                                            {val.icon} {val.name}
                                        </Fragment>
                                    }
                                    chosen={curPayType === val.id}
                                    key={index}
                                    onClick={() => {
                                        setCurPayType(val.id);
                                    }}
                                />
                            </Col>
                        );
                    })}
                </Row>

                <Row>
                    <Col span={24}>
                        <Title content={'订单详情'} />
                    </Col>
                </Row>

                <Row>
                    <Col span={8}>
                        <div>
                            <PackageItem
                                bundle={bundle}
                                style={{ width: 22, backgroundColor: 'black' }}
                            />
                        </div>
                    </Col>
                    <Col span={16}>
                        <div style={{ textAlign: 'right' }}>
                            <ResultSub
                                label={'套餐名称'}
                                value={`${bundle?.name}(${bundle?.price * 0.01}元/月)`}
                            />
                            <ResultSub label={'购买时长'} value={totalMonth + '个月'} />
                            <ResultSub
                                label={'总价'}
                                value={'¥' + (bundle?.price * totalMonth * 0.01).toFixed(2)}
                                bigger={true}
                            />
                        </div>
                    </Col>
                </Row>
                <div style={{ textAlign: 'right' }}>
                    <Divider />
                    <Button
                        className={styles.payBtn}
                        type="primary"
                        size={'large'}
                        onClick={handleOrder}
                    >
                        立即下单
                    </Button>
                </div>
            </Card>
            <Modal
                title="下单结果"
                visible={modalVisible}
                footer={null}
                onCancel={() => {
                    setModalVisible(false);
                }}
            >
                {orderStatus === 'generated' && (
                    <Result
                        status="success"
                        title="订单生成成功"
                        subTitle={'订单号: ' + order?.id}
                        extra={[
                            <Button
                                type="primary"
                                key="console"
                                size={'large'}
                                onClick={handleToPay}
                            >
                                立即支付
                            </Button>,
                        ]}
                    />
                )}
                {orderStatus === 'invalid_operation' && (
                    <Result
                        status="error"
                        title="生成订单失败"
                        subTitle={<div dangerouslySetInnerHTML={err_msg} />}
                    />
                )}
                {orderStatus === 'generating_order' && (
                    <Fragment>
                        <Spin
                            tip={'正在生成订单，请稍等...'}
                            size={'large'}
                            className={styles.loading}
                        />
                    </Fragment>
                )}
            </Modal>
        </PageContainer>
    );
};
