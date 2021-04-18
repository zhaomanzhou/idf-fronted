import React, { useEffect, useState } from 'react';
import PackageItem from '@/pages/shop/list/componment/BundleItem';
import { Row, Col, Button } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import styles from './BundleList.less';
import service from '@/pages/shop/list/service';
import { BundleItem } from '@/pages/shop/manage/BundleManager';
export default () => {
    const [bundleList, setBundleList] = useState<BundleItem[]>([]);

    useEffect(() => {
        service.getBundleList().then((res) => {
            // @ts-ignore
            setBundleList(res);
        });
    }, []);

    return (
        <PageContainer content="请选择一个适合你的套餐">
            <div className={styles.container}>
                <Row>
                    {bundleList.map((value, index) => {
                        return (
                            <Col xs={{ span: 24 }} lg={{ span: 7, offset: 1 }} key={index}>
                                <PackageItem bundle={value} key={index} />
                            </Col>
                        );
                    })}
                </Row>
            </div>
        </PageContainer>
    );
};
