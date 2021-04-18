import React, { useState } from 'react';
import styles from './BasicInformation.less';
import { Descriptions, message, Popconfirm, Tag } from 'antd';
import EditableText from '@/components/EditableText';
import { Fragment } from 'react';
import { EditOutlined } from '@ant-design/icons';
import { User } from '@/pages/UserManager/manage/data';
import { timestampToDateStr } from '@/utils/utils';
import request from '@/utils/request';
import api from '@/utils/api';
import ChooseInput from '@/pages/UserManager/manage/detail/componment/basic/chooseinput/ChooseInput';

interface BasicInformationProps {
    user: User;
}

export default (props: BasicInformationProps) => {
    let user = props.user;
    const [visible, setVisible] = React.useState(false);
    const [confirmLoading, setConfirmLoading] = React.useState(false);
    const [title, setTitle] = React.useState<string>();

    const handleOk = () => {
        setConfirmLoading(true);
        let enable = true;
        if (title !== '确定要解封此人?') {
            enable = false;
        }
        request
            .post(api.user_api.updateUserStatus, { userId: user.id, enable: enable })
            .then((response) => {
                message.success('修改成功');
                if (enable) {
                    user.status = 0;
                } else {
                    user.status = 2;
                }
            })
            .finally(() => {
                setConfirmLoading(false);
                setVisible(false);
            });
    };

    const changeUserStatus = (enable: boolean) => {
        setVisible(true);
        if (enable) {
            setTitle('确定要解封此人?');
        } else {
            setTitle('确定要封禁此人?');
        }
    };
    return (
        <Fragment>
            <Descriptions size="middle" column={2}>
                <Descriptions.Item label="用户ID">{user.id}</Descriptions.Item>
                <Descriptions.Item label="用户状态">
                    <Popconfirm
                        title={title}
                        visible={visible}
                        onConfirm={handleOk}
                        okButtonProps={{ loading: confirmLoading }}
                        onCancel={() => {
                            setVisible(false);
                        }}
                    >
                        {user.status == 2 ? (
                            <a
                                style={{ color: 'red' }}
                                onClick={() => {
                                    changeUserStatus(true);
                                }}
                            >
                                封禁
                            </a>
                        ) : (
                            <a
                                style={{ color: '#1890ff' }}
                                onClick={() => {
                                    changeUserStatus(false);
                                }}
                            >
                                正常
                            </a>
                        )}
                    </Popconfirm>
                </Descriptions.Item>
                <Descriptions.Item label="用户邮箱">{user.email}</Descriptions.Item>
                <Descriptions.Item label="用户设备">
                    <ChooseInput
                        initialValue={user.osDevice}
                        onSubmitEdit={(val) => {
                            request
                                .post(api.user_api.updateDeviceList, {
                                    userId: user.id,
                                    newDevice: val,
                                })
                                .then(() => {
                                    message.success('修改成功');
                                });
                        }}
                    />
                </Descriptions.Item>
                <Descriptions.Item label="用户备注">
                    <EditableText
                        initialValue={user.remark}
                        onSubmitEdit={(s) => {
                            request
                                .post(api.user_api.updateUserRemark, {
                                    userId: user.id,
                                    newRemark: s,
                                })
                                .then((res) => {
                                    message.success('修改成功');
                                });
                        }}
                    />
                </Descriptions.Item>
                <Descriptions.Item label="创建时间">
                    {timestampToDateStr(user.createTime)}
                </Descriptions.Item>
            </Descriptions>
        </Fragment>
    );
};
