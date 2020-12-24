import React, { FC, useRef, useState, useEffect } from 'react';
import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import {
    Card,
    Dropdown,
    Input,
    List,
    Menu,
    Radio,
} from 'antd';

import { connect, Dispatch, Link } from 'umi';
import styles from './NoticeList.less';
import { ConnectState } from '@/models/connect';
import { Notice, StateType } from '@/pages/notice/list/data';
import api from "@/utils/api";

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { Search } = Input;

interface NoticeListProps {
    NotificationList: StateType;
    dispatch: Dispatch;
    loading: boolean;
}

const ListContent = ({ data: { createTime } }: { data: Notice }) => (
    <div className={styles.listContent}>
        <div className={styles.listContentItem}>
            <span>发布时间</span>
            <p>{createTime}</p>
        </div>
    </div>
);

const index = (props) => {
    const { NotificationList, dispatch, loading }: NoticeListProps = props;

    useEffect(()=>{
        dispatch({
            type: "noticeList/getNotificationList",
            payload: '',
        })
    }, [])



    const paginationProps = {
        pageSize: 5,
        total: 50,
    };

    const extraContent = (
        <div className={styles.extraContent}>
            <RadioGroup defaultValue="all">
                <RadioButton value="all">公告</RadioButton>
                <RadioButton value="progress">教程</RadioButton>
                <RadioButton value="waiting">科普</RadioButton>
            </RadioGroup>
            <Search
                className={styles.extraContentSearch}
                placeholder="请输入"
                onSearch={() => ({})}
            />
        </div>
    );

    const MoreBtn: React.FC<{
        item: Notice;
    }> = ({ item }) => (
        <Dropdown
            overlay={
                <Menu>
                    <Menu.Item key="edit">下架</Menu.Item>
                    <Menu.Item key="delete">删除</Menu.Item>
                </Menu>
            }
        >
            <a>
                更多 <DownOutlined />
            </a>
        </Dropdown>
    );

    return (
        <div>
            <div className={styles.standardList}>
                <Card
                    className={styles.listCard}
                    bordered={false}
                    title="基本列表"
                    style={{ marginTop: 24 }}
                    bodyStyle={{ padding: '0 32px 40px 32px' }}
                    extra={extraContent}
                >
                    <List
                        size="large"
                        rowKey="id"
                        pagination={paginationProps}
                        loading={loading}
                        dataSource={NotificationList.NotificationList}
                        renderItem={(item) => (
                            <List.Item
                                actions={[
                                    <a key="edit">编辑</a>,
                                    <MoreBtn key="more" item={item} />,
                                ]}
                            >
                                <List.Item.Meta
                                    title={<Link to={api.user_api.noticeDetail + item.id}>{item.title}</Link>}
                                    description={item.contentHtml.replace(/<[^<>]+>/g, '')}
                                />
                                <ListContent data={item} />
                            </List.Item>
                        )}
                    />
                </Card>
            </div>
        </div>
    );
};

const mapStateToProps = (state: ConnectState) => {
    return {
        NotificationList: state.noticeList,
        loading: state.loading.effects['noticeList/getNotificationList']
    };
};

export default connect(mapStateToProps)(index);
