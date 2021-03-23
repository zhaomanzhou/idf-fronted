import React, { Fragment } from 'react';
import { useParams } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Card, Descriptions, Divider, Empty, Space, Statistic, Tag, Tooltip } from 'antd';
import ProxyInfo from '@/pages/users/manage/detail/componment/proxy/ProxyInfo';
import BasicInformation from '@/pages/users/manage/detail/componment/basic/BasicInformation';
import UpdateProxyInfo from '@/pages/users/manage/detail/componment/update/UpdateProxyInfo';
import BundleRecharge from '@/pages/users/manage/detail/componment/recharge/BundleRecharge';

const handleSave = (val) => {
    console.log('Edited Value -> ', val);
};

export default () => {
    // @ts-ignore
    const id = useParams().id;

    return (
        <PageContainer
            content={<BasicInformation />}
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
                <UpdateProxyInfo key={'3'} />,

                <BundleRecharge key={'2'} />,
                <Button
                    key="1"
                    style={{ backgroundColor: '#dc3545', color: 'white', borderColor: '#dc3545' }}
                >
                    删除
                </Button>,
            ]}
            extraContent={
                <Space size={24}>
                    <Statistic title="角色" value="管理员" />
                    <Statistic title="会员时长" value={568} prefix="" suffix={'天'} />
                </Space>
            }
        >
            <ProxyInfo />

            <Card title="用户充值记录" style={{ marginTop: 24 }} bordered={false}>
                <Empty />
            </Card>

            <Card title="用户流量记录" style={{ marginTop: 24 }} bordered={false}>
                <Empty />
            </Card>
        </PageContainer>
    );
};
