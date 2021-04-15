import React, { Suspense, useEffect, useState } from 'react';
import { GridContent, PageLoading } from '@ant-design/pro-layout';
import { Col, Row } from 'antd';
import { connect } from 'umi';
import { CurrentUser } from '@/models/user';
import { UserVo } from '@/pages/user/login/data';
import { GlobalModelState } from '@/models/global';
import api from '@/utils/api';
import request from '@/utils/request';
import { UserProxyInfo } from '@/pages/users/manage/data';
import NoticePanel from '@/pages/dashboard/components/NoticePanel';
import SubscriptionPanel from '@/pages/dashboard/components/SubscriptionPanel';
import InstructionPanel from '@/pages/dashboard/components/InstructionPanel';
import { WaterWave } from 'ant-design-pro/lib/Charts';
import 'ant-design-pro/dist/ant-design-pro.css';
import DataUsage from '@/pages/dashboard/components/DataUsage';

const IntroduceRow = React.lazy(() => import('./components/IntroduceRow'));

const Dashboard = ({ global }) => {
    let user: UserVo = global.user;

    const [proxyInfo, setProxyInfo] = useState<UserProxyInfo>();

    useEffect(() => {
        request.get(api.user_api.getSelfUserProxyInfo, {}).then((res) => {
            // @ts-ignore
            setProxyInfo(res);
        });
    }, [user.id]);

    return (
        <GridContent>
            <React.Fragment>
                <Suspense fallback={<PageLoading />}>
                    <IntroduceRow loading={proxyInfo === undefined} proxyInfo={proxyInfo} />
                </Suspense>

                <Row
                    gutter={24}
                    style={{
                        marginTop: 24,
                    }}
                >
                    <Col xl={12} lg={24} md={24} sm={24} xs={24} style={{ marginBottom: 24 }}>
                        <Suspense fallback={null}>
                            <InstructionPanel />
                        </Suspense>
                    </Col>

                    <Col xl={12} lg={24} md={24} sm={24} xs={24} style={{ marginBottom: 24 }}>
                        <Suspense fallback={null}>
                            <DataUsage loading={false} />
                        </Suspense>
                    </Col>
                </Row>

                <Row gutter={24}>
                    <Col xl={12} lg={24} md={24} sm={24} xs={24} style={{ marginBottom: 24 }}>
                        <Suspense fallback={null}>
                            <NoticePanel loading={false} />
                        </Suspense>
                    </Col>

                    <Col xl={12} lg={24} md={24} sm={24} xs={24} style={{ marginBottom: 24 }}>
                        <Suspense fallback={null}>
                            <SubscriptionPanel proxyInfo={proxyInfo} />
                        </Suspense>
                    </Col>
                </Row>
            </React.Fragment>
        </GridContent>
    );
};

export default connect(({ global }: { global: GlobalModelState }) => ({
    global,
}))(Dashboard);
