import React, { Fragment, useEffect, useRef, useState } from 'react';
import {
    Drawer,
    Form,
    Button,
    Col,
    Row,
    Input,
    Select,
    DatePicker,
    Switch,
    InputNumber,
    Space,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Notice } from '@/pages/notice/manage/data';
import ex from 'umi/dist';
import { FormInstance } from 'antd/es/form';
import { SwitchProps } from 'antd/es/switch';

const { Option } = Select;

export interface NoticeModifyProps {
    visible: boolean;
    notice: Notice | null;
    onClose: () => void;
    onSubmit: (field: FieldData) => void;
}

interface FieldData {
    stick: boolean;
    orderValue: number;
    id: number;
}

interface FormProps {
    onChange: (fields: FieldData[]) => void;
    fields: FieldData[];
}

const NoticeModify: React.FC<NoticeModifyProps> = (props) => {
    const [stick, setStick] = useState<boolean>();
    const [orderValue, setOrderValue] = useState<number>();

    useEffect(() => {
        setStick(props.notice?.stick);
        setOrderValue(props.notice?.orderValue);
    }, [props.visible]);

    return (
        <Fragment>
            <Drawer
                title={props.notice?.title}
                width={720}
                onClose={props.onClose}
                visible={props.visible}
                bodyStyle={{ paddingBottom: 80 }}
                footer={
                    <div
                        style={{
                            textAlign: 'right',
                        }}
                    >
                        <Button onClick={props.onClose} style={{ marginRight: 8 }}>
                            取消
                        </Button>
                        <Button
                            onClick={() => {
                                props.onSubmit({
                                    stick: stick,
                                    orderValue: orderValue,
                                    id: props.notice?.id,
                                } as FieldData);
                            }}
                            type="primary"
                        >
                            提交修改
                        </Button>
                    </div>
                }
            >
                <Form>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item name="stick" label="公告置顶">
                                <Switch
                                    checked={stick}
                                    onChange={(checked, event) => {
                                        setStick(checked);
                                    }}
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item label="设置排序值">
                                <InputNumber
                                    style={{ width: 200 }}
                                    value={orderValue}
                                    onChange={(value) => {
                                        // @ts-ignore
                                        setOrderValue(value);
                                    }}
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    {/*<Row gutter={16}>*/}
                    {/*    <Col span={24}>*/}
                    {/*        <Form.Item label={'可见性'} name="visibility" initialValue={1}>*/}
                    {/*            <Select style={{ width: 120 }}>*/}
                    {/*                <Option value={0}>所有人</Option>*/}
                    {/*                <Option value={1}>注册用户</Option>*/}
                    {/*                <Option value={2}>管理员</Option>*/}
                    {/*            </Select>*/}
                    {/*        </Form.Item>*/}

                    {/*    </Col>*/}
                    {/*</Row>*/}

                    {/*<Row gutter={16}>*/}
                    {/*    <Col span={24}>*/}
                    {/*        <Form.Item label={'文章类型'} name="type" initialValue={1}>*/}
                    {/*            <Select style={{ width: 120 }}>*/}
                    {/*                <Option value={1}>公告</Option>*/}
                    {/*                <Option value={0}>教程</Option>*/}
                    {/*                <Option value={2}>科普</Option>*/}
                    {/*            </Select>*/}
                    {/*        </Form.Item>*/}
                    {/*    </Col>*/}
                    {/*</Row>*/}
                </Form>
            </Drawer>
        </Fragment>
    );
};

export default NoticeModify;
