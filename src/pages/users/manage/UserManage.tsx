import React, { Fragment, memo } from 'react';
import { Button, Tooltip, Dropdown, Menu, Input, Progress } from 'antd';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import { SortOrder } from 'antd/lib/table/interface';
import request from '@/utils/request';
import api from '@/utils/api';
import { UserInfoLite } from '@/pages/users/manage/data';
import utils, { timestampToDateStr, timestampToStr } from '@/utils/utils';
import styles from '@/pages/users/manage/UserManage.less';
import { Link } from 'umi';

const isExpired = (expireDate: number) => {
    const curTimestamp = new Date().valueOf();
    return curTimestamp > expireDate;
};

const index = () => {
    const columns: ProColumns<UserInfoLite>[] = [
        {
            title: '用户信息',
            dataIndex: 'id',
            render: (_, record) => {
                return (
                    <div className={record.status === 'NORMAL' ? '' : styles.grayText}>
                        <div>
                            <span className={styles.alignText}>用户ID</span>:{record.id}
                        </div>
                        <div>
                            <span className={styles.alignText}>邮箱</span>: {record.email}
                        </div>
                    </div>
                );
            },
            width: '18%',
        },

        {
            title: '有效日期',
            dataIndex: 'createTime',
            valueType: 'dateTime',
            key: 'createTime',
            render: (_, record) => {
                return (
                    <div className={record.status === 'NORMAL' ? '' : styles.grayText}>
                        {timestampToStr(record.createTime)} <br />
                        <span
                            className={isExpired(Number(record.expireDate)) ? styles.redText : ''}
                        >
                            {timestampToStr(record.expireDate)}
                        </span>
                    </div>
                );
            },
            width: '18%',
        },

        {
            title: '套餐名称',
            dataIndex: 'packageName',
            key: 'packageName',
            render: (_, record) => {
                return (
                    <Fragment>
                        <div className={record.status === 'NORMAL' ? '' : styles.grayText}>
                            <div>
                                {/*<span className={styles.alignText2}>套餐名称</span>:{' '}*/}
                                {record.bundleName}
                            </div>
                            <div>
                                {/*<span className={styles.alignText2}>开通天数</span>:{' '}*/}
                                已开通{record.totalActiveDay}天会员
                            </div>
                        </div>
                    </Fragment>
                );
            },
            width: '18%',
        },
        {
            title: '流量',
            dataIndex: 'totalData',
            render: (_, record) => {
                return (
                    <div className={record.status === 'NORMAL' ? '' : styles.grayText}>
                        <Progress
                            percent={(record.usedData * 100) / record.totalData}
                            format={() => ''}
                            status="active"
                        />
                        <div>
                            {utils.toDecimal2NoZero(record.usedData / (1024 * 1024)) +
                                'GB / ' +
                                utils.toDecimal2NoZero(record.totalData / (1024 * 1024)) +
                                'GB'}
                        </div>
                    </div>
                );
            },
            width: 180,
        },
        {
            title: '备注',
            dataIndex: 'remark',
            key: 'remark',
        },

        {
            title: '操作',
            width: 180,
            key: 'option',
            valueType: 'option',
            render: (_, record) => [
                <Link key="link" to={'/users/manage/detail/' + record.id}>
                    详情
                </Link>,
                <a key="link2">删除</a>,
            ],
        },
    ];

    const dataRequest = async (
        params: UserInfoLite & {
            pageSize?: number;
            current?: number;
            keyword?: string;
        },
        sort: Record<string, SortOrder>,
        filter: Record<string, React.ReactText[]>,
    ) => {
        const res: any = await request.get(api.user_api.getUserList, {});
        console.log(res);
        return {
            data: res.content,
            success: true,
            // 不传会使用 data 的长度，如果是分页一定要传
            total: res.totalElement,
        };
    };

    return (
        <ProTable
            columns={columns}
            request={dataRequest}
            rowKey="id"
            pagination={{
                showQuickJumper: true,
            }}
            search={{
                layout: 'vertical',
                defaultCollapsed: false,
            }}
            dateFormatter="string"
            toolbar={{
                title: '高级表格',
                tooltip: '这是一个标题提示',
            }}
        />
    );
};

export default memo(index);
