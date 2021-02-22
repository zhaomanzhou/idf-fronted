import React, { Component, useState } from 'react';

import { Input } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import ReactJson from 'react-json-view';
import service from '@/pages/tool/pay/service';
import ModalLoading from '@/components/ModalLoading';

const Search = () => {
    const [loading, setLoading] = useState<boolean>(false);

    const [res, setRes] = useState({});

    const handleFormSubmit = (value: string) => {
        setLoading(true);
        service
            .syncPay(Number(value))
            .then((res) => {
                setRes(res);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const mainSearch = (
        <div style={{ textAlign: 'center' }}>
            <Input.Search
                placeholder="请输入本系统订单号"
                enterButton="搜索"
                size="large"
                onSearch={handleFormSubmit}
                style={{ maxWidth: 522, width: '100%' }}
            />
        </div>
    );

    return (
        <PageContainer subTitle={'调用支付宝接口进行查询'} content={mainSearch}>
            <ReactJson src={res} />
            <ModalLoading visible={loading} />
        </PageContainer>
    );
};

export default Search;
