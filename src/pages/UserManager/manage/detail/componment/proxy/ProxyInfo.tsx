import React, { Fragment } from 'react';
import styles from './ProxyInfo.less';
import { Button, Card, Col, Descriptions, Divider, Row, Statistic, Tooltip } from 'antd';
import { InfoCircleOutlined, LikeOutlined } from '@ant-design/icons';
import { ChartCard, Field, MiniArea } from '@/pages/dashboard/components/Charts';
import numeral from 'numeral';
import { UserInfoLite, UserProxyInfo } from '@/pages/UserManager/manage/data';
import utils from '@/utils/utils';

const topColResponsiveProps = {
    xs: 24,
    sm: 12,
    md: 12,
    lg: 12,
    xl: 6,
    style: { marginBottom: 24 },
};

export interface ProxyInfoProps {
    proxyInfo: UserProxyInfo;
}

export default (props: ProxyInfoProps) => {
    let info = props.proxyInfo;

    const diffDate = (t1: number, t2: number) => {
        if (t1 < t2) {
            return '0';
        }
        return ((t1 - t2) / (1000 * 60 * 60 * 24)).toFixed(1);
    };

    return (
        <Card title={'代理信息'} style={{ paddingLeft: 10 }}>
            <Row gutter={16}>
                <Col span={6}>
                    <Statistic
                        title="流量剩余"
                        value={((info.totalData - info.usedData) / (1024 * 1024.0)).toFixed(2)}
                        suffix={' GB'}
                    />
                </Col>
                <Col span={6}>
                    <Statistic
                        title="会员剩余"
                        value={diffDate(info.expireDate, new Date().getTime())}
                        suffix={' 天'}
                    />
                </Col>
                <Col span={6}>
                    <Statistic
                        title="重置剩余"
                        value={diffDate(info.nextSettleDate, new Date().getTime())}
                        suffix=" 天"
                    />
                </Col>
                <Col span={6}>
                    <Statistic title="会员等级" value={info.level} prefix="VIP" />
                </Col>
            </Row>

            <Descriptions style={{ marginTop: 20 }} column={4}>
                <Descriptions.Item label="总流量">
                    {(info.totalData / (1024 * 1024.0)).toFixed(2)} GB
                </Descriptions.Item>
                <Descriptions.Item label="到期时间">
                    {utils.stringfyV2(info.expireDate)}
                </Descriptions.Item>
                <Descriptions.Item label="重置日期">
                    {utils.stringfyV2(info.nextSettleDate)}
                </Descriptions.Item>
                <Descriptions.Item label="当前套餐">{info.bundleName}</Descriptions.Item>
                <Descriptions.Item label="已用流量">
                    {(info.usedData / (1024 * 1024.0)).toFixed(2)}G
                </Descriptions.Item>
                <Descriptions.Item label="命名空间">{info.namespace}</Descriptions.Item>
                <Descriptions.Item label="最大连接数">{info.maxConnection}</Descriptions.Item>
                <Descriptions.Item label="限速">
                    {(info.speed / 1024.0).toFixed(2)} Mbps
                </Descriptions.Item>
            </Descriptions>
        </Card>
    );
};
