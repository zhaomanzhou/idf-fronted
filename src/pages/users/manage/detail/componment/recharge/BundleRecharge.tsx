import React, { useEffect, useState } from 'react';
import { Button, message, Modal, Popconfirm } from 'antd';
import { Row, Col, Divider } from 'antd';
import ProForm, {
    ModalForm,
    ProFormText,
    ProFormDateRangePicker,
    ProFormSelect,
} from '@ant-design/pro-form';
import { ExclamationCircleOutlined, PlusOutlined } from '@ant-design/icons';
import Item from '@/pages/bundle/settlement/componment/item/Item';
import PackageItem from '@/pages/bundle/settlement/componment/simplepriceitem/PackageItem';
import { BundleItem } from '@/pages/bundle/manage/BundleManager';
import service from '@/pages/bundle/list/service';
import styles from './BundleRecharge.less';

import rechargeService from '@/pages/users/service';
import { UserProxyInfo } from '@/pages/users/manage/data';

const waitTime = (time: number = 100) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, time);
    });
};

export interface RechargeProps {
    proxyInfo: UserProxyInfo;
}

export default (props: RechargeProps) => {
    const [totalMonth, setTotalMonth] = useState<number>(1);
    const periodEnum = [1, 2, 3, 6, 12];
    const [bundleList, setBundleList] = useState<BundleItem[]>([]);

    useEffect(() => {
        service.getBundleList().then((res) => {
            // @ts-ignore
            setBundleList(res);
            // @ts-ignore
            if (res.length > 0) {
                setCurBundle(res[0]);
            }
        });
    }, []);

    const [curBundle, setCurBundle] = useState<BundleItem>();

    return (
        <ModalForm
            title="手动套餐充值(原套餐会被清楚)"
            trigger={<Button type="primary">套餐充值</Button>}
            onFinish={async (values) => {
                if (!curBundle) {
                    message.error('请先选择套餐');
                    return false;
                }
                let res: boolean = await new Promise((resolve, reject) => {
                    Modal.confirm({
                        title: '确定为该用户充值？',
                        icon: <ExclamationCircleOutlined />,
                        onOk: async () => {
                            await rechargeService.rechargeByPerson(
                                curBundle?.id,
                                totalMonth,
                                props.proxyInfo.id,
                            );
                            message.success('充值成功');
                            resolve(true);
                        },
                        onCancel() {
                            resolve(false);
                        },
                    });
                });
                return res;
            }}
        >
            <Row gutter={16}>
                <Col className="gutter-row" span={14}>
                    {bundleList.map((value, index) => {
                        return (
                            <Item
                                key={index}
                                content={value.name + ' (¥' + value.price / 100.0 + '/月)'}
                                onClick={() => {
                                    setCurBundle(value);
                                }}
                                chosen={curBundle === value}
                            />
                        );
                    })}
                </Col>
                <Col className="gutter-row" span={10}>
                    {curBundle && (
                        <PackageItem
                            key={curBundle.id}
                            style={{ width: '100%' }}
                            bundle={curBundle}
                        />
                    )}
                </Col>
            </Row>

            <Divider style={{ marginBottom: 80 }} />
            <Row gutter={6}>
                {periodEnum.map((val, index) => {
                    return (
                        <Col span={4} key={index}>
                            <Item
                                content={val + '个月'}
                                chosen={totalMonth === val}
                                key={index}
                                onClick={() => {
                                    setTotalMonth(val);
                                }}
                                style={{ backgroundColor: 'pink' }}
                                className={styles.chargePeriod}
                            />
                        </Col>
                    );
                })}
            </Row>
        </ModalForm>
    );
};
