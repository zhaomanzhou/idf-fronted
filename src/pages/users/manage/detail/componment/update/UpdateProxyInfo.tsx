import React, { useState } from 'react';
import { Button, message, Form, DatePicker, Input } from 'antd';
import ProForm, {
    ModalForm,
    ProFormText,
    ProFormDateRangePicker,
    ProFormSelect,
    ProFormDateTimePicker,
} from '@ant-design/pro-form';
import { DataInput } from '@/pages/bundle/manage/componment/dataInput/DataInput';
import { UserProxyInfo } from '@/pages/users/manage/data';
import moment from 'moment';
import service from '@/pages/users/manage/detail/componment/update/service';

export interface UpdateProxyInfoProps {
    proxyInfo: UserProxyInfo;
    successNotify: () => void;
}

export default (props: UpdateProxyInfoProps) => {
    let info = props.proxyInfo;

    const [visible, setVisible] = useState<boolean>(false);
    // @ts-ignore
    return (
        <ModalForm
            title="信息修改"
            trigger={
                <Button
                    onClick={() => {
                        setVisible(true);
                    }}
                    type={'primary'}
                >
                    修改信息
                </Button>
            }
            onFinish={async (values) => {
                await service.updateUserProxy(values, info.id);
                message.success('提交成功');
                props.successNotify();
                setVisible(false);
                return;
            }}
            modalProps={{
                onCancel: () => {
                    setVisible(false);
                },
            }}
            visible={visible}
            width={650}
            layout={'horizontal'}
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            initialValues={{
                speed: {
                    data: info.speed,
                    dataUnit: 'kbps',
                },
                totalData: {
                    data: info.totalData / 1024,
                    dataUnit: 'MB',
                },
                extraActiveDay: '',
                level: info.level,
            }}
        >
            <ProFormDateTimePicker
                initialValue={moment(info.nextSettleDate)}
                name="nextSettleDate"
                label="下个重置日期"
            />

            <ProFormDateTimePicker
                initialValue={moment(info.expireDate)}
                name="expireDate"
                label="过期时间"
            />

            <Form.Item label="添加有效时间" name="extraActiveDay">
                <Input
                    placeholder="请输入要添加的天数"
                    suffix="天"
                    style={{ width: 200 }}
                    name="extraActiveDay"
                />
            </Form.Item>

            <ProFormText
                width="sm"
                name="maxConnection"
                label="最大连接数"
                initialValue={info.maxConnection}
            />

            <Form.Item label="限速" name="speed">
                <DataInput dataUnitList={['kbps', 'mbps']} />
            </Form.Item>

            <Form.Item label="流量" name="totalData">
                <DataInput dataUnitList={['MB', 'GB']} />
            </Form.Item>

            <ProFormSelect
                width="sm"
                name="level"
                label="账号等级"
                valueEnum={{
                    0: 'VIP0',
                    1: 'VIP1',
                    2: 'VIP2',
                    3: 'VIP3',
                }}
            />
        </ModalForm>
    );
};
