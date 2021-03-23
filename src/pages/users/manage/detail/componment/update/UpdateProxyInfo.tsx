import React from 'react';
import { Button, message, Form, DatePicker, Input } from 'antd';
import ProForm, {
    ModalForm,
    ProFormText,
    ProFormDateRangePicker,
    ProFormSelect,
    ProFormDateTimePicker,
} from '@ant-design/pro-form';
import { DataInput } from '@/pages/bundle/manage/componment/dataInput/DataInput';

const waitTime = (time: number = 100) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, time);
    });
};

export default () => {
    return (
        <ModalForm
            title="信息修改"
            trigger={<Button type={'primary'}>修改信息</Button>}
            modalProps={{
                onCancel: () => console.log('run'),
            }}
            onFinish={async (values) => {
                await waitTime(2000);
                console.log(values.name);
                message.success('提交成功');
                return true;
            }}
            width={650}
            layout={'horizontal'}
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
        >
            <ProFormDateTimePicker name="nextSettleDay" label="下个重置日期" />

            <ProFormDateTimePicker name="expireTime" label="过期时间" />

            <Form.Item label="添加有效时间" name="addValidDay">
                <Input placeholder="请输入要添加的天数" suffix="天" style={{ width: 200 }} />
            </Form.Item>

            <ProFormText width="md" name="maxConnectionNum" label="最大连接数" />

            <Form.Item label="限速" name="speed">
                <DataInput />
            </Form.Item>

            <Form.Item label="流量" name="data">
                <DataInput />
            </Form.Item>

            <ProFormSelect
                width="md"
                name="level"
                label="账号等级"
                valueEnum={{
                    1: 'VIP1',
                    2: 'VIP2',
                    3: 'VIP3',
                }}
            />
        </ModalForm>
    );
};
