import React, { useEffect, useState } from 'react';
import { Card, message } from 'antd';
import ProForm, { ProFormText, ProFormDateRangePicker, ProFormSelect } from '@ant-design/pro-form';
import request from '@/utils/request';
import api from '@/utils/api';
import { PageLoading } from '@ant-design/pro-layout';

const waitTime = (time: number = 100) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, time);
    });
};

export default () => {
    const [preferenceObject, setPreferenceObject] = useState<any>();

    useEffect(() => {
        request.get(api.user_api.getPreferencesList, {}).then((response) => {
            let preferenceObject = {};
            // @ts-ignore
            for (const preference of response) {
                preferenceObject[preference.preKey] = preference.preValue;
            }
            setPreferenceObject(preferenceObject);
        });
    }, []);

    if (preferenceObject === undefined) {
        return <PageLoading />;
    }
    return (
        <Card title={'更新系统变量值'}>
            <ProForm
                onFinish={async (values) => {
                    request.post(api.user_api.updatePreferences, values).then((response) => {
                        message.success('更新成功');
                    });
                    console.log(values);
                }}
                initialValues={preferenceObject}
                layout="horizontal"
                labelCol={{ span: 3 }}
            >
                <ProFormText width="xl" name="INSTRUCTION_LINK_ANDROID" label="安卓教程地址" />
                <ProFormText width="xl" name="INSTRUCTION_LINK_IOS" label="IOS教程地址" />
                <ProFormText width="xl" name="INSTRUCTION_LINK_WINDOWS" label="Windows教程地址" />
                <ProFormText width="xl" name="INSTRUCTION_LINK_MAC" label="MAC教程地址" />
                <ProFormText width="xl" name="INSTRUCTION_LINK_LINUX" label="Linux教程地址" />
                <ProFormText
                    width="xl"
                    name="INSTRUCTION_LINK_UPDATE_SUBSCRIPTION"
                    label="如何更新订阅"
                />
                <ProFormText width="xl" name="DASHBOARD_NOTICE_LINK" label="首页公告链接" />
            </ProForm>
        </Card>
    );
};
