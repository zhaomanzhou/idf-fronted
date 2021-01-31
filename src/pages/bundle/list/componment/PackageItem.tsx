import React from 'react';
import './PackageItem.css';
import svg from '../../../../assets/price.svg';

export default () => {
    return (
        <div className="pricing pricing-palden">
            <div className="pricing-item pricing__item--featured">
                <div className="pricing-deco">
                    <img src={svg} className="pricing-deco-img" />

                    <div className="pricing-price">
                        <span className="pricing-currency">¥</span>25
                        <span className="pricing-period">/月</span>
                    </div>
                    <h3 className="pricing-title">基础版</h3>
                </div>
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
                <button className="pricing-action">立即订阅</button>
            </div>
        </div>
    );
};
