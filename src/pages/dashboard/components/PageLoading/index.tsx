import React from 'react';
import { Spin } from 'antd';

// ModalLoading components from code split
// https://umijs.org/plugin/umi-plugin-react.html#dynamicimport
export default () => (
    <div style={{ paddingTop: 100, textAlign: 'center' }}>
        <Spin size="large" />
    </div>
);
