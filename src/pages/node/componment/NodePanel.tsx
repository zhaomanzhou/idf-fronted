import React, { Fragment } from 'react';
import styles from './NodePanel.less';
import { Avatar, Card, List, Tooltip } from 'antd';
import { DownloadOutlined, EditOutlined, ShareAltOutlined } from '@ant-design/icons';

export default () => {
    return (
        <Card
            title={
                <Fragment>
                    <Avatar
                        size="small"
                        src={'https://gw.alipayobjects.com/zos/antfincdn/UCSiy1j6jx/xingzhuang.svg'}
                    />{' '}
                    美国线路1
                </Fragment>
            }
            bodyStyle={{ paddingBottom: 200 }}
            actions={[
                <Tooltip key="download" title="下载">
                    <DownloadOutlined />
                </Tooltip>,
                <Tooltip key="edit" title="编辑">
                    <EditOutlined />
                </Tooltip>,
                <Tooltip title="分享" key="share">
                    <ShareAltOutlined />
                </Tooltip>,
            ]}
        >
            {/*<Card.Meta avatar={<Avatar size="small" src={item.avatar} />} title={item.title} />*/}
            {/*<div className={styles.cardItemContent}>*/}
            {/*    <CardInfo*/}
            {/*        activeUser={formatWan(item.activeUser)}*/}
            {/*        newUser={numeral(item.newUser).format('0,0')}*/}
            {/*    />*/}
            {/*</div>*/}
        </Card>
    );
};
