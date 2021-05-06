import {Avatar, Button, Card, Col, List, message, Radio, Row, Tag, Typography} from 'antd';

import {RadioChangeEvent} from 'antd/es/radio';
import React, {useEffect, useState} from 'react';
import {VisitDataType} from '../data.d';
import styles from '../style.less';
import Ellipsis from 'ant-design-pro/lib/Ellipsis';
import {UserProxyInfo} from '@/pages/UserManager/manage/data';
import api from '@/utils/api';
import request from '@/utils/request';
import {Fragment} from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {CopyOutlined} from "@ant-design/icons";

const data = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',
];


const SubscriptionPanel = ({proxyInfo}: { proxyInfo: UserProxyInfo | undefined }) => {
    const [v2raySubUrl, setV2raySubUrl] = useState<String>();
    const [clashSubUrl, setClashSubUrl] = useState<String>();

    const importClash = () => {
        const url = "clash://install-config?url=";
        // @ts-ignore
        window.open(url + encodeURIComponent(clashSubUrl));
    }

    useEffect(() => {
        request.get(api.user_api.getSubscriptionUrl, {type: 'v2ray'}).then((res) => {
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


                                ]}
                            >
                                <List.Item.Meta
                                    title={<Tag color="#87d068">{'V2ray订阅链接'}</Tag>}
                                    description={
                                        <Fragment>
                                            <Ellipsis length={100} style={{display: "inline"}}>{v2raySubUrl}</Ellipsis>
                                            <CopyToClipboard
                                                text={v2raySubUrl}
                                                onCopy={() => {
                                                    message.success('已复制订阅');
                                                }}
                                            >
                                                <a><CopyOutlined style={{color: '#1890ff'}}/></a>
                                            </CopyToClipboard>
                                        </Fragment>
                                    }
                                />
                            </List.Item>

                            <List.Item
                                actions={[

                                    <Button key="2" type="primary" shape="round" onClick={importClash}>
                                        一键导入
                                    </Button>

                                ]}
                            >
                                <List.Item.Meta
                                    title={<Tag color="#87d068">{'Clash订阅链接'}</Tag>}
                                    description={

                                        <Fragment>
                                            <Ellipsis length={55} style={{display: "inline"}}>{clashSubUrl}</Ellipsis>
                                            <CopyToClipboard
                                                text={clashSubUrl}
                                                onCopy={() => {
                                                    message.success('已复制订阅');
                                                }}
                                            >
                                                <a><CopyOutlined style={{color: '#1890ff'}}/></a>
                                            </CopyToClipboard>
                                        </Fragment>
                                    }
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
