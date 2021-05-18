import React, { Fragment, useEffect, useState } from 'react';
import styles from './index.less';
import { Avatar, Card, Dropdown, List, Statistic, Tooltip } from 'antd';
import {
    ApiOutlined,
    ApiTwoTone,
    DownloadOutlined,
    EditOutlined,
    EllipsisOutlined,
    QrcodeOutlined,
    ShareAltOutlined,
} from '@ant-design/icons';
import Icon from '@/components/Icon/Icon';
import request from '@/utils/request';
import api from '@/utils/api';
import { PageContainer, PageLoading } from '@ant-design/pro-layout';
import { V2rayNodeForUser } from '@/pages/server/data';
import utils from "@/utils/utils";

export default () => {
    const [nodeList, setNodeList] = useState<{}>();
    const [level, setLevel] = useState<number>(0);

    useEffect(() => {
        request.get(api.user_api.getallV2rayNodesForSimpleYser, {}).then((response) => {
            setNodeList(response);
        });
    }, []);

    useEffect(() => {
        request.get(api.user_api.getSelfUserProxyInfo, {}).then((res) => {
            setLevel(res.level);
        });
    }, []);


    if (!nodeList) {
        return <PageLoading />;
    }

    return (
        <PageContainer title={`您当前等级：VIP${level}`}>
            <div>
                {Object.keys(nodeList).map((value, index) => {
                    return (
                        <Fragment key={index}>
                            <Card bordered={false} style={{ marginBottom: 20, width: '100%' }}>
                                <div style={{ fontSize: 20 }}>
                                    VIP{value} 服务器列表
                                    {level < Number(value) ? '（不可用）' : ''}
                                </div>
                            </Card>
                            <List<V2rayNodeForUser>
                                rowKey="id"
                                grid={{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 3, xl: 4, xxl: 4 }}
                                dataSource={nodeList[value]}
                                renderItem={(item) => (
                                    <List.Item key={item.id}>
                                        <Card
                                            hoverable
                                            bodyStyle={{ paddingBottom: 20 }}
                                            actions={[
                                                <Tooltip title="服务器流量倍率">
                                                    <div className={styles.action}>
                                                        x{item.magnification / 10}
                                                    </div>
                                                </Tooltip>,

                                                <div className={styles.action}>
                                                    <QrcodeOutlined />
                                                </div>,
                                                <Tooltip title="当前服务器连接数">
                                                    <span className={styles.action}>
                                                        <ApiOutlined style={{ fontSize: 14 }} />
                                                        {item.connectionNum}
                                                    </span>
                                                </Tooltip>,
                                            ]}
                                        >
                                            <Card.Meta
                                                avatar={<Icon type={utils.getIconByName(item.name)} size={5} />}
                                                title={item.name}
                                                description={item.description}
                                            />
                                        </Card>
                                    </List.Item>
                                )}
                            />
                        </Fragment>
                    );
                })}
            </div>
        </PageContainer>
    );
};
