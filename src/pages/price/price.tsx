import React from 'react';
import PackageItem from '@/pages/price/componment/PackageItem';
import { Row, Col, Button } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
export default () => {
    return (
        <PageContainer content="请选择一个适合你的套餐">
            <div style={{ marginTop: 80 }}>
                <Row>
                    <Col xs={{ span: 24 }} lg={{ span: 7, offset: 1 }}>
                        <PackageItem />
                    </Col>
                    <Col xs={{ span: 24 }} lg={{ span: 7 }}>
                        <PackageItem />
                    </Col>
                    <Col xs={{ span: 24 }} lg={{ span: 7 }}>
                        <PackageItem />
                    </Col>
                </Row>
            </div>
        </PageContainer>
    );
};
