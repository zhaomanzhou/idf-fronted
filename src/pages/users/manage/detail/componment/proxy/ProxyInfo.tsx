import React, { Fragment } from 'react';
import styles from './ProxyInfo.less';
import { Button, Card, Col, Descriptions, Divider, Row, Statistic, Tooltip } from 'antd';
import { InfoCircleOutlined, LikeOutlined } from '@ant-design/icons';
import { ChartCard, Field, MiniArea } from '@/pages/dashboard/components/Charts';
import numeral from 'numeral';

const topColResponsiveProps = {
    xs: 24,
    sm: 12,
    md: 12,
    lg: 12,
    xl: 6,
    style: { marginBottom: 24 },
};
export default () => {
    return (
        <Card title={'代理信息'} style={{ paddingLeft: 10 }}>
            <Row gutter={16}>
                <Col span={6}>
                    <Statistic title="流量剩余" value={23.3} suffix={' GB'} />
                </Col>
                <Col span={6}>
                    <Statistic title="重置剩余" value={93} suffix=" 天" />
                </Col>
                <Col span={6}>
                    <Statistic title="会员剩余" value={1128} suffix={' 天'} />
                </Col>
                <Col span={6}>
                    <Statistic title="会员等级" value={3} prefix="VIP" />
                </Col>
            </Row>

            <Descriptions style={{ marginTop: 20 }} column={4}>
                <Descriptions.Item label="总流量">100GB</Descriptions.Item>
                <Descriptions.Item label="重置日期">2020-01-23</Descriptions.Item>
                <Descriptions.Item label="到期时间">2022-12-14</Descriptions.Item>
                <Descriptions.Item label="当前套餐">基础版VIP1</Descriptions.Item>
                <Descriptions.Item label="已用流量">10.3G</Descriptions.Item>
                <Descriptions.Item label="命名空间">0</Descriptions.Item>
                <Descriptions.Item label="最大连接数">1024</Descriptions.Item>
            </Descriptions>
        </Card>
    );
};
