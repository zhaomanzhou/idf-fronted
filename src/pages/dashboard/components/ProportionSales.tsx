import { Avatar, Button, Card, List, Radio, Tag, Typography } from 'antd';

import { RadioChangeEvent } from 'antd/es/radio';
import React from 'react';
import { VisitDataType } from '../data.d';
import styles from '../style.less';
import Ellipsis from 'ant-design-pro/lib/Ellipsis';

const data = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',
];

const data1 = [
    {
        title: 'TLS+Websocket 安全性高，速度和延迟会有影响',
        content: 'https://idofast.com/subscription/vray/tlsws/422h42h42b2v2vhfjb12b3',
    },
    {
        title: 'Websocket 安全性一般，速度和延迟较好',
        content: 'https://idofast.com/subscription/vray/tls/422h42h42b2v2vhfjb12b3',
    },
];

const ProportionSales = ({
    dropdownGroup,
    salesType,
    loading,
    salesPieData,
    handleChangeSalesType,
}: {
    loading: boolean;
    dropdownGroup: React.ReactNode;
    salesType: 'all' | 'online' | 'stores';
    salesPieData: VisitDataType[];
    handleChangeSalesType?: (e: RadioChangeEvent) => void;
}) => (
    <Card
        loading={loading}
        className={styles.salesCard}
        bordered={false}
        title={'订阅链接'}
        style={{
            height: '100%',
        }}
    >
        <div>
            <List
                dataSource={data1}
                renderItem={(item) => (
                    <List.Item
                        actions={[
                            <Button key="1" type="primary" shape="round">
                                点击复制订阅链接
                            </Button>,
                            // <a key="list-loadmore-more">more</a>,
                        ]}
                    >
                        <List.Item.Meta
                            title={<Tag color="#87d068">{item.title}</Tag>}
                            description={<Ellipsis length={100}>{item.content}</Ellipsis>}
                        />
                    </List.Item>
                )}
            />
        </div>
    </Card>
);

export default ProportionSales;
