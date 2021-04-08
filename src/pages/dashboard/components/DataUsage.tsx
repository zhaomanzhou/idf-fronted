import { Avatar, Button, Card, Col, List, Radio, Tag, Typography } from 'antd';

import React, { useState, useEffect } from 'react';
import { Area } from '@ant-design/charts';

const DataUsage = ({ loading }: { loading: boolean }) => {
    const [data, setData] = useState([]);
    useEffect(() => {
        asyncFetch();
    }, []);
    const asyncFetch = () => {
        fetch('https://gw.alipayobjects.com/os/bmw-prod/1d565782-dde4-4bb6-8946-ea6a38ccf184.json')
            .then((response) => response.json())
            .then((json) => setData(json))
            .catch((error) => {
                console.log('fetch data failed', error);
            });
    };
    var config = {
        data: data,
        xField: 'Date',
        yField: 'scales',
        xAxis: { tickCount: 5 },
        height: 175,
        areaStyle: function areaStyle() {
            return { fill: 'l(270) 0:#ffffff 0.5:#7ec2f3 1:#1890ff' };
        },
    };

    return (
        <Card loading={loading} bordered={false} title={'流量使用'}>
            {/*<div style={{ textAlign: 'center' }}>*/}
            {/*    <WaterWave height={161} title="补贴资金剩余" percent={34} />*/}
            {/*</div>*/}
            <Area {...config} />
        </Card>
    );
};

export default DataUsage;
