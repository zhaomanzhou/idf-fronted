import React, { Component } from 'react';

import { Button, List, message, Space, Switch } from 'antd';
import { Fragment } from 'react';
import { ModalForm, ProFormText } from '@ant-design/pro-form';
import { PlusOutlined } from '@ant-design/icons';
import request from '@/utils/request';
import api from '@/utils/api';
import { connect } from 'umi';
import { GlobalModelState } from '@/models/global';
import { UserVo } from '@/pages/user/login/data';
import utils from '@/utils/utils';

const SecurityView = ({ global }) => {
    let user: UserVo = global.user;

    const action = () => {
        return (
            <ModalForm
                title="新建表单"
                layout={'horizontal'}
                trigger={<a>修改</a>}
                labelCol={{ span: 3 }}
                onFinish={async (values) => {
                    try {
                        await request.post(api.user_api.resetPasswordByPassword, values);
                        message.success('修改成功');
                        return true;
                    } catch (err) {
                        return false;
                    }
                }}
            >
                <ProFormText.Password
                    width="md"
                    label="原密码"
                    name="passwordOld"
                    rules={[{ required: true, message: '请输入原密码' }]}
                />
                <ProFormText.Password
                    width="md"
                    label="新密码"
                    name="passwordNew"
                    rules={[
                        { required: true, message: '请输入新密码' },
                        {
                            min: 6,
                            message: '密码不能少于6个字符',
                        },
                    ]}
                />
                <ProFormText.Password
                    width="md"
                    label="确认新密码"
                    name="confirm"
                    rules={[
                        { required: true, message: '请确认新密码' },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('passwordNew') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('两次输入的密码不一致！'));
                            },
                        }),
                    ]}
                />
            </ModalForm>
        );
    };

    return (
        <Fragment>
            <List itemLayout="horizontal">
                <List.Item>
                    <List.Item.Meta title={'我的邮箱'} description={user.email} />
                </List.Item>
                <List.Item>
                    <List.Item.Meta
                        title={'创建时间'}
                        description={utils.timestampToStr(user.createTime)}
                    />
                </List.Item>
                <List.Item actions={[action()]}>
                    <List.Item.Meta title={'修改密码'} description={'请尽量不要使用弱密码'} />
                </List.Item>
            </List>
        </Fragment>
    );
};

export default connect(({ global }: { global: GlobalModelState }) => ({
    global,
}))(SecurityView);
