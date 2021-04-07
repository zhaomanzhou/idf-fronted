import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'umi';
import { PageContainer, PageLoading } from '@ant-design/pro-layout';
import { Button, Card, Descriptions, Divider, Empty, Space, Statistic, Tag, Tooltip } from 'antd';
import ProxyInfo from '@/pages/users/manage/detail/componment/proxy/ProxyInfo';
import BasicInformation from '@/pages/users/manage/detail/componment/basic/BasicInformation';
import UpdateProxyInfo from '@/pages/users/manage/detail/componment/update/UpdateProxyInfo';
import BundleRecharge from '@/pages/users/manage/detail/componment/recharge/BundleRecharge';
import request from '@/utils/request';
import api from '@/utils/api';
import { User, UserProxyInfo } from '@/pages/users/manage/data';
import RechargeLog from '@/pages/users/manage/detail/componment/rechargelog/RechargeLog';
import DataResetLog from '@/pages/users/manage/detail/componment/datalog/DataResetLog';

const handleSave = (val) => {
    console.log('Edited Value -> ', val);
};

export default () => {
    // @ts-ignore
    const id = useParams().id;

    const [user, setUser] = useState<User>();
    const [proxyInfo, setProxyInfo] = useState<UserProxyInfo>();

    const [update, setUpdate] = useState<boolean>(true);

    useEffect(() => {
        request.get(api.user_api.getUserDetailById, { id }).then((response) => {
            // @ts-ignore
            setUser(response);
        });
    }, [id, update]);

    useEffect(() => {
        request.get_restful(api.user_api.getUserProxyInfoById, id).then((response) => {
            // @ts-ignore
            setProxyInfo(response);
        });
    }, [id, update]);

    if (!user || !proxyInfo) {
        return <PageLoading />;
    }

    return (
        <PageContainer
            content={<BasicInformation user={user} />}
            tabList={[
                {
                    tab: '基本信息',
                    key: 'base',
                },
                {
                    tab: '详细信息',
                    key: 'info',
                },
            ]}
            extra={[
                <UpdateProxyInfo
                    key={'3'}
                    proxyInfo={proxyInfo}
                    successNotify={() => {
                        setUpdate(!update);
                    }}
                />,

                <BundleRecharge key={'2'} proxyInfo={proxyInfo} />,
                <Button
                    key="1"
                    style={{ backgroundColor: '#dc3545', color: 'white', borderColor: '#dc3545' }}
                >
                    删除
                </Button>,
            ]}
            extraContent={
                <Space size={24}>
                    <Statistic title="角色" value={user.role == 'admin' ? '管理员' : '平民'} />
                    <Statistic
                        title="会员时长"
                        value={proxyInfo.totalActiveDay}
                        prefix=""
                        suffix={'天'}
                    />
                </Space>
            }
        >
            <ProxyInfo proxyInfo={proxyInfo} />

            <Card title="用户充值记录" style={{ marginTop: 24 }} bordered={false}>
                <RechargeLog proxyInfo={proxyInfo} />
            </Card>

            <Card title="用户流量记录" style={{ marginTop: 24 }} bordered={false}>
                <DataResetLog proxyInfo={proxyInfo} />
            </Card>
        </PageContainer>
    );
};
