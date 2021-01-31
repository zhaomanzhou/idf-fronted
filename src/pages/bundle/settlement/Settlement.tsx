import React, { useState, Fragment } from 'react';
import { Col, Row, Typography, Card, Space, Button, Divider } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import Item from '@/pages/bundle/settlement/componment/item/Item';
import Title from '@/pages/bundle/settlement/componment/title/Title';
import { AlipayCircleOutlined, AlipayOutlined } from '@ant-design/icons';
import '../../../assets/logos/iconfont.css';
import ResultSub from '@/pages/bundle/settlement/componment/result/ResultSub';
import PackageItem from '@/pages/bundle/settlement/componment/simplepriceitem/PackageItem';
import styles from './Settlement.less';
interface PayItem {
    name: string;
    icon: React.ReactNode;
    id: string;
}

export default () => {
    const [cuPeriod, setCurPeriod] = useState<number>(1);
    const periodEnum = [1, 2, 3, 6, 12];

    const payTypeEnum: PayItem[] = [
        { name: '支付宝', icon: <span className="iconfont icon-zhifubao" />, id: 'alipay' },
        { name: '微信支付', icon: <span className="iconfont icon-weixinzhifu" />, id: 'wechatpay' },
    ];
    const [curPayType, setCurPayType] = useState<string>(payTypeEnum[0].id);
    return (
        <PageContainer>
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
                                    chosen={cuPeriod === val}
                                    key={index}
                                    onClick={() => {
                                        setCurPeriod(val);
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
                    <Col span={16}>
                        <div>
                            <PackageItem />
                        </div>
                    </Col>
                    <Col span={8}>
                        <div style={{ textAlign: 'right' }}>
                            <ResultSub label={'套餐名称'} value={'入门版100G流量'} />
                            <ResultSub label={'购买时长'} value={'3个月'} />
                            <ResultSub label={'总价'} value={'¥60.00'} bigger={true} />
                        </div>
                    </Col>
                </Row>
                <div style={{ textAlign: 'right' }}>
                    <Divider />
                    <Button className={styles.payBtn} type="primary" size={'large'}>
                        立即支付
                    </Button>
                </div>
            </Card>
            ,
        </PageContainer>
    );
};
