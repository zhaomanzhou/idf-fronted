import { InfoCircleOutlined } from '@ant-design/icons';
import { Col, Row, Tooltip } from 'antd';

import React, { Fragment } from 'react';
import numeral from 'numeral';
import { ChartCard, MiniArea, MiniBar, MiniProgress, Field } from './Charts';
import { VisitDataType } from '../data.d';

const topColResponsiveProps = {
    xs: 24,
    sm: 12,
    md: 12,
    lg: 12,
    xl: 6,
    style: { marginBottom: 24 },
};

const IntroduceRow = ({ loading, visitData }: { loading: boolean; visitData: VisitDataType[] }) => (
    // @ts-ignore
    <Row gutter={24} type="flex">
        <Col {...topColResponsiveProps}>
            <ChartCard
                bordered={false}
                loading={loading}
                title={'会员时长'}
                action={
                    <Tooltip title={'Introduce'}>
                        <InfoCircleOutlined />
                    </Tooltip>
                }
                total={'45 天'}
                footer={<Field label={'到期时间'} value={'2020-12-30'} />}
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
                    <Tooltip title={'总流量1024GB'}>
                        <InfoCircleOutlined />
                    </Tooltip>
                }
                total={numeral(6560).format('0,0') + ' GB'}
                footer={
                    <Fragment>
                        <Field label={'总流量'} value={'1024GB'} style={{ display: 'inline' }} />{' '}
                        &nbsp;&nbsp;
                        <Field
                            label={'重置日期'}
                            value="2020-12-24"
                            style={{ display: 'inline' }}
                        />
                    </Fragment>
                }
                contentHeight={46}
            >
                <MiniProgress percent={78} strokeWidth={8} target={80} color="#13C2C2" />
            </ChartCard>
        </Col>

        <Col {...topColResponsiveProps}>
            <ChartCard
                bordered={false}
                title={'最大连接数'}
                action={
                    <Tooltip title={'Introduce'}>
                        <InfoCircleOutlined />
                    </Tooltip>
                }
                loading={loading}
                total={'200 / 512'}
                footer={'VIP等级 3 限速 150Mbps'}
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
                total="5 个"
                footer={
                    <div style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>
                        已获得奖励15天会员奖励
                    </div>
                }
                contentHeight={46}
            >
                <MiniBar color="#1890ff" data={visitData} />
            </ChartCard>
        </Col>
    </Row>
);

export default IntroduceRow;
