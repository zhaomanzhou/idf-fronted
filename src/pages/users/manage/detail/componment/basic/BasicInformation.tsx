import React from 'react';
import styles from './BasicInformation.less';
import { Descriptions, Tag } from 'antd';
import EditableText from '@/components/EditableText';
import { Fragment } from 'react';

export default () => {
    return (
        <Fragment>
            <Descriptions size="middle" column={2}>
                <Descriptions.Item label="用户ID">123424</Descriptions.Item>
                <Descriptions.Item label="用户状态">
                    <a style={{ color: 'red' }}>封禁</a>
                </Descriptions.Item>
                <Descriptions.Item label="用户邮箱">zmzsstreet@163.com</Descriptions.Item>
                <Descriptions.Item label="用户设备">
                    <Tag color="blue">Android</Tag>
                    <Tag color="blue">IOS</Tag>
                </Descriptions.Item>
                <Descriptions.Item label="用户备注">微信风轻云淡</Descriptions.Item>
                <Descriptions.Item label="创建时间">
                    <EditableText initialValue={'微信风轻云淡'} onSubmitEdit={() => {}} />
                </Descriptions.Item>
            </Descriptions>
        </Fragment>
    );
};
