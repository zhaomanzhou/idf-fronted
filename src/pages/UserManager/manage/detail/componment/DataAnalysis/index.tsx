import { Avatar, Button, Card, Col, List, Radio, Tag, Typography } from 'antd';

import React, { useState, useEffect } from 'react';
import { Area } from '@ant-design/charts';
import api from '@/utils/api';
import request from '@/utils/request';

const DataUsage = ({ id }: { id: number }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        request.get(api.user_api.getDashBoardFlowForAdmin, { id: id }).then((res) => {
            setData(res);
            setLoading(false);
        });
    }, []);

    var config = {
        data: data,
        xField: 'date',
        yField: 'flow',
        xAxis: { tickCount: 5 },
        yAxis: {
            label: {
                formatter: function formatter(v) {
                    return ''.concat(v, ' MB');
                },
            },
        },
        height: 175,
        areaStyle: function areaStyle() {
            return { fill: 'l(270) 0:#ffffff 0.5:#7ec2f3 1:#1890ff' };
        },
        tooltip: {
            formatter: (d) => {
                return {
                    name: '流量',
                    value: d.flow + ' MB',
                };
            },
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
