import React, { Fragment, useContext, useEffect, useRef, useState } from 'react';
import styles from './NewBundle.less';
import { Col, InputNumber, message, Modal, Radio, Row, Select, Space, Switch } from 'antd';
import { BundleContext, BundleContextType } from '@/pages/bundle/manage/context/ContextManager';
import { Form, Input, Button, Checkbox } from 'antd';
import { DataInput } from '../dataInput/DataInput';
import service from '@/pages/bundle/manage/service';
import { BundleItem } from '@/pages/bundle/manage/BundleManager';

export default ({ action }) => {
    const {
        modifyBundleModalVisible: visible,
        updatingId,
        dispatch,
    } = useContext<BundleContextType>(BundleContext);
    const [isNotLimitSpeed, setIsSpeedLimit] = useState<boolean>(true);

    const hideModal = () => {
        dispatch({ type: 'hide_modify' });
    };

    const layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 20 },
    };
    const [form] = Form.useForm();

    useEffect(() => {
        if (updatingId !== undefined) {
            console.log('----');
            service.getBundleDetailAdmin(updatingId).then((res) => {
                // @ts-ignore
                let curBundle: BundleItem = res;
                let formValue = {
                    ...res,
                    maxSpeed: curBundle?.speed,
                    notLimitSpeed: curBundle?.speed === 0,
                    totalData: {
                        data: 12,
                        dataUnit: 'MB',
                    },
                    price: (curBundle.price / 100).toFixed(2),
                };

                if (curBundle.totalData % 1024 === 0) {
                    formValue.totalData = {
                        data: curBundle.totalData / 1024,
                        dataUnit: 'GB',
                    };
                } else {
                    formValue.totalData = {
                        data: curBundle.totalData,
                        dataUnit: 'MB',
                    };
                }

                if (formValue.notLimitSpeed) {
                    setIsSpeedLimit(false);
                } else {
                    setIsSpeedLimit(true);
                }
                form.setFieldsValue(formValue);
            });
        }
    }, [visible]);
    return (
        <Modal
            title="修改套餐"
            visible={visible}
            okText="修改"
            cancelText="取消"
            onOk={() => {
                form.validateFields()
                    .then((values) => {
                        service
                            .updateBundle(values, updatingId)
                            .then(() => {
                                message.success('修改成功');
                                action.reload();
                                hideModal();
                            })
                            .catch((err) => {
                                message.error('修改失败');
                            });
                        form.resetFields();
                    })
                    .catch((info) => {
                        console.log('Validate Failed:', info);
                    });
            }}
            onCancel={hideModal}
        >
            <Form form={form} name="form_in_modal" {...layout}>
                <Form.Item
                    label="套餐名称"
                    name="name"
                    rules={[{ required: true, message: '请输入套餐名' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item label="套餐描述" name="description">
                    <Input />
                </Form.Item>

                <Form.Item label="套餐流量" name="totalData">
                    <DataInput dataUnitList={['MB', 'GB']} />
                </Form.Item>

                <Form.Item label="最大速度">
                    <Form.Item noStyle hidden={!isNotLimitSpeed}>
                        <Form.Item noStyle name="maxSpeed">
                            <InputNumber />
                        </Form.Item>
                        <span className="ant-form-text">Mbps</span>
                    </Form.Item>

                    <Form.Item name="notLimitSpeed" noStyle valuePropName="checked">
                        <Checkbox
                            onChange={() => {
                                setIsSpeedLimit(!isNotLimitSpeed);
                            }}
                        >
                            不限速
                        </Checkbox>
                    </Form.Item>
                </Form.Item>

                <Form.Item label="用户等级" name="level">
                    <InputNumber />
                </Form.Item>

                <Form.Item label="最大连接数" name="maxConnection">
                    <InputNumber />
                </Form.Item>

                <Form.Item label="有效期">
                    <Form.Item noStyle name="duration">
                        <InputNumber />
                    </Form.Item>
                    <span className="ant-form-text">天</span>
                </Form.Item>

                <Form.Item label="价格">
                    <Form.Item noStyle name="price">
                        <InputNumber />
                    </Form.Item>
                    <span className="ant-form-text">元</span>
                </Form.Item>
                <Form.Item label="立刻上线" name="active" valuePropName="checked">
                    <Switch />
                </Form.Item>
            </Form>
        </Modal>
    );
};
