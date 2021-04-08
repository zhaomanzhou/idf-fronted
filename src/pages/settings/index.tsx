import React, { Component, useRef } from 'react';

import { Dispatch, connect } from 'umi';
import { GridContent } from '@ant-design/pro-layout';
import { Menu } from 'antd';
import SecurityView from './components/SecurityView';
import styles from './style.less';
import { Fragment } from 'react';
import NotifyView from '@/pages/settings/components/NotifyView';

const { Item } = Menu;

export default () => {
    return (
        <Fragment>
            <GridContent>
                <div className={styles.main}>
                    <div className={styles.right}>
                        <SecurityView />
                    </div>
                </div>
            </GridContent>

            <GridContent style={{ marginTop: 22 }}>
                <div className={styles.main}>
                    <div className={styles.right}>
                        <NotifyView />
                    </div>
                </div>
            </GridContent>
        </Fragment>
    );
};
