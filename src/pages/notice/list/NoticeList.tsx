import React, { FC, useRef, useState, useEffect } from 'react';
import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import { getAuthority } from '@/utils/authority';

import { Card, Dropdown, Input, List, Menu, Radio } from 'antd';

import { connect, Dispatch, Link } from 'umi';
import styles from './NoticeList.less';
import { ConnectState } from '@/models/connect';
import { Notice, StateType } from '@/pages/notice/list/data';
import api from '@/utils/api';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { Search } = Input;

interface NoticeListProps {
    NoticeList: StateType;
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
    const { NoticeList, dispatch, loading }: NoticeListProps = props;

    const [noticeType, setNoticeType] = useState<number>(1);

    useEffect(() => {
        switch (noticeType) {
            case 1: {
                dispatch({
                    type: 'noticeList/getNotificationList',
                    payload: '',
                });
                break;
            }
            case 0: {
                dispatch({
                    type: 'noticeList/getInstructionList',
                    payload: '',
                });
                break;
            }
            case 2: {
                dispatch({
                    type: 'noticeList/getKnowledgeList',
                    payload: '',
                });
                break;
            }
        }
    }, [noticeType]);

    const extraContent = (
        <div className={styles.extraContent}>
            <RadioGroup defaultValue="all">
                <RadioButton value="all" onClick={() => setNoticeType(1)}>
                    公告
                </RadioButton>
                <RadioButton value="progress" onClick={() => setNoticeType(0)}>
                    教程
                </RadioButton>
                <RadioButton value="waiting" onClick={() => setNoticeType(2)}>
                    科普
                </RadioButton>
            </RadioGroup>
            <Search
                className={styles.extraContentSearch}
                placeholder="请输入"
                onSearch={() => ({})}
            />
        </div>
    );

    let dataSource: Notice[] = [];
    switch (noticeType) {
        case 0:
            dataSource = NoticeList.instructionList;
            break;
        case 1:
            dataSource = NoticeList.notificationList;
            break;
        case 2:
            dataSource = NoticeList.knowledgeList;
            break;
    }
    return (
        <div>
            <div className={styles.standardList}>
                <Card
                    className={styles.listCard}
                    bordered={false}
                    title="公告列表"
                    style={{ marginTop: 24 }}
                    bodyStyle={{ padding: '0 32px 40px 32px' }}
                    extra={extraContent}
                >
                    <List
                        size="large"
                        rowKey="id"
                        // pagination={paginationProps}
                        loading={loading}
                        dataSource={dataSource}
                        renderItem={(item) => (
                            <List.Item>
                                <List.Item.Meta
                                    title={
                                        <Link
                                            target="_blank"
                                            to={api.user_api.noticeDetail + item.id}
                                        >
                                            {item.title}
                                        </Link>
                                    }
                                    description={item.contentHtml
                                        .replace(/<[^<>]+>/g, '')
                                        .substr(0, 150)}
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
        NoticeList: state.noticeList,
        loading: state.loading.effects['noticeList/getNotificationList'],
    };
};

export default connect(mapStateToProps)(index);
