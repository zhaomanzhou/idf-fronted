import React, { useEffect, useState } from 'react';
import { Button, Form, message } from 'antd';

import { PlusOutlined } from '@ant-design/icons';
import ProForm, {
    ModalForm,
    ProFormDigit,
    ProFormSelect,
    ProFormSwitch,
    ProFormText,
} from '@ant-design/pro-form';
import request from '@/utils/request';
import api from '@/utils/api';
import { DirectV2rayNode } from '@/pages/server/data';

export interface AddV2rayNodeProps {
    node?: any;
    onSuccess: () => void;
}

export default (props: AddV2rayNodeProps) => {
    let initialValues = props.node;
    if (!props.node) {
        initialValues = {
            name: '',
            host: '',
            port: 443,
            level: '1',
            protocol: 'vmess',
            supportTls: true,
            magnification: 1,
            speed: 100,
            enable: true,
            parentNodeId: '0',
            description: '',
        };
    } else {
        initialValues.parentNodeId += '';
        initialValues.level += '';
        initialValues.parentNodeId += '';
        initialValues.magnification /= 10;
    }

    const submitForm = async (values) => {
        values.magnification = values.magnification * 10;
        if (props.node) {
            values.id = props.node.id;
            await request.post(api.user_api.updateV2rayNode, values);
            message.success('修改成功');
        } else {
            await request.post(api.user_api.createV2rayNode, values);
            message.success('提交成功');
        }

        props.onSuccess();
        setVisible(false);
    };

    const [visible, setVisible] = useState<boolean>(false);

    return (
        <ModalForm
            title="添加节点"
            trigger={
                props.node ? (
                    <a
                        onClick={() => {
                            setVisible(true);
                        }}
                    >
                        修改
                    </a>
                ) : (
                    <Button
                        type="primary"
                        onClick={() => {
                            setVisible(true);
                        }}
                    >
                        <PlusOutlined />
                        添加节点
                    </Button>
                )
            }
            onFinish={submitForm}
            initialValues={initialValues}
            visible={visible}
            modalProps={{
                onCancel: () => setVisible(false),
            }}
        >
            <ProFormText
                width="xl"
                name="name"
                label="节点名称"
                rules={[{ required: true, message: '请填写节点名称' }]}
            />

            <ProForm.Group>
                <ProFormText
                    width="md"
                    name="host"
                    label="服务器域名"
                    rules={[{ required: true, message: '请填写服务器域名' }]}
                />
                <ProFormDigit label="端口" name="port" width="sm" />
            </ProForm.Group>

            <ProForm.Group>
                <ProFormSelect
                    width="sm"
                    name="level"
                    label="节点等级"
                    valueEnum={{
                        0: 'VIP0',
                        1: 'VIP1',
                        2: 'VIP2',
                        3: 'VIP3',
                        4: 'VIP4',
                    }}
                />
                <ProFormSelect
                    width="sm"
                    name="protocol"
                    label="协议"
                    valueEnum={{
                        vmess: 'vmess',
                        vless: 'vless',
                    }}
                />
                <ProFormSwitch name="supportTls" label="支持TLS" />
            </ProForm.Group>

            <ProForm.Group>
                <ProFormDigit label="倍率" name="magnification" width="sm" />
                <ProFormDigit label="服务器速率(Mbps)" name="speed" width="sm" />
                <ProFormSwitch name="enable" label="上线" />
            </ProForm.Group>

            <ProFormSelect
                width="xl"
                name="parentNodeId"
                label="父节点"
                request={async () => {
                    let nodeList: DirectV2rayNode[] = await request.get(
                        api.user_api.getDirectNodeList,
                        {},
                    );
                    let res = nodeList.map((value, index) => {
                        return {
                            label: value.name + '(' + value.host + ')',
                            value: value.id,
                        };
                    });
                    return [{ label: '无', value: '0' }, ...res];
                }}
            />
            <ProFormText width="xl" name="description" label="节点描述" />
        </ModalForm>
    );
};
