import React, { useRef, useState, Fragment } from 'react';
import { Button, Tag, Space, Menu, Dropdown, List, Modal, Badge, Radio, Input } from 'antd';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import { ConnectState } from '@/models/connect';
import { connect } from '@@/plugin-dva/exports';
import { Link } from 'umi';
import api from '@/utils/api';
import request from '@/utils/request';
import { DownOutlined } from '@ant-design/icons';
import NoticeModify from '@/pages/notice/manage/componment/NoticeModify';
import { Notice } from '@/pages/notice/manage/data';
import styles from '@/pages/notice/manage/manage.less';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { Search } = Input;

const index = ({ dispatch }) => {
    const actionRef = useRef<ActionType>();
    const [showModal, setShowModal] = useState<boolean>(false);
    const [curNotice, setCurNotice] = useState<Notice | null>(null);
    const [noticeType, setNoticeType] = useState<number>(1);

    const editAndDelete = (key: string | number, currentItem: Notice) => {
        if (key === 'down') {
            console.log(currentItem.status);
            if (currentItem.status === 1) {
                Modal.confirm({
                    title: '下架公告',
                    content: '确定下架该公告吗？',
                    okText: '确认',
                    cancelText: '取消',
                    onOk: async () => {
                        dispatch({
                            type: 'noticeManage/downNotice',
                            payload: currentItem.id,
                        });
                        actionRef.current?.reload();
                    },
                });
            } else {
                Modal.confirm({
                    title: '上架公告',
                    content: '确定上架该公告吗？',
                    okText: '确认',
                    cancelText: '取消',
                    onOk: async () => {
                        dispatch({
                            type: 'noticeManage/putUpNotice',
                            payload: currentItem.id,
                        });
                        actionRef.current?.reload();
                    },
                });
            }
        } else if (key === 'delete') {
            Modal.confirm({
                title: '删除公告',
                content: '确定删除该公告吗？',
                okText: '确认',
                cancelText: '取消',
                onOk: async () => {
                    dispatch({
                        type: 'noticeManage/deleteNotice',
                        payload: currentItem.id,
                    });
                    actionRef.current?.reload();
                },
            });
        }
    };

    const deleteItem = (id: number) => {
        console.log(id);
    };
    const columns: ProColumns<Notice>[] = [
        {
            title: 'id',
            key: 'id',
            dataIndex: 'id',
            ellipsis: true,
            width: '4%',
        },
        {
            title: '标题',
            dataIndex: 'title',
            copyable: true,
            ellipsis: true,
            render: (text, record, _, action) => [
                <List.Item.Meta
                    title={
                        <Space>
                            <Link target="_blank" to={api.user_api.noticeDetail + record.id}>
                                {record.title}
                            </Link>
                            {record.stick && <Tag color={'red'}>置顶</Tag>}
                        </Space>
                    }
                    description={record.contentHtml.replace(/<[^<>]+>/g, '').substr(0, 150)}
                    key={record.id}
                >
                    <Tag color={'red'}>所有</Tag>
                </List.Item.Meta>,
            ],
            width: '60%',
        },
        {
            title: '状态',
            dataIndex: 'status',
            filters: true,
            valueType: 'select',
            valueEnum: {
                0: {
                    text: '未发布',
                    status: 'Default',
                },
                1: {
                    text: '已发布',
                    status: 'Success',
                },
                2: {
                    text: '已下架',
                    status: 'Warning',
                },
            },
            width: '7%',
        },
        {
            title: '可见性',
            dataIndex: 'visibility',
            render: (_, record) => {
                switch (record.visibility) {
                    case 0:
                        return <Tag color={'red'}>所有</Tag>;
                    case 1:
                        return <Tag color={'blue'}>登陆用户</Tag>;
                    case 2:
                        return <Tag color={'green'}>管理员</Tag>;
                }

                return <div></div>;
            },

            width: '7%',
        },
        {
            title: '创建时间',
            key: 'created_at',
            dataIndex: 'createTime',
            width: '8%',
        },

        {
            title: '操作',
            valueType: 'option',
            render: (text, record, _, action) => [
                <Link to={`/notice/publish?originId=${record.id}`} key="edit">
                    编辑
                </Link>,
                <a
                    key="view"
                    onClick={() => {
                        setCurNotice(record);
                        setShowModal(true);
                    }}
                >
                    修改
                </a>,
                <Dropdown
                    overlay={
                        <Menu onClick={({ key }) => editAndDelete(key, record)}>
                            <Menu.Item key="down">
                                {record.status === 1 ? '下架' : '上架'}
                            </Menu.Item>
                            <Menu.Item key="delete">删除</Menu.Item>
                        </Menu>
                    }
                    key={record.id}
                >
                    <a>
                        更多 <DownOutlined />
                    </a>
                </Dropdown>,
            ],
        },
    ];

    const changeNoticeType = (type: number) => {
        setNoticeType(type);
        actionRef.current?.reload();
    };

    return (
        <Fragment>
            <NoticeModify
                visible={showModal}
                notice={curNotice}
                onClose={() => {
                    setShowModal(false);
                }}
                onSubmit={async (field) => {
                    await dispatch({
                        type: 'noticeManage/updateNoticeStickAndOrderValue',
                        payload: field,
                    });
                    setShowModal(false);
                }}
            />
            <ProTable<Notice>
                columns={columns}
                actionRef={actionRef}
                request={async (params, sort, filter) => {
                    const res: any = await request.get(api.user_api.getNoticeListAdmin, {
                        noticeType: noticeType,
                    });
                    return {
                        data: res,
                        // success 请返回 true，
                        // 不然 table 会停止解析数据，即使有数据
                        success: true,
                        // 不传会使用 data 的长度，如果是分页一定要传
                        total: res.length,
                    };
                }}
                rowKey="id"
                search={{
                    labelWidth: 'auto',
                }}
                dateFormatter="string"
                headerTitle="公告管理"
                toolBarRender={() => [
                    <div className={styles.extraContent} key={'n'}>
                        <RadioGroup defaultValue="all">
                            <RadioButton value="all" onClick={() => changeNoticeType(1)}>
                                公告
                            </RadioButton>
                            <RadioButton value="progress" onClick={() => changeNoticeType(0)}>
                                教程
                            </RadioButton>
                            <RadioButton value="waiting" onClick={() => changeNoticeType(2)}>
                                科普
                            </RadioButton>
                        </RadioGroup>
                        <Search
                            className={styles.extraContentSearch}
                            placeholder="请输入"
                            onSearch={() => ({})}
                        />
                    </div>,
                ]}
            />
        </Fragment>
    );
};

const mapStateToProps = (state: ConnectState) => {
    return {};
};

export default connect(mapStateToProps)(index);
