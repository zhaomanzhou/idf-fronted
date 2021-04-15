import { InfoCircleOutlined } from '@ant-design/icons';
import { Col, Row, Tooltip } from 'antd';

import React, { Fragment } from 'react';
import numeral from 'numeral';
import { UserProxyInfo } from '@/pages/users/manage/data';
import _mock from '@/pages/dashboard/_mock';
import { PageLoading } from '@ant-design/pro-layout';
import utils from '@/utils/utils';
import ChartCard from '@/pages/dashboard/components/Charts/ChartCard';
import { Field } from 'ant-design-pro/lib/Charts';
import MiniProgress from '@/pages/dashboard/components/Charts/MiniProgress';
import MiniBar from '@/pages/dashboard/components/Charts/MiniBar';
import MiniArea from '@/pages/dashboard/components/Charts/MiniArea';

const topColResponsiveProps = {
    xs: 24,
    sm: 12,
    md: 12,
    lg: 12,
    xl: 6,
    style: { marginBottom: 24 },
};

const IntroduceRow = ({
    loading,
    proxyInfo,
}: {
    loading: boolean;
    proxyInfo: UserProxyInfo | undefined;
}) => {
    if (proxyInfo === undefined) {
        return <PageLoading />;
    }

    let visitData = _mock['GET  /api/fake_chart_data'].visitData;

    const dateDayDiff = (d1: number) => {
        let today = new Date();

        const diff = (d1 - today.getTime()) / (1000 * 60 * 60 * 24);
        return diff >= 0 ? diff : 0;
    };

    // @ts-ignore
    return (
        <Row gutter={24}>
            <Col {...topColResponsiveProps}>
                <ChartCard
                    bordered={false}
                    loading={loading}
                    title={'会员剩余时长'}
                    action={
                        <Tooltip title={'Introduce'}>
                            <InfoCircleOutlined />
                        </Tooltip>
                    }
                    total={dateDayDiff(proxyInfo.expireDate).toFixed(0) + ' 天'}
                    footer={
                        <Field
                            label={'到期时间'}
                            value={utils.timestampToDateStr(proxyInfo.expireDate)}
                        />
                    }
                    contentHeight={46}
                >
                    <MiniArea color="#975FE4" data={visitData} />
                </ChartCard>
            </Col>

            <Col {...topColResponsiveProps}>
                <ChartCard
                    bordered={false}
                    loading={loading}
                    title={'流量剩余'}
                    action={
                        <Tooltip
                            title={
                                '总流量' +
                                utils.toDecimal2NoZero(proxyInfo.totalData / (1024 * 1024.0) > 0) +
                                'GB'
                            }
                        >
                            <InfoCircleOutlined />
                        </Tooltip>
                    }
                    total={
                        utils.toDecimal2NoZero(
                            (proxyInfo.totalData - proxyInfo.usedData) / (1024 * 1024.0) > 0
                                ? (proxyInfo.totalData - proxyInfo.usedData) / (1024 * 1024.0)
                                : 0,
                        ) + ' GB'
                    }
                    footer={
                        <Fragment>
                            <Field
                                label={'总流量'}
                                value={
                                    utils.toDecimal2NoZero(proxyInfo.totalData / (1024 * 1024.0)) +
                                    'GB'
                                }
                                style={{ display: 'inline' }}
                            />{' '}
                            &nbsp;&nbsp;
                            <Field
                                label={'重置日期'}
                                value={utils.timestampToDateStr(proxyInfo.nextSettleDate)}
                                style={{ display: 'inline' }}
                            />
                        </Fragment>
                    }
                    contentHeight={46}
                >
                    <MiniProgress
                        percent={100 - (proxyInfo.usedData / proxyInfo.totalData) * 100}
                        strokeWidth={8}
                        target={80}
                        color="#13C2C2"
                    />
                </ChartCard>
            </Col>

            <Col {...topColResponsiveProps}>
                <ChartCard
                    bordered={false}
                    title={'服务器等级'}
                    action={
                        <Tooltip title={'Introduce'}>
                            <InfoCircleOutlined />
                        </Tooltip>
                    }
                    loading={loading}
                    total={'VIP' + proxyInfo.level}
                    footer={'不限个人设备 不限速'}
                    contentHeight={46}
                >
                    <MiniProgress percent={78} strokeWidth={8} target={80} color="#ffc473" />
                </ChartCard>
            </Col>

            <Col {...topColResponsiveProps}>
                <ChartCard
                    loading={loading}
                    bordered={false}
                    title={'邀请用户数'}
                    action={
                        <Tooltip title={'Introduce'}>
                            <InfoCircleOutlined />
                        </Tooltip>
                    }
                    total="0 个"
                    footer={
                        <div style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>
                            已获得0天会员奖励
                        </div>
                    }
                    contentHeight={46}
                >
                    <MiniBar color="#1890ff" data={visitData} />
                </ChartCard>
            </Col>
        </Row>
    );
};

export default IntroduceRow;
