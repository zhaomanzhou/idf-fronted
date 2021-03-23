import React from 'react';
import { Button, message } from 'antd';
import { Row, Col, Divider } from 'antd';
import ProForm, {
    ModalForm,
    ProFormText,
    ProFormDateRangePicker,
    ProFormSelect,
} from '@ant-design/pro-form';
import { PlusOutlined } from '@ant-design/icons';
import Item from '@/pages/bundle/settlement/componment/item/Item';
import PackageItem from '@/pages/bundle/settlement/componment/simplepriceitem/PackageItem';

const waitTime = (time: number = 100) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, time);
    });
};

export default () => {
    return (
        <ModalForm
            title="新建表单"
            trigger={<Button type="primary">套餐充值</Button>}
            modalProps={{
                onCancel: () => console.log('run'),
            }}
            onFinish={async (values) => {
                await waitTime(2000);
                console.log(values.name);
                message.success('提交成功');
                return true;
            }}
        >
            <Row gutter={16}>
                <Col className="gutter-row" span={14}>
                    <Item content={'套餐1'} onClick={() => {}} chosen={false} />
                    <Item content={'套餐1'} onClick={() => {}} chosen={false} />
                    <Item content={'套餐1'} onClick={() => {}} chosen={false} />
                    <Item content={'套餐1'} onClick={() => {}} chosen={false} />
                    <Item content={'套餐1'} onClick={() => {}} chosen={false} />
                </Col>
                <Col className="gutter-row" span={10}>
                    <PackageItem
                        style={{ width: '100%' }}
                        bundle={{
                            id: 1,
                            createTime: 1612106833000,
                            updateTime: 1612082296000,
                            name: '基础版100G',
                            totalData: 102400,
                            speed: 100,
                            maxConnection: 1024,
                            level: 0,
                            duration: 30,
                            active: true,
                            description: '测试1',
                            price: 1000,
                        }}
                    />
                </Col>
            </Row>
        </ModalForm>
    );
};
