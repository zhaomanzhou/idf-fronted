import React from 'react';
import { useParams } from 'umi';
import styles from './UserDetail.less';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Card, Descriptions, Space, Statistic, Tag } from 'antd';
import { ArrowUpOutlined, LikeOutlined, UserOutlined } from '@ant-design/icons';

const content = (
    <Descriptions size="middle" column={2}>
        <Descriptions.Item label="用户ID">123424</Descriptions.Item>
        <Descriptions.Item label="用户状态">
            <a>封禁</a>
        </Descriptions.Item>
        <Descriptions.Item label="用户邮箱">zmzsstreet@163.com</Descriptions.Item>
        <Descriptions.Item label="用户设备">Android</Descriptions.Item>
        <Descriptions.Item label="用户备注">微信风轻云淡</Descriptions.Item>
        <Descriptions.Item label="创建时间">2020-02-12</Descriptions.Item>
    </Descriptions>
);

export default () => {
    // @ts-ignore
    const id = useParams().id;

    return (
        <PageContainer
            content={content}
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
                <Button key="3">修改信息</Button>,
                <Button key="2">套餐充值</Button>,
                <Button key="1" type="primary">
                    删除
                </Button>,
            ]}
            extraContent={
                <Space size={24}>
                    <Tag color="success">
                        <Statistic value={'管理员'} prefix={<UserOutlined />} />
                    </Tag>
                </Space>
            }
        ></PageContainer>
    );
};
