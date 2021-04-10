import React, { Component } from 'react';

import { List, Space, Switch } from 'antd';
import { Fragment } from 'react';

export default () => {
    return (
        <Fragment>
            <List itemLayout="horizontal">
                <List.Item actions={[<Switch defaultChecked />]}>
                    <List.Item.Meta
                        title={'到期邮件提醒'}
                        description={'默认为开启, 开关功能开发中... '}
                    />
                </List.Item>
            </List>
        </Fragment>
    );
};
