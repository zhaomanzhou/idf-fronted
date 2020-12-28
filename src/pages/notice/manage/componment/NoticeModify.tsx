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
            </Drawer>
        </Fragment>
    );
};

export default NoticeModify;
