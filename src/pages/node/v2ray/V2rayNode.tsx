import React from 'react';
import { Avatar, Card, List, Progress, Tag, Tooltip } from 'antd';
import ProList from '@ant-design/pro-list';
import { DownloadOutlined, EditOutlined, ShareAltOutlined } from '@ant-design/icons';
import { Fragment } from 'react';
import NodePanel from '@/pages/node/componment/NodePanel';

const data = [
    '语雀的天空',
    'Ant Design',
    '蚂蚁金服体验科技',
    'TechUI',
    'TechUI 2.0',
    'Bigfish',
    'Umi',
    'Ant Design Pro',
].map((item) => ({
    title: item,
    subTitle: <Tag color="#5BD8A6">语雀专栏</Tag>,
    avatar: 'https://gw.alipayobjects.com/zos/antfincdn/UCSiy1j6jx/xingzhuang.svg',
    content: <div />,
}));

export default () => {
    return (
        <List<any>
            rowKey="id"
            grid={{
                gutter: 16,
                xs: 1,
                sm: 2,
                md: 3,
                lg: 3,
                xl: 4,
                xxl: 4,
            }}
            loading={false}
            dataSource={[{}, {}, {}]}
            renderItem={(item) => (
                <List.Item key={item.id}>
                    <NodePanel />
                    <NodePanel />
                    <NodePanel />
                    <NodePanel />
                    <NodePanel />
                    <NodePanel />
                </List.Item>
            )}
        />
    );
};
