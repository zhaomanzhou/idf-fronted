import React from 'react';
import './PackageItem.css';
import svg from '../../../../assets/price.svg';

export default () => {
    return (
        <div className="price">
            <ul className="pricing-feature-list">
                <li className="pricing-feature">
                    <span className={'bundle-number pricing-feature'}>100GB</span>使用流量
                </li>
                <li className="pricing-feature">
                    <span className={'bundle-number pricing-feature'}>100Mbps</span>最高速率
                </li>
                <li className="pricing-feature">
                    <span className={'bundle-number pricing-feature'}>100</span>个最高TCP连接
                </li>
                <li className="pricing-feature">
                    <span className={'bundle-number pricing-feature'}>所有的</span>服务器资源
                </li>
                <li className="pricing-feature">
                    <span className={'bundle-number pricing-feature'}>客服支持</span>
                </li>
            </ul>
        </div>
    );
};
