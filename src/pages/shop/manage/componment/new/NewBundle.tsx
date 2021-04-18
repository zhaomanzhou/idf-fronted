import React, { Fragment, useContext, useRef, useState } from 'react';
import styles from './NewBundle.less';
import { Col, InputNumber, message, Modal, Radio, Row, Select, Space, Switch } from 'antd';
import { BundleContext, BundleContextType } from '@/pages/shop/manage/context/ContextManager';
import { Form, Input, Button, Checkbox } from 'antd';
import { DataInput } from '../dataInput/DataInput';
import service from '@/pages/shop/manage/service';
export default ({ action }) => {
    const { newBundleModalVisible: visible, dispatch } = useContext<BundleContextType>(
        BundleContext,
    );
    const [isNotLimitSpeed, setIsSpeedLimit] = useState<boolean>(true);
    const modalRef = useRef();

    const hideModal = () => {
        dispatch({ type: 'hide_new' });
    };

    const layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 20 },
    };
    const [form] = Form.useForm();
    return (
        <Modal
            title="新建套餐"
            visible={visible}
            okText="创建"
            cancelText="取消"
            onOk={() => {
                form.validateFields()
                    .then((values) => {
                        service
                            .addNewBundle(values)
                            .then(() => {
                                message.success('添加成功');
                                hideModal();
                                action.reload();
                            })
                            .catch((err) => {
                                message.error('添加失败');
                            });
                        form.resetFields();
                    })
                    .catch((info) => {
                        console.log('Validate Failed:', info);
                    });
            }}
            onCancel={hideModal}
        >
            <Form
                form={form}
                name="form_in_modal"
                initialValues={{ modifier: 'public' }}
                {...layout}
            >
                <Form.Item
                    label="套餐名称"
                    name="name"
                    rules={[{ required: true, message: '请输入套餐名' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item label="套餐描述" name="description" initialValue={''}>
                    <Input />
                </Form.Item>

                <Form.Item
                    label="套餐流量"
                    name="totalData"
                    initialValue={{ data: 100, dataUnit: 'GB' }}
                >
                    <DataInput dataUnitList={['MB', 'GB']} />
                </Form.Item>

                <Form.Item label="最大速度">
                    {isNotLimitSpeed && (
                        <Fragment>
                            <Form.Item noStyle name="maxSpeed" initialValue={0}>
                                <InputNumber />
                            </Form.Item>
                            <span className="ant-form-text">Mbps</span>
                        </Fragment>
                    )}

                    <Form.Item
                        name="notLimitSpeed"
                        noStyle
                        valuePropName="checked"
                        initialValue={!isNotLimitSpeed}
                    >
                        <Checkbox
                            onChange={() => {
                                setIsSpeedLimit(!isNotLimitSpeed);
                            }}
                        >
                            不限速
                        </Checkbox>
                    </Form.Item>
                </Form.Item>

                <Form.Item label="用户等级" name="level" initialValue={0}>
                    <InputNumber />
                </Form.Item>

                <Form.Item label="最大连接数" name="maxConnection" initialValue={1024}>
                    <InputNumber />
                </Form.Item>

                <Form.Item label="有效期">
                    <Form.Item noStyle name="duration" initialValue={30}>
                        <InputNumber />
                    </Form.Item>
                    <span className="ant-form-text">天</span>
                </Form.Item>

                <Form.Item label="价格">
                    <Form.Item noStyle name="price" initialValue={10.0}>
                        <InputNumber />
                    </Form.Item>
                    <span className="ant-form-text">元</span>
                </Form.Item>

                <Form.Item
                    label="立刻上线"
                    name="active"
                    valuePropName="checked"
                    initialValue={false}
                >
                    <Switch />
                </Form.Item>
            </Form>
        </Modal>
    );
};
