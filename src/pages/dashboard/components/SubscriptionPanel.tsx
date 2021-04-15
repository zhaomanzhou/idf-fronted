import { Avatar, Button, Card, List, message, Radio, Tag, Typography } from 'antd';

import { RadioChangeEvent } from 'antd/es/radio';
import React, { useEffect, useState } from 'react';
import { VisitDataType } from '../data.d';
import styles from '../style.less';
import Ellipsis from 'ant-design-pro/lib/Ellipsis';
import { UserProxyInfo } from '@/pages/users/manage/data';
import api from '@/utils/api';
import request from '@/utils/request';
import { Fragment } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

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

const SubscriptionPanel = ({
    loading,
    proxyInfo,
}: {
    loading: boolean;
    proxyInfo: UserProxyInfo;
}) => {
    const [subUrl, setSubUrl] = useState<String>();

    useEffect(() => {
        request.get(api.user_api.getSubscriptionUrl, { type: 'v2ray' }).then((res) => {
            setSubUrl(res);
        });
    }, []);

    return (
        <Card
            loading={subUrl === undefined}
            className={styles.salesCard}
            bordered={false}
            title={'订阅链接'}
            style={{
                height: '100%',
            }}
        >
            <div>
                <List
                    dataSource={[{}]}
                    renderItem={(item) => (
                        <Fragment>
                            <List.Item
                                actions={[
                                    <CopyToClipboard
                                        text={subUrl}
                                        onCopy={() => {
                                            message.success('复制成功');
                                        }}
                                    >
                                        <Button key="1" type="primary" shape="round">
                                            点击复制订阅链接
                                        </Button>
                                    </CopyToClipboard>,

                                    // <a key="list-loadmore-more">more</a>,
                                ]}
                            >
                                <List.Item.Meta
                                    title={<Tag color="#87d068">{'V2ray订阅链接'}</Tag>}
                                    description={<Ellipsis length={100}>{subUrl}</Ellipsis>}
                                />
                            </List.Item>

                            <List.Item
                                actions={[
                                    <CopyToClipboard
                                        text={subUrl}
                                        onCopy={() => {
                                            message.success('复制成功');
                                        }}
                                    >
                                        <Button key="1" type="primary" shape="round">
                                            点击复制订阅链接
                                        </Button>
                                    </CopyToClipboard>,

                                    // <a key="list-loadmore-more">more</a>,
                                ]}
                            >
                                <List.Item.Meta
                                    title={<Tag color="#87d068">{'SSR订阅链接'}</Tag>}
                                    description={<Ellipsis length={100}>{subUrl}</Ellipsis>}
                                />
                            </List.Item>
                        </Fragment>
                    )}
                />
            </div>
        </Card>
    );
};

export default SubscriptionPanel;
