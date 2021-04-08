import { Avatar, Button, Card, Col, List, Radio, Tag, Typography } from 'antd';

import React from 'react';

import { AndroidOutlined, AppleOutlined, WindowsOutlined } from '@ant-design/icons';
import { Meta } from 'antd/es/list/Item';

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

const InstructionPanel = ({ loading }: { loading: boolean }) => (
    <Card loading={loading} bordered={false} title={'安装教程'}>
        <Card.Grid>
            <Card bodyStyle={{ padding: 0, textAlign: 'center' }} bordered={false}>
                <AndroidOutlined style={{ fontSize: 38 }} />
                <Meta title={'Android'} />
            </Card>
        </Card.Grid>

        <Card.Grid>
            <Card bodyStyle={{ padding: 0, textAlign: 'center' }} bordered={false}>
                <AppleOutlined style={{ fontSize: 38 }} />
                <Meta title={'IOS'} />
            </Card>
        </Card.Grid>

        <Card.Grid>
            <Card bodyStyle={{ padding: 0, textAlign: 'center', borderWidth: 20 }} bordered={false}>
                <WindowsOutlined style={{ fontSize: 38 }} />
                <Meta title={'Windows'} />
            </Card>
        </Card.Grid>

        <Card.Grid>
            <Card bodyStyle={{ padding: 0, textAlign: 'center' }} bordered={false}>
                <AndroidOutlined style={{ fontSize: 38 }} />
                <Meta title={'Android'} />
            </Card>
        </Card.Grid>
    </Card>
);

export default InstructionPanel;
