import { Avatar, Button, Card, List, message, Radio, Tag, Typography } from 'antd';

import { RadioChangeEvent } from 'antd/es/radio';
import React, { useEffect, useState } from 'react';
import { VisitDataType } from '../data.d';
import styles from '../style.less';
import Ellipsis from 'ant-design-pro/lib/Ellipsis';
import { UserProxyInfo } from '@/pages/UserManager/manage/data';
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



const SubscriptionPanel = ({ proxyInfo }: { proxyInfo: UserProxyInfo | undefined }) => {
    const [v2raySubUrl, setV2raySubUrl] = useState<String>();
    const [clashSubUrl, setClashSubUrl] = useState<String>();

    useEffect(() => {
        request.get(api.user_api.getSubscriptionUrl, { type: 'v2ray' }).then((res) => {
            setV2raySubUrl(res);
            return res;
        }).then((res) => {
           let baseUrl = "https://preview.idofast.com/sub?target=clash&new_name=true&" +
               "url=" + encodeURI(res) +
               "&config=https%3A%2F%2Fraw.githubusercontent.com%2FACL4SSR%2FACL4SSR%2Fmaster%2FClash%2Fconfig%2FACL4SSR_Online.ini"
            setClashSubUrl(baseUrl);
        })
        ;
    }, []);

    return (
        <Card
            loading={v2raySubUrl === undefined}
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
                                        text={v2raySubUrl}
                                        onCopy={() => {
                                            message.success('复制成功');
                                        }}
                                    >
                                        <Button key="1" type="primary" shape="round">
                                            点击复制
                                        </Button>
                                    </CopyToClipboard>,

                                    // <a key="list-loadmore-more">more</a>,
                                ]}
                            >
                                <List.Item.Meta
                                    title={<Tag color="#87d068">{'V2ray订阅链接'}</Tag>}
                                    description={<Ellipsis length={100}>{v2raySubUrl}</Ellipsis>}
                                />
                            </List.Item>

                            <List.Item
                                actions={[
                                    <CopyToClipboard
                                        text={clashSubUrl}
                                        onCopy={() => {
                                            message.success('复制成功');
                                        }}
                                    >
                                        <Button key="1" type="primary" shape="round">
                                            点击复制
                                        </Button>
                                    </CopyToClipboard>,

                                    // <a key="list-loadmore-more">more</a>,
                                ]}
                            >
                                <List.Item.Meta
                                    title={<Tag color="#87d068">{'Clash订阅链接'}</Tag>}
                                    description={<Ellipsis length={53}>{clashSubUrl}</Ellipsis>}
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
